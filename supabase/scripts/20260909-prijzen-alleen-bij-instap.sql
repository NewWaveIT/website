-- Prijzen alleen nog bij de instapdiensten (9 september 2026).
--
-- Een bedrag zegt iets bij een dienst die concreet en in één dag af is. Bij
-- richting bepalen en capaciteit opbouwen hangt het van de situatie af; een
-- bandbreedte wekt daar de verkeerde verwachting.
--
-- De seed in lib/services.ts is al leeggemaakt, maar de CMS-rij wint van de
-- seed — dus zonder deze query blijven de prijzen gewoon op de site staan. Dat
-- is precies de werkafspraak uit CLAUDE.md: een contentwijziging is pas af als
-- de data mee is.
--
-- App in a Day en AI Agent in a Day (familie 'doen') houden hun prijs.

update public.cms_services
set data = jsonb_set(data, '{prijzen}', '[]'::jsonb)
where slug in (
  'ai-opportunity-scan',
  'ai-strategie',
  'it-strategie',
  'mendix-scale-sessie',
  'foundation-starterkit',
  'fusion-team-startsprint',
  'training-enablement'
);

-- Controle: alleen de twee instapdiensten horen nog een gevulde prijslijst te
-- hebben. Negen regels verwacht.
select
  slug,
  data->'familie'  as familie,
  jsonb_array_length(coalesce(data->'prijzen', '[]'::jsonb)) as aantal_prijzen
from public.cms_services
order by slug;
