/**
 * tenmay-dataplane — the first-party side of tenmaypcba.com.
 *
 * Why this exists: the workbench backend exposes only /rest/v1. It has no
 * realtime channel (404 on /realtime), no object storage (404 on /storage) and
 * no DDL, so live notifications, visitor behaviour, attribution and uploaded
 * BOM files have nowhere to live inside it. This process owns those four
 * things and leaves the workbench database as the system of record for
 * inquiries only.
 *
 * Routes
 *   GET  /healthz                 liveness, no auth
 *   POST /collect                 browser beacon: page_view, cta_click, form_start
 *   POST /intake                  RFQ submit: validates, writes the inquiry to
 *                                 the workbench gateway, records attribution,
 *                                 pushes inquiry_created to every open console
 *   GET  /attr?ids=26,27          attribution for one or more inquiries
 *   GET  /rt?token=<jwt>          Server-Sent Events stream for the console
 *   GET  /stats/online            how many visitors are active right now
 *   GET  /seo/summary?days=28     Search Console totals + the run behind them
 *   GET  /seo/pages?days=28       clicks/impressions/position per page
 *   GET  /seo/queries?days=28     clicks/impressions/position per query
 *   GET  /seo/series?days=90      one point per day, for the chart
 *   POST /seo/sync?days=10        pull now instead of waiting for cron
 *
 * SSE rather than WebSocket on purpose: the stream is one-way, EventSource
 * reconnects by itself, and it needs no dependency on either end.
 */

import http from 'node:http';
import crypto from 'node:crypto';
import { openStore } from './lib/db.js';
import { runSync, syncStatus } from './lib/gsc-sync.js';

const PORT = Number(process.env.PORT || 8787);
const DRY_RUN = process.env.DRY_RUN === '1';
const DEV_ALLOW = process.env.DEV_ALLOW === '1';

const GATEWAY = process.env.GATEWAY_URL || '';
const ANON_KEY = process.env.ANON_KEY || '';
const BOT_EMAIL = process.env.BOT_EMAIL || '';
const BOT_PASS = process.env.BOT_PASS || '';

const ORIGINS = (process.env.ALLOWED_ORIGINS || 'https://tenmaypcba.com,https://www.tenmaypcba.com,https://tenmay-workbench.site.accio.ai')
  .split(',').map((s) => s.trim()).filter(Boolean);

const store = await openStore();
const clients = new Set();          // open SSE responses
const authCache = new Map();        // token hash -> expiry

/* ── helpers ─────────────────────────────────────────────────────────────── */

const clean = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
const sha = (s) => crypto.createHash('sha256').update(s).digest('hex').slice(0, 16);

function cors(origin) {
  const allow = ORIGINS.includes(origin) ? origin : ORIGINS[0] || '*';
  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'content-type, authorization',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  };
}

function send(res, status, body, origin, extra = {}) {
  const payload = typeof body === 'string' ? body : JSON.stringify(body);
  res.writeHead(status, {
    ...cors(origin),
    'Content-Type': typeof body === 'string' ? 'text/plain; charset=utf-8' : 'application/json',
    'Content-Length': Buffer.byteLength(payload),
    ...extra,
  });
  res.end(payload);
}

async function readJson(req, limit = 262144) {
  let size = 0;
  const chunks = [];
  for await (const chunk of req) {
    size += chunk.length;
    if (size > limit) throw new Error('payload too large');
    chunks.push(chunk);
  }
  if (!chunks.length) return {};
  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}

const deviceOf = (ua) => (/mobile|android|iphone|ipad/i.test(ua || '') ? 'mobile' : 'desktop');

/* ── console auth ────────────────────────────────────────────────────────── */

/**
 * The console is a public static bundle, so a shared secret in it is not a
 * secret. Instead the browser sends the operator's own access token and we ask
 * the gateway whether it is valid. Revoking a seat therefore revokes the
 * stream, which a hard-coded key never would.
 */
