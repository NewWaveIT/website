import "server-only";
import { fotoWebp } from "@/lib/cms/content";
import { CONTENT_SCHEMAS } from "@/lib/cms/schemas";
import { maakLezer } from "@/lib/cms/lees";
import { TEAMLEDEN, type Teamlid } from "@/lib/team";

const lezer = maakLezer<Teamlid>({
  type: "teamleden",
  schema: CONTENT_SCHEMAS.teamleden,
  seed: TEAMLEDEN,
  // Wat het schema niet doet: oude .png-paden naar .webp trekken.
  verrijk: (t) => ({ ...t, foto: fotoWebp(t.foto) || undefined }),
});

export const getTeamleden = lezer.alle;

/**
 * Het teamlid dat als contactpersoon voor een rol is aangewezen (sales of
 * recruitment). Matcht ook "Sales & recruitment". Geeft null als niemand is
 * aangewezen — de pagina valt dan terug op een standaardpersoon.
 */
export async function getContactpersoon(rol: "sales" | "recruitment"): Promise<Teamlid | null> {
  const leden = await getTeamleden();
  return leden.find((l) => (l.contactrol ?? "").toLowerCase().includes(rol)) ?? null;
}
