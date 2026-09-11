-- ============================================================================
-- Dienstenoverzicht volgens het nieuwe ontwerp (11 september 2026)
--
-- Drie wijzigingen, elk met een eigen controle. Draai dit ná de deploy.
--
-- Gegenereerd uit de seed, niet met de hand overgetypt.
-- ============================================================================


-- ============================================================================
-- BLOK 1 · Foundation Starterkit terug als catalogusdienst
-- ============================================================================
-- Op 9 september is de rij 'foundation-starterkit' hernoemd naar
-- 'consultant-inhuren' (zie 20260909-inhuurdienst.sql). Dat bleek één dienst te
-- veel samengevoegd: het ontwerp behandelt ze als twee verschillende dingen.
-- Inhuren is de doorlopende basisdienst zonder vaste scope; Foundation
-- Starterkit is een van de negen catalogusdiensten.
--
-- De oude inhoud van de rij is destijds overschreven, dus dit is een nieuwe rij
-- met de tekst uit het ontwerp. 'concept', zodat je hem eerst in de admin kunt
-- nalezen; zet hem daarna op 'live'.

insert into public.cms_services (slug, titel, status, volgorde, data)
values (
  'foundation-starterkit',
  'Foundation Starterkit',
  'concept',
  7,
  $json${
  "naam": "Foundation Starterkit",
  "familie": "capaciteit",
  "ookRelevantVoor": [
    "mendix",
    "ai"
  ],
  "fase": 3,
  "pitch": "De gedeelde fundering waardoor app nummer twee de helft kost van app nummer één.",
  "beschrijving": "Koppelingen, security, deploymentstraat en herbruikbare componenten: de laag onder je applicatielandschap die je normaal per app opnieuw bouwt. Wij zetten hem één keer goed neer, aan de hand van een echte applicatie zodat alles in de praktijk bewezen is. Daarna landt elke volgende app erop — sneller, en met een securityreview die je maar één keer hoeft te doen.",
  "doelgroep": "Organisaties met één of meer apps live, die merken dat elke volgende app weer bij nul begint.",
  "duur": "Drie tot vier weken",
  "prijzen": [],
  "resultaten": [
    "Een referentiearchitectuur op jouw landschap",
    "Werkende koppelingen, deploymentstraat en componentbibliotheek",
    "Documentatie en werkafspraken waarmee een nieuw team binnen een week meedraait"
  ],
  "volgendeStap": "Een Fusion Team Startsprint zodat je eigen mensen op de nieuwe fundering leren bouwen.",
  "volgendeStapSlugs": [
    "fusion-team-startsprint"
  ],
  "ctaLabel": "Plan een kennismaking (20 min)",
  "ctaType": "kennismaking",
  "volgorde": 7,
  "kop": "Zorg dat app nummer twee de helft kost van app nummer één.",
  "lead": "De gedeelde fundering onder je applicatielandschap: koppelingen, security, deploymentstraat en herbruikbare componenten. Eén keer goed neerzetten, daarna profiteert elke app ervan.",
  "feiten": [
    {
      "label": "Duur",
      "waarde": "Drie tot vier weken"
    },
    {
      "label": "Bezetting",
      "waarde": "Architect en developer"
    },
    {
      "label": "Uitkomst",
      "waarde": "Werkende fundering + documentatie"
    }
  ],
  "prijsToelichting": "Afhankelijk van het aantal koppelingen. Vaste prijs na de architectuurintake.",
  "boekPunten": [
    "Referentiearchitectuur op jouw landschap",
    "Deploymentstraat en omgevingen ingericht",
    "Herbruikbare componenten en documentatie"
  ],
  "herkenIntro": "Voor organisaties met één of meer apps live, die merken dat elke volgende app weer bij nul begint.",
  "herken": [
    "Elke app heeft zijn eigen manier om in te loggen en te koppelen.",
    "De eerste app was snel klaar, de vijfde duurt langer dan de eerste.",
    "Onze securityafdeling wil bij elke app opnieuw een volledige review."
  ],
  "meeneemtTitel": "Een fundering waar elke volgende app op landt",
  "meeneemt": [
    {
      "icon": "plug",
      "titel": "Werkende koppelingen als herbruikbare service",
      "tekst": "Eén keer gebouwd naar je kernsystemen, daarna aanroepen in plaats van opnieuw maken."
    },
    {
      "icon": "lock",
      "titel": "Authenticatie en autorisatie centraal",
      "tekst": "Eén patroon voor inloggen en rechten, dat security in één keer goedkeurt."
    },
    {
      "icon": "git-merge",
      "titel": "Een deploymentstraat",
      "tekst": "Omgevingen, versiebeheer en geautomatiseerde uitrol — met de checks erin, niet in een overleg."
    },
    {
      "icon": "boxes",
      "titel": "Een componentbibliotheek",
      "tekst": "De schermen en patronen die je steeds opnieuw bouwt, één keer goed en gedeeld."
    },
    {
      "icon": "file-text",
      "titel": "Documentatie en werkafspraken",
      "tekst": "Zodat een nieuw team of een nieuwe leverancier binnen een week meedraait."
    }
  ],
  "meeneemtFoto": "/assets/photos/overleg-laptop.webp",
  "dagLabel": "De weken",
  "dagTitel": "Van architectuur naar werkende fundering",
  "dagIntro": "We bouwen de fundering aan de hand van één echte applicatie, zodat alles wat we opleveren in de praktijk bewezen is.",
  "dagSlots": [
    {
      "tijd": "Week 0",
      "titel": "Architectuurintake",
      "tekst": "We kijken naar je landschap, je kernsystemen en de eisen van security."
    },
    {
      "tijd": "Week 1",
      "titel": "Referentiearchitectuur",
      "tekst": "De keuzes op papier en afgestemd met architectuur en security, voordat we bouwen."
    },
    {
      "tijd": "Week 2",
      "titel": "Koppelingen en security",
      "tekst": "De eerste koppelingen live als herbruikbare service, inclusief het autorisatiepatroon."
    },
    {
      "tijd": "Week 3",
      "titel": "Straat en componenten",
      "tekst": "Deployment geautomatiseerd, de eerste gedeelde componenten in de bibliotheek."
    },
    {
      "tijd": "Week 4",
      "titel": "Bewijzen en overdragen",
      "tekst": "We bouwen een kleine app op de fundering om te laten zien dat het werkt, en dragen over."
    }
  ],
  "voorbereidingIntro": "Deze opdracht raakt architectuur en security. Hoe eerder die aan tafel zitten, hoe minder herwerk aan het eind.",
  "wijZorgen": [
    "Een architect en een developer met ervaring in vergelijkbare landschappen",
    "Een referentiearchitectuur toegespitst op jouw situatie",
    "Werkende koppelingen, straat en componentbibliotheek",
    "Documentatie en een overdrachtssessie met je eigen team"
  ],
  "jijZorgt": [
    "Toegang tot de kernsystemen waarmee gekoppeld moet worden, inclusief testomgevingen",
    "Je architect en iemand van security aan tafel in week nul en week één",
    "Een eerstvolgende applicatie die op de fundering mag landen",
    "Een beslisser voor de keuzes die architectuur raken"
  ],
  "daarnaIntro": "Met de fundering op zijn plek gaat de vraag over tempo en mensen.",
  "vervolg": [
    {
      "slug": "fusion-team-startsprint",
      "reden": "Eigen mensen die op de nieuwe fundering leren bouwen."
    },
    {
      "slug": "mendix-scale-sessie",
      "reden": "Meer teams erbij? Dan is governance de volgende vraag."
    },
    {
      "slug": "training-enablement",
      "reden": "Je bestaande developers meenemen in de nieuwe standaarden."
    }
  ],
  "faqTitel": "Wat architecten en opdrachtgevers vragen",
  "faq": [
    {
      "vraag": "Is dit niet iets wat we zelf kunnen?",
      "antwoord": "Vaak wel, technisch. Wat meestal ontbreekt is de tijd en het overzicht om het naast de lopende bouw te doen — daar zit onze toegevoegde waarde."
    },
    {
      "vraag": "Werkt dit ook als we meerdere leveranciers hebben?",
      "antwoord": "Juist dan. De fundering is de plek waar je afspraken vastlegt die voor iedereen gelden."
    },
    {
      "vraag": "Wat als onze security-eisen streng zijn?",
      "antwoord": "Dat is eerder een voordeel: we betrekken security vanaf week nul, zodat de fundering meteen goedgekeurd is in plaats van achteraf."
    },
    {
      "vraag": "Geldt dit alleen voor Mendix?",
      "antwoord": "Nee. De koppelingen, security en straat gelden voor je hele low-code- en AI-landschap."
    },
    {
      "vraag": "Kost app twee dan echt de helft?",
      "antwoord": "Bij vergelijkbare complexiteit is dat de orde van grootte die we in de praktijk zien. We doen geen belofte zonder je landschap gezien te hebben."
    }
  ],
  "ctaTitel": "Eén keer fundering, daarna profiteert elke app."
}$json$::jsonb
)
on conflict (slug) do nothing;

