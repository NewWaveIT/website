-- Tekstronde deel 1: em-streepjes en lijdende vorm uit de CMS-rijen.
--
-- De seed in lib/ is bijgewerkt, maar de admin is de waarheid: zolang deze
-- rijen de oude tekst dragen, zie je die op de site. Elke vervanging hieronder
-- is een letterlijke swap van precies het fragment dat in de code veranderde.
-- Heeft een redacteur die zin inmiddels zelf aangepast, dan raakt de update
-- niets; script 2 laat zien wat er dan overblijft.
--
-- Draai dit in de Supabase SQL Editor. Maak eerst een terugvalkopie:
--
--   create table if not exists _backup_tekstronde as
--   select 'cms_cases' as bron, id, data from cms_cases
--   union all select 'cms_sectoren', id, data from cms_sectoren
--   union all select 'cms_services', id, data from cms_services
--   union all select 'cms_paginas',  id, data from cms_paginas
--   union all select 'cms_proposities', id, data from cms_proposities;
--
-- De vervanging loopt over data::text en weer terug naar jsonb. Dat raakt ook
-- de geneste velden (secties, resultaten, faq) die een update per sleutel mist.
-- Geen enkel fragment bevat een dubbele quote, dus de JSON-escaping blijft heel.


-- ---------- cms_cases (15 vervangingen) ----------
update cms_cases set data = replace(data::text, 'Moove had een bestaand Mendix-platform. De uitdaging was niet het platform zelf, maar de ontbrekende schakels: een betrouwbare verwerking van voertuiginstallaties en een moderne manier om handmatige ritregistratie te vervangen. Installaties van voertuigen werden verwerkt via meerdere losse systemen — foutgevoelig, arbeidsintensief en moeilijk te auditen. Tegelijk deden chauffeurs ritregistratie zoals dat twintig jaar geleden ook ging: handmatig in een notitieboekje of via generieke tools. GPS maakt dat notitieboekje overbodig: Geotab registreert elke rit automatisch. Maar de stap van rijdata naar een compliant rittenrapport dat een chauffeur zelf beheert, ontbrak nog — en daarvoor moesten installaties eerst correct en gestandaardiseerd verwerkt zijn in MyGeotab.', 'Moove had een bestaand Mendix-platform. De uitdaging was niet het platform zelf, maar de ontbrekende schakels: een betrouwbare verwerking van voertuiginstallaties en een moderne manier om handmatige ritregistratie te vervangen. Moove verwerkte voertuiginstallaties via meerdere losse systemen: foutgevoelig, arbeidsintensief en moeilijk te auditen. Tegelijk deden chauffeurs ritregistratie zoals dat twintig jaar geleden ook ging: handmatig in een notitieboekje of via generieke tools. GPS maakt dat notitieboekje overbodig: Geotab registreert elke rit automatisch. Maar de stap van rijdata naar een compliant rittenrapport dat een chauffeur zelf beheert, ontbrak nog. Daarvoor moest Moove installaties eerst correct en gestandaardiseerd in MyGeotab verwerken.')::jsonb
 where data::text like '%Moove had een bestaand Mendix-platform. De uitdaging was niet het platform zelf, maar de ontbrekende schakels: een betrouwbare verwerking van voertuiginstallaties en een moderne manier om handmatige ritregistratie te vervangen. Installaties van voertuigen werden verwerkt via meerdere losse systemen — foutgevoelig, arbeidsintensief en moeilijk te auditen. Tegelijk deden chauffeurs ritregistratie zoals dat twintig jaar geleden ook ging: handmatig in een notitieboekje of via generieke tools. GPS maakt dat notitieboekje overbodig: Geotab registreert elke rit automatisch. Maar de stap van rijdata naar een compliant rittenrapport dat een chauffeur zelf beheert, ontbrak nog — en daarvoor moesten installaties eerst correct en gestandaardiseerd verwerkt zijn in MyGeotab.%' escape '\';
update cms_cases set data = replace(data::text, 'We begonnen niet met bouwen. We begonnen met begrijpen: een analyse van het bestaande Mendix-landschap en de gewenste applicaties. Op basis daarvan stelden we een roadmap op en bepaalden we samen met Moove welke prioriteiten als eerste gebouwd zouden worden. We brachten de bestaande structuur in kaart en formuleerden een gefaseerde aanpak — geen big-bang — voor applicaties die schaalbaar zijn en goed integreren met het bestaande platform. Daarbij stelden we governance op voor security, performance en datakwaliteit, zodat alle applicaties vanuit dezelfde standaarden worden gebouwd.', 'We begonnen niet met bouwen. We begonnen met begrijpen: een analyse van het bestaande Mendix-landschap en de gewenste applicaties. Op basis daarvan stelden we een roadmap op en kozen we samen met Moove wat we als eerste zouden bouwen. We brachten de bestaande structuur in kaart en formuleerden een gefaseerde aanpak, geen big-bang, voor applicaties die schaalbaar zijn en goed integreren met het bestaande platform. Daarbij stelden we governance op voor security, performance en datakwaliteit, zodat elk team vanuit dezelfde standaarden bouwt.')::jsonb
 where data::text like '%We begonnen niet met bouwen. We begonnen met begrijpen: een analyse van het bestaande Mendix-landschap en de gewenste applicaties. Op basis daarvan stelden we een roadmap op en bepaalden we samen met Moove welke prioriteiten als eerste gebouwd zouden worden. We brachten de bestaande structuur in kaart en formuleerden een gefaseerde aanpak — geen big-bang — voor applicaties die schaalbaar zijn en goed integreren met het bestaande platform. Daarbij stelden we governance op voor security, performance en datakwaliteit, zodat alle applicaties vanuit dezelfde standaarden worden gebouwd.%' escape '\';
