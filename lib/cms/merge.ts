import "server-only";
import type { z } from "zod";
import type { ContentRow } from "@/lib/cms/content";
import { rijNaarRuw, type GemapteType } from "@/lib/cms/rij";

export interface VeldFout {
  veld: string;
  reden: string;
}

export interface LeesResultaat<T> {
  /** `null` als de rij ook met het vangnet niet geldig te krijgen was. */
  waarde: T | null;
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
 * Lukt het daarna nog niet, dan is `waarde` bewust `null` in plaats van een
 * half object. Een rij die niet compleet te krijgen is, hoort niet als lege
 * secties op de site te belanden; overslaan en loggen is eerlijker.
 *
 * `ruw` is de rij al platgeslagen tot een gewoon object (zie `rijNaarRuw`).
 */
export function leesRij<S extends z.ZodObject<z.ZodRawShape>>(
  schema: S,
  ruw: Record<string, unknown>,
  seed: Record<string, unknown> | undefined,
): LeesResultaat<z.infer<S>> {
  const volledig = vulAan(schema, ruw, seed);
  const heel = schema.safeParse(volledig);
  if (heel.success) return { waarde: heel.data, fouten: [] };

  const uit: Record<string, unknown> = {};
  const fouten: VeldFout[] = [];

  for (const [veld, veldSchema] of Object.entries(schema.shape)) {
    const eigen = (veldSchema as z.ZodType).safeParse(volledig[veld]);
    if (eigen.success) {
      uit[veld] = eigen.data;
      continue;
    }
    // Wat er stond deugt niet: de seed is het vangnet.
    const uitSeed = (veldSchema as z.ZodType).safeParse(seed?.[veld]);
    if (uitSeed.success) {
      uit[veld] = uitSeed.data;
      fouten.push({ veld, reden: eigen.error.issues[0]?.message ?? "ongeldig" });
    } else {
      fouten.push({ veld, reden: "ongeldig, en geen bruikbare standaardwaarde" });
    }
  }

  const samen = schema.safeParse(uit);
  return { waarde: samen.success ? samen.data : null, fouten };
}

/**
 * Sleutels die de rij helemaal niet noemt komen uit de seed — óók optionele.
 *
 * Het onderscheid dat telt is "niet genoemd" tegenover "leeg opgeslagen", niet
 * "verplicht" tegenover "optioneel". `saveContent` schrijft sinds de datalaag
 * elk veld uit het schema weg, dus een leeggemaakt veld stáát in de rij (als
 * `""` of een lege lijst) en wint gewoon: leeg is echt leeg. Ontbreekt de
 * sleutel, dan is de rij ouder dan het veld en heeft de redacteur er nooit iets
 * over gezegd — dan is de seed de beste uitspraak die er is. Zonder dit
 * onderscheid zou één rij van vóór een modelwijziging stilletjes alle optionele
 * content wissen: precies de bug die deze laag moest oplossen.
 */
function vulAan(
  schema: z.ZodObject<z.ZodRawShape>,
  ruw: Record<string, unknown>,
  seed: Record<string, unknown> | undefined,
): Record<string, unknown> {
  if (!seed) return ruw;
  const uit = { ...ruw };
  for (const veld of Object.keys(schema.shape)) {
    if (!(veld in ruw) && veld in seed) uit[veld] = seed[veld];
  }
  return uit;
}

/** Eén regel per rij met problemen, zodat het terugvindbaar is in de Vercel-logs. */
export function meldFouten(type: string, slug: string, fouten: VeldFout[]): void {
  if (!fouten.length) return;
  const lijst = fouten.map((f) => `${f.veld} (${f.reden})`).join(", ");
  console.error(`[cms] ${type}/${slug}: ${fouten.length} veld(en) uit de seed — ${lijst}`);
}

/**
 * Alle bruikbare rijen van één contenttype, gevalideerd en met de seed als
 * vangnet per veld. Rijen die niet geldig te krijgen zijn vallen weg en worden
 * gelogd — zie `leesRij`.
 */
export function leesRijen<S extends z.ZodObject<z.ZodRawShape>>(
  type: GemapteType,
  schema: S,
  rows: ContentRow[],
  seedVoor: (slug: string) => Record<string, unknown> | undefined,
): z.infer<S>[] {
  const uit: z.infer<S>[] = [];
  for (const row of rows) {
    const { waarde, fouten } = leesRij(schema, rijNaarRuw(type, row), seedVoor(row.slug));
    meldFouten(type, row.slug, fouten);
    if (waarde) uit.push(waarde);
    else console.error(`[cms] ${type}/${row.slug}: overgeslagen, niet geldig te krijgen`);
  }
  return uit;
}
