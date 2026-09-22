-- Redactieronde 21 september: feedback van de eigenaar op sector-, diensten- en
-- over-ons-teksten.
--
-- Dit script hoort bij dezelfde wijziging in de code (de seeds in lib/seeds/sectoren/
-- en lib/cms/paginas/). De seed is de koude start, de CMS-rij is wat de site toont --
-- dus zonder dit script verandert er live niets.
--
-- Elke update is afgeschermd op de oude waarde en is idempotent: twee keer draaien
-- doet de tweede keer niets. Raakt een update nul rijen, dan wijkt de CMS-tekst af
-- van de seed en is hij daar in de admin aangepast. Dat is geen fout, maar het
-- betekent wel dat die ene regel met de hand moet. Stap 1 laat zien om welke het gaat,
-- stap 8 telt na afloop na wat er wel en niet is geland.

-- ---------------------------------------------------------------------------
-- 1 - Diagnose: wat staat er nu? Draai dit eerst en bewaar de uitvoer.
-- ---------------------------------------------------------------------------

select 'sector' as bron, slug, 'h1' as veld, data->>'h1' as waarde
from public.cms_sectoren where slug in ('banken', 'zorg', 'publieke-sector')
union all
select 'sector', slug, 'intro', data->>'intro'
from public.cms_sectoren where slug in ('banken', 'publieke-sector')
union all
select 'sector', slug, 'pitch', data->>'pitch'
from public.cms_sectoren where slug = 'banken'
union all
select 'sector', slug, 'metaDescription', data->>'metaDescription'
from public.cms_sectoren where slug = 'banken'
union all
select 'sector', slug, 'oplossingenTitel', data->>'oplossingenTitel'
from public.cms_sectoren where slug = 'banken'
union all
select 'sector', slug, 'herkenning (aantal)', jsonb_array_length(data->'herkenning')::text
from public.cms_sectoren where slug = 'banken'
union all
select 'sector', slug, 'oplossingen[3].pijn', data->'oplossingen'->3->>'pijn'
from public.cms_sectoren where slug = 'banken'
union all
select 'sector', slug, 'herkenningTitel', data->>'herkenningTitel'
from public.cms_sectoren where slug = 'publieke-sector'
union all
select 'sector', slug, 'mensenTitel', data->>'mensenTitel'
from public.cms_sectoren where slug = 'publieke-sector'
union all
select 'sector', slug, 'waaromAlineas[0]', data->'waaromAlineas'->>0
from public.cms_sectoren where slug = 'publieke-sector'
union all
select 'sector', slug, 'hook', data->>'hook'
from public.cms_sectoren where slug = 'zorg'
union all
select 'sector', slug, 'bouwenTitel', data->>'bouwenTitel'
from public.cms_sectoren where slug in ('zorg', 'publieke-sector', 'manufacturing', 'mobiliteit')
union all
select 'pagina', slug, 'bouwenKicker', data->>'bouwenKicker'
from public.cms_paginas where slug = 'sector-detail'
union all
select 'pagina', slug, 'heroTitleStart', data->>'heroTitleStart'
from public.cms_paginas where slug = 'diensten'
union all
select 'pagina', slug, 'waarde4Tekst', data->>'waarde4Tekst'
from public.cms_paginas where slug = 'over-ons'
union all
select 'pagina', slug, 'kpi3Getal / kpi3Label',
       coalesce(data->>'kpi3Getal', '(afwezig)') || ' / ' || coalesce(data->>'kpi3Label', '(afwezig)')
from public.cms_paginas where slug = 'over-ons'
order by bron, slug, veld;

-- ---------------------------------------------------------------------------
-- 2 - Publieke sector: ook de centrale overheid, en twee AI-tegenstellingen eruit
-- ---------------------------------------------------------------------------

update public.cms_sectoren set data = jsonb_set(data, '{intro}', to_jsonb(
  'Gemeenten, uitvoeringsorganisaties en de centrale overheid lopen vast op systemen die nieuw beleid niet aankunnen. Wij ontwikkelen applicaties die in weken aanpasbaar zijn.'::text))
where slug = 'publieke-sector'
  and data->>'intro' = 'Gemeenten en uitvoeringsorganisaties lopen vast op systemen die nieuw beleid niet aankunnen. Wij bouwen applicaties die in weken aanpasbaar zijn, niet in jaren.';

