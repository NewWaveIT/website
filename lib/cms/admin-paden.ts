import type { ContentType } from "@/lib/cms/content";

/**
 * Per contenttype: hoe het heet, waar de lijst staat, en waar het op de site
 * te zien is.
 *
 * Dit stond vier keer los in de admin — `LIST_PATH` in
 * app/admin/content/actions.ts, `META` in de editorroute, `TYPE_LABEL` plus
 * `ADMIN_PATH` op de activiteitenpagina en `VIEW_BASE` in de editor — met
 * telkens net andere labels ("Klantverhaal" tegenover "Case", "Richting"
 * tegenover "Dienst") en drie van de vier onvolledig. Eén tabel, en een
 * ontbrekend type is nu een typefout.
 *
 * `pad` is het publieke pad; ontbreekt het, dan heeft het type geen eigen
 * pagina op de site (teamleden en proposities verschijnen ín andere pagina's).
 */
export interface AdminPad {
  /** Enkelvoud, zoals het in de admin voor de gebruiker staat. */
  label: string;
  /** Meervoud, voor kopjes en overzichten. */
  meervoud: string;
  /** De lijstpagina in de admin. */
  lijst: string;
  /** Basis van het publieke pad; de slug komt erachter. */
  pad?: string;
}

export const ADMIN_PADEN: Record<ContentType, AdminPad> = {
  paginas: { label: "Pagina", meervoud: "Pagina's", lijst: "/admin/paginas" },
  cases: {
    label: "Klantverhaal",
    meervoud: "Klantverhalen",
    lijst: "/admin/cases",
    pad: "/klantverhalen",
  },
  diensten: {
    label: "Richting",
    meervoud: "Richtingen",
    lijst: "/admin/diensten",
    pad: "/diensten",
  },
  services: { label: "Dienst", meervoud: "Diensten", lijst: "/admin/services", pad: "/diensten" },
  sectoren: {
    label: "Sector",
    meervoud: "Sectorpagina's",
    lijst: "/admin/sectoren",
    pad: "/sectoren",
  },
  proposities: { label: "Propositie", meervoud: "Proposities", lijst: "/admin/proposities" },
  artikelen: {
    label: "Inzicht",
    meervoud: "Inzichten",
    lijst: "/admin/inzichten",
    pad: "/inzichten",
  },
  vacatures: {
    label: "Vacature",
    meervoud: "Vacatures",
    lijst: "/admin/vacatures",
    pad: "/vacatures",
  },
  teamleden: { label: "Teamlid", meervoud: "Teamleden", lijst: "/admin/teamleden" },
};

/** De bewerkpagina van één item; `new` voor een nieuw item. */
export function bewerkPad(type: ContentType, id: string): string {
  return `/admin/content/${type}/${id}`;
}
