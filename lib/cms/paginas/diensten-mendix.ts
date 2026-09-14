import type { FieldDef } from "../schema";

/** De velden die de editor voor deze pagina toont. */
export const VELDEN = [
  { key: "metaTitle", label: "Meta-titel", type: "text" },
  { key: "metaDescription", label: "Meta-omschrijving", type: "textarea" },
  { key: "badgeLabel", label: "Hero — badge-label", type: "text" },
  { key: "heroTitleStart", label: "Hero — titel", type: "text" },
  { key: "heroLead", label: "Hero — introtekst", type: "textarea" },
  { key: "crossrefTitel", label: "Kruisverwijzing — kicker", type: "text" },
  { key: "ctaTitel", label: "Slot-CTA — titel", type: "text" },
] as const satisfies readonly FieldDef[];

/** Standaardtekst per veld: de startwaarde in de editor en de terugval op de site. */
export const TEKSTEN = {
  metaTitle: "Mendix: van App in a Day tot Fusion Team",
  metaDescription:
    "Drie diensten om met Mendix te starten of op te schalen: App in a Day, de Mendix Scale Sessie en de Fusion Team Startsprint.",
  badgeLabel: "Mendix",
  heroTitleStart: "Van eerste app tot schaalbaar platform.",
  heroLead:
    "Drie diensten, van een dag tot een traject: begin met een werkende app, bepaal je richting met een Scale Sessie, of bouw capaciteit op met een Fusion Team.",
  crossrefTitel: "Ook relevant vanuit Mendix",
  ctaTitel: "Welke stap past bij jouw Mendix-landschap?",
} satisfies Record<(typeof VELDEN)[number]["key"], string>;
