-- ============================================================================
-- Dienstdetailpagina's — de nieuwe velden naar het CMS (10 september 2026)
--
-- Hoort bij PR #11. De seed in lib/services.ts is alleen een koude start; zodra
-- cms_services rijen bevat wint het CMS. Zonder dit script verandert er dus
-- niets op de live site, hoe compleet de seed ook is.
--
-- Draai dit ná de deploy van de branch dienstdetailpaginas.
--
-- Levert een update 0 rijen op, dan bestaat die dienst nog niet in het CMS en
-- rendert de seed al. Dat is geen fout; de controlequery onderaan laat het zien.
--
-- `data || jsonb` voegt de nieuwe sleutels toe en laat alles wat je zelf in de
-- admin hebt aangepast staan. Bestaande sleutels met dezelfde naam worden wél
-- overschreven; die zijn er niet, want deze velden zijn nieuw.
--
-- Gegenereerd uit de seed, niet met de hand overgetypt. Wijzigt de seed, dan
-- hoort dit script opnieuw gegenereerd te worden.
--
-- Gevuld: 8 van de 9.
-- Nog niet gevuld: consultant-inhuren — geen ontwerp beschikbaar.
-- Die pagina toont zijn eigen beschrijving, doelgroep en inzichten.
-- ============================================================================


-- App in a Day (22 sleutels)
update public.cms_services
set data = data || $json${
  "kop": "Aan het eind van de dag draait er een app.",
  "lead": "Eén proces dat nu in spreadsheets en mailtjes zit, is aan het eind van de dag een werkende applicatie op je eigen data. Geen mockup, geen rapport — iets waar je maandag mee verder kunt.",
  "feiten": [
    {
      "label": "Duur",
      "waarde": "Eén dag · 09:00–17:00"
    },
    {
      "label": "Deelnemers",
      "waarde": "Zes tot tien"
    },
    {
      "label": "Locatie",
      "waarde": "Bij jou of bij ons"
    }
  ],
  "prijsToelichting": "Exclusief licenties en omgeving. Vaste prijs, we spreken de scope vooraf af.",
  "boekPunten": [
    "Twee consultants: een developer en een facilitator",
    "Werkende app op je eigen data",
    "Geen vervolgverplichting"
  ],
  "herkenIntro": "App in a Day is bedoeld voor teams die één concreet proces willen aanpakken en willen weten of low-code voor hen werkt — zonder eerst een traject van drie maanden te kopen.",
  "herken": [
    "Ons belangrijkste proces draait op één spreadsheet die maar één iemand echt begrijpt.",
    "We praten al een jaar over dit systeem en er is nog steeds niets gebouwd.",
    "We willen zien wat low-code met ónze data doet, niet in een demo van een leverancier."
  ],
  "meeneemtTitel": "Vijf dingen die om 17:00 op tafel liggen",
  "meeneemt": [
    {
      "icon": "app-window",
      "titel": "Een werkende app op je eigen data",
      "tekst": "Live in een acceptatieomgeving, met echte gebruikers erin — geen klikbaar prototype."
    },
    {
      "icon": "git-branch",
      "titel": "Het procesontwerp op één plaat",
      "tekst": "Rollen, stappen en statussen zoals ze werkelijk lopen. Vaak het eerste moment dat iedereen hetzelfde plaatje ziet."
    },
    {
      "icon": "list-checks",
      "titel": "Een geprioriteerde backlog richting productie",
      "tekst": "Wat er nog nodig is aan koppelingen, security en beheer, met een reële inschatting van tijd."
    },
    {
      "icon": "folder-down",
      "titel": "Het projectbestand en de opname van de dag",
      "tekst": "Van jou. Je kunt zelf verder bouwen of het door een andere partij laten oppakken."
    },
    {
      "icon": "message-square-warning",
      "titel": "Een eerlijk oordeel",
      "tekst": "Ook als het antwoord “low-code is hier niet het juiste gereedschap” is. Dat zeggen we dan gewoon."
    }
  ],
  "meeneemtFoto": "/assets/photos/team-overleg-scherm.webp",
  "dagLabel": "De dag zelf",
  "dagTitel": "Van proces op tafel naar app in productieomgeving",
  "dagIntro": "We bouwen live, in dezelfde ruimte als jullie. Elke twee uur zie je iets werken, zodat bijsturen nog kan.",
  "dagSlots": [
    {
      "tijd": "09:00",
      "titel": "Proces op tafel",
      "tekst": "De mensen die het werk doen lopen hun proces door. Wij tekenen mee en stellen de vervelende vragen."
    },
    {
      "tijd": "10:00",
      "titel": "Scope vastzetten",
      "tekst": "Wat bouwen we vandaag wel en wat expliciet niet. Eén besluitvormer hakt de knopen door."
    },
    {
      "tijd": "10:30",
      "titel": "Bouwen, ronde één",
      "tekst": "Datamodel en schermen. Jullie kijken mee en zien de app onder je handen ontstaan."
    },
    {
      "tijd": "12:30",
      "titel": "Lunchdemo",
      "tekst": "Eerste keer klikken door de app. Wat niet klopt, gaat direct de middag in."
    },
    {
      "tijd": "13:15",
      "titel": "Bouwen, ronde twee",
      "tekst": "Logica, rollen en rechten, notificaties. Je eigen data gaat erin."
    },
    {
      "tijd": "15:30",
      "titel": "Testen met de gebruikers",
      "tekst": "De mensen die het straks doen, doen het nu. Kleine dingen fixen we ter plekke."
    },
    {
      "tijd": "16:15",
      "titel": "Demo aan stakeholders",
      "tekst": "Jullie geven zelf de demo. Dat werkt intern beter dan wanneer wij het doen."
    },
    {
      "tijd": "16:45",
      "titel": "Wat is er nodig voor productie",
      "tekst": "Backlog, inschatting en een eerlijk advies over de route erheen."
    }
  ],
  "voorbereidingIntro": "De dag valt of staat bij de voorbereiding. Twee weken vooraf hebben we één belafspraak van een half uur om het proces en de scope te kiezen.",
  "wijZorgen": [
    "Twee consultants: een Mendix-developer en een facilitator die het proces uit de groep haalt",
    "Een ingerichte ontwikkel- en acceptatieomgeving, klaar voor gebruik",
    "Een voorgesprek van dertig minuten om het proces te kiezen en de scope af te bakenen",
    "De oplevering: app, procesplaat, backlog en projectbestand"
  ],
  "jijZorgt": [
    "Eén proces dat pijn doet en in een dag te vatten is — wij helpen kiezen als je twijfelt",
    "De mensen die het proces echt uitvoeren, niet alleen hun leidinggevende",
    "Een besluitvormer die ter plekke ja of nee kan zeggen",
    "Een export van de huidige spreadsheet of een testset met representatieve data",
    "Een ruimte met een groot scherm en een dag zonder andere afspraken"
  ],
  "daarnaIntro": "App in a Day staat op zichzelf: je zit nergens aan vast. Wil je door, dan zijn dit de routes die het vaakst volgen.",
  "vervolg": [
    {
      "slug": "fusion-team-startsprint",
      "reden": "Vier weken waarin een businessexpert en onze developer samen bouwen — en de businessexpert het daarna zelf kan."
    },
    {
      "slug": "mendix-scale-sessie",
      "reden": "Al meerdere apps live? Dan is de vraag niet hoe je bouwt, maar hoe je schaalt zonder chaos."
    }
  ],
  "faqTitel": "Wat deelnemers vooraf vragen",
  "faq": [
    {
      "vraag": "Is de app die we bouwen van ons?",
      "antwoord": "Ja. Het projectbestand en alles wat we die dag maken is jouw eigendom, ook als je verder niets met ons doet."
    },
    {
      "vraag": "Hebben we Mendix-licenties nodig?",
      "antwoord": "Voor de dag zelf niet: we werken in onze omgeving. Wil je de app in productie nemen, dan zijn licenties nodig. We leggen vooraf uit wat dat ongeveer kost."
    },
    {
      "vraag": "Wat als het binnen één dag niet lukt?",
      "antwoord": "Dat komt zelden voor, omdat we vooraf samen de scope kiezen. Blijkt tijdens de dag dat het proces te groot is, dan knippen we het en leveren we het deel dat af is, plus een eerlijk beeld van de rest."
    },
    {
      "vraag": "Kan het op onze eigen Mendix-omgeving?",
      "antwoord": "Ja, als je die al hebt en we vooraf toegang krijgen. Vaak is onze omgeving sneller: geen wachten op accounts op de ochtend zelf."
    },
    {
      "vraag": "Hoeveel mensen kunnen erbij zijn?",
      "antwoord": "Zes tot tien. Minder werkt ook, meer niet: dan wordt het een presentatie in plaats van een werksessie."
    },
    {
      "vraag": "Kan dit ook met AI in plaats van Mendix?",
      "antwoord": "Dan is AI Agent in a Day de juiste variant: iedereen brengt één echte taak mee en gaat naar huis met een agent die die taak doet."
    }
  ],
  "ctaTitel": "Eén dag, één proces, een werkende app."
}$json$::jsonb
where slug = 'app-in-a-day';

