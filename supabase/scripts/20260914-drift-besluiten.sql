-- Drie afwijkingen uit het driftrapport, alle drie besloten.
--
-- Idempotent: al gedraaid? Dan zet hij dezelfde waarden nog een keer en
-- verandert er niets.

-- ---------- 1. over-ons / missieP1 ----------
-- De database droeg oudere marketingtaal ("maximale digitale impact
-- realiseren"); de code draagt de zin die door de schrijfstijlronde is gegaan.
-- De code wint.
update cms_paginas
set data = jsonb_set(data, '{missieP1}', to_jsonb('We richtten The New Wave IT op vanuit één overtuiging: technologie is het middel, de mens is de maat. Wij zijn geen anonieme delivery-machine. Je werkt met mensen die je vraagstuk écht doorgronden, van de eerste sessie tot livegang en daarna.'::text))
where slug = 'over-ons';

-- ---------- 2. over-ons / teamP2 ----------
-- Identiek op de slotzin na, die per ongeluk uit de rij was verdwenen.
-- Teruggezet.
update cms_paginas
set data = jsonb_set(data, '{teamP2}', to_jsonb('Van strategische sessies tot livegang en beheer: hetzelfde team blijft aan boord. Zo houden we vaart, kwaliteit en verantwoordelijkheid bij elkaar. Wekelijkse Wavetime-sessies en een jaarlijkse Company week: structurele investering in hoe we sámen werken.'::text))
where slug = 'over-ons';

-- ---------- 3. sectoren / heroLead ----------
-- De database begon met "Geen generieke IT-dienstverlener, maar een
-- business-specialist in vijf markten", en dat is bijna letterlijk de blurb die
-- al in de voettekst van elke pagina staat. De code-versie noemt de vijf
-- sectoren bij naam, en daarvoor komt de bezoeker naar deze pagina.
update cms_paginas
set data = jsonb_set(data, '{heroLead}', to_jsonb('Wij kiezen bewust voor vijf sectoren in plaats van generiek IT-advies: publieke sector, mobiliteit, banken, zorg en manufacturing. In elke sector kennen we de regels, de systemen en de druk waaronder jouw organisatie werkt. Daardoor leveren we sneller iets dat écht past, in plaats van een generieke oplossing die overal een beetje werkt.'::text))
where slug = 'sectoren';

-- ---------- 4. home / mensenP1 ----------
-- Zelfde vorm als teamP2: de rij is de seedtekst minus de slotzin over de
-- Wavetime-sessies en de Company week. Ook per ongeluk geschrapt, dus terug.
update cms_paginas
set data = jsonb_set(data, '{mensenP1}', to_jsonb('Geen anonieme delivery-machine: bij ons ken je de mensen die jouw vraagstuk oplossen. Gepassioneerde consultants en engineers die naast je team staan, van eerste sessie tot livegang en daarna. Van wekelijkse Wavetime-sessies tot onze jaarlijkse Company week, we investeren structureel in hoe we sámen werken, niet alleen in wat we opleveren.'::text))
where slug = 'home';

-- ---------- controle ----------
-- Verwacht: missie begint met "We richtten The New Wave IT op", team eindigt op
-- "hoe we samen werken.", en de sectorlead noemt de vijf sectoren.
select 'over-ons' as slug, left(data ->> 'missieP1', 60) as begin, right(data ->> 'teamP2', 40) as eind
from cms_paginas where slug = 'over-ons'
union all
select 'sectoren', left(data ->> 'heroLead', 60), right(data ->> 'heroLead', 40)
from cms_paginas where slug = 'sectoren'
union all
select 'home', left(data ->> 'mensenP1', 60), right(data ->> 'mensenP1', 40)
from cms_paginas where slug = 'home';
