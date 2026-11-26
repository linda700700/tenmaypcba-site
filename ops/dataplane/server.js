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
 *   GET  /upload/<token>          the buyer's upload page (noindex, token-gated)
 *   PUT  /upload/<token>/file     one file, streamed to disk, size-capped
 *   POST /upload/<token>/done     the buyer says the set is complete
 *   GET  /upload/list?token=<jwt> operator: links and what arrived
 *   GET  /upload/manifest?id=…    operator: files inside one link
 *   GET  /upload/download?id=…    operator: stream one file back
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
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import { Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';
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

/* ── upload links (option B) ─────────────────────────────────────────────── */

const UPLOAD_DIR = process.env.UPLOAD_DIR || '/data/uploads';
const PUBLIC_API = process.env.PUBLIC_API || 'https://api.tenmaypcba.com';

// Two clocks, deliberately separate:
//   LINK_TTL_MS  how long the link keeps accepting files
//   PURGE_DAYS   how long the files stay on disk afterwards
// A quote can take two weeks to become an order; purging on link expiry throws
// away the Gerber an engineer is still working from. Keeping the link writable
// for the same period leaves an upload URL alive in an inbox for months.
const LINK_TTL_MS = Number(process.env.LINK_TTL_MS || 7 * 24 * 3600 * 1000);
const PURGE_DAYS = Number(process.env.PURGE_DAYS || 90);

const MAX_FILE_BYTES = Number(process.env.MAX_FILE_BYTES || 40 * 1024 * 1024);
const MAX_FILES = Number(process.env.MAX_FILES || 6);
const MAX_TOTAL_BYTES = Number(process.env.MAX_TOTAL_BYTES || 120 * 1024 * 1024);

const LINK_DIR = path.join(UPLOAD_DIR, 'links');

// If the volume is not mounted the process must still serve the site. Uploads
// degrade to "no link issued", which the form treats as the pre-change path.
let uploadsReady = true;
try {
  fs.mkdirSync(LINK_DIR, { recursive: true, mode: 0o700 });
} catch (err) {
  uploadsReady = false;
  console.error(`[upload] disabled — cannot create ${LINK_DIR}: ${err.message}`);
}

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

/* ── upload links (option B) ─────────────────────────────────────────────── */

/*
 * The RFQ form never carries a file. /intake mints a token and returns its URL;
 * the buyer uploads through a page that token opens.
 *
 * Why a separate page rather than an attachment field on the form:
 *   - the upload page is same-origin to this API, so the PUT needs no preflight
 *     and no CORS change at all
 *   - the buyer can upload hours or days later without re-submitting, which is
 *     the common case when the Gerber sits on a colleague's machine
 *   - a token can expire without touching the inquiry row
 *
 * The token is created inside /intake, from the same request that creates the
 * inquiry, so it is never issued to somebody who did not just submit. An
 * "email me a link" endpoint could not promise that without an ownership check.
 *
 * Nothing here is public: a Gerber archive is the customer's unreleased design,
 * and an INQ- reference must never be enough to fetch one.
 */

const TOKEN_RE = /^[A-Za-z0-9_-]{32}$/;

// Operator verbs under /upload. None is 32 characters, so none can collide with
// a real token.
const OP_VERBS = new Set(['list', 'manifest', 'download']);

// Ten uploads a minute per IP. Enough for six files plus retries, not enough to
// fill the disk. In memory on purpose: this runs on one container, and a
// restart clearing the counters is acceptable for a limit this coarse.
//
// Configurable so the limit can be exercised in a test without waiting a
// minute between assertions.
const PUT_RATE = Number(process.env.PUT_RATE || 10);
const putHits = new Map();

function putAllowed(ip) {
  const now = Date.now();
  const win = putHits.get(ip);
  if (!win || win.reset < now) {
    putHits.set(ip, { n: 1, reset: now + 60_000 });
    if (putHits.size > 2000) putHits.clear();
    return true;
  }
  if (win.n >= PUT_RATE) return false;
  win.n += 1;
  return true;
}

// Untrusted filename → something safe to touch on disk. The original name is
// kept as the suffix so the engineer still sees "bom.xlsx", but the prefix is
// ours: it makes collisions impossible and stops "../" from ever being a path.
// Lowercased because a case-insensitive volume would otherwise let two uploads
// overwrite each other.
function safeName(raw) {
  const base = path.basename(String(raw || 'file')).toLowerCase();
  const kept = base.replace(/[^a-z0-9._-]/g, '_').replace(/^[._-]+/, '').slice(-80);
  const stamp = Date.now().toString(36) + crypto.randomBytes(3).toString('hex');
  return `${stamp}-${kept || 'file'}`;
}

const linkPath = (token) => path.join(LINK_DIR, `${token}.json`);
const linkDir = (token) => path.join(UPLOAD_DIR, token);

async function mkLink(ref, email) {
  const token = crypto.randomBytes(24).toString('base64url'); // 32 chars
  const meta = {
    token,
    ref,
    email: email || null,
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + LINK_TTL_MS).toISOString(),
    purgeAt: new Date(Date.now() + PURGE_DAYS * 86_400_000).toISOString(),
    doneAt: null,
    fileCount: 0,
    totalBytes: 0,
  };
  await fsp.writeFile(linkPath(token), JSON.stringify(meta, null, 2), { mode: 0o600 });
  return meta;
}

