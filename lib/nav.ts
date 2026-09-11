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

/** Dropdown onder "Diensten": alleen de 3 richtingen. De losse diensten zijn
 *  bereikbaar via het overzicht (waar de hoofdlink "Diensten" zelf naartoe gaat). */
export const NAV_DIENSTEN: NavLink[] = [
  { label: "Mendix", href: "/diensten/mendix" },
  { label: "AI", href: "/diensten/ai" },
  { label: "Strategie", href: "/diensten/strategie" },
];

/**
 * De kolom "Bedrijf" in de footer: dezelfde pagina's als de hoofdnavigatie,
 * min Sectoren en Contact — die hebben hun eigen kolom.
 *
 * Bewust één ingang naar de diensten en niet ook nog Mendix, AI en Strategie:
 * dat overzicht is de beginpagina, en de drie richtingen zijn daarvandaan en
 * via de dropdown bereikbaar. "Over ons" stond hier eerder helemaal niet in,
 * terwijl de kolom er wel naar heet.
 */
export const FOOTER_BEDRIJF: NavLink[] = [
  { label: "Diensten", href: "/diensten" },
  { label: "Klantverhalen", href: "/klantverhalen" },
  { label: "Inzichten", href: "/inzichten" },
  { label: "Over ons", href: "/over-ons" },
  { label: "Werken bij", href: "/werken-bij" },
];
