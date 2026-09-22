import type { SectorDetail } from "@/lib/sectoren-detail";

export const MOBILITEIT: SectorDetail = {
  slug: "mobiliteit",
  naam: "Mobiliteit & logistiek",
  icon: "truck",
  heroTheme: "mobiliteit",
  metaTitle: "Software voor mobiliteit en logistiek: werkplaats, fleet en keten verbonden",
  metaDescription:
    "Apps bovenop je bestaande ERP, TMS en voertuigdata. Snellere service, minder stilstand en realtime inzicht van werkplaats tot last mile.",

  hook: "“Onze assets worden slimmer, onze systemen niet.”",
  pitch:
    "Wij verbinden werkplaats, fleet, warehouse en klantproces in apps die live zijn binnen weken.",
  kpiLabel: "Realtime inzicht",

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

  bouwenTitel: "Voorbeeldcases",
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
      tekst: "Scannen, orderpicking, schaderapportage en voorraadcorrecties op één mobiel device.",
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
    "We laten het landen bij technici, planners en klantcontact. Daar maken zij het verschil.",
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
};
