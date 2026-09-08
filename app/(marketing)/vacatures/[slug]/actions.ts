"use server";

import { createClient } from "@/lib/supabase/server";
import { sendSollicitatieNotificatie, sendSollicitatieBevestiging } from "@/lib/email";
import { getContactpersoon } from "@/lib/team-data";
import { magDoor } from "@/lib/rate-limit";

type DbClient = Awaited<ReturnType<typeof createClient>>;

export interface SollicitatieState {
  ok: boolean;
  message: string;
  /** Per-veld foutmeldingen (key = veldnaam). */
  errors?: Record<string, string>;
}

const DOC_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const MAX_DOC = 8 * 1024 * 1024; // 8 MB
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function str(formData: FormData, key: string): string {
  const v = formData.get(key);
  return typeof v === "string" ? v.trim() : "";
}

/** Valideert een optioneel bijgevoegd document; zet een foutmelding of geeft het bestand terug. */
function pickDoc(formData: FormData, key: string, errors: Record<string, string>): File | null {
  const f = formData.get(key);
  if (!(f instanceof File) || f.size === 0) return null;
  if (!DOC_TYPES.includes(f.type)) {
    errors[key] = "Upload een pdf of Word-document.";
    return null;
  }
  if (f.size > MAX_DOC) {
    errors[key] = "Bestand is te groot (max. 8 MB).";
    return null;
  }
  return f;
}

/** Upload een document naar de privébucket 'sollicitaties'; geeft het pad terug (of null bij fout). */
async function uploadDoc(
  supabase: DbClient,
  file: File,
  vacatureSlug: string,
  soort: string,
): Promise<string | null> {
  const ext =
    (file.name.split(".").pop() ?? "pdf").toLowerCase().replace(/[^a-z0-9]/g, "") || "pdf";
  const path = `${vacatureSlug || "open"}/${soort}-${crypto.randomUUID()}.${ext}`;
  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const { error } = await supabase.storage
      .from("sollicitaties")
      .upload(path, buffer, { contentType: file.type, upsert: false });
    return error ? null : path;
  } catch {
    return null;
  }
}

export async function submitSollicitatie(
  _prev: SollicitatieState,
  formData: FormData,
): Promise<SollicitatieState> {
  // Honeypot: bots vullen dit verborgen veld; mensen niet.
  if (str(formData, "website")) {
    return { ok: true, message: "Bedankt voor je sollicitatie!" };
  }

  if (!(await magDoor("sollicitatie", 3, 3600))) {
    return {
      ok: false,
      message: "Te veel pogingen. Probeer het over een uur opnieuw.",
    };
  }

  // De slug komt uit een hidden field en vormt het storage-pad; zonder filter
  // bepaalt de indiener de mapstructuur (`../`) en de kolomwaarde.
  const ruweSlug = str(formData, "vacature_slug");
  const vacatureSlug = /^[a-z0-9-]{1,80}$/.test(ruweSlug) ? ruweSlug : "";
  const vacatureTitel = str(formData, "vacature_titel");
  const naam = str(formData, "naam");
  const email = str(formData, "email");
  const telefoon = str(formData, "telefoon");
  const motivatie = str(formData, "motivatie");
  let link = str(formData, "link");

  // Validatie — verzamel álle fouten tegelijk.
  const errors: Record<string, string> = {};
  if (naam.length < 2) errors.naam = "Vul je naam in.";
  else if (naam.length > 200) errors.naam = "Naam is te lang (max. 200 tekens).";
  if (!EMAIL_RE.test(email)) errors.email = "Vul een geldig e-mailadres in.";
  else if (email.length > 320) errors.email = "E-mailadres is te lang.";
  if (telefoon.length > 40) errors.telefoon = "Telefoonnummer is te lang.";
  if (motivatie.length > 5000) errors.motivatie = "Motivatie is te lang (max. 5000 tekens).";
  if (link.length > 500) errors.link = "De link is te lang.";
  // Normaliseer: zonder schema toch een werkende URL maken.
  if (link && !/^https?:\/\//i.test(link)) link = `https://${link}`;

  const cvFile = pickDoc(formData, "cv", errors);
  const motivatieFile = pickDoc(formData, "motivatie_bestand", errors);

  if (Object.keys(errors).length > 0) {
    return { ok: false, message: "Controleer de gemarkeerde velden.", errors };
  }

  const supabase = await createClient();

  const uploadFout = {
    ok: false as const,
    message:
      "Een bestand kon niet worden geüpload. Probeer het opnieuw of mail people@thenewwaveit.com.",
  };

  let cvPath: string | null = null;
  if (cvFile) {
    cvPath = await uploadDoc(supabase, cvFile, vacatureSlug, "cv");
    if (!cvPath) return uploadFout;
  }

  let motivatiePath: string | null = null;
  if (motivatieFile) {
    motivatiePath = await uploadDoc(supabase, motivatieFile, vacatureSlug, "motivatie");
    if (!motivatiePath) return uploadFout;
  }

  try {
    const { error } = await supabase.from("sollicitaties").insert({
      vacature_slug: vacatureSlug || "open-sollicitatie",
      naam,
      email,
      telefoon: telefoon || null,
      motivatie: motivatie || null,
      motivatie_url: motivatiePath,
      link_url: link || null,
      cv_url: cvPath,
    });
    if (error) {
      return {
        ok: false,
        message:
          "Er ging iets mis bij het versturen. Probeer het later opnieuw of mail people@thenewwaveit.com.",
      };
    }
  } catch {
    return {
      ok: false,
      message:
        "Er ging iets mis bij het versturen. Probeer het later opnieuw of mail people@thenewwaveit.com.",
    };
  }

  const vacatureNaam = vacatureTitel || vacatureSlug || "Open sollicitatie";
  const bijlagen = [cvPath ? "cv" : null, motivatiePath ? "motivatiebrief" : null].filter(Boolean);
  const cvStatus = bijlagen.length
    ? `Bijgevoegd: ${bijlagen.join(" + ")}`
    : link
      ? "Link meegestuurd"
      : "Niet bijgevoegd";
  let motivatieTekst =
    motivatie || (motivatiePath ? "Motivatie als bestand bijgevoegd — zie de admin." : "");
  if (link) motivatieTekst += `${motivatieTekst ? "\n\n" : ""}Link: ${link}`;
  if (!motivatieTekst) motivatieTekst = "—";

  // Interne notificatie (fail-safe: breekt de sollicitatie nooit).
  await sendSollicitatieNotificatie({
    naam,
    email,
    telefoon,
    vacature: vacatureNaam,
    cvStatus,
    motivatie: motivatieTekst,
  });

  // Recruitment-contactpersoon (dynamisch): reply-to op de bevestiging + ondertekening.
  const rec = await getContactpersoon("recruitment");

  // Bevestiging naar de sollicitant zelf (fail-safe).
  await sendSollicitatieBevestiging({
    to: email,
    voornaam: naam.split(" ")[0] || naam,
    vacature: vacatureNaam,
    cvStatus,
    replyTo: rec?.email || undefined,
  });

  const recVoornaam = (rec?.naam || "Mitchel Wallaart").split(" ")[0] || "Mitchel";
  return {
    ok: true,
    message: `Bedankt — je sollicitatie staat bij ons binnen. Je ontvangt zo een bevestiging per mail, en je hoort binnen twee werkdagen van ons, meestal van ${recVoornaam} zelf.`,
  };
}
