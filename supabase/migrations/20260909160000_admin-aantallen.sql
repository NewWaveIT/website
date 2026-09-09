-- Eén query voor de tellers in de admin-zijbalk (9 september 2026).
--
-- De layout deed elf losse count-queries per paginabezoek — parallel, maar wel
-- elf keer heen en weer naar Supabase voor getallen die alleen als badge naast
-- een menu-item staan. Deze functie levert ze in één keer.
--
-- `security invoker` (de standaard) is hier belangrijk: de functie telt met de
-- rechten van de aanroeper, dus RLS blijft gelden. Anoniem zou hij alleen live
-- content zien; alleen ingelogde staff krijgt de echte aantallen te zien.

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
  select 'proposities',  count(*) from public.cms_proposities
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

-- Alleen ingelogde gebruikers; de publieke site heeft deze tellers niet nodig.
revoke execute on function public.admin_aantallen() from anon;
grant execute on function public.admin_aantallen() to authenticated;

-- Controle: elf regels, met de aantallen zoals de zijbalk ze toont.
select * from public.admin_aantallen();
