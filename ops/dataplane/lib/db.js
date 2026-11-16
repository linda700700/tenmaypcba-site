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

/* ── shared helpers ───────────────────────────────────────────────────────── */

/**
 * The window a page should show.
 *
 * Anchored on the newest day that actually has rows rather than on today: GSC
 * publishes a day 2-3 days late, so anchoring on today would silently shrink
 * every range by the lag and turn a 7-day view into a 4-day view.
 */
function bounds(latestDay, days) {
  if (!latestDay) return null;
  const shift = (day, delta) => {
    const d = new Date(`${day}T00:00:00Z`);
    d.setUTCDate(d.getUTCDate() + delta);
    return d.toISOString().slice(0, 10);
  };
  const to = latestDay;
  const from = shift(to, -(days - 1));
  const prevTo = shift(from, -1);
  const prevFrom = shift(prevTo, -(days - 1));
  return { from, to, prevFrom, prevTo };
}

const rate = (clicks, impressions) => (impressions ? clicks / impressions : null);

/* ── driver: memory ───────────────────────────────────────────────────────── */

function memoryStore() {
  const events = [];
  const sessions = new Map();
  const leadAttr = new Map();
  const gsc = new Map();      // "day|dim|key" -> row
  const gscRuns = [];
  let gscSeq = 0;

  /* Same shape as the pg driver returns, computed in JS. Kept here rather than
   * duplicated per method so the dry run and production answer identically. */
  const readWindow = (days) => {
    const dayList = [...gsc.values()].filter((r) => r.dim === 'date').map((r) => r.day).sort();
    const w = bounds(dayList[dayList.length - 1], days);
    if (!w) return null;
    const pick = (from, to) => {
      const rows = [...gsc.values()].filter((r) => r.dim === 'date' && r.day >= from && r.day <= to);
      const clicks = rows.reduce((a, r) => a + r.clicks, 0);
      const impressions = rows.reduce((a, r) => a + r.impressions, 0);
      const weighted = rows.reduce((a, r) => a + (r.position || 0) * r.impressions, 0);
      return { clicks, impressions, ctr: rate(clicks, impressions), position: impressions ? weighted / impressions : null };
    };
    return {
      ...w,
      days,
      coverage: { first: dayList[0], last: dayList[dayList.length - 1] },
      current: pick(w.from, w.to),
      previous: pick(w.prevFrom, w.prevTo),
    };
  };

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

    /* Search Console */

    async saveGsc(rows) {
      for (const r of rows) gsc.set(`${r.day}|${r.dim}|${r.key}`, { ...r, synced_at: Date.now() });
      return rows.length;
    },

    async startGscRun() {
      gscSeq += 1;
      gscRuns.push({ id: gscSeq, started_at: new Date(), status: 'running' });
      return gscSeq;
    },

    async finishGscRun(id, patch) {
      const run = gscRuns.find((r) => r.id === id);
      if (run) Object.assign(run, patch, { finished_at: new Date() });
    },

    async lastGscRun() {
      return gscRuns[gscRuns.length - 1] || null;
    },

    async gscWindow(days) {
      return readWindow(days);
    },

    async gscBreakdown(dim, days, limit) {
      const w = readWindow(days);
      if (!w) return [];
      const grouped = new Map();
      for (const r of gsc.values()) {
        if (r.dim !== dim || r.day < w.from || r.day > w.to) continue;
        const cur = grouped.get(r.key) || { key: r.key, clicks: 0, impressions: 0, weighted: 0 };
        cur.clicks += r.clicks;
        cur.impressions += r.impressions;
        cur.weighted += (r.position || 0) * r.impressions;
        grouped.set(r.key, cur);
      }
      return [...grouped.values()]
        .map((g) => ({
          key: g.key,
          clicks: g.clicks,
          impressions: g.impressions,
          ctr: rate(g.clicks, g.impressions),
          position: g.impressions ? g.weighted / g.impressions : null,
        }))
        .sort((a, b) => b.clicks - a.clicks || b.impressions - a.impressions)
        .slice(0, limit);
    },

    async gscSeries(days) {
      const w = readWindow(days);
      if (!w) return [];
      return [...gsc.values()]
        .filter((r) => r.dim === 'date' && r.day >= w.from && r.day <= w.to)
        .sort((a, b) => a.day.localeCompare(b.day))
        .map((r) => ({ day: r.day, clicks: r.clicks, impressions: r.impressions, position: r.position }));
    },
  };
}

