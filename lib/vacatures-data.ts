import "server-only";
import { CONTENT_SCHEMAS } from "@/lib/cms/schemas";
import { maakLezer } from "@/lib/cms/lees";
import { sanitizeFull, sanitizeInline } from "@/lib/cms/sanitize";
import { splitsVacature } from "@/lib/cms/vacature-tekst";
import { VACATURES, type Vacature } from "@/lib/vacatures";

const lezer = maakLezer<Vacature>({
  type: "vacatures",
  schema: CONTENT_SCHEMAS.vacatures,
  seed: VACATURES,
  // Wat het schema niet doet: de intro en de tekst uit `inhoud` halen en ontsmetten voor weergave.
  // Zonder `inhoud` is het een rij in het oude model: dan blijft de losse intro staan.
  verrijk: (v) => {
    if (!v.inhoud?.trim()) return { ...v, intro: sanitizeInline(v.intro) };
    const { intro, body } = splitsVacature(v.inhoud);
    return { ...v, intro: sanitizeInline(intro), inhoudHtml: sanitizeFull(body) };
  },
});

export const getVacatures = lezer.alle;
export const getVacatureBySlug = lezer.bijSlug;
