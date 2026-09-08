import "server-only";
import type { z } from "zod";

export interface VeldFout {
  veld: string;
  reden: string;
}

export interface LeesResultaat<T> {
  waarde: T;
  /** Velden die niet aan het schema voldeden en dus uit de seed komen. */
  fouten: VeldFout[];
}

/**
 * Leest één CMS-rij tegen zijn schema — veld voor veld, niet als één blok.
 *
 * Waarom per veld: een rij die vóór een modelwijziging is aangemaakt heeft
 * vaak één array in de oude vorm terwijl de rest prima is. Zou één ongeldig
 * veld de hele rij afkeuren, dan verdwijnen ook de geldige tekstwijzigingen
 * van de redacteur. Per veld terugvallen houdt de pagina heel én de redactie
 * intact.
 *
 * `ruw` is de rij al platgeslagen tot een gewoon object (inclusief slug en de
 * eventuele titel-naar-naam-vertaling); dat verschilt per contenttype en blijft
 * daarom de verantwoordelijkheid van de aanroeper.
 */
export function leesRij<S extends z.ZodObject<z.ZodRawShape>>(
  schema: S,
  ruw: Record<string, unknown>,
  seed: Record<string, unknown> | undefined,
): LeesResultaat<z.infer<S>> {
  const heel = schema.safeParse(ruw);
  if (heel.success) return { waarde: heel.data, fouten: [] };

  const uit: Record<string, unknown> = {};
  const fouten: VeldFout[] = [];

  for (const [veld, veldSchema] of Object.entries(schema.shape)) {
    const eigen = (veldSchema as z.ZodType).safeParse(ruw[veld]);
    if (eigen.success) {
      uit[veld] = eigen.data;
      continue;
    }
    // Ongeldig of ontbrekend: de seed is het vangnet.
    const uitSeed = (veldSchema as z.ZodType).safeParse(seed?.[veld]);
    if (uitSeed.success) {
      uit[veld] = uitSeed.data;
      // Alleen melden als er íets stond; ontbreken is geen fout op zich.
      if (ruw[veld] !== undefined) {
        fouten.push({ veld, reden: eigen.error.issues[0]?.message ?? "ongeldig" });
      }
    } else {
      fouten.push({ veld, reden: "ongeldig, en geen bruikbare standaardwaarde" });
    }
  }

  return { waarde: uit as z.infer<S>, fouten };
}

/** Eén regel per rij met problemen, zodat het terugvindbaar is in de Vercel-logs. */
export function meldFouten(type: string, slug: string, fouten: VeldFout[]): void {
  if (!fouten.length) return;
  const lijst = fouten.map((f) => `${f.veld} (${f.reden})`).join(", ");
  console.error(`[cms] ${type}/${slug}: ${fouten.length} veld(en) uit de seed — ${lijst}`);
}
