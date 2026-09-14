import type { FieldDef } from "../schema";

/** De velden die de editor voor deze pagina toont. */
export const VELDEN = [
  { key: "uitdagingTitel", label: "Uitdaging — titel", type: "text" },
  { key: "aanpakTitel", label: "Aanpak — titel", type: "text" },
  { key: "subkopSituatie", label: "Aanpak — subkop situatie", type: "text" },
  { key: "subkopAanpak", label: "Aanpak — subkop aanpak", type: "text" },
  { key: "subkopFunctionaliteiten", label: "Aanpak — subkop functionaliteiten", type: "text" },
  { key: "subkopResultaat", label: "Aanpak — subkop resultaat", type: "text" },
  { key: "resultaatTitel", label: "Resultaat — titel", type: "text" },
  { key: "projectTitel", label: "Over dit project — titel", type: "text" },
  { key: "labelSector", label: "Over dit project — label sector", type: "text" },
  { key: "labelDiensten", label: "Over dit project — label diensten", type: "text" },
  { key: "labelDoorlooptijd", label: "Over dit project — label doorlooptijd", type: "text" },
  { key: "labelTeam", label: "Over dit project — label team", type: "text" },
  { key: "projectKnop", label: "Over dit project — knoptekst", type: "text" },
  { key: "meerKicker", label: "Meer klantverhalen — kicker", type: "text" },
  { key: "meerTitel", label: "Meer klantverhalen — titel", type: "text" },
  { key: "meerAlle", label: "Meer klantverhalen — link naar het overzicht", type: "text" },
  { key: "meerLees", label: "Meer klantverhalen — link per verhaal", type: "text" },
  { key: "ctaTitel", label: "Slot-CTA — titel", type: "text" },
] as const satisfies readonly FieldDef[];

/** Standaardtekst per veld: de startwaarde in de editor en de terugval op de site. */
export const TEKSTEN = {
  uitdagingTitel: "De uitdaging",
  aanpakTitel: "De aanpak",
  subkopSituatie: "Situatie & uitdaging",
  subkopAanpak: "Onze aanpak",
  subkopFunctionaliteiten: "De functionaliteiten",
  subkopResultaat: "Resultaat",
  resultaatTitel: "Het resultaat",
  projectTitel: "Over dit project",
  labelSector: "Sector",
  labelDiensten: "Diensten",
  labelDoorlooptijd: "Doorlooptijd",
  labelTeam: "Team",
  projectKnop: "Vergelijkbaar vraagstuk?",
  meerKicker: "Meer klantverhalen",
  meerTitel: "Resultaten in andere sectoren",
  meerAlle: "Alle verhalen",
  meerLees: "Lees het verhaal",
  ctaTitel: "Herken je dit vraagstuk in jouw organisatie?",
} satisfies Record<(typeof VELDEN)[number]["key"], string>;