update cms_cases set data = replace(data::text, 'Het bestaande Mendix-platform werd verder gestructureerd en uitgebreid met twee nieuwe applicaties die direct bruikbaar zijn in de dagelijkse operatie.', 'We structureerden het bestaande Mendix-platform verder en breidden het uit met twee applicaties die het team meteen in de dagelijkse operatie gebruikt.')::jsonb
 where data::text like '%Het bestaande Mendix-platform werd verder gestructureerd en uitgebreid met twee nieuwe applicaties die direct bruikbaar zijn in de dagelijkse operatie.%' escape '\';
update cms_cases set data = replace(data::text, 'Installaties van voertuigen — install, swap en de-install — werden verwerkt via meerdere losse systemen. Dit leidde tot tijdverlies, foutgevoelige koppelingen en extra druk op support en CSM, met een grote hoeveelheid handmatige handelingen. Compliance was lastig te borgen zonder centrale logging, en fouten in de koppeling van assets kwamen laat aan het licht — met extra correctiewerk voor het operations-team tot gevolg.', 'Install, swap en de-install liepen elk door hun eigen systeem. Dit leidde tot tijdverlies, foutgevoelige koppelingen en extra druk op support en CSM, met een grote hoeveelheid handmatige handelingen. Compliance was lastig te borgen zonder centrale logging, en fouten in de koppeling van assets kwamen laat aan het licht, waarna het operations-team ze moest rechtzetten.')::jsonb
 where data::text like '%Installaties van voertuigen — install, swap en de-install — werden verwerkt via meerdere losse systemen. Dit leidde tot tijdverlies, foutgevoelige koppelingen en extra druk op support en CSM, met een grote hoeveelheid handmatige handelingen. Compliance was lastig te borgen zonder centrale logging, en fouten in de koppeling van assets kwamen laat aan het licht — met extra correctiewerk voor het operations-team tot gevolg.%' escape '\';
update cms_cases set data = replace(data::text, 'We bouwden MooveInstaller: een centrale Mendix-applicatie die het volledige installatieproces van voertuigen digitaal en gestandaardiseerd verwerkt. Assets en installatielogs worden gekoppeld op basis van VIN of serienummer, data wordt opgehaald uit MyGeotab en GeoTabMyAdmin, en elke installatie wordt gevalideerd via centrale bedrijfsregels vóór synchronisatie', 'We bouwden MooveInstaller: een centrale Mendix-applicatie die het volledige installatieproces van voertuigen digitaal en gestandaardiseerd verwerkt. De applicatie koppelt assets en installatielogs op VIN of serienummer, haalt data op uit MyGeotab en GeoTabMyAdmin, en toetst elke installatie aan centrale bedrijfsregels vóór ze synchroniseert')::jsonb
 where data::text like '%We bouwden MooveInstaller: een centrale Mendix-applicatie die het volledige installatieproces van voertuigen digitaal en gestandaardiseerd verwerkt. Assets en installatielogs worden gekoppeld op basis van VIN of serienummer, data wordt opgehaald uit MyGeotab en GeoTabMyAdmin, en elke installatie wordt gevalideerd via centrale bedrijfsregels vóór synchronisatie%' escape '\';
update cms_cases set data = replace(data::text, 'Elke installatie, swap of de-installatie wordt centraal gelogd.', 'De applicatie logt elke installatie, swap en de-installatie centraal.')::jsonb
 where data::text like '%Elke installatie, swap of de-installatie wordt centraal gelogd.%' escape '\';
update cms_cases set data = replace(data::text, 'Rittenregistratie voor zakelijke en fiscale doeleinden is een verplichting voor veel chauffeurs. Maar de traditionele manier — handmatig in een notitieboekje of via generieke tools — kost tijd, leidt tot fouten en is moeilijk te controleren.', 'Rittenregistratie voor zakelijke en fiscale doeleinden is een verplichting voor veel chauffeurs. Maar de traditionele manier kost tijd, leidt tot fouten en is moeilijk te controleren: handmatig in een notitieboekje of via generieke tools.')::jsonb
 where data::text like '%Rittenregistratie voor zakelijke en fiscale doeleinden is een verplichting voor veel chauffeurs. Maar de traditionele manier — handmatig in een notitieboekje of via generieke tools — kost tijd, leidt tot fouten en is moeilijk te controleren.%' escape '\';
