"use server";

import { revalidatePath } from "next/cache";
import { gebruikerNaam, requireAdmin } from "@/lib/dal";
import { createClient } from "@/lib/supabase/server";
import { CONTENT_TABLE, listContentOfFout, type ContentType } from "@/lib/cms/content";
import { invoerVoor, veldenVoor } from "@/lib/cms/baseline-seeds";
import { isStructured } from "@/lib/cms/schema";
import { logAudit } from "@/lib/cms/audit";
import { revalidateContent } from "@/lib/cms/revalidate";

export interface HerstelState {
  ok: boolean;
  message: string;
}

const TYPEN = Object.keys(CONTENT_TABLE) as ContentType[];

/** De lege waarde die bij een veldtype hoort. */
function leegVoor(type: string): unknown {
  if (type === "group") return {};
  if (isStructured(type as never)) return [];
  return "";
}

async function schrijf(
  type: ContentType,
  slug: string,
  data: Record<string, unknown>,
): Promise<string | null> {
  const supabase = await createClient();
  const { error } = await supabase
    .from(CONTENT_TABLE[type])
    .update({ data, bijgewerkt_op: new Date().toISOString() })
    .eq("slug", slug);
  return error?.message ?? null;
}

/**
 * Vult elke sleutel die een rij mist aan met de seedwaarde.
 *
 * Voegt alleen toe, overschrijft nooit: wat een redacteur heeft ingevuld blijft
 * staan, ook als het van de seed afwijkt. Na afloop toont de admin dezelfde
 * tekst als de site — dat was het hele verschil bij een ontbrekende sleutel.
 *
 * Getalvelden zonder seedwaarde slaan we over: een verzonnen 0 is erger dan een
 * ontbrekend veld.
 */
export async function vulAanUitSeed(): Promise<HerstelState> {
  const user = await requireAdmin();
  let rijen = 0;
  let sleutels = 0;

  for (const type of TYPEN) {
    const { rijen: rows, fout } = await listContentOfFout(type);
    if (fout) return { ok: false, message: `${type}: ${fout}` };
    const invoer = invoerVoor(type, []);
    const velden = veldenVoor(type);

    for (const row of rows) {
      const data = { ...(row.data as Record<string, unknown>) };
      const zaad = invoer.seed[row.slug];
      let bij = 0;
      for (const f of velden(row.slug)) {
        if (Object.hasOwn(data, f.key)) continue;
        const waarde = zaad?.[f.key];
        if (waarde === undefined) {
          if (f.type === "number") continue;
          data[f.key] = leegVoor(f.type);
        } else {
          data[f.key] = waarde;
        }
        bij += 1;
      }
      if (!bij) continue;
      const fout2 = await schrijf(type, row.slug, data);
      if (fout2) return { ok: false, message: `${type}/${row.slug}: ${fout2}` };
      rijen += 1;
      sleutels += bij;
      await logAudit({
        gebruiker_email: user.email ?? null,
        gebruiker_naam: gebruikerNaam(user),
        actie: "gesynchroniseerd",
        content_type: type,
        slug: row.slug,
        titel: row.titel,
      });
    }
  }

  revalidateContent();
  revalidatePath("/admin/baseline");
  return {
    ok: true,
    message: sleutels
      ? `${sleutels} sleutel(s) aangevuld in ${rijen} rij(en).`
      : "Er ontbrak niets meer.",
  };
}

/**
 * Verwijdert sleutels die in geen enkel veldschema voorkomen.
 *
 * Onomkeerbaar, en daarom achter een bevestiging. De sleutels die hier weggaan
 * zijn dezelfde die de nulmeting als wees toont: de editor laat ze niet zien en
 * geen enkele pagina leest ze, dus ze kunnen alleen nog verwarring stichten.
 */
export async function verwijderWeessleutels(): Promise<HerstelState> {
  const user = await requireAdmin();
  let rijen = 0;
  let sleutels = 0;

  for (const type of TYPEN) {
    const { rijen: rows, fout } = await listContentOfFout(type);
    if (fout) return { ok: false, message: `${type}: ${fout}` };
    const velden = veldenVoor(type);

    for (const row of rows) {
      const bekend = new Set(velden(row.slug).map((f) => f.key));
      const data = Object.fromEntries(
        Object.entries(row.data as Record<string, unknown>).filter(([k]) => bekend.has(k)),
      );
      const weg = Object.keys(row.data as object).length - Object.keys(data).length;
      if (!weg) continue;
      const fout2 = await schrijf(type, row.slug, data);
      if (fout2) return { ok: false, message: `${type}/${row.slug}: ${fout2}` };
      rijen += 1;
      sleutels += weg;
      await logAudit({
        gebruiker_email: user.email ?? null,
        gebruiker_naam: gebruikerNaam(user),
        actie: "gesynchroniseerd",
        content_type: type,
        slug: row.slug,
        titel: row.titel,
      });
    }
  }

  revalidateContent();
  revalidatePath("/admin/baseline");
  return {
    ok: true,
    message: sleutels
      ? `${sleutels} weessleutel(s) verwijderd uit ${rijen} rij(en).`
      : "Er stonden geen weessleutels meer.",
  };
}