async function readLink(token) {
  if (!TOKEN_RE.test(token || '')) return null;
  const raw = await fsp.readFile(linkPath(token), 'utf8').catch(() => null);
  if (!raw) return null;
  try {
    const meta = JSON.parse(raw);
    meta.expired = Date.parse(meta.expiresAt) < Date.now();
    return meta;
  } catch {
    return null;
  }
}

async function dirUsage(dir) {
  const names = await fsp.readdir(dir).catch(() => []);
  let bytes = 0;
  let count = 0;
  for (const n of names) {
    if (n.startsWith('.')) continue;
    const st = await fsp.stat(path.join(dir, n)).catch(() => null);
    if (st && st.isFile()) { bytes += st.size; count += 1; }
  }
  return { bytes, count };
}

function sendHtml(res, status, html, origin) {
  res.writeHead(status, {
    ...cors(origin),
    'Content-Type': 'text/html; charset=utf-8',
    'Content-Length': Buffer.byteLength(html),
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'no-referrer',
    'X-Robots-Tag': 'noindex, nofollow',
    // One inline style block and one inline script, nothing else. A crafted file
    // name therefore cannot pull in a remote script, and connect-src 'self' is
    // what the PUT needs and nothing more.
    'Content-Security-Policy':
      "default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline'; connect-src 'self'; img-src 'self'; base-uri 'none'; form-action 'none'",
  });
  res.end(html);
}

function sendAttachment(res, filePath, size, name, origin) {
  res.writeHead(200, {
    ...cors(origin),
    'Content-Type': 'application/octet-stream',
    'Content-Length': size,
    // Always attachment, never inline: a "Gerber" that is really an HTML file
    // must not be rendered by the browser from our own origin.
    'Content-Disposition': `attachment; filename="${name.replace(/[^A-Za-z0-9._-]/g, '_')}"`,
    'X-Content-Type-Options': 'nosniff',
    'Cache-Control': 'no-store',
  });
  fs.createReadStream(filePath).pipe(res);
}

// Streams the body to disk and counts it. Content-Length is advisory — a chunked
// request has none — so the cap is enforced on bytes actually seen.
class ByteLimit extends Transform {
  constructor(max) {
    super();
    this.max = max;
    this.n = 0;
  }
  _transform(chunk, enc, cb) {
    this.n += chunk.length;
    if (this.n > this.max) return cb(new Error('file too large'));
    cb(null, chunk);
  }
}

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const day = (iso) => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? '' : d.toISOString().slice(0, 10);
};

/*
 * Inline and dependency-free on purpose. This page is the only place a buyer
 * touches a raw upload, and it must keep working when the marketing site's
 * bundle is broken or mid-deploy — the two are independent by design.
 *
 * No template literals in the browser code below: this string is itself a
 * template literal, so a nested backtick would need escaping to the point of
 * being unreadable.
 */
