/**
 * BotPulse Browser Tracking SDK (Universal IIFE Bundle v1.2.0)
 * Non-invasive behavioral telemetry for ÉLVARA Fashion & Protected Web Applications.
 */
(function(window) {
  'use strict';

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
    this.onDecisionCallback = null;
    this.lastMouseTime = 0;
    this.latestDecisionToken = null;
  }

  BotPulseSDK.prototype.init = function(config) {
    if (!config || !config.siteKey) {
      console.warn('[BotPulse SDK] siteKey is required for telemetry ingestion.');
      return;
    }
    this.siteKey = config.siteKey;
    if (config.endpoint) this.endpoint = config.endpoint.replace(/\/+$/, '');
    if (config.enabled !== undefined) this.enabled = config.enabled;
    if (config.batchIntervalMs) this.batchIntervalMs = config.batchIntervalMs;
    if (config.batchSize) this.batchSize = config.batchSize;
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

  BotPulseSDK.prototype.getDecisionToken = function() {
    return this.latestDecisionToken || sessionStorage.getItem('bp_decision_token');
  };

  BotPulseSDK.prototype.initSession = function() {
    var sid = sessionStorage.getItem('bp_session_id');
    if (!sid) {
      sid = 'sess_' + Math.random().toString(36).substring(2, 10) + '_' + Date.now();
      sessionStorage.setItem('bp_session_id', sid);
    }
    this.sessionId = sid;

    var vid = localStorage.getItem('bp_visitor_id');
    if (!vid) {
      vid = 'vis_' + Math.random().toString(36).substring(2, 10) + '_' + Date.now();
      localStorage.setItem('bp_visitor_id', vid);
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
        self.latestDecisionToken = data.decision_token;
        sessionStorage.setItem('bp_decision_token', data.decision_token);

        // Silent Proof-of-Work execution for VERIFY / challenged sessions
        if (data.action === 'verify' && data.pow_challenge) {
          self.solveAndSubmitPoW(data.pow_challenge);
        }

        if (self.onDecisionCallback) {
          self.onDecisionCallback({
            action: data.action,
            riskScore: data.risk_score,
            token: data.decision_token
          });
        }
      }
    }).catch(function() {
      // Re-queue on connection failure
      self.eventQueue = eventsToSend.concat(self.eventQueue);
    });
  };

  // Fast async SHA-256 using native Web Crypto API
  async function computeSha256Hex(str) {
    if (window.crypto && window.crypto.subtle) {
      const buffer = new TextEncoder().encode(str);
      const hashBuffer = await window.crypto.subtle.digest('SHA-256', buffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(function(b) { return b.toString(16).padStart(2, '0'); }).join('');
    }
    var h = 0;
    for (var i = 0; i < str.length; i++) {
      h = ((h << 5) - h) + str.charCodeAt(i);
      h |= 0;
    }
    return Math.abs(h).toString(16).padStart(8, '0');
  }

  BotPulseSDK.prototype.solveProofOfWork = async function(challenge) {
    var seed = challenge.seed;
    var difficulty = challenge.difficulty || 3;
    var prefix = '0'.repeat(difficulty);
    var startTime = performance.now();
    var nonce = 0;

    while (true) {
      var candidate = seed + ':' + nonce;
      var hash = await computeSha256Hex(candidate);
      if (hash.startsWith(prefix)) {
        var durationMs = performance.now() - startTime;
        return {
          challenge_id: challenge.challenge_id,
          seed: challenge.seed,
          difficulty: difficulty,
          expires_at: challenge.expires_at,
          signature: challenge.signature,
          nonce: nonce,
          hash: hash,
          time_taken_ms: Math.round(durationMs * 10) / 10
        };
      }
      nonce++;
      if (nonce % 500 === 0) {
        await new Promise(function(r) { setTimeout(r, 0); });
      }
    }
  };

  BotPulseSDK.prototype.solveAndSubmitPoW = async function(challenge) {
    var self = this;
    try {
      console.log('[BotPulse Security] Executing silent Proof-of-Work hardware challenge (diff=' + challenge.difficulty + ')...');
      var solution = await this.solveProofOfWork(challenge);
      solution.session_id = this.sessionId;
      solution.site_id = this.siteKey;

      var verifyUrl = this.endpoint + '/prevention/pow/verify';
      var resp = await fetch(verifyUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(solution)
      });
      if (resp.ok) {
        var result = await resp.json();
        if (result.verified && result.elevated_token) {
          self.latestDecisionToken = result.elevated_token;
          sessionStorage.setItem('bp_decision_token', result.elevated_token);
          console.log('[BotPulse Security] Proof-of-Work verified in ' + solution.time_taken_ms + 'ms! Upgraded to ALLOW.');
          if (self.onDecisionCallback) {
            self.onDecisionCallback({
              action: 'allow',
              riskScore: 4,
              token: result.elevated_token,
              pow_verified: true,
              time_taken_ms: solution.time_taken_ms
            });
          }
        }
      }
    } catch (err) {
      console.warn('[BotPulse Security] Proof-of-Work solver exception:', err);
    }
  };

  var instance = new BotPulseSDK();
  window.BotPulse = instance;
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = instance;
  }
})(typeof window !== 'undefined' ? window : this);
