import type { NavLink } from "@/lib/types";

/** Hoofdnavigatie. */
export const NAV_LINKS: NavLink[] = [
  { label: "Sectoren", href: "/sectoren" },
  { label: "Diensten", href: "/diensten" },
  { label: "Klantverhalen", href: "/klantverhalen" },
  { label: "Inzichten", href: "/inzichten" },
  { label: "Over ons", href: "/over-ons" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_SECTOREN: NavLink[] = [
  { label: "Alle sectoren", href: "/sectoren" },
  { label: "Publieke sector", href: "/sectoren/publieke-sector" },
  { label: "Mobiliteit", href: "/sectoren/mobiliteit" },
  { label: "Banken", href: "/sectoren/banken" },
  { label: "Zorg", href: "/sectoren/zorg" },
  { label: "Manufacturing", href: "/sectoren/manufacturing" },
];

export const FOOTER_BEDRIJF: NavLink[] = [
  { label: "Mendix", href: "/diensten/mendix" },
  { label: "AI", href: "/diensten/ai" },
  { label: "Strategie", href: "/diensten/strategie" },
  { label: "Klantverhalen", href: "/klantverhalen" },
  { label: "Inzichten", href: "/inzichten" },
  { label: "Werken bij", href: "/werken-bij" },
];
