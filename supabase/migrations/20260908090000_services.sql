-- The New Wave IT — Services-contenttype
-- De negen boekbare diensten uit de dienstencatalogus (doen/richting/capaciteit).
-- Zelfde structuur + RLS als de overige cms_-tabellen.

create table if not exists public.cms_services (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  titel         text not null,
  status        text not null default 'concept',
  data          jsonb not null default '{}'::jsonb,
  volgorde      integer not null default 0,
  bijgewerkt_op timestamptz not null default now(),
  bewerkt_door  text
);

alter table public.cms_services enable row level security;

-- Publiek: alleen live content leesbaar.
create policy "publiek leest live cms_services"
  on public.cms_services for select
  using (status = 'live');

-- Staff (ingelogd): volledige toegang.
create policy "auth beheert cms_services"
  on public.cms_services for all
  to authenticated
  using (true) with check (true);

create index if not exists cms_services_status_volgorde_idx
  on public.cms_services (status, volgorde);
