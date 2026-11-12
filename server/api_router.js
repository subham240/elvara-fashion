/**
 * ALVÉRA Server-Side API Router & Request Lifecycle Guard
 * Protects checkout, cart, search, authentication, and challenge verification
 * using BotPulse Ed25519 verified decisions.
 */

import {
  verifyDecisionToken,
  sendEnforcementFeedback,
  createChallenge,
  verifyChallenge
} from './enforcement_service.js';

function parseRequestBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', (chunk) => { body += chunk; });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        resolve({});
      }
    });
  });
}

function sendJson(res, statusCode, data, headers = {}) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, X-BotPulse-Decision, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    ...headers
  });
  res.end(JSON.stringify(data));
}

/**
 * Main HTTP handler for all ALVÉRA server-side operations.
 * Can be plugged into Vite dev middleware or a standalone Node.js server.
 */
export async function handleAlveraApiRequest(req, res) {
  const url = new URL(req.url, 'http://localhost:5173');
  const pathname = url.pathname;

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, X-BotPulse-Decision, Authorization',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
    });
    res.end();
    return true;
  }

  // Only handle /api/* routes
  if (!pathname.startsWith('/api/')) {
    return false;
  }

  // 1. Health check
  if (pathname === '/api/health' && req.method === 'GET') {
    sendJson(res, 200, {
      service: 'ALVÉRA Fashion Server-Side Enforcement Engine',
      status: 'active',
      site_id: 'site_alvera_001',
      enforcement_layer: 'Ed25519 Signature Verification',
      timestamp: Date.now()
    });
    return true;
  }

  // 2. Challenge Verification
  if (pathname === '/api/challenge/verify' && req.method === 'POST') {
    const body = await parseRequestBody(req);
    const { challenge_id, answer, session_id } = body;
    const result = verifyChallenge(challenge_id, answer, session_id);
    if (result.success) {
      sendJson(res, 200, { success: true, verified_ticket: result.ticket });
    } else {
      sendJson(res, 400, { success: false, error: result.error });
    }
    return true;
  }

  // For protected routes: extract decision token
  const body = req.method === 'POST' ? await parseRequestBody(req) : {};
  const token = req.headers['x-botpulse-decision'] || body.decision_token || url.searchParams.get('token');

  // Determine required scope
  let requiredScope = 'checkout';
  if (pathname.includes('/cart')) requiredScope = 'cart';
  else if (pathname.includes('/search')) requiredScope = 'search';
  else if (pathname.includes('/auth')) requiredScope = 'auth';

  // Perform cryptographic decision verification
  const ver = verifyDecisionToken(token, requiredScope);

  // 3. Checkout Protection (POST /api/checkout)
  if (pathname === '/api/checkout' && req.method === 'POST') {
    const sessionId = ver.session_id || body.session_id || 'unknown_sess';

    // Enforcement Check 1: BLOCK
    if (ver.action === 'BLOCK' || !ver.valid) {
      const reason = ver.error || 'Transaction denied by BotPulse Security Policy (Critical Threat Detected)';
      sendEnforcementFeedback({
        decision_id: ver.decision_id,
        session_id: sessionId,
        visitor_type: ver.visitor_type || 'MALICIOUS_BOT',
        risk_score: ver.risk_score || 95.0,
        risk_level: 'CRITICAL',
        action: 'BLOCK',
        endpoint: '/api/checkout',
        enforcement_result: 'ENFORCED',
        http_status_code: 403,
        failure_reason: reason
      });

      sendJson(res, 403, {
        success: false,
        error: reason,
        code: 'ORDER_BLOCKED',
        action: 'BLOCK',
        risk_level: 'CRITICAL'
      });
      return true;
    }

    // Enforcement Check 2: RATE_LIMIT
    if (ver.action === 'RATE_LIMIT') {
      sendEnforcementFeedback({
        decision_id: ver.decision_id,
        session_id: sessionId,
        visitor_type: ver.visitor_type,
        risk_score: ver.risk_score,
        risk_level: ver.risk_level,
        action: 'RATE_LIMIT',
        endpoint: '/api/checkout',
        enforcement_result: 'ENFORCED',
        http_status_code: 429
      });

      sendJson(res, 429, {
        success: false,
        error: 'Order rate limit exceeded. Please wait 30 seconds before retrying.',
        code: 'ORDER_RATE_LIMITED',
        action: 'RATE_LIMIT',
        retry_after_seconds: 30
      }, { 'Retry-After': '30' });
      return true;
    }

    // Enforcement Check 3: VERIFY (Step-up challenge)
    if (ver.action === 'VERIFY') {
      const challengeTicket = req.headers['x-challenge-ticket'] || body.challenge_ticket;
      if (!challengeTicket || !challengeTicket.startsWith('tkt_')) {
        const challenge = createChallenge(sessionId);
        sendEnforcementFeedback({
          decision_id: ver.decision_id,
          session_id: sessionId,
          visitor_type: ver.visitor_type,
          risk_score: ver.risk_score,
          risk_level: ver.risk_level,
          action: 'VERIFY',
          endpoint: '/api/checkout',
          enforcement_result: 'CHALLENGED',
          http_status_code: 428
        });

        sendJson(res, 428, {
          success: false,
          error: 'Security Verification Required: Elevated risk requires human challenge verification.',
          action: 'VERIFY',
          challenge
        });
        return true;
      }
    }

    // Enforcement Check 4: ALLOW (or Challenge passed)
    const generatedOrderId = 'ELV-' + Math.floor(100000 + Math.random() * 900000);
    sendEnforcementFeedback({
      decision_id: ver.decision_id,
      session_id: sessionId,
      visitor_type: ver.visitor_type,
      risk_score: ver.risk_score,
      risk_level: ver.risk_level,
      action: 'ALLOW',
      endpoint: '/api/checkout',
      enforcement_result: 'ENFORCED',
      http_status_code: 200
    });

    sendJson(res, 200, {
      success: true,
      orderId: generatedOrderId,
      status: 'confirmed',
      total: body.total || 0,
      customer: body.formData ? body.formData.email : 'guest',
      itemsCount: body.items ? body.items.length : 1,
      createdAt: new Date().toISOString()
    });
    return true;
  }

  // 4. Cart Protection (POST /api/cart/add)
  if (pathname === '/api/cart/add' && req.method === 'POST') {
    if (ver.action === 'BLOCK' || !ver.valid) {
      sendJson(res, 403, { success: false, error: 'Cart operation blocked by security policy', action: 'BLOCK' });
      return true;
    }
    if (ver.action === 'RATE_LIMIT') {
      sendJson(res, 429, { success: false, error: 'Cart mutation rate limit exceeded', retry_after_seconds: 30 }, { 'Retry-After': '30' });
      return true;
    }
    sendJson(res, 200, { success: true, message: 'Item added to cart', productId: body.productId });
    return true;
  }

  // 5. Search Protection (POST /api/search)
  if (pathname === '/api/search' && req.method === 'POST') {
    if (ver.action === 'BLOCK' || !ver.valid) {
      sendJson(res, 403, { success: false, error: 'Search restricted for automated scraping bots', action: 'BLOCK' });
      return true;
    }
    if (ver.action === 'RATE_LIMIT') {
      sendJson(res, 429, { success: false, error: 'Search rate limit exceeded', retry_after_seconds: 15 }, { 'Retry-After': '15' });
      return true;
    }
    sendJson(res, 200, { success: true, query: body.query || '', results_count: 12 });
    return true;
  }

  // 6. Auth Login Protection (POST /api/auth/login)
  if (pathname === '/api/auth/login' && req.method === 'POST') {
    if (ver.action === 'BLOCK' || !ver.valid) {
      sendJson(res, 403, { success: false, error: 'Login restricted due to brute-force credential risk', action: 'BLOCK' });
      return true;
    }
    sendJson(res, 200, { success: true, token: 'mock_jwt_alvera_auth', user: { email: body.email } });
    return true;
  }

  sendJson(res, 404, { error: `Endpoint ${pathname} not found on ALVÉRA Server` });
  return true;
}

