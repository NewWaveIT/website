-- The New Wave IT — initiële schema
-- Tabellen voor publieke formulieren: contactaanvragen en sollicitaties.
-- RLS staat aan; anonieme bezoekers mogen alleen INSERTen, nooit lezen.

-- ============================================================
-- Contactaanvragen (contact / strategiegesprek / quick scan)
-- ============================================================
create table if not exists public.contact_aanvragen (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  naam         text not null,
  email        text not null,
  bedrijf      text,
  onderwerp    text,
  bericht      text not null,
  type         text not null default 'contact', -- contact | strategiegesprek | quickscan | sectorrapport
  status       text not null default 'nieuw'    -- nieuw | in_behandeling | afgehandeld
);

alter table public.contact_aanvragen enable row level security;

-- Publiek formulier: iedereen mag een aanvraag indienen.
create policy "anon kan contactaanvraag indienen"
  on public.contact_aanvragen
  for insert
  to anon
  with check (true);

-- Alleen ingelogde (staff) gebruikers mogen lezen.
create policy "auth kan contactaanvragen lezen"
  on public.contact_aanvragen
  for select
  to authenticated
  using (true);

-- ============================================================
-- Sollicitaties (werken bij / vacatures)
-- ============================================================
create table if not exists public.sollicitaties (
  id             uuid primary key default gen_random_uuid(),
  created_at     timestamptz not null default now(),
  vacature_slug  text not null,
  naam           text not null,
  email          text not null,
  telefoon       text,
  motivatie      text,
  cv_url         text,
  status         text not null default 'nieuw'
);

alter table public.sollicitaties enable row level security;

create policy "anon kan solliciteren"
  on public.sollicitaties
  for insert
  to anon
  with check (true);

create policy "auth kan sollicitaties lezen"
  on public.sollicitaties
  for select
  to authenticated
  using (true);

-- Indexen voor sortering/filtering in een toekomstig admin-overzicht.
create index if not exists contact_aanvragen_created_at_idx on public.contact_aanvragen (created_at desc);
create index if not exists sollicitaties_created_at_idx on public.sollicitaties (created_at desc);
create index if not exists sollicitaties_vacature_slug_idx on public.sollicitaties (vacature_slug);
