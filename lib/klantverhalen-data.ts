import "server-only";
import { fotoWebp } from "@/lib/cms/content";
import { CONTENT_SCHEMAS } from "@/lib/cms/schemas";
import { maakLezer } from "@/lib/cms/lees";
import { sanitizeLite } from "@/lib/cms/sanitize";
import { KLANTVERHALEN, type Klantverhaal } from "@/lib/klantverhalen";

const lezer = maakLezer<Klantverhaal>({
  type: "cases",
  schema: CONTENT_SCHEMAS.cases,
  seed: KLANTVERHALEN,
  // Wat het schema niet doet: opmaak ontsmetten, oude .png-paden naar .webp
  // trekken, en `tag` afleiden van de sector als hij niet apart is ingevuld.
  verrijk: (k) => ({
    ...k,
    image: fotoWebp(k.image),
    tag: k.tag || k.sector,
    challenge: sanitizeLite(k.challenge),
    resultaat: sanitizeLite(k.resultaat),
  }),
});

export const getKlantverhalen = lezer.alle;
export const getKlantverhaalBySlug = lezer.bijSlug;
