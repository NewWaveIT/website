import "server-only";
import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import { createPublicClient } from "@/lib/supabase/public";

export type ContentType =
  | "paginas"
  | "cases"
  | "diensten"
  | "sectoren"
  | "artikelen"
  | "vacatures"
  | "teamleden"
  | "proposities"
  | "services";

export const CONTENT_TABLE: Record<ContentType, string> = {
  paginas: "cms_paginas",
  cases: "cms_cases",
  diensten: "cms_diensten",
  sectoren: "cms_sectoren",
  artikelen: "cms_artikelen",
  vacatures: "cms_vacatures",
  teamleden: "cms_teamleden",
  proposities: "cms_proposities",
  services: "cms_services",
};

export interface ContentRow<T = Record<string, unknown>> {
  id: string;
  slug: string;
  titel: string;
  status: string; // live | concept
  data: T;
  volgorde: number;
  bijgewerkt_op: string;
  bewerkt_door: string | null;
}

/**
 * Normaliseert oude .png-verwijzingen naar foto's naar hun .webp-tweeling.
 * De .png-originelen in /assets/photos zijn verwijderd (alles is WebP); bestaande
 * CMS-content kan nog naar .png wijzen. Werkt op een kaal pad én op HTML (richtext).
 * Laat storage-URL's en logo's ongemoeid.
 */
export function fotoWebp(s: string | null | undefined): string {
  return (s ?? "").replace(/(\/assets\/photos\/[^\s"')]+)\.png/gi, "$1.webp");
}

/** Databases die niet reageren mogen een pagina niet lamleggen: elke query
 *  krijgt een harde timeout, zodat we snel terugvallen op de statische content. */
const QUERY_TIMEOUT_MS = 3000;

/**
 * De tellers naast de menu-items in de admin-zijbalk.
 *
 * Eén databasefunctie in plaats van elf losse count-queries per paginabezoek —
 * zie supabase/migrations/20260909160000_admin-aantallen.sql. De functie draait
 * met de rechten van de aanroeper, dus RLS bepaalt wat er geteld wordt.
 *
 * Faalt stil met nullen: een zijbalk zonder badges is vervelend, een admin die
 * niet laadt is erger.
 */
export async function getAdminCounts(): Promise<Record<string, number>> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .rpc("admin_aantallen")
      .abortSignal(AbortSignal.timeout(QUERY_TIMEOUT_MS));
    if (error) {
      console.error("[cms] admin_aantallen mislukt:", error.message);
      return {};
    }
    const rijen = (data ?? []) as { naam: string; aantal: number }[];
    return Object.fromEntries(rijen.map((r) => [r.naam, Number(r.aantal)]));
  } catch (e) {
    console.error("[cms] admin_aantallen onbereikbaar:", (e as Error).message);
    return {};
  }
}

/** Kolommen die de adminlijst toont; `data` blijft er bewust buiten. */
const LIJST_KOLOMMEN = "id, slug, titel, status, volgorde, bijgewerkt_op, bewerkt_door";

/** Alleen letters, cijfers en liggende streepjes: een veldnaam, geen expressie. */
const VEILIG_VELD = /^[A-Za-z0-9_]+$/;

export async function listContentSamenvatting(
  type: ContentType,
  facetVelden: readonly string[] = [],
): Promise<ContentRow[]> {
  const velden = facetVelden.filter((v) => VEILIG_VELD.test(v));
  const selectie = [LIJST_KOLOMMEN, ...velden.map((v) => `${v}:data->>${v}`)].join(", ");
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from(CONTENT_TABLE[type])
      .select(selectie)
      .order("volgorde", { ascending: true })
      .order("bijgewerkt_op", { ascending: false })
      .abortSignal(AbortSignal.timeout(QUERY_TIMEOUT_MS));
    if (error) {
      console.error(`[cms] lijstquery mislukt op ${CONTENT_TABLE[type]}:`, error.message);
      return [];
    }
    return ((data ?? []) as unknown as Record<string, unknown>[]).map((rij) => ({
      id: String(rij.id),
      slug: String(rij.slug),
      titel: String(rij.titel),
      status: String(rij.status),
      volgorde: Number(rij.volgorde ?? 0),
      bijgewerkt_op: String(rij.bijgewerkt_op ?? ""),
      bewerkt_door: (rij.bewerkt_door as string | null) ?? null,
      data: Object.fromEntries(velden.map((v) => [v, rij[v] ?? ""])),
    }));
  } catch (e) {
    console.error(`[cms] ${CONTENT_TABLE[type]} onbereikbaar:`, (e as Error).message);
    return [];
  }
}

export async function listContent<T = Record<string, unknown>>(
  type: ContentType,
): Promise<ContentRow<T>[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from(CONTENT_TABLE[type])
      .select("*")
      .order("volgorde", { ascending: true })
      .order("bijgewerkt_op", { ascending: false })
      .abortSignal(AbortSignal.timeout(QUERY_TIMEOUT_MS));
    return (data as ContentRow<T>[]) ?? [];
  } catch {
    return [];
  }
}

export async function getContentBySlug<T = Record<string, unknown>>(
  type: ContentType,
  slug: string,
): Promise<ContentRow<T> | null> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from(CONTENT_TABLE[type])
      .select("*")
      .eq("slug", slug)
      .abortSignal(AbortSignal.timeout(QUERY_TIMEOUT_MS))
      .maybeSingle();
    return (data as ContentRow<T>) ?? null;
  } catch {
    return null;
  }
}

export async function getContentById<T = Record<string, unknown>>(
  type: ContentType,
  id: string,
): Promise<ContentRow<T> | null> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from(CONTENT_TABLE[type])
      .select("*")
      .eq("id", id)
      .abortSignal(AbortSignal.timeout(QUERY_TIMEOUT_MS))
      .maybeSingle();
    return (data as ContentRow<T>) ?? null;
  } catch {
    return null;
  }
}

/**
 * Gepubliceerde ('live') content voor de publieke site.
 *
 * Bewust op de cookieloze client (zie `lib/supabase/public.ts`): dit is de enige
 * content-functie die publieke pagina's aanroepen, en cookies zouden ze allemaal
 * dynamisch maken. `cache()` dedupliceert bovendien binnen één render — meerdere
 * componenten op dezelfde pagina vragen vaak dezelfde tabel op.
 */
export const getPublishedContent = cache(async function getPublishedContent<
  T = Record<string, unknown>,
>(type: ContentType): Promise<ContentRow<T>[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from(CONTENT_TABLE[type])
      .select("*")
      .eq("status", "live")
      .order("volgorde", { ascending: true })
      .abortSignal(AbortSignal.timeout(QUERY_TIMEOUT_MS));
    // Zonder deze regel is een RLS-weigering of kapotte query niet te
    // onderscheiden van een lege tabel: beide leveren [] op, waarna de
    // datalaag stil terugvalt op de seed en die pagina de cache in gaat.
    if (error) console.error(`[cms] query mislukt op ${CONTENT_TABLE[type]}:`, error.message);
    return (data as ContentRow<T>[]) ?? [];
  } catch (e) {
    // Timeout of netwerkfout — zelfde risico, dus ook zichtbaar maken.
    console.error(`[cms] ${CONTENT_TABLE[type]} onbereikbaar:`, (e as Error).message);
    return [];
  }
});
