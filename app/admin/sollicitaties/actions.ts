"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUser, gebruikerNaam } from "@/lib/dal";
import { logAudit } from "@/lib/cms/audit";

export async function updateSollicitatie(
  id: string,
  patch: { status?: string; interne_notitie?: string | null },
): Promise<{ ok: boolean }> {
  const user = await getCurrentUser();
  if (!user) return { ok: false };
  const supabase = await createClient();
  // `.select()` erbij: zonder passende RLS-policy raakt een update 0 rijen zónder
  // fout. Alleen op `error` vertrouwen zou zo'n stille mislukking als succes melden.
  const { data, error } = await supabase
    .from("sollicitaties")
    .update(patch)
    .eq("id", id)
    .select("id");
  if (error || !data?.length) return { ok: false };
  revalidatePath("/admin/sollicitaties");
  revalidatePath("/admin");
  return { ok: true };
}

/** Tijdelijke (5 min) signed URL voor een cv in de privébucket 'sollicitaties'. */
export async function getCvUrl(path: string): Promise<{ url?: string; error?: string }> {
  const user = await getCurrentUser();
  if (!user) return { error: "Niet ingelogd." };
  if (!path) return { error: "Geen cv beschikbaar." };
  const supabase = await createClient();
  const { data, error } = await supabase.storage.from("sollicitaties").createSignedUrl(path, 300);
  if (error || !data?.signedUrl) return { error: "Kon het cv niet openen." };
  return { url: data.signedUrl };
}

/**
 * Verwijdert een sollicitatie definitief, inclusief de geüploade bestanden.
 *
 * Eerst de paden lezen, dan de rij weg, dan pas de bestanden: andersom zou een
 * mislukte delete een kandidaat achterlaten met een cv-knop die nergens meer
 * heen wijst. Lukt het opruimen van de bucket niet, dan is de sollicitatie tóch
 * weg — een verweesd bestand in een privébucket is vervelend, een rij die niet
 * verdwijnt terwijl de admin dat wél gevraagd heeft is erger. Het staat in de
 * logs.
 */
export async function deleteSollicitatie(id: string): Promise<{ ok: boolean; error?: string }> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: "Niet ingelogd." };
  if (!id) return { ok: false, error: "Geen sollicitatie opgegeven." };

  const supabase = await createClient();
  const { data: rij } = await supabase
    .from("sollicitaties")
    .select("cv_url, motivatie_url")
    .eq("id", id)
    .maybeSingle();

  // `.select()` erbij: zonder DELETE-policy raakt dit 0 rijen zónder fout.
  const { data, error } = await supabase.from("sollicitaties").delete().eq("id", id).select("id");
  if (error) return { ok: false, error: error.message };
  if (!data?.length) return { ok: false, error: "Niet gevonden of geen rechten." };

  const paden = [rij?.cv_url, rij?.motivatie_url].filter(
    (p): p is string => typeof p === "string" && p.length > 0,
  );
  if (paden.length > 0) {
    const { error: opruimen } = await supabase.storage.from("sollicitaties").remove(paden);
    if (opruimen) {
      console.error("[admin] bestanden van sollicitatie niet opgeruimd:", opruimen.message);
    }
  }

  /* Een spoor van de handeling, geen kopie van de gegevens die net zijn
     weggegooid: wie wat wanneer verwijderde hoort vast te liggen, maar de naam
     van de sollicitant erin zetten brengt precies terug wat er is gewist. */
  await logAudit({
    gebruiker_email: user.email ?? null,
    gebruiker_naam: gebruikerNaam(user),
    actie: "verwijderd",
    content_type: "sollicitaties",
    slug: id,
    titel: null,
  });

  revalidatePath("/admin/sollicitaties");
  revalidatePath("/admin");
  return { ok: true };
}