update cms_cases set data = replace(data::text, 'We bouwden MooveTrips: een driver-gerichte Progressive Web App die Geotab-data omzet naar een compleet, eenvoudig te bedienen ritregistratiesysteem. Waar een chauffeur vroeger alles handmatig bijhield, logt Geotab nu automatisch elke rit. De chauffeur opent MooveTrips, ziet zijn ritten en geeft per rit aan of het een zakelijke of privérit was — meer heeft hij niet nodig.', 'We bouwden MooveTrips: een driver-gerichte Progressive Web App die Geotab-data omzet naar een compleet, eenvoudig te bedienen ritregistratiesysteem. Waar een chauffeur vroeger alles handmatig bijhield, logt Geotab nu automatisch elke rit. De chauffeur opent MooveTrips, ziet zijn ritten en geeft per rit aan of het zakelijk of privé was. Meer hoeft hij niet te doen.')::jsonb
 where data::text like '%We bouwden MooveTrips: een driver-gerichte Progressive Web App die Geotab-data omzet naar een compleet, eenvoudig te bedienen ritregistratiesysteem. Waar een chauffeur vroeger alles handmatig bijhield, logt Geotab nu automatisch elke rit. De chauffeur opent MooveTrips, ziet zijn ritten en geeft per rit aan of het een zakelijke of privérit was — meer heeft hij niet nodig.%' escape '\';
update cms_cases set data = replace(data::text, 'Doordat de app actief pushmeldingen stuurt en ritten automatisch inlaadt, worden ritten sneller en vaker correct gecategoriseerd.', 'De app laadt ritten automatisch in en stuurt een pushmelding zodra er nog iets openstaat. Chauffeurs categoriseren daardoor sneller en vaker correct.')::jsonb
 where data::text like '%Doordat de app actief pushmeldingen stuurt en ritten automatisch inlaadt, worden ritten sneller en vaker correct gecategoriseerd.%' escape '\';
update cms_cases set data = replace(data::text, 'PDF- en Excel-rapporten worden automatisch gegenereerd.', 'MooveTrips genereert de PDF- en Excel-rapporten zelf.')::jsonb
 where data::text like '%PDF- en Excel-rapporten worden automatisch gegenereerd.%' escape '\';
update cms_cases set data = replace(data::text, 'MooveInstaller en MooveTrips zijn geen losstaande projecten, maar twee schakels in dezelfde keten: installaties van voertuigen worden correct en gestandaardiseerd verwerkt via MooveInstaller, en de data die daardoor beschikbaar komt wordt via MooveTrips bruikbaar gemaakt', 'MooveInstaller en MooveTrips zijn geen losstaande projecten, maar twee schakels in dezelfde keten: MooveInstaller verwerkt voertuiginstallaties correct en gestandaardiseerd, en MooveTrips maakt de data die daaruit komt bruikbaar')::jsonb
 where data::text like '%MooveInstaller en MooveTrips zijn geen losstaande projecten, maar twee schakels in dezelfde keten: installaties van voertuigen worden correct en gestandaardiseerd verwerkt via MooveInstaller, en de data die daardoor beschikbaar komt wordt via MooveTrips bruikbaar gemaakt%' escape '\';
update cms_cases set data = replace(data::text, 'Het operations-team verwerkt installaties zonder correctiewerk achteraf. Elke install, swap of de-installatie is direct gelogd, gevalideerd en synchroon met', 'Het operations-team verwerkt installaties zonder correctiewerk achteraf. Elke install, swap en de-installatie staat meteen gelogd, gevalideerd en synchroon in')::jsonb
 where data::text like '%Het operations-team verwerkt installaties zonder correctiewerk achteraf. Elke install, swap of de-installatie is direct gelogd, gevalideerd en synchroon met%' escape '\';
update cms_cases set data = replace(data::text, 'Ritten worden automatisch ingeladen vanuit Geotab.', 'Geotab laadt de ritten zelf in.')::jsonb
 where data::text like '%Ritten worden automatisch ingeladen vanuit Geotab.%' escape '\';
update cms_cases set data = replace(data::text, 'Fouten worden voorkomen vóór ze het systeem in', 'MooveInstaller vangt fouten af vóór ze het systeem in')::jsonb
 where data::text like '%Fouten worden voorkomen vóór ze het systeem in%' escape '\';
update cms_cases set data = replace(data::text, 'Beide apps zijn gebouwd om mee te groeien. Nieuwe', 'We bouwden beide apps om mee te groeien. Nieuwe')::jsonb
 where data::text like '%Beide apps zijn gebouwd om mee te groeien. Nieuwe%' escape '\';

-- ---------- cms_sectoren (12 vervangingen) ----------
update cms_sectoren set data = replace(data::text, 'Software voor mobiliteit en logistiek —', 'Software voor mobiliteit en logistiek:')::jsonb
 where data::text like '%Software voor mobiliteit en logistiek —%' escape '\';
