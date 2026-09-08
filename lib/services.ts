/**
 * De negen boekbare diensten uit de dienstencatalogus (augustus 2026), verdeeld
 * over drie families (doen/richting/capaciteit) en gekoppeld aan de richtingen
 * Mendix/AI/Strategie en het 5-fasenmodel. Dit is de lib-fallback; de CMS
 * (cms_services) wint wanneer aanwezig. Zie ook lib/diensten-detail.ts voor de
 * drie diensten die daarnaast een eigen, uitgebreide landingspagina hebben.
 */

import type { KPI, Vraagstuk, AanpakRow, WaaromItem, CaseVerwijzing } from "@/lib/content-blokken";

export type ServiceFamilie = "doen" | "richting" | "capaciteit";
export type ServiceRichting = "mendix" | "ai" | "strategie";

export interface ServicePrijs {
  label: string;
  /** Toelichting op de prijs, bv. "dagdeel" of "exclusief licenties". */
  variant?: string;
}

export interface Service extends CaseVerwijzing {
  slug: string;
  naam: string;
  /** Groepering op het /diensten-overzicht. */
  familie: ServiceFamilie;
  /** "Thuis"-richting; leeg = geen eigen hub (Foundation Starterkit, Training & Enablement). */
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
}

/**
 * De drie families zijn tegelijk de drie niveaus van de ladder: je begint altijd
 * bij het instapniveau (één dag, vaste prijs) en schaalt op wanneer dat werkt.
 */
export const SERVICE_FAMILIES: {
  key: ServiceFamilie;
  niveau: number;
  label: string;
  kicker: string;
}[] = [
  { key: "doen", niveau: 1, label: "Instap", kicker: "Doen in één dag" },
  { key: "richting", niveau: 2, label: "Richting", kicker: "Richting bepalen" },
  { key: "capaciteit", niveau: 3, label: "Capaciteit", kicker: "Capaciteit opbouwen" },
];

/** De drie richtingen als kolommen van de keuzematrix, in vaste volgorde. */
export const RICHTINGEN: { key: ServiceRichting; naam: string; href: string }[] = [
  { key: "mendix", naam: "Mendix", href: "/diensten/mendix" },
  { key: "ai", naam: "AI", href: "/diensten/ai" },
  { key: "strategie", naam: "Strategie", href: "/diensten/strategie" },
];

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
    prijzen: [{ label: "€ 1.500 – 2.500", variant: "verrekenbaar bij een vervolgopdracht" }],
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
    prijzen: [
      { label: "€ 3.500 – 4.500", variant: "dagdeel" },
      { label: "€ 6.500 – 8.500", variant: "hele dag" },
    ],
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
    prijzen: [
      { label: "€ 12.500 – 20.000", variant: "afhankelijk van de omvang van het landschap" },
    ],
    resultaten: [
      "Een strategie- en roadmapdocument op drie lagen: business waarde, delivery en teams, platformfundering",
      "De keuze waar low-code past en waar een standaardpakket of maatwerk beter is",
      "Het passende deliverymodel, en waar AI in dat landschap landt",
    ],
    volgendeStap:
      "Inrichting van de fundering, opzetten van het deliverymodel, of een Fusion Team Startsprint.",
    volgendeStapSlugs: ["foundation-starterkit", "fusion-team-startsprint"],
    ctaLabel: "Plan een kennismaking (20 min)",
    ctaType: "kennismaking",
    volgorde: 5,
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
    prijzen: [{ label: "€ 4.500 – 6.500" }],
    resultaten: [
      "Een volwassenheidsbepaling op business waarde, delivery/teams en platformfundering",
      "Het doelbeeld van het deliverymodel: van één team naar meerdere teams met een gedeelde fundering",
      "De route ernaartoe in gefaseerde stappen, op papier binnen een week",
    ],
    volgendeStap:
      "IT-strategie op low-code en AI voor de volledige uitwerking, of direct de Foundation Starterkit.",
    volgendeStapSlugs: ["it-strategie", "foundation-starterkit"],
    ctaLabel: "Vraag een datum aan",
    ctaType: "datum",
    volgorde: 6,
  },
  {
    slug: "foundation-starterkit",
    naam: "Foundation Starterkit",
    familie: "capaciteit",
    fase: 3,
    pitch: "De gedeelde fundering waardoor app nummer twee de helft kost van app nummer één.",
    beschrijving:
      "App nummer één kost wat hij kost. App nummer twee zou de helft moeten kosten — en dat gebeurt alleen als er een gedeelde fundering onder ligt. In drie tot vier weken bouwen we die met jullie ontwikkelaars: een starter app met jullie huisstijl, inloggen en rechten geregeld, een herbruikbare koppellaag naar jullie kernsystemen, gedeelde componenten en geautomatiseerd testen en uitrollen. Elk volgend team begint hiermee in plaats van bij nul. En jullie eigen mensen kunnen hem daarna zelf uitbreiden.",
    doelgroep: "Organisaties met twee of meer Mendix-apps in productie of op de rol.",
    duur: "Drie tot vier weken",
    prijzen: [{ label: "€ 15.000 – 25.000", variant: "afhankelijk van het aantal koppelingen" }],
    resultaten: [
      "Een starter app met de huisstijl erin",
      "Inloggen en rechten, een herbruikbare integratielaag en gedeelde componenten",
      "Geautomatiseerd testen en uitrollen, plus een vastgelegde beheerafspraak",
    ],
    volgendeStap:
      "Fusion Team Startsprint om de fundering te gaan gebruiken, of uitbreiding naar een tweede business unit.",
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
    prijzen: [{ label: "€ 18.000 – 28.000" }],
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
    prijzen: [
      { label: "€ 2.500 – 3.500", variant: "per dagblok, tot 10 deelnemers" },
      { label: "Op dagbasis", variant: "coaching op de werkvloer" },
    ],
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
