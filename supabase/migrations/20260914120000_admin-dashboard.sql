-- Twee functies voor het dashboard (14 september 2026).
--
-- Het dashboard toont per contenttype hoeveel er live staat en hoeveel er als
-- concept wacht, plus de concepten zelf zodat je ze daar meteen kunt
-- publiceren. Zonder deze functies zijn dat achttien losse queries per
-- paginabezoek. Zelfde reden en zelfde vorm als admin_aantallen().
--
-- `security invoker` (de standaard) is hier belangrijk: er wordt geteld met de
-- rechten van de aanroeper, dus RLS blijft gelden. Anoniem zou alleen live
-- content zichtbaar zijn; alleen ingelogde staff ziet de concepten.

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
    union all select 'proposities', status from public.cms_proposities
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

-- De concepten zelf, nieuwste bewerking eerst. `soort` komt overeen met de
-- sleutels van CONTENT_TABLE in lib/cms/content.ts.
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
    union all select 'proposities', id, slug, titel, bijgewerkt_op, bewerkt_door
      from public.cms_proposities where status = 'concept'
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

revoke execute on function public.admin_status_aantallen() from anon;
revoke execute on function public.admin_concepten(integer) from anon;
grant execute on function public.admin_status_aantallen() to authenticated;
grant execute on function public.admin_concepten(integer) to authenticated;
