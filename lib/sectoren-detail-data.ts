import "server-only";
import { CONTENT_SCHEMAS } from "@/lib/cms/schemas";
import { maakLezer } from "@/lib/cms/lees";
import { sanitizeInline } from "@/lib/cms/sanitize";
import { SECTOREN, SECTOR_VOLGORDE, type SectorDetail } from "@/lib/sectoren-detail";

const lezer = maakLezer<SectorDetail>({
  type: "sectoren",
  schema: CONTENT_SCHEMAS.sectoren,
  seed: Object.values(SECTOREN),
  // Wat het schema niet doet: opmaak ontsmetten voor weergave.
  verrijk: (s) => ({ ...s, intro: sanitizeInline(s.intro) }),
});

/** Alle sectoren; ook gebruikt door de sectorkoppeling op de richting-hubs. */
export const getSectoren = lezer.alle;
export const getSectorBySlug = lezer.bijSlug;

/** De slugs waarvoor /sectoren/[slug] wordt voorgerenderd. */
export async function getSectorSlugs(): Promise<string[]> {
  return (await getSectoren()).map((s) => s.slug);
}

/**
 * Wat de drie overzichten van een sector tonen: de homepage, /sectoren en
 * /klantverhalen. Eén vorm, één bron.
 *
 * Hiervoor stond dezelfde pitch in vier versies hardcoded in drie
 * paginabestanden plus de CMS-rij, en volgde een wijziging in de admin dus
 * nergens. De KPI-cijfers op /klantverhalen staan bewust nog wél in die pagina:
 * dat zijn drie getallen per sector, geen sectortekst.
 */
export interface SectorKaart {
  slug: string;
  naam: string;
  href: string;
  icon: SectorDetail["icon"];
  theme: string;
  hook: string;
  pitch: string;
  kpiLabel: string;
}

/**
 * De sectoren in de volgorde die de overzichten aanhouden. Een sector die niet
 * in `SECTOR_VOLGORDE` staat valt weg — de volgorde is een ontwerpkeuze, dus
 * een onbekende slug hoort niet stilzwijgend achteraan te verschijnen.
 */
export async function getSectorKaarten(): Promise<SectorKaart[]> {
  const alle = await getSectoren();
  return SECTOR_VOLGORDE.map((slug) => alle.find((s) => s.slug === slug))
    .filter((s): s is SectorDetail => s !== undefined)
    .map((s) => ({
      slug: s.slug,
      naam: s.naam,
      href: `/sectoren/${s.slug}`,
      icon: s.icon,
      theme: s.heroTheme,
      hook: s.hook,
      pitch: s.pitch,
      kpiLabel: s.kpiLabel,
    }));
}
