/**
 * Content voor de sectordetailpagina's (/sectoren/[slug]).
 *
 * Geport uit ui_kits/website/sector-*.html (Claude Design, "The New Wave IT |
 * Huisstijl"). De pagina bestaat uit twaalf secties in vaste volgorde: hero,
 * herkenning, mensen, waarom nu, pijn → oplossing, wat we bouwen, hoe we
 * werken, diensten, FAQ, inzichten, team en CTA.
 *
 * Elke sectie verbergt zichzelf als zijn velden leeg zijn. Dat is geen
 * bijkomstigheid: een sector die nog niet volledig is ingevuld hoort geen lege
 * koppen te tonen.
 *
 * Drie secties halen hun inhoud niet hier maar uit het CMS, zodat er één
 * waarheid blijft: de inzichten (via `getArtikelenVoorSector`), de andere
 * sectoren (via `getSectoren`) en de mensen. Van teamleden staat hier alleen
 * een slug plus de sectorspecifieke regel; naam, rol en foto komen uit
 * cms_teamleden.
 */

/** Lucide-iconen die in de sectorbadge en de use-cases voorkomen. */
export type SectorIcon =
  | "building-2"
  | "truck"
  | "banknote"
  | "heart-pulse"
  | "factory"
  | "calendar-check"
  | "route"
  | "scan-barcode"
  | "battery-charging"
  | "package-search"
  | "clipboard-check"
  | "file-check"
  | "users"
  | "shield-check"
  | "workflow"
  | "gauge"
  | "boxes"
  | "brain-circuit"
  | "monitor-smartphone"
  | "clipboard-list"
  | "sparkles"
  | "user-round"
  | "calendar-days"
  | "bed"
  | "calendar-clock"
  | "tablet-smartphone"
  | "badge-check"
  | "wrench"
  | "landmark";

/** In welke laag een oplossing zit; bepaalt de kleur van het label. */
export type OplossingLaag =
  "strategie" | "operatie" | "toekomst" | "platform" | "operating" | "delivery";

/** Eén rij in "Pijn → oplossing": wat er misgaat, wat het kost, wat wij doen. */
export interface Oplossing {
  pijn: string;
  kost: string;
  oplossing: string;
  laag: OplossingLaag;
}

/** Een applicatie die we in deze sector vaak bouwen. */
export interface UseCase {
  icon: SectorIcon;
  titel: string;
  tekst: string;
  /** Naar welk pijnpunt hij terugverwijst ("Sluit aan op: …"). */
  sluitAanOp: string;
}

export interface DienstLink {
  label: string;
  href: string;
}

export interface FaqItem {
  vraag: string;
  antwoord: string;
}

/** Een teamlid op de sectorpagina: wie het is staat in het CMS, waarom hij hier
 *  staat is sectorspecifiek. */
export interface TeamRegel {
  /** Slug uit cms_teamleden. Bestaat hij niet, dan valt de regel weg. */
  teamlid: string;
  tekst: string;
}

export interface SectorDetail {
  slug: string;
  naam: string;
  icon: SectorIcon;
  /** Thema voor de hero-animatie (lib/sector-hero-svg.ts). */
  heroTheme: string;
  metaTitle: string;
  metaDescription: string;

  // 1 · Hero
  h1: string;
  intro: string;
  /** CSS object-position, om het onderwerp in beeld te houden. */

  // 2 · Herkenning
  herkenningTitel: string;
  herkenning: string[];

  // 2b · De mensen
  mensenTitel: string;
  mensenTekst: string;
  mensenFoto: string;
  mensenFotoPositie?: string;
  mensenTags: string[];

  // 3 · Waarom nu
  waaromTitel: string;
  waaromAlineas: string[];
  waaromFoto: string;
  waaromFotoPositie?: string;
  quote?: string;
  /** Slug uit cms_teamleden; leeg of onbekend ⇒ geen quote-blok. */
  quoteTeamlid?: string;

  // 4 · Pijn → oplossing
  oplossingenTitel: string;
  oplossingenIntro: string;
  oplossingen: Oplossing[];

  // 5 · Wat we bouwen
  bouwenTitel: string;
  useCases: UseCase[];

  // 6 · Hoe we werken
  aanpakTitel: string;
  aanpakFoto: string;
  aanpakFotoPositie?: string;
  stappen: string[];
  belofte: string;

  // 7 · Diensten
  dienstenTitel: string;
  dienstLinks: DienstLink[];

  // 8 · FAQ
  faqTitel: string;
  faq: FaqItem[];

  // 9b · Team
  teamTitel: string;
  team: TeamRegel[];

  // 10 · CTA
  ctaTitel: string;
  ctaTekst: string;
  ctaTeamlid?: string;
  ctaTeamlidTekst?: string;
}

