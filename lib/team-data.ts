import "server-only";
import { getPublishedContent, type ContentRow } from "@/lib/cms/content";
import { TEAMLEDEN, type Teamlid } from "@/lib/team";

function mapRow(row: ContentRow): Teamlid {
  const d = row.data as Record<string, unknown>;
  const s = (k: string) => (typeof d[k] === "string" ? (d[k] as string) : "");
  return {
    slug: row.slug,
    naam: row.titel,
    rol: s("rol"),
    foto: s("foto") || "/assets/photos/portret-blauw.webp",
    bio: s("bio"),
  };
}

/** Gepubliceerde teamleden uit Supabase; valt terug op de standaardlijst. */
export async function getTeamleden(): Promise<Teamlid[]> {
  const rows = await getPublishedContent("teamleden");
  return rows.length ? rows.map(mapRow) : TEAMLEDEN;
}
