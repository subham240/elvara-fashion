/**
 * BotPulse Browser Tracking SDK (Universal IIFE Bundle v1.3.0)
 * Non-invasive behavioral telemetry & silent SHA-256 Proof-of-Work for ÉLVARA Fashion & Protected Web Applications.
 */
(function(window) {
  'use strict';

  var MIN_POW_DIFFICULTY = 2;
  var MAX_POW_DIFFICULTY = 5;
  var MAX_POW_ATTEMPTS = 2000000;

  function BotPulseSDK() {
    this.siteKey = '';
    this.endpoint = 'http://localhost:8000/api/v1';
    this.enabled = true;
    this.batchIntervalMs = 2500;
    this.batchSize = 25;
    this.sessionId = '';
    this.visitorId = '';
    this.sequenceNum = 0;
    this.eventQueue = [];
    this.timer = null;
    this.resembleToken = null;
    this.apiKey = null;
    this.geminiApiKey = null;
    this.onDecisionCallback = null;
    this.lastMouseTime = 0;
    this.latestDecisionToken = null;
    this.powInProgress = false;
    this.activePowChallengeId = null;
    this.solvedPowChallenges = {};
  }

  BotPulseSDK.prototype.init = function(config) {
    if (!config || !config.siteKey) {
      console.warn('[BotPulse SDK] siteKey is required for telemetry ingestion.');
      return;
    }
    this.siteKey = config.siteKey;

    // Auto-detect dynamic endpoint from query parameter or localStorage unless explicitly configured
    try {
      if (typeof window !== 'undefined' && window.location) {
        var params = new URLSearchParams(window.location.search);
        var qp = params.get('bp_api') || params.get('api');
        if (qp) {
          var cleanQp = qp.replace(/\/+$/, '');
          localStorage.setItem('bp_api_url', cleanQp);
          this.endpoint = cleanQp;
        } else {
          var saved = localStorage.getItem('bp_api_url');
          if (saved) {
            this.endpoint = saved.replace(/\/+$/, '');
          }
        }
      }
    } catch (e) {}

    if (config.endpoint) this.endpoint = config.endpoint.replace(/\/+$/, '');
    if (config.enabled !== undefined) this.enabled = config.enabled;
    if (config.batchIntervalMs) this.batchIntervalMs = config.batchIntervalMs;
    if (config.batchSize) this.batchSize = config.batchSize;
    if (config.apiKey) this.apiKey = config.apiKey;
    if (config.geminiApiKey) this.geminiApiKey = config.geminiApiKey;
    if (config.onDecision) this.onDecisionCallback = config.onDecision;

    if (!this.enabled) return;

    this.initSession();
    this.bindListeners();
    this.startBatchTimer();
    this.trackPageView();
    console.log('[BotPulse SDK] Initialized successfully. Session:', this.sessionId);
  };

  BotPulseSDK.prototype.setResembleToken = function(token) {
    this.resembleToken = token;
  };

  BotPulseSDK.prototype.setApiKey = function(key) {
    this.apiKey = key;
  };

  BotPulseSDK.prototype.setGeminiApiKey = function(key) {
    this.geminiApiKey = key;
  };

  BotPulseSDK.prototype.getDecisionToken = function() {
    try {
      return this.latestDecisionToken || sessionStorage.getItem('bp_decision_token');
    } catch (e) {
      return this.latestDecisionToken;
    }
  };

  BotPulseSDK.prototype.storeDecisionToken = function(token) {
    if (!token) return;
    this.latestDecisionToken = token;
    try {
      sessionStorage.setItem('bp_decision_token', token);
    } catch (e) {}
  };

  BotPulseSDK.prototype.initSession = function() {
    var sid = null;
    try {
      sid = sessionStorage.getItem('bp_session_id');
    } catch (e) {}
    if (!sid) {
      sid = 'sess_' + Math.random().toString(36).substring(2, 10) + '_' + Date.now();
      try {
        sessionStorage.setItem('bp_session_id', sid);
      } catch (e) {}
    }
    this.sessionId = sid;

    var vid = null;
    try {
      vid = localStorage.getItem('bp_visitor_id');
    } catch (e) {}
    if (!vid) {
      vid = 'vis_' + Math.random().toString(36).substring(2, 10) + '_' + Date.now();
      try {
        localStorage.setItem('bp_visitor_id', vid);
      } catch (e) {}
    }
    this.visitorId = vid;
  };

  BotPulseSDK.prototype.bindListeners = function() {
    var self = this;

    // Throttled mouse movement (45ms)
    window.addEventListener('mousemove', function(e) {
      var now = performance.now();
      if (now - self.lastMouseTime < 45) return;
      self.lastMouseTime = now;

      self.recordEvent('mouse_move', {
        x: Math.round(e.clientX),
        y: Math.round(e.clientY),
        screen_w: window.innerWidth,
        screen_h: window.innerHeight
      });
    }, { passive: true });

    // Touch movement tracking for mobile and tablet devices
    window.addEventListener('touchmove', function(e) {
      var now = performance.now();
      if (now - self.lastMouseTime < 45) return;
      self.lastMouseTime = now;
      if (e.touches && e.touches[0]) {
        self.recordEvent('mouse_move', {
          x: Math.round(e.touches[0].clientX),
          y: Math.round(e.touches[0].clientY),
          screen_w: window.innerWidth,
          screen_h: window.innerHeight,
          touch: true
        });
      }
    }, { passive: true });

    // Click tracking
    window.addEventListener('click', function(e) {
      var target = e.target;
      var targetTag = target ? target.tagName.toLowerCase() : 'unknown';
      var targetClass = target && target.className ? String(target.className).slice(0, 50) : '';

      self.recordEvent('click', {
        x: Math.round(e.clientX),
        y: Math.round(e.clientY),
        tag: targetTag,
        class_hint: targetClass,
        button: e.button === 2 ? 'right' : e.button === 1 ? 'middle' : 'left'
      });
    }, { passive: true });

    // Scroll tracking
    var scrollTimeout = null;
    window.addEventListener('scroll', function() {
      if (scrollTimeout) return;
      scrollTimeout = setTimeout(function() {
        scrollTimeout = null;
        var scrollY = window.scrollY || document.documentElement.scrollTop;
        var maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        var depth = Math.min(100, Math.round((scrollY / maxScroll) * 100));

        self.recordEvent('scroll', {
          scroll_y: Math.round(scrollY),
          depth_percent: depth
        });
      }, 100);
    }, { passive: true });

    // SPA Route Navigation Tracking
    var origPushState = history.pushState;
    if (origPushState) {
      history.pushState = function() {
        origPushState.apply(history, arguments);
        self.trackPageView();
      };
    }
    window.addEventListener('popstate', function() {
      self.trackPageView();
    });

    // Unload flush via sendBeacon
    window.addEventListener('visibilitychange', function() {
      if (document.visibilityState === 'hidden') {
        self.flush(true);
      }
    });
  };

  BotPulseSDK.prototype.trackPageView = function() {
    this.recordEvent('page_view', {
      title: document.title || '',
      referrer: document.referrer || '',
      path: window.location.pathname
    });
  };

  BotPulseSDK.prototype.trackEcommerce = function(action, details) {
    this.recordEvent('ecommerce_' + (action || 'action'), details || {});
  };

  BotPulseSDK.prototype.recordEvent = function(eventType, payload) {
    if (!this.enabled) return;
    this.sequenceNum++;
    this.eventQueue.push({
      event_type: eventType,
      url: window.location.href,
      timestamp: Date.now(),
      sequence_num: this.sequenceNum,
      payload: payload || {}
    });

    if (this.eventQueue.length >= this.batchSize) {
      this.flush(false);
    }
  };

  BotPulseSDK.prototype.startBatchTimer = function() {
    var self = this;
    this.timer = setInterval(function() {
      if (self.eventQueue.length > 0) {
        self.flush(false);
      }
    }, this.batchIntervalMs);
  };

  BotPulseSDK.prototype.flush = function(useBeacon) {
    var self = this;
    if (this.eventQueue.length === 0) return;
    var eventsToSend = this.eventQueue.slice();
    this.eventQueue = [];

    var payload = {
      site_key: this.siteKey,
      session_id: this.sessionId,
      visitor_id: this.visitorId,
      user_agent: navigator.userAgent,
      resemble_token: this.resembleToken,
      api_key: this.apiKey,
      gemini_api_key: this.geminiApiKey,
      events: eventsToSend
    };

    var targetUrl = this.endpoint + '/events';

    if (useBeacon && navigator.sendBeacon) {
      try {
        var blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
        navigator.sendBeacon(targetUrl, blob);
        return;
      } catch (err) {}
    }

    fetch(targetUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).then(function(resp) {
      if (resp.ok) {
        return resp.json();
      }
    }).then(function(data) {
      if (data && data.decision_token) {
        self.storeDecisionToken(data.decision_token);

        var normalizedAction = String(data.action || '').toLowerCase();

        // Silent Proof-of-Work execution for VERIFY / challenged sessions
        if (normalizedAction === 'verify' && data.pow_challenge) {
          self.solveAndSubmitPoW(data.pow_challenge);
        }

        if (self.onDecisionCallback) {
          self.onDecisionCallback({
            action: normalizedAction,
            riskScore: data.risk_score,
            token: data.decision_token,
            powChallengeIssued: Boolean(normalizedAction === 'verify' && data.pow_challenge)
          });
        }
      }
    }).catch(function(err) {
      console.warn('[BotPulse SDK] Telemetry delivery failed to ' + targetUrl, err);
      // Re-queue on connection failure, capped at 50 to prevent buffer overflow
      self.eventQueue = eventsToSend.concat(self.eventQueue).slice(-50);
    });
  };

  // Pure-JS RFC 6234 SHA-256 fallback (for non-secure HTTP contexts where crypto.subtle is unavailable)
  function sha256FallbackHex(ascii) {
    function rightRotate(value, amount) {
      return (value >>> amount) | (value << (32 - amount));
    }

    var mathPow = Math.pow;
    var maxWord = mathPow(2, 32);
    var result = '';
    var words = [];
    var asciiBitLength = ascii.length * 8;
    var hash = sha256FallbackHex._h = sha256FallbackHex._h || [];
    var k = sha256FallbackHex._k = sha256FallbackHex._k || [];
    var primeCounter = k.length;
    var isComposite = {};

    for (var candidate = 2; primeCounter < 64; candidate++) {
      if (!isComposite[candidate]) {
        for (var i = 0; i < 313; i += candidate) {
          isComposite[i] = candidate;
        }
        hash[primeCounter] = (mathPow(candidate, 0.5) * maxWord) | 0;
        k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
      }
    }

    var h = hash.slice(0, 8);
    ascii += '\x80';
    while ((ascii.length % 64) - 56) ascii += '\x00';
    for (var j = 0; j < ascii.length; j++) {
      var code = ascii.charCodeAt(j);
      words[j >> 2] |= code << (((3 - j) % 4) * 8);
    }
    words[words.length] = ((asciiBitLength / maxWord) | 0);
    words[words.length] = (asciiBitLength | 0);

    for (var wIdx = 0; wIdx < words.length;) {
      var w = words.slice(wIdx, wIdx += 16);
      var oldHash = h.slice(0);
      for (var t = 0; t < 64; t++) {
        var w15 = w[t - 15], w2 = w[t - 2];
        var a = h[0], e = h[4];
        var temp1 = h[7]
          + (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25))
          + ((e & h[5]) ^ ((~e) & h[6]))
          + k[t]
          + (w[t] = (t < 16) ? w[t] : (
            w[t - 16]
            + (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3))
            + w[t - 7]
            + (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10))
          ) | 0);
        var temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22))
          + ((a & h[1]) ^ (a & h[2]) ^ (h[1] & h[2]));
        h = [(temp1 + temp2) | 0].concat(h);
        h[4] = (h[4] + temp1) | 0;
        h.pop();
      }
      for (var m = 0; m < 8; m++) {
        h[m] = (h[m] + oldHash[m]) | 0;
      }
    }

    for (var n = 0; n < 8; n++) {
      for (var s = 3; s + 1; s--) {
        var b = (h[n] >> (s * 8)) & 255;
        result += ((b < 16) ? '0' : '') + b.toString(16);
      }
    }
    return result;
  }

  // Fast async SHA-256 using native Web Crypto API with authentic SHA-256 fallback
  async function computeSha256Hex(str) {
    if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle && typeof TextEncoder !== 'undefined') {
      var buffer = new TextEncoder().encode(str);
      var hashBuffer = await window.crypto.subtle.digest('SHA-256', buffer);
      var hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(function(b) { return b.toString(16).padStart(2, '0'); }).join('');
    }
    return sha256FallbackHex(str);
  }

  BotPulseSDK.prototype.solveProofOfWork = async function(challenge) {
    if (!challenge || typeof challenge.seed !== 'string' || !challenge.seed || !challenge.challenge_id || !challenge.signature) {
      throw new Error('Invalid Proof-of-Work challenge payload');
    }

    var difficulty = parseInt(challenge.difficulty, 10);
    if (isNaN(difficulty) || difficulty < MIN_POW_DIFFICULTY || difficulty > MAX_POW_DIFFICULTY) {
      throw new Error('Unsupported Proof-of-Work difficulty: ' + challenge.difficulty);
    }

    var expiresAt = Number(challenge.expires_at || 0);
    if (expiresAt > 0 && Math.floor(Date.now() / 1000) >= expiresAt) {
      throw new Error('Proof-of-Work challenge already expired');
    }

    var seed = challenge.seed;
    var prefix = '0'.repeat(difficulty);
    var nowFn = (typeof performance !== 'undefined' && performance.now) ? function() { return performance.now(); } : function() { return Date.now(); };
    var startTime = nowFn();
    var sliceStart = startTime;
    var nonce = 0;

    while (nonce < MAX_POW_ATTEMPTS) {
      var candidate = seed + ':' + nonce;
      var hash = await computeSha256Hex(candidate);
      if (hash.startsWith(prefix)) {
        var durationMs = nowFn() - startTime;
        var solution = {
          challenge_id: challenge.challenge_id,
          seed: challenge.seed,
          difficulty: difficulty,
          expires_at: challenge.expires_at,
          signature: challenge.signature,
          nonce: nonce,
          hash: hash,
          time_taken_ms: Math.round(durationMs * 10) / 10
        };
        if (challenge.bound_session_id) {
          solution.bound_session_id = challenge.bound_session_id;
        }
        if (challenge.site_id) {
          solution.site_id = challenge.site_id;
        }
        return solution;
      }

      nonce++;
      // Periodically check expiration & yield to keep UI responsive (~60fps frame budget)
      if (nonce % 250 === 0) {
        if (expiresAt > 0 && Math.floor(Date.now() / 1000) >= expiresAt) {
          throw new Error('Proof-of-Work challenge expired while solving');
        }
        if (nowFn() - sliceStart >= 12) {
          await new Promise(function(r) { setTimeout(r, 0); });
          sliceStart = nowFn();
        }
      }
    }

    throw new Error('Proof-of-Work solver exceeded maximum attempt budget');
  };

  BotPulseSDK.prototype.solveAndSubmitPoW = async function(challenge) {
    var self = this;
    if (!challenge || !challenge.challenge_id) return null;

    // Prevent duplicate or simultaneous PoW solving
    if (this.powInProgress) {
      return null;
    }
    if (this.solvedPowChallenges[challenge.challenge_id]) {
      return null;
    }

    this.powInProgress = true;
    this.activePowChallengeId = challenge.challenge_id;

    try {
      console.log('[BotPulse Security] Executing silent Proof-of-Work challenge (diff=' + challenge.difficulty + ')...');
      var solution = await this.solveProofOfWork(challenge);
      solution.session_id = this.sessionId;
      solution.site_key = this.siteKey;

      var verifyUrl = this.endpoint + '/prevention/pow/verify';
      var resp = await fetch(verifyUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(solution)
      });

      if (!resp.ok) {
        console.warn('[BotPulse Security] Proof-of-Work verification endpoint returned HTTP ' + resp.status);
        return null;
      }

      var result = await resp.json();
      if (result && result.verified && result.elevated_token) {
        self.solvedPowChallenges[challenge.challenge_id] = Date.now();
        self.storeDecisionToken(result.elevated_token);
        console.log('[BotPulse Security] Proof-of-Work verified in ' + solution.time_taken_ms + 'ms! Upgraded to ALLOW.');
        if (self.onDecisionCallback) {
          self.onDecisionCallback({
            action: result.new_action || 'allow',
            riskScore: result.risk_score,
            visitorType: result.visitor_type,
            token: result.elevated_token,
            pow_verified: true,
            time_taken_ms: solution.time_taken_ms
          });
        }
        return result;
      } else {
        console.warn('[BotPulse Security] Proof-of-Work verification rejected:', result && (result.reason || result.error));
        return result;
      }
    } catch (err) {
      console.warn('[BotPulse Security] Proof-of-Work solver/submission error:', err && err.message ? err.message : err);
      return null;
    } finally {
      self.powInProgress = false;
      self.activePowChallengeId = null;
    }
  };

  var instance = new BotPulseSDK();
  window.BotPulse = instance;
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = instance;
  }
})(typeof window !== 'undefined' ? window : globalThis);
