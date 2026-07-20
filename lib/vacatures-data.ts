import "server-only";
import { getPublishedContent, type ContentRow } from "@/lib/cms/content";
import { VACATURES, VACATURE_MAP, type Vacature, type VacatureSectie } from "@/lib/vacatures";

function strList(v: unknown): string[] {
  return Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : [];
}

function secties(v: unknown): VacatureSectie[] {
  if (!Array.isArray(v)) return [];
  return v
    .filter((x): x is Record<string, unknown> => !!x && typeof x === "object")
    .map((x) => ({ titel: String(x.titel ?? ""), items: strList(x.items) }));
}

function mapRow(row: ContentRow): Vacature {
  const d = row.data as Record<string, unknown>;
  const s = (k: string) => (typeof d[k] === "string" ? (d[k] as string) : "");
  const f = (d.facts && typeof d.facts === "object" ? d.facts : {}) as Record<string, unknown>;
  return {
    slug: row.slug,
    functietitel: s("functietitel") || row.titel,
    discipline: s("discipline"),
    locatie: s("locatie"),
    tags: strList(d.tags),
    intro: s("intro"),
    secties: secties(d.secties),
    facts: {
      team: String(f.team ?? ""),
      niveau: String(f.niveau ?? ""),
      locatie: String(f.locatie ?? s("locatie")),
      uren: String(f.uren ?? ""),
      salaris: String(f.salaris ?? ""),
    },
    employmentType: s("employmentType") || "FULL_TIME",
    gepubliceerdOp: s("gepubliceerdOp"),
  };
}

/** Gepubliceerde vacatures uit Supabase; valt terug op de statische lib-data. */
export async function getVacatures(): Promise<Vacature[]> {
  const rows = await getPublishedContent("vacatures");
  return rows.length ? rows.map(mapRow) : VACATURES;
}

export async function getVacatureBySlug(slug: string): Promise<Vacature | null> {
  const rows = await getPublishedContent("vacatures");
  if (rows.length) {
    const r = rows.find((x) => x.slug === slug);
    return r ? mapRow(r) : null;
  }
  return VACATURE_MAP[slug] ?? null;
}
