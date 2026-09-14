-- Waar loopt het CMS uit de pas met de seed?
--
-- De seed in lib/ is de koude start, de admin is de waarheid: ze mogen
-- verschillen. Maar het is twee keer gebeurd dat een tekst in de code al was
-- gecorrigeerd terwijl de rij was achtergebleven, en dat ziet niemand -- de
-- e2e draait tegen de seed, omdat CI Supabase niet bereikt. Alles wat alleen in
-- de database afwijkt blijft onzichtbaar tot iemand de live site leest.
--
-- Dit script wijzigt niets. Per afwijkend veld toont het het eerste blok van
-- 200 tekens waarin de twee uit elkaar lopen, uit beide versies. Zo blijft ook
-- een verschil ver in een lange tekst (de privacyverklaring is 9 kB) zichtbaar,
-- zonder dat je de hele tekst hoeft te lezen.
--
-- De seedwaarden staan hieronder letterlijk, uit PAGE_DEFAULTS
-- (lib/cms/pages.ts) op het moment van genereren. Wijzigt de seed, dan hoort
-- dit script opnieuw gegenereerd te worden.

with seed(slug, veld, tekst) as (values
    ('home', 'heroTitleStart', 'Wij maken van business en IT '),
    ('home', 'heroAccent', 'één beweging'),
    ('home', 'heroLead', 'The New Wave IT combineert diepgaande sectorkennis met Mendix, AI en strategie. Zo vertalen we jouw ambitie naar oplossingen die werken voor de mensen die ermee moeten werken.'),
    ('home', 'ctaTitel', 'Klaar om samen te bouwen aan meetbare groei?'),
    ('home', 'ctaKnop', 'Plan een gesprek'),
    ('home', 'mensenKicker', 'De mens centraal'),
    ('home', 'mensenTitel', 'Je werkt met mensen, niet met een leverancier.'),
    ('home', 'mensenP1', 'Geen anonieme delivery-machine: bij ons ken je de mensen die jouw vraagstuk oplossen. Gepassioneerde consultants en engineers die naast je team staan, van eerste sessie tot livegang en daarna. Van wekelijkse Wavetime-sessies tot onze jaarlijkse Company week, we investeren structureel in hoe we sámen werken, niet alleen in wat we opleveren.'),
    ('home', 'mensenP2', 'Ons doel? Dat jouw mensen er beter van worden. Technologie is het middel, de mens is de maat.'),
    ('over-ons', 'heroTitleStart', 'De ondernemende mens zorgt voor '),
    ('over-ons', 'heroAccent', 'vooruitgang'),
    ('over-ons', 'heroLead', 'Wij geloven dat succesvolle verandering begint bij mensen. Daarom verzorgen wij alle randvoorwaarden voor onze Wavers, en helpen zij onze partners maximaal digitaal versnellen. Zo staat jouw organisatie klaar voor de dag van overmorgen.'),
    ('over-ons', 'missieTitel', 'Maximale digitale impact, met de mens als maat.'),
    ('over-ons', 'missieP1', 'We richtten The New Wave IT op vanuit één overtuiging: technologie is het middel, de mens is de maat. Wij zijn geen anonieme delivery-machine. Je werkt met mensen die je vraagstuk écht doorgronden, van de eerste sessie tot livegang en daarna.'),
    ('over-ons', 'missieP2', 'Dat doen we door op elk project de mensen te kiezen van wie de ervaring, skills en ambitie het beste passen bij jouw vraagstuk. Ons doel? Dat elk mens werk doet dat aansluit bij zijn of haar persoonlijke doelen en drijfveren.'),
    ('over-ons', 'teamTitel', 'Ontmoet de Wavers.'),
    ('over-ons', 'teamP1', 'Geen anonieme delivery-machine: je kent de mensen die jouw vraagstuk oplossen. Senior consultants en engineers die de taal van de boardroom én de werkvloer spreken, betrokken als partner.'),
    ('over-ons', 'teamP2', 'Van strategische sessies tot livegang en beheer: hetzelfde team blijft aan boord. Zo houden we vaart, kwaliteit en verantwoordelijkheid bij elkaar. Wekelijkse Wavetime-sessies en een jaarlijkse Company week: structurele investering in hoe we sámen werken.'),
    ('over-ons', 'ctaTitel', 'Benieuwd wat onze mensen voor jouw doelen kunnen betekenen?'),
    ('over-ons', 'waardenKicker', 'Waar wij voor staan'),
    ('over-ons', 'waardenTitel', 'Vier overtuigingen die je terugziet in ons werk'),
    ('over-ons', 'waarde1Titel', 'Mens centraal'),
    ('over-ons', 'waarde1Tekst', 'De mens is de centrale factor in het behalen van business doelstellingen, niet de technologie zelf. Beloning is bij ons gelijk en transparant voor iedereen met dezelfde ervaring, ongeacht gender of achtergrond.'),
    ('over-ons', 'waarde2Titel', 'Pragmatisch'),
    ('over-ons', 'waarde2Tekst', 'We rekenen elke oplossing door op wat jouw vraagstuk daadwerkelijk oplost, en zeggen net zo makkelijk nee tegen een hype die dat niet doet.'),
    ('over-ons', 'waarde3Titel', 'Autoriteit door bewijs'),
    ('over-ons', 'waarde3Tekst', 'Bewezen frameworks (App Factory, OGSM, 3-Horizonsmodel) en concrete resultaten, geen losse claims.'),
    ('over-ons', 'waarde4Titel', 'Duurzaam ondernemen'),
    ('over-ons', 'waarde4Tekst', 'Ondernemen en maatschappelijke bijdrage horen bij elkaar. In 2030 is ons businessmodel 100% CO2-neutraal.'),
    ('over-ons', 'kpi1Getal', '2023'),
    ('over-ons', 'kpi1Label', 'Opgericht, kantoor in Utrecht'),
    ('over-ons', 'kpi2Getal', '100%'),
    ('over-ons', 'kpi2Label', 'De mens centraal, op elk project'),
    ('over-ons', 'kpi3Getal', '2030'),
    ('over-ons', 'kpi3Label', 'Doel: CO2-neutraal businessmodel'),
    ('over-ons', 'missieFotoAlt', 'Wavers in gesprek met een klant'),
    ('over-ons', 'teamFotoAlt', 'Het team achter The New Wave IT'),
    ('over-ons', 'adresRegel', 'Ganzenmarkt 6, 3512 GD Utrecht'),
    ('contact', 'heroTitleStart', 'Waar kunnen we je '),
    ('contact', 'heroAccent', 'mee helpen'),
    ('contact', 'heroLead', 'Een gesprek plannen kan, maar een korte vraag stellen mag ook gewoon. Bel, mail, app of kom langs, je zit nergens aan vast.'),
    ('contact', 'verwachtTitel', 'Wat je kunt verwachten'),
    ('contact', 'verwacht1Titel', 'Voorbereiding'),
    ('contact', 'verwacht1Tekst', 'We verdiepen ons vooraf in jouw sector en organisatie, zodat het gesprek meteen de diepte in kan.'),
    ('contact', 'verwacht2Titel', 'Het gesprek'),
    ('contact', 'verwacht2Tekst', '20 tot 45 minuten met een practice lead, afhankelijk van je vraag. Over jouw businessvraagstuk, niet over onze diensten.'),
    ('contact', 'verwacht3Titel', 'Concreet vervolg'),
    ('contact', 'verwacht3Tekst', 'Binnen drie dagen een eerste analyse met mogelijke routes, geheel vrijblijvend.'),
    ('contact', 'manierenKop', 'Manieren om contact op te nemen'),
    ('contact', 'manier1Titel', 'Bel ons direct'),
    ('contact', 'manier1Tekst', 'Op werkdagen tussen 9 en 17 uur krijg je meteen iemand aan de lijn.'),
    ('contact', 'manier2Titel', 'Stuur een mail'),
    ('contact', 'manier2Tekst', 'Stel je vraag, hoe klein ook. Binnen één werkdag een reactie van een echt mens.'),
    ('contact', 'manier3Titel', 'App met ons'),
    ('contact', 'manier3Tekst', 'Liever appen? Stuur een berichtje via WhatsApp, we reageren snel.'),
    ('contact', 'manier3Knop', 'Start een chat'),
    ('contact', 'manier4Titel', 'Plan een gesprek'),
    ('contact', 'manier4Tekst', '20 tot 45 minuten met een practice lead, afhankelijk van je vraag. Vrijblijvend en zonder verkooppraatje.'),
    ('contact', 'manier4Knop', 'Plan het gesprek'),
    ('contact', 'expertKop', 'Je spreekt met o.a.'),
    ('contact', 'adresTitel', 'Bezoekadres'),
    ('contact', 'adresRegel', 'Ganzenmarkt 6, Utrecht. Koffie staat klaar'),
    ('contact', 'ctaTitel', 'Liever eerst zien wat we voor anderen deden?'),
    ('diensten', 'heroTitleStart', 'Mensen die meebouwen, of '),
    ('diensten', 'heroAccent', 'een dienst met vaste scope'),
    ('diensten', 'heroTitleEnd', '.'),
    ('diensten', 'heroLead', 'Onze basis is capaciteit: consultants die in jouw team meebouwen aan Mendix en AI. Wil je eerst richting, snelheid of een fundering, dan hebben we daar afgebakende diensten voor, met een vaste scope en een prijs vooraf.'),
    ('diensten', 'basisKicker', 'Onze basisdienstverlening · doorlopend'),
    ('diensten', 'basisTitel', 'Consultant inhuren'),
    ('diensten', 'basisTekst', 'Waar de meeste van onze samenwerkingen beginnen en eindigen: een consultant die naast je team komt staan en meebouwt. Aan een Mendix-applicatie, aan AI in je processen, of aan allebei, want in de praktijk loopt dat door elkaar heen. Heb je op dat niveau iemand nodig die de richting bewaakt, dan schuift er een strategisch adviseur aan. Je huurt geen uren in, je haalt iemand binnen die je landschap leert kennen en kennis achterlaat.'),
    ('diensten', 'basisRol1Label', 'Mendix'),
    ('diensten', 'basisRol1Naam', 'Developer & lead'),
    ('diensten', 'basisRol1Tekst', 'Bouwt mee in je bestaande teams of zet er een op.'),
    ('diensten', 'basisRol2Label', 'AI'),
    ('diensten', 'basisRol2Naam', 'AI-engineer'),
    ('diensten', 'basisRol2Tekst', 'Van pilot naar productie, binnen jouw kaders.'),
    ('diensten', 'basisRol3Label', 'Business'),
    ('diensten', 'basisRol3Naam', 'Analist & product owner'),
    ('diensten', 'basisRol3Tekst', 'Vertaalt het proces naar wat er gebouwd moet worden.'),
    ('diensten', 'basisRol4Label', 'Strategie'),
    ('diensten', 'basisRol4Naam', 'Strategisch adviseur'),
    ('diensten', 'basisRol4Tekst', 'Bewaakt richting, portfolio en businesscase.'),
    ('diensten', 'basisPersoonRol', 'Jouw aanspreekpunt'),
    ('diensten', 'basisPersoonTekst', 'Je maakt vooraf kennis met de persoon zelf, niet met een cv uit een bestand.'),
    ('diensten', 'basisInzetLabel', 'Inzet'),
    ('diensten', 'basisInzetWaarde', 'Vanaf één dag per week'),
    ('diensten', 'basisPunt1', 'Detachering of projectbasis, zonder minimumtermijn van een jaar'),
    ('diensten', 'basisPunt2', 'Vaste consultants, geen wisselende gezichten'),
    ('diensten', 'basisPunt3', 'Kennisoverdracht is onderdeel van de opdracht'),
    ('diensten', 'basisPunt4', 'Tarief stemmen we af op rol, seniority en inzet'),
    ('diensten', 'basisCta', 'Bespreek je capaciteitsvraag'),
    ('diensten', 'basisCtaAlt', 'Bekijk wie er bij ons werken →'),
    ('diensten', 'instapKicker', 'Begin hier'),
    ('diensten', 'instapTitel', 'Of begin met één dag'),
    ('diensten', 'instapIntro', 'Wil je liever eerst zien wat het oplevert voordat je mensen inhuurt? Dan starten we met een dag. Aan het eind ligt er iets werkends waar je intern mee verder kunt, zonder vervolgverplichting.'),
    ('diensten', 'verdiepingKicker', 'Verder in het traject'),
    ('diensten', 'verdiepingTitel', 'Zes diensten voor als je al onderweg bent'),
    ('diensten', 'verdiepingIntro', 'Niet nodig om nu te kiezen: ze komen meestal pas aan de orde als de eerste app draait of het team groeit. Voor de volledigheid staan ze hier wel.'),
    ('diensten', 'verdiepingRichtingTekst', 'Voor als je al bouwt en wilt weten of je de goede kant op schaalt.'),
    ('diensten', 'verdiepingCapaciteitTekst', 'Als je van één app naar een portfolio wilt en je eigen mensen het moeten dragen.'),
    ('diensten', 'fase1Titel', 'De strategische basis'),
    ('diensten', 'fase1Tekst', 'IT-strategie sluit nog niet aan op de bedrijfsdoelen. Er is ambitie maar geen richting.'),
    ('diensten', 'fase2Titel', 'Van visie naar eerste resultaten'),
    ('diensten', 'fase2Tekst', 'Er moet snel zichtbare waarde komen om draagvlak te krijgen. Het team moet gaan draaien.'),
    ('diensten', 'fase3Titel', 'Structureren en professionaliseren'),
    ('diensten', 'fase3Tekst', 'De eerste resultaten staan. Nu moet het beheersbaar, herhaalbaar en overdraagbaar worden.'),
    ('diensten', 'fase4Titel', 'Schalen en innoveren'),
    ('diensten', 'fase4Tekst', 'Meerdere teams, meerdere business units, een groeiend portfolio aan apps en agents.'),
    ('diensten', 'fase5Titel', 'Continu evalueren'),
    ('diensten', 'fase5Tekst', 'De vraag van de CIO: wat levert het platform op, en waar zit de volgende winst?'),
    ('diensten', 'ctaTitel', 'Niet zeker welke dienst bij jouw vraagstuk past?'),
    ('diensten-mendix', 'metaTitle', 'Mendix: van App in a Day tot Fusion Team'),
    ('diensten-mendix', 'metaDescription', 'Drie diensten om met Mendix te starten of op te schalen: App in a Day, de Mendix Scale Sessie en de Fusion Team Startsprint.'),
    ('diensten-mendix', 'badgeLabel', 'Mendix'),
    ('diensten-mendix', 'heroTitleStart', 'Van eerste app tot schaalbaar platform.'),
    ('diensten-mendix', 'heroLead', 'Drie diensten, van een dag tot een traject: begin met een werkende app, bepaal je richting met een Scale Sessie, of bouw capaciteit op met een Fusion Team.'),
    ('diensten-mendix', 'crossrefTitel', 'Ook relevant vanuit Mendix'),
    ('diensten-mendix', 'ctaTitel', 'Welke stap past bij jouw Mendix-landschap?'),
    ('diensten-ai', 'metaTitle', 'AI: van AI Agent in a Day tot de Opportunity Scan'),
    ('diensten-ai', 'metaDescription', 'Twee diensten om met AI te starten: de AI Agent in a Day-workshop en de AI Opportunity Scan om de grootste kansen te prioriteren.'),
    ('diensten-ai', 'badgeLabel', 'AI'),
    ('diensten-ai', 'heroTitleStart', 'Van eerste agent tot geprioriteerde kansen.'),
    ('diensten-ai', 'heroLead', 'Twee diensten: bouw in één dag je eerste werkende agent, of breng in een halve dag in kaart waar AI bij jullie geld oplevert.'),
    ('diensten-ai', 'crossrefTitel', 'Ook relevant vanuit AI'),
    ('diensten-ai', 'ctaTitel', 'Welke stap past bij jullie AI-ambitie?'),
    ('diensten-strategie', 'metaTitle', 'Strategie: van AI-strategie tot IT-strategie op low-code en AI'),
    ('diensten-strategie', 'metaDescription', 'Twee diensten om koers te bepalen: AI-strategie voor de directie en IT-strategie op low-code en AI voor de CIO.'),
    ('diensten-strategie', 'badgeLabel', 'Strategie'),
    ('diensten-strategie', 'heroTitleStart', 'Van eerste koers tot uitvoerbare roadmap.'),
    ('diensten-strategie', 'heroLead', 'Twee diensten voor twee vragen: waar verandert AI ons verdienmodel (directie), en waar past low-code in ons landschap (CIO).'),
    ('diensten-strategie', 'instapTitel', 'Nog aan het oriënteren?'),
    ('diensten-strategie', 'instapTekst', 'Begin met een korte, vrijblijvende kennismaking van twintig minuten. Geen verplichtingen, wel een eerlijk beeld van waar je staat.'),
    ('diensten-strategie', 'instapKnop', 'Plan een kennismaking (20 min)'),
    ('diensten-strategie', 'crossrefTitel', 'Ook relevant vanuit Strategie'),
    ('diensten-strategie', 'ctaTitel', 'Klaar om koers te bepalen?'),
    ('sectoren', 'heroTitleStart', 'Wij spreken de taal van '),
    ('sectoren', 'heroAccent', 'jouw sector'),
    ('sectoren', 'heroLead', 'Wij kiezen bewust voor vijf sectoren in plaats van generiek IT-advies: publieke sector, mobiliteit, banken, zorg en manufacturing. In elke sector kennen we de regels, de systemen en de druk waaronder jouw organisatie werkt. Daardoor leveren we sneller iets dat écht past, in plaats van een generieke oplossing die overal een beetje werkt.'),
    ('sectoren', 'werkwijzeKicker', 'Waarom sectorfocus'),
    ('sectoren', 'werkwijzeTitel', 'Wat sectorkennis je oplevert'),
    ('sectoren', 'wijze1Titel', 'Geen inwerktijd'),
    ('sectoren', 'wijze1Tekst', 'We kennen de wetgeving, ketens en kernsystemen van jouw markt. Het eerste gesprek gaat meteen over jouw vraagstuk.'),
    ('sectoren', 'wijze2Titel', 'Bewezen patronen'),
    ('sectoren', 'wijze2Tekst', 'Oplossingen die zich in jouw sector al bewezen hebben, vertalen we naar jouw organisatie, sneller live, minder risico.'),
    ('sectoren', 'wijze3Titel', 'Netwerk dat meedenkt'),
    ('sectoren', 'wijze3Tekst', 'Via onze partners en klanten in de sector leer je van organisaties die hetzelfde vraagstuk al oplosten.'),
    ('sectoren', 'ctaTitel', 'Benieuwd wat dit voor jouw organisatie betekent?'),
    ('werken-bij', 'heroTitleStart', 'Word een '),
    ('werken-bij', 'heroAccent', 'Waver'),
    ('werken-bij', 'heroLead', 'Het is onze droom dat elk mens werk doet dat aansluit bij persoonlijke doelen en drijfveren. Wij verzorgen de randvoorwaarden: een gelijk speelveld, een open cultuur en alle ruimte om te groeien. Jij zorgt voor de versnelling bij onze partners.'),
    ('werken-bij', 'ctaTitel', 'Eerst een kop koffie? Kom kennismaken.'),
    ('werken-bij', 'groeiKicker', 'Groei & ontwikkeling'),
    ('werken-bij', 'groeiTitel', 'Elke dag samen beter worden'),
    ('werken-bij', 'groeiIntro', 'Persoonlijke aandacht en focus op groei zijn de kern. Samen verkennen we meerdere routes naar jouw ambitie en kiezen we de best passende weg.'),
    ('werken-bij', 'groei1Titel', 'Persoonlijk groeipad'),
    ('werken-bij', 'groei1Tekst', 'Jouw route bestaat uit activiteiten on-the-job, cursussen en trainingen, gekozen op basis van jouw ambitie, niet een standaardlijstje.'),
    ('werken-bij', 'groei2Titel', 'Open feedbackcultuur'),
    ('werken-bij', 'groei2Tekst', 'Regelmatige, open en eerlijke feedback hoort bij onze cultuur. Elk half jaar haal je bovendien 360°-feedback op uit je omgeving.'),
    ('werken-bij', 'groei3Titel', 'Learning week'),
    ('werken-bij', 'groei3Tekst', 'Jaarlijks trekken we er met z''n allen een volle week op uit om samen te ontwikkelen: vakinhoudelijk én persoonlijk.'),
    ('werken-bij', 'tpKicker', 'Total People'),
    ('werken-bij', 'tpTitel', 'Presteren, groeien én ontspannen'),
    ('werken-bij', 'tpIntro', 'Bij ons staat het Total People-principe centraal: de balans tussen presteren, groeien en ontspannen. Jouw groei is onze groei.'),
    ('werken-bij', 'tp1Titel', 'Presteren'),
    ('werken-bij', 'tp1Tekst', 'Uitdagende opdrachten bij partners in de publieke sector, mobiliteit, banken, zorg en manufacturing. Een rol op maat die jij zelf kiest.'),
    ('werken-bij', 'tp2Titel', 'Groeien'),
    ('werken-bij', 'tp2Tekst', 'Zeggenschap over de koers: je beslist mee over strategie en investeringen van onze organisatie. Plus een persoonlijk groeipad met open feedback.'),
    ('werken-bij', 'tp3Titel', 'Ontspannen'),
    ('werken-bij', 'tp3Tekst', 'Werk dat aansluit bij jouw doelen en drijfveren, met ruimte voor rust. Duurzaam onderweg in een elektrische auto van de zaak.'),
    ('werken-bij', 'cultuurKicker', 'Onze cultuur'),
    ('werken-bij', 'cultuurTitel', 'Ondernemende mensen, gelijk speelveld.'),
    ('werken-bij', 'cultuurP', 'Je werkt hier niet vóór ons, je werkt mét ons. Gepassioneerde consultants en engineers die naast klantteams staan en zelf ruimte krijgen om te groeien naar expertrollen.'),
    ('werken-bij', 'cultuur1', 'Persoonlijk groeipad, geen vaste carrièreladder'),
    ('werken-bij', 'cultuur2', 'Wavetime en Company week als vaste cultuurrituelen'),
    ('werken-bij', 'cultuur3', 'Werken met bewezen frameworks (App Factory, OGSM, App in a Day) in plaats van losse projecten'),
    ('werken-bij', 'cultuur4', 'Gelijke, transparante beloning bij gelijke ervaring, ongeacht gender of achtergrond'),
    ('werken-bij', 'geenMatchVoor', 'Staat jouw rol er niet tussen?'),
    ('werken-bij', 'geenVacatures', 'Op dit moment staan er geen vacatures open. We spreken sowieso graag met Mendix- en AI-consultants die bij ons passen.'),
    ('werken-bij', 'openSollLink', 'Stuur hieronder een open sollicitatie'),
    ('werken-bij', 'belRegel', 'of bel {naam}: {telefoon}.'),
    ('werken-bij', 'openSollKop', 'Open sollicitatie'),
    ('werken-bij', 'openSollIntro', 'Geen passende vacature? Laat je gegevens achter, we kijken graag of er een match is.'),
    ('werken-bij', 'openSollNoot', 'Na je sollicitatie neemt {naam} binnen twee werkdagen contact op. Een echt mens, geen automatische afwijzing.'),
    ('werken-bij', 'cultuurFotoAlt', 'Wavers tijdens een kennissessie'),
    ('klantverhalen', 'metaTitle', 'Klantverhalen: resultaat dat je kunt navragen'),
    ('klantverhalen', 'metaDescription', 'Verhalen van organisaties in de publieke sector, mobiliteit, banken, zorg en manufacturing, verteld met de cijfers erbij.'),
    ('klantverhalen', 'heroKicker', 'Klantverhalen'),
    ('klantverhalen', 'heroTitleStart', 'Resultaat dat je kunt '),
    ('klantverhalen', 'heroAccent', 'navragen'),
    ('klantverhalen', 'heroTitleEnd', '.'),
    ('klantverhalen', 'heroLead', 'Business-impact, geen technische anekdote. Hier laten we zien wat er daadwerkelijk verandert bij een klant als strategie, Mendix en AI samenkomen: minder handwerk, snellere processen, meetbaar resultaat.'),
    ('klantverhalen', 'uitgelichtKicker', 'Uitgelicht'),
    ('klantverhalen', 'beloftesKicker', 'Onze sectoren'),
    ('klantverhalen', 'beloftesTitel', 'Nog geen klantverhaal in jouw sector? Dit is wat je kunt verwachten.'),
    ('klantverhalen', 'beloftesIntro', 'We werken pas kort genoeg samen met organisaties als Moove om al hun verhaal te kunnen delen. De rest volgt. Hieronder alvast het type resultaat dat we per sector al aantoonbaar leveren.'),
    ('klantverhalen', 'ctaTitel', 'Herken je jouw vraagstuk in deze verhalen?'),
    ('inzichten', 'metaTitle', 'Inzichten: kennis die je morgen kunt gebruiken'),
    ('inzichten', 'metaDescription', 'Praktische artikelen over Mendix, AI en digitale strategie, geschreven vanuit de vraagstukken van onze vijf sectoren, zonder jargon.'),
    ('inzichten', 'heroKicker', 'Inzichten'),
    ('inzichten', 'heroTitleStart', 'Kennis die je '),
    ('inzichten', 'heroAccent', 'morgen'),
    ('inzichten', 'heroTitleEnd', ' kunt gebruiken.'),
    ('inzichten', 'heroLead', 'Sectorkennis die je vooruit denkt. Praktijkervaring uit projecten bij gemeenten, banken, zorginstellingen en mobiliteitsbedrijven, vertaald naar artikelen die je direct kan gebruiken, geen gerecycled nieuws.'),
    ('inzichten', 'leadTitel', 'Blijf voorop met onze inzichten'),
    ('inzichten', 'leadTekst', 'Eén mail per maand met onze scherpste inzichten over technologie in jouw sector. Geen sales, uitschrijven kan altijd.'),
    ('inzichten', 'artikelLeadTitel', 'Dit soort inzichten, één keer per maand'),
    ('inzichten', 'artikelLeadTekst', 'Laat je e-mail achter en ontvang onze scherpste inzichten over technologie in jouw sector. Geen sales, uitschrijven kan altijd.'),
    ('privacy', 'metaTitle', 'Privacybeleid'),
    ('privacy', 'metaDescription', 'Hoe The New Wave IT B.V. persoonsgegevens verzamelt, gebruikt, deelt en beschermt in overeenstemming met de AVG.'),
    ('privacy', 'heroTitel', 'Privacy Policy'),
    ('privacy', 'heroLead', 'Hoe wij persoonsgegevens verzamelen, gebruiken, delen en beschermen in relatie tot onze website, in overeenstemming met de AVG.'),
    ('privacy', 'body', '<p>Dit is de Privacy Policy van The New Wave IT B.V. (hierna te noemen “The New Wave IT”, “wij,” “ons” of “onze”), statutair gevestigd op Havixhorst 100, Alphen aan den Rijn en ingeschreven bij de Kamer van Koophandel onder nummer 90830490. Ons kantoor bezoek je op Ganzenmarkt 6, Utrecht. Deze Privacy Policy legt uit hoe wij gegevens verzamelen, gebruiken, delen en beschermen in relatie tot onze website <a href="https://www.thenewwaveit.com">http://www.thenewwaveit.com</a> (de “Website”). Wij verzamelen deze gegevens wanneer je onze Website bezoekt met je computer, tablet, telefoon of smartwatch (“Computer”). Wij verwerken persoonsgegevens op een manier welke in overeenstemming is met de Algemene Verordening Gegevensbescherming, inclusief uitvoeringswet van deze verordening, of de voorafgaande wetgeving van de Wet Bescherming Persoonsgegevens en eventuele toekomstige wijzigingen (de “AVG”), de telecommunicatiewet en de andere op dit moment geldende privacywetgeving.</p>
<p>Door onze Website te gebruiken begrijp je en ga je akkoord met het verzamelen en gebruiken van informatie in overeenstemming met deze Privacy Policy. Onze Privacy Policy is van toepassing op alle bezoekers, gebruikers en alle anderen die de toegang hebben tot de Website (“Gebruikers”).</p>
<h2>Wat voor gegevens verzamelen wij?</h2>
<p>Wij verzamelen persoonsgegevens die je ons verstrekt. Een persoonsgegeven betreft informatie over een geïdentificeerde of identificeerbare natuurlijke persoon. Denk daarbij aan de volgende gegevens:</p>
<ul><li>Communicatie tussen The New Wave IT en jou (wij mogen je dienst-gerelateerde e-mails sturen).</li></ul>
<h2>Log file informatie</h2>
<p>Wij verzamelen alleen informatie die je browser stuurt als je onze Website bezoekt wanneer dit noodzakelijk is voor het goed functioneren van de Website. Onder het goed functioneren van de Website verstaan wij met name het beschermen van de Website tegen handelingen die de veiligheid van de Website en van je Computer in gevaar kunnen brengen. Dit logbestand kan informatie bevatten zoals je IP-adres, browser-type, browser-versie, de pagina’s van onze Website die je bezoekt, de tijd en datum van je bezoek, de tijd die je op deze pagina’s doorbrengt en andere statistieken.</p>
<h2>Analytische diensten</h2>
<p>Wij maken gebruik van analytische diensten van derden. Deze helpen ons om ons verkeer en trends van de Website te meten. De tools verzamelen informatie die je Computer verstuurt: onze Website, de webpagina’s die je bezoekt, add-ons en andere informatie die ons helpt de Website te verbeteren. Deze tools gebruiken ‘cookies’. Dat zijn eenvoudige tekstbestanden op je harde schijf of in het geheugen van je Computer. Ze kunnen je Computer of de bestanden die erop staan niet beschadigen, en verzamelen anoniem informatie over je log-informatie en log-gedrag. Wij gebruiken deze informatie samen met informatie van andere Gebruikers. Daardoor kunnen wij je niet als individu herkennen. Wij gebruiken voor onze analytische diensten Google Analytics. Google Analytics plaatst een permanent cookie in je webbrowser om je te herkennen, en deelt je gegevens met Google. Wij delen alleen gegevens met Google die wij op basis van de AVG mogen delen met Google. Je voorkomt die herkenning volledig door de cookies in je browser uit te schakelen.</p>
<h2>Doeleinden verwerking gegevens</h2>
<p>Door onze diensten te gebruiken laat je bepaalde gegevens bij ons achter, bijvoorbeeld door het aanmaken van een account. Het kan dan gaan om gegevens zoals naam, e-mailadres, woonplaats, telefoonnummer en betaalgegevens. The New Wave IT verzamelt en verwerkt deze gegevens om onze diensten toegankelijk te maken. Wij verzamelen ook informatie over je Computer (zoals IP-adres, browsertype en besturingssysteem), zodat wij onze diensten kunnen verbeteren. Wij geven de persoonsgegevens niet aan derden, tenzij de wet- en regelgeving ons daartoe verplicht.</p>
<h2>Rechtsgrond verwerking gegevens</h2>
<p>Er zijn meerdere grondslagen op basis waarvan The New Wave IT persoonsgegevens kan verwerken. Dit zijn: de uitvoering van een overeenkomst, het gerechtvaardigd belang, op grond van een wettelijke verplichting of op grond van jouw toestemming. We verwerken je persoonsgegevens alleen voor zover dat nodig is om het doel te behalen waarvoor we ze verzamelen.</p>
<h2>Hoe gebruiken wij deze informatie?</h2>
<p>Alle informatie die wij verzamelen gebruiken wij om onze Website te ondersteunen en verbeteren.</p>
<h2>Hoe delen wij deze informatie?</h2>
<p>Wij verhuren of verkopen je (persoons)gegevens niet aan derden.</p>
<h2>Zeggenschapswijziging</h2>
<p>Wanneer The New Wave IT of een deel daarvan wordt verkocht of overgedragen, of activa van ons bij een andere organisatie terechtkomen (bijvoorbeeld als gevolg van een fusie, overname, faillissement, ontbinding of liquidatie), dan kunnen gegevens die via de Website zijn verzameld onder de verkochte of overgedragen zaken vallen. De koper of verkrijger zal de afspraken in deze Privacy Policy moeten opvolgen.</p>
<h2>Wettelijk verzoek en voorkoming schade</h2>
<p>Op grond van een wettelijk verzoek mogen wij toegang krijgen tot je informatie en die bewaren en/of delen in antwoord op zo’n verzoek (zoals een huiszoekingsbevel, gerechtelijk bevel of een dagvaarding). Wij mogen je informatie ook bewaren en/of delen wanneer wij denken dat dat nodig is om fraude of andere illegale activiteiten op te sporen, te voorkomen en aan te kaarten, en om ons, jou en anderen te beschermen. Informatie die wij over je ontvangen mogen wij openen, bewerken en langer bewaren wanneer dat nodig is vanwege een juridisch verzoek of verplichting, een onderzoek naar onze voorwaarden of beleid, of om anderszins schade te voorkomen.</p>
<h2>Beveiliging</h2>
<p>The New Wave IT heeft passende technische en organisatorische maatregelen genomen om je gegevens te beveiligen tegen verlies of tegen enige vorm van onrechtmatige verwerking. Die maatregelen beveiligen de informatie die via de Website binnenkomt. Toch kan The New Wave IT niet garanderen dat niemand de informatie op de Website opent, onthult, verandert of vernietigt. Je beheert zelf de e-mails tussen jou en The New Wave IT. Wij zijn niet verantwoordelijk voor de functionaliteit, privacy of veiligheidsmaatregelen van enige andere organisatie.</p>
<h2>Internationale overdracht</h2>
<p>Je informatie kan terechtkomen op computers of servers buiten Nederland en/of de EU, waar andere wetten over gegevensbescherming gelden. Wij spannen ons in om je persoonsgegevens ook buiten de EU juridisch juist en zorgvuldig te laten verwerken.</p>
<h2>Bewaartermijn</h2>
<p>In overeenstemming met de AVG en de overige relevante wetgeving, bewaart The New Wave IT persoonsgegevens niet langer dan noodzakelijk is voor de verwezenlijking van de doeleinden waarvoor wij ze verzamelen of verwerken, tenzij een wettelijke bepaling ons tot langer bewaren verplicht. Wil je weten hoelang wij jouw persoonsgegevens precies bewaren, neem dan contact op via <a href="mailto:hello@thenewwaveit.com">hello@thenewwaveit.com</a>.</p>
<h2>Recht op inzage, correcties, recht op bezwaar en recht op dataportabiliteit</h2>
<p>Wil je je persoonsgegevens inzien, wijzigen of verwijderen, of wil je ze geheel of gedeeltelijk laten overdragen aan jezelf of aan een derde? Neem dan contact op met The New Wave IT via <a href="mailto:hello@thenewwaveit.com">hello@thenewwaveit.com</a> of een brief sturen aan:</p>
<address>The New Wave IT B.V.<br>Havixhorst 100<br>2402 MT, Alphen aan den Rijn</address>
<h2>Applicaties, websites en diensten van derden</h2>
<p>Wij zijn niet verantwoordelijk voor de praktijken van applicaties, websites of services van derden die gelinkt zijn naar of van onze Website, waaronder de informatie of inhoud die bijgaand is. Onze Privacy Policy geldt niet zodra je via een link van onze Website naar een andere applicatie, website of service gaat. Wat je daar doet valt onder de regels en het beleid van die derde, ook als de link op onze Website stond.</p>
<h2>Privacy van kinderen</h2>
<p>Onze Website vraagt niet specifiek en bewust om gegevens van personen jonger dan 16 jaar (“Kinderen”). Deze leeftijd kan variëren in elke Lidstaat tussen de leeftijd van 13 en 16 jaar. Komen wij erachter dat wij persoonsgegevens van Kinderen hebben verzameld zonder toestemming van hun ouder of voogd, dan verwijderen wij die gegevens van onze servers. Vermoed je dat je kind zonder jouw toestemming persoonsgegevens aan ons heeft verstrekt, neem dan contact op via <a href="mailto:hello@thenewwaveit.com">hello@thenewwaveit.com</a>.</p>
<h2>Wijzigingen</h2>
<p>The New Wave IT kan deze Privacy Policy van tijd tot tijd aanpassen. Raadpleeg hem daarom regelmatig. Een aanpassing treedt in werking op het moment dat wij hem op deze pagina publiceren.</p>
<h2>Contact</h2>
<p>Heb je vragen over deze Privacy Policy? Neem dan contact op met The New Wave IT via <a href="mailto:hello@thenewwaveit.com">hello@thenewwaveit.com</a>.</p>')
),
verschil as (
  select s.slug, s.veld, s.tekst as seed, p.data ->> s.veld as cms
  from seed s
  join cms_paginas p on p.slug = s.slug
  where p.data ? s.veld
    and p.data ->> s.veld is distinct from s.tekst
),
blokken as (
  select v.slug, v.veld, v.seed, v.cms, i,
         substr(v.seed, (i - 1) * 200 + 1, 200) as seedblok,
         substr(v.cms,  (i - 1) * 200 + 1, 200) as cmsblok
  from verschil v,
       generate_series(1, ceil(greatest(length(v.seed), length(v.cms)) / 200.0)::int) as i
),
eerste as (
  select slug, veld, min(i) as i
  from blokken
  where seedblok is distinct from cmsblok
  group by slug, veld
)
select
  b.slug,
  b.veld,
  length(b.seed) as seed_len,
  length(b.cms)  as cms_len,
  (e.i - 1) * 200 + 1 as vanaf_teken,
  b.seedblok as seed,
  b.cmsblok  as cms
from eerste e
join blokken b on b.slug = e.slug and b.veld = e.veld and b.i = e.i
order by b.slug, b.veld;
