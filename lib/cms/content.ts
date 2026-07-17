import "server-only";
import { createClient } from "@/lib/supabase/server";

export type ContentType = "paginas" | "cases" | "diensten" | "sectoren" | "artikelen" | "vacatures" | "teamleden";

export const CONTENT_TABLE: Record<ContentType, string> = {
  paginas: "cms_paginas",
  cases: "cms_cases",
  diensten: "cms_diensten",
  sectoren: "cms_sectoren",
  artikelen: "cms_artikelen",
  vacatures: "cms_vacatures",
  teamleden: "cms_teamleden",
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

async function count(table: string, onlyOpen?: string): Promise<number> {
  try {
    const supabase = await createClient();
    let q = supabase.from(table).select("*", { count: "exact", head: true });
    if (onlyOpen) q = q.neq("status", onlyOpen);
    const { count: c } = await q;
    return c ?? 0;
  } catch {
    return 0;
  }
}

/** Aantallen voor de admin-sidebar. Faalt stil (0) zonder Supabase. */
export async function getAdminCounts(): Promise<Record<string, number>> {
  const [paginas, cases, artikelen, vacatures, aanvragen, sollicitaties] = await Promise.all([
    count("cms_paginas"),
    count("cms_cases"),
    count("cms_artikelen"),
    count("cms_vacatures"),
    count("contact_aanvragen", "afgerond"),
    count("sollicitaties", "afgerond"),
  ]);
  return { paginas, cases, artikelen, vacatures, aanvragen, sollicitaties };
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
      .order("bijgewerkt_op", { ascending: false });
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
      .order("volgorde", { ascending: true });
    return (data as ContentRow<T>[]) ?? [];
  } catch {
    return [];
  }
}