update cms_sectoren set data = replace(data::text, 'We laten het landen bij technici, planners en klantcontact. Daar wordt het verschil gemaakt.', 'We laten het landen bij technici, planners en klantcontact. Daar maken zij het verschil.')::jsonb
 where data::text like '%We laten het landen bij technici, planners en klantcontact. Daar wordt het verschil gemaakt.%' escape '\';
update cms_sectoren set data = replace(data::text, 'Software voor de publieke sector —', 'Software voor de publieke sector:')::jsonb
 where data::text like '%Software voor de publieke sector —%' escape '\';
update cms_sectoren set data = replace(data::text, 'Software voor de zorg — minder administratie', 'Software voor de zorg: minder administratie')::jsonb
 where data::text like '%Software voor de zorg — minder administratie%' escape '\';
update cms_sectoren set data = replace(data::text, '“Roosters en capaciteit worden nog in Excel gelegd', '“Roosters en capaciteit houden we nog in Excel bij')::jsonb
 where data::text like '%“Roosters en capaciteit worden nog in Excel gelegd%' escape '\';
update cms_sectoren set data = replace(data::text, 'Software voor manufacturing — planning', 'Software voor manufacturing: planning')::jsonb
 where data::text like '%Software voor manufacturing — planning%' escape '\';
update cms_sectoren set data = replace(data::text, 'Je machines produceren al data en je ERP staat er al. Wij bouwen planning, kwaliteit en shopfloor daar bovenop — live', 'Je machines produceren al data en je ERP staat er al. Wij bouwen planning, kwaliteit en shopfloor daar bovenop. Live')::jsonb
 where data::text like '%Je machines produceren al data en je ERP staat er al. Wij bouwen planning, kwaliteit en shopfloor daar bovenop — live%' escape '\';
update cms_sectoren set data = replace(data::text, '“Kwaliteitsdata zit in MES, LIMS en Excel — nergens', '“Kwaliteitsdata zit in MES, LIMS en Excel, nergens')::jsonb
 where data::text like '%“Kwaliteitsdata zit in MES, LIMS en Excel — nergens%' escape '\';
update cms_sectoren set data = replace(data::text, 'vloer liggen; besluiten worden op ervaring genomen', 'vloer liggen; de vloer beslist op ervaring')::jsonb
 where data::text like '%vloer liggen; besluiten worden op ervaring genomen%' escape '\';
update cms_sectoren set data = replace(data::text, 'Quality apps met integraties naar MES, LIMS en PLM —', 'Quality apps met integraties naar MES, LIMS en PLM:')::jsonb
 where data::text like '%Quality apps met integraties naar MES, LIMS en PLM —%' escape '\';
update cms_sectoren set data = replace(data::text, 'AI wordt her en der gebruikt bij bouwen', 'Teams gebruiken AI her en der bij bouwen')::jsonb
 where data::text like '%AI wordt her en der gebruikt bij bouwen%' escape '\';
update cms_sectoren set data = replace(data::text, 'Strategie, Start, Structure, Scale —', 'Strategie, Start, Structure, Scale')::jsonb
 where data::text like '%Strategie, Start, Structure, Scale —%' escape '\';

-- ---------- cms_services (44 vervangingen) ----------
update cms_services set data = replace(data::text, 'Je proces is standaard en je zoekt standaardsoftware — dan', 'Je proces is standaard en je zoekt standaardsoftware. Dan')::jsonb
 where data::text like '%Je proces is standaard en je zoekt standaardsoftware — dan%' escape '\';
update cms_services set data = replace(data::text, 'Je zoekt één AI-tool om aan te schaffen — wij', 'Je zoekt één AI-tool om aan te schaffen. Wij')::jsonb
 where data::text like '%Je zoekt één AI-tool om aan te schaffen — wij%' escape '\';
update cms_services set data = replace(data::text, 'De eindverantwoordelijke zit zelf aan tafel —', 'De eindverantwoordelijke zit zelf aan tafel:')::jsonb
 where data::text like '%De eindverantwoordelijke zit zelf aan tafel —%' escape '\';
update cms_services set data = replace(data::text, 'Je wilt volgende week bouwen — begin dan bij App', 'Je wilt volgende week bouwen. Begin dan bij App')::jsonb
 where data::text like '%Je wilt volgende week bouwen — begin dan bij App%' escape '\';
update cms_services set data = replace(data::text, 'op je eigen data. Geen mockup, geen rapport —', 'op je eigen data. Geen mockup, geen rapport, maar')::jsonb
 where data::text like '%op je eigen data. Geen mockup, geen rapport —%' escape '\';
update cms_services set data = replace(data::text, 'App in a Day is bedoeld voor teams die één concreet proces willen aanpakken en willen weten of low-code voor hen werkt —', 'App in a Day is er voor teams die één concreet proces willen aanpakken en willen weten of low-code voor hen werkt')::jsonb
 where data::text like '%App in a Day is bedoeld voor teams die één concreet proces willen aanpakken en willen weten of low-code voor hen werkt —%' escape '\';
