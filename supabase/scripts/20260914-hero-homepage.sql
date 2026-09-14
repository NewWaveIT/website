-- Hero-tekst van de homepage naar het CMS: de rij bijwerken.
--
-- DRAAI DIT METEEN. `heroTitleStart`, `heroAccent` en `heroLead` op de
-- home-rij stonden al in de admin maar werden nergens gelezen: de homepage
-- rendert <HeroSector />, en die tekst stond hardgecodeerd in de component.
-- De drie velden zijn daardoor blijven staan op de kop van de vórige hero.
--
-- Sinds deze deploy leest de component ze wél. Zolang deze update niet is
-- gedraaid toont de homepage dus "Wij maken van business en IT één beweging"
-- met de oude, langere intro, in plaats van wat er nu staat.
--
-- Deze waarden zijn letterlijk de tekst die vandaag op de homepage staat, uit
-- components/home/hero-sector.tsx. Er verandert dus niets zichtbaars; de tekst
-- wordt alleen bewerkbaar.

update cms_paginas
set data = data
  || jsonb_build_object(
       'heroTitleStart', 'Business en IT als ',
       'heroAccent',     'één beweging',
       'heroTitleEnd',   '.',
       'heroLead',       'Sectorkennis, Mendix en AI in één team, van eerste sessie tot werkende software voor de mensen die ermee werken.'
     )
where slug = 'home';

-- Controle: dit hoort de kop en de intro van de homepage te zijn.
select
  (data ->> 'heroTitleStart') || (data ->> 'heroAccent') || (data ->> 'heroTitleEnd') as kop,
  data ->> 'heroLead' as intro
from cms_paginas
where slug = 'home';
