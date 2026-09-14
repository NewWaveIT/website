import "server-only";
import { createClient } from "@/lib/supabase/server";
import { CONTENT_TABLE, type ContentType } from "@/lib/cms/content";

/** Zelfde reden als in content.ts: een trage database mag de admin niet ophouden. */
const QUERY_TIMEOUT_MS = 3000;

export interface StatusTelling {
  live: number;
  concept: number;
}

export interface Concept {
  soort: ContentType;
  id: string;
  slug: string;
  titel: string;
  bijgewerktOp: string | null;
  bewerktDoor: string | null;
}

const isContentType = (s: string): s is ContentType => s in CONTENT_TABLE;

export type Tellingen = Partial<Record<ContentType, StatusTelling>>;

/**
 * Per contenttype hoeveel er live staat en hoeveel er als concept wacht.
 *
 * Eén databasefunctie in plaats van achttien count-queries — zie
 * supabase/migrations/20260914120000_admin-dashboard.sql.
 *
 * Geeft `null` als die functie er niet is of de query mislukt, en nadrukkelijk
 * geen leeg object: dan las het dashboard overal nul en meldde het dat er geen
 * enkele pagina live stond terwijl de hele site gewoon draaide. "Ik weet het
 * niet" en "er is niets" zijn niet hetzelfde, en alleen het eerste mag je
 * gokken.
 */
export async function getStatusTellingen(): Promise<Tellingen | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .rpc("admin_status_aantallen")
      .abortSignal(AbortSignal.timeout(QUERY_TIMEOUT_MS));
    if (error) {
      console.error("[cms] admin_status_aantallen mislukt:", error.message);
      return null;
    }
    const rijen = (data ?? []) as { naam: string; live: number; concept: number }[];
    const uit: Tellingen = {};
    for (const r of rijen) {
      if (isContentType(r.naam)) {
        uit[r.naam] = { live: Number(r.live), concept: Number(r.concept) };
      }
    }
    return uit;
  } catch (e) {
    console.error("[cms] admin_status_aantallen onbereikbaar:", (e as Error).message);
    return null;
  }
}

/**
 * De concepten over alle contenttypen heen, laatst bewerkte eerst. `null` als
 * de databasefunctie ontbreekt — om dezelfde reden als hierboven: een leeg
 * lijstje leest als "niets meer te doen".
 */
export async function getConcepten(limiet = 8): Promise<Concept[] | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .rpc("admin_concepten", { limiet })
      .abortSignal(AbortSignal.timeout(QUERY_TIMEOUT_MS));
    if (error) {
      console.error("[cms] admin_concepten mislukt:", error.message);
      return null;
    }
    const rijen = (data ?? []) as {
      soort: string;
      id: string;
      slug: string;
      titel: string;
      bijgewerkt_op: string | null;
      bewerkt_door: string | null;
    }[];
    return rijen
      .filter((r) => isContentType(r.soort))
      .map((r) => ({
        soort: r.soort as ContentType,
        id: r.id,
        slug: r.slug,
        titel: r.titel,
        bijgewerktOp: r.bijgewerkt_op,
        bewerktDoor: r.bewerkt_door,
      }));
  } catch (e) {
    console.error("[cms] admin_concepten onbereikbaar:", (e as Error).message);
    return null;
  }
}
