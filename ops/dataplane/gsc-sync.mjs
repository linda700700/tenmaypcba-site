/**
 * Pull Search Console into the dataplane database.
 *
 *   node gsc-sync.mjs                 last 10 days (the daily cron call)
 *   node gsc-sync.mjs --days=180      first backfill, roughly GSC's whole history
 *
 * Runs inside the dataplane container, so it reads the same env file and the
 * same DATABASE_URL as the server. Exits non-zero on failure so cron mail and
 * the deploy script both notice.
 */

import { openStore } from './lib/db.js';
import { runSync } from './lib/gsc-sync.js';

const args = process.argv.slice(2);
const argOf = (name, fallback) => {
  const hit = args.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.split('=')[1] : fallback;
};

const days = Math.max(1, Math.min(480, Number(argOf('days', process.env.GSC_DAYS || 10)) || 10));
const lag = argOf('lag', process.env.GSC_LAG_DAYS || 3);

const store = await openStore();
try {
  const out = await runSync(store, { days, lag: Number(lag) });
  console.log(JSON.stringify(out));
  if (!out.ok) process.exitCode = 1;
} catch (err) {
  console.error(JSON.stringify({ ok: false, error: String((err && err.message) || err) }));
  process.exitCode = 1;
} finally {
  await store.close().catch(() => {});
}
