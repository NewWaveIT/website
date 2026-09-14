-- Herstel: 21 komma's die mijn tekstronde-script heeft opgegeten.
--
-- Wat er misging. De generator van 20260911-tekstronde-1-vervangen.sql knipte
-- per zin het gewijzigde stuk uit en deed daarna `.strip()` met een tekenset om
-- een afsluitende TS-komma weg te halen. In die tekenset stond ook de gewone
-- komma. Bij 19 van de 81 vervangingen eindigde de nieuwe tekst juist op een
-- komma -- precies de komma die in de plaats kwam van het em-streepje -- en die
-- is dus meegestript. Resultaat: "diensten voor met een vaste scope" in plaats
-- van "diensten voor, met een vaste scope". Twee zinnen kregen om dezelfde
-- reden een komma te veel.
--
-- Geen van de fouten raakt de betekenis en geen enkele bracht een em-streepje
-- terug, maar ze staan wel live.
--
-- Deze correcties zijn afgeleid door de 81 vervangingen op de oude seed toe te
-- passen -- dat is letterlijk wat de database nu draagt -- en het resultaat te
-- vergelijken met de seed van nu. Daarna nogmaals gesimuleerd: met deze 21
-- erbij is het resultaat teken voor teken gelijk aan de seed.
--
-- Idempotent. Raakt een rij die een redacteur zelf heeft herschreven niet.


-- ---------- cms_cases (20) ----------
update cms_cases set data = replace(data::text, 'Moove had een bestaand Mendix-platform. De uitdaging was', 've had al een bestaand Mendix-platform. De uitdaging zat')::jsonb
 where data::text like '%Moove had een bestaand Mendix-platform. De uitdaging was%' escape '\';
update cms_cases set data = replace(data::text, 'had een bestaand Mendix-platform. De uitdaging was', ' al een bestaand Mendix-platform. De uitdaging zat')::jsonb
 where data::text like '%had een bestaand Mendix-platform. De uitdaging was%' escape '\';
update cms_cases set data = replace(data::text, 'een bestaand Mendix-platform. De uitdaging was niet', 'een bestaand Mendix-platform. De uitdaging zat niet in')::jsonb
 where data::text like '%een bestaand Mendix-platform. De uitdaging was niet%' escape '\';
update cms_cases set data = replace(data::text, 'Mendix-platform. De uitdaging was niet het platform zelf, maar', 'dix-platform. De uitdaging zat niet in het platform zelf, maar in')::jsonb
 where data::text like '%Mendix-platform. De uitdaging was niet het platform zelf, maar%' escape '\';
update cms_cases set data = replace(data::text, 'een betrouwbare verwerking van voertuiginstallaties', 'een betrouwbare verwerking van voertuiginstallaties,')::jsonb
 where data::text like '%een betrouwbare verwerking van voertuiginstallaties%' escape '\';
update cms_cases set data = replace(data::text, 'ritregistratie te vervangen. Moove verwerkte voertuiginstallaties', 'ritregistratie te vervangen. Installaties')::jsonb
 where data::text like '%ritregistratie te vervangen. Moove verwerkte voertuiginstallaties%' escape '\';
update cms_cases set data = replace(data::text, 'te vervangen. Moove verwerkte voertuiginstallaties', 'ndmatige ritregistratie te vervangen. Installaties liepen')::jsonb
 where data::text like '%te vervangen. Moove verwerkte voertuiginstallaties%' escape '\';
update cms_cases set data = replace(data::text, 'arbeidsintensief en moeilijk te auditen. Tegelijk deden chauffeurs', 'arbeidsintensief en moeilijk te auditen. Chauffeurs')::jsonb
 where data::text like '%arbeidsintensief en moeilijk te auditen. Tegelijk deden chauffeurs%' escape '\';
update cms_cases set data = replace(data::text, 'auditen. Tegelijk deden chauffeurs ritregistratie zoals', 'k te auditen. Chauffeurs deden hun ritregistratie nog zoals')::jsonb
 where data::text like '%auditen. Tegelijk deden chauffeurs ritregistratie zoals%' escape '\';
update cms_cases set data = replace(data::text, 'Tegelijk deden chauffeurs ritregistratie zoals dat', ' Chauffeurs deden hun ritregistratie nog zoals')::jsonb
 where data::text like '%Tegelijk deden chauffeurs ritregistratie zoals dat%' escape '\';
