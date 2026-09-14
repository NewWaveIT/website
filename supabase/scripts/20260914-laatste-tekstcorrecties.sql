-- De twee laatste losse tekstcorrecties, als SQL in plaats van handwerk.
--
-- Allebei hetzelfde patroon: de seed draagt al de goede tekst, de rij is
-- achtergebleven. Idempotent -- opnieuw draaien verandert niets.

-- ---------- 1. /contact, hero-introtekst ----------
-- "Een strategiegesprek plannen kan" -> "Een gesprek plannen kan". Het woord
-- strategiegesprek is afgeschaft; overal elders staat "Plan een gesprek".
update cms_paginas
set data = jsonb_set(data, '{heroLead}', to_jsonb('Een gesprek plannen kan, maar een korte vraag stellen mag ook gewoon. Bel, mail, app of kom langs, je zit nergens aan vast.'::text))
where slug = 'contact';

-- ---------- 2. Moove, De uitdaging ----------
-- Het laatste em-streepje uit de tekstronde. De rij was sinds de seed
-- herschreven, dus de letterlijke vervanging van script 1 sloeg hem over. De
-- seed is inmiddels gelijkgetrokken met deze CMS-tekst (commit 83cc8e0), dus
-- dit zet alleen het streepje om in een dubbele punt.
update cms_cases
set data = jsonb_set(data, '{challenge}', to_jsonb('Moove had al een bestaand Mendix-platform. De uitdaging zat niet in het platform zelf, maar in de ontbrekende schakels: een betrouwbare verwerking van voertuiginstallaties, en een moderne manier om handmatige ritregistratie te vervangen. Installaties liepen via meerdere losse systemen: foutgevoelig, arbeidsintensief en moeilijk te auditen. Chauffeurs deden hun ritregistratie nog zoals twintig jaar geleden: handmatig, in een notitieboekje of via generieke tools. Geotab registreerde elke rit al automatisch, maar de stap van rijdata naar een compliant rittenrapport dat een chauffeur zelf kan beheren, ontbrak nog.'::text))
where slug = 'moove';

-- ---------- controle ----------
select 'contact' as waar, left(data ->> 'heroLead', 60) as tekst
from cms_paginas where slug = 'contact'
union all
select 'moove', substring(data ->> 'challenge' from 'losse systemen.{0,20}')
from cms_cases where slug = 'moove';
