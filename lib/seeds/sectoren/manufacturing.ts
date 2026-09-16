import type { SectorDetail } from "@/lib/sectoren-detail";

export const MANUFACTURING: SectorDetail = {
  slug: "manufacturing",
  naam: "Manufacturing",
  icon: "factory",
  heroTheme: "manufacturing",
  metaTitle: "Software voor manufacturing: planning, kwaliteit en shopfloor verbonden",
  metaDescription:
    "Applicaties bovenop je bestaande ERP, MES en machinedata. Kortere doorlooptijden, minder stilstand, live binnen weken.",

  hook: "“Onze machines produceren data die niemand gebruikt.”",
  pitch: "Wij bouwen planning, kwaliteit en shopfloor bovenop de data en het ERP die je al hebt.",
  kpiLabel: "Kortere omsteltijden",

  h1: "Productie die meebeweegt met de vraag",
  intro:
    "Je machines produceren al data en je ERP staat er al. Wij bouwen planning, kwaliteit en shopfloor daar bovenop. Live binnen weken.",

  herkenningTitel: "Wat we op productievloeren steeds terug horen",
  herkenning: [
    "“De machines produceren data, maar we sturen nog op gevoel.”",
    "“De planning van maandagochtend klopt woensdag al niet meer.”",
    "“Kwaliteitsdata zit in MES, LIMS en Excel, nergens bij elkaar.”",
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
      kost: "Verbeterpotentieel blijft op de vloer liggen; de vloer beslist op ervaring in plaats van op cijfers",
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
        "Quality apps met integraties naar MES, LIMS en PLM: registratie, afwijkingen en trends in één beeld",
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
  aanpakFoto: "/assets/photos/team-presentatie-ai.webp",
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
};