-- AI Agent in a Day (22 sleutels)
update public.cms_services
set data = data || $json${
  "kop": "Iedereen gaat naar huis met een agent die zijn eigen taak doet.",
  "lead": "Eén dag, één echte taak per deelnemer. Aan het eind draait er voor iedereen een werkende agent — op jullie eigen documenten, systemen en werkwijze.",
  "feiten": [
    {
      "label": "Duur",
      "waarde": "Eén dag · 09:00–17:00"
    },
    {
      "label": "Deelnemers",
      "waarde": "Maximaal twaalf"
    },
    {
      "label": "Locatie",
      "waarde": "Bij jou of bij ons"
    }
  ],
  "prijsToelichting": "Exclusief licenties. Vaste prijs, ongeacht het aantal deelnemers tot twaalf.",
  "boekPunten": [
    "Twee begeleiders: een AI-engineer en een facilitator",
    "Een werkende agent per deelnemer",
    "Advies over wat wél en niet geschikt is voor een agent"
  ],
  "herkenIntro": "Voor teams die AI vooral kennen van demo's en nieuwsbrieven, en willen weten wat het met hún werk doet. Geen developers nodig.",
  "herken": [
    "Iedereen praat over AI, maar niemand hier heeft het ooit op ons eigen werk losgelaten.",
    "We hebben licenties gekocht en niemand gebruikt ze.",
    "Ik weet niet welke taken hiervoor geschikt zijn en welke niet."
  ],
  "meeneemtTitel": "Twaalf agents die morgen al werk schelen",
  "meeneemt": [
    {
      "icon": "bot",
      "titel": "Een werkende agent per deelnemer",
      "tekst": "Op een echte taak uit het eigen werk, met echte documenten en data."
    },
    {
      "icon": "scan-search",
      "titel": "Een lijst met kansrijke taken",
      "tekst": "Uit de dag rolt vanzelf een langere lijst dan de twaalf die je die dag doet."
    },
    {
      "icon": "shield-check",
      "titel": "De grens tussen geschikt en ongeschikt",
      "tekst": "Waar AI helpt, waar het risico geeft, en waar een mens moet blijven beslissen."
    },
    {
      "icon": "book-open",
      "titel": "Prompt- en werkafspraken",
      "tekst": "Vastgelegd, zodat wat werkt gedeeld kan worden in plaats van in iemands hoofd te blijven."
    },
    {
      "icon": "route",
      "titel": "Advies over de volgende stap",
      "tekst": "Van losse agents naar iets dat structureel in je processen zit."
    }
  ],
  "meeneemtFoto": "/assets/photos/team-overleg-scherm.webp",
  "dagLabel": "De dag zelf",
  "dagTitel": "Van eigen taak naar werkende agent",
  "dagIntro": "Kort uitleggen, lang doen. Na de eerste ronde bouwt iedereen zijn eigen agent, wij lopen rond.",
  "dagSlots": [
    {
      "tijd": "09:00",
      "titel": "Wat is een agent eigenlijk",
      "tekst": "Twintig minuten uitleg, en meteen een levend voorbeeld op jullie eigen situatie."
    },
    {
      "tijd": "09:45",
      "titel": "Taken kiezen",
      "tekst": "Iedereen legt een echte taak op tafel. Samen kiezen we per persoon de meest kansrijke."
    },
    {
      "tijd": "10:30",
      "titel": "Bouwen, ronde één",
      "tekst": "De eerste agent draait. Rommelig, maar hij doet iets."
    },
    {
      "tijd": "12:30",
      "titel": "Demo en kritiek",
      "tekst": "Iedereen laat zien wat er staat. Wat niet klopt, gaat de middag in."
    },
    {
      "tijd": "13:15",
      "titel": "Bouwen, ronde twee",
      "tekst": "Verfijnen: context, bronnen, controlestappen, wanneer een mens meekijkt."
    },
    {
      "tijd": "15:00",
      "titel": "Grenzen verkennen",
      "tekst": "We laten ook zien waar het misgaat — hallucinaties, AVG, dingen die je niet moet automatiseren."
    },
    {
      "tijd": "16:00",
      "titel": "Delen",
      "tekst": "Wat werkt gaat in een gedeelde bibliotheek, zodat de rest van de organisatie erop verder kan."
    },
    {
      "tijd": "16:40",
      "titel": "Vervolgstappen",
      "tekst": "Wat is er nodig om dit structureel te maken, en wat kost dat ongeveer."
    }
  ],
  "voorbereidingIntro": "Voorbereiding is licht, maar niet nul: hoe scherper de taken vooraf, hoe verder je die dag komt.",
  "wijZorgen": [
    "Een AI-engineer en een facilitator, de hele dag aanwezig",
    "Een werkomgeving met de benodigde AI-tooling, klaar voor gebruik",
    "Een korte voorbereidingsopdracht voor de deelnemers",
    "De gedeelde bibliotheek met alles wat die dag gemaakt is"
  ],
  "jijZorgt": [
    "Zes tot twaalf deelnemers die hun eigen werk goed kennen",
    "Per deelnemer één taak die tijd kost en zich herhaalt",
    "Voorbeelddocumenten of data waar de agents mee mogen werken",
    "Duidelijkheid over wat wel en niet in een AI-tool mag — of de bereidheid dat die dag te bepalen"
  ],
  "daarnaIntro": "Twaalf agents is een start, geen strategie. Dit zijn de logische vervolgen.",
  "vervolg": [
    {
      "slug": "ai-opportunity-scan",
      "reden": "Waar levert AI bij jullie echt geld op — en waar niet."
    },
    {
      "slug": "ai-strategie",
      "reden": "Verandert AI je verdienmodel of alleen je kosten? Die vraag hoort in de directiekamer."
    }
  ],
  "faqTitel": "Wat deelnemers vooraf vragen",
  "faq": [
    {
      "vraag": "Moeten deelnemers technisch zijn?",
      "antwoord": "Nee. De meest waardevolle deelnemers zijn mensen die hun proces goed kennen. Bouwen doen we samen."
    },
    {
      "vraag": "Werken de agents met onze eigen data?",
      "antwoord": "Ja, met de documenten en data die je die dag beschikbaar stelt. Wat er wel en niet in mag, spreken we vooraf af."
    },
    {
      "vraag": "Is dit AVG-proof?",
      "antwoord": "We werken standaard binnen een omgeving waarin je data niet gebruikt wordt voor training. Bij gevoelige data kiezen we vooraf de juiste opzet."
    },
    {
      "vraag": "Blijven de agents na de dag werken?",
      "antwoord": "Ja, binnen je eigen omgeving. Voor structureel gebruik met beheer en toegangsrechten is een vervolgstap nodig."
    },
    {
      "vraag": "Kan dit ook met Mendix-apps?",
      "antwoord": "Ja — dan is App in a Day waarschijnlijk het betere startpunt, of we combineren beide."
    }
  ],
  "ctaTitel": "Eén dag, twaalf mensen, twaalf werkende agents."
}$json$::jsonb
where slug = 'ai-agent-in-a-day';

