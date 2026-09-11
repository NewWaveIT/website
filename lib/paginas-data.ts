import "server-only";
import { getPublishedContent } from "@/lib/cms/content";
import { PAGE_DEFAULTS, type PaginaSlug, type PaginaTeksten } from "@/lib/cms/pages";

/**
 * Paginateksten: CMS ('live') over de defaults heen, met fallback.
 *
 * Het retourtype komt uit PAGE_FIELDS, dus `t.bestaatNiet` is een compileerfout
 * en een veld dat uit het schema verdwijnt breekt de pagina die het nog leest.
 * De cast aan het eind kan niet weg — `data` komt uit jsonb — maar hij is
 * veilig: `satisfies` op PAGE_DEFAULTS garandeert dat elke sleutel gevuld is.
 */
export async function getPagina<S extends PaginaSlug>(slug: S): Promise<PaginaTeksten<S>> {
  const merged: Record<string, string> = { ...PAGE_DEFAULTS[slug] };
  const rows = await getPublishedContent("paginas");
  const row = rows.find((r) => r.slug === slug);
  const data = (row?.data ?? {}) as Record<string, unknown>;
  for (const [k, v] of Object.entries(data)) {
    // Ook een lege string wint: dat is een bewuste keuze van de redacteur.
    if (typeof v === "string") merged[k] = v;
  }
  return merged as PaginaTeksten<S>;
}