const UPLOAD_JS = `
(function () {
  var TOKEN = '__TOKEN__';
  var MAXMB = __MAX_MB__;
  var MAXF = __MAX_FILES__;
  var drop = document.getElementById('drop');
  var pick = document.getElementById('pick');
  var list = document.getElementById('list');
  var msg = document.getElementById('msg');
  var cta = document.getElementById('cta');

  var files = [], ok = 0, busy = false;

  function note(t, k) { msg.hidden = false; msg.className = 'msg ' + (k || ''); msg.textContent = t; }
  function clearNote() { msg.hidden = true; msg.textContent = ''; }

  function row(name, kb) {
    var li = document.createElement('li');
    li.className = 'row';
    var a = document.createElement('span'); a.className = 'n'; a.textContent = name;
    var b = document.createElement('span'); b.className = 's'; b.textContent = kb + ' KB';
    var bar = document.createElement('span'); bar.className = 'bar';
    var fill = document.createElement('i'); bar.appendChild(fill);
    var st = document.createElement('span'); st.className = 'st'; st.textContent = 'queued';
    li.appendChild(a); li.appendChild(b); li.appendChild(bar); li.appendChild(st);
    list.appendChild(li);
    return {
      p: function (v) { fill.style.width = v + '%'; },
      s: function (v) { st.textContent = v; li.className = 'row ' + v; }
    };
  }

  function put(f, ui, next) {
    var x = new XMLHttpRequest();
    x.open('PUT', '/upload/' + TOKEN + '/file?name=' + encodeURIComponent(f.name));
    x.setRequestHeader('content-type', 'application/octet-stream');
    x.upload.onprogress = function (e) {
      if (e.lengthComputable) ui.p(Math.round(e.loaded / e.total * 100));
    };
    x.onload = function () {
      if (x.status === 201) { ui.p(100); ui.s('sent'); ok++; next(); return; }
      var why = 'could not send';
      try { why = JSON.parse(x.responseText).error || why; } catch (e) {}
      ui.s('failed');
      note(f.name + ': ' + why, 'warn');
      next();
    };
    x.onerror = function () {
      ui.s('failed');
      note(f.name + ': the connection dropped. Try that file again.', 'warn');
      next();
    };
    x.send(f);
  }

  function run(i) {
    if (i >= files.length) return finish();
    var f = files[i];
    put(f.file, f.ui, function () { run(i + 1); });
  }

  function finish() {
    busy = false;
    if (!ok) { note('None of the files arrived. Try again, or send them to the email address below.', 'warn'); return; }
    var x = new XMLHttpRequest();
    x.open('POST', '/upload/' + TOKEN + '/done');
    x.setRequestHeader('content-type', 'application/json');
    x.onload = function () {
      if (x.status === 200) {
        drop.hidden = true;
        cta.hidden = false;
        note(ok + ' file' + (ok === 1 ? '' : 's') + ' received. Our engineer has them.', 'good');
      } else {
        note('The files are on our server but the confirmation did not return. They are safe.', 'warn');
      }
    };
    x.onerror = function () {
      note('The files are on our server but the confirmation did not return. They are safe.', 'warn');
    };
    x.send('{}');
  }

  function addAll(fl) {
    if (busy) { note('Still sending the last batch. Add more when it finishes.', 'warn'); return; }
    clearNote();
    var start = files.length, room = MAXF - start, big = 0, skipped = 0;
    for (var i = 0; i < fl.length; i++) {
      if (i >= room) { skipped++; continue; }
      if (fl[i].size > MAXMB * 1024 * 1024) { big++; continue; }
      files.push({ file: fl[i], ui: row(fl[i].name, Math.max(1, Math.round(fl[i].size / 1024))) });
    }
    if (skipped) note(skipped + ' file(s) skipped: ' + MAXF + ' is the maximum for one link. Send the rest after we reply.', 'warn');
    else if (big) note(big + ' file(s) skipped: anything over ' + MAXMB + ' MB is refused. Zip it, or send it after we reply.', 'warn');
    if (files.length > start) { busy = true; run(start); }
  }

  drop.addEventListener('click', function () { pick.click(); });
  pick.addEventListener('change', function () { addAll(pick.files); pick.value = ''; });

  ['dragenter', 'dragover'].forEach(function (t) {
    drop.addEventListener(t, function (e) { e.preventDefault(); drop.className = 'drop over'; });
  });
  ['dragleave', 'drop'].forEach(function (t) {
    drop.addEventListener(t, function (e) { e.preventDefault(); drop.className = 'drop'; });
  });
  drop.addEventListener('drop', function (e) {
    if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length) addAll(e.dataTransfer.files);
  });
})();
`;

