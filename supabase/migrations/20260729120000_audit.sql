-- The New Wave IT — Activiteitenlog (audit) voor CMS-wijzigingen.
-- Houdt per opslaan/verwijderen bij welke gebruiker wat wanneer aanpaste.
-- Append-only: alleen lezen en toevoegen voor ingelogde staff (geen update/delete).
--
-- Gebruikersbeheer zelf gebruikt de Supabase Auth Admin API (auth.users) en
-- vereist geen aparte tabel. Zet daarvoor SUPABASE_SERVICE_ROLE_KEY als
-- server-env in .env.local én in Vercel.

create table if not exists public.cms_audit (
  id             uuid primary key default gen_random_uuid(),
  tijdstip       timestamptz not null default now(),
  gebruiker_email text,
  gebruiker_naam  text,
  actie          text not null,          -- aangemaakt | bijgewerkt | verwijderd
  content_type   text not null,          -- paginas | cases | diensten | ...
  slug           text,
  titel          text
);

alter table public.cms_audit enable row level security;

create policy "auth leest audit"
  on public.cms_audit for select
  to authenticated
  using (true);

create policy "auth schrijft audit"
  on public.cms_audit for insert
  to authenticated
  with check (true);

create index if not exists cms_audit_tijdstip_idx on public.cms_audit (tijdstip desc);
