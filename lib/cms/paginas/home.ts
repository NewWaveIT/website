import type { FieldDef } from "../schema";

/** De velden die de editor voor deze pagina toont. */
export const VELDEN = [
  { key: "heroTitleStart", label: "Hero — titel (begin)", type: "text" },
  { key: "heroAccent", label: "Hero — accentwoord", type: "text" },
  { key: "heroTitleEnd", label: "Hero — titel (eind)", type: "text" },
  { key: "heroLead", label: "Hero — introtekst", type: "textarea" },
  { key: "ctaTitel", label: "Slot-CTA — titel", type: "text" },
  { key: "ctaKnop", label: "Slot-CTA — knoptekst", type: "text" },
  { key: "mensenKicker", label: "Mensen — kicker", type: "text" },
  { key: "mensenTitel", label: "Mensen — titel", type: "text" },
  { key: "mensenP1", label: "Mensen — alinea 1", type: "textarea" },
  { key: "mensenP2", label: "Mensen — alinea 2", type: "textarea" },
  { key: "proofKop", label: "Klantenband — kopje", type: "text" },
  { key: "sectorenMeer", label: "Sectoren — regel onder de lijst", type: "text" },
  { key: "casesAlle", label: "Klantverhalen — link naar het overzicht", type: "text" },
  { key: "mensenAward", label: "Mensen — zin over de award", type: "textarea" },
  { key: "mensenKnop", label: "Mensen — eerste knop", type: "text" },
  { key: "mensenLink", label: "Mensen — tweede link", type: "text" },
  { key: "inzichtenAlle", label: "Inzichten — link naar het overzicht", type: "text" },
  { key: "inzichtenMeer", label: "Inzichten — link per artikel", type: "text" },
  { key: "dienstenKicker", label: "Diensten — kicker", type: "text" },
  { key: "dienstenTitel", label: "Diensten — titel", type: "text" },
  { key: "dienstenIntro", label: "Diensten — introtekst", type: "textarea" },
  { key: "sectorenKicker", label: "Sectoren — kicker", type: "text" },
  { key: "sectorenTitel", label: "Sectoren — titel", type: "text" },
  { key: "sectorenIntro", label: "Sectoren — introtekst", type: "textarea" },
  { key: "casesKicker", label: "Klantverhalen — kicker", type: "text" },
  { key: "casesTitel", label: "Klantverhalen — titel", type: "text" },
  { key: "inzichtenKicker", label: "Inzichten — kicker", type: "text" },
  { key: "inzichtenTitel", label: "Inzichten — titel", type: "text" },
] as const satisfies readonly FieldDef[];

/** Standaardtekst per veld: de startwaarde in de editor en de terugval op de site. */
export const TEKSTEN = {
  heroTitleStart: "Business en IT als ",
  heroAccent: "één beweging",
  heroTitleEnd: ".",
  heroLead:
    "Sectorkennis, Mendix en AI in één team, van eerste sessie tot werkende software voor de mensen die ermee werken.",
  ctaTitel: "Samen bouwen aan schaalbare groei?",
  ctaKnop: "Plan een gesprek",
  mensenKicker: "De mens centraal",
  mensenTitel: "Je werkt met mensen, niet met een leverancier.",
  mensenP1:
    "Geen anonieme delivery-machine: bij ons ken je de mensen die jouw vraagstuk oplossen. Gepassioneerde consultants en engineers die naast je team staan, van eerste sessie tot livegang en daarna. Van wekelijkse Wavetime-sessies tot onze jaarlijkse Company week, we investeren structureel in hoe we sámen werken, niet alleen in wat we opleveren.",
  proofKop: "Vertrouwd door",
  sectorenMeer: "Niet jouw sector? Plan een verkenning",
  casesAlle: "Alle klantverhalen",
  mensenAward:
    "Dat onze mensen hier met plezier werken, blijkt ook extern: The New Wave IT is bekroond in de Computable Werkgevers Awards 2025.",
  mensenKnop: "Ontmoet ons team",
  mensenLink: "Werken bij The New Wave IT",
  inzichtenAlle: "Alle inzichten",
  inzichtenMeer: "Lees meer",
  dienstenKicker: "Hoe wij het doen",
  dienstenTitel: "Jouw uitdaging, drie richtingen naar de oplossing.",
  dienstenIntro:
    "Een proces dat vastloopt, een systeem dat niet meebeweegt, een koers die nog moet landen. Mendix, AI en strategie zijn de drie richtingen waarlangs we dat aanpakken. Elke richting begint met een concreet product van één dag met een vaste prijs, zodat je snel weet waar je aan toe bent.",
  sectorenKicker: "Onze sectoren",
  sectorenTitel: "Wij spreken de taal van jouw sector.",
  sectorenIntro:
    "Wij kennen de regels, de systemen en de druk waaronder jouw organisatie werkt. Daardoor leveren we sneller iets dat écht past.",
  casesKicker: "Klantverhalen",
  casesTitel: "Business-impact, geen technische anekdote.",
  inzichtenKicker: "Inzichten & thought leadership",
  inzichtenTitel: "Sectorkennis die je helpt voorop te lopen",
  mensenP2:
    "Ons doel? Dat jouw mensen er beter van worden. Technologie is het middel, de mens is de maat.",
} satisfies Record<(typeof VELDEN)[number]["key"], string>;
