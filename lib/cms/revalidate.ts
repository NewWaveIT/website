import "server-only";
import { revalidatePath } from "next/cache";
import type { ContentType } from "@/lib/cms/content";
import { PAGE_PATH } from "@/lib/cms/pages";

/**
 * Welke publieke routes een contenttype raakt.
 *
 * Eén tabel, gebruikt door opslaan, verwijderen én sorteren. Voorheen stond dit
 * verspreid over drie plekken die uit elkaar waren gelopen: verwijderen
 * verversde helemaal niets, en sorteren gebruikte een aparte lijst waarin
 * proposities naar een pagina wezen die ze niet eens rendert.
 *
 * `[slug]` wordt vervangen door de slug van de gewijzigde rij; een pad met
 * `:page` wordt als route-pattern ververst (alle instanties van die route).
 */
const PADEN: Record<ContentType, string[]> = {
  // Artikelen verschijnen ook als "Inzichten" op sector- en dienstdetailpagina's.
  artikelen: ["/inzichten", "/inzichten/[slug]", "/sectoren/[slug]:page", "/diensten/[slug]:page"],
  // Klantverhalen voeden ook de carrousel op de homepage.
  cases: ["/", "/klantverhalen", "/klantverhalen/[slug]"],
  diensten: ["/diensten/[slug]"],
  sectoren: ["/sectoren/[slug]"],
  // Proposities verschijnen als PMC op álle sectordetailpagina's.
  proposities: ["/sectoren/[slug]:page"],
  // Services staan op het overzicht, de drie hubs, de dienstdetailpagina's,
  // het contactformulier én de instapkaarten op de homepage.
  services: [
    "/",
    "/diensten",
    "/diensten/mendix",
    "/diensten/ai",
    "/diensten/strategie",
    "/diensten/[slug]:page",
    "/contact",
  ],
  // Teamleden leveren ook de contactpersoon op contact-, werken-bij- en vacaturepagina's.
  teamleden: ["/over-ons", "/contact", "/werken-bij", "/vacatures/[slug]:page"],
  vacatures: ["/werken-bij", "/vacatures/[slug]"],
  // Paginateksten hangen aan één publiek pad; zie PAGINA_EXTRA voor uitzonderingen.
  paginas: [],
};

/**
 * Pagina-slugs waarvan de tekst op méér dan het eigen pad terechtkomt.
 * De drie richting-hubs lezen allemaal de teksten van de slug `diensten`.
 */
const PAGINA_EXTRA: Record<string, string[]> = {
  diensten: ["/diensten/mendix", "/diensten/ai", "/diensten/strategie"],
};

/** Contenttypen die in de sitemap staan en die dus mee moet verversen. */
const IN_SITEMAP: ContentType[] = ["artikelen", "cases", "diensten", "sectoren", "vacatures"];

/** Ververs elke publieke route die deze rij beïnvloedt. */
export function revalidateContent(type: ContentType, slug: string): void {
  const paden = [...PADEN[type]];

  if (type === "paginas") {
    if (PAGE_PATH[slug]) paden.push(PAGE_PATH[slug]);
    paden.push(...(PAGINA_EXTRA[slug] ?? []));
  }
  if (IN_SITEMAP.includes(type)) paden.push("/sitemap.xml");

  for (const pad of paden) {
    if (pad.endsWith(":page")) {
      revalidatePath(pad.slice(0, -":page".length), "page");
    } else if (pad.includes("[slug]")) {
      // Bij sorteren is er geen enkele slug; dan alleen de overzichtspagina's.
      if (slug) revalidatePath(pad.replace("[slug]", slug));
    } else {
      revalidatePath(pad);
    }
  }
}
