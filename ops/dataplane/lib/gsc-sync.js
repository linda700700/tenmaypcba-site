/**
 * One sync run, shared by the cron job and by POST /seo/sync.
 *
 * The run is recorded before the first API call, so a sync that dies mid-way is
 * still visible in gsc_sync as a failed attempt instead of vanishing. The
 * workbench shows the last run next to every number it renders, which is only
 * useful if failures leave a trace too.
 */

import { pull, gscConfigured, gscSite } from './gsc.js';

export async function runSync(store, { days = 10, lag } = {}) {
  if (!gscConfigured()) {
    return { ok: false, configured: false, reason: 'service account file missing', site: gscSite() };
  }

  const id = await store.startGscRun();
  try {
    const { site, startDate, endDate, rows } = await pull({ days, lag });
    const written = await store.saveGsc(rows);
    await store.finishGscRun(id, {
      status: 'ok',
      window_from: startDate,
      window_to: endDate,
      rows_written: written,
      note: site,
    });
    return { ok: true, configured: true, site, from: startDate, to: endDate, rows: written };
  } catch (err) {
    const note = String((err && err.message) || err).slice(0, 500);
    await store.finishGscRun(id, { status: 'error', note });
    return { ok: false, configured: true, error: note, site: gscSite() };
  }
}

/** What the console needs to know about the connection itself. */
export async function syncStatus(store) {
  const last = await store.lastGscRun().catch(() => null);
  return {
    configured: gscConfigured(),
    site: gscSite(),
    lastRun: last
      ? {
        at: last.finished_at || last.started_at,
        status: last.status,
        from: last.window_from,
        to: last.window_to,
        rows: last.rows_written,
        note: last.note || null,
      }
      : null,
  };
}
