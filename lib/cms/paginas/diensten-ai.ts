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
  metaTitle: "AI: van AI Agent in a Day tot de Opportunity Scan",
  metaDescription:
    "Twee diensten om met AI te starten: de AI Agent in a Day-workshop en de AI Opportunity Scan om de grootste kansen te prioriteren.",
  badgeLabel: "AI",
  heroTitleStart: "Van eerste agent tot geprioriteerde kansen.",
  heroLead:
    "Twee diensten: bouw in één dag je eerste werkende agent, of breng in een halve dag in kaart waar AI bij jullie geld oplevert.",
  crossrefTitel: "Ook relevant vanuit AI",
  ctaTitel: "Welke stap past bij jullie AI-ambitie?",
} satisfies Record<(typeof VELDEN)[number]["key"], string>;
