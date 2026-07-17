-- The New Wave IT — CMS-schema
-- Contenttabellen (dynamisch beheerbaar) + uitbreiding van de inzendingstabellen.
-- RLS: publiek leest alleen 'live' content; ingelogde staff beheert alles.

-- ============================================================
-- Inzendingen uitbreiden
-- ============================================================
alter table public.contact_aanvragen
  add column if not exists toegewezen_aan text,
  add column if not exists interne_notitie text;

alter table public.sollicitaties
  add column if not exists interne_notitie text;

-- ============================================================
-- Generieke contenttabellen
-- Elk record: slug, titel, status (live|concept), data (jsonb met de
-- typespecifieke velden), volgorde en audit-velden.
-- ============================================================
do $$
declare
  t text;
begin
  foreach t in array array[
    'cms_paginas','cms_cases','cms_diensten','cms_sectoren',
    'cms_artikelen','cms_vacatures','cms_teamleden'
  ]
  loop
    execute format($f$
      create table if not exists public.%I (
        id           uuid primary key default gen_random_uuid(),
        slug         text not null unique,
        titel        text not null,
        status       text not null default 'concept',
        data         jsonb not null default '{}'::jsonb,
        volgorde     integer not null default 0,
        bijgewerkt_op timestamptz not null default now(),
        bewerkt_door text
      );
    $f$, t);

    execute format('alter table public.%I enable row level security;', t);

    -- Publiek: alleen live content leesbaar (anon + authenticated).
    execute format($p$
      create policy "publiek leest live %1$s"
        on public.%1$I for select
        using (status = 'live');
    $p$, t);

    -- Staff (ingelogd): volledige toegang.
    execute format($p$
      create policy "auth beheert %1$s"
        on public.%1$I for all
        to authenticated
        using (true) with check (true);
    $p$, t);

    execute format(
      'create index if not exists %I on public.%I (status, volgorde);',
      t || '_status_volgorde_idx', t
    );
  end loop;
end $$;
