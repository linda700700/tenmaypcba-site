/*
 * First-party collection for tenmaypcba.com.
 *
 * This lives in a file rather than inline <head> because the prerender step
 * copies index.html's head into every route: an inline block would become 11
 * copies, and arming or fixing it would mean editing 11 HTML files. Here there
 * is exactly one copy to change.
 *
 * Disarmed while window.TM_DATA_ENDPOINT is empty. Disarmed means: no visitor
 * id is written, no request leaves the page, and the quote form sends no extra
 * field. Nothing about this file can change behaviour until an endpoint exists.
 *
 * When armed it does three things the workbench needs and Google cannot give:
 *   1. a stable visitor id, so two visits can be recognised as one person;
 *   2. the ad or search term that landed them, kept across pages;
 *   3. a copy of every event the GA4 tracker emits, on our own server.
 * It carries no email address, company name, or anything typed into a field.
 */
(function () {
  // ---- the switch ----------------------------------------------------------
  // Empty = disarmed. Set to 'https://api.tenmaypcba.com' once that host answers
  // GET /healthz. This is the only line to change.
  var ENDPOINT = 'https://api.tenmaypcba.com';
  // -------------------------------------------------------------------------

  var endpoint = ENDPOINT.replace(/\/+$/, '');

  // Always defined, so callers never need to test for it.
  window.tmBeacon = function () {};

  if (!endpoint) return;

  var VID_KEY = 'tenmay_vid';
  var UTM_KEY = 'tenmay_utm';
  var REF_KEY = 'tenmay_ref';
  var LAND_KEY = 'tenmay_land';

  function uuid() {
    if (window.crypto && window.crypto.randomUUID) return window.crypto.randomUUID();
    return 'v_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
  }

  var vid;
  try {
    vid = window.localStorage.getItem(VID_KEY);
    if (!vid) {
      vid = uuid();
      window.localStorage.setItem(VID_KEY, vid);
    }
  } catch (e) {
    vid = uuid();
  }
  window.tmVisitorId = vid;

  /*
   * The landing page is whatever page carried the campaign parameters, and it
   * must survive until the session ends. Without it a visitor who enters on an
   * article and converts on the home page looks like a direct visit.
   */
  var utm = {};
  var referrer = '';
  try {
    var q = new URLSearchParams(window.location.search);
    ['source', 'medium', 'campaign', 'term', 'content'].forEach(function (k) {
      var v = q.get('utm_' + k);
      if (v) utm[k] = v.slice(0, 120);
    });

    if (q.get('utm_source') || q.get('utm_medium') || q.get('gclid') || q.get('ref')) {
      window.sessionStorage.setItem(UTM_KEY, JSON.stringify(utm));
      window.sessionStorage.setItem(REF_KEY, q.get('ref') || document.referrer || '');
      window.sessionStorage.setItem(LAND_KEY, window.location.pathname);
    } else {
      utm = JSON.parse(window.sessionStorage.getItem(UTM_KEY) || '{}');
      if (!window.sessionStorage.getItem(LAND_KEY)) {
        window.sessionStorage.setItem(LAND_KEY, window.location.pathname);
      }
    }
    referrer = window.sessionStorage.getItem(REF_KEY) || document.referrer || '';
  } catch (e) {
    utm = {};
  }

  var landing = '';
  try { landing = window.sessionStorage.getItem(LAND_KEY) || window.location.pathname; } catch (e) {
    landing = window.location.pathname;
  }

  window.tmBeacon = function (name, params) {
    var event = { name: name, path: window.location.pathname, ts: Date.now() };
    var p = params || {};
    for (var k in p) {
      if (Object.prototype.hasOwnProperty.call(p, k)) event[k] = p[k];
    }

    if (name === 'page_view') {
      event.ref = referrer.slice(0, 400);
      event.landing = landing;
      for (var u in utm) {
        if (Object.prototype.hasOwnProperty.call(utm, u)) event['utm_' + u] = utm[u];
      }
    }

    var payload = JSON.stringify({ vid: vid, events: [event] });
    try {
      var blob = new Blob([payload], { type: 'text/plain;charset=UTF-8' });
      if (navigator.sendBeacon) {
        navigator.sendBeacon(endpoint + '/collect', blob);
        return;
      }
    } catch (e) { /* fall through to fetch */ }

    try {
      fetch(endpoint + '/collect', {
        method: 'POST',
        body: payload,
        keepalive: true,
        headers: { 'content-type': 'text/plain;charset=UTF-8' },
      });
    } catch (e) { /* collection must never break the page */ }
  };

  /*
   * The GA4 tracker in index.html is installed first and is the only thing the
   * React components call, so wrapping it mirrors every CTA click and form
   * outcome without touching a single component.
   */
  var gaTrack = window.tmTrack;
  window.tmTrack = function (name, params) {
    if (gaTrack) gaTrack(name, params);
    window.tmBeacon(name, params);
  };

  window.tmBeacon('page_view', {});
  window.addEventListener('pagehide', function () {
    window.tmBeacon('session_end', {});
  });
})();