update cms_services set data = replace(data::text, 'Live in een acceptatieomgeving, met echte gebruikers erin — geen', 'Live in een acceptatieomgeving, met echte gebruikers erin. Geen')::jsonb
 where data::text like '%Live in een acceptatieomgeving, met echte gebruikers erin — geen%' escape '\';
update cms_services set data = replace(data::text, 'Eén proces dat pijn doet en in een dag te vatten is —', 'Eén proces dat pijn doet en in een dag te vatten is;')::jsonb
 where data::text like '%Eén proces dat pijn doet en in een dag te vatten is —%' escape '\';
update cms_services set data = replace(data::text, 'Vier weken waarin een businessexpert en onze developer samen bouwen —', 'Vier weken waarin een businessexpert en onze developer samen bouwen')::jsonb
 where data::text like '%Vier weken waarin een businessexpert en onze developer samen bouwen —%' escape '\';
update cms_services set data = replace(data::text, 'Geen presentatie over de mogelijkheden, maar een dag waarin je team het zelf doet. Iedereen brengt één echte taak uit het eigen werk mee. Aan het eind van de dag heeft ieder teamlid daar een werkende agent voor gebouwd — en begrijpt', 'Geen presentatie over de mogelijkheden, maar een dag waarin je team het zelf doet. Iedereen brengt één echte taak uit het eigen werk mee. Aan het eind van de dag heeft ieder teamlid daar een werkende agent voor gebouwd, en weet')::jsonb
 where data::text like '%Geen presentatie over de mogelijkheden, maar een dag waarin je team het zelf doet. Iedereen brengt één echte taak uit het eigen werk mee. Aan het eind van de dag heeft ieder teamlid daar een werkende agent voor gebouwd — en begrijpt%' escape '\';
update cms_services set data = replace(data::text, 'eind draait er voor iedereen een werkende agent —', 'eind draait er voor iedereen een werkende agent')::jsonb
 where data::text like '%eind draait er voor iedereen een werkende agent —%' escape '\';
update cms_services set data = replace(data::text, 'We laten ook zien waar het misgaat — hallucinaties', 'We laten ook zien waar het misgaat: hallucinaties')::jsonb
 where data::text like '%We laten ook zien waar het misgaat — hallucinaties%' escape '\';
update cms_services set data = replace(data::text, 'Duidelijkheid over wat wel en niet in een AI-tool mag —', 'Duidelijkheid over wat wel en niet in een AI-tool mag')::jsonb
 where data::text like '%Duidelijkheid over wat wel en niet in een AI-tool mag —%' escape '\';
update cms_services set data = replace(data::text, 'Waar levert AI bij jullie echt geld op —', 'Waar levert AI bij jullie echt geld op')::jsonb
 where data::text like '%Waar levert AI bij jullie echt geld op —%' escape '\';
update cms_services set data = replace(data::text, 'Ja — dan is App in a Day waarschijnlijk het betere', 'Ja. Dan is App in a Day waarschijnlijk het betere')::jsonb
 where data::text like '%Ja — dan is App in a Day waarschijnlijk het betere%' escape '\';
update cms_services set data = replace(data::text, 'Weten waar AI bij jullie écht iets oplevert —', 'Weten waar AI bij jullie écht iets oplevert')::jsonb
 where data::text like '%Weten waar AI bij jullie écht iets oplevert —%' escape '\';
update cms_services set data = replace(data::text, 'kansen, gerangschikt op waarde en haalbaarheid —', 'kansen, gerangschikt op waarde en haalbaarheid')::jsonb
 where data::text like '%kansen, gerangschikt op waarde en haalbaarheid —%' escape '\';
update cms_services set data = replace(data::text, 'Uren, doorlooptijd of fouten — wat de', 'Uren, doorlooptijd of fouten: wat de')::jsonb
 where data::text like '%Uren, doorlooptijd of fouten — wat de%' escape '\';
update cms_services set data = replace(data::text, 'zitten, waar ontstaan fouten, waar wordt gewacht.', 'zitten, waar ontstaan fouten, waar staat iemand te wachten.')::jsonb
 where data::text like '%zitten, waar ontstaan fouten, waar wordt gewacht.%' escape '\';
update cms_services set data = replace(data::text, 'Breed en zonder filter — eerst verzamelen', 'Breed en zonder filter: eerst verzamelen')::jsonb
 where data::text like '%Breed en zonder filter — eerst verzamelen%' escape '\';
update cms_services set data = replace(data::text, 'Openheid over wat er nu misgaat — daar zitten', 'Openheid over wat er nu misgaat; daar zitten')::jsonb
 where data::text like '%Openheid over wat er nu misgaat — daar zitten%' escape '\';