async function operatorOk(token) {
  if (DEV_ALLOW) return true;
  if (!token || token.length < 20) return false;

  const key = sha(token);
  const hit = authCache.get(key);
  if (hit && hit > Date.now()) return true;

  if (!GATEWAY || !ANON_KEY) return false;
  try {
    const res = await fetch(`${GATEWAY}/auth/v1/user`, {
      headers: { apikey: ANON_KEY, Authorization: `Bearer ${token}` },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return false;
    authCache.set(key, Date.now() + 60_000);
    if (authCache.size > 500) authCache.clear();
    return true;
  } catch {
    return false;
  }
}

/* ── inquiry intake ──────────────────────────────────────────────────────── */

let tokenCache = { token: '', exp: 0 };

async function botLogin() {
  if (tokenCache.token && tokenCache.exp > Date.now() + 60_000) return tokenCache.token;
  const res = await fetch(`${GATEWAY}/auth/v1/token?grant_type=password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', apikey: ANON_KEY },
    body: JSON.stringify({ email: BOT_EMAIL, password: BOT_PASS }),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) return null;
  const data = await res.json();
  tokenCache = { token: data.access_token, exp: Date.now() + Number(data.expires_in || 3600) * 1000 };
  return tokenCache.token;
}

async function insertInquiry(row) {
  const token = await botLogin();
  if (!token) return { ok: false, status: 0, text: 'sign-in failed' };
  const res = await fetch(`${GATEWAY}/rest/v1/inquiries`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: ANON_KEY,
      Authorization: `Bearer ${token}`,
      Prefer: 'return=representation',
    },
    body: JSON.stringify(row),
    signal: AbortSignal.timeout(10_000),
  });
  return { ok: res.ok, status: res.status, text: await res.text() };
}

async function handleIntake(req, res, origin) {
  const body = await readJson(req);

  if (clean(body.website, 200)) return send(res, 400, { ok: false, error: 'rejected' }, origin);

  const customer = clean(body.company || body.customer, 120);
  const need = clean(body.need || body.message, 4000);
  if (!customer) return send(res, 400, { ok: false, error: 'company required' }, origin);
  if (!need) return send(res, 400, { ok: false, error: 'request required' }, origin);

  const email = clean(body.email, 160);
  if (email && !isEmail(email)) return send(res, 400, { ok: false, error: 'invalid email' }, origin);

  const qty = Number(body.quantity);
  const row = {
    customer,
    contact_name: clean(body.contact_name || body.contact, 120) || null,
    email: email || null,
    country: clean(body.country, 80) || null,
    country_code: clean(body.country_code, 2).toUpperCase() || null,
    channel: 'form',
    need,
    quantity: Number.isFinite(qty) && qty > 0 && qty <= 10_000_000 ? Math.floor(qty) : null,
    process: clean(body.process, 120) || null,
    urgency: clean(body.urgency, 10) === 'urgent' ? 'urgent' : 'normal',
    status: 'new',
    origin: 'website',
  };

  const vid = clean(body.vid, 64) || null;
  const utm = body.utm && typeof body.utm === 'object' ? body.utm : {};

  let id;
  if (DRY_RUN) {
    id = 9999;
  } else {
    let out = await insertInquiry(row);
    if (out.status === 401) {
      tokenCache = { token: '', exp: 0 };
      out = await insertInquiry(row);
    }
    if (!out.ok) {
      return send(res, 502, { ok: false, error: 'could not record request', status: out.status }, origin);
    }
    try {
      const parsed = JSON.parse(out.text);
      id = Array.isArray(parsed) && parsed[0] ? parsed[0].id : null;
    } catch { id = null; }
  }

  // Attribution lives here, not in the workbench table: that schema is fixed and
  // cannot take a visitor column. The inquiry id is the join key.
  //
  // The form only has to carry vid. Landing page, referrer and campaign are read
  // back from the session the beacon already recorded, so a visitor who arrives
  // from an ad and submits without touching anything else is still attributed.
  if (vid) {
    const sess = await store.getSession(vid);
    const pick = (a, b) => clean(a, 400) || b || null;
    await store.saveLeadAttr(id, vid, {
      landing: pick(body.landing, sess?.landing),
      referrer: pick(body.referrer, sess?.referrer),
      country: row.country_code || sess?.country || clean(utm.country, 2) || null,
      device: sess?.device || deviceOf(req.headers['user-agent']),
      utm: {
        source: pick(utm.source, sess?.utm_source),
        medium: pick(utm.medium, sess?.utm_medium),
        campaign: pick(utm.campaign, sess?.utm_campaign),
        term: pick(utm.term, sess?.utm_term),
        content: clean(utm.content, 120) || null,
      },
      journey: await store.journey(vid),
    });
  }

  broadcast('inquiry_created', {
    id,
    ref: id ? `INQ-${String(id).padStart(4, '0')}` : null,
    customer,
    email: email || null,
    process: row.process,
    quantity: row.quantity,
    at: new Date().toISOString(),
  });

  return send(res, 201, { ok: true, id, ref: id ? `INQ-${String(id).padStart(4, '0')}` : null }, origin);
}

/* ── behaviour collection ────────────────────────────────────────────────── */

async function handleCollect(req, res, origin) {
  const body = await readJson(req);
  const vid = clean(body.vid, 64);
  if (!vid) return send(res, 204, '', origin);

  const list = (Array.isArray(body.events) ? body.events : [body.events]).filter(Boolean).slice(0, 50);
  if (!list.length) return send(res, 204, '', origin);

  const ua = req.headers['user-agent'];
  const country = (req.headers['cf-ipcountry'] || '').toString().slice(0, 2) || null;

  const normalised = list.map((e) => ({
    sid: clean(e.sid, 64) || null,
    name: clean(e.name, 40) || 'unknown',
    path: clean(e.path, 200) || null,
    ref: clean(e.ref, 300) || null,
    utm_source: clean(e.utm_source, 80) || null,
    utm_medium: clean(e.utm_medium, 80) || null,
    utm_campaign: clean(e.utm_campaign, 120) || null,
    utm_term: clean(e.utm_term, 120) || null,
    utm_content: clean(e.utm_content, 120) || null,
    country,
    device: deviceOf(ua),
    meta: e.meta && typeof e.meta === 'object' ? e.meta : null,
    ts: Number(e.ts) || Date.now(),
  }));

  await store.addEvents(vid, normalised);

  const first = normalised[0];
  if (first.name === 'page_view') {
    await store.touchSession(vid, {
      landing: first.path,
      referrer: first.ref,
      utm_source: first.utm_source,
      utm_medium: first.utm_medium,
      utm_campaign: first.utm_campaign,
      utm_term: first.utm_term,
      country: first.country,
      device: first.device,
    });
  } else {
    await store.touchSession(vid, {});
  }

  return send(res, 204, '', origin);
}

/* ── SSE ─────────────────────────────────────────────────────────────────── */

function broadcast(event, data) {
  const frame = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
  for (const res of clients) {
    try { res.write(frame); } catch { clients.delete(res); }
  }
}

async function handleStream(req, res, url, origin) {
  const token = url.searchParams.get('token') || '';
  if (!(await operatorOk(token))) return send(res, 401, { ok: false, error: 'unauthorized' }, origin);

  res.writeHead(200, {
    ...cors(origin),
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache, no-transform',
    Connection: 'keep-alive',
    'X-Accel-Buffering': 'no',
  });
  res.write(`event: ready\ndata: {"online":${await store.onlineSince(5 * 60_000)}}\n\n`);
  clients.add(res);

  const beat = setInterval(() => {
    try { res.write(': ping\n\n'); } catch { /* cleaned on close */ }
  }, 15_000);

  req.on('close', () => { clearInterval(beat); clients.delete(res); });
}


/* ── search console ──────────────────────────────────────────────────────── */

/*
 * Read endpoints are operator-only for the same reason /attr is: this is
 * business data and the console bundle is public, so the browser proves who it
 * is with its own session token rather than with a key baked into the build.
 *
 * Shape is fixed on purpose — the console falls back to sample data when any of
 * these fields are missing, and an explicit `configured: false` is what tells it
 * to do so instead of rendering zeros as if Google had said zero.
 */
const DAYS = (raw, fallback = 28) => {
  const n = Number(raw);
  return [7, 28, 90, 180].includes(n) ? n : fallback;
};

async function handleSeoSummary(res, url, origin) {
  const days = DAYS(url.searchParams.get('days'));
  const status = await syncStatus(store);
  const win = await store.gscWindow(days);
  return send(res, 200, {
    ok: true,
    days,
    ...status,
    window: win ? { from: win.from, to: win.to, previousFrom: win.prevFrom, previousTo: win.prevTo } : null,
    coverage: win ? win.coverage : null,
    current: win ? win.current : null,
    previous: win ? win.previous : null,
  }, origin);
}

async function handleSeoTable(res, url, origin, dim) {
  const days = DAYS(url.searchParams.get('days'));
  const limit = Math.max(1, Math.min(500, Number(url.searchParams.get('limit')) || 100));
  const rows = await store.gscBreakdown(dim, days, limit);
  const win = await store.gscWindow(days);
  return send(res, 200, {
    ok: true,
    days,
    dim,
    window: win ? { from: win.from, to: win.to } : null,
    rows: rows.map((r) => ({
      [dim === 'page' ? 'page' : 'query']: r.key,
      clicks: r.clicks,
      impressions: r.impressions,
      ctr: r.ctr,
      position: r.position,
    })),
  }, origin);
}

async function handleSeoSeries(res, url, origin) {
  const days = DAYS(url.searchParams.get('days'), 90);
  const rows = await store.gscSeries(days);
  return send(res, 200, { ok: true, days, points: rows }, origin);
}

async function handleSeoSync(res, url, origin) {
  const days = Math.max(1, Math.min(480, Number(url.searchParams.get('days')) || 10));
  const out = await runSync(store, { days });
  return send(res, out.ok ? 200 : 502, out, origin);
}

/* ── server ──────────────────────────────────────────────────────────────── */

const server = http.createServer(async (req, res) => {
  const origin = req.headers.origin || '';
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);

  if (req.method === 'OPTIONS') {
    res.writeHead(204, cors(origin));
    return res.end();
  }

  try {
    if (url.pathname === '/healthz') {
      return send(res, 200, {
        ok: true,
        store: store.name,
        dryRun: DRY_RUN,
        clients: clients.size,
        seo: await syncStatus(store),
      }, origin);
    }
    if (url.pathname === '/collect' && req.method === 'POST') return await handleCollect(req, res, origin);
    if (url.pathname === '/intake' && req.method === 'POST') return await handleIntake(req, res, origin);

    if (url.pathname === '/rt') return await handleStream(req, res, url, origin);

    if (url.pathname === '/attr') {
      const bearer = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
      const token = bearer || url.searchParams.get('token') || '';
      if (!(await operatorOk(token))) return send(res, 401, { ok: false, error: 'unauthorized' }, origin);
      const ids = (url.searchParams.get('ids') || '').split(',')
        .map((s) => Number(s.trim())).filter((n) => Number.isFinite(n) && n > 0).slice(0, 50);
      const rows = await store.getLeadAttr(ids);
      return send(res, 200, { ok: true, rows }, origin);
    }

    if (url.pathname === '/stats/online') {
      return send(res, 200, { ok: true, online: await store.onlineSince(5 * 60_000) }, origin);
    }


    if (url.pathname.startsWith('/seo/')) {
      if (url.pathname === '/seo/sync' && req.method !== 'POST') {
        return send(res, 405, { ok: false, error: 'use POST' }, origin);
      }
      const bearer = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
      const token = bearer || url.searchParams.get('token') || '';
      if (!(await operatorOk(token))) return send(res, 401, { ok: false, error: 'unauthorized' }, origin);

      if (url.pathname === '/seo/summary') return await handleSeoSummary(res, url, origin);
      if (url.pathname === '/seo/pages') return await handleSeoTable(res, url, origin, 'page');
      if (url.pathname === '/seo/queries') return await handleSeoTable(res, url, origin, 'query');
      if (url.pathname === '/seo/series') return await handleSeoSeries(res, url, origin);
      if (url.pathname === '/seo/sync' && req.method === 'POST') return await handleSeoSync(res, url, origin);
      return send(res, 404, { ok: false, error: 'not found' }, origin);
    }

    return send(res, 404, { ok: false, error: 'not found' }, origin);
  } catch (err) {
    return send(res, 500, { ok: false, error: String(err.message || err) }, origin);
  }
});

server.listen(PORT, () => {
  console.log(`dataplane on :${PORT}  store=${store.name}  dryRun=${DRY_RUN}  devAllow=${DEV_ALLOW}`);
});

for (const sig of ['SIGINT', 'SIGTERM']) {
  process.on(sig, async () => {
    for (const c of clients) { try { c.end(); } catch { /* ignore */ } }
    await store.close();
    server.close(() => process.exit(0));
  });
}
