-- Zijbalkteller voor de nieuwe /admin/nieuwsbrief-lijst (17 september 2026).
--
-- Inzichten-aanmeldingen landen al in contact_aanvragen met type 'inzichten'
-- (zie app/(marketing)/inzichten/actions.ts); ze hadden alleen geen eigen
-- plek in de admin en geen teller. Deze functie vervangt admin_aantallen()
-- met een extra regel; de rest blijft ongewijzigd.

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
  select 'aanvragen',    count(*) from public.contact_aanvragen where status <> 'afgerond' and type <> 'inzichten'
  union all
  select 'sollicitaties', count(*) from public.sollicitaties where status <> 'afgerond'
  union all
  select 'nieuwsbrief',  count(*) from public.contact_aanvragen where type = 'inzichten';
$$;

-- Controle: twaalf regels, met 'nieuwsbrief' als nieuwe.
select * from public.admin_aantallen();
