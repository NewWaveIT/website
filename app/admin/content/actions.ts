"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/dal";
import { createClient } from "@/lib/supabase/server";
import { CONTENT_TABLE, type ContentType } from "@/lib/cms/content";
import { FIELD_SCHEMAS } from "@/lib/cms/schema";

/** Adminlijst per contenttype (voor terugnavigatie + revalidatie). */
const LIST_PATH: Record<ContentType, string> = {
  paginas: "/admin/paginas",
  cases: "/admin/cases",
  diensten: "/admin/diensten",
  sectoren: "/admin/sectoren",
  artikelen: "/admin/inzichten",
  vacatures: "/admin/vacatures",
  teamleden: "/admin/teamleden",
};

function isType(v: string): v is ContentType {
  return v in CONTENT_TABLE;
}

export type SaveState = { error?: string };

export async function saveContent(_prev: SaveState, formData: FormData): Promise<SaveState> {
  const user = await requireAdmin();

  const type = String(formData.get("type") ?? "");
  if (!isType(type)) return { error: "Onbekend contenttype." };

  const id = String(formData.get("id") ?? "").trim();
  const titel = String(formData.get("titel") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim();
  const status = String(formData.get("status") ?? "concept");
  const volgorde = Number.parseInt(String(formData.get("volgorde") ?? "0"), 10) || 0;

  if (!titel) return { error: "Titel is verplicht." };
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return { error: "Slug mag alleen kleine letters, cijfers en koppeltekens bevatten." };
  }
  if (status !== "live" && status !== "concept") return { error: "Ongeldige status." };

  // Overige velden (JSON-uitklap) eerst, zodat de schemavelden erover heen winnen.
  const extraRaw = String(formData.get("extra") ?? "").trim();
  let data: Record<string, unknown> = {};
  if (extraRaw) {
    try {
      const parsed = JSON.parse(extraRaw);
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        data = parsed as Record<string, unknown>;
      } else {
        return { error: "Overige velden moeten een JSON-object zijn." };
      }
    } catch {
      return { error: "Overige velden bevatten geen geldige JSON." };
    }
  }

  for (const f of FIELD_SCHEMAS[type]) {
    const raw = String(formData.get(`f_${f.key}`) ?? "").trim();
    if (raw === "") {
      delete data[f.key];
    } else if (f.type === "number") {
      const n = Number(raw);
      if (!Number.isNaN(n)) data[f.key] = n;
    } else {
      data[f.key] = raw;
    }
  }

  const record = {
    slug,
    titel,
    status,
    volgorde,
    data,
    bijgewerkt_op: new Date().toISOString(),
    bewerkt_door: user.email ?? null,
  };

  const supabase = await createClient();
  const table = CONTENT_TABLE[type];

  if (id && id !== "new") {
    const { error } = await supabase.from(table).update(record).eq("id", id);
    if (error) return { error: error.message };
  } else {
    const { error } = await supabase.from(table).insert(record);
    if (error) {
      return {
        error: error.code === "23505" ? "Deze slug bestaat al." : error.message,
      };
    }
  }

  revalidatePath(LIST_PATH[type]);
  redirect(LIST_PATH[type]);
}

export async function deleteContent(formData: FormData): Promise<void> {
  await requireAdmin();

  const type = String(formData.get("type") ?? "");
  const id = String(formData.get("id") ?? "").trim();
  if (!isType(type) || !id) return;

  const supabase = await createClient();
  await supabase.from(CONTENT_TABLE[type]).delete().eq("id", id);

  revalidatePath(LIST_PATH[type]);
  redirect(LIST_PATH[type]);
}