-- Controle. Verwacht: één rij, status 'concept'.
select slug, titel, status, volgorde from public.cms_services
where slug = 'foundation-starterkit';


-- ============================================================================
-- BLOK 2 · Consultant inhuren uit de catalogusvolgorde
-- ============================================================================
-- De basisdienst staat naast de catalogus en heeft geen plek meer in de rij van
-- negen. De volgorde telt voor hem alleen nog in de keuzelijst van het
-- contactformulier.

update public.cms_services set volgorde = 10 where slug = 'consultant-inhuren';

-- Controle. Verwacht: negen catalogusdiensten op 1 t/m 9, inhuren op 10.
select slug, volgorde, data->>'familie' as familie
from public.cms_services
order by volgorde;


-- ============================================================================
-- BLOK 3 · De teksten van /diensten
-- ============================================================================
-- De pagina heeft nieuwe secties (basisdienst, instap, verdieping) en is de
-- keuzematrix, de fasenlijn en de sectorstrip kwijt. De nieuwe sleutels zetten
-- we hier; de dode sleutels halen we weg, anders blijft er content in de
-- database staan die nergens meer getoond wordt.
--
-- Let op: dit overschrijft de heroteksten. Die gingen over "negen diensten, één
-- pad" en dat is niet meer wat de pagina zegt.