export const SECTOREN: Record<string, SectorDetail> = {
  mobiliteit: {
    slug: "mobiliteit",
    naam: "Mobiliteit & logistiek",
    icon: "truck",
    heroTheme: "mobiliteit",
    metaTitle: "Software voor mobiliteit en logistiek — werkplaats, fleet en keten verbonden",
    metaDescription:
      "Apps bovenop je bestaande ERP, TMS en voertuigdata. Snellere service, minder stilstand en realtime inzicht van werkplaats tot last mile.",

    h1: "Van werkplaats tot last mile in één keten",
    intro:
      "Elektrificatie, deelmobiliteit en ketens die haperen. Wij verbinden werkplaats, fleet, warehouse en klantproces in apps die live zijn binnen weken.",

    herkenningTitel: "Wat we in werkplaatsen, planning en magazijnen tegenkomen",
    herkenning: [
      "“WMS en TMS praten niet met elkaar, dus iemand typt het over.”",
      "“De werkplaatsplanning leggen we elke ochtend opnieuw op gevoel.”",
      "“We weten pas dat een voertuig stilstaat als de klant belt.”",
      "“Klanten verwachten alles digitaal, wij sturen nog een pdf.”",
    ],

    mensenTitel: "Mensen die op de werkvloer staan, niet alleen in de boardroom",
    mensenTekst:
      "We kijken mee bij technici, planners, magazijn en klantcontact en bouwen samen met hen. Operatie en IT zitten bij ons aan dezelfde tafel.",
    mensenFoto: "/assets/photos/overleg-laptop.webp",
    mensenFotoPositie: "50% 30%",
    mensenTags: [
      "Business consultants",
      "Mendix-ontwikkelaars",
      "Integratie, data & IoT",
      "Adoptie & training",
    ],

    waaromTitel: "Je moet sneller schakelen dan je systemen aankunnen",
    waaromAlineas: [
      "Personeel is schaars, kosten lopen op, klanten willen scherpere levertijden en de regels worden strenger. Daar bovenop komen ketens die van de ene op de andere week kunnen omvallen, en een werkplaats die elektrificatie moet bijbenen.",
      "De data is er wel: in je ERP, je TMS, je WMS, je telematica en je sensoren. Zolang die los staan, komt het inzicht te laat. Wij verbinden ze, zodat planners eerder zien wat er misgaat en je klant niet hoeft te bellen.",
    ],
    waaromFoto: "/assets/photos/team-presentatie-breed.webp",
    waaromFotoPositie: "50% 28%",
    quote: "De toekomst van mobiliteit draait om reizen slimmer, duurzamer en mensgerichter maken.",
    quoteTeamlid: "koen-wijsman",

    oplossingenTitel: "Wat het nu kost, en wat wij ertegenover zetten",
    oplossingenIntro:
      "De vraagstukken die we in mobiliteit en logistiek het vaakst tegenkomen, met de oplossing die daarbij hoort.",
    oplossingen: [
      {
        pijn: "“Onze systemen praten niet met elkaar”",
        kost: "Overtypen, dubbele registratie en fouten die pas bij de klant zichtbaar worden",
        oplossing:
          "Mendix-on-top-of-ERP: legacy ERP, WMS en TMS uitbreiden met een flexibele low-code laag, zonder dure vervangingsprojecten",
        laag: "operatie",
      },
      {
        pijn: "“We hebben veel data, maar geen realtime inzicht”",
        kost: "Planning op gevoel, te late bijsturing en onnodige kilometers",
        oplossing:
          "Dashboards en control towers met realtime inzicht in voorraad, zendingen, capaciteit en vloot",
        laag: "strategie",
      },
      {
        pijn: "“De werkplaatsplanning klopt nooit helemaal”",
        kost: "Leegloop, wachttijd voor klanten en overwerk aan het eind van de dag",
        oplossing:
          "Werkplaats- en ritplanning gekoppeld aan ERP, TMS en agenda’s, met realtime bijsturing bij uitloop",
        laag: "operatie",
      },
      {
        pijn: "“We weten pas dat een voertuig stilstaat als de klant belt”",
        kost: "Ongeplande stilstand, spoedritten en ontevreden klanten",
        oplossing:
          "Fleet & maintenance apps: predictive maintenance die IoT- en sensordata koppelt aan onderhouds- en ERP-systemen",
        laag: "operatie",
      },
      {
        pijn: "“Klanten bellen voor een status die wij zelf niet hebben”",
        kost: "Klantenservicedruk, discussies over levertijd en verloren vertrouwen",
        oplossing:
          "Track & trace portals en klantportalen, gevoed vanuit dezelfde bron als de eigen dashboards",
        laag: "operatie",
      },
      {
        pijn: "“Eén verstoring en de hele week loopt in de soep”",
        kost: "Nee-verkopen, spoedtransport en boetes op levertijd",
        oplossing:
          "Supply chain integratie met dual sourcing, traceerbaarheid via IoT en proactieve alerts bij dreigende verstoring",
        laag: "strategie",
      },
    ],

    bouwenTitel: "Applicaties die we hier het vaakst bouwen",
    useCases: [
      {
        icon: "calendar-check",
        titel: "Werkplaats- en serviceplanning",
        tekst: "Afspraken, capaciteit en uitloop in één beeld, gekoppeld aan ERP.",
        sluitAanOp: "Planning die niet klopt",
      },
      {
        icon: "route",
        titel: "Transport- en ritplanning",
        tekst: "Ritten, capaciteit en verstoringen in één beeld, gekoppeld aan TMS en telematica.",
        sluitAanOp: "Planning zonder realtime inzicht",
      },
      {
        icon: "scan-barcode",
        titel: "Magazijnapp voor de vloer",
        tekst:
          "Scannen, orderpicking, schaderapportage en voorraadcorrecties op één mobiel device.",
        sluitAanOp: "Handmatige handelingen",
      },
      {
        icon: "battery-charging",
        titel: "Fleet- en onderhoudsdashboard",
        tekst: "Voertuigstatus, batterij, locatie en onderhoudssignalen realtime bij elkaar.",
        sluitAanOp: "Onverwachte stilstand",
      },
      {
        icon: "package-search",
        titel: "Track & trace en klantportaal",
        tekst: "Status, documenten en ETA self-service, zonder telefoontje naar de planning.",
        sluitAanOp: "Digitale klantverwachting",
      },
      {
        icon: "clipboard-check",
        titel: "Digitale werkbon en vrachtbrief",
        tekst: "Taakgericht werken op tablet of telefoon, offline, met digitale aftekening.",
        sluitAanOp: "Papieren processen",
      },
    ],

    aanpakTitel: "Eerst één vestiging of één schakel, dan de hele keten",
    aanpakFoto: "/assets/photos/klantgesprek-tafel.webp",
    aanpakFotoPositie: "50% 25%",
    stappen: [
      "We kijken mee in de werkplaats, bij de planning of in het magazijn en kiezen de plek met de meeste pijn.",
      "We bouwen klein. Een proof-of-value op jullie eigen data, zodat je ziet wat het doet.",
      "We regelen de koppelingen met systemen en partners: EDI, API of bestand, net wat de ander aankan.",
      "We laten het landen bij technici, planners en klantcontact. Daar wordt het verschil gemaakt.",
    ],
    belofte:
      "Wat je van ons mag verwachten: een werkende basisapp in een week en een MVP binnen drie maanden. En iemand die bijspringt als het piekt.",

    dienstenTitel: "Waarmee we dit doen",
    dienstLinks: [
      { label: "Low-code applicatieontwikkeling (Mendix)", href: "/diensten/mendix" },
      { label: "Mendix-on-top-of-ERP", href: "/diensten/mendix" },
      { label: "Integratie en supply chain", href: "/diensten" },
      { label: "AI, IoT en connected data", href: "/diensten/ai" },
    ],

    faqTitel: "Wat klanten in mobiliteit en logistiek ons vragen",
    faq: [
      {
        vraag: "Moeten we ons ERP, DMS of TMS vervangen?",
        antwoord:
          "Nee. We bouwen een laag bovenop wat er staat en ontsluiten alleen wat je nodig hebt.",
      },
      {
        vraag: "Kunnen jullie voertuig- en telematicadata ontsluiten?",
        antwoord:
          "Ja. We koppelen sensordata aan onderhoud, planning, ERP en klantproces, met dashboards en analyses erbovenop.",
      },
      {
        vraag: "Kunnen jullie koppelen met onze klanten en partners?",
        antwoord:
          "Ja. Via EDI, API of bestandsuitwisseling, net wat de partner aankan. Die koppelingen zijn vaak het echte werk.",
      },
      {
        vraag: "Werkt het ook zonder netwerk in het magazijn of onderweg?",
        antwoord: "Ja. De apps werken offline door en synchroniseren zodra er weer verbinding is.",
      },
      {
        vraag: "Hoe zorgen jullie dat technici en planners de app gebruiken?",
        antwoord:
          "We ontwerpen hem samen met hen, tonen alleen wat bij de taak hoort en begeleiden de uitrol.",
      },
    ],

    teamTitel: "Wie je bij ons aan tafel krijgt",
    team: [],

    ctaTitel: "Welke schakel kost jullie nu de meeste tijd?",
    ctaTekst:
      "Plan een uur met iemand die de werkvloer en de keten allebei kent. We kijken mee, zeggen waar de winst zit en zijn eerlijk als een app niet het antwoord is.",
  },

  "publieke-sector": {
    slug: "publieke-sector",
    naam: "Publieke sector",
    icon: "building-2",
    heroTheme: "publiek",
    metaTitle: "Software voor de publieke sector — beleid sneller in uitvoering",
    metaDescription:
      "Applicaties die meebewegen met nieuwe wetgeving. Toegankelijke loketten, verbonden ketens en herbruikbare bouwblokken.",

    h1: "Software die meebeweegt met veranderende wet- en regelgeving",
    intro:
      "Gemeenten en uitvoeringsorganisaties lopen vast op systemen die nieuw beleid niet aankunnen. Wij bouwen applicaties die in weken aanpasbaar zijn, niet in jaren.",

    herkenningTitel: "Waar het bij gemeenten en uitvoerders vastloopt",
    herkenning: [
      "“Nieuw beleid is er, het systeem kan het pas volgend jaar aan.”",
      "“De dienstverlening moet 24/7 werken, maar de systemen erachter zijn van kantooruren.”",
      "“Elk domein zijn eigen systeem, niemand ziet het hele beeld.”",
      "“Het budget krimpt, de opgave groeit en de mensen zijn er niet.”",
    ],

    mensenTitel: "Mensen die de uitvoering kennen, niet alleen de techniek",
    mensenTekst:
      "We komen naar de afdeling, luisteren naar de mensen die het werk doen en bouwen samen met hen. Beleid, uitvoering en IT zitten bij ons aan dezelfde tafel.",
    mensenFoto: "/assets/photos/team-overleg-flipover.webp",
    mensenFotoPositie: "50% 18%",
    mensenTags: [
      "Business consultants",
      "Mendix-ontwikkelaars",
      "Architecten",
      "Adoptie & training",
    ],

    waaromTitel: "Beleid verandert sneller dan software",
    waaromAlineas: [
      "Beleid verandert sneller dan software. Ondertussen verwachten inwoners dat alles digitaal kan, groeit de opgave en krimpt het team. Bij gemeenten en uitvoerders zien we steeds hetzelfde: mensen die het met workarounds draaiend houden, terwijl de wet alweer verder is.",
      "Je hoeft daar je hele landschap niet voor om te gooien. We bouwen bovenop wat er staat, met bouwblokken die je met andere organisaties kunt delen. Beleid en IT zitten bij ons aan dezelfde tafel, zodat de oplossing klopt met de regels én met het werk.",
    ],
    waaromFoto: "/assets/photos/team-overleg-scherm.webp",
    waaromFotoPositie: "50% 35%",
    quote:
      "Als bestuurskundige geloof ik dat de overheid het verschil maakt door publieke waarden te borgen en technologie in te zetten voor maatschappelijke vooruitgang.",
    quoteTeamlid: "koen-wijsman",

    oplossingenTitel: "Wat het nu kost, en wat wij ertegenover zetten",
    oplossingenIntro:
      "Vijf vraagstukken die we in de publieke sector het vaakst tegenkomen, met de oplossing die daarbij hoort.",
    oplossingen: [
      {
        pijn: "“Nieuw beleid is er, het systeem kan het pas volgend jaar aan”",
        kost: "Uitvoering loopt achter op de wet; handmatige noodoplossingen en juridisch risico",
        oplossing:
          "Low-code applicaties die in weken aanpasbaar zijn, met architectuuradvies en een roadmap voor modernisering van het landschap",
        laag: "strategie",
      },
      {
        pijn: "“Inwoners verwachten 24/7, onze systemen zijn van kantooruren”",
        kost: "Meer telefoon en balie, langere doorlooptijden, lagere tevredenheid",
        oplossing:
          "Self-service portalen (WCAG-proof): toegankelijke digitale loketten met transparante processen en realtime inzicht in de status",
        laag: "operatie",
      },
      {
        pijn: "“Elk domein heeft zijn eigen systeem, niemand ziet het geheel”",
        kost: "Dubbele uitvraag bij inwoners, tegenstrijdige besluiten en trage ketensamenwerking",
        oplossing:
          "Data-integratie en workflowapps die zaakbehandeling over domeinen en uitvoeringsinstanties heen verbinden",
        laag: "operatie",
      },
      {
        pijn: "“Wat wij bouwen, bouwt de buurorganisatie een jaar later opnieuw”",
        kost: "Publiek geld twee keer uitgegeven aan dezelfde oplossing",
        oplossing:
          "Overheidshub en een herbruikbare low-code componentenbibliotheek: lokaal toepasbaar, rijksbreed schaalbaar, in lijn met de NDS-bouwblokken",
        laag: "toekomst",
      },
      {
        pijn: "“Het budget krimpt, de opgave groeit, de mensen zijn er niet”",
        kost: "Achterstanden in de uitvoering en stijgende inhuurkosten",
        oplossing:
          "Digitaliseren van interne processen en zaakbehandeling: handmatige stappen eruit, capaciteit terug naar het echte werk",
        laag: "operatie",
      },
    ],

    bouwenTitel: "Applicaties die we hier het vaakst bouwen",
    useCases: [
      {
        icon: "monitor-smartphone",
        titel: "Digitaal loket voor inwoners en ondernemers",
        tekst: "Aanvragen indienen en de status realtime volgen, toegankelijk volgens WCAG.",
        sluitAanOp: "24/7-verwachting",
      },
      {
        icon: "file-check",
        titel: "Vergunning- en subsidieapplicatie",
        tekst:
          "Intake, beoordeling en besluit in één workflow, met de wet als configuratie in plaats van maatwerkcode.",
        sluitAanOp: "Beleid dat sneller verandert dan het systeem",
      },
      {
        icon: "clipboard-list",
        titel: "Meld- en zaaksysteem",
        tekst:
          "Meldingen uit de wijk of keten binnen, toegewezen en afgehandeld met zicht op doorlooptijd.",
        sluitAanOp: "Silo’s en dubbele uitvraag",
      },
      {
        icon: "users",
        titel: "Samenwerkingsapplicatie tussen uitvoeringsinstanties",
        tekst: "Één dossier, meerdere organisaties, met toegangsbeheer per rol.",
        sluitAanOp: "Ketensamenwerking",
      },
      {
        icon: "workflow",
        titel: "Interne procesapplicatie",
        tekst:
          "Handmatige stappen en spreadsheets uit de zaakbehandeling, capaciteit terug naar het inhoudelijke werk.",
        sluitAanOp: "Krappe budgetten en personeelstekort",
      },
      {
        icon: "sparkles",
        titel: "Beleidsondersteunende AI-toepassing",
        tekst:
          "Relevante stukken en signalen ophalen en samenvatten, met bronvermelding en een mens die beslist.",
        sluitAanOp: "Uitlegbaarheid als voorwaarde voor AI",
      },
    ],

    aanpakTitel: "Van wetswijziging naar werkende uitvoering",
    aanpakFoto: "/assets/photos/team-gesprek-lounge.webp",
    aanpakFotoPositie: "50% 30%",
    stappen: [
      "We kijken eerst mee. Wat betekent die wetswijziging concreet voor de mensen die hem moeten uitvoeren?",
      "We bouwen klein. Een proof-of-value op jullie eigen situatie, zodat je ziet wat het doet voordat je beslist.",
      "We toetsen onderweg aan de kaders: toegankelijkheid, privacy en archivering zitten in het ontwerp, niet in een eindcontrole.",
      "We laten het landen. Training, begeleiding en samen bouwen, zodat jullie het daarna zelf aankunnen.",
    ],
    belofte:
      "Wat je van ons mag verwachten: een werkende basisapp in een week en een MVP binnen drie maanden. En iemand die het overneemt als het bij jullie druk is.",

    dienstenTitel: "Waarmee we dit doen",
    dienstLinks: [
      { label: "Low-code applicatieontwikkeling (Mendix)", href: "/diensten/mendix" },
      { label: "Digitale strategie en roadmap", href: "/diensten/strategie" },
      { label: "AI en procesautomatisering", href: "/diensten/ai" },
      { label: "Adoptie, training en enablement", href: "/diensten/training-enablement" },
    ],

    faqTitel: "Wat klanten in de publieke sector ons vragen",
    faq: [
      {
        vraag: "Voldoen jullie aan de toegankelijkheidseisen?",
        antwoord:
          "Ja. We ontwerpen loketten meteen WCAG-proof. Toegankelijkheid regelen we vooraf, niet als laatste klus voor de livegang.",
      },
      {
        vraag: "Hoe gaan jullie om met privacy en veiligheid?",
        antwoord:
          "We werken binnen jullie kaders. Rollen bepalen wie wat ziet, alles is te herleiden, en we vragen nooit meer gegevens dan nodig.",
      },
      {
        vraag: "Kunnen andere organisaties de oplossing hergebruiken?",
        antwoord:
          "Ja, daar bouwen we op. Met generieke componenten kan een buurorganisatie verder waar jullie stoppen.",
      },
      {
        vraag: "Hoe zit dat met aanbesteden?",
        antwoord:
          "Vaak kunnen we starten binnen een bestaand raamcontract. We beginnen klein, zodat je weet wat je uitvraagt voordat je aanbesteedt.",
      },
      {
        vraag: "Neemt AI besluiten over inwoners?",
        antwoord:
          "Nee. AI zoekt op, vat samen en onderbouwt. De ambtenaar beslist en ziet altijd waar het antwoord vandaan komt.",
      },
    ],

    teamTitel: "Wie je bij ons aan tafel krijgt",
    team: [],

    ctaTitel: "Welke wetswijziging houdt jullie uitvoering nu tegen?",
    ctaTekst:
      "Plan een uur met iemand die zowel beleid als uitvoering kent. We kijken mee, zeggen waar de winst zit en zijn eerlijk als software niet het antwoord is.",
  },

  zorg: {
    slug: "zorg",
    naam: "Zorg",
    icon: "heart-pulse",
    heroTheme: "zorg",
    metaTitle: "Software voor de zorg — minder administratie, meer tijd voor de patiënt",
    metaDescription:
      "Applicaties en integraties bovenop je bestaande zorgsystemen. Minder registratielast, betere planning, live binnen weken.",

    h1: "Meer tijd voor zorg, minder tijd voor systemen",
    intro:
      "De zorgvraag groeit, de handen worden schaarser en de administratie blijft. Wij digitaliseren processen en verbinden systemen, zodat zorgverleners tijd terugkrijgen voor de patiënt.",

    herkenningTitel: "Wat zorgorganisaties ons vertellen",
    herkenning: [
      "“Systemen wisselen niet uit, dus dezelfde gegevens worden drie keer ingevoerd.”",
      "“Het kernsysteem is gesloten: elke wens wordt een leveranciersproject.”",
      "“Roosters en capaciteit worden nog in Excel gelegd, met last-minute gaten.”",
      "“Cliënten en patiënten verwachten digitaal contact; wij bieden een telefoonnummer.”",
    ],

    mensenTitel: "Mensen die naast de zorgprofessional staan",
    mensenTekst:
      "We lopen mee op de afdeling, praten met zorgverleners en planners en bouwen samen met hen. Zorg, IT en privacy zitten bij ons aan dezelfde tafel.",
    mensenFoto: "/assets/photos/team-presentatie-applaus.webp",
    mensenFotoPositie: "50% 35%",
    mensenTags: [
      "Business consultants",
      "Mendix-ontwikkelaars",
      "Integratiespecialisten",
      "Adoptie & training",
    ],

    waaromTitel: "De administratie blijft, de handen worden schaarser",
    waaromAlineas: [
      "De zorgvraag groeit, de handen worden schaarser en de administratie blijft. Zorgverleners zijn een groot deel van hun dag kwijt aan registreren, terwijl de patiënt wacht.",
      "Opnieuw beginnen met een nieuw systeem lost dat niet op. Wij verbinden wat er al staat en halen handmatige stappen uit het proces. Zorg en IT werken bij ons samen aan dezelfde tafel, zodat de oplossing past bij het echte werk.",
    ],
    waaromFoto: "/assets/photos/founders-trio.webp",
    waaromFotoPositie: "50% 30%",
    quote:
      "De toekomst van de zorg draait om technologie die het werk van zorgprofessionals verlicht en de patiënt centraal stelt.",
    quoteTeamlid: "koen-wijsman",

    oplossingenTitel: "Wat het nu kost, en wat wij ertegenover zetten",
    oplossingenIntro:
      "Vijf vraagstukken die we in de zorg het vaakst tegenkomen, met de oplossing die daarbij hoort.",
    oplossingen: [
      {
        pijn: "“Onze systemen wisselen geen gegevens uit”",
        kost: "Dubbele registratie, overtypfouten en informatie die net te laat bij de zorgverlener is",
        oplossing:
          "Integratie- en data-uitwisselingslaag die bestaande systemen verbindt, met veilige toegang per rol",
        laag: "operatie",
      },
      {
        pijn: "“Het kernsysteem is gesloten, elke wens wordt een project”",
        kost: "Verbeteringen blijven liggen; workarounds in Excel worden het echte proces",
        oplossing:
          "Low-code laag bovenop het bestaande landschap, plus architectuuradvies en een roadmap voor modernisering",
        laag: "strategie",
      },
      {
        pijn: "“Roosters en capaciteit leggen we in Excel”",
        kost: "Gaten in de bezetting, last-minute inhuur en onnodige werkdruk",
        oplossing:
          "Planning- en capaciteitsmanagementapps voor roosters, in- en uitstroom en optimale personeelsinzet",
        laag: "operatie",
      },
      {
        pijn: "“Patiënten verwachten digitaal contact, wij bieden een telefoonnummer”",
        kost: "Telefoondruk op de organisatie en minder regie bij de patiënt",
        oplossing:
          "Self-service portalen voor patiënten, cliënten en professionals: inzage, afspraken en communicatie op één plek",
        laag: "operatie",
      },
      {
        pijn: "“Administratie kost meer tijd dan de zorg zelf”",
        kost: "Zorgprofessionals lopen leeg op registratie; verloop en verzuim nemen toe",
        oplossing:
          "Digitaliseren en automatiseren van zorglogistieke processen, digitale intake en triage",
        laag: "operatie",
      },
    ],

    bouwenTitel: "Applicaties die we hier het vaakst bouwen",
    useCases: [
      {
        icon: "user-round",
        titel: "Patiënten- of cliëntportaal",
        tekst:
          "Inzage in afspraken, documenten en behandeling, met directe communicatie met de zorgverlener.",
        sluitAanOp: "Digitale verwachting en regie",
      },
      {
        icon: "calendar-days",
        titel: "Planning- en capaciteitsapplicatie",
        tekst: "Roosters, beschikbaarheid en in- en uitstroom in één beeld in plaats van in Excel.",
        sluitAanOp: "Bezetting en werkdruk",
      },
      {
        icon: "clipboard-list",
        titel: "Digitale intake en triage",
        tekst: "Aanmelding, vragenlijst en toewijzing gestructureerd door één proces.",
        sluitAanOp: "Administratieve last aan de voorkant",
      },
      {
        icon: "bed",
        titel: "Zorglogistieke applicatie",
        tekst: "Bedden, middelen of routes realtime inzichtelijk, gekoppeld aan het kernsysteem.",
        sluitAanOp: "Versnipperd overzicht",
      },
      {
        icon: "file-check",
        titel: "Registratie- en dossierondersteuning",
        tekst:
          "Taakgerichte apps die alleen tonen wat nodig is, met koppeling naar het bronsysteem.",
        sluitAanOp: "Dubbele registratie",
      },
      {
        icon: "sparkles",
        titel: "AI-ondersteuning voor documenten en triage",
        tekst:
          "Classificeren, samenvatten en voorsorteren, met bronvermelding en een professional die beslist.",
        sluitAanOp: "AI zonder controleverlies",
      },
    ],

    aanpakTitel: "Meelopen met het zorgproces, bouwen op de afdeling",
    aanpakFoto: "/assets/photos/team-borrel.webp",
    aanpakFotoPositie: "50% 18%",
    stappen: [
      "We lopen mee met het zorgproces en zoeken de handeling die veel tijd kost en weinig oplevert.",
      "We bouwen klein. Een proof-of-value in jullie eigen omgeving, zodat je ziet wat het scheelt.",
      "We stemmen af met de functionaris gegevensbescherming en de zorgprofessionals samen, zodat het ontwerp meteen klopt.",
      "We laten het landen bij de professional. Een app die niet gebruikt wordt, levert geen tijd op.",
    ],
    belofte:
      "Wat je van ons mag verwachten: een werkende basisapp in een week en een MVP binnen drie maanden. En iemand die het regelwerk uit handen neemt.",

    dienstenTitel: "Waarmee we dit doen",
    dienstLinks: [
      { label: "Low-code applicatieontwikkeling (Mendix)", href: "/diensten/mendix" },
      { label: "Integratie en data-uitwisseling", href: "/diensten" },
      { label: "AI en procesautomatisering", href: "/diensten/ai" },
      { label: "Adoptie, training en enablement", href: "/diensten/training-enablement" },
    ],

    faqTitel: "Wat klanten in de zorg ons vragen",
    faq: [
      {
        vraag: "Moeten we ons kernsysteem vervangen?",
        antwoord:
          "Nee. We bouwen ernaast en erbovenop, en ontsluiten alleen wat nodig is voor het proces dat knelt.",
      },
      {
        vraag: "Hoe gaan jullie om met privacy en beveiliging?",
        antwoord:
          "We werken binnen jullie kaders. Rollen bepalen wie wat ziet, alles is herleidbaar en we vragen niet meer gegevens dan nodig.",
      },
      {
        vraag: "Kunnen jullie koppelen met onze systemen en ketenpartners?",
        antwoord:
          "Ja. Dat is meestal het grootste deel van het werk, en ook het deel dat het meest oplevert.",
      },
      {
        vraag: "Kost dit onze zorgverleners extra tijd tijdens de bouw?",
        antwoord:
          "Zo min mogelijk. We werken in korte sessies van een uur en testen op de afdeling zelf, niet in een projectkamer.",
      },
      {
        vraag: "Neemt AI besluiten over patiënten?",
        antwoord: "Nee. AI classificeert, vat samen en onderbouwt. De zorgprofessional beslist.",
      },
    ],

    teamTitel: "Wie je bij ons aan tafel krijgt",
    team: [],

    ctaTitel: "Welke handeling kost jullie team deze week de meeste tijd?",
    ctaTekst:
      "Plan een uur met iemand die het zorgproces en de techniek allebei kent. We kijken mee, zeggen waar tijdwinst zit en zijn eerlijk als een app niet het antwoord is.",
  },

  manufacturing: {
    slug: "manufacturing",
    naam: "Manufacturing",
    icon: "factory",
    heroTheme: "manufacturing",
    metaTitle: "Software voor manufacturing — planning, kwaliteit en shopfloor verbonden",
    metaDescription:
      "Applicaties bovenop je bestaande ERP, MES en machinedata. Kortere doorlooptijden, minder stilstand, live binnen weken.",

    h1: "Productie die meebeweegt met de vraag",
    intro:
      "Je machines produceren al data en je ERP staat er al. Wij bouwen planning, kwaliteit en shopfloor daar bovenop — live binnen weken.",

    herkenningTitel: "Wat we op productievloeren steeds terug horen",
    herkenning: [
      "“De machines produceren data, maar we sturen nog op gevoel.”",
      "“De planning van maandagochtend klopt woensdag al niet meer.”",
      "“Kwaliteitsdata zit in MES, LIMS en Excel — nergens bij elkaar.”",
      "“Een storing zie je pas als de lijn stilstaat.”",
    ],

    mensenTitel: "Mensen die de vloer op gaan, niet alleen de architectuur",
    mensenTekst:
      "We lopen de lijn mee, praten met operators en planners en bouwen samen met hen. Business, IT en shopfloor zitten bij ons aan dezelfde tafel.",
    mensenFoto: "/assets/photos/team-brainstorm-postits.webp",
    mensenFotoPositie: "50% 28%",
    mensenTags: [
      "Business consultants",
      "Mendix-ontwikkelaars",
      "Data & integratie",
      "Adoptie & training",
    ],

    waaromTitel: "De marge om fouten op te vangen is klein geworden",
    waaromAlineas: [
      "Arbeidskrapte op de vloer, energieprijzen die blijven stijgen, ketens die zomaar haperen en klanten die kortere levertijden willen. De marge om fouten op te vangen is klein geworden. Sturen op ervaring alleen is niet meer genoeg (Rabobank, 2024).",
      "De data ligt er al: in je ERP, je MES en je machines. Wij halen die naar boven en zetten er applicaties op die je planners en operators echt gebruiken. Je systemen blijven staan, we halen de traagheid eruit.",
    ],
    waaromFoto: "/assets/photos/team-strategie-flipover.webp",
    waaromFotoPositie: "50% 25%",
    quote:
      "De toekomst van de industrie draait om technologie die de mens optimaal ondersteunt. Onze missie is fabrieken mensgericht en schaalbaar inrichten.",
    quoteTeamlid: "koen-wijsman",

    oplossingenTitel: "Wat het nu kost, en wat wij ertegenover zetten",
    oplossingenIntro:
      "Vijf vraagstukken die we in manufacturing het vaakst tegenkomen, met de oplossing die daarbij hoort.",
    oplossingen: [
      {
        pijn: "“Onze machines produceren data die niemand gebruikt”",
        kost: "Verbeterpotentieel blijft op de vloer liggen; besluiten worden op ervaring genomen in plaats van op cijfers",
        oplossing:
          "Smart manufacturing apps die IoT- en machinedata koppelen aan realtime dashboards en KPI-visualisatie",
        laag: "toekomst",
      },
      {
        pijn: "“De planning van maandag klopt woensdag niet meer”",
        kost: "Verstoringen worden te laat zichtbaar; omstellen, spoedorders en overwerk lopen op",
        oplossing:
          "Planbeheer- en planningsapplicatie (SOP) bovenop ERP, met workflow-automatisering rond afwijkingen",
        laag: "operatie",
      },
      {
        pijn: "“Kwaliteitsdata zit in losse systemen”",
        kost: "Continu verbeteren stagneert; afkeur en herbewerking blijven onzichtbaar tot de maandrapportage",
        oplossing:
          "Quality apps met integraties naar MES, LIMS en PLM — registratie, afwijkingen en trends in één beeld",
        laag: "operatie",
      },
      {
        pijn: "“Een storing zien we pas als de lijn stilstaat”",
        kost: "Ongeplande stilstand, spoedonderhoud en gemiste levermomenten",
        oplossing:
          "Voorspellend onderhoud: sensordata, AI en cloud gecombineerd om onderhoud vóór uitval te plannen",
        laag: "toekomst",
      },
      {
        pijn: "“Elke aanpassing in het ERP duurt een half jaar”",
        kost: "IT remt de business; workarounds in Excel worden het echte proces",
        oplossing:
          "Mendix-on-top-of-ERP: een flexibele low-code laag die functionaliteit ontsluit zonder het ERP te vervangen",
        laag: "operatie",
      },
    ],

    bouwenTitel: "Applicaties die we hier het vaakst bouwen",
    useCases: [
      {
        icon: "calendar-clock",
        titel: "Planningsapplicatie",
        tekst: "Plan, capaciteit en verstoringen in één beeld, gevoed vanuit ERP en shopfloor.",
        sluitAanOp: "Planning en realiteit lopen uiteen",
      },
      {
        icon: "tablet-smartphone",
        titel: "Shopfloor-werkorderapp",
        tekst:
          "Operators handelen werkorders af op tablet of smartphone, ook offline, met digitale aftekening.",
        sluitAanOp: "Papieren werkorders en foutgevoelige overdracht",
      },
      {
        icon: "gauge",
        titel: "OEE- en stilstandsdashboard",
        tekst: "Machinedata realtime zichtbaar per lijn, met alerts op drempelwaarden.",
        sluitAanOp: "Data die niemand gebruikt",
      },
      {
        icon: "badge-check",
        titel: "Kwaliteits- en afwijkingenregistratie",
        tekst: "Registratie, afhandeling en trendanalyse over MES, LIMS en PLM heen.",
        sluitAanOp: "Versnipperde kwaliteitsdata",
      },
      {
        icon: "wrench",
        titel: "Onderhoudsapp met voorspelling",
        tekst: "Meldingen, werkorders en sensorgestuurde onderhoudsplanning in één proces.",
        sluitAanOp: "Ongeplande stilstand",
      },
      {
        icon: "boxes",
        titel: "Leveranciers- en ketenportaal",
        tekst:
          "Leveranciers voeren zelf status, documenten en afwijkingen in; jij houdt zicht op de keten.",
        sluitAanOp: "Verstoringen in de toeleveringsketen",
      },
    ],

    aanpakTitel: "Van het proces met de meeste pijn naar een app op de vloer",
    aanpakFoto: "/assets/photos/team-presentatie-scherm.webp",
    aanpakFotoPositie: "50% 35%",
    stappen: [
      "We komen langs en lopen de vloer op. Samen kiezen we het proces met de meeste pijn en de snelste terugverdientijd.",
      "We bouwen klein. Een proof-of-value of app-in-a-day op jullie eigen data, zodat je ziet wat het doet.",
      "We halen data uit machines en MES zoals ze nu zijn. Een oude besturing is meestal geen blokkade, alleen extra werk aan de koppeling.",
      "We laten het landen op de vloer. Training en begeleiding, zodat de app na oplevering ook echt gebruikt wordt.",
    ],
    belofte:
      "Wat je van ons mag verwachten: een werkende basisapp in een week en een MVP binnen drie maanden. En iemand die meedenkt als het in de fabriek even anders loopt.",

    dienstenTitel: "Waarmee we dit doen",
    dienstLinks: [
      { label: "Low-code applicatieontwikkeling (Mendix)", href: "/diensten/mendix" },
      { label: "Mendix-on-top-of-ERP", href: "/diensten/mendix" },
      { label: "AI en procesautomatisering", href: "/diensten/ai" },
      { label: "Digitale strategie en roadmap", href: "/diensten/strategie" },
    ],

    faqTitel: "Wat klanten in manufacturing ons vragen",
    faq: [
      {
        vraag: "Moeten we ons ERP vervangen?",
        antwoord:
          "Nee. We zetten een low-code laag bovenop je ERP, MES of PLM. Je landschap blijft staan, de traagheid gaat eruit.",
      },
      {
        vraag: "Onze machines zijn oud, kan dat wel?",
        antwoord:
          "Meestal wel. We halen data op via bestaande exports, een PLC-koppeling of een IoT-gateway. De leeftijd van de machine is zelden het probleem.",
      },
      {
        vraag: "Hoe snel staat er iets werkends?",
        antwoord:
          "Een eerste app in een week, een MVP binnen drie maanden. Daarna breiden we uit per proces.",
      },
      {
        vraag: "Wie beheert de app daarna?",
        antwoord:
          "Dat kies je zelf. Wij doen het beheer, of we leren jullie team het zodat je zelf verder kunt.",
      },
      {
        vraag: "En veiligheid en compliance?",
        antwoord:
          "We bouwen binnen jullie eigen kaders, inclusief traceerbaarheid en toegangsbeheer waar de regels dat vragen.",
      },
    ],

    teamTitel: "Wie je bij ons aan tafel krijgt",
    team: [],

    ctaTitel: "Welk proces kost jullie deze week het meeste tijd?",
    ctaTekst:
      "Plan een uur met iemand die de shopfloor kent. We kijken mee, zeggen waar de winst zit en zijn eerlijk als een app niet het antwoord is.",
  },

  banken: {
    slug: "banken",
    naam: "Financial services",
    icon: "landmark",
    heroTheme: "banken",
    metaTitle: "Mendix en AI opschalen in financial services",
    metaDescription:
      "Van tien apps naar honderd, met kwaliteit, beheer en governance op orde. Voor banken en verzekeraars die Mendix breed inzetten.",

    h1: "Van tien apps naar honderd, zonder de controle te verliezen",
    intro:
      "Met twintig Mendix-apps red je het op discipline. Bij honderd niet meer. Wij helpen banken en verzekeraars opschalen met governance die de snelheid niet in de weg zit.",

    herkenningTitel: "Waar het gaat schuiven als low-code doorgroeit",
    herkenning: [
      "“Twintig apps zijn te overzien. Bij honderd wordt beheer een probleem.”",
      "“Elk team bouwt zijn eigen oplossing voor hetzelfde probleem.”",
      "“De business bouwt door, buiten IT om, en niemand weet waar.”",
      "“Governance is er wel, maar hij remt vooral en helpt weinig.”",
    ],

    mensenTitel: "Mensen die naast je team gaan staan, niet ernaast zitten",
    mensenTekst:
      "We werken met je platformteam, je architecten en de business samen aan hetzelfde operating model. Bouwen, opleiden en overdragen lopen door elkaar heen.",
    mensenFoto: "/assets/photos/team-presentatie-scherm.webp",
    mensenFotoPositie: "50% 28%",
    mensenTags: ["Platformarchitecten", "Mendix-leads", "Fusion teams", "Training & enablement"],

    waaromTitel: "Mendix verspreidt zich sneller dan de afspraken eromheen",
    waaromAlineas: [
      "Mendix verspreidt zich in de meeste organisaties sneller dan de afspraken eromheen. Zolang je tien tot twintig apps hebt, houdt een goed team dat op discipline bij elkaar. Ga je richting vijftig of honderd, dan lopen kwaliteit, beheer en security uit elkaar en merkt de business dat als eerste.",
      "AI maakt dat urgenter. Ontwikkelen, testen en documenteren gaan sneller, maar de spreiding in kwaliteit wordt groter. In een sector waar de toezichthouder meekijkt, wil je die versnelling binnen dezelfde kaders houden. Dat vraagt om een operating model, niet om meer regels.",
    ],
    waaromFoto: "/assets/photos/team-gesprek-lounge.webp",
    waaromFotoPositie: "50% 30%",
    quote:
      "Wij geloven dat de mens de centrale factor is in het behalen van business doelstellingen.",
    quoteTeamlid: "koen-wijsman",

    oplossingenTitel: "Vier vraagstukken bij het opschalen van Mendix en AI",
    oplossingenIntro:
      "Geen productmarktcombinatie per sector, maar één vraagstuk: beheerst opschalen. Per vraagstuk waaraan je het herkent en wat wij doen.",
    oplossingen: [
      {
        pijn: "Quality at scale",
        kost: "Twintig apps lopen goed, maar bij vijftig stapelen technische schuld, dubbele componenten en beheerlast zich op",
        oplossing:
          "Referentiearchitectuur, herbruikbare componenten, teststandaarden en technische review bij elke nieuwe app",
        laag: "platform",
      },
      {
        pijn: "App Factory en operating model",
        kost: "Niemand is eigenaar van het platform en per app is onduidelijk wie beslist over waarde en prioriteit",
        oplossing:
          "App Factory-model met rollen, portfolioboard en platform ownership, opgebouwd in de fasen Start, Structure en Scale",
        laag: "operating",
      },
      {
        pijn: "Business-led development",
        kost: "De business bouwt zelf door omdat wachten geen optie is, en er ontstaat een schaduw-IT-organisatie",
        oplossing:
          "Fusion teams met een product owner uit de business, plus duidelijke spelregels voor wat business zelf mag bouwen",
        laag: "delivery",
      },
      {
        pijn: "AI-enabled development",
        kost: "AI wordt her en der gebruikt bij bouwen en testen, zonder afspraken over kwaliteit en controle",
        oplossing:
          "AI inzetten in analyse, development, testen, documentatie en beheer, binnen dezelfde governance als de rest",
        laag: "toekomst",
      },
    ],

    bouwenTitel: "",
    useCases: [],

    aanpakTitel: "Strategie, Start, Structure, Scale — en meten wat het oplevert",
    aanpakFoto: "/assets/photos/team-overleg-cafe.webp",
    aanpakFotoPositie: "50% 35%",
    stappen: [
      "Strategie. We halen op waar Mendix vandaag waarde levert en waar het knelt, en vertalen dat naar doelen waar de board iets aan heeft.",
      "Start. We zetten het eerste team en de eerste apps neer, met documentatie en architectuur die later meegroeien.",
      "Structure. We brengen governance, rollen en standaarden aan: portfolioboard, definition of done, technische review, opleiding van je eigen mensen.",
      "Scale. We kopiëren wat werkt naar meer teams en voegen AI toe aan analyse, development, testen en beheer, binnen dezelfde kaders.",
      "Evalueren. We meten wat de apps opleveren en sturen bij, op strategisch, tactisch en operationeel niveau.",
    ],
    belofte:
      "Wat je van ons mag verwachten: een werkende basisapp in een week en een MVP binnen drie maanden. En mensen die naast je team gaan staan in plaats van ernaast komen zitten.",

    dienstenTitel: "Waarmee we dit doen",
    dienstLinks: [
      { label: "Mendix schalen en App Factory", href: "/diensten/mendix-scale-sessie" },
      { label: "Low-code applicatieontwikkeling (Mendix)", href: "/diensten/mendix" },
      { label: "AI-aanpak", href: "/diensten/ai" },
      { label: "Consultant inhuren", href: "/diensten/consultant-inhuren" },
    ],

    faqTitel: "Wat banken en verzekeraars ons vragen",
    faq: [
      {
        vraag: "Hoe houden we dit auditbaar?",
        antwoord:
          "Elke app doorloopt dezelfde review en dezelfde pipeline. Wie wat wanneer wijzigde is herleidbaar, ook als tien teams tegelijk werken.",
      },
      {
        vraag: "Mag de business zelf bouwen binnen onze risicokaders?",
        antwoord:
          "Ja, mits je afspreekt wat wel en niet zelf mag. Wij helpen die grens trekken en bewaken hem met tooling in plaats van met vergaderingen.",
      },
      {
        vraag: "Hoe voorkomen we dat governance de snelheid doodt?",
        antwoord:
          "Door hem in de pipeline te zetten, niet in een overleg. Standaarden en checks lopen mee met de bouw, zodat teams niet hoeven te wachten.",
      },
      {
        vraag: "Wat doet AI precies in het ontwikkelproces?",
        antwoord:
          "AI helpt bij analyse, code, testen, documentatie en beheer. Een mens beoordeelt en accordeert, en dezelfde reviewregels blijven gelden.",
      },
      {
        vraag: "We hebben al een CoE, wat voegen jullie toe?",
        antwoord:
          "Meestal ontbreekt niet de wil maar de structuur. Wij brengen het App Factory-model, ervaring uit eerdere schaaltrajecten en mensen die het samen met jullie doen.",
      },
    ],

    teamTitel: "Wie je bij ons aan tafel krijgt",
    team: [],

    ctaTitel: "Wat breekt er als jullie het aantal apps verdubbelen?",
    ctaTekst:
      "Plan een uur met iemand die meerdere Mendix-landschappen heeft zien groeien. We benoemen wat als eerste knelt en wat je daaraan kunt doen.",
  },
};

export const SECTOR_SLUGS = Object.keys(SECTOREN);
