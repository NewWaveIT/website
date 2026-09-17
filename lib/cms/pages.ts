// Per-pagina veldschema's voor het contenttype 'paginas'. Anders dan de andere
// typen heeft elke pagina (slug) zijn eigen set velden. De editor en de
// opslag-actie gebruiken deze wanneer het type 'paginas' is.
//
// Dit bestand is alleen de index. Elke slug staat in `./paginas/<slug>.ts` met
// zijn velden (`VELDEN`) en standaardteksten (`TEKSTEN`) naast elkaar; die twee
// liepen hier zeshonderd regels uit elkaar, waardoor een nieuw veld zonder
// standaardtekst kon blijven staan. Nu bewaakt elk bestand dat zelf: `TEKSTEN`
// heeft een `satisfies` op de sleutels van `VELDEN`, dus een veld zonder tekst
// (of een tekst zonder veld) is een compileerfout in datzelfde bestand.

import type { FieldDef } from "./schema";

import * as home from "./paginas/home";
import * as overOns from "./paginas/over-ons";
import * as contact from "./paginas/contact";
import * as diensten from "./paginas/diensten";
import * as dienstenMendix from "./paginas/diensten-mendix";
import * as dienstenAi from "./paginas/diensten-ai";
import * as dienstenStrategie from "./paginas/diensten-strategie";
import * as sectoren from "./paginas/sectoren";
import * as werkenBij from "./paginas/werken-bij";
import * as sectorDetail from "./paginas/sector-detail";
import * as vacatureDetail from "./paginas/vacature-detail";
import * as dienstDetail from "./paginas/dienst-detail";
import * as klantverhalen from "./paginas/klantverhalen";
import * as klantverhaalDetail from "./paginas/klantverhaal-detail";
import * as inzichten from "./paginas/inzichten";
import * as algemeen from "./paginas/algemeen";
import * as privacy from "./paginas/privacy";
import * as algemeneVoorwaarden from "./paginas/algemene-voorwaarden";

export const PAGE_FIELDS = {
  home: home.VELDEN,
  "over-ons": overOns.VELDEN,
  contact: contact.VELDEN,
  diensten: diensten.VELDEN,
  "diensten-mendix": dienstenMendix.VELDEN,
  "diensten-ai": dienstenAi.VELDEN,
  "diensten-strategie": dienstenStrategie.VELDEN,
  sectoren: sectoren.VELDEN,
  "werken-bij": werkenBij.VELDEN,
  "sector-detail": sectorDetail.VELDEN,
  "vacature-detail": vacatureDetail.VELDEN,
  "dienst-detail": dienstDetail.VELDEN,
  klantverhalen: klantverhalen.VELDEN,
  "klantverhaal-detail": klantverhaalDetail.VELDEN,
  inzichten: inzichten.VELDEN,
  algemeen: algemeen.VELDEN,
  privacy: privacy.VELDEN,
  "algemene-voorwaarden": algemeneVoorwaarden.VELDEN,
} as const satisfies Record<string, readonly FieldDef[]>;

/**
 * Van veldschema naar type. `getPagina("home")` levert precies de sleutels van
 * de home-pagina, dus `t.mensenTitell` is een compileerfout en een veld dat uit
 * PAGE_FIELDS verdwijnt breekt de pagina die het nog leest. Dat werd hiervoor
 * met regexes over de broncode gecontroleerd in tests/unit/cms-pages.spec.ts;
 * drie van die vijf controles kunnen daardoor weg.
 */
export type PaginaSlug = keyof typeof PAGE_FIELDS;

/** Alle sleutels die deze slug kent. */
export type PaginaVeld<S extends PaginaSlug> = (typeof PAGE_FIELDS)[S][number]["key"];

type PerSlug<S extends PaginaSlug> = S extends PaginaSlug ? Record<PaginaVeld<S>, string> : never;

/**
 * Eén slug: alle velden verplicht. Een union van slugs (de richting-hubs vragen
 * `diensten-${richting}` op): alleen wat ze delen is verplicht, de rest
 * optioneel. `instapTitel` bestaat namelijk op diensten-strategie en niet op de
 * andere twee, en dat hoort het type te zeggen in plaats van string te beloven.
 */
export type PaginaTeksten<S extends PaginaSlug> = Record<keyof PerSlug<S>, string> &
  Partial<Record<PaginaVeld<S>, string>>;

/** Bekende pagina's → hun publieke pad (voor revalidatie na opslaan). */
export const PAGE_PATH = {
  home: "/",
  "over-ons": "/over-ons",
  contact: "/contact",
  diensten: "/diensten",
  "dienst-detail": "/diensten",
  "diensten-mendix": "/diensten/mendix",
  "diensten-ai": "/diensten/ai",
  "diensten-strategie": "/diensten/strategie",
  sectoren: "/sectoren",
  "sector-detail": "/sectoren",
  "werken-bij": "/werken-bij",
  "vacature-detail": "/werken-bij",
  klantverhalen: "/klantverhalen",
  "klantverhaal-detail": "/klantverhalen",
  inzichten: "/inzichten",
  algemeen: "/",
  privacy: "/privacy",
  "algemene-voorwaarden": "/algemene-voorwaarden",
} satisfies Record<PaginaSlug, string>;

/** Standaardteksten per pagina (fallback op de site + startwaarde in de editor). */
export const PAGE_DEFAULTS = {
  home: home.TEKSTEN,
  "over-ons": overOns.TEKSTEN,
  contact: contact.TEKSTEN,
  diensten: diensten.TEKSTEN,
  "diensten-mendix": dienstenMendix.TEKSTEN,
  "diensten-ai": dienstenAi.TEKSTEN,
  "diensten-strategie": dienstenStrategie.TEKSTEN,
  sectoren: sectoren.TEKSTEN,
  "werken-bij": werkenBij.TEKSTEN,
  "sector-detail": sectorDetail.TEKSTEN,
  "vacature-detail": vacatureDetail.TEKSTEN,
  "dienst-detail": dienstDetail.TEKSTEN,
  klantverhalen: klantverhalen.TEKSTEN,
  "klantverhaal-detail": klantverhaalDetail.TEKSTEN,
  inzichten: inzichten.TEKSTEN,
  algemeen: algemeen.TEKSTEN,
  privacy: privacy.TEKSTEN,
  "algemene-voorwaarden": algemeneVoorwaarden.TEKSTEN,
} satisfies { [S in PaginaSlug]: Record<PaginaVeld<S>, string> };

/**
 * De admin kent de slug pas op runtime (uit de URL), dus daar kan het niet
 * getypeerd. Eén plek met die verbreding in plaats van een cast op elke
 * aanroep.
 */
export function paginaVelden(slug: string): readonly FieldDef[] | undefined {
  return (PAGE_FIELDS as Record<string, readonly FieldDef[] | undefined>)[slug];
}

export function paginaStandaard(slug: string): Record<string, string> | undefined {
  return (PAGE_DEFAULTS as Record<string, Record<string, string> | undefined>)[slug];
}

export function paginaPad(slug: string): string | undefined {
  return (PAGE_PATH as Record<string, string | undefined>)[slug];
}