/* ── driver: postgres ────────────────────────────────────────────────────── */

async function pgStore(url) {
  const { default: pg } = await import('pg');
  const pool = new pg.Pool({ connectionString: url, max: 8, idleTimeoutMillis: 30000 });

  /* Shared by gscWindow / gscBreakdown / gscSeries so the three can never
   * disagree about which days "the last 28 days" means. */
  const windowOf = async (days) => {
    const { rows } = await pool.query(
      "select min(day)::text as first, max(day)::text as last from gsc_daily where dim = 'date'",
    );
    const latest = rows[0] && rows[0].last;
    const w = bounds(latest, days);
    if (!w) return null;

    const totals = async (from, to) => {
      const { rows: t } = await pool.query(
        `select coalesce(sum(clicks),0)::int as clicks,
                coalesce(sum(impressions),0)::int as impressions,
                (sum(position * impressions) / nullif(sum(impressions),0))::float8 as position
           from gsc_daily where dim = 'date' and day between $1 and $2`,
        [from, to],
      );
      const r = t[0];
      return { clicks: r.clicks, impressions: r.impressions, ctr: rate(r.clicks, r.impressions), position: r.position };
    };

    return {
      ...w,
      days,
      coverage: { first: rows[0].first, last: latest },
      current: await totals(w.from, w.to),
      previous: await totals(w.prevFrom, w.prevTo),
    };
  };

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

    /* Search Console */

    async saveGsc(rows) {
      if (!rows.length) return 0;
      const cols = ['day', 'dim', 'key', 'clicks', 'impressions', 'ctr', 'position'];
      const values = [];
      const tuples = rows.map((r, i) => {
        const base = i * cols.length;
        values.push(r.day, r.dim, r.key || '', r.clicks, r.impressions, r.ctr, r.position);
        return `(${cols.map((_, k) => `$${base + k + 1}`).join(',')})`;
      });
      await pool.query(
        `insert into gsc_daily (${cols.join(',')}) values ${tuples.join(',')}
         on conflict (day, dim, key) do update set
           clicks = excluded.clicks,
           impressions = excluded.impressions,
           ctr = excluded.ctr,
           position = excluded.position,
           synced_at = now()`,
        values,
      );
      return rows.length;
    },

    async startGscRun() {
      const { rows } = await pool.query("insert into gsc_sync (status) values ('running') returning id");
      return rows[0].id;
    },

    async finishGscRun(id, patch) {
      await pool.query(
        `update gsc_sync set finished_at = now(), status = $2, window_from = $3, window_to = $4,
                rows_written = $5, note = $6
           where id = $1`,
        [id, patch.status, patch.window_from || null, patch.window_to || null,
          patch.rows_written === undefined ? null : patch.rows_written, patch.note || null],
      );
    },

    async lastGscRun() {
      const { rows } = await pool.query(
        `select id, started_at, finished_at, window_from, window_to, rows_written, status, note
           from gsc_sync order by id desc limit 1`,
      );
      return rows[0] || null;
    },

    async gscWindow(days) {
      return windowOf(days);
    },

    async gscBreakdown(dim, days, limit) {
      const w = await windowOf(days);
      if (!w) return [];
      const { rows } = await pool.query(
        `select key,
                sum(clicks)::int as clicks,
                sum(impressions)::int as impressions,
                (sum(position * impressions) / nullif(sum(impressions),0))::float8 as position
           from gsc_daily
          where dim = $1 and day between $2 and $3
          group by key
          order by clicks desc, impressions desc
          limit $4`,
        [dim, w.from, w.to, limit],
      );
      return rows.map((r) => ({
        key: r.key,
        clicks: r.clicks,
        impressions: r.impressions,
        ctr: rate(r.clicks, r.impressions),
        position: r.position,
      }));
    },

    async gscSeries(days) {
      const w = await windowOf(days);
      if (!w) return [];
      const { rows } = await pool.query(
        `select day::text as day, clicks, impressions, position
           from gsc_daily where dim = 'date' and day between $1 and $2
          order by day`,
        [w.from, w.to],
      );
      return rows;
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
