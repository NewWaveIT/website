import type { FieldDef } from "../schema";

/** De velden die de editor voor deze pagina toont. */
export const VELDEN = [
  { key: "metaTitle", label: "Meta-titel", type: "text" },
  { key: "metaDescription", label: "Meta-omschrijving", type: "textarea" },
  { key: "badgeLabel", label: "Hero — badge-label", type: "text" },
  { key: "heroTitleStart", label: "Hero — titel", type: "text" },
  { key: "heroLead", label: "Hero — introtekst", type: "textarea" },
  { key: "instapTitel", label: "Lichte instap — titel", type: "text" },
  { key: "instapTekst", label: "Lichte instap — tekst", type: "textarea" },
  { key: "instapKnop", label: "Lichte instap — knoptekst", type: "text" },
  { key: "crossrefTitel", label: "Kruisverwijzing — kicker", type: "text" },
  { key: "ctaTitel", label: "Slot-CTA — titel", type: "text" },
] as const satisfies readonly FieldDef[];

/** Standaardtekst per veld: de startwaarde in de editor en de terugval op de site. */
export const TEKSTEN = {
  metaTitle: "Strategie: van AI-strategie tot IT-strategie op low-code en AI",
  metaDescription:
    "Twee diensten om koers te bepalen: AI-strategie voor de directie en IT-strategie op low-code en AI voor de CIO.",
  badgeLabel: "Strategie",
  heroTitleStart: "Van eerste koers tot uitvoerbare roadmap.",
  heroLead:
    "Twee diensten voor twee vragen: waar verandert AI ons verdienmodel (directie), en waar past low-code in ons landschap (CIO).",
  instapTitel: "Nog aan het oriënteren?",
  instapTekst:
    "Begin met een korte, vrijblijvende kennismaking van twintig minuten. Geen verplichtingen, wel een eerlijk beeld van waar je staat.",
  instapKnop: "Plan een kennismaking (20 min)",
  crossrefTitel: "Ook relevant vanuit Strategie",
  ctaTitel: "Klaar om koers te bepalen?",
} satisfies Record<(typeof VELDEN)[number]["key"], string>;
