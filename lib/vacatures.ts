/**
 * Vacatures voor /werken-bij en /vacatures/[slug].
 *
 * De teksten komen letterlijk uit de vacature-PDF's op thenewwaveit.com/join-us/
 * (Medior en Senior Mendix consultant, 2025). Niet aanvullen met verzonnen
 * arbeidsvoorwaarden of salarisbedragen: wat hier staat is een toezegging aan
 * een sollicitant. De open sollicitatie is geen vacature maar het formulier
 * onderaan /werken-bij.
 */

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

/** Gedeelde blokken: beide vacatures hebben in de PDF identieke tekst. */
const ROL_ITEMS = [
  "Het uitbouwen van AI-capabilities in Mendix-omgevingen",
  "Het bouwen van klantrelaties door intensieve partnerships te ontwikkelen",
  "Coaching van junior en medior collega's",
  "Het leveren van strategisch advies aan klanten en hen meenemen in digitale transformaties",
  "Het ontwikkelen van innovatieve oplossingen die onze partners helpen groeien",
];

const PROFIEL_STAART = [
  "Advanced of Expert Mendix-certificering",
  "Kennis van of affiniteit met AI",
  "HBO- of WO-werk- en denkniveau",
  "Ervaring met Scrum/Agile werken",
  "Enthousiast om onze kernwaarden (Idealistisch, Jij op 1, Synergie, Transparantie, Groei & Vooruitgang) uit te dragen",
  "Initiatiefrijk en gemotiveerd om zowel de organisatie als jezelf continu te verbeteren",
];

const PROCES = [
  "Een eerste gesprek waarin we jouw ambitie en ervaring bespreken",
  "Een technisch assessment/gesprek",
  "Een gesprek voor culturele fit",
  "Een voorstel dat past bij jouw wensen",
];

const INTRO =
  "Als Mendix Consultant ontwerp en implementeer jij slimme IT-oplossingen die bedrijven helpen hun grootste uitdagingen aan te gaan. Bij ons krijg je de vrijheid om jouw expertise en ambitie te combineren met onze visie op strategische IT-partnerships. Van het ontwikkelen van AI-capabilities tot het leiden van projecten bij klanten: jouw bijdrage is essentieel voor ons gezamenlijke succes.";

function aanbod(salarisregel: string): string[] {
  return [
    salarisregel,
    "Een jaarcontract met uitzicht op een vast dienstverband",
    "Onbeperkt vakantiedagen",
    "Jouw persoonlijke groeipad en opleidingen op maat",
    "Uitdagende projecten bij toonaangevende klanten",
    "Mobiliteitsopties zoals een OV-chipkaart",
    "Een pensioenregeling",
    "Een organisatie waar jij écht invloed hebt op strategie en richting",
    "Een mensgerichte ervaring waarin jouw welzijn en groei centraal staan",
    "Een innovatieve omgeving waar jouw creativiteit en ondernemerschap wordt gestimuleerd",
  ];
}

export const VACATURES: Vacature[] = [
  {
    slug: "medior-mendix-consultant",
    functietitel: "Medior Mendix Consultant",
    discipline: "Mendix · Medior",
    locatie: "Utrecht / hybride",
    tags: ["Mendix", "Medior", "Utrecht / hybride"],
    intro: INTRO,
    secties: [
      { titel: "Waarom begin jij met enthousiasme je werkdag?", items: ROL_ITEMS },
      {
        titel: "Wie ben jij?",
        items: [
          "Minimaal 2,5 jaar ervaring als Mendix Consultant of een bewezen snelle leercurve",
          ...PROFIEL_STAART,
        ],
      },
      { titel: "Wat bieden wij jou?", items: aanbod("Een uitstekend salaris") },
      { titel: "Het sollicitatieproces", items: PROCES },
    ],
    facts: {
      team: "Mendix",
      niveau: "Medior",
      locatie: "Utrecht / hybride",
      uren: "In overleg",
      salaris: "Marktconform",
    },
    employmentType: "FULL_TIME",
    gepubliceerdOp: "2025-06-01",
  },
  {
    slug: "senior-mendix-consultant",
    functietitel: "Senior Mendix Consultant",
    discipline: "Mendix · Senior",
    locatie: "Utrecht / hybride",
    tags: ["Mendix", "Senior", "Utrecht / hybride"],
    intro: INTRO,
    secties: [
      { titel: "Waarom begin jij met enthousiasme je werkdag?", items: ROL_ITEMS },
      {
        titel: "Wie ben jij?",
        items: [
          "Minimaal 4 jaar ervaring als Mendix Consultant of een bewezen snelle leercurve",
          ...PROFIEL_STAART,
        ],
      },
      {
        titel: "Wat bieden wij jou?",
        items: aanbod("Een uitstekend salaris met een aantrekkelijk bonuscomponent"),
      },
      { titel: "Het sollicitatieproces", items: PROCES },
    ],
    facts: {
      team: "Mendix",
      niveau: "Senior",
      locatie: "Utrecht / hybride",
      uren: "In overleg",
      salaris: "Marktconform, met bonuscomponent",
    },
    employmentType: "FULL_TIME",
    gepubliceerdOp: "2025-03-01",
  },
];

export const VACATURE_SLUGS = VACATURES.map((v) => v.slug);
export const VACATURE_MAP = Object.fromEntries(VACATURES.map((v) => [v.slug, v]));
