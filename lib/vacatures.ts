/** Vacatures voor /werken-bij en /vacatures/[slug]. */

export interface VacatureSectie {
  titel: string;
  items: string[];
}

export interface Vacature {
  slug: string;
  functietitel: string;
  discipline: string; // korte label voor de lijst, bv. "Mendix · Senior"
  locatie: string;
  tags: string[];
  intro: string;
  secties: VacatureSectie[];
  facts: { team: string; niveau: string; locatie: string; uren: string; salaris: string };
  employmentType: string;
  gepubliceerdOp: string;
}

export const VACATURES: Vacature[] = [
  {
    slug: "lead-mendix-consultant",
    functietitel: "Lead Mendix Consultant",
    discipline: "Mendix · Senior",
    locatie: "Utrecht / hybride",
    tags: ["Mendix", "Senior", "Utrecht / hybride", "32–40 uur"],
    intro:
      "Jij bouwt niet alleen applicaties, je bouwt vertrouwen. Als lead ben je het technisch geweten van je team én de sparringpartner van de klant, in sectoren waar jouw werk er echt toe doet.",
    secties: [
      {
        titel: "Wat ga je doen?",
        items: [
          "Technisch leiderschap over één of twee opdrachtteams",
          "Architectuurkeuzes en code reviews die het verschil maken",
          "Sparringpartner van product owners en IT-management bij de klant",
          "Bijdragen aan onze Mendix-practice: standaarden, templates, kennissessies",
        ],
      },
      {
        titel: "Wat breng je mee?",
        items: [
          "5+ jaar Mendix-ervaring, Expert-certificering of de ambitie die snel te halen",
          "Ervaring met complexe integraties en enterprise-architectuur",
          "Je coacht van nature en geeft (en vraagt) open feedback",
          "Nederlands vloeiend, Engels professioneel",
        ],
      },
      {
        titel: "Wat bieden we?",
        items: [
          "Salaris tussen €5.500 en €7.000, transparant en gelijk bij gelijke ervaring",
          "Zeggenschap: je beslist mee over strategie en investeringen",
          "Persoonlijk groeipad, 360°-feedback en de jaarlijkse learning week",
          "Elektrische auto van de zaak, hybride werken vanuit Utrecht",
        ],
      },
    ],
    facts: {
      team: "Mendix",
      niveau: "Senior / Lead",
      locatie: "Utrecht / hybride",
      uren: "32–40 per week",
      salaris: "€5.500–€7.000",
    },
    employmentType: "FULL_TIME",
    gepubliceerdOp: "2026-05-01",
  },
  {
    slug: "ai-engineer",
    functietitel: "AI Engineer",
    discipline: "AI · Medior",
    locatie: "Utrecht / hybride",
    tags: ["AI", "Medior", "Utrecht / hybride", "32–40 uur"],
    intro:
      "Jij brengt AI van experiment naar geborgd proces. Verantwoord, uitlegbaar en met de professional aan het stuur, in sectoren waar betrouwbaarheid telt.",
    secties: [
      {
        titel: "Wat ga je doen?",
        items: [
          "Werkende AI-pilots bouwen in de omgeving van onze partners",
          "Documentintelligentie, generatieve AI en besluitondersteuning realiseren",
          "AI integreren met Mendix-applicaties en bestaande datalandschappen",
          "Meebouwen aan onze AI-practice: patronen, governance en kennisdeling",
        ],
      },
      {
        titel: "Wat breng je mee?",
        items: [
          "3+ jaar ervaring met machine learning of applied AI",
          "Sterk in Python en het geborgd naar productie brengen van modellen",
          "Oog voor uitlegbaarheid, AVG en de AI Act",
          "Nederlands vloeiend, Engels professioneel",
        ],
      },
      {
        titel: "Wat bieden we?",
        items: [
          "Salaris tussen €4.500 en €6.000, transparant en gelijk bij gelijke ervaring",
          "Zeggenschap: je beslist mee over strategie en investeringen",
          "Persoonlijk groeipad, 360°-feedback en de jaarlijkse learning week",
          "Elektrische auto van de zaak, hybride werken vanuit Utrecht",
        ],
      },
    ],
    facts: {
      team: "AI",
      niveau: "Medior",
      locatie: "Utrecht / hybride",
      uren: "32–40 per week",
      salaris: "€4.500–€6.000",
    },
    employmentType: "FULL_TIME",
    gepubliceerdOp: "2026-05-01",
  },
  {
    slug: "business-consultant",
    functietitel: "Business Consultant",
    discipline: "Strategie · Medior/Senior",
    locatie: "Utrecht / hybride",
    tags: ["Strategie", "Medior/Senior", "Utrecht / hybride", "32–40 uur"],
    intro:
      "Jij verbindt business en IT en blijft aan boord tot het werkt. Geen rapport voor in de la, maar mijlpalen die de operatie van onze partners meteen merkt.",
    secties: [
      {
        titel: "Wat ga je doen?",
        items: [
          "Businessvraagstukken vertalen naar een gedragen digitale roadmap",
          "Businesscases opstellen en initiatieven prioriteren met de klant",
          "Transformaties begeleiden, met meetbare mijlpalen per kwartaal",
          "Bruggen bouwen tussen directie, IT en de werkvloer",
        ],
      },
      {
        titel: "Wat breng je mee?",
        items: [
          "4+ jaar ervaring in consulting, business analyse of digitale transformatie",
          "Je schakelt moeiteloos tussen boardroom en werkvloer",
          "Analytisch sterk, met gevoel voor verandermanagement",
          "Nederlands vloeiend, Engels professioneel",
        ],
      },
      {
        titel: "Wat bieden we?",
        items: [
          "Salaris tussen €4.500 en €6.500, transparant en gelijk bij gelijke ervaring",
          "Zeggenschap: je beslist mee over strategie en investeringen",
          "Persoonlijk groeipad, 360°-feedback en de jaarlijkse learning week",
          "Elektrische auto van de zaak, hybride werken vanuit Utrecht",
        ],
      },
    ],
    facts: {
      team: "Strategie",
      niveau: "Medior / Senior",
      locatie: "Utrecht / hybride",
      uren: "32–40 per week",
      salaris: "€4.500–€6.500",
    },
    employmentType: "FULL_TIME",
    gepubliceerdOp: "2026-05-01",
  },
];

export const VACATURE_MAP: Record<string, Vacature> = Object.fromEntries(
  VACATURES.map((v) => [v.slug, v]),
);
export const VACATURE_SLUGS = VACATURES.map((v) => v.slug);