-- AI Opportunity Scan (22 sleutels)
update public.cms_services
set data = data || $json${
  "kop": "Een halve dag, en je weet waar AI geld oplevert.",
  "lead": "We nemen je processen door met het team dat ze uitvoert, en zetten er cijfers bij. Aan het eind ligt er een korte lijst met kansen, gerangschikt op waarde en haalbaarheid — inclusief wat je beter niet doet.",
  "feiten": [
    {
      "label": "Duur",
      "waarde": "Halve dag"
    },
    {
      "label": "Deelnemers",
      "waarde": "Zes tot tien"
    },
    {
      "label": "Uitkomst",
      "waarde": "Gerangschikte kansenlijst"
    }
  ],
  "prijsToelichting": "Verrekenbaar bij een vervolgopdracht. De laagdrempeligste manier om met ons te beginnen.",
  "boekPunten": [
    "Eén AI-consultant, halve dag on site",
    "Kansen met een indicatie van waarde en inspanning",
    "Verrekenbaar als je doorgaat"
  ],
  "herkenIntro": "Voor teams die willen beginnen maar niet weten waar, en voor teams die al tien ideeën hebben en moeten kiezen.",
  "herken": [
    "We hebben een lijst met AI-ideeën, maar geen idee wat het oplevert.",
    "Elke afdeling roept iets anders, en niemand rekent het door.",
    "We willen niet de eerste zijn die vijf ton in een pilot stopt."
  ],
  "meeneemtTitel": "Een lijst waarop je een besluit kunt nemen",
  "meeneemt": [
    {
      "icon": "list-ordered",
      "titel": "Kansen op volgorde",
      "tekst": "Gerangschikt op verwachte waarde en benodigde inspanning, niet op wie het hardst riep."
    },
    {
      "icon": "calculator",
      "titel": "Een ruwe businesscase per kans",
      "tekst": "Uren, doorlooptijd of fouten — wat de kans raakt, met een orde van grootte erbij."
    },
    {
      "icon": "ban",
      "titel": "Een lijst met wat je níet moet doen",
      "tekst": "Vaak net zo waardevol: kansen die duur, riskant of gewoon onnodig blijken."
    },
    {
      "icon": "flag",
      "titel": "Eén voorstel om mee te beginnen",
      "tekst": "De kans met de beste verhouding tussen waarde en risico, uitgewerkt tot een concreet startpunt."
    },
    {
      "icon": "shield",
      "titel": "Aandachtspunten op data en AVG",
      "tekst": "Waar je tegen privacy, kwaliteit of eigenaarschap van data aanloopt."
    }
  ],
  "meeneemtFoto": "/assets/photos/overleg-lachend.webp",
  "dagLabel": "De sessie",
  "dagTitel": "Vier rondes in vier uur",
  "dagIntro": "Kort en scherp. We hebben aan een halve dag genoeg omdat we vooraf al in je processen hebben gekeken.",
  "dagSlots": [
    {
      "tijd": "Vooraf",
      "titel": "Documentendeling",
      "tekst": "We lezen ons in op je processen, zodat we niet met uitleg beginnen."
    },
    {
      "tijd": "13:00",
      "titel": "Processen op tafel",
      "tekst": "Waar gaat tijd in zitten, waar ontstaan fouten, waar wordt gewacht."
    },
    {
      "tijd": "14:00",
      "titel": "Kansen benoemen",
      "tekst": "Breed en zonder filter — eerst verzamelen, dan pas oordelen."
    },
    {
      "tijd": "15:00",
      "titel": "Waarderen",
      "tekst": "Per kans: wat levert het op, wat kost het, en wat is het risico."
    },
    {
      "tijd": "16:00",
      "titel": "Rangschikken en kiezen",
      "tekst": "De lijst op volgorde, en één kans die we uitwerken tot een startpunt."
    },
    {
      "tijd": "16:45",
      "titel": "Afspraken",
      "tekst": "Wie pakt wat op, en wanneer kijken we terug."
    }
  ],
  "voorbereidingIntro": "Een week vooraf sturen we een korte vragenlijst en vragen we wat procesdocumentatie op. Dat scheelt een uur inventariseren.",
  "wijZorgen": [
    "Een AI-consultant met ervaring in jouw sector",
    "Voorbereiding op basis van je procesdocumentatie",
    "De uitgewerkte kansenlijst binnen vijf werkdagen",
    "Verrekening van de kosten als je binnen drie maanden doorgaat"
  ],
  "jijZorgt": [
    "Zes tot tien mensen die de processen uitvoeren en aansturen",
    "Beschikbare procesdocumentatie of cijfers over doorlooptijd en volume",
    "Iemand die iets kan zeggen over data en privacy",
    "Openheid over wat er nu misgaat — daar zitten de kansen"
  ],
  "daarnaIntro": "De scan wijst de richting. Wat je daarna doet hangt af van waar de kans zit.",
  "vervolg": [
    {
      "slug": "ai-agent-in-a-day",
      "reden": "Snel laten zien dat het werkt, met het team dat het gaat gebruiken."
    },
    {
      "slug": "ai-strategie",
      "reden": "Als de kansen je verdienmodel raken en niet alleen je kosten."
    }
  ],
  "faqTitel": "Wat opdrachtgevers vooraf vragen",
  "faq": [
    {
      "vraag": "Waarom zo goedkoop?",
      "antwoord": "Omdat het bedoeld is als kennismaking met echte inhoud. Bevalt het, dan verrekenen we het bij een vervolgopdracht."
    },
    {
      "vraag": "Krijgen we een rapport?",
      "antwoord": "Een korte: de kansenlijst met per kans een halve pagina. Geen dertig pagina's marktcontext."
    },
    {
      "vraag": "Wat als de uitkomst is dat AI niets oplevert?",
      "antwoord": "Dan zeggen we dat. Dat is ook een uitkomst waar je een half jaar discussie mee bespaart."
    },
    {
      "vraag": "Moeten we al data op orde hebben?",
      "antwoord": "Nee. Sterker: hoe je data ervoor staat is vaak juist een van de uitkomsten."
    },
    {
      "vraag": "Kan dit online?",
      "antwoord": "Kan, maar we raden het af. De waarde zit in de discussie tussen afdelingen, en die loopt online stroever."
    }
  ],
  "ctaTitel": "Een halve dag, en de discussie over AI gaat over cijfers."
}$json$::jsonb
where slug = 'ai-opportunity-scan';

