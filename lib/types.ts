/** Gedeelde content-types voor The New Wave IT. */

export type SectorSlug = "publieke-sector" | "mobiliteit" | "banken" | "zorg" | "manufacturing";

export type DienstSlug = "mendix" | "ai" | "strategie";

export interface NavLink {
  label: string;
  href: string;
}

export interface Sector {
  slug: SectorSlug;
  naam: string;
  icon: string;
  challenge: string;
}

export interface Dienst {
  slug: DienstSlug;
  naam: string;
  titel: string;
  omschrijving: string;
  punten: string[];
}

export interface ContactAanvraag {
  naam: string;
  email: string;
  bedrijf?: string;
  bericht: string;
  onderwerp?: string;
}