update cms_cases set data = replace(data::text, 'ritregistratie zoals dat twintig jaar geleden ook ging:', 'ritregistratie nog zoals twintig jaar geleden:')::jsonb
 where data::text like '%ritregistratie zoals dat twintig jaar geleden ook ging:%' escape '\';
update cms_cases set data = replace(data::text, 'zoals dat twintig jaar geleden ook ging: handmatig', 'istratie nog zoals twintig jaar geleden: handmatig,')::jsonb
 where data::text like '%zoals dat twintig jaar geleden ook ging: handmatig%' escape '\';
update cms_cases set data = replace(data::text, 'generieke tools. GPS maakt dat notitieboekje overbodig: Geotab', 'generieke tools. Geotab')::jsonb
 where data::text like '%generieke tools. GPS maakt dat notitieboekje overbodig: Geotab%' escape '\';
update cms_cases set data = replace(data::text, 'maakt dat notitieboekje overbodig: Geotab registreert', 'itieboekje of via generieke tools. Geotab registreerde')::jsonb
 where data::text like '%maakt dat notitieboekje overbodig: Geotab registreert%' escape '\';
update cms_cases set data = replace(data::text, 'notitieboekje overbodig: Geotab registreert elke rit', 'of via generieke tools. Geotab registreerde elke rit al')::jsonb
 where data::text like '%notitieboekje overbodig: Geotab registreert elke rit%' escape '\';
update cms_cases set data = replace(data::text, 'overbodig: Geotab registreert elke rit automatisch.', 'tools. Geotab registreerde elke rit al automatisch,')::jsonb
 where data::text like '%overbodig: Geotab registreert elke rit automatisch.%' escape '\';
update cms_cases set data = replace(data::text, 'overbodig: Geotab registreert elke rit automatisch. Maar', 'tools. Geotab registreerde elke rit al automatisch, maar')::jsonb
 where data::text like '%overbodig: Geotab registreert elke rit automatisch. Maar%' escape '\';
update cms_cases set data = replace(data::text, 'een compliant rittenrapport dat een chauffeur zelf beheert', 'een compliant rittenrapport dat een chauffeur zelf kan beheren')::jsonb
 where data::text like '%een compliant rittenrapport dat een chauffeur zelf beheert%' escape '\';
update cms_cases set data = replace(data::text, 'compliant rittenrapport dat een chauffeur zelf beheert', 'liant rittenrapport dat een chauffeur zelf kan beheren,')::jsonb
 where data::text like '%compliant rittenrapport dat een chauffeur zelf beheert%' escape '\';
update cms_cases set data = replace(data::text, 'nog. Daarvoor moest Moove installaties eerst correct en gestandaardiseerd in MyGeotab verwerken.', 'nog.')::jsonb
 where data::text like '%nog. Daarvoor moest Moove installaties eerst correct en gestandaardiseerd in MyGeotab verwerken.%' escape '\';

-- ---------- cms_services (10) ----------
update cms_services set data = replace(data::text, 'aanpakken en willen weten of low-code voor hen werkt', 'aanpakken en willen weten of low-code voor hen werkt,')::jsonb
 where data::text like '%aanpakken en willen weten of low-code voor hen werkt%' escape '\';
update cms_services set data = replace(data::text, 'waarin een businessexpert en onze developer samen bouwen', 'waarin een businessexpert en onze developer samen bouwen,')::jsonb
 where data::text like '%waarin een businessexpert en onze developer samen bouwen%' escape '\';
update cms_services set data = replace(data::text, 'het eind draait er voor iedereen een werkende agent', 'het eind draait er voor iedereen een werkende agent,')::jsonb
 where data::text like '%het eind draait er voor iedereen een werkende agent%' escape '\';
update cms_services set data = replace(data::text, 'Duidelijkheid over wat wel en niet in een AI-tool mag', 'Duidelijkheid over wat wel en niet in een AI-tool mag,')::jsonb
 where data::text like '%Duidelijkheid over wat wel en niet in een AI-tool mag%' escape '\';
update cms_services set data = replace(data::text, 'met kansen, gerangschikt op waarde en haalbaarheid', 'met kansen, gerangschikt op waarde en haalbaarheid,')::jsonb
 where data::text like '%met kansen, gerangschikt op waarde en haalbaarheid%' escape '\';
update cms_services set data = replace(data::text, 'huis met een gedeeld doelbeeld en een route in stappen', 'huis met een gedeeld doelbeeld en een route in stappen,')::jsonb
 where data::text like '%huis met een gedeeld doelbeeld en een route in stappen%' escape '\';