-- AI-strategie (21 sleutels)
update public.cms_services
set data = data || $json${
  "kop": "Verandert AI jullie verdienmodel, of alleen jullie kosten?",
  "lead": "Een sessie met directie en management over de vraag die onder alle AI-plannen ligt: waar raakt dit onze markt en ons aanbod, en waar is het alleen een efficiëntieslag.",
  "feiten": [
    {
      "label": "Duur",
      "waarde": "Halve of hele dag"
    },
    {
      "label": "Deelnemers",
      "waarde": "Vijf tot twaalf"
    },
    {
      "label": "Niveau",
      "waarde": "Directie en MT"
    }
  ],
  "boekPunten": [
    "Twee begeleiders: strategie en AI-inhoud",
    "Sectorspecifieke voorbeelden, geen algemene trendpraat",
    "Een standpunt waar het MT achter staat"
  ],
  "herkenIntro": "Voor directies die merken dat AI in elk overleg opduikt zonder dat iemand de strategische vraag stelt.",
  "herken": [
    "Onze concurrent roept van alles over AI en wij weten niet of dat serieus is.",
    "Elke afdeling heeft een eigen AI-initiatief en niemand ziet het geheel.",
    "Wij willen weten of dit ons businessmodel raakt of alleen onze kostprijs."
  ],
  "meeneemtTitel": "Een standpunt in plaats van een gevoel",
  "meeneemt": [
    {
      "icon": "scale",
      "titel": "Onderscheid tussen verdienmodel en efficiëntie",
      "tekst": "Twee heel verschillende gesprekken, die nu vaak door elkaar lopen."
    },
    {
      "icon": "telescope",
      "titel": "Een beeld van je markt over drie jaar",
      "tekst": "Wat verandert er in klantverwachting, prijsstelling en concurrentie als AI doorzet."
    },
    {
      "icon": "flag",
      "titel": "Drie strategische keuzes",
      "tekst": "Waar zet je op in, waar wacht je bewust af, en wat besteed je uit."
    },
    {
      "icon": "users",
      "titel": "Eén standpunt van het MT",
      "tekst": "Zodat je organisatie hetzelfde verhaal hoort, ongeacht wie het vertelt."
    },
    {
      "icon": "map",
      "titel": "Een eerste roadmap op hoofdlijnen",
      "tekst": "Wat je dit jaar doet, en wat het volgende jaar pas aan de orde is."
    }
  ],
  "meeneemtFoto": "/assets/photos/team-presentatie-breed.webp",
  "dagLabel": "De sessie",
  "dagTitel": "Van losse initiatieven naar één standpunt",
  "dagIntro": "We brengen voorbeelden uit jouw sector mee, inclusief de mislukkingen. Dat maakt het gesprek scherper dan een presentatie over mogelijkheden.",
  "dagSlots": [
    {
      "tijd": "Blok 1",
      "titel": "Wat er echt gebeurt in jullie markt",
      "tekst": "Concrete voorbeelden uit je sector, inclusief wat er niet werkte."
    },
    {
      "tijd": "Blok 2",
      "titel": "Waar raakt het jullie",
      "tekst": "Per onderdeel van je waardeketen: verdienmodel, kosten of niets."
    },
    {
      "tijd": "Blok 3",
      "titel": "Scenario's",
      "tekst": "Wat als een nieuwkomer dit morgen goed doet? En wat als het tegenvalt?"
    },
    {
      "tijd": "Blok 4",
      "titel": "Keuzes maken",
      "tekst": "Waar zet je op in, waar wacht je, en wat betekent dat voor budget en mensen."
    },
    {
      "tijd": "Blok 5",
      "titel": "Het verhaal",
      "tekst": "Hoe je dit uitlegt aan je organisatie, klanten en aandeelhouders."
    },
    {
      "tijd": "Na afloop",
      "titel": "Uitwerking",
      "tekst": "Bij een hele dag: het standpunt en de roadmap uitgewerkt op vijf pagina's."
    }
  ],
  "voorbereidingIntro": "We bereiden voor op jouw sector en jouw cijfers. Eén voorgesprek met de bestuurder die de sessie belegt is voldoende.",
  "wijZorgen": [
    "Een strateeg en een AI-specialist, samen aan tafel",
    "Sectoronderzoek en concrete voorbeelden uit vergelijkbare organisaties",
    "Facilitatie die zorgt dat ook de stille deelnemers iets zeggen",
    "Bij een hele dag: het standpunt en de roadmap uitgewerkt"
  ],
  "jijZorgt": [
    "De mensen die over strategie en budget gaan — vijf tot twaalf",
    "Inzicht in je huidige verdienmodel en de belangrijkste kostenposten",
    "Eén voorgesprek van een half uur ter voorbereiding",
    "De bereidheid om ook te besluiten waar je níet op inzet"
  ],
  "daarnaIntro": "Een standpunt is pas iets waard als het landt in keuzes over systemen, mensen en geld.",
  "vervolg": [
    {
      "slug": "it-strategie",
      "reden": "De vertaling naar je IT-landschap en deliverymodel."
    },
    {
      "slug": "ai-opportunity-scan",
      "reden": "De operationele kant: waar levert het concreet geld op."
    },
    {
      "slug": "ai-agent-in-a-day",
      "reden": "Laten zien wat het is, aan de mensen die het moeten gaan gebruiken."
    }
  ],
  "faqTitel": "Wat bestuurders vooraf vragen",
  "faq": [
    {
      "vraag": "Krijgen we een AI-strategie op papier?",
      "antwoord": "Bij een hele dag krijg je het standpunt en de roadmap uitgewerkt. Bij een dagdeel is de uitkomst de gedeelde conclusie, niet een document."
    },
    {
      "vraag": "Is dit een technische sessie?",
      "antwoord": "Nee. Er komt techniek voorbij, maar de vragen zijn strategisch: markt, verdienmodel, positionering."
    },
    {
      "vraag": "Wij lopen al achter. Is dit dan niet te laat?",
      "antwoord": "Nee. In de meeste sectoren is de belangrijkste keuze nog niet gemaakt, en achterlopers hebben het voordeel dat ze zien wat niet werkte."
    },
    {
      "vraag": "Kunnen we dit combineren met een MT-heisessie?",
      "antwoord": "Ja, dat doen we regelmatig. Dan is het dagdeel het inhoudelijke blok van jullie eigen programma."
    },
    {
      "vraag": "Wat als het MT het oneens is?",
      "antwoord": "Dan is dat de belangrijkste opbrengst van de dag. Wij helpen het verschil scherp te krijgen in plaats van het weg te praten."
    }
  ],
  "ctaTitel": "Eén sessie, en het MT spreekt met één mond over AI."
}$json$::jsonb
where slug = 'ai-strategie';

