/**
 * ALVÉRA Fashion — Server-Side Security & Prevention Engine
 * Verifies BotPulse Ed25519 digital signatures, enforces ALLOW/VERIFY/RATE_LIMIT/BLOCK,
 * executes server-side protected operations, and transmits enforcement feedback.
 */

import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import http from 'http';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUB_KEY_PATH = path.resolve(__dirname, '../certs/botpulse_ed25519_public.pem');
const BOTPULSE_API_URL = process.env.BOTPULSE_API_URL || 'http://localhost:8000/api/v1';
const SITE_ID = 'site_alvera_001';
const VALID_SITE_IDS = ['site_alvera_001', 'site_elvara_001'];

// In-memory challenge store: challengeId -> { answer, expiresAt }
const challengeStore = new Map();
// Single-use decision tracking: decisionId -> timestamp
const usedDecisions = new Map();

let cachedPublicKey = null;

function getPublicKey() {
  if (cachedPublicKey) return cachedPublicKey;
  try {
    if (fs.existsSync(PUB_KEY_PATH)) {
      cachedPublicKey = fs.readFileSync(PUB_KEY_PATH, 'utf8');
      return cachedPublicKey;
    }
  } catch (err) {
    console.error('[ALVÉRA Security] Error reading Ed25519 public key:', err);
  }
  return null;
}

function base64UrlDecode(str) {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  return Buffer.from(base64, 'base64');
}

/**
 * Cryptographically verifies an incoming BotPulse decision token.
 */
export function verifyDecisionToken(token, requiredScope = null) {
  if (!token || typeof token !== 'string') {
    return { valid: false, error: 'Missing or empty decision token', action: 'BLOCK' };
  }

  const parts = token.split('.');
  if (parts.length !== 3) {
    return { valid: false, error: 'Malformed token structure (expected 3 parts)', action: 'BLOCK' };
  }

  const [headerB64, payloadB64, sigB64] = parts;

  let header, payload;
  try {
    header = JSON.parse(base64UrlDecode(headerB64).toString('utf8'));
    payload = JSON.parse(base64UrlDecode(payloadB64).toString('utf8'));
  } catch (err) {
    return { valid: false, error: 'Failed to parse token JSON', action: 'BLOCK' };
  }

  const dataToVerify = Buffer.from(`${headerB64}.${payloadB64}`);
  const signature = base64UrlDecode(sigB64);
  const alg = header.alg || 'Ed25519';

  let sigValid = false;
  if (alg === 'Ed25519') {
    const pubKey = getPublicKey();
    if (!pubKey) {
      return { valid: false, error: 'ALVÉRA has no BotPulse Ed25519 public key installed', action: 'BLOCK' };
    }
    try {
      sigValid = crypto.verify(null, dataToVerify, pubKey, signature);
    } catch (err) {
      return { valid: false, error: `Ed25519 signature verification error: ${err.message}`, action: 'BLOCK' };
    }
  } else if (alg === 'HS256') {
    // Backward compatibility for HMAC-SHA256
    const secret = process.env.BOTPULSE_SECRET_KEY || 'botpulse_super_secret_signing_key_2026';
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(dataToVerify);
    const expectedSig = hmac.digest();
    sigValid = crypto.timingSafeEqual(expectedSig, signature);
  } else {
    return { valid: false, error: `Unsupported signing algorithm: ${alg}`, action: 'BLOCK' };
  }

  if (!sigValid) {
    return { valid: false, error: 'Invalid digital signature (token has been tampered with or forged)', action: 'BLOCK' };
  }

  // Check expiration
  const now = Math.floor(Date.now() / 1000);
  const exp = payload.expires_at || payload.exp || 0;
  if (exp < now) {
    return { valid: false, error: 'Decision token has expired', action: 'BLOCK', payload };
  }

  // Check site association
  if (payload.site_id && !VALID_SITE_IDS.includes(payload.site_id)) {
    return { valid: false, error: `Site ID mismatch (token belongs to ${payload.site_id}, expected ${VALID_SITE_IDS.join(' or ')})`, action: 'BLOCK' };
  }

  // Check permitted scope
  if (requiredScope && Array.isArray(payload.permitted_scope)) {
    if (!payload.permitted_scope.includes(requiredScope)) {
      return { valid: false, error: `Operation '${requiredScope}' outside permitted token scope`, action: 'BLOCK' };
    }
  }

  return {
    valid: true,
    action: payload.action || 'ALLOW',
    risk_score: payload.risk_score || 0.0,
    risk_level: payload.risk_level || 'LOW',
    visitor_type: payload.visitor_type || payload.classification || 'HUMAN',
    session_id: payload.session_id || payload.sub,
    decision_id: payload.decision_id,
    payload
  };
}

/**
 * Transmits server-to-server confirmation to BotPulse when a decision is actually enforced.
 */
export async function sendEnforcementFeedback({
  decision_id,
  site_id = SITE_ID,
  session_id,
  visitor_type,
  risk_score,
  risk_level,
  action,
  endpoint,
  enforcement_result,
  http_status_code,
  failure_reason = null,
  details = {}
}) {
  try {
    const postData = JSON.stringify({
      decision_id,
      site_id,
      session_id,
      visitor_type,
      risk_score,
      risk_level,
      action,
      endpoint,
      enforcement_result,
      http_status_code,
      failure_reason,
      details
    });

    const url = new URL(`${BOTPULSE_API_URL}/risk/enforcement-feedback`);
    const options = {
      hostname: url.hostname,
      port: url.port || 8000,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        'User-Agent': 'ALVERA-Enforcement-Engine/1.0'
      },
      timeout: 3000
    };

    const req = http.request(options, (res) => {
      // Drain response
      res.on('data', () => {});
    });

    req.on('error', (err) => {
      console.warn('[ALVÉRA Security] BotPulse feedback dispatch failed (fail-safe mode active):', err.message);
    });

    req.write(postData);
    req.end();
  } catch (err) {
    console.warn('[ALVÉRA Security] Error creating feedback request:', err.message);
  }
}

/**
 * Creates an interactive/computational challenge puzzle for VERIFY action.
 */
export function createChallenge(sessionId) {
  const challengeId = 'ch_' + crypto.randomBytes(8).toString('hex');
  const num1 = Math.floor(10 + Math.random() * 89);
  const num2 = Math.floor(1 + Math.random() * 9);
  const answer = String(num1 + num2);

  challengeStore.set(challengeId, {
    answer,
    sessionId,
    expiresAt: Date.now() + 180000 // 3 minutes
  });

  return {
    challenge_id: challengeId,
    question: `Security Verification: What is ${num1} + ${num2}?`,
    expires_in_seconds: 180
  };
}

/**
 * Validates challenge solution and returns verified ticket.
 */
export function verifyChallenge(challengeId, answer, sessionId) {
  const record = challengeStore.get(challengeId);
  if (!record) return { success: false, error: 'Challenge expired or not found' };

  if (Date.now() > record.expiresAt) {
    challengeStore.delete(challengeId);
    return { success: false, error: 'Challenge has expired' };
  }

  if (record.answer !== String(answer).trim()) {
    return { success: false, error: 'Incorrect challenge answer' };
  }

  // Solution is correct
  challengeStore.delete(challengeId);
  const ticket = 'tkt_' + crypto.randomBytes(16).toString('hex');
  return { success: true, ticket };
}

