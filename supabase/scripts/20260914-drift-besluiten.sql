-- Drie afwijkingen uit het driftrapport, met de beslissing erbij.

-- ---------- 1. over-ons / missieP1 ----------
-- De database draagt oudere marketingtaal ("maximale digitale impact
-- realiseren"); de code draagt de zin die door de schrijfstijlronde is gegaan.
-- Beslissing: de code wint.
update cms_paginas
set data = jsonb_set(data, '{missieP1}', to_jsonb('We richtten The New Wave IT op vanuit één overtuiging: technologie is het middel, de mens is de maat. Wij zijn geen anonieme delivery-machine. Je werkt met mensen die je vraagstuk écht doorgronden, van de eerste sessie tot livegang en daarna.'::text))
where slug = 'over-ons';

-- ---------- 2. over-ons / teamP2 ----------
-- Identiek op de slotzin na, die in de database ontbrak. Per ongeluk geschrapt,
-- dus terugzetten.
update cms_paginas
set data = jsonb_set(data, '{teamP2}', to_jsonb('Van strategische sessies tot livegang en beheer: hetzelfde team blijft aan boord. Zo houden we vaart, kwaliteit en verantwoordelijkheid bij elkaar. Wekelijkse Wavetime-sessies en een jaarlijkse Company week: structurele investering in hoe we sámen werken.'::text))
where slug = 'over-ons';

-- ---------- 3. sectoren / heroLead: nog te kiezen ----------
-- Lees eerst wat er nu staat; het driftrapport kapte hem af.
select data ->> 'heroLead' as cms_versie
from cms_paginas
where slug = 'sectoren';

-- De code-versie luidt:
--
--   Wij kiezen bewust voor vijf sectoren in plaats van generiek IT-advies: publieke sector, mobiliteit, banken, zorg en manufacturing. In elke sector kennen we de regels, de systemen en de druk waaronder jouw organisatie werkt. Daardoor leveren we sneller iets dat écht past, in plaats van een generieke oplossing die overal een beetje werkt.
--
-- Wil je die: haal het commentaar van de update hieronder weg en draai hem.
--
-- update cms_paginas
-- set data = jsonb_set(data, '{heroLead}', to_jsonb('Wij kiezen bewust voor vijf sectoren in plaats van generiek IT-advies: publieke sector, mobiliteit, banken, zorg en manufacturing. In elke sector kennen we de regels, de systemen en de druk waaronder jouw organisatie werkt. Daardoor leveren we sneller iets dat écht past, in plaats van een generieke oplossing die overal een beetje werkt.'::text))
-- where slug = 'sectoren';

-- ---------- controle ----------
select
  left(data ->> 'missieP1', 80) as missie,
  right(data ->> 'teamP2', 60)  as team_slot
from cms_paginas
where slug = 'over-ons';