-- IT-strategie op low-code en AI (22 sleutels)
update public.cms_services
set data = data || $json${
  "kop": "Waar zet je low-code en AI in — en waar juist niet.",
  "lead": "In twee tot drie weken brengen we je applicatielandschap, je deliverymodel en je ambities bij elkaar in één plan: wat bouw je zelf, wat koop je, wat bouw je met low-code, en welke teams horen daarbij.",
  "feiten": [
    {
      "label": "Duur",
      "waarde": "Twee tot drie weken"
    },
    {
      "label": "Vorm",
      "waarde": "Interviews en werksessies"
    },
    {
      "label": "Uitkomst",
      "waarde": "Geprioriteerde roadmap"
    }
  ],
  "prijsToelichting": "Afhankelijk van de omvang van het landschap en het aantal betrokken afdelingen.",
  "boekPunten": [
    "Interviews met business, IT en architectuur",
    "Applicatielandschap in kaart, inclusief schaduw-IT",
    "Roadmap met businesscase per initiatief"
  ],
  "herkenIntro": "Voor IT-managers en CIO's die willen dat low-code en AI ergens op slaan in plaats van los rondzwerven.",
  "herken": [
    "We hebben low-code, maar het is nooit een keuze geweest — het gebeurde gewoon.",
    "Elke afdeling koopt zijn eigen pakket en wij mogen het koppelen.",
    "Ik moet volgend jaar budget verantwoorden en heb geen verhaal."
  ],
  "meeneemtTitel": "Een plan waarmee je budget kunt verantwoorden",
  "meeneemt": [
    {
      "icon": "map",
      "titel": "Je applicatielandschap in kaart",
      "tekst": "Inclusief wat er buiten IT om is aangeschaft. Dat plaatje alleen al is vaak confronterend."
    },
    {
      "icon": "git-fork",
      "titel": "Bouwen, kopen of low-code",
      "tekst": "Een beslisregel die je ook bij het volgende verzoek kunt toepassen, in plaats van per geval discussiëren."
    },
    {
      "icon": "users",
      "titel": "Het deliverymodel dat erbij hoort",
      "tekst": "Welke teams, welke rollen, wat centraal en wat bij de business."
    },
    {
      "icon": "list-ordered",
      "titel": "Een geprioriteerde roadmap",
      "tekst": "Met per initiatief een businesscase op hoofdlijnen: opbrengst, kosten, risico."
    },
    {
      "icon": "presentation",
      "titel": "Een verhaal voor de board",
      "tekst": "Dezelfde inhoud, in de taal waarin budget wordt toegekend."
    }
  ],
  "meeneemtFoto": "/assets/photos/klantgesprek-tafel.webp",
  "dagLabel": "De weken",
  "dagTitel": "Interviews, analyse, keuzes",
  "dagIntro": "Wij doen het werk, jullie leveren tijd voor gesprekken en één werksessie. Geen maandenlang traject met een stuurgroep.",
  "dagSlots": [
    {
      "tijd": "Week 1",
      "titel": "Interviews",
      "tekst": "Tien tot vijftien gesprekken met business, IT, architectuur en security."
    },
    {
      "tijd": "Week 1",
      "titel": "Landschap in kaart",
      "tekst": "Applicaties, koppelingen, kosten en eigenaarschap — inclusief wat er buiten IT om loopt."
    },
    {
      "tijd": "Week 2",
      "titel": "Analyse en scenario's",
      "tekst": "Waar zit overlap, waar zit risico, en welke deliverymodellen passen bij jullie omvang."
    },
    {
      "tijd": "Week 2",
      "titel": "Werksessie",
      "tekst": "We leggen de scenario's voor, jullie kiezen richting."
    },
    {
      "tijd": "Week 3",
      "titel": "Roadmap en businesscases",
      "tekst": "Initiatieven op volgorde, met kosten en opbrengsten per initiatief."
    },
    {
      "tijd": "Week 3",
      "titel": "Presentatie",
      "tekst": "Aan MT of board, door ons of door jou — wat intern het beste werkt."
    }
  ],
  "voorbereidingIntro": "Het meeste werk ligt bij ons. Wat we van jou nodig hebben is toegang tot mensen en informatie, snel.",
  "wijZorgen": [
    "Een strateeg en een architect, twee tot drie weken beschikbaar",
    "Alle interviews, analyse en uitwerking",
    "Een roadmap met businesscase per initiatief",
    "De presentatie aan MT of board"
  ],
  "jijZorgt": [
    "Beschikbaarheid van tien tot vijftien mensen voor een uur",
    "Inzicht in je huidige applicatiekosten en contracten",
    "Een opdrachtgever die knopen kan doorhakken in de werksessie",
    "Openheid over wat er nu niet werkt — ook als dat politiek gevoelig ligt"
  ],
  "daarnaIntro": "Een roadmap is pas iets waard als de eerste stap gezet wordt. Die stap staat meestal in dit rijtje.",
  "vervolg": [
    {
      "slug": "mendix-scale-sessie",
      "reden": "Als je al bouwt en de vraag over opschalen gaat."
    },
    {
      "slug": "training-enablement",
      "reden": "Als het plan vraagt om mensen die je nog niet in huis hebt."
    }
  ],
  "faqTitel": "Wat CIO's en IT-managers vragen",
  "faq": [
    {
      "vraag": "Is dit niet gewoon een adviesrapport?",
      "antwoord": "Het verschil zit in de scope en de tijd: drie weken, geprioriteerd, met businesscases. En wij blijven beschikbaar als het uitgevoerd moet worden."
    },
    {
      "vraag": "Zijn jullie niet gekleurd, als Mendix-partner?",
      "antwoord": "Deels: we kennen low-code goed. Daarom staat in elk advies expliciet waar low-code níet het antwoord is — dat is meestal het nuttigste deel."
    },
    {
      "vraag": "Kunnen jullie ook de uitvoering doen?",
      "antwoord": "Ja, maar dat is geen voorwaarde. Het plan is zo geschreven dat een andere partij het ook kan uitvoeren."
    },
    {
      "vraag": "Wat als de uitkomst is dat we moeten stoppen met een platform?",
      "antwoord": "Dan staat dat erin. Sunk cost is een slechte adviseur en dat schrijven we ook zo op."
    },
    {
      "vraag": "Hoeveel tijd kost het ons?",
      "antwoord": "Reken op een uur per geïnterviewde, een dagdeel voor de werksessie en een uur voor de presentatie."
    }
  ],
  "ctaTitel": "Drie weken, en je weet wat je bouwt, koopt en laat."
}$json$::jsonb
where slug = 'it-strategie';

