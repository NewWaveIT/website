/**
 * De navigatie van het CMS.
 *
 * De groepen volgen de publieke site, niet het datamodel: wie iets wil
 * aanpassen denkt in "de sectorpagina's" of "het aanbod", niet in
 * contenttypen. Daarom staan Proposities bij Sectoren (daar verschijnen ze) en
 * Richtingen bij Diensten (de hubs waaronder ze hangen), en heet `cases` hier
 * Klantverhalen — zoals op de site.
 */

/** De iconen die de sidebar kent. Deze lijst en de `ICONS`-map in
 *  components/admin/sidebar.tsx houden elkaar in bedwang: een sleutel die daar
 *  ontbreekt is een typefout, geen stilzwijgend verdwenen icoon. */
export type AdminNavIcon =
  | "layout-dashboard"
  | "file-text"
  | "layers"
  | "list-checks"
  | "building-2"
  | "package"
  | "quote"
  | "newspaper"
  | "user-round"
  | "briefcase"
  | "inbox"
  | "user-check"
  | "shield"
  | "history";

export interface AdminNavItem {
  href: string;
  label: string;
  icon: AdminNavIcon;
  countKey?: string;
}
export interface AdminNavGroup {
  groep: string;
  items: AdminNavItem[];
}

export const ADMIN_NAV: AdminNavGroup[] = [
  {
    groep: "Overzicht",
    items: [
      { href: "/admin", label: "Dashboard", icon: "layout-dashboard" },
      { href: "/admin/paginas", label: "Pagina's", icon: "file-text", countKey: "paginas" },
    ],
  },
  {
    groep: "Aanbod",
    items: [
      { href: "/admin/diensten", label: "Richtingen", icon: "layers", countKey: "diensten" },
      { href: "/admin/services", label: "Diensten", icon: "list-checks", countKey: "services" },
    ],
  },
  {
    groep: "Sectoren",
    items: [
      {
        href: "/admin/sectoren",
        label: "Sectorpagina's",
        icon: "building-2",
        countKey: "sectoren",
      },
      {
        href: "/admin/proposities",
        label: "Proposities",
        icon: "package",
        countKey: "proposities",
      },
    ],
  },
  {
    groep: "Verhalen",
    items: [
      { href: "/admin/cases", label: "Klantverhalen", icon: "quote", countKey: "cases" },
      { href: "/admin/inzichten", label: "Inzichten", icon: "newspaper", countKey: "artikelen" },
    ],
  },
  {
    groep: "Organisatie",
    items: [
      { href: "/admin/teamleden", label: "Teamleden", icon: "user-round", countKey: "teamleden" },
      { href: "/admin/vacatures", label: "Vacatures", icon: "briefcase", countKey: "vacatures" },
    ],
  },
  {
    groep: "Opvolging",
    items: [
      { href: "/admin/aanvragen", label: "Aanvragen", icon: "inbox", countKey: "aanvragen" },
      {
        href: "/admin/sollicitaties",
        label: "Sollicitaties",
        icon: "user-check",
        countKey: "sollicitaties",
      },
    ],
  },
  {
    groep: "Beheer",
    items: [
      { href: "/admin/gebruikers", label: "Gebruikers", icon: "shield" },
      { href: "/admin/activiteit", label: "Activiteit", icon: "history" },
    ],
  },
];
