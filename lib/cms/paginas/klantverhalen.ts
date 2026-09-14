import type { FieldDef } from "../schema";

/** De velden die de editor voor deze pagina toont. */
export const VELDEN = [
  { key: "kaartLink", label: "Kaart — linktekst", type: "text" },
  { key: "metaTitle", label: "Meta-titel", type: "text" },
  { key: "metaDescription", label: "Meta-omschrijving", type: "textarea" },
  { key: "heroKicker", label: "Hero — kicker", type: "text" },
  { key: "heroTitleStart", label: "Hero — titel (begin)", type: "text" },
  { key: "heroAccent", label: "Hero — accentwoord", type: "text" },
  { key: "heroTitleEnd", label: "Hero — titel (eind)", type: "text" },
  { key: "heroLead", label: "Hero — introtekst", type: "textarea" },
  { key: "uitgelichtKicker", label: "Uitgelicht — kicker", type: "text" },
  { key: "beloftesKicker", label: "Sectorbeloftes — kicker", type: "text" },
  { key: "beloftesTitel", label: "Sectorbeloftes — titel", type: "text" },
  { key: "beloftesIntro", label: "Sectorbeloftes — intro", type: "textarea" },
  { key: "ctaTitel", label: "Slot-CTA — titel", type: "text" },
] as const satisfies readonly FieldDef[];

/** Standaardtekst per veld: de startwaarde in de editor en de terugval op de site. */
export const TEKSTEN = {
  kaartLink: "Lees het volledige verhaal →",
  metaTitle: "Klantverhalen: resultaat dat je kunt navragen",
  metaDescription:
    "Verhalen van organisaties in de publieke sector, mobiliteit, banken, zorg en manufacturing, verteld met de cijfers erbij.",
  heroKicker: "Klantverhalen",
  heroTitleStart: "Resultaat dat je kunt ",
  heroAccent: "navragen",
  heroTitleEnd: ".",
  heroLead:
    "Business-impact, geen technische anekdote. Hier laten we zien wat er daadwerkelijk verandert bij een klant als strategie, Mendix en AI samenkomen: minder handwerk, snellere processen, meetbaar resultaat.",
  uitgelichtKicker: "Uitgelicht",
  beloftesKicker: "Onze sectoren",
  beloftesTitel: "Nog geen klantverhaal in jouw sector? Dit is wat je kunt verwachten.",
  beloftesIntro:
    "We werken pas kort genoeg samen met organisaties als Moove om al hun verhaal te kunnen delen. De rest volgt. Hieronder alvast het type resultaat dat we per sector al aantoonbaar leveren.",
  ctaTitel: "Herken je jouw vraagstuk in deze verhalen?",
} satisfies Record<(typeof VELDEN)[number]["key"], string>;