function uploadPage(meta) {
  const ref = esc(meta.ref || 'your request');
  const js = UPLOAD_JS
    .replace('__TOKEN__', meta.token)
    .replace('__MAX_MB__', String(Math.round(MAX_FILE_BYTES / 1_048_576)))
    .replace('__MAX_FILES__', String(MAX_FILES));

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Send your design files — Tenmay</title>
<style>
:root { --g: #126B3F; --ink: #0f172a; --mut: #64748b; --line: #dbe6df; }
* { box-sizing: border-box; }
body { margin: 0; background: #f6faf7; color: var(--ink);
  font: 15px/1.6 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; }
main { max-width: 620px; margin: 0 auto; padding: 40px 20px 64px; }
.ref { display: inline-block; margin: 0 0 18px; padding: 4px 10px; border-radius: 999px;
  background: #e8f3ec; color: var(--g); font-size: 11px; font-weight: 700;
  letter-spacing: .1em; text-transform: uppercase; }
h1 { font-size: 26px; line-height: 1.25; margin: 0 0 10px; letter-spacing: -.01em; }
.lede { margin: 0 0 24px; color: var(--mut); font-size: 14px; }
.drop { display: block; width: 100%; padding: 34px 20px; border: 2px dashed var(--line);
  border-radius: 14px; background: #fff; text-align: center; cursor: pointer;
  transition: border-color .15s, background .15s; }
.drop:hover, .drop.over { border-color: var(--g); background: #f2f9f4; }
.drop b { display: block; font-size: 14px; color: var(--g); margin-bottom: 4px; }
.drop span { font-size: 12.5px; color: var(--mut); }
ul { list-style: none; margin: 18px 0 0; padding: 0; }
.row { display: grid; grid-template-columns: 1fr auto 90px 56px; gap: 10px;
  align-items: center; padding: 9px 0; border-bottom: 1px solid #eef3ef; font-size: 12.5px; }
.row .n { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.row .s { color: var(--mut); font-variant-numeric: tabular-nums; }
.row .bar { height: 5px; border-radius: 3px; background: #e9efeb; overflow: hidden; }
.row .bar i { display: block; height: 100%; width: 0; background: var(--g); transition: width .2s; }
.row .st { text-align: right; color: var(--mut); font-size: 11px; }
.row.sent .st { color: var(--g); }
.row.failed .st { color: #b42318; }
.row.failed .bar i { background: #b42318; }
.msg { margin: 16px 0 0; padding: 11px 13px; border-radius: 9px; font-size: 13px;
  background: #eef3ef; color: #334155; }
.msg.warn { background: #fef3f2; color: #912018; }
.msg.good { background: #e8f3ec; color: var(--g); }
#cta { margin: 24px 0 0; padding: 22px; border-radius: 12px; background: #fff;
  border: 1px solid var(--line); text-align: center; font-size: 14px; }
#cta a { color: var(--g); font-weight: 600; }
.fine { margin: 26px 0 0; font-size: 12px; line-height: 1.7; color: var(--mut); }
.fine b { color: #475569; }
</style>
</head>
<body>
<main>
  <p class="ref">Reference ${ref}</p>
  <h1>Send your Gerber and BOM</h1>
  <p class="lede">
    Gerber (RS-274X with the Excellon drill file), BOM (XLSX or CSV) and centroid if you have it.
    Zipped is fine. Up to ${MAX_FILES} files, ${Math.round(MAX_FILE_BYTES / 1_048_576)} MB each.
    This link accepts files until <strong>${esc(day(meta.expiresAt))}</strong>.
  </p>

  <div class="drop" id="drop" role="button" tabindex="0">
    <input type="file" id="pick" multiple hidden>
    <b>Choose files or drop them here</b>
    <span>Nothing is sent until you pick a file.</span>
  </div>

  <ul id="list"></ul>
  <div class="msg" id="msg" hidden></div>

  <div id="cta" hidden>
    Files received. An assembly engineer replies within one working day.
    If it is urgent, write to <a href="mailto:linda@tenmaypcba.com">linda@tenmaypcba.com</a>
    and quote reference ${ref}. You can close this page.
  </div>

  <p class="fine">
    <b>Where these go.</b> Straight to our engineering team. The folder is not public,
    not linked from anywhere and not indexed by search engines; it is deleted on
    ${esc(day(meta.purgeAt))} unless an order follows. We do not share your files with
    other customers and we do not use them for anything except quoting and building
    your board. <b>NDA on request</b> — ask before you upload and we will sign yours.
  </p>
</main>
<script>${js}</script>
</body>
</html>`;
}

function expiredPage(reason) {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Link not available — Tenmay</title>
<style>body{margin:0;background:#f6faf7;color:#0f172a;font:15px/1.6 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif}
main{max-width:520px;margin:0 auto;padding:64px 20px}h1{font-size:22px;margin:0 0 12px}
p{color:#64748b;font-size:14px}a{color:#126B3F;font-weight:600}</style>
</head><body><main>
<h1>${esc(reason)}</h1>
<p>Upload links expire seven days after the quote request. Nothing you sent earlier has been lost —
write to <a href="mailto:linda@tenmaypcba.com">linda@tenmaypcba.com</a> and we will send a fresh link
from the same address, or take the files by email.</p>
</main></body></html>`;
}

async function handleLinkPage(res, token, origin) {
  if (!uploadsReady) return send(res, 503, 'uploads are not configured on this server', origin);
  const meta = await readLink(token);
  if (!meta) return sendHtml(res, 404, expiredPage('This link is not valid.'), origin);
  if (meta.expired) return sendHtml(res, 410, expiredPage('This link has expired.'), origin);
  return sendHtml(res, 200, uploadPage(meta), origin);
}

async function handleLinkPut(req, res, token, url, origin) {
  if (!uploadsReady) return send(res, 503, { ok: false, error: 'uploads unavailable' }, origin);

  // The only thing standing between a stranger and a full disk. One real file
  // is inside this limit; a loop is not.
  const ip = (req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'] || req.socket.remoteAddress || '')
    .split(',')[0].trim();
  if (!putAllowed(ip)) {
    return send(res, 429, { ok: false, error: 'too many uploads, try again in a minute' }, origin);
  }

  const meta = await readLink(token);
  if (!meta) return send(res, 404, { ok: false, error: 'unknown link' }, origin);
  if (meta.expired) return send(res, 410, { ok: false, error: 'link expired' }, origin);

  const dir = linkDir(token);
  await fsp.mkdir(dir, { recursive: true, mode: 0o700 });

  const used = await dirUsage(dir);
  if (used.count >= MAX_FILES) {
    return send(res, 409, { ok: false, error: `at most ${MAX_FILES} files per request` }, origin);
  }

  // The per-link total is a hard ceiling, not an advisory one. The cap handed to
  // the stream is whatever is left, so a chunked upload cannot overshoot the
  // total by one file the way a "check before, accept after" limit would.
  const remaining = MAX_TOTAL_BYTES - used.bytes;
  if (remaining <= 0) {
    return send(res, 413, { ok: false, error: 'total size limit reached for this link' }, origin);
  }
  const cap = Math.min(MAX_FILE_BYTES, remaining);
  const capMb = Math.round(cap / 1_048_576);

  const declared = Number(req.headers['content-length'] || 0);
  if (declared && declared > cap) {
    return send(res, 413, {
      ok: false,
      error: cap < MAX_FILE_BYTES
        ? `this link has ${capMb} MB left`
        : `file larger than ${Math.round(MAX_FILE_BYTES / 1_048_576)} MB`,
    }, origin);
  }

  const stored = safeName(url.searchParams.get('name'));
  const dest = path.join(dir, stored);
  const limiter = new ByteLimit(cap);

  try {
    // wx: never clobber an existing file, even on a name collision. Overwriting
    // a 40 MB upload that already succeeded is unrecoverable.
    await pipeline(req, limiter, fs.createWriteStream(dest, { flags: 'wx', mode: 0o600 }));
  } catch (err) {
    await fsp.rm(dest, { force: true }).catch(() => {});
    if (/too large/.test(err.message)) {
      return send(res, 413, { ok: false, error: `file larger than the ${capMb} MB allowed for this upload` }, origin);
    }
    return send(res, 400, { ok: false, error: 'upload failed' }, origin);
  }

  if (!limiter.n) {
    await fsp.rm(dest, { force: true }).catch(() => {});
    return send(res, 400, { ok: false, error: 'empty file' }, origin);
  }

  return send(res, 201, { ok: true, stored, bytes: limiter.n }, origin);
}

async function handleLinkDone(req, res, token, origin) {
  const meta = await readLink(token);
  if (!meta) return send(res, 404, { ok: false, error: 'unknown link' }, origin);
  if (meta.expired) return send(res, 410, { ok: false, error: 'link expired' }, origin);

  const used = await dirUsage(linkDir(token));
  if (!used.count) return send(res, 400, { ok: false, error: 'no files received' }, origin);

  const next = {
    ...meta,
    doneAt: new Date().toISOString(),
    fileCount: used.count,
    totalBytes: used.bytes,
  };
  delete next.expired;
  await fsp.writeFile(linkPath(token), JSON.stringify(next, null, 2), { mode: 0o600 });

  broadcast('upload_received', {
    ref: meta.ref,
    files: used.count,
    bytes: used.bytes,
    at: next.doneAt,
  });

  return send(res, 200, { ok: true, files: used.count, bytes: used.bytes }, origin);
}

/* Operator-only. */

async function handleUploadList(res, origin) {
  const names = (await fsp.readdir(LINK_DIR).catch(() => [])).filter((n) => n.endsWith('.json'));
  const rows = [];
  for (const n of names.slice(0, 400)) {
    const meta = await readLink(n.replace(/\.json$/, ''));
    if (!meta) continue;
    rows.push({
      id: meta.token,
      ref: meta.ref,
      email: meta.email,
      createdAt: meta.createdAt,
      expiresAt: meta.expiresAt,
      purgeAt: meta.purgeAt,
      doneAt: meta.doneAt || null,
      files: meta.fileCount || 0,
      bytes: meta.totalBytes || 0,
      expired: Boolean(meta.expired),
    });
  }
  rows.sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
  return send(res, 200, { ok: true, rows }, origin);
}

async function handleUploadManifest(res, url, origin) {
  const token = clean(url.searchParams.get('id'), 40);
  const meta = await readLink(token);
  if (!meta) return send(res, 404, { ok: false, error: 'not found' }, origin);

  const dir = linkDir(token);
  const names = (await fsp.readdir(dir).catch(() => [])).filter((n) => !n.startsWith('.'));
  const files = [];
  for (const n of names) {
    const st = await fsp.stat(path.join(dir, n)).catch(() => null);
    if (st && st.isFile()) files.push({ stored: n, bytes: st.size });
  }

  return send(res, 200, {
    ok: true,
    ref: meta.ref,
    email: meta.email,
    createdAt: meta.createdAt,
    doneAt: meta.doneAt || null,
    files,
  }, origin);
}

async function handleUploadDownload(res, url, origin) {
  const token = clean(url.searchParams.get('id'), 40);
  const name = path.basename(clean(url.searchParams.get('file'), 200));
  const meta = await readLink(token);
  if (!meta) return send(res, 404, { ok: false, error: 'not found' }, origin);

  const dir = linkDir(token);
  const target = path.join(dir, name);
  // basename() already removes any traversal, but assert it: this is the one
  // place where a query string decides a filesystem path.
  if (!target.startsWith(dir + path.sep)) {
    return send(res, 400, { ok: false, error: 'bad path' }, origin);
  }

  const st = await fsp.stat(target).catch(() => null);
  if (!st || !st.isFile()) return send(res, 404, { ok: false, error: 'no such file' }, origin);

  return sendAttachment(res, target, st.size, name, origin);
}

/*
 * Retention for uploads only. Expired links stop accepting files immediately;
 * the directory survives until purgeAt so an engineer can still download from
 * an in-flight quote.
 *
 * This is not the inquiry retention policy. The row in the workbench and the
 * file on disk are on different clocks, and only the file clock is written down
 * in the privacy policy's "how long we keep it" (LEGAL.uploadRetentionDays).
 * Keep PURGE_DAYS equal to that number or the policy becomes a false statement.
 */
async function sweepUploads() {
  const names = await fsp.readdir(LINK_DIR).catch(() => []);
  for (const n of names) {
    if (!n.endsWith('.json')) continue;
    const token = n.replace(/\.json$/, '');
    const meta = await readLink(token);
    const purgeDue = meta ? Date.parse(meta.purgeAt) < Date.now() : true;
    if (!purgeDue) continue;
    await fsp.rm(linkPath(token), { force: true }).catch(() => {});
    await fsp.rm(linkDir(token), { recursive: true, force: true }).catch(() => {});
  }
}

if (uploadsReady) {
  sweepUploads().catch(() => {});
  setInterval(() => sweepUploads().catch(() => {}), 6 * 3600_000).unref();
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

  // A link is issued by the same request that creates the inquiry, so it can
  // only ever reach somebody who just submitted. Failure here must not fail the
  // inquiry: a lead without attachments is worth far more than no lead.
  //
  // null is a valid outcome — the form then behaves exactly as it did before
  // uploads existed.
  let uploadUrl = null;
  if (email && uploadsReady) {
    try {
      const meta = await mkLink(id ? `INQ-${String(id).padStart(4, '0')}` : null, email);
      uploadUrl = `${PUBLIC_API}/upload/${meta.token}`;
    } catch (err) {
      console.error(`[upload] could not mint link: ${err.message}`);
    }
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

  return send(res, 201, {
    ok: true,
    id,
    ref: id ? `INQ-${String(id).padStart(4, '0')}` : null,
    uploadUrl,
  }, origin);
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

    // Everything under /upload is either token-gated or operator-gated. There is
    // no public listing here and the page is noindex.
    if (url.pathname.startsWith('/upload')) {
      const parts = url.pathname.split('/').filter(Boolean); // ['upload', token, ...]
      const token = parts[1] || '';
      const bearer = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
      const opToken = bearer || url.searchParams.get('token') || '';

      if (parts.length === 2 && req.method === 'GET') {
        // The operator verbs are spelled like tokens but are shorter than the
        // 32 characters TOKEN_RE demands, so they can never shadow a real one.
        // They must answer 401 when unauthenticated rather than falling through
        // to the upload page: a 404 there looks like a typo to whoever is
        // debugging the console, and hides the real cause.
        if (OP_VERBS.has(token)) {
          if (!(await operatorOk(opToken))) return send(res, 401, { ok: false, error: 'unauthorized' }, origin);
          if (token === 'list') return await handleUploadList(res, origin);
          if (token === 'manifest') return await handleUploadManifest(res, url, origin);
          return await handleUploadDownload(res, url, origin);
        }
        return await handleLinkPage(res, token, origin);
      }
      if (parts.length === 3 && parts[2] === 'file' && req.method === 'PUT') {
        return await handleLinkPut(req, res, token, url, origin);
      }
      if (parts.length === 3 && parts[2] === 'done' && req.method === 'POST') {
        return await handleLinkDone(req, res, token, origin);
      }
      return send(res, 404, { ok: false, error: 'not found' }, origin);
    }

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
