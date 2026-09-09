import "server-only";
import { CONTENT_SCHEMAS } from "@/lib/cms/schemas";
import { maakLezer } from "@/lib/cms/lees";
import { sanitizeInline } from "@/lib/cms/sanitize";
import { VACATURES, type Vacature } from "@/lib/vacatures";

const lezer = maakLezer<Vacature>({
  type: "vacatures",
  schema: CONTENT_SCHEMAS.vacatures,
  seed: VACATURES,
  // Wat het schema niet doet: opmaak ontsmetten voor weergave.
  verrijk: (v) => ({ ...v, intro: sanitizeInline(v.intro) }),
});

export const getVacatures = lezer.alle;
export const getVacatureBySlug = lezer.bijSlug;