update public.cms_sectoren set data = jsonb_set(data, '{herkenningTitel}', to_jsonb(
  'Waar het in de publieke sector vastloopt'::text))
where slug = 'publieke-sector'
  and data->>'herkenningTitel' = 'Waar het bij gemeenten en uitvoerders vastloopt';

update public.cms_sectoren set data = jsonb_set(data, '{mensenTitel}', to_jsonb(
  'Mensen die de publieke sector kennen'::text))
where slug = 'publieke-sector'
  and data->>'mensenTitel' = 'Mensen die de uitvoering kennen, niet alleen de techniek';

update public.cms_sectoren set data = jsonb_set(data, '{waaromAlineas,0}', to_jsonb(
  replace(data->'waaromAlineas'->>0,
          'Bij gemeenten en uitvoerders zien we steeds hetzelfde:',
          'Bij gemeenten, uitvoeringsorganisaties en de centrale overheid zien we steeds hetzelfde:')))
where slug = 'publieke-sector'
  and data->'waaromAlineas'->>0 like '%Bij gemeenten en uitvoerders zien we steeds hetzelfde:%';

-- ---------------------------------------------------------------------------
-- 3 - Zorg: minder tijd voor registratie, niet voor systemen
-- ---------------------------------------------------------------------------

update public.cms_sectoren set data = jsonb_set(data, '{h1}', to_jsonb(
  'Meer tijd voor zorg, minder tijd voor registratie'::text))
where slug = 'zorg'
  and data->>'h1' = 'Meer tijd voor zorg, minder tijd voor systemen';

-- De hook staat ook op de homepage en op /sectoren; het is hetzelfde veld,
-- dus deze ene update verandert alle drie de plekken.
update public.cms_sectoren set data = jsonb_set(data, '{hook}', to_jsonb(
  '“Onze mensen zijn meer tijd kwijt aan registratie dan aan zorgtaken.”'::text))
where slug = 'zorg'
  and data->>'hook' = '“Onze mensen registreren meer dan ze zorgen.”';

-- ---------------------------------------------------------------------------
-- 4 - Banken: AI erbij, bovenaan de pagina
-- ---------------------------------------------------------------------------

update public.cms_sectoren set data = jsonb_set(data, '{h1}', to_jsonb(
  'Mendix en AI opschalen, zonder de controle te verliezen'::text))
where slug = 'banken'
  and data->>'h1' = 'Van tien apps naar honderd, zonder de controle te verliezen';

update public.cms_sectoren set data = jsonb_set(data, '{intro}', to_jsonb(
  'Met twintig Mendix-apps red je het op discipline. Bij honderd niet meer, en voor AI geldt hetzelfde. Wij helpen banken en verzekeraars allebei opschalen met governance die de snelheid niet in de weg zit.'::text))
where slug = 'banken'
  and data->>'intro' = 'Met twintig Mendix-apps red je het op discipline. Bij honderd niet meer. Wij helpen banken en verzekeraars opschalen met governance die de snelheid niet in de weg zit.';

update public.cms_sectoren set data = jsonb_set(data, '{pitch}', to_jsonb(
  'Wij helpen banken en verzekeraars Mendix en AI opschalen met governance die snelheid en controle samen laat gaan.'::text))
where slug = 'banken'
  and data->>'pitch' = 'Wij helpen banken en verzekeraars opschalen met governance die snelheid en controle samen laat gaan.';

update public.cms_sectoren set data = jsonb_set(data, '{metaDescription}', to_jsonb(
  'Van tien apps naar honderd, met kwaliteit, beheer en governance op orde. Voor banken en verzekeraars die Mendix en AI breed inzetten.'::text))
where slug = 'banken'
  and data->>'metaDescription' = 'Van tien apps naar honderd, met kwaliteit, beheer en governance op orde. Voor banken en verzekeraars die Mendix breed inzetten.';

update public.cms_sectoren set data = jsonb_set(data, '{oplossingenTitel}', to_jsonb(
  'Vijf vraagstukken bij het opschalen van Mendix en AI'::text))
where slug = 'banken'
  and data->>'oplossingenTitel' = 'Vier vraagstukken bij het opschalen van Mendix en AI';

