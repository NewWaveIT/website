import "server-only";
import { getPublishedContent, fotoWebp, type ContentRow } from "@/lib/cms/content";
import { TEAMLEDEN, type Teamlid } from "@/lib/team";

function mapRow(row: ContentRow): Teamlid {
  const d = row.data as Record<string, unknown>;
  const s = (k: string) => (typeof d[k] === "string" ? (d[k] as string) : "");
  return {
    slug: row.slug,
    naam: row.titel,
    rol: s("rol"),
    foto: fotoWebp(s("foto")) || "/assets/photos/portret-blauw.webp",
    bio: s("bio"),
    contactrol: s("contactrol"),
    telefoon: s("telefoon"),
    email: s("email"),
    linkedin: s("linkedin"),
  };
}

/** Gepubliceerde teamleden uit Supabase; valt terug op de standaardlijst. */
export async function getTeamleden(): Promise<Teamlid[]> {
  const rows = await getPublishedContent("teamleden");
  return rows.length ? rows.map(mapRow) : TEAMLEDEN;
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
