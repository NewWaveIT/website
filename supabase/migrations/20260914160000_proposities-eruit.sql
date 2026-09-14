-- Proposities eruit (14 september 2026).
--
-- Het contenttype 'proposities' bestond wel in de admin, maar geen enkele
-- publieke pagina rendert het. Er was een tabel, een zijbalk-item, een
-- veldschema en een seed van vier proposities, en het enige wat je ermee kon
-- doen was ze invullen. Op verzoek gaat alles weg.
--
-- Deze migratie doet drie dingen: de twee dashboardfuncties opnieuw aanmaken
-- zonder de propositie-regel, en daarna pas de tabel laten vallen. In die
-- volgorde, want een functie die naar een verdwenen tabel wijst breekt bij de
-- eerstvolgende aanroep.
--
-- `drop table` is onomkeerbaar. De vier proposities die erin stonden zijn
-- daarna weg; dat is de expliciete keuze van de eigenaar.

create or replace function public.admin_aantallen()
returns table (naam text, aantal bigint)
language sql
stable
set search_path = ''
as $$
  select 'paginas',      count(*) from public.cms_paginas
  union all
  select 'cases',        count(*) from public.cms_cases
  union all
  select 'diensten',     count(*) from public.cms_diensten
  union all
  select 'sectoren',     count(*) from public.cms_sectoren
  union all
  select 'services',     count(*) from public.cms_services
  union all
  select 'artikelen',    count(*) from public.cms_artikelen
  union all
  select 'vacatures',    count(*) from public.cms_vacatures
  union all
  select 'teamleden',    count(*) from public.cms_teamleden
  union all
  select 'aanvragen',    count(*) from public.contact_aanvragen where status <> 'afgerond'
  union all
  select 'sollicitaties', count(*) from public.sollicitaties where status <> 'afgerond';
$$;

create or replace function public.admin_status_aantallen()
returns table (naam text, live bigint, concept bigint)
language sql
stable
set search_path = ''
as $$
  with t as (
    select 'paginas' as naam, status from public.cms_paginas
    union all select 'cases',       status from public.cms_cases
    union all select 'diensten',    status from public.cms_diensten
    union all select 'sectoren',    status from public.cms_sectoren
    union all select 'services',    status from public.cms_services
    union all select 'artikelen',   status from public.cms_artikelen
    union all select 'vacatures',   status from public.cms_vacatures
    union all select 'teamleden',   status from public.cms_teamleden
  )
  select naam,
         count(*) filter (where status = 'live')    as live,
         count(*) filter (where status = 'concept') as concept
  from t
  group by naam;
$$;

create or replace function public.admin_concepten(limiet integer default 8)
returns table (
  soort text,
  id uuid,
  slug text,
  titel text,
  bijgewerkt_op timestamptz,
  bewerkt_door text
)
language sql
stable
set search_path = ''
as $$
  select * from (
    select 'paginas' as soort, id, slug, titel, bijgewerkt_op, bewerkt_door
      from public.cms_paginas where status = 'concept'
    union all select 'cases',       id, slug, titel, bijgewerkt_op, bewerkt_door
      from public.cms_cases where status = 'concept'
    union all select 'diensten',    id, slug, titel, bijgewerkt_op, bewerkt_door
      from public.cms_diensten where status = 'concept'
    union all select 'sectoren',    id, slug, titel, bijgewerkt_op, bewerkt_door
      from public.cms_sectoren where status = 'concept'
    union all select 'services',    id, slug, titel, bijgewerkt_op, bewerkt_door
      from public.cms_services where status = 'concept'
    union all select 'artikelen',   id, slug, titel, bijgewerkt_op, bewerkt_door
      from public.cms_artikelen where status = 'concept'
    union all select 'vacatures',   id, slug, titel, bijgewerkt_op, bewerkt_door
      from public.cms_vacatures where status = 'concept'
    union all select 'teamleden',   id, slug, titel, bijgewerkt_op, bewerkt_door
      from public.cms_teamleden where status = 'concept'
  ) x
  order by bijgewerkt_op desc nulls last
  limit greatest(limiet, 0);
$$;

drop table if exists public.cms_proposities;
