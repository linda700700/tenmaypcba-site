-- Core schema for the site admin console.
-- Design rule: the public site keeps working with zero rows here.
-- Static content in src/data stays as the fallback; these tables only override.

create table if not exists public.admins (
  email      text primary key,
  note       text,
  created_at timestamptz not null default now()
);

-- Editable singletons (hero copy, contact block, stats, footer, faq list...).
create table if not exists public.site_blocks (
  key        text primary key,
  label      text not null,
  payload    jsonb not null,
  updated_at timestamptz not null default now(),
  updated_by text
);

-- The twelve application cards. Missing rows fall back to src/data/useCases.js.
create table if not exists public.applications (
  id         text primary key,
  sector     text not null,
  sort_order integer not null default 0,
  name       text not null,
  keyword    text,
  board      text,
  fit        jsonb not null default '[]'::jsonb,
  batch      text,
  heat       text,
  basis      text,
  image_url  text,
  published  boolean not null default true,
  updated_at timestamptz not null default now(),
  updated_by text
);

create table if not exists public.leads (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  name         text,
  email        text,
  company      text,
  country      text,
  quantity     text,
  service      text,
  message      text,
  source_page  text,
  status       text not null default 'new',
  notes        text,
  updated_at   timestamptz
);

create table if not exists public.content_revisions (
  id         bigserial primary key,
  entity     text not null,
  entity_id  text,
  action     text not null,
  snapshot   jsonb,
  actor      text,
  created_at timestamptz not null default now()
);

-- Admin identity check. Email comes from the verified JWT claims, never from the client body.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admins a
    where a.email = lower(coalesce(
      nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'email',
      ''
    ))
  );
$$;

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (status);
create index if not exists applications_sector_idx on public.applications (sector, sort_order);
create index if not exists revisions_entity_idx on public.content_revisions (entity, created_at desc);

alter table public.admins            enable row level security;
alter table public.site_blocks        enable row level security;
alter table public.applications       enable row level security;
alter table public.leads              enable row level security;
alter table public.content_revisions  enable row level security;

-- site_blocks: public read, admin write.
drop policy if exists site_blocks_read on public.site_blocks;
create policy site_blocks_read on public.site_blocks
  for select using (true);

drop policy if exists site_blocks_admin_write on public.site_blocks;
create policy site_blocks_admin_write on public.site_blocks
  for all using (public.is_admin()) with check (public.is_admin());

-- applications: published rows are public, admins see drafts too.
drop policy if exists applications_read on public.applications;
create policy applications_read on public.applications
  for select using (published = true or public.is_admin());

drop policy if exists applications_admin_write on public.applications;
create policy applications_admin_write on public.applications
  for all using (public.is_admin()) with check (public.is_admin());

-- leads: anyone may submit, only admins may read or change.
drop policy if exists leads_public_insert on public.leads;
create policy leads_public_insert on public.leads
  for insert with check (true);

drop policy if exists leads_admin_read on public.leads;
create policy leads_admin_read on public.leads
  for select using (public.is_admin());

drop policy if exists leads_admin_update on public.leads;
create policy leads_admin_update on public.leads
  for update using (public.is_admin()) with check (public.is_admin());

drop policy if exists leads_admin_delete on public.leads;
create policy leads_admin_delete on public.leads
  for delete using (public.is_admin());

-- revisions: admin only.
drop policy if exists revisions_admin on public.content_revisions;
create policy revisions_admin on public.content_revisions
  for all using (public.is_admin()) with check (public.is_admin());

-- admins: admins only.
drop policy if exists admins_admin_only on public.admins;
create policy admins_admin_only on public.admins
  for all using (public.is_admin()) with check (public.is_admin());

-- PolarDB applies no default table privileges, so RLS policies alone are unreachable.
grant select on table public.site_blocks to anon;
grant select on table public.applications to anon;
-- Anonymous lead capture: column-level grant only, so a submitter cannot set
-- status, notes or any operator-owned field.
grant insert (name, email, company, country, quantity, service, message, source_page)
  on table public.leads to anon;

grant select on table public.site_blocks to authenticated;
grant select, insert, update, delete on table public.site_blocks to authenticated;
grant select on table public.applications to authenticated;
grant select, insert, update, delete on table public.applications to authenticated;
grant select, insert, update, delete on table public.leads to authenticated;
grant select, insert, update, delete on table public.content_revisions to authenticated;
grant select, insert, update, delete on table public.admins to authenticated;
grant usage, select on sequence public.content_revisions_id_seq to authenticated;

insert into public.admins (email, note)
values ('1563414877@qq.com', 'site owner')
on conflict (email) do nothing;