update cms_services set data = replace(data::text, 'Iedereen praat over AI. De vraag voor de directie is een andere: waar verandert het ons verdienmodel, en waar is het alleen een efficiëntieslag? In een dagdeel of een dag brengen we uw positie in kaart met een strategisch kader dat verder gaat dan de gebruikelijke lijstjes met toepassingen. We kijken naar waar uw onderscheidende capaciteit zit, wat commodity wordt, en wat dat betekent voor uw mensen. U eindigt met vastgestelde prioriteiten — inclusief een lijst van wat u', 'Iedereen praat over AI. De vraag voor de directie is een andere: waar verandert het ons verdienmodel, en waar is het alleen een efficiëntieslag? In een dagdeel of een dag brengen we je positie in kaart met een strategisch kader dat verder gaat dan de gebruikelijke lijstjes met toepassingen. We kijken waar je onderscheidende capaciteit zit, wat commodity wordt, en wat dat betekent voor je mensen. Je eindigt met vastgestelde prioriteiten, inclusief een lijst van wat je')::jsonb
 where data::text like '%Iedereen praat over AI. De vraag voor de directie is een andere: waar verandert het ons verdienmodel, en waar is het alleen een efficiëntieslag? In een dagdeel of een dag brengen we uw positie in kaart met een strategisch kader dat verder gaat dan de gebruikelijke lijstjes met toepassingen. We kijken naar waar uw onderscheidende capaciteit zit, wat commodity wordt, en wat dat betekent voor uw mensen. U eindigt met vastgestelde prioriteiten — inclusief een lijst van wat u%' escape '\';
update cms_services set data = replace(data::text, 'Directie en MT — werkt alleen goed', 'Directie en MT. Werkt alleen goed')::jsonb
 where data::text like '%Directie en MT — werkt alleen goed%' escape '\';
update cms_services set data = replace(data::text, 'De mensen die over strategie en budget gaan —', 'De mensen die over strategie en budget gaan:')::jsonb
 where data::text like '%De mensen die over strategie en budget gaan —%' escape '\';
update cms_services set data = replace(data::text, 'Low-code groeit bij jullie harder dan de inrichting eromheen. Er komen apps bij, teams bij en vragen bij — en de architectuur, governance en het deliverymodel zijn niet meegegroeid.', 'Low-code groeit bij jullie harder dan de inrichting eromheen. Er komen apps bij, teams bij en vragen bij, maar de architectuur, governance en het deliverymodel groeiden niet mee.')::jsonb
 where data::text like '%Low-code groeit bij jullie harder dan de inrichting eromheen. Er komen apps bij, teams bij en vragen bij — en de architectuur, governance en het deliverymodel zijn niet meegegroeid.%' escape '\';
update cms_services set data = replace(data::text, 'Waar zet je low-code en AI in — en waar', 'Waar zet je low-code en AI in, en waar')::jsonb
 where data::text like '%Waar zet je low-code en AI in — en waar%' escape '\';
update cms_services set data = replace(data::text, 'We hebben low-code, maar het is nooit een keuze geweest — het', 'We hebben low-code, maar we kozen er nooit voor. Het')::jsonb
 where data::text like '%We hebben low-code, maar het is nooit een keuze geweest — het%' escape '\';
update cms_services set data = replace(data::text, 'Applicaties, koppelingen, kosten en eigenaarschap —', 'Applicaties, koppelingen, kosten en eigenaarschap')::jsonb
 where data::text like '%Applicaties, koppelingen, kosten en eigenaarschap —%' escape '\';
update cms_services set data = replace(data::text, 'Aan MT of board, door ons of door jou —', 'Aan MT of board, door ons of door jou:')::jsonb
 where data::text like '%Aan MT of board, door ons of door jou —%' escape '\';
update cms_services set data = replace(data::text, 'Openheid over wat er nu niet werkt — ook als dat', 'Openheid over wat er nu niet werkt, ook als dat')::jsonb
 where data::text like '%Openheid over wat er nu niet werkt — ook als dat%' escape '\';
update cms_services set data = replace(data::text, 'Deels: we kennen low-code goed. Daarom staat in elk advies expliciet waar low-code níet het antwoord is — dat', 'Deels: we kennen low-code goed. Daarom staat in elk advies expliciet waar low-code níet het antwoord is. Dat')::jsonb
 where data::text like '%Deels: we kennen low-code goed. Daarom staat in elk advies expliciet waar low-code níet het antwoord is — dat%' escape '\';
update cms_services set data = replace(data::text, 'Ja, maar dat is geen voorwaarde. Het plan is zo geschreven', 'Ja, maar dat is geen voorwaarde. We schrijven het plan zo')::jsonb
 where data::text like '%Ja, maar dat is geen voorwaarde. Het plan is zo geschreven%' escape '\';
