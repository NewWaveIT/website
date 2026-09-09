import "server-only";
import { getPublishedContent, fotoWebp } from "@/lib/cms/content";
import { CONTENT_SCHEMAS } from "@/lib/cms/schemas";
import { leesRijen } from "@/lib/cms/merge";
import { TEAMLEDEN, type Teamlid } from "@/lib/team";

const seedVoor = (slug: string) =>
  TEAMLEDEN.find((t) => t.slug === slug) as Record<string, unknown> | undefined;

/** Wat het schema niet doet: oude .png-paden naar .webp trekken. */
function verrijk(t: Teamlid): Teamlid {
  return { ...t, foto: fotoWebp(t.foto) || undefined };
}

/** Gepubliceerde teamleden uit Supabase; valt terug op de standaardlijst. */
export async function getTeamleden(): Promise<Teamlid[]> {
  const rows = await getPublishedContent("teamleden");
  if (!rows.length) return TEAMLEDEN.map(verrijk);
  return leesRijen("teamleden", CONTENT_SCHEMAS.teamleden, rows, seedVoor).map(verrijk);
}

/**
 * Het teamlid dat als contactpersoon voor een rol is aangewezen (sales of
 * recruitment). Matcht ook "Sales & recruitment". Geeft null als niemand is
 * aangewezen — de pagina valt dan terug op een standaardpersoon.
 */
export async function getContactpersoon(rol: "sales" | "recruitment"): Promise<Teamlid | null> {
  const leden = await getTeamleden();
  return leden.find((l) => (l.contactrol ?? "").toLowerCase().includes(rol)) ?? null;
}
