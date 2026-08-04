"use server";

import { createClient } from "@/lib/supabase/server";
import { sendInterneNotificatie } from "@/lib/email";

export interface SollicitatieState {
  ok: boolean;
  message: string;
  /** Per-veld foutmeldingen (key = veldnaam). */
  errors?: Record<string, string>;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CV_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const MAX_CV = 8 * 1024 * 1024; // 8 MB

function str(formData: FormData, key: string): string {
  const v = formData.get(key);
  return typeof v === "string" ? v.trim() : "";
}

export async function submitSollicitatie(
  _prev: SollicitatieState,
  formData: FormData,
): Promise<SollicitatieState> {
  // Honeypot: bots vullen dit verborgen veld; mensen niet.
  if (str(formData, "website")) {
    return { ok: true, message: "Bedankt voor je sollicitatie!" };
  }

  const vacatureSlug = str(formData, "vacature_slug");
  const vacatureTitel = str(formData, "vacature_titel");
  const naam = str(formData, "naam");
  const email = str(formData, "email");
  const telefoon = str(formData, "telefoon");
  const motivatie = str(formData, "motivatie");
  const cv = formData.get("cv");

  // Validatie — verzamel álle fouten tegelijk.
  const errors: Record<string, string> = {};
  if (naam.length < 2) errors.naam = "Vul je naam in.";
  else if (naam.length > 200) errors.naam = "Naam is te lang (max. 200 tekens).";
  if (!EMAIL_RE.test(email)) errors.email = "Vul een geldig e-mailadres in.";
  else if (email.length > 320) errors.email = "E-mailadres is te lang.";
  if (telefoon.length > 40) errors.telefoon = "Telefoonnummer is te lang.";
  if (motivatie.length > 5000) errors.motivatie = "Motivatie is te lang (max. 5000 tekens).";

  let cvFile: File | null = null;
  if (cv instanceof File && cv.size > 0) {
    if (!CV_TYPES.includes(cv.type)) errors.cv = "Upload een pdf of Word-document.";
    else if (cv.size > MAX_CV) errors.cv = "Bestand is te groot (max. 8 MB).";
    else cvFile = cv;
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, message: "Controleer de gemarkeerde velden.", errors };
  }

  const supabase = await createClient();

  // CV uploaden naar de privébucket (pad bewaren, geen publieke URL).
  let cvPath: string | null = null;
  if (cvFile) {
    const ext =
      (cvFile.name.split(".").pop() ?? "pdf").toLowerCase().replace(/[^a-z0-9]/g, "") || "pdf";
    const path = `${vacatureSlug || "open"}/${crypto.randomUUID()}.${ext}`;
    try {
      const buffer = Buffer.from(await cvFile.arrayBuffer());
      const { error: upErr } = await supabase.storage
        .from("sollicitaties")
        .upload(path, buffer, { contentType: cvFile.type, upsert: false });
      if (upErr) {
        return {
          ok: false,
          message:
            "Het cv kon niet worden geüpload. Probeer het opnieuw of mail people@thenewwaveit.com.",
        };
      }
      cvPath = path;
    } catch {
      return {
        ok: false,
        message:
          "Het cv kon niet worden geüpload. Probeer het opnieuw of mail people@thenewwaveit.com.",
      };
    }
  }

  try {
    const { error } = await supabase.from("sollicitaties").insert({
      vacature_slug: vacatureSlug || "open-sollicitatie",
      naam,
      email,
      telefoon: telefoon || null,
      motivatie: motivatie || null,
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

  // Interne notificatie (fail-safe: breekt de sollicitatie nooit).
  await sendInterneNotificatie({
    subject: `Nieuwe sollicitatie: ${naam}${vacatureTitel ? ` — ${vacatureTitel}` : ""}`,
    heading: "Nieuwe sollicitatie",
    rows: [
      { label: "Naam", value: naam },
      { label: "E-mail", value: email },
      { label: "Telefoon", value: telefoon },
      { label: "Vacature", value: vacatureTitel || vacatureSlug || "Open sollicitatie" },
      { label: "Motivatie", value: motivatie },
      { label: "CV", value: cvPath ? "Bijgevoegd — open via de admin" : "Niet bijgevoegd" },
    ],
    adminPath: "/admin/sollicitaties",
  });

  return {
    ok: true,
    message: "Bedankt voor je sollicitatie! We reageren binnen twee werkdagen.",
  };
}
