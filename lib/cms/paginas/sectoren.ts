import type { FieldDef } from "../schema";

/** De velden die de editor voor deze pagina toont. */
export const VELDEN = [
  { key: "heroTitleStart", label: "Hero — titel (begin)", type: "text" },
  { key: "heroAccent", label: "Hero — accentwoord", type: "text" },
  { key: "heroLead", label: "Hero — introtekst", type: "textarea" },
  { key: "heroKicker", label: "Hero — kicker", type: "text" },
  { key: "keuzeKicker", label: "Sectorkiezer — kicker", type: "text" },
  { key: "keuzeTitel", label: "Sectorkiezer — titel", type: "text" },
  { key: "keuzeIntro", label: "Sectorkiezer — introtekst", type: "textarea" },
  { key: "keuzeMeer", label: "Sectorkiezer — regel onder de lijst", type: "text" },
  { key: "werkwijzeKicker", label: "Waarom sectorfocus — kicker", type: "text" },
  { key: "werkwijzeTitel", label: "Waarom sectorfocus — titel", type: "text" },
  { key: "wijze1Titel", label: "Reden 1 — titel", type: "text" },
  { key: "wijze1Tekst", label: "Reden 1 — tekst", type: "textarea" },
  { key: "wijze2Titel", label: "Reden 2 — titel", type: "text" },
  { key: "wijze2Tekst", label: "Reden 2 — tekst", type: "textarea" },
  { key: "wijze3Titel", label: "Reden 3 — titel", type: "text" },
  { key: "wijze3Tekst", label: "Reden 3 — tekst", type: "textarea" },
  { key: "ctaTitel", label: "Slot-CTA — titel", type: "text" },
] as const satisfies readonly FieldDef[];

/** Standaardtekst per veld: de startwaarde in de editor en de terugval op de site. */
export const TEKSTEN = {
  heroTitleStart: "Wij spreken de taal van ",
  heroAccent: "jouw sector",
  heroLead:
    "Wij kiezen bewust voor vijf sectoren in plaats van generiek IT-advies: publieke sector, mobiliteit, banken, zorg en manufacturing. In elke sector kennen we de regels, de systemen en de druk waaronder jouw organisatie werkt. Daardoor leveren we sneller iets dat écht past, in plaats van een generieke oplossing die overal een beetje werkt.",
  heroKicker: "Sectoren",
  keuzeKicker: "Vijf focusmarkten",
  keuzeTitel: "Kies jouw sector.",
  keuzeIntro:
    "Beweeg over een sector om het beeld te wisselen, of klik door naar de volledige sectoroplossing.",
  keuzeMeer: "Jouw sector er niet bij?",
  werkwijzeKicker: "Waarom sectorfocus",
  werkwijzeTitel: "Wat sectorkennis je oplevert",
  wijze1Titel: "Geen inwerktijd",
  wijze1Tekst:
    "We kennen de wetgeving, ketens en kernsystemen van jouw markt. Het eerste gesprek gaat meteen over jouw vraagstuk.",
  wijze2Titel: "Bewezen patronen",
  wijze2Tekst:
    "Oplossingen die zich in jouw sector al bewezen hebben, vertalen we naar jouw organisatie, sneller live, minder risico.",
  wijze3Titel: "Netwerk dat meedenkt",
  wijze3Tekst:
    "Via onze partners en klanten in de sector leer je van organisaties die hetzelfde vraagstuk al oplosten.",
  ctaTitel: "Benieuwd wat dit voor jouw organisatie betekent?",
} satisfies Record<(typeof VELDEN)[number]["key"], string>;
