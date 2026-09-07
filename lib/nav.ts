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

/** Dropdown onder "Diensten": het overzicht, de 3 richtingen, en de 3 diensten met een eigen pagina. */
export const NAV_DIENSTEN: NavLink[] = [
  { label: "Zo begin je", href: "/diensten" },
  { label: "Mendix", href: "/diensten/mendix" },
  { label: "AI", href: "/diensten/ai" },
  { label: "Strategie", href: "/diensten/strategie" },
  { label: "IT-strategie op low-code en AI", href: "/diensten/it-strategie" },
  { label: "Foundation Starterkit", href: "/diensten/foundation-starterkit" },
  { label: "Fusion Team Startsprint", href: "/diensten/fusion-team-startsprint" },
];

export const FOOTER_BEDRIJF: NavLink[] = [
  { label: "Zo begin je", href: "/diensten" },
  { label: "Mendix", href: "/diensten/mendix" },
  { label: "AI", href: "/diensten/ai" },
  { label: "Strategie", href: "/diensten/strategie" },
  { label: "Klantverhalen", href: "/klantverhalen" },
  { label: "Inzichten", href: "/inzichten" },
  { label: "Werken bij", href: "/werken-bij" },
];