-- Mendix Scale Sessie (22 sleutels)
update public.cms_services
set data = data || $json${
  "kop": "Van tien apps naar een portfolio dat je kunt dragen.",
  "lead": "Eén dag met je belangrijkste stakeholders: waar staat je low-codeteam vandaag, waar wil je over twee tot drie jaar staan, en wat breekt er als eerste als je verdubbelt.",
  "feiten": [
    {
      "label": "Duur",
      "waarde": "Eén dag"
    },
    {
      "label": "Deelnemers",
      "waarde": "Acht tot vijftien"
    },
    {
      "label": "Uitkomst",
      "waarde": "Gekozen route"
    }
  ],
  "prijsToelichting": "Afhankelijk van de omvang van de groep. Inclusief voorbereiding en verslaglegging.",
  "boekPunten": [
    "Twee facilitators met schaalervaring",
    "Analyse op business value, delivery en platform",
    "Twee routes naast elkaar, jullie kiezen"
  ],
  "herkenIntro": "Voor organisaties die al met Mendix bouwen en merken dat de volgende stap niet vanzelf komt: meer teams, meer apps, meer vragen over eigenaarschap.",
  "herken": [
    "We hebben tien apps live en niemand weet wie eigenaar is van het platform.",
    "Elk nieuw team vindt het wiel opnieuw uit.",
    "De business wil sneller, security wil trager, en wij zitten ertussen."
  ],
  "meeneemtTitel": "Een gekozen route, geen rapport",
  "meeneemt": [
    {
      "icon": "layers",
      "titel": "Een foto van waar je nu staat",
      "tekst": "Op drie lagen: business value, delivery en teams, platform en governance."
    },
    {
      "icon": "target",
      "titel": "De doelsituatie over twee tot drie jaar",
      "tekst": "Concreet gemaakt: hoeveel teams, hoeveel apps, welke rollen, welke doorlooptijd."
    },
    {
      "icon": "route",
      "titel": "Twee routes ernaartoe, naast elkaar",
      "tekst": "Met kosten, risico en snelheid per route. Het team kiest er één, ter plekke."
    },
    {
      "icon": "alert-triangle",
      "titel": "De obstakels benoemd",
      "tekst": "Wat er misgaat als je niets verandert, en wie daar iets aan kan doen."
    },
    {
      "icon": "handshake",
      "titel": "Commitment in plaats van een rapport",
      "tekst": "Iedereen die het besluit moet dragen zat aan tafel en heeft ja gezegd."
    }
  ],
  "meeneemtFoto": "/assets/photos/klantgesprek-tafel.webp",
  "dagLabel": "De dag zelf",
  "dagTitel": "Van huidige situatie naar gekozen route in één dag",
  "dagIntro": "We werken met de hele groep, maar hakken knopen door in kleine sessies. Geen presentaties van onze kant langer dan tien minuten.",
  "dagSlots": [
    {
      "tijd": "09:00",
      "titel": "Waar staan we",
      "tekst": "Elke laag krijgt zijn eigen ronde: wat werkt, wat knelt, wat weten we niet."
    },
    {
      "tijd": "10:30",
      "titel": "De pijn kwantificeren",
      "tekst": "Doorlooptijd, herbouw, incidenten. Zonder cijfers blijft het een mening."
    },
    {
      "tijd": "11:30",
      "titel": "De stip op de horizon",
      "tekst": "Waar wil je staan, en waarom dan. De board-versie én de teamversie."
    },
    {
      "tijd": "13:00",
      "titel": "Gap-analyse",
      "tekst": "Wat er tussen nu en dan zit aan rollen, standaarden en platformwerk."
    },
    {
      "tijd": "14:15",
      "titel": "Twee routes uitwerken",
      "tekst": "Snel opschalen versus eerst fundering. We rekenen beide door."
    },
    {
      "tijd": "15:30",
      "titel": "Kiezen",
      "tekst": "Eén route, met de obstakels erbij benoemd."
    },
    {
      "tijd": "16:15",
      "titel": "Wie doet wat",
      "tekst": "Eigenaarschap per obstakel, met een datum."
    },
    {
      "tijd": "16:45",
      "titel": "Afsluiten",
      "tekst": "Samenvatting op één plaat, meteen deelbaar intern."
    }
  ],
  "voorbereidingIntro": "De waarde van de dag zit in wie er zit. Vooraf hebben we twee korte gesprekken om de juiste mensen aan tafel te krijgen.",
  "wijZorgen": [
    "Twee facilitators met ervaring in schaaltrajecten bij vergelijkbare organisaties",
    "Een vragenlijst vooraf, zodat we de dag niet met inventariseren beginnen",
    "Verslaglegging op één plaat plus een uitgewerkte routebeschrijving",
    "Een terugkoppelmoment twee weken later, kosteloos"
  ],
  "jijZorgt": [
    "De mensen die over budget, platform en teams gaan — allemaal op dezelfde dag",
    "Een lijst van je huidige apps met eigenaar en status",
    "Inzicht in je teamsamenstelling en je Mendix-licentiemodel",
    "Bereidheid om die dag ook echt een keuze te maken"
  ],
  "daarnaIntro": "De route die je kiest bepaalt de vervolgstap. Dit zijn de twee die het vaakst uit een Scale Sessie komen.",
  "vervolg": [
    {
      "slug": "fusion-team-startsprint",
      "reden": "Eerst capaciteit: businessexperts leren zelf bouwen naast onze developer."
    },
    {
      "slug": "training-enablement",
      "reden": "Eerst kennis: je eigen mensen naar het niveau dat de route vraagt."
    }
  ],
  "faqTitel": "Wat deelnemers vooraf vragen",
  "faq": [
    {
      "vraag": "Is dit niet gewoon een verkapt verkoopgesprek?",
      "antwoord": "Nee. Je betaalt ervoor, dus we werken voor jou. In een deel van de sessies is de uitkomst dat je het zelf kunt, en dat zeggen we dan ook."
    },
    {
      "vraag": "Wij hebben al een Center of Excellence. Wat voegt dit toe?",
      "antwoord": "Meestal ontbreekt niet de wil maar de structuur. We brengen het App Factory-model en de ervaring van organisaties die dezelfde groei doormaakten."
    },
    {
      "vraag": "Kan dit ook in een halve dag?",
      "antwoord": "Kan, maar dan sneuvelt de routekeuze. Onze ervaring is dat juist het kiezen tijd kost."
    },
    {
      "vraag": "Wie moet er echt bij zijn?",
      "antwoord": "De budgethouder, de platform- of architectuurverantwoordelijke, en minimaal één product owner uit de business."
    },
    {
      "vraag": "Krijgen we ook een schriftelijk advies?",
      "antwoord": "Ja, maar kort: één plaat met de huidige en doelsituatie, plus de gekozen route met obstakels en eigenaren."
    }
  ],
  "ctaTitel": "Eén dag, en je weet welke route je neemt."
}$json$::jsonb
where slug = 'mendix-scale-sessie';

