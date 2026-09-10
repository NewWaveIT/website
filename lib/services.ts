/**
 * De negen boekbare diensten uit de dienstencatalogus (augustus 2026), verdeeld
 * over drie families (doen/richting/capaciteit) en gekoppeld aan de richtingen
 * Mendix/AI/Strategie en het 5-fasenmodel. Dit is de lib-fallback; de CMS
 * (cms_services) wint wanneer aanwezig. Zie ook lib/diensten-detail.ts voor de
 * drie diensten die daarnaast een eigen, uitgebreide landingspagina hebben.
 */

import type {
  KPI,
  Vraagstuk,
  AanpakRow,
  WaaromItem,
  CaseVerwijzing,
  Feit,
  Meeneem,
  DagSlot,
  Vervolg,
  FaqItem,
} from "@/lib/content-blokken";
import type { ServiceFamilie, ServiceRichting, ServicePrijs } from "@/lib/dienstenstructuur";

// Doorgeven zodat serverbestanden aan één import genoeg hebben; client-
// componenten importeren rechtstreeks uit lib/dienstenstructuur.
export type { ServiceFamilie, ServiceRichting, ServicePrijs } from "@/lib/dienstenstructuur";
export { SERVICE_FAMILIES, RICHTINGEN } from "@/lib/dienstenstructuur";

export interface Service extends CaseVerwijzing {
  slug: string;
  naam: string;
  /** Groepering op het /diensten-overzicht. */
  familie: ServiceFamilie;
  /** "Thuis"-richting; leeg = geen eigen hub (inhuur, Training & Enablement). */
  richting?: ServiceRichting;
  /** Kolom op de richting-hub; standaard gelijk aan familie. */
  hubTier?: ServiceFamilie;
  /** Toont een kruisverwijzing-regel onderaan de hub(s) van deze richting(en). */
  ookRelevantVoor?: ServiceRichting[];
  /** Plek op de 5-fasenlijn; fase 4 en 5 hebben (nog) geen eigen dienst. */
  fase?: 1 | 2 | 3;
  /** Cursieve pitchregel op de kaart. */
  pitch: string;
  /** Langere marketingtekst ("tekstvoorstel voor de website"). */
  beschrijving: string;
  doelgroep: string;
  duur: string;
  groepsgrootte?: string;
  prijzen: ServicePrijs[];
  /** Drie bullets: wat de klant meeneemt. */
  resultaten: string[];
  volgendeStap: string;
  volgendeStapSlugs?: string[];
  ctaLabel: string;
  ctaType: "datum" | "kennismaking";
  volgorde: number;

  /**
   * Diepte-inhoud voor de eigen pagina onder /diensten/<slug>. Elke dienst heeft
   * zo'n pagina, maar niet elke dienst heeft (al) deze secties — daarom is alles
   * optioneel en verbergt een lege sectie zichzelf.
   */
  kpis?: KPI[];
  vraagstukken?: Vraagstuk[];
  aanpak?: AanpakRow[];
  waarom?: WaaromItem[];
  outcomes?: KPI[];

  /* --- Detailpagina (ontwerp september 2026) ---------------------
     Eén sjabloon voor alle negen diensten; elk blok verbergt zijn
     sectie als het leeg is. Zonder deze velden valt de pagina terug
     op de sobere variant met alleen naam, pitch en beschrijving. */

  /** Kop in de hero. Leeg = `naam`. */
  kop?: string;
  /** Alinea onder de kop. Leeg = `pitch`. */
  lead?: string;
  /** Drie kolommen onder de hero-tekst, bv. Duur · Deelnemers · Locatie. */
  feiten?: Feit[];
  /** Kleine regel onder de prijs in de boekkaart. */
  prijsToelichting?: string;
  /** Bullets in de boekkaart. Leeg = `resultaten`. */
  boekPunten?: string[];
  /** Alinea onder "Herken je dit?". */
  herkenIntro?: string;
  /** Drie citaten waarin de lezer zichzelf herkent. */
  herken?: string[];
  meeneemtTitel?: string;
  meeneemt?: Meeneem[];
  meeneemtFoto?: string;
  /** Label boven het programma: "De dag zelf", "De weken", … */
  dagLabel?: string;
  dagTitel?: string;
  dagIntro?: string;
  dagSlots?: DagSlot[];
  voorbereidingIntro?: string;
  wijZorgen?: string[];
  jijZorgt?: string[];
  daarnaIntro?: string;
  /** Vervolgdiensten mét reden. Vervangt `volgendeStapSlugs` op deze pagina. */
  vervolg?: Vervolg[];
  faqTitel?: string;
  faq?: FaqItem[];
  /** Kop van de afsluitende CTA-band. */
  ctaTitel?: string;
}

