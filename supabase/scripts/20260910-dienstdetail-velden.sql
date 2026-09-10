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
-- Nog niet gevuld (7 van de 9): die diensten hebben nog geen
-- ontwerpsecties. Hun pagina toont de eigen beschrijving, doelgroep en
-- inzichten tot ze wel gevuld zijn.
-- ============================================================================


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

-- ============================================================================
-- Controle. Verwacht: 2 rijen, elk met true in beide kolommen.
-- ============================================================================

select
  slug,
  jsonb_exists(data, 'kop') as heeft_kop,
  jsonb_array_length(coalesce(data->'faq', '[]'::jsonb)) > 0 as heeft_faq
from public.cms_services
where slug in ('ai-agent-in-a-day', 'it-strategie')
order by slug;