-- Vijfde herkenningspunt erbij, alleen als hij er nog niet staat.
update public.cms_sectoren
set data = jsonb_set(data, '{herkenning}',
  (data->'herkenning') || jsonb_build_array('“Iedereen wil iets met AI, maar wat, en binnen welke kaders?”'))
where slug = 'banken'
  and not (data->'herkenning' @> jsonb_build_array('“Iedereen wil iets met AI, maar wat, en binnen welke kaders?”'));

-- Strategische AI als vraagstuk, vlak voor 'AI-enabled development'.
-- Raakt dit nul rijen, dan staat die rij niet meer op plek 4; meld dat dan even.
update public.cms_sectoren
set data = jsonb_insert(data, '{oplossingen,3}', '{
  "pijn": "AI opzetten en opschalen",
  "kost": "Losse pilots blijven hangen: geen zicht op welke use-cases waarde opleveren en of ze door de toezichthouder komen",
  "oplossing": "AI-maturity scan, een geprioriteerde roadmap met businesscase, en AI-governance waarin AVG en de AI Act ontwerpeis zijn in plaats van eindcontrole",
  "laag": "strategie"
}'::jsonb)
where slug = 'banken'
  and data->'oplossingen'->3->>'pijn' = 'AI-enabled development'
  and not (data->'oplossingen' @> '[{"pijn":"AI opzetten en opschalen"}]'::jsonb);

-- ---------------------------------------------------------------------------
-- 5 - 'Applicaties die we hier het vaakst bouwen' wordt 'Voorbeeldcases'
--
-- Vier sectoren hebben deze kop; banken heeft er geen use-cases onder staan en
-- laat hem leeg. De kicker erboven zei 'Wat we bouwen' en staat nu op
-- 'Wat we ontwikkelen', in lijn met dezelfde woordkeuze in de publieke sector.
-- ---------------------------------------------------------------------------

update public.cms_sectoren set data = jsonb_set(data, '{bouwenTitel}', to_jsonb('Voorbeeldcases'::text))
where slug in ('zorg', 'publieke-sector', 'manufacturing', 'mobiliteit')
  and data->>'bouwenTitel' = 'Applicaties die we hier het vaakst bouwen';

update public.cms_paginas set data = jsonb_set(data, '{bouwenKicker}', to_jsonb('Wat we ontwikkelen'::text))
where slug = 'sector-detail'
  and data->>'bouwenKicker' = 'Wat we bouwen';

-- ---------------------------------------------------------------------------
-- 6 - Dienstenpagina: concrete hero in plaats van 'Mensen die meebouwen'
-- ---------------------------------------------------------------------------

update public.cms_paginas set data = jsonb_set(data, '{heroTitleStart}', to_jsonb(
  'Een extra consultant in jouw team, of '::text))
where slug = 'diensten'
  and data->>'heroTitleStart' = 'Mensen die meebouwen, of ';

-- ---------------------------------------------------------------------------
-- 7 - Over ons: het CO2-doel voor 2030 heeft de focus niet meer
--
-- kpi3Getal en kpi3Label zijn uit PAGE_FIELDS gehaald, dus ze zijn dode data
-- geworden. Weg uit de rij, anders meldt /admin/baseline ze voortaan als
-- weessleutel en blijft de oude belofte in de JSON-export staan.
-- ---------------------------------------------------------------------------

update public.cms_paginas set data = jsonb_set(data, '{waarde4Tekst}', to_jsonb(
  'Ondernemen en maatschappelijke bijdrage horen bij elkaar.'::text))
where slug = 'over-ons'
  and data->>'waarde4Tekst' = 'Ondernemen en maatschappelijke bijdrage horen bij elkaar. In 2030 is ons businessmodel 100% CO2-neutraal.';

update public.cms_paginas set data = data - 'kpi3Getal' - 'kpi3Label'
where slug = 'over-ons'
  and (data ? 'kpi3Getal' or data ? 'kpi3Label');

-- ---------------------------------------------------------------------------
-- 8 - Controle. Verwacht: elke regel staat op 'nieuw'.
-- ---------------------------------------------------------------------------

select veld, waarde,
       case when goed then 'nieuw' else 'ONGEWIJZIGD - kijk na' end as status
