/**
 * Google Search Console pull.
 *
 * Why a service account and not OAuth: the workbench has no server that could
 * hold a refresh token, and a refresh token tied to a person breaks the day
 * that person leaves. A service account is a machine identity that the property
 * owner grants read-only access to in the Search Console UI, and it can be
 * revoked there in one click.
 *
 * Three legs, all of them plain HTTPS + node:crypto, no SDK:
 *   1  sign a JWT with the service account's private key (RS256)
 *   2  exchange it at oauth2.googleapis.com for an access token (1 h)
 *   3  POST searchAnalytics/query, once per dimension set
 *
 * The property is discovered rather than assumed: a URL-prefix property has to
 * match character for character (`https://tenmaypcba.com/` and
 * `https://tenmaypcba.com` are different properties), so asking GSC which
 * properties the account can see removes a whole class of silent 403s.
 */

import crypto from 'node:crypto';
import { readFileSync } from 'node:fs';

const SA_FILE = process.env.GSC_SA_FILE || '/etc/tenmay-gsc.json';
const API_BASE = (process.env.GSC_API_BASE || 'https://www.googleapis.com/webmasters/v3').replace(/\/+$/, '');
const TOKEN_URL = process.env.GSC_TOKEN_URL || 'https://oauth2.googleapis.com/token';
const SITE_HINT = (process.env.GSC_SITE || 'https://tenmaypcba.com/').trim();
const SCOPE = 'https://www.googleapis.com/auth/webmasters.readonly';

/* GSC finalises a day roughly 2-3 days after it ends; asking for more recent
 * days only adds rows that change on the next pull. */
const DEFAULT_LAG = Number(process.env.GSC_LAG_DAYS || 3);

let account = null;
let tokenCache = { token: '', exp: 0 };
let siteCache = { site: '', at: 0 };

const nowSec = () => Math.floor(Date.now() / 1000);
const b64url = (input) => Buffer.from(input).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

export function loadAccount() {
  if (account) return account;
  const raw = readFileSync(SA_FILE, 'utf8');
  const parsed = JSON.parse(raw);
  if (!parsed.client_email || !parsed.private_key) {
    throw new Error('service account json is missing client_email or private_key');
  }
  account = parsed;
  return account;
}

/** true when a readable key file with the two fields we need is present. */
export function gscConfigured() {
  try {
    loadAccount();
    return true;
  } catch {
    return false;
  }
}

export function gscSite() {
  return siteCache.site || SITE_HINT;
}

async function accessToken() {
  if (tokenCache.token && tokenCache.exp > Date.now() + 60_000) return tokenCache.token;

  const sa = loadAccount();
  const iat = nowSec();
  const header = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claims = b64url(JSON.stringify({
    iss: sa.client_email,
    scope: SCOPE,
    aud: TOKEN_URL,
    iat,
    exp: iat + 3600,
  }));
  const signature = crypto.createSign('RSA-SHA256').update(`${header}.${claims}`).sign(sa.private_key);
  const assertion = `${header}.${claims}.${b64url(signature)}`;

  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion,
    }),
    signal: AbortSignal.timeout(20_000),
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`google token ${res.status}: ${text.slice(0, 300)}`);
  }
  const data = JSON.parse(text);
  tokenCache = { token: data.access_token, exp: Date.now() + Number(data.expires_in || 3600) * 1000 };
  return tokenCache.token;
}

