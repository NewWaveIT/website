import "server-only";
import { createClient } from "@/lib/supabase/server";

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

async function count(table: string, onlyOpen?: string): Promise<number> {
  try {
    const supabase = await createClient();
    let q = supabase.from(table).select("*", { count: "exact", head: true });
    if (onlyOpen) q = q.neq("status", onlyOpen);
    const { count: c } = await q.abortSignal(AbortSignal.timeout(QUERY_TIMEOUT_MS));
    return c ?? 0;
  } catch {
    return 0;
  }
}

/** Aantallen voor de admin-sidebar. Faalt stil (0) zonder Supabase. */
export async function getAdminCounts(): Promise<Record<string, number>> {
  const [
    paginas,
    cases,
    diensten,
    sectoren,
    proposities,
    services,
    artikelen,
    vacatures,
    teamleden,
    aanvragen,
    sollicitaties,
  ] = await Promise.all([
    count("cms_paginas"),
    count("cms_cases"),
    count("cms_diensten"),
    count("cms_sectoren"),
    count("cms_proposities"),
    count("cms_services"),
    count("cms_artikelen"),
    count("cms_vacatures"),
    count("cms_teamleden"),
    count("contact_aanvragen", "afgerond"),
    count("sollicitaties", "afgerond"),
  ]);
  return {
    paginas,
    cases,
    diensten,
    sectoren,
    proposities,
    services,
    artikelen,
    vacatures,
    teamleden,
    aanvragen,
    sollicitaties,
  };
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

/** Gepubliceerde ('live') content voor de publieke site. */
export async function getPublishedContent<T = Record<string, unknown>>(
  type: ContentType,
): Promise<ContentRow<T>[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from(CONTENT_TABLE[type])
      .select("*")
      .eq("status", "live")
      .order("volgorde", { ascending: true })
      .abortSignal(AbortSignal.timeout(QUERY_TIMEOUT_MS));
    return (data as ContentRow<T>[]) ?? [];
  } catch {
    return [];
  }
}
