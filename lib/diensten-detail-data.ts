import "server-only";
import { CONTENT_SCHEMAS } from "@/lib/cms/schemas";
import { maakLezer } from "@/lib/cms/lees";
import { sanitizeInline } from "@/lib/cms/sanitize";
import { DIENSTEN, RICHTING_SLUGS, type DienstDetail } from "@/lib/diensten-detail";

const lezer = maakLezer<DienstDetail>({
  type: "diensten",
  schema: CONTENT_SCHEMAS.diensten,
  seed: Object.values(DIENSTEN),
  // Wat het schema niet doet: opmaak ontsmetten voor weergave.
  verrijk: (d) => ({ ...d, intro: sanitizeInline(d.intro) }),
});

/**
 * Alleen de drie richtingen bestaan hier; dit contenttype bediende ooit ook de
 * dienstdetailpagina's, die inmiddels uit cms_services komen.
 *
 * Het comment hier beweerde dat de filter resten van dat ontwerp wegvangt.
 * Nagekeken op 11 september 2026: cms_diensten bevat precies mendix, ai en
 * strategie en verder niets. De filter vangt dus niets weg — hij blijft staan
 * als grendel, want de drie richtingen zijn vaste routes en een vierde rij zou
 * hier nooit een pagina mogen worden.
 */
function isRichting(slug: string): boolean {
  return (RICHTING_SLUGS as readonly string[]).includes(slug);
}

export async function getRichtingBySlug(slug: string): Promise<DienstDetail | null> {
  return isRichting(slug) ? lezer.bijSlug(slug) : null;
}

export async function getRichtingSlugs(): Promise<string[]> {
  return [...RICHTING_SLUGS];
}
