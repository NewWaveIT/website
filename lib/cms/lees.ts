import "server-only";
import type { z } from "zod";
import { getPublishedContent } from "@/lib/cms/content";
import { leesRijen } from "@/lib/cms/merge";
import type { GemapteType } from "@/lib/cms/rij";

/**
 * Eén leespad voor elk contenttype.
 *
 * De zeven `lib/<type>-data.ts`-bestanden deden allemaal hetzelfde, maar elk
 * net iets anders: de een viel per slug terug op de seed, de ander niet; de een
 * sorteerde, de ander liet de databasevolgorde staan. Die verschillen waren
 * niet bedoeld, ze waren ontstaan. Hier staat de vorm één keer.
 *
 * De regel: **de admin is de waarheid, de seed is een koude start.**
 *
 * - Tabel leeg  → de seed rendert. Dat is het enige moment waarop hij telt:
 *   een verse database, of Supabase die onbereikbaar is.
 * - Tabel gevuld → alleen wat er in het CMS staat. Een slug die je daar
 *   verwijdert, verdwijnt van de site; hij komt niet terug uit de seed.
 *
 * Wat de seed daarnaast nog doet — een ongeldig of ontbrekend véld in een
 * bestaande rij repareren — is geen eigenaarschap maar een vangnet, en zit in
 * `leesRijen`. Zie de toelichting daar.
 */
export interface Lezer<T> {
  /** Alles wat live staat, in weergavevolgorde. */
  alle(): Promise<T[]>;
  /** Eén item, of null als het niet (meer) bestaat. */
  bijSlug(slug: string): Promise<T | null>;
}

export interface LezerOpties<T> {
  type: GemapteType;
  schema: z.ZodObject<z.ZodRawShape>;
  /** De koude start: wat de site toont als de tabel leeg is. */
  seed: readonly T[];
  /** Wat het schema niet doet: opmaak ontsmetten, paden normaliseren, velden afleiden. */
  verrijk?: (item: T) => T;
  /** Weergavevolgorde. Zonder dit blijft de volgorde uit de database staan. */
  sorteer?: (a: T, b: T) => number;
}

export function maakLezer<T extends { slug: string }>(opties: LezerOpties<T>): Lezer<T> {
  const { type, schema, seed, verrijk, sorteer } = opties;
  const seedPerSlug = new Map(seed.map((s) => [s.slug, s]));

  async function alle(): Promise<T[]> {
    const rows = await getPublishedContent(type);
    const items = rows.length
      ? (leesRijen(
          type,
          schema,
          rows,
          (slug) => seedPerSlug.get(slug) as Record<string, unknown> | undefined,
        ) as T[])
      : [...seed];
    const uit = verrijk ? items.map(verrijk) : items;
    return sorteer ? [...uit].sort(sorteer) : uit;
  }

  return {
    alle,
    async bijSlug(slug: string) {
      return (await alle()).find((x) => x.slug === slug) ?? null;
    },
  };
}