update cms_services set data = replace(data::text, 'Jullie Mendix-landschap groeit harder dan de inrichting eromheen. Er komen apps bij, teams bij en vragen bij — en de architectuur, het deliverymodel en de governance zijn niet meegegroeid. In één dag brengen we met jullie team in kaart waar jullie staan op de drie lagen waarop organisaties volwassen worden: waar levert het platform waarde, hoe zijn de teams georganiseerd, en welke technische fundering maakt opschalen mogelijk. Je gaat naar huis met een gedeeld doelbeeld en een route in stappen —', 'Jullie Mendix-landschap groeit harder dan de inrichting eromheen. Er komen apps bij, teams bij en vragen bij, maar de architectuur, het deliverymodel en de governance groeiden niet mee. In één dag brengen we met jullie team in kaart waar jullie staan op de drie lagen waarop organisaties volwassen worden: waar levert het platform waarde, hoe organiseren jullie de teams, en welke technische fundering maakt opschalen mogelijk. Je gaat naar huis met een gedeeld doelbeeld en een route in stappen')::jsonb
 where data::text like '%Jullie Mendix-landschap groeit harder dan de inrichting eromheen. Er komen apps bij, teams bij en vragen bij — en de architectuur, het deliverymodel en de governance zijn niet meegegroeid. In één dag brengen we met jullie team in kaart waar jullie staan op de drie lagen waarop organisaties volwassen worden: waar levert het platform waarde, hoe zijn de teams georganiseerd, en welke technische fundering maakt opschalen mogelijk. Je gaat naar huis met een gedeeld doelbeeld en een route in stappen —%' escape '\';
update cms_services set data = replace(data::text, 'De mensen die over budget, platform en teams gaan —', 'De mensen die over budget, platform en teams gaan:')::jsonb
 where data::text like '%De mensen die over budget, platform en teams gaan —%' escape '\';
update cms_services set data = replace(data::text, 'Soms is er geen vraagstuk om te onderzoeken, maar werk dat gedaan moet worden. Dan lever je capaciteit. Onze consultants zijn Mendix Advanced of Expert gecertificeerd en draaien mee in jullie eigen ritme en Scrum-proces — als teamlid', 'Soms is er geen vraagstuk om te onderzoeken, maar werk dat gedaan moet worden. Dan lever je capaciteit. Onze consultants zijn Mendix Advanced of Expert gecertificeerd en draaien mee in jullie eigen ritme en Scrum-proces, als teamlid en')::jsonb
 where data::text like '%Soms is er geen vraagstuk om te onderzoeken, maar werk dat gedaan moet worden. Dan lever je capaciteit. Onze consultants zijn Mendix Advanced of Expert gecertificeerd en draaien mee in jullie eigen ritme en Scrum-proces — als teamlid%' escape '\';
update cms_services set data = replace(data::text, 'Koppelingen, security, deploymentstraat en herbruikbare componenten: de laag onder je applicatielandschap die je normaal per app opnieuw bouwt. Wij zetten hem één keer goed neer, aan de hand van een echte applicatie zodat alles in de praktijk bewezen is. Daarna landt elke volgende app erop —', 'Koppelingen, security, deploymentstraat en herbruikbare componenten: de laag onder je applicatielandschap die je normaal per app opnieuw bouwt. Wij zetten hem één keer goed neer, aan de hand van een echte applicatie zodat alles in de praktijk bewezen is. Daarna landt elke volgende app erop:')::jsonb
 where data::text like '%Koppelingen, security, deploymentstraat en herbruikbare componenten: de laag onder je applicatielandschap die je normaal per app opnieuw bouwt. Wij zetten hem één keer goed neer, aan de hand van een echte applicatie zodat alles in de praktijk bewezen is. Daarna landt elke volgende app erop —%' escape '\';
update cms_services set data = replace(data::text, 'Omgevingen, versiebeheer en geautomatiseerde uitrol — met de checks erin', 'Omgevingen, versiebeheer en geautomatiseerde uitrol, met de checks erin en')::jsonb
 where data::text like '%Omgevingen, versiebeheer en geautomatiseerde uitrol — met de checks erin%' escape '\';
update cms_services set data = replace(data::text, 'Vaak wel, technisch. Wat meestal ontbreekt is de tijd en het overzicht om het naast de lopende bouw te doen — daar', 'Vaak wel, technisch. Wat meestal ontbreekt is de tijd en het overzicht om het naast de lopende bouw te doen. Daar')::jsonb
 where data::text like '%Vaak wel, technisch. Wat meestal ontbreekt is de tijd en het overzicht om het naast de lopende bouw te doen — daar%' escape '\';
update cms_services set data = replace(data::text, 'Organisaties die willen dat business en IT samen ontwikkelen —', 'Organisaties die willen dat business en IT samen ontwikkelen;')::jsonb
 where data::text like '%Organisaties die willen dat business en IT samen ontwikkelen —%' escape '\';
update cms_services set data = replace(data::text, 'Hoe je wijzigingen doorvoert, test en uitrolt —', 'Hoe je wijzigingen doorvoert, test en uitrolt:')::jsonb
 where data::text like '%Hoe je wijzigingen doorvoert, test en uitrolt —%' escape '\';
update cms_services set data = replace(data::text, 'Eén businessexpert die minimaal drie dagen per week vrij is —', 'Eén businessexpert die minimaal drie dagen per week vrij is;')::jsonb
 where data::text like '%Eén businessexpert die minimaal drie dagen per week vrij is —%' escape '\';
