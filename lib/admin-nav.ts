export interface AdminNavItem {
  href: string;
  label: string;
  icon: string; // lucide key
  countKey?: string;
}
export interface AdminNavGroup {
  groep: string;
  items: AdminNavItem[];
}

export const ADMIN_NAV: AdminNavGroup[] = [
  {
    groep: "Overzicht",
    items: [{ href: "/admin", label: "Dashboard", icon: "layout-dashboard" }],
  },
  {
    groep: "Content",
    items: [
      { href: "/admin/paginas", label: "Pagina's", icon: "file-text", countKey: "paginas" },
      { href: "/admin/cases", label: "Cases", icon: "briefcase", countKey: "cases" },
      { href: "/admin/diensten", label: "Richtingen", icon: "layers", countKey: "diensten" },
      { href: "/admin/services", label: "Diensten", icon: "list-checks", countKey: "services" },
      { href: "/admin/sectoren", label: "Sectoren", icon: "building-2", countKey: "sectoren" },
      {
        href: "/admin/proposities",
        label: "Proposities",
        icon: "package",
        countKey: "proposities",
      },
      { href: "/admin/inzichten", label: "Inzichten", icon: "newspaper", countKey: "artikelen" },
      { href: "/admin/vacatures", label: "Vacatures", icon: "users", countKey: "vacatures" },
      { href: "/admin/teamleden", label: "Teamleden", icon: "user-round", countKey: "teamleden" },
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