export const SERVICES: Service[] = [
  {
    slug: "app-in-a-day",
    naam: "App in a Day",
    familie: "doen",
    richting: "mendix",
    fase: 2,
    pitch:
      "Aan het eind van de dag draait er een app voor een proces dat nu in spreadsheets en mailtjes zit.",
    beschrijving:
      "Eén dag, en er draait een app. Kies een proces dat nu in spreadsheets en mailtjes rondgaat. Met jouw team en onze begeleiders bouwen we het die dag om tot een werkende applicatie met jullie eigen gegevens erin. Geen prototype dat in een la verdwijnt: je kunt hem morgen gebruiken en later verder uitbouwen. En je weet aan het eind van de dag uit eigen ervaring wat low-code wel en niet voor je kan doen.",
    doelgroep:
      "Business teams met een proces dat vastloopt in Excel en mail. Ook geschikt voor een IT-afdeling die wil ervaren wat low-code werkelijk is voordat er een platformbesluit valt.",
    duur: "Eén dag",
    groepsgrootte: "Zes tot tien deelnemers",
    prijzen: [{ label: "€ 4.500 – 6.500", variant: "exclusief licenties en omgeving" }],
    resultaten: [
      "Een werkende app voor een echt eigen proces, met de eigen data erin",
      "Na de dag gewoon te gebruiken of verder door te ontwikkelen",
      "Een eerlijk beeld van wat low-code wel en niet kan",
    ],
    volgendeStap:
      "Doorontwikkeling van de app, of een Fusion Team Startsprint om het zelf te kunnen.",
    volgendeStapSlugs: ["fusion-team-startsprint"],
    ctaLabel: "Vraag een datum aan",
    ctaType: "datum",
    volgorde: 1,
  },
  {
    slug: "ai-agent-in-a-day",
    naam: "AI Agent in a Day",
    familie: "doen",
    richting: "ai",
    fase: 2,
    pitch: "Iedereen brengt één echte taak mee en gaat naar huis met een agent die die taak doet.",
    beschrijving:
      "Geen presentatie over de mogelijkheden, maar een dag waarin je team het zelf doet. Iedereen brengt één echte taak uit het eigen werk mee. Aan het eind van de dag heeft ieder teamlid daar een werkende agent voor gebouwd — en begrijpt hij ook waar het misgaat en hoe je dat afvangt. We sluiten af met afspraken die het team zelf opstelt over wat er wel en niet met bedrijfsgegevens mag. Maximaal twaalf deelnemers, zodat iedereen echt aan de slag komt.",
    doelgroep:
      "Teams die het werk uitvoeren: operations, service, finance, marketing, engineering.",
    duur: "Eén dag",
    groepsgrootte: "Maximaal twaalf deelnemers",
    prijzen: [{ label: "€ 5.500 – 7.500", variant: "exclusief licenties" }],
    resultaten: [
      "Per deelnemer minstens één werkende agent voor een eigen taak",
      "Werkafspraken over gegevensgebruik, opgesteld door het team zelf",
      "Een lijst van kansen die groter zijn dan één individuele taak",
    ],
    volgendeStap:
      "AI Opportunity Scan om de grotere kansen te prioriteren, of direct een proef op één proces.",
    volgendeStapSlugs: ["ai-opportunity-scan"],
    ctaLabel: "Vraag een datum aan",
    ctaType: "datum",
    volgorde: 2,

    kop: "Iedereen gaat naar huis met een agent die zijn eigen taak doet.",
    lead: "Eén dag, één echte taak per deelnemer. Aan het eind draait er voor iedereen een werkende agent — op jullie eigen documenten, systemen en werkwijze.",
    feiten: [
      { label: "Duur", waarde: "Eén dag · 09:00–17:00" },
      { label: "Deelnemers", waarde: "Maximaal twaalf" },
      { label: "Locatie", waarde: "Bij jou of bij ons" },
    ],
    prijsToelichting:
      "Exclusief licenties. Vaste prijs, ongeacht het aantal deelnemers tot twaalf.",
    boekPunten: [
      "Twee begeleiders: een AI-engineer en een facilitator",
      "Een werkende agent per deelnemer",
      "Advies over wat wél en niet geschikt is voor een agent",
    ],
    herkenIntro:
      "Voor teams die AI vooral kennen van demo's en nieuwsbrieven, en willen weten wat het met hún werk doet. Geen developers nodig.",
    herken: [
      "Iedereen praat over AI, maar niemand hier heeft het ooit op ons eigen werk losgelaten.",
      "We hebben licenties gekocht en niemand gebruikt ze.",
      "Ik weet niet welke taken hiervoor geschikt zijn en welke niet.",
    ],
    meeneemtTitel: "Twaalf agents die morgen al werk schelen",
    meeneemt: [
      {
        icon: "bot",
        titel: "Een werkende agent per deelnemer",
        tekst: "Op een echte taak uit het eigen werk, met echte documenten en data.",
      },
      {
        icon: "scan-search",
        titel: "Een lijst met kansrijke taken",
        tekst: "Uit de dag rolt vanzelf een langere lijst dan de twaalf die je die dag doet.",
      },
      {
        icon: "shield-check",
        titel: "De grens tussen geschikt en ongeschikt",
        tekst: "Waar AI helpt, waar het risico geeft, en waar een mens moet blijven beslissen.",
      },
      {
        icon: "book-open",
        titel: "Prompt- en werkafspraken",
        tekst:
          "Vastgelegd, zodat wat werkt gedeeld kan worden in plaats van in iemands hoofd te blijven.",
      },
      {
        icon: "route",
        titel: "Advies over de volgende stap",
        tekst: "Van losse agents naar iets dat structureel in je processen zit.",
      },
    ],
    meeneemtFoto: "/assets/photos/team-overleg-scherm.webp",
    dagLabel: "De dag zelf",
    dagTitel: "Van eigen taak naar werkende agent",
    dagIntro:
      "Kort uitleggen, lang doen. Na de eerste ronde bouwt iedereen zijn eigen agent, wij lopen rond.",
    dagSlots: [
      {
        tijd: "09:00",
        titel: "Wat is een agent eigenlijk",
        tekst: "Twintig minuten uitleg, en meteen een levend voorbeeld op jullie eigen situatie.",
      },
      {
        tijd: "09:45",
        titel: "Taken kiezen",
        tekst:
          "Iedereen legt een echte taak op tafel. Samen kiezen we per persoon de meest kansrijke.",
      },
      {
        tijd: "10:30",
        titel: "Bouwen, ronde één",
        tekst: "De eerste agent draait. Rommelig, maar hij doet iets.",
      },
      {
        tijd: "12:30",
        titel: "Demo en kritiek",
        tekst: "Iedereen laat zien wat er staat. Wat niet klopt, gaat de middag in.",
      },
      {
        tijd: "13:15",
        titel: "Bouwen, ronde twee",
        tekst: "Verfijnen: context, bronnen, controlestappen, wanneer een mens meekijkt.",
      },
      {
        tijd: "15:00",
        titel: "Grenzen verkennen",
        tekst:
          "We laten ook zien waar het misgaat — hallucinaties, AVG, dingen die je niet moet automatiseren.",
      },
      {
        tijd: "16:00",
        titel: "Delen",
        tekst:
          "Wat werkt gaat in een gedeelde bibliotheek, zodat de rest van de organisatie erop verder kan.",
      },
      {
        tijd: "16:40",
        titel: "Vervolgstappen",
        tekst: "Wat is er nodig om dit structureel te maken, en wat kost dat ongeveer.",
      },
    ],
    voorbereidingIntro:
      "Voorbereiding is licht, maar niet nul: hoe scherper de taken vooraf, hoe verder je die dag komt.",
    wijZorgen: [
      "Een AI-engineer en een facilitator, de hele dag aanwezig",
      "Een werkomgeving met de benodigde AI-tooling, klaar voor gebruik",
      "Een korte voorbereidingsopdracht voor de deelnemers",
      "De gedeelde bibliotheek met alles wat die dag gemaakt is",
    ],
    jijZorgt: [
      "Zes tot twaalf deelnemers die hun eigen werk goed kennen",
      "Per deelnemer één taak die tijd kost en zich herhaalt",
      "Voorbeelddocumenten of data waar de agents mee mogen werken",
      "Duidelijkheid over wat wel en niet in een AI-tool mag — of de bereidheid dat die dag te bepalen",
    ],
    daarnaIntro: "Twaalf agents is een start, geen strategie. Dit zijn de logische vervolgen.",
    vervolg: [
      {
        slug: "ai-opportunity-scan",
        reden: "Waar levert AI bij jullie echt geld op — en waar niet.",
      },
      {
        slug: "ai-strategie",
        reden:
          "Verandert AI je verdienmodel of alleen je kosten? Die vraag hoort in de directiekamer.",
      },
    ],
    faqTitel: "Wat deelnemers vooraf vragen",
    faq: [
      {
        vraag: "Moeten deelnemers technisch zijn?",
        antwoord:
          "Nee. De meest waardevolle deelnemers zijn mensen die hun proces goed kennen. Bouwen doen we samen.",
      },
      {
        vraag: "Werken de agents met onze eigen data?",
        antwoord:
          "Ja, met de documenten en data die je die dag beschikbaar stelt. Wat er wel en niet in mag, spreken we vooraf af.",
      },
      {
        vraag: "Is dit AVG-proof?",
        antwoord:
          "We werken standaard binnen een omgeving waarin je data niet gebruikt wordt voor training. Bij gevoelige data kiezen we vooraf de juiste opzet.",
      },
      {
        vraag: "Blijven de agents na de dag werken?",
        antwoord:
          "Ja, binnen je eigen omgeving. Voor structureel gebruik met beheer en toegangsrechten is een vervolgstap nodig.",
      },
      {
        vraag: "Kan dit ook met Mendix-apps?",
        antwoord:
          "Ja — dan is App in a Day waarschijnlijk het betere startpunt, of we combineren beide.",
      },
    ],
    ctaTitel: "Eén dag, twaalf mensen, twaalf werkende agents.",
  },
  {
    slug: "ai-opportunity-scan",
    naam: "AI Opportunity Scan",
    familie: "richting",
    richting: "ai",
    fase: 2,
    pitch: "Een halve dag met je team, en je weet waar AI bij jullie geld oplevert en waar niet.",
    beschrijving:
      "Weten waar AI bij jullie écht iets oplevert — in een halve dag. Wij komen langs, brengen jullie processen in kaart en gaan met het team op zoek naar de plekken waar mensen nu beslissingen nemen met onvolledige informatie. Je krijgt de drie kansrijkste toepassingen op een rij, gescoord op wat ze opleveren en hoe haalbaar ze zijn, plus een uitgewerkt voorstel voor de eerste stap. Vaste prijs, verrekenbaar als je verdergaat.",
    doelgroep:
      "Proceseigenaren, managers en de mensen die het werk kennen, bij voorkeur uit meer dan één afdeling.",
    duur: "Halve dag",
    groepsgrootte: "Zes tot tien deelnemers",
    prijzen: [],
    resultaten: [
      "De AI Opportunity Map van de eigen processen",
      "De drie kansrijkste toepassingen met randvoorwaarden",
      "Een voorstel voor de eerste stap, met prijs en doorlooptijd",
    ],
    volgendeStap: "Een proef van twee weken op de gekozen toepassing, met jullie eigen data.",
    ctaLabel: "Vraag een datum aan",
    ctaType: "datum",
    volgorde: 3,
  },
  {
    slug: "ai-strategie",
    naam: "AI-strategie",
    familie: "richting",
    richting: "strategie",
    hubTier: "doen",
    fase: 1,
    pitch: "Waar verandert AI ons verdienmodel, en waar is het alleen een efficiëntieslag?",
    beschrijving:
      "Iedereen praat over AI. De vraag voor de directie is een andere: waar verandert het ons verdienmodel, en waar is het alleen een efficiëntieslag? In een dagdeel of een dag brengen we uw positie in kaart met een strategisch kader dat verder gaat dan de gebruikelijke lijstjes met toepassingen. We kijken naar waar uw onderscheidende capaciteit zit, wat commodity wordt, en wat dat betekent voor uw mensen. U eindigt met vastgestelde prioriteiten — inclusief een lijst van wat u expliciet niet gaat doen.",
    doelgroep: "Directie en MT — werkt alleen goed als de eindverantwoordelijke er zelf bij zit.",
    duur: "Halve of hele dag",
    groepsgrootte: "Vijf tot twaalf deelnemers",
    prijzen: [],
    resultaten: [
      "Een schriftelijke positiebepaling binnen een week",
      "Prioriteiten voor het komende jaar",
      "Een expliciete niet-doen-lijst",
    ],
    volgendeStap:
      "IT-strategie op low-code en AI om de gekozen richting technisch en organisatorisch uit te werken.",
    volgendeStapSlugs: ["it-strategie"],
    ctaLabel: "Vraag een datum aan",
    ctaType: "datum",
    volgorde: 4,
  },
  {
    slug: "it-strategie",
    naam: "IT-strategie op low-code en AI",
    familie: "richting",
    richting: "strategie",
    fase: 1,
    ookRelevantVoor: ["mendix"],
    pitch:
      "Waar zetten we low-code en AI in, waar juist niet, en welk deliverymodel hoort daarbij?",
    beschrijving:
      "Low-code groeit bij jullie harder dan de inrichting eromheen. Er komen apps bij, teams bij en vragen bij — en de architectuur, governance en het deliverymodel zijn niet meegegroeid. In twee tot drie weken brengen we in kaart waar jullie staan op business waarde, delivery en teams, en platformfundering. Je krijgt een roadmap met gefaseerde stappen, plus heldere antwoorden op de vragen waar je nu tegenaan loopt: waar past low-code en waar niet, welk deliverymodel hoort bij jullie ambitie, en waar landt AI in dit landschap.",
    doelgroep: "CIO, IT-directeur, informatiemanager of enterprise architect.",
    duur: "Twee tot drie weken",
    prijzen: [],
    resultaten: [
      "Een strategie- en roadmapdocument op drie lagen: business waarde, delivery en teams, platformfundering",
      "De keuze waar low-code past en waar een standaardpakket of maatwerk beter is",
      "Het passende deliverymodel, en waar AI in dat landschap landt",
    ],
    volgendeStap:
      "Het deliverymodel opzetten, capaciteit inhuren om te beginnen, of een Fusion Team Startsprint.",
    volgendeStapSlugs: ["consultant-inhuren", "fusion-team-startsprint"],
    ctaLabel: "Plan een kennismaking (20 min)",
    ctaType: "kennismaking",
    volgorde: 5,

    kop: "Waar zet je low-code en AI in — en waar juist niet.",
    lead: "In twee tot drie weken brengen we je applicatielandschap, je deliverymodel en je ambities bij elkaar in één plan: wat bouw je zelf, wat koop je, wat bouw je met low-code, en welke teams horen daarbij.",
    feiten: [
      { label: "Duur", waarde: "Twee tot drie weken" },
      { label: "Vorm", waarde: "Interviews en werksessies" },
      { label: "Uitkomst", waarde: "Geprioriteerde roadmap" },
    ],
    prijsToelichting:
      "Afhankelijk van de omvang van het landschap en het aantal betrokken afdelingen.",
    boekPunten: [
      "Interviews met business, IT en architectuur",
      "Applicatielandschap in kaart, inclusief schaduw-IT",
      "Roadmap met businesscase per initiatief",
    ],
    herkenIntro:
      "Voor IT-managers en CIO's die willen dat low-code en AI ergens op slaan in plaats van los rondzwerven.",
    herken: [
      "We hebben low-code, maar het is nooit een keuze geweest — het gebeurde gewoon.",
      "Elke afdeling koopt zijn eigen pakket en wij mogen het koppelen.",
      "Ik moet volgend jaar budget verantwoorden en heb geen verhaal.",
    ],
    meeneemtTitel: "Een plan waarmee je budget kunt verantwoorden",
    meeneemt: [
      {
        icon: "map",
        titel: "Je applicatielandschap in kaart",
        tekst:
          "Inclusief wat er buiten IT om is aangeschaft. Dat plaatje alleen al is vaak confronterend.",
      },
      {
        icon: "git-fork",
        titel: "Bouwen, kopen of low-code",
        tekst:
          "Een beslisregel die je ook bij het volgende verzoek kunt toepassen, in plaats van per geval discussiëren.",
      },
      {
        icon: "users",
        titel: "Het deliverymodel dat erbij hoort",
        tekst: "Welke teams, welke rollen, wat centraal en wat bij de business.",
      },
      {
        icon: "list-ordered",
        titel: "Een geprioriteerde roadmap",
        tekst: "Met per initiatief een businesscase op hoofdlijnen: opbrengst, kosten, risico.",
      },
      {
        icon: "presentation",
        titel: "Een verhaal voor de board",
        tekst: "Dezelfde inhoud, in de taal waarin budget wordt toegekend.",
      },
    ],
    meeneemtFoto: "/assets/photos/klantgesprek-tafel.webp",
    dagLabel: "De weken",
    dagTitel: "Interviews, analyse, keuzes",
    dagIntro:
      "Wij doen het werk, jullie leveren tijd voor gesprekken en één werksessie. Geen maandenlang traject met een stuurgroep.",
    dagSlots: [
      {
        tijd: "Week 1",
        titel: "Interviews",
        tekst: "Tien tot vijftien gesprekken met business, IT, architectuur en security.",
      },
      {
        tijd: "Week 1",
        titel: "Landschap in kaart",
        tekst:
          "Applicaties, koppelingen, kosten en eigenaarschap — inclusief wat er buiten IT om loopt.",
      },
      {
        tijd: "Week 2",
        titel: "Analyse en scenario's",
        tekst:
          "Waar zit overlap, waar zit risico, en welke deliverymodellen passen bij jullie omvang.",
      },
      {
        tijd: "Week 2",
        titel: "Werksessie",
        tekst: "We leggen de scenario's voor, jullie kiezen richting.",
      },
      {
        tijd: "Week 3",
        titel: "Roadmap en businesscases",
        tekst: "Initiatieven op volgorde, met kosten en opbrengsten per initiatief.",
      },
      {
        tijd: "Week 3",
        titel: "Presentatie",
        tekst: "Aan MT of board, door ons of door jou — wat intern het beste werkt.",
      },
    ],
    voorbereidingIntro:
      "Het meeste werk ligt bij ons. Wat we van jou nodig hebben is toegang tot mensen en informatie, snel.",
    wijZorgen: [
      "Een strateeg en een architect, twee tot drie weken beschikbaar",
      "Alle interviews, analyse en uitwerking",
      "Een roadmap met businesscase per initiatief",
      "De presentatie aan MT of board",
    ],
    jijZorgt: [
      "Beschikbaarheid van tien tot vijftien mensen voor een uur",
      "Inzicht in je huidige applicatiekosten en contracten",
      "Een opdrachtgever die knopen kan doorhakken in de werksessie",
      "Openheid over wat er nu niet werkt — ook als dat politiek gevoelig ligt",
    ],
    daarnaIntro:
      "Een roadmap is pas iets waard als de eerste stap gezet wordt. Die stap staat meestal in dit rijtje.",
    vervolg: [
      {
        slug: "mendix-scale-sessie",
        reden: "Als je al bouwt en de vraag over opschalen gaat.",
      },
      {
        slug: "training-enablement",
        reden: "Als het plan vraagt om mensen die je nog niet in huis hebt.",
      },
    ],
    faqTitel: "Wat CIO's en IT-managers vragen",
    faq: [
      {
        vraag: "Is dit niet gewoon een adviesrapport?",
        antwoord:
          "Het verschil zit in de scope en de tijd: drie weken, geprioriteerd, met businesscases. En wij blijven beschikbaar als het uitgevoerd moet worden.",
      },
      {
        vraag: "Zijn jullie niet gekleurd, als Mendix-partner?",
        antwoord:
          "Deels: we kennen low-code goed. Daarom staat in elk advies expliciet waar low-code níet het antwoord is — dat is meestal het nuttigste deel.",
      },
      {
        vraag: "Kunnen jullie ook de uitvoering doen?",
        antwoord:
          "Ja, maar dat is geen voorwaarde. Het plan is zo geschreven dat een andere partij het ook kan uitvoeren.",
      },
      {
        vraag: "Wat als de uitkomst is dat we moeten stoppen met een platform?",
        antwoord:
          "Dan staat dat erin. Sunk cost is een slechte adviseur en dat schrijven we ook zo op.",
      },
      {
        vraag: "Hoeveel tijd kost het ons?",
        antwoord:
          "Reken op een uur per geïnterviewde, een dagdeel voor de werksessie en een uur voor de presentatie.",
      },
    ],
    ctaTitel: "Drie weken, en je weet wat je bouwt, koopt en laat.",
  },
  {
    slug: "mendix-scale-sessie",
    naam: "Mendix Scale Sessie",
    familie: "richting",
    richting: "mendix",
    fase: 1,
    ookRelevantVoor: ["strategie"],
    pitch:
      "Waar staat ons low-codeteam vandaag, wat is de stip op de horizon, en hoe komen we daar?",
    beschrijving:
      "Jullie Mendix-landschap groeit harder dan de inrichting eromheen. Er komen apps bij, teams bij en vragen bij — en de architectuur, het deliverymodel en de governance zijn niet meegegroeid. In één dag brengen we met jullie team in kaart waar jullie staan op de drie lagen waarop organisaties volwassen worden: waar levert het platform waarde, hoe zijn de teams georganiseerd, en welke technische fundering maakt opschalen mogelijk. Je gaat naar huis met een gedeeld doelbeeld en een route in stappen — vastgesteld door de mensen die het moeten doen.",
    doelgroep:
      "Organisaties die al met Mendix werken; het team zelf plus de opdrachtgever, uit business, delivery en architectuur samen.",
    duur: "Eén dag",
    groepsgrootte: "Acht tot vijftien deelnemers",
    prijzen: [],
    resultaten: [
      "Een volwassenheidsbepaling op business waarde, delivery/teams en platformfundering",
      "Het doelbeeld van het deliverymodel: van één team naar meerdere teams met een gedeelde fundering",
      "De route ernaartoe in gefaseerde stappen, op papier binnen een week",
    ],
    volgendeStap:
      "IT-strategie op low-code en AI voor de volledige uitwerking, of meteen capaciteit inhuren.",
    volgendeStapSlugs: ["it-strategie", "consultant-inhuren"],
    ctaLabel: "Vraag een datum aan",
    ctaType: "datum",
    volgorde: 6,
  },
  {
    // VOORZET — afgeleid uit de Fusion Team-beschrijving en de vacatureteksten
    // over wat een consultant bij TNW doet (Advanced/Expert-certificering,
    // Scrum, coachen van collega's). Geen tarieven, niveaus of doorlooptijden:
    // die levert de eigenaar aan.
    slug: "consultant-inhuren",
    naam: "Consultant of team inhuren",
    familie: "capaciteit",
    ookRelevantVoor: ["mendix"],
    fase: 3,
    pitch:
      "Een gecertificeerde Mendix-consultant die meedraait in jouw team, of een team dat een traject draagt.",
    beschrijving:
      "Soms is er geen vraagstuk om te onderzoeken, maar werk dat gedaan moet worden. Dan lever je capaciteit. Onze consultants zijn Mendix Advanced of Expert gecertificeerd en draaien mee in jullie eigen ritme en Scrum-proces — als teamlid, niet als externe partij ernaast. Ze bouwen niet alleen: ze coachen de mensen om zich heen en nemen mee wat ze bij andere opdrachtgevers hebben gezien. Eén consultant om een team te versterken, of een compleet team dat een traject draagt. Wat past, hangt af van wat er ligt.",
    doelgroep:
      "Organisaties met werk op de plank en te weinig handen, of zonder Mendix-kennis in huis.",
    duur: "In overleg",
    prijzen: [],
    resultaten: [
      "Een gecertificeerde consultant die meedraait in jullie ritme",
      "Kennisoverdracht onderweg, zodat jullie eigen mensen meegroeien",
      "Op- of afschalen in overleg",
    ],
    volgendeStap:
      "Een Fusion Team Startsprint als jullie het daarna zelf willen kunnen, of uitbreiding naar een tweede team.",
    volgendeStapSlugs: ["fusion-team-startsprint"],
    ctaLabel: "Plan een kennismaking (20 min)",
    ctaType: "kennismaking",
    volgorde: 7,
  },
  {
    slug: "fusion-team-startsprint",
    naam: "Fusion Team Startsprint",
    familie: "capaciteit",
    richting: "mendix",
    fase: 3,
    pitch:
      "Vier weken waarin een businessexpert en onze developer samen bouwen — en de businessexpert het daarna zelf kan.",
    beschrijving:
      "Business en IT die samen bouwen in plaats van specificaties uitwisselen. Vier weken lang werken één van jullie businessexperts en één van onze ontwikkelaars samen aan een echte oplossing. Wij bouwen mee en leiden tegelijk op, zodat jullie medewerker het daarna zelf kan onderhouden en uitbreiden. Je houdt drie dingen over: een oplossing die in gebruik is, iemand die het kan, en een werkwijze die je op de volgende afdeling kunt herhalen.",
    doelgroep:
      "Organisaties die willen dat business en IT samen ontwikkelen — vaak de logische stap na App in a Day.",
    duur: "Vier weken",
    prijzen: [],
    resultaten: [
      "Een werkende oplossing in gebruik of in pilot",
      "Een medewerker die hem zelfstandig kan onderhouden en uitbreiden",
      "De werkwijze op papier: wie doet wat, en welke standaarden gelden",
    ],
    volgendeStap: "Een doorlopend fusion team, of uitbreiding naar een tweede business unit.",
    ctaLabel: "Plan een kennismaking (20 min)",
    ctaType: "kennismaking",
    volgorde: 8,
  },
  {
    slug: "training-enablement",
    naam: "Training & Enablement",
    familie: "capaciteit",
    ookRelevantVoor: ["mendix", "ai", "strategie"],
    fase: 3,
    pitch: "Losse blokken van een dag, of een vaste coach één dag per week.",
    beschrijving:
      "Zelf kunnen bouwen, in blokken die je los boekt. Kies wat je nodig hebt: Mendix van de basis tot gevorderd, agents bouwen met Claude, of AI-beleid en werkafspraken voor je eigen team. Halve of hele dagen, groepen tot tien mensen. Wil je liever begeleiding op de werkvloer dan een cursus? Dan komt er een vaste coach één dag per week bij jullie zitten. Wat je ook kiest: we leggen de huisstandaarden vast, zodat wat jullie bouwen ook over twee jaar nog te onderhouden is.",
    doelgroep:
      "Citizen developers, business analisten, ontwikkelaars en teams die zelf willen bouwen.",
    duur: "Modulair, losse blokken of doorlopende coaching",
    groepsgrootte: "Groepen tot tien deelnemers",
    prijzen: [],
    resultaten: [
      "Mensen die zelfstandig bouwen",
      "Huisstandaarden vastgelegd, zodat het onderhoudbaar blijft",
      "Los te boeken per blok, of een vaste coach één dag per week",
    ],
    volgendeStap: "Een doorlopend enablement-programma, of certificeringstraject.",
    ctaLabel: "Plan een kennismaking (20 min)",
    ctaType: "kennismaking",
    volgorde: 9,
  },
];

export const SERVICE_SLUGS = SERVICES.map((s) => s.slug);