/** Properties this service account can read. Used to resolve the exact string. */
export async function listSites(token) {
  const res = await fetch(`${API_BASE}/sites`, {
    headers: { authorization: `Bearer ${token}` },
    signal: AbortSignal.timeout(20_000),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`gsc sites ${res.status}: ${text.slice(0, 300)}`);
  const data = JSON.parse(text);
  return (data.siteEntry || []).map((s) => ({
    siteUrl: s.siteUrl,
    permission: s.permissionLevel,
  }));
}

/**
 * Pick the property to query.
 *
 * Order: an exact match on the configured string, then a match that ignores a
 * trailing slash, then any property whose host is the same. Everything else is
 * a hard stop — querying a property the account cannot see returns an empty
 * result set, not an error, and silent zeros are worse than a loud failure.
 */
export async function resolveSite(token) {
  if (siteCache.site && Date.now() - siteCache.at < 6 * 3600_000) return siteCache.site;

  const sites = await listSites(token);
  const wanted = SITE_HINT;
  const bare = wanted.replace(/\/+$/, '');
  const host = bare.replace(/^https?:\/\//i, '').replace(/^sc-domain:/i, '');

  const exact = sites.find((s) => s.siteUrl === wanted);
  const slashless = sites.find((s) => s.siteUrl.replace(/\/+$/, '') === bare);
  const byHost = sites.find((s) => s.siteUrl.includes(host));

  const hit = exact || slashless || byHost;
  if (!hit) {
    const list = sites.map((s) => `${s.siteUrl} (${s.permission})`).join(', ') || 'none';
    throw new Error(`no search console property matches ${wanted} — visible to this account: ${list}`);
  }
  siteCache = { site: hit.siteUrl, at: Date.now() };
  return hit.siteUrl;
}

const iso = (d) => d.toISOString().slice(0, 10);

/** Today in the property's own clock, which for this site is Asia/Shanghai. */
export function todayInSiteTz(tz = 'Asia/Shanghai') {
  return new Intl.DateTimeFormat('en-CA', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
}

function shift(day, delta) {
  const d = new Date(`${day}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + delta);
  return iso(d);
}

async function queryOnce(token, site, body) {
  const res = await fetch(`${API_BASE}/sites/${encodeURIComponent(site)}/searchAnalytics/query`, {
    method: 'POST',
    headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(60_000),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`gsc query ${res.status}: ${text.slice(0, 400)}`);
  return JSON.parse(text);
}

/** Paged pull for one dimension set. GSC caps rowLimit at 25000. */
async function queryAll(token, site, { startDate, endDate, dimensions }) {
  const rows = [];
  const rowLimit = 25_000;
  for (let startRow = 0; startRow < 200_000; startRow += rowLimit) {
    const page = await queryOnce(token, site, { startDate, endDate, dimensions, rowLimit, startRow, dataState: 'all' });
    const batch = page.rows || [];
    rows.push(...batch);
    if (batch.length < rowLimit) break;
  }
  return rows;
}

/**
 * Pull one window and flatten it into rows the store can upsert.
 *
 * dim='date'  one row per day, the source of every total
 * dim='page'  one row per day per page
 * dim='query' one row per day per query
 *
 * Per-day granularity everywhere costs a few thousand rows and buys range
 * switching without re-querying Google every time the operator changes 7/28/90.
 */
export async function pull({ days = 10, lag = DEFAULT_LAG } = {}) {
  const token = await accessToken();
  const site = await resolveSite(token);

  const endDate = shift(todayInSiteTz(), -lag);
  const startDate = shift(endDate, -(days - 1));

  const sets = [
    { dim: 'date', dimensions: ['date'] },
    { dim: 'page', dimensions: ['date', 'page'] },
    { dim: 'query', dimensions: ['date', 'query'] },
  ];

  const rows = [];
  for (const set of sets) {
    const raw = await queryAll(token, site, { startDate, endDate, dimensions: set.dimensions });
    for (const r of raw) {
      const keys = r.keys || [];
      const day = keys[0];
      const key = set.dim === 'date' ? '' : (keys[1] || '');
      if (!day) continue;
      rows.push({
        day,
        dim: set.dim,
        key,
        clicks: Math.round(r.clicks || 0),
        impressions: Math.round(r.impressions || 0),
        ctr: Number(r.ctr || 0),
        position: r.position === undefined || r.position === null ? null : Number(r.position),
      });
    }
  }

  return { site, startDate, endDate, rows };
}
