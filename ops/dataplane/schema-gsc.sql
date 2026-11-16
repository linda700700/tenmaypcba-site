-- Search Console storage. Applied on its own, after schema.sql, so an existing
-- box does not need its database recreated:
--
--   docker compose exec -T db psql -U tenmay -d dataplane -f /docker-entrypoint-initdb.d/20-gsc.sql
--
-- Google keeps 16 months of history; this table keeps whatever we pull and is
-- safe to re-sync because every row is keyed by (day, dim, key).

create table if not exists gsc_daily (
  day          date        not null,
  dim          text        not null,          -- date | page | query
  key          text        not null default '',
  clicks       integer     not null default 0,
  impressions  integer     not null default 0,
  ctr          double precision not null default 0,
  position     double precision,
  synced_at    timestamptz not null default now(),
  primary key (day, dim, key)
);

create index if not exists gsc_daily_dim_day_idx on gsc_daily (dim, day);

-- One row per sync attempt, successful or not. The workbench reads the latest
-- one so the operator sees when the numbers behind a page were last pulled.
create table if not exists gsc_sync (
  id           bigserial primary key,
  started_at   timestamptz not null default now(),
  finished_at  timestamptz,
  window_from  date,
  window_to    date,
  rows_written integer,
  status       text not null default 'running',  -- running | ok | error
  note         text
);