-- Fusion Team Startsprint (22 sleutels)
update public.cms_services
set data = data || $json${
  "kop": "Je businessexpert bouwt straks zelf.",
  "lead": "Vier weken waarin iemand uit jouw business en onze developer samen aan één echte applicatie bouwen. Aan het eind staat de app live én kan die businessexpert zelfstandig verder.",
  "feiten": [
    {
      "label": "Duur",
      "waarde": "Vier weken"
    },
    {
      "label": "Bezetting",
      "waarde": "Eén expert van jou, één developer van ons"
    },
    {
      "label": "Uitkomst",
      "waarde": "App live + iemand die kan bouwen"
    }
  ],
  "prijsToelichting": "Afhankelijk van complexiteit en aantal koppelingen. Vaste prijs na de intake.",
  "boekPunten": [
    "Eén Mendix-developer, vier weken naast je expert",
    "Een werkende applicatie in productie",
    "Je expert is daarna zelfstandig genoeg om door te bouwen"
  ],
  "herkenIntro": "Voor organisaties die niet elke wijziging willen uitbesteden, maar wel snelheid nodig hebben. De klassieke fusion team-aanpak: business en IT bouwen samen.",
  "herken": [
    "Voor elke kleine wijziging moeten we weer een leverancier inschakelen.",
    "Onze mensen kennen het proces beter dan welke consultant dan ook.",
    "We willen zelf kunnen bouwen, maar niemand weet waar te beginnen."
  ],
  "meeneemtTitel": "Een app in productie én een collega die het kan",
  "meeneemt": [
    {
      "icon": "app-window",
      "titel": "Een applicatie in productie",
      "tekst": "Geen oefencasus: we bouwen iets dat jullie echt nodig hebben, met echte gebruikers."
    },
    {
      "icon": "graduation-cap",
      "titel": "Een businessexpert die zelfstandig bouwt",
      "tekst": "Leren door te doen, elke dag samen aan hetzelfde scherm. Geen cursus met oefenopdrachten."
    },
    {
      "icon": "book-open",
      "titel": "Werkafspraken op papier",
      "tekst": "Hoe je wijzigingen doorvoert, test en uitrolt — het handboek voor wat er na de vier weken komt."
    },
    {
      "icon": "git-branch",
      "titel": "Een ingerichte straat",
      "tekst": "Omgevingen, versiebeheer en deployment staan klaar en zijn overgedragen."
    },
    {
      "icon": "compass",
      "titel": "Een eerlijk beeld van het vervolg",
      "tekst": "Wat je expert wél en niet zelf moet doen, en wanneer je er beter een developer bij haalt."
    }
  ],
  "meeneemtFoto": "/assets/photos/overleg-laptop.webp",
  "dagLabel": "De vier weken",
  "dagTitel": "Elke week een stuk meer op eigen benen",
  "dagIntro": "De verhouding verschuift bewust: week één stuurt onze developer, week vier stuurt jouw expert en kijken wij mee.",
  "dagSlots": [
    {
      "tijd": "Week 0",
      "titel": "Intake en keuze",
      "tekst": "We kiezen de applicatie en de persoon. Beide bepalen of dit slaagt."
    },
    {
      "tijd": "Week 1",
      "titel": "Samen ontwerpen en starten",
      "tekst": "Datamodel, schermen en de eerste werkende versie. Onze developer aan het stuur."
    },
    {
      "tijd": "Week 2",
      "titel": "Samen bouwen",
      "tekst": "Logica, rollen en koppelingen. Je expert bouwt mee, wij reviewen alles."
    },
    {
      "tijd": "Week 3",
      "titel": "Omdraaien",
      "tekst": "Je expert bouwt, wij kijken mee en grijpen alleen in waar het echt moet."
    },
    {
      "tijd": "Week 4",
      "titel": "Live en overdragen",
      "tekst": "Testen met gebruikers, naar productie, werkafspraken vastleggen."
    },
    {
      "tijd": "Week 6",
      "titel": "Terugkomdag",
      "tekst": "Twee weken later: hoe gaat het zelfstandig, en waar loop je vast?"
    }
  ],
  "voorbereidingIntro": "Deze sprint valt of staat bij de persoon die je vrijmaakt. Liever iemand met procesverstand en nieuwsgierigheid dan iemand die toevallig tijd heeft.",
  "wijZorgen": [
    "Eén ervaren Mendix-developer, vier weken beschikbaar voor jullie",
    "Een ingerichte omgeving met versiebeheer en deploymentstraat",
    "Reviews en werkafspraken die na de sprint blijven gelden",
    "Een terugkomdag twee weken na oplevering"
  ],
  "jijZorgt": [
    "Eén businessexpert die minimaal drie dagen per week vrij is — geen halve inzet",
    "Een applicatie die echt nodig is en binnen vier weken haalbaar",
    "Toegang tot de systemen waarmee gekoppeld moet worden",
    "Een opdrachtgever die knopen doorhakt als de scope onder druk komt"
  ],
  "daarnaIntro": "Na de sprint kan je expert door. De vraag wordt dan: hoe houd je dat vol, en hoe voorkom je dat app twee weer van nul begint.",
  "vervolg": [
    {
      "slug": "training-enablement",
      "reden": "Verdieping voor je expert en de collega's die willen volgen."
    },
    {
      "slug": "mendix-scale-sessie",
      "reden": "Meerdere teams? Dan is de vraag hoe je schaalt zonder chaos."
    }
  ],
  "faqTitel": "Wat opdrachtgevers vooraf vragen",
  "faq": [
    {
      "vraag": "Wat als onze expert het niet blijkt te kunnen?",
      "antwoord": "Dat merken we in week één en dan zeggen we het meteen. Soms is de conclusie dat een andere collega beter past — wisselen kan in de eerste week."
    },
    {
      "vraag": "Is vier weken genoeg om te leren bouwen?",
      "antwoord": "Genoeg om zelfstandig te onderhouden en uit te breiden, niet om architect te worden. We zijn daar eerlijk over in de intake."
    },
    {
      "vraag": "Moet de expert kunnen programmeren?",
      "antwoord": "Nee. Procesverstand en zin om te leren wegen zwaarder. Mendix is low-code, maar denken in data en logica moet je wel leuk vinden."
    },
    {
      "vraag": "Hebben we Mendix-licenties nodig?",
      "antwoord": "Ja, voor productie wel. We adviseren over het licentiemodel dat bij jullie omvang past."
    },
    {
      "vraag": "Kan de sprint ook met twee eigen mensen?",
      "antwoord": "Kan, tegen meerkosten. Onze ervaring is dat één persoon die er echt tijd voor heeft, meer oplevert dan twee die het erbij doen."
    }
  ],
  "ctaTitel": "Vier weken, en je hebt iemand in huis die kan bouwen."
}$json$::jsonb
where slug = 'fusion-team-startsprint';