update cms_services set data = replace(data::text, 'Dat merken we in week één en dan zeggen we het meteen. Soms is de conclusie dat een andere collega beter past — wisselen', 'Dat merken we in week één en dan zeggen we het meteen. Soms is de conclusie dat een andere collega beter past. Wisselen')::jsonb
 where data::text like '%Dat merken we in week één en dan zeggen we het meteen. Soms is de conclusie dat een andere collega beter past — wisselen%' escape '\';
update cms_services set data = replace(data::text, 'Mendix, AI en de manier van werken eromheen —', 'Mendix, AI en de manier van werken eromheen')::jsonb
 where data::text like '%Mendix, AI en de manier van werken eromheen —%' escape '\';
update cms_services set data = replace(data::text, 'Voor organisaties die willen dat hun eigen mensen het overnemen —', 'Voor organisaties die willen dat hun eigen mensen het overnemen')::jsonb
 where data::text like '%Voor organisaties die willen dat hun eigen mensen het overnemen —%' escape '\';

-- ---------- cms_paginas (9 vervangingen) ----------
update cms_paginas set data = replace(data::text, 'The New Wave IT is opgericht vanuit één overtuiging:', 'We richtten The New Wave IT op vanuit één overtuiging:')::jsonb
 where data::text like '%The New Wave IT is opgericht vanuit één overtuiging:%' escape '\';
update cms_paginas set data = replace(data::text, 'Onze basis is capaciteit: consultants die in jouw team meebouwen aan Mendix en AI. Wil je eerst richting, snelheid of een fundering, dan hebben we daar afgebakende diensten voor —', 'Onze basis is capaciteit: consultants die in jouw team meebouwen aan Mendix en AI. Wil je eerst richting, snelheid of een fundering, dan hebben we daar afgebakende diensten voor')::jsonb
 where data::text like '%Onze basis is capaciteit: consultants die in jouw team meebouwen aan Mendix en AI. Wil je eerst richting, snelheid of een fundering, dan hebben we daar afgebakende diensten voor —%' escape '\';
update cms_paginas set data = replace(data::text, 'Waar de meeste van onze samenwerkingen beginnen en eindigen: een consultant die naast je team komt staan en meebouwt. Aan een Mendix-applicatie, aan AI in je processen, of aan allebei —', 'Waar de meeste van onze samenwerkingen beginnen en eindigen: een consultant die naast je team komt staan en meebouwt. Aan een Mendix-applicatie, aan AI in je processen, of aan allebei')::jsonb
 where data::text like '%Waar de meeste van onze samenwerkingen beginnen en eindigen: een consultant die naast je team komt staan en meebouwt. Aan een Mendix-applicatie, aan AI in je processen, of aan allebei —%' escape '\';
update cms_paginas set data = replace(data::text, 'Wil je liever eerst zien wat het oplevert voordat je mensen inhuurt? Dan starten we met een dag. Aan het eind ligt er iets werkends waar je intern mee verder kunt —', 'Wil je liever eerst zien wat het oplevert voordat je mensen inhuurt? Dan starten we met een dag. Aan het eind ligt er iets werkends waar je intern mee verder kunt')::jsonb
 where data::text like '%Wil je liever eerst zien wat het oplevert voordat je mensen inhuurt? Dan starten we met een dag. Aan het eind ligt er iets werkends waar je intern mee verder kunt —%' escape '\';
update cms_paginas set data = replace(data::text, 'Niet nodig om nu te kiezen — ze komen meestal', 'Niet nodig om nu te kiezen: ze komen meestal')::jsonb
 where data::text like '%Niet nodig om nu te kiezen — ze komen meestal%' escape '\';
update cms_paginas set data = replace(data::text, 'Mendix — van App in a Day tot Fusion', 'Mendix: van App in a Day tot Fusion')::jsonb
 where data::text like '%Mendix — van App in a Day tot Fusion%' escape '\';
update cms_paginas set data = replace(data::text, 'AI — van AI Agent in a Day tot de', 'AI: van AI Agent in a Day tot de')::jsonb
 where data::text like '%AI — van AI Agent in a Day tot de%' escape '\';
update cms_paginas set data = replace(data::text, 'Strategie — van AI-strategie tot IT-strategie', 'Strategie: van AI-strategie tot IT-strategie')::jsonb
 where data::text like '%Strategie — van AI-strategie tot IT-strategie%' escape '\';
update cms_paginas set data = replace(data::text, 'Begin met een korte, vrijblijvende kennismaking van twintig minuten — geen', 'Begin met een korte, vrijblijvende kennismaking van twintig minuten. Geen')::jsonb
 where data::text like '%Begin met een korte, vrijblijvende kennismaking van twintig minuten — geen%' escape '\';

-- ---------- cms_proposities (1 vervangingen) ----------
update cms_proposities set data = replace(data::text, 'Maak je IT-landschap binnen 8 weken wendbaar —', 'Maak je IT-landschap binnen 8 weken wendbaar')::jsonb
 where data::text like '%Maak je IT-landschap binnen 8 weken wendbaar —%' escape '\';
