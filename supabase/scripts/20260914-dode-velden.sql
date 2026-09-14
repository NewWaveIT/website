-- Dode velden uit de CMS-rijen (14 september 2026).
--
-- Negen velden stonden wel in het schema, de seed en de editor, maar werden
-- nergens op de site gerenderd. Een redacteur kon ze invullen zonder dat er
-- ooit iets zou verschijnen. Ze zijn uit de code weg (FIELD_SCHEMAS, de
-- TypeScript-interface, het zod-schema en de seed); dit script haalt ze ook
-- uit de opgeslagen rijen.
--
-- Waarom dat moet: niets ruimt dit vanzelf op. Blijven ze staan, dan komen ze
-- terug zodra iemand het veld ooit opnieuw invoert, en tot die tijd sleept elke
-- rij tientallen kilobytes mee die nergens toe leiden.
--
--   cases     metric
--   diensten  badgeIcon, ctaSecondary, ctaTitle, insights, kpis, serviceSlug
--   services  kpis, volgendeStapSlugs
--
-- `insightsTitle` blijft: die titel wordt wél getoond, boven de live artikelen.


update public.cms_cases
   set data = data - array['metric']::text[]
 where data ?| array['metric']::text[];

update public.cms_diensten
   set data = data - array['badgeIcon', 'ctaSecondary', 'ctaTitle', 'insights', 'kpis', 'serviceSlug']::text[]
 where data ?| array['badgeIcon', 'ctaSecondary', 'ctaTitle', 'insights', 'kpis', 'serviceSlug']::text[];

update public.cms_services
   set data = data - array['kpis', 'volgendeStapSlugs']::text[]
 where data ?| array['kpis', 'volgendeStapSlugs']::text[];


-- Controle: geen regels terug. Elke regel die er wél is, noemt de rij en
-- de sleutels die er nog in staan.
select 'cases' as soort, slug,
       (select string_agg(v, ', ') from unnest(array['metric']) as v where data ? v) as resten
  from public.cms_cases
 where data ?| array['metric']::text[]
union all
select 'diensten' as soort, slug,
       (select string_agg(v, ', ') from unnest(array['badgeIcon', 'ctaSecondary', 'ctaTitle', 'insights', 'kpis', 'serviceSlug']) as v where data ? v) as resten
  from public.cms_diensten
 where data ?| array['badgeIcon', 'ctaSecondary', 'ctaTitle', 'insights', 'kpis', 'serviceSlug']::text[]
union all
select 'services' as soort, slug,
       (select string_agg(v, ', ') from unnest(array['kpis', 'volgendeStapSlugs']) as v where data ? v) as resten
  from public.cms_services
 where data ?| array['kpis', 'volgendeStapSlugs']::text[];