-- Training & Enablement (22 sleutels)
update public.cms_services
set data = data || $json${
  "kop": "Je eigen mensen zover krijgen dat ze het dragen.",
  "lead": "Losse dagblokken over Mendix, AI en de manier van werken eromheen — of een vaste coach die één dag per week meeloopt met je teams. Altijd op jullie eigen projecten, nooit op oefencasussen.",
  "feiten": [
    {
      "label": "Vorm",
      "waarde": "Losse blokken of vaste coach"
    },
    {
      "label": "Groepsgrootte",
      "waarde": "Tot tien deelnemers"
    },
    {
      "label": "Locatie",
      "waarde": "Bij jou op kantoor"
    }
  ],
  "prijsToelichting": "Per dagblok, tot tien deelnemers. Doorlopende coaching op dagbasis, in overleg.",
  "boekPunten": [
    "Trainers die zelf bouwen, geen fulltime docenten",
    "Op jullie eigen code en projecten",
    "Modulair: je kiest alleen de blokken die je nodig hebt"
  ],
  "herkenIntro": "Voor organisaties die willen dat hun eigen mensen het overnemen — en gemerkt hebben dat een standaardcursus daar niet voor zorgt.",
  "herken": [
    "Onze mensen hebben de officiële cursus gedaan en kunnen nog steeds niet zelfstandig bouwen.",
    "Alle kennis zit bij twee mensen en één daarvan gaat weg.",
    "We willen niet afhankelijk blijven van externen voor elke wijziging."
  ],
  "meeneemtTitel": "Mensen die het daarna zelf doen",
  "meeneemt": [
    {
      "icon": "graduation-cap",
      "titel": "Vaardigheid op je eigen projecten",
      "tekst": "We trainen op jullie code en jullie processen, dus wat je leert is meteen toepasbaar."
    },
    {
      "icon": "layout-grid",
      "titel": "Een leerpad per rol",
      "tekst": "Developer, product owner, tester en beheerder hebben elk iets anders nodig."
    },
    {
      "icon": "clipboard-check",
      "titel": "Werkafspraken en standaarden",
      "tekst": "Niet alleen bouwen, ook hoe je reviewt, test en documenteert."
    },
    {
      "icon": "user-check",
      "titel": "Een interne kennisdrager",
      "tekst": "Iemand die na afloop het aanspreekpunt is, met een plan om dat vol te houden."
    },
    {
      "icon": "refresh-cw",
      "titel": "Terugkommomenten",
      "tekst": "Kennis zakt weg. We komen terug op de momenten dat het ertoe doet."
    }
  ],
  "meeneemtFoto": "/assets/photos/team-presentatie-breed.webp",
  "dagLabel": "De blokken",
  "dagTitel": "Kies de blokken die je nodig hebt",
  "dagIntro": "Elk blok is een dag, op jullie locatie, met maximaal tien deelnemers. Of neem een vaste coach die één dag per week meeloopt.",
  "dagSlots": [
    {
      "tijd": "Blok A",
      "titel": "Mendix fundamentals",
      "tekst": "Voor nieuwe teamleden: datamodel, logica, schermen, en hoe je het níet doet."
    },
    {
      "tijd": "Blok B",
      "titel": "Gevorderd bouwen",
      "tekst": "Performance, koppelingen, herbruikbaarheid en de standaarden van jullie fundering."
    },
    {
      "tijd": "Blok C",
      "titel": "Product owner in low-code",
      "tekst": "Backlog, scope en prioritering als er wekelijks opgeleverd kan worden."
    },
    {
      "tijd": "Blok D",
      "titel": "AI in het werkproces",
      "tekst": "Wat je team veilig en zinvol met AI kan doen, op eigen taken."
    },
    {
      "tijd": "Blok E",
      "titel": "Testen en beheer",
      "tekst": "Regressie, releaseproces en hoe je een groeiend portfolio beheersbaar houdt."
    },
    {
      "tijd": "Coaching",
      "titel": "Eén dag per week",
      "tekst": "Een vaste coach die meeloopt in je sprints en bijstuurt terwijl het gebeurt."
    }
  ],
  "voorbereidingIntro": "We passen elk blok aan op jullie situatie. Daarvoor kijken we vooraf mee in jullie projecten.",
  "wijZorgen": [
    "Trainers die zelf projecten doen, geen fulltime docenten",
    "Materiaal afgestemd op jullie code en werkwijze",
    "Een leerpad per rol, in overleg samengesteld",
    "Terugkommomenten en een aanspreekpunt na afloop"
  ],
  "jijZorgt": [
    "Groepen van maximaal tien, ingedeeld op rol en niveau",
    "Een ruimte waar een dag geconcentreerd gewerkt kan worden",
    "Toegang tot jullie eigen projecten en omgevingen",
    "Deelnemers die die dag echt vrij zijn van operationeel werk"
  ],
  "daarnaIntro": "Training werkt het best als hij ergens op landt: een fundering, een team of een plan.",
  "vervolg": [
    {
      "slug": "fusion-team-startsprint",
      "reden": "Leren door vier weken samen te bouwen aan iets echts."
    },
    {
      "slug": "mendix-scale-sessie",
      "reden": "Als de vraag groter is dan kennis alleen."
    }
  ],
  "faqTitel": "Wat opleidingsverantwoordelijken vragen",
  "faq": [
    {
      "vraag": "Waarin verschilt dit van de officiële Mendix-training?",
      "antwoord": "Die leert je het platform, wij leren je bouwen binnen jullie context: jullie standaarden, jullie koppelingen, jullie processen. Vaak is de combinatie het beste."
    },
    {
      "vraag": "Kunnen we losse blokken afnemen?",
      "antwoord": "Ja, dat is het uitgangspunt. Veel klanten beginnen met één blok en breiden uit."
    },
    {
      "vraag": "Hoe groot mag een groep zijn?",
      "antwoord": "Tien is het maximum. Daarboven wordt het een presentatie in plaats van een werksessie."
    },
    {
      "vraag": "Werken jullie met certificering?",
      "antwoord": "We leiden op richting Mendix-certificering waar dat gevraagd wordt, maar het doel is zelfstandig kunnen bouwen, niet het papiertje."
    },
    {
      "vraag": "Wat kost een vaste coach?",
      "antwoord": "Dat rekenen we op dagbasis, afhankelijk van seniority en frequentie. In een kennismaking maken we daar snel een reële inschatting van."
    }
  ],
  "ctaTitel": "Kennis die blijft, ook als wij weg zijn."
}$json$::jsonb
where slug = 'training-enablement';

-- ============================================================================
-- Controle. Verwacht: 8 rijen, elk met true in beide kolommen.
-- ============================================================================

select
  slug,
  jsonb_exists(data, 'kop') as heeft_kop,
  jsonb_array_length(coalesce(data->'faq', '[]'::jsonb)) > 0 as heeft_faq
from public.cms_services
where slug in ('app-in-a-day', 'ai-agent-in-a-day', 'ai-opportunity-scan', 'ai-strategie', 'it-strategie', 'mendix-scale-sessie', 'fusion-team-startsprint', 'training-enablement')
order by slug;
