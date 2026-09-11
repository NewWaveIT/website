-- Tekstronde deel 2: wat blijft er na deel 1 nog staan?
--
-- Regels die hier terugkomen zijn door een redacteur aangepast sinds de seed,
-- of zijn nieuw ingetypt in de admin. Ze zijn dus niet fout, maar ze dragen wel
-- een em-streepje. Loop ze langs in de admin en vervang het streepje door een
-- komma, dubbele punt of punt -- wat de zin nodig heeft.
--
-- Bereiken (6-10x, 09:00-17:00, EUR 4.500 - 6.500) horen een halve kastlijn te
-- houden; die staan er los onder.

with rijen as (
  select 'cms_cases' as tabel, slug, data from cms_cases
  union all select 'cms_sectoren', slug, data from cms_sectoren
  union all select 'cms_services', slug, data from cms_services
  union all select 'cms_paginas', slug, data from cms_paginas
  union all select 'cms_proposities', slug, data from cms_proposities
  union all select 'cms_diensten', slug, data from cms_diensten
  union all select 'cms_artikelen', slug, data from cms_artikelen
  union all select 'cms_vacatures', slug, data from cms_vacatures
  union all select 'cms_teamleden', slug, data from cms_teamleden
)
select tabel, slug, e.key as veld, e.value #>> '{}' as tekst
from rijen, lateral jsonb_each(data) as e(key, value)
where jsonb_typeof(e.value) = 'string'
  and e.value #>> '{}' like '%' || chr(8212) || '%'   -- em-streepje
union all
-- geneste velden (secties, resultaten, faq) staan niet als losse sleutel
select tabel, slug, '(genest)', left(data::text, 400)
from rijen
where data::text like '%' || chr(8212) || '%'
  and not exists (
    select 1 from jsonb_each(data) as e(key, value)
    where jsonb_typeof(e.value) = 'string' and e.value #>> '{}' like '%' || chr(8212) || '%'
  )
order by 1, 2, 3;