from (
  select 'banken.h1' as veld, data->>'h1' as waarde,
         data->>'h1' = 'Mendix en AI opschalen, zonder de controle te verliezen' as goed
  from public.cms_sectoren where slug = 'banken'
  union all
  select 'banken.intro', left(data->>'intro', 120), data->>'intro' like '%en voor AI geldt hetzelfde%'
  from public.cms_sectoren where slug = 'banken'
  union all
  select 'banken.pitch', data->>'pitch', data->>'pitch' like '%Mendix en AI opschalen%'
  from public.cms_sectoren where slug = 'banken'
  union all
  select 'banken.metaDescription', left(data->>'metaDescription', 120),
         data->>'metaDescription' like '%Mendix en AI breed inzetten%'
  from public.cms_sectoren where slug = 'banken'
  union all
  select 'banken.oplossingenTitel', data->>'oplossingenTitel',
         data->>'oplossingenTitel' like 'Vijf vraagstukken%'
  from public.cms_sectoren where slug = 'banken'
  union all
  select 'banken.herkenning', jsonb_array_length(data->'herkenning')::text || ' punten',
         data->'herkenning' @> jsonb_build_array('“Iedereen wil iets met AI, maar wat, en binnen welke kaders?”')
  from public.cms_sectoren where slug = 'banken'
  union all
  select 'banken.oplossingen', jsonb_array_length(data->'oplossingen')::text || ' vraagstukken',
         data->'oplossingen' @> '[{"pijn":"AI opzetten en opschalen"}]'::jsonb
  from public.cms_sectoren where slug = 'banken'
  union all
  select 'diensten.heroTitleStart', data->>'heroTitleStart',
         data->>'heroTitleStart' = 'Een extra consultant in jouw team, of '
  from public.cms_paginas where slug = 'diensten'
  union all
  select 'over-ons.kpi3*', case when data ? 'kpi3Getal' or data ? 'kpi3Label'
                                then 'staat er nog' else 'weg' end,
         not (data ? 'kpi3Getal' or data ? 'kpi3Label')
  from public.cms_paginas where slug = 'over-ons'
  union all
  select 'over-ons.waarde4Tekst', data->>'waarde4Tekst', data->>'waarde4Tekst' not like '%2030%'
  from public.cms_paginas where slug = 'over-ons'
  union all
  select 'publieke-sector.herkenningTitel', data->>'herkenningTitel',
         data->>'herkenningTitel' = 'Waar het in de publieke sector vastloopt'
  from public.cms_sectoren where slug = 'publieke-sector'
  union all
  select 'publieke-sector.intro', left(data->>'intro', 120),
         data->>'intro' like 'Gemeenten, uitvoeringsorganisaties en de centrale overheid%'
           and data->>'intro' not like '%niet in jaren%'
  from public.cms_sectoren where slug = 'publieke-sector'
  union all
  select 'publieke-sector.mensenTitel', data->>'mensenTitel',
         data->>'mensenTitel' = 'Mensen die de publieke sector kennen'
  from public.cms_sectoren where slug = 'publieke-sector'
  union all
  select 'publieke-sector.waaromAlineas[0]', left(data->'waaromAlineas'->>0, 120),
         data->'waaromAlineas'->>0 not like '%Bij gemeenten en uitvoerders%'
  from public.cms_sectoren where slug = 'publieke-sector'
  union all
  select 'zorg.h1', data->>'h1', data->>'h1' = 'Meer tijd voor zorg, minder tijd voor registratie'
  from public.cms_sectoren where slug = 'zorg'
  union all
  select 'zorg.hook', data->>'hook', data->>'hook' like '%registratie dan aan zorgtaken%'
  from public.cms_sectoren where slug = 'zorg'
  union all
  select 'sector-detail.bouwenKicker', data->>'bouwenKicker',
         data->>'bouwenKicker' = 'Wat we ontwikkelen'
  from public.cms_paginas where slug = 'sector-detail'
  union all
  select slug || '.bouwenTitel', data->>'bouwenTitel', data->>'bouwenTitel' = 'Voorbeeldcases'
  from public.cms_sectoren where slug in ('zorg', 'publieke-sector', 'manufacturing', 'mobiliteit')
) t
order by veld;
