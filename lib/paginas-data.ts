import "server-only";
import { getPublishedContent } from "@/lib/cms/content";
import { PAGE_DEFAULTS } from "@/lib/cms/pages";

/** Paginateksten: CMS ('live') over de defaults heen, met fallback. */
export async function getPagina(slug: string): Promise<Record<string, string>> {
  const merged: Record<string, string> = { ...(PAGE_DEFAULTS[slug] ?? {}) };
  const rows = await getPublishedContent("paginas");
  const row = rows.find((r) => r.slug === slug);
  const data = (row?.data ?? {}) as Record<string, unknown>;
  for (const [k, v] of Object.entries(data)) {
    // Ook een lege string wint: dat is een bewuste keuze van de redacteur.
    if (typeof v === "string") merged[k] = v;
  }
  return merged;
}
