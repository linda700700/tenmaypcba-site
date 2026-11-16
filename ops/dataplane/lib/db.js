/**
 * Storage. Two drivers behind one interface:
 *
 *   memory  - process memory, used for local tests and for the dry run. Nothing
 *             survives a restart; that is the point.
 *   pg      - Postgres on the VPS. This is what runs in production.
 *
 * The interface is deliberately narrow: the server should not care which one it
 * has. Every method returns plain objects or null, never a driver handle.
 */

const STORE = (process.env.STORE || 'pg').toLowerCase();

/* ── driver: memory ───────────────────────────────────────────────────────── */

function memoryStore() {
  const events = [];
  const sessions = new Map();
  const leadAttr = new Map();

  return {
    name: 'memory',
    async init() {},
    async close() {},

    async addEvents(vid, list) {
      for (const e of list) events.push({ vid, ...e, ts: e.ts || Date.now() });
    },

    async touchSession(vid, patch) {
      const prev = sessions.get(vid) || { vid, first_seen: Date.now() };
      sessions.set(vid, { ...prev, ...patch, last_seen: Date.now() });
    },

    async getSession(vid) {
      return sessions.get(vid) || null;
    },

    async saveLeadAttr(inquiryId, vid, attr) {
      leadAttr.set(String(inquiryId), { inquiry_id: inquiryId, vid, attr, created_at: Date.now() });
    },

    async getLeadAttr(ids) {
      return ids.map((id) => leadAttr.get(String(id))).filter(Boolean);
    },

    /** Journey = the visitor's page path before they submitted, with dwell time. */
    async journey(vid, limit = 40) {
      const mine = events.filter((e) => e.vid === vid && e.name === 'page_view');
      const out = [];
      for (let i = 0; i < mine.length && out.length < limit; i += 1) {
        const cur = mine[i];
        const next = mine[i + 1];
        out.push({
          path: cur.path || '/',
          at: cur.ts,
          seconds: next ? Math.round((next.ts - cur.ts) / 1000) : 0,
        });
      }
      return out;
    },

    async onlineSince(ms) {
      const cutoff = Date.now() - ms;
      return [...sessions.values()].filter((s) => s.last_seen > cutoff).length;
    },
  };
}

/* ── driver: postgres ────────────────────────────────────────────────────── */

async function pgStore(url) {
  const { default: pg } = await import('pg');
  const pool = new pg.Pool({ connectionString: url, max: 8, idleTimeoutMillis: 30000 });

  return {
    name: 'pg',
    async init() {
      await pool.query('select 1');
    },
    async close() {
      await pool.end();
    },

    async addEvents(vid, list) {
      if (!list.length) return;
      const cols = ['vid', 'sid', 'name', 'path', 'ref', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'country', 'device', 'meta', 'ts'];
      const values = [];
      const tuples = list.map((e, i) => {
        const base = i * cols.length;
        values.push(
          vid, e.sid || null, e.name || 'unknown', e.path || null, e.ref || null,
          e.utm_source || null, e.utm_medium || null, e.utm_campaign || null,
          e.utm_term || null, e.utm_content || null, e.country || null,
          e.device || null, e.meta ? JSON.stringify(e.meta) : null,
          e.ts ? new Date(e.ts) : new Date(),
        );
        return `(${cols.map((_, k) => `$${base + k + 1}`).join(',')})`;
      });
      await pool.query(
        `insert into events (${cols.join(',')}) values ${tuples.join(',')}`,
        values,
      );
    },

    async touchSession(vid, patch) {
      await pool.query(
        `insert into sessions (vid, landing, referrer, utm_source, utm_medium, utm_campaign, utm_term, country, device, first_seen, last_seen)
         values ($1,$2,$3,$4,$5,$6,$7,$8,$9, now(), now())
         on conflict (vid) do update set
           last_seen = now(),
           landing   = coalesce(sessions.landing, excluded.landing),
           referrer  = coalesce(sessions.referrer, excluded.referrer),
           utm_source   = coalesce(sessions.utm_source, excluded.utm_source),
           utm_medium   = coalesce(sessions.utm_medium, excluded.utm_medium),
           utm_campaign = coalesce(sessions.utm_campaign, excluded.utm_campaign),
           utm_term     = coalesce(sessions.utm_term, excluded.utm_term),
           country   = coalesce(sessions.country, excluded.country),
           device    = coalesce(sessions.device, excluded.device)`,
        [vid, patch.landing || null, patch.referrer || null, patch.utm_source || null,
          patch.utm_medium || null, patch.utm_campaign || null, patch.utm_term || null,
          patch.country || null, patch.device || null],
      );
    },

    async getSession(vid) {
      const { rows } = await pool.query(
        `select vid, landing, referrer, utm_source, utm_medium, utm_campaign, utm_term, country, device
           from sessions where vid = $1`,
        [vid],
      );
      return rows[0] || null;
    },

    async saveLeadAttr(inquiryId, vid, attr) {
      await pool.query(
        `insert into lead_attr (inquiry_id, vid, attr) values ($1,$2,$3)
         on conflict (inquiry_id) do update set vid = excluded.vid, attr = excluded.attr`,
        [inquiryId, vid, JSON.stringify(attr)],
      );
    },

    async getLeadAttr(ids) {
      if (!ids.length) return [];
      const { rows } = await pool.query(
        'select inquiry_id, vid, attr, created_at from lead_attr where inquiry_id = any($1::bigint[])',
        [ids],
      );
      return rows;
    },

    async journey(vid, limit = 40) {
      const { rows } = await pool.query(
        `select path, ts, coalesce(
            extract(epoch from (lead(ts) over (order by ts) - ts))::int, 0) as seconds
           from events
          where vid = $1 and name = 'page_view'
          order by ts
          limit $2`,
        [vid, limit],
      );
      return rows.map((r) => ({ path: r.path, at: +new Date(r.ts), seconds: r.seconds }));
    },

    async onlineSince(ms) {
      const { rows } = await pool.query(
        'select count(*)::int as n from sessions where last_seen > now() - ($1::bigint || \' milliseconds\')::interval',
        [ms],
      );
      return rows[0].n;
    },
  };
}

export async function openStore() {
  if (STORE === 'memory') return memoryStore();
  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is required when STORE=pg');
  const s = await pgStore(process.env.DATABASE_URL);
  await s.init();
  return s;
}
