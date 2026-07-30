-- The New Wave IT — Proposities-contenttype
-- Vierde propositie-set (probleem-eerst) die als PMC op de sectorpagina's
-- verschijnt. Zelfde structuur + RLS als de overige cms_-tabellen.

create table if not exists public.cms_proposities (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  titel         text not null,
  status        text not null default 'concept',
  data          jsonb not null default '{}'::jsonb,
  volgorde      integer not null default 0,
  bijgewerkt_op timestamptz not null default now(),
  bewerkt_door  text
);

alter table public.cms_proposities enable row level security;

-- Publiek: alleen live content leesbaar.
create policy "publiek leest live cms_proposities"
  on public.cms_proposities for select
  using (status = 'live');

-- Staff (ingelogd): volledige toegang.
create policy "auth beheert cms_proposities"
  on public.cms_proposities for all
  to authenticated
  using (true) with check (true);

create index if not exists cms_proposities_status_volgorde_idx
  on public.cms_proposities (status, volgorde);
