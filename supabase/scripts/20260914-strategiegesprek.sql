-- De slot-CTA op de homepage gelijktrekken met /contact.
--
-- De seed zegt al "Plan een gesprek", maar de home-rij in het CMS draagt nog
-- "Plan een strategiegesprek". Dat kan geen test vangen: de e2e draait tegen de
-- seed, omdat CI Supabase niet bereikt. De positionering is verschoven van "plan
-- een strategiegesprek" naar "begin met wat je in een dag kunt doen", dus het
-- woord hoort nergens meer te staan.

-- ---------- 1. de knop op de homepage ----------
update cms_paginas
set data = jsonb_set(data, '{ctaKnop}', '"Plan een gesprek"')
where slug = 'home' and data->>'ctaKnop' is distinct from 'Plan een gesprek';

-- ---------- 2. staat het woord nog ergens anders? ----------
-- Alles wat hier terugkomt is tekst die een redacteur heeft ingetypt. Loop het
-- langs in de admin; er is geen goede automatische vervanging, want per zin
-- verschilt het of er "gesprek", "kennismaking" of iets anders hoort te staan.
with rijen as (
  select 'cms_paginas' as tabel, slug, data from cms_paginas
  union all select 'cms_cases', slug, data from cms_cases
  union all select 'cms_diensten', slug, data from cms_diensten
  union all select 'cms_sectoren', slug, data from cms_sectoren
  union all select 'cms_services', slug, data from cms_services
  union all select 'cms_artikelen', slug, data from cms_artikelen
  union all select 'cms_vacatures', slug, data from cms_vacatures
  union all select 'cms_teamleden', slug, data from cms_teamleden
  union all select 'cms_proposities', slug, data from cms_proposities
)
select tabel, slug, e.key as veld, e.value #>> '{}' as tekst
from rijen, lateral jsonb_each(data) as e(key, value)
where jsonb_typeof(e.value) = 'string'
  and e.value #>> '{}' ilike '%strategiegesprek%'
union all
select tabel, slug, '(genest)', left(data::text, 400)
from rijen
where data::text ilike '%strategiegesprek%'
  and not exists (
    select 1 from jsonb_each(data) as e(key, value)
    where jsonb_typeof(e.value) = 'string' and e.value #>> '{}' ilike '%strategiegesprek%'
  )
order by 1, 2, 3;
