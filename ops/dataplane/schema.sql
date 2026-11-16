-- tenmay-dataplane schema. Run once: sudo -u postgres psql -d dataplane -f schema.sql

create table if not exists sessions (
  vid          text primary key,
  landing      text,
  referrer     text,
  utm_source   text,
  utm_medium   text,
  utm_campaign text,
  utm_term     text,
  country      char(2),
  device       text,
  first_seen   timestamptz not null default now(),
  last_seen    timestamptz not null default now()
);

create table if not exists events (
  id           bigserial primary key,
  vid          text not null,
  sid          text,
  name         text not null,
  path         text,
  ref          text,
  utm_source   text,
  utm_medium   text,
  utm_campaign text,
  utm_term     text,
  utm_content  text,
  country      char(2),
  device       text,
  meta         jsonb,
  ts           timestamptz not null default now()
);

create index if not exists events_vid_ts_idx on events (vid, ts);
create index if not exists events_name_ts_idx on events (name, ts);

-- One row per inquiry that came from the site. inquiry_id is the id the workbench
-- returned, so this joins to public.inquiries without touching that schema.
create table if not exists lead_attr (
  inquiry_id  bigint primary key,
  vid         text,
  attr        jsonb not null,
  created_at  timestamptz not null default now()
);

-- Housekeeping helper: prune raw events after 180 days, keep attribution forever.
-- Add to cron if the table grows:  psql -d dataplane -c "select prune_events(180)"
create or replace function prune_events(keep_days int default 180) returns bigint as $$
declare removed bigint;
begin
  delete from events where ts < now() - (keep_days || ' days')::interval;
  get diagnostics removed = row_count;
  return removed;
end $$ language plpgsql;