update cms_services set data = replace(data::text, 'jullie eigen ritme en Scrum-proces, als teamlid en,', 'jullie eigen ritme en Scrum-proces, als teamlid en')::jsonb
 where data::text like '%jullie eigen ritme en Scrum-proces, als teamlid en,%' escape '\';
update cms_services set data = replace(data::text, 'en geautomatiseerde uitrol, met de checks erin en,', 'en geautomatiseerde uitrol, met de checks erin en')::jsonb
 where data::text like '%en geautomatiseerde uitrol, met de checks erin en,%' escape '\';
update cms_services set data = replace(data::text, 'dagblokken over Mendix, AI en de manier van werken eromheen', 'dagblokken over Mendix, AI en de manier van werken eromheen,')::jsonb
 where data::text like '%dagblokken over Mendix, AI en de manier van werken eromheen%' escape '\';
update cms_services set data = replace(data::text, 'organisaties die willen dat hun eigen mensen het overnemen', 'organisaties die willen dat hun eigen mensen het overnemen,')::jsonb
 where data::text like '%organisaties die willen dat hun eigen mensen het overnemen%' escape '\';

-- ---------- cms_paginas (9) ----------
update cms_paginas set data = replace(data::text, 'sectorkennis met Mendix, AI en strategie. Zo vertalen we', 'ndix en AI in één team, van eerste')::jsonb
 where data::text like '%sectorkennis met Mendix, AI en strategie. Zo vertalen we%' escape '\';
update cms_paginas set data = replace(data::text, 'Mendix, AI en strategie. Zo vertalen we jouw ambitie', 's, Mendix en AI in één team, van eerste sessie')::jsonb
 where data::text like '%Mendix, AI en strategie. Zo vertalen we jouw ambitie%' escape '\';
update cms_paginas set data = replace(data::text, 'AI en strategie. Zo vertalen we jouw ambitie naar oplossingen', ' Mendix en AI in één team, van eerste sessie tot werkende')::jsonb
 where data::text like '%AI en strategie. Zo vertalen we jouw ambitie naar oplossingen%' escape '\';
update cms_paginas set data = replace(data::text, 'strategie. Zo vertalen we jouw ambitie naar oplossingen die', 'endix en AI in één team, van eerste sessie tot')::jsonb
 where data::text like '%strategie. Zo vertalen we jouw ambitie naar oplossingen die%' escape '\';
update cms_paginas set data = replace(data::text, 'vertalen we jouw ambitie naar oplossingen die werken', 'ndix en AI in één team, van eerste sessie tot werkende software')::jsonb
 where data::text like '%vertalen we jouw ambitie naar oplossingen die werken%' escape '\';
update cms_paginas set data = replace(data::text, 'oplossingen die werken voor de mensen die ermee moeten', ' tot werkende software voor de mensen die ermee')::jsonb
 where data::text like '%oplossingen die werken voor de mensen die ermee moeten%' escape '\';
update cms_paginas set data = replace(data::text, 'fundering, dan hebben we daar afgebakende diensten voor', 'fundering, dan hebben we daar afgebakende diensten voor,')::jsonb
 where data::text like '%fundering, dan hebben we daar afgebakende diensten voor%' escape '\';
update cms_paginas set data = replace(data::text, 'Mendix-applicatie, aan AI in je processen, of aan allebei', 'Mendix-applicatie, aan AI in je processen, of aan allebei,')::jsonb
 where data::text like '%Mendix-applicatie, aan AI in je processen, of aan allebei%' escape '\';
update cms_paginas set data = replace(data::text, 'ligt er iets werkends waar je intern mee verder kunt', 'ligt er iets werkends waar je intern mee verder kunt,')::jsonb
 where data::text like '%ligt er iets werkends waar je intern mee verder kunt%' escape '\';

-- ---------- controle ----------
-- Verwacht: geen rijen. Dit zijn de drie zinnen waar de komma het duidelijkst
-- miste; staan ze er nog zonder, dan is er iets niet gelopen.
select 'diensten/heroLead' as waar from cms_paginas
 where slug = 'diensten' and data ->> 'heroLead' like '%diensten voor met een vaste scope%'
union all
select 'diensten/basisTekst' from cms_paginas
 where slug = 'diensten' and data ->> 'basisTekst' like '%aan allebei want%'
union all
select 'diensten/instapIntro' from cms_paginas
 where slug = 'diensten' and data ->> 'instapIntro' like '%verder kunt zonder%';
