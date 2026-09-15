import "server-only";
import { FIELD_SCHEMAS, type FieldDef } from "@/lib/cms/schema";
import { PAGE_DEFAULTS, paginaVelden } from "@/lib/cms/pages";
import type { ContentType } from "@/lib/cms/content";
import type { SoortInvoer } from "@/lib/cms/baseline";
import { KLANTVERHALEN } from "@/lib/klantverhalen";
import { DIENSTEN } from "@/lib/diensten-detail";
import { SECTOREN } from "@/lib/sectoren-detail";
import { SERVICES } from "@/lib/services";
import { TEAMLEDEN } from "@/lib/team";
import { VACATURES } from "@/lib/vacatures";
import { ARTIKELEN } from "@/lib/inzichten";

/**
 * De seed per contenttype, op slug — de andere helft van de nulmeting.
 *
 * Dit is de enige plek die weet waar de seed van een type staat. Komt er een
 * contenttype bij, dan dwingt `Record<ContentType, …>` af dat het hier ook
 * landt; anders zou de nulmeting het stil overslaan en groen blijven.
 */

type Records = Record<string, Record<string, unknown>>;

function opSlug(items: readonly { slug: string }[]): Records {
  return Object.fromEntries(items.map((i) => [i.slug, i as unknown as Record<string, unknown>]));
}

const SEEDS: Record<ContentType, Records> = {
  paginas: PAGE_DEFAULTS as unknown as Records,
  cases: opSlug(KLANTVERHALEN),
  diensten: DIENSTEN as unknown as Records,
  sectoren: SECTOREN as unknown as Records,
  services: opSlug(SERVICES),
  teamleden: opSlug(TEAMLEDEN),
  vacatures: opSlug(VACATURES),
  artikelen: opSlug(ARTIKELEN),
};

/**
 * `artikelen` staat er los in: de seed heeft daar een andere vorm dan de rij
 * (`cover`→`image`, `samenvatting`→`intro`, `inhoud` gesplitst in alinea's),
 * dus een veldwaarde is niet één-op-één te vergelijken. Sleutels wel.
 */
const ALLEEN_SLEUTELS = new Set<ContentType>(["artikelen"]);

/** Het veldschema van één rij. Alleen `paginas` verschilt per slug. */
export function veldenVoor(type: ContentType): (slug: string) => readonly FieldDef[] {
  if (type === "paginas") return (slug) => paginaVelden(slug) ?? FIELD_SCHEMAS.paginas;
  return () => FIELD_SCHEMAS[type];
}

export function invoerVoor(type: ContentType, rijen: SoortInvoer["rijen"]): SoortInvoer {
  return {
    soort: type,
    velden: veldenVoor(type),
    rijen,
    seed: SEEDS[type],
    vergelijkWaarden: !ALLEEN_SLEUTELS.has(type),
  };
}