update public.cms_paginas
set data = (data - 'matrixKicker' - 'matrixTitel' - 'matrixIntro' - 'breedNoot' - 'fasenKicker' - 'fasenTitel' - 'fasenIntro' - 'sectstripKicker' - 'sectstripTitel' - 'sectstripIntro')
           || $json${
  "heroTitleStart": "Mensen die meebouwen, of ",
  "heroAccent": "een dienst met vaste scope",
  "heroTitleEnd": ".",
  "heroLead": "Onze basis is capaciteit: consultants die in jouw team meebouwen aan Mendix en AI. Wil je eerst richting, snelheid of een fundering, dan hebben we daar afgebakende diensten voor — met een vaste scope en een prijs vooraf.",
  "heroLeadMobiel": "Consultants die in jouw team meebouwen, of een afgebakende dienst met vaste scope en prijs vooraf.",
  "basisKicker": "Onze basisdienstverlening · doorlopend",
  "basisTitel": "Consultant inhuren",
  "basisTekst": "Waar de meeste van onze samenwerkingen beginnen en eindigen: een consultant die naast je team komt staan en meebouwt. Aan een Mendix-applicatie, aan AI in je processen, of aan allebei — want in de praktijk loopt dat door elkaar heen. Heb je op dat niveau iemand nodig die de richting bewaakt, dan schuift er een strategisch adviseur aan. Je huurt geen uren in, je haalt iemand binnen die je landschap leert kennen en kennis achterlaat.",
  "basisRol1Label": "Mendix",
  "basisRol1Naam": "Developer & lead",
  "basisRol1Tekst": "Bouwt mee in je bestaande teams of zet er een op.",
  "basisRol2Label": "AI",
  "basisRol2Naam": "AI-engineer",
  "basisRol2Tekst": "Van pilot naar productie, binnen jouw kaders.",
  "basisRol3Label": "Business",
  "basisRol3Naam": "Analist & product owner",
  "basisRol3Tekst": "Vertaalt het proces naar wat er gebouwd moet worden.",
  "basisRol4Label": "Strategie",
  "basisRol4Naam": "Strategisch adviseur",
  "basisRol4Tekst": "Bewaakt richting, portfolio en businesscase.",
  "basisPersoonRol": "Jouw aanspreekpunt",
  "basisPersoonTekst": "Je maakt vooraf kennis met de persoon zelf, niet met een cv uit een bestand.",
  "basisInzetLabel": "Inzet",
  "basisInzetWaarde": "Vanaf één dag per week",
  "basisPunt1": "Detachering of projectbasis, zonder minimumtermijn van een jaar",
  "basisPunt2": "Vaste consultants, geen wisselende gezichten",
  "basisPunt3": "Kennisoverdracht is onderdeel van de opdracht",
  "basisPunt4": "Tarief stemmen we af op rol, seniority en inzet",
  "basisCta": "Bespreek je capaciteitsvraag",
  "basisCtaAlt": "Bekijk wie er bij ons werken →",
  "instapKicker": "Begin hier",
  "instapTitel": "Of begin met één dag",
  "instapIntro": "Wil je liever eerst zien wat het oplevert voordat je mensen inhuurt? Dan starten we met een dag. Aan het eind ligt er iets werkends waar je intern mee verder kunt — zonder vervolgverplichting.",
  "verdiepingKicker": "Verder in het traject",
  "verdiepingTitel": "Zes diensten voor als je al onderweg bent",
  "verdiepingIntro": "Niet nodig om nu te kiezen — ze komen meestal pas aan de orde als de eerste app draait of het team groeit. Voor de volledigheid staan ze hier wel.",
  "verdiepingRichtingTekst": "Voor als je al bouwt en wilt weten of je de goede kant op schaalt.",
  "verdiepingCapaciteitTekst": "Als je van één app naar een portfolio wilt en je eigen mensen het moeten dragen."
}$json$::jsonb
where slug = 'diensten';

-- Controle. Verwacht: true in de eerste kolom, false in de tweede.
select
  jsonb_exists(data, 'basisTitel') as heeft_nieuwe_velden,
  jsonb_exists_any(data, array['matrixKicker', 'matrixTitel', 'matrixIntro', 'breedNoot', 'fasenKicker', 'fasenTitel', 'fasenIntro', 'sectstripKicker', 'sectstripTitel', 'sectstripIntro']) as heeft_dode_velden
from public.cms_paginas
where slug = 'diensten';
