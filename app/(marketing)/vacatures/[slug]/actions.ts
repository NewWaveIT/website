"use server";

import { inzendingClient } from "@/lib/supabase/inzendingen";
import { sendSollicitatieNotificatie, sendSollicitatieBevestiging } from "@/lib/email";
import { getContactpersoon } from "@/lib/team-data";
import { magDoor } from "@/lib/rate-limit";
import { SITE_URL } from "@/lib/site";

type DbClient = ReturnType<typeof inzendingClient>;

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

/**
 * Herkenningsbytes per toegestaan formaat. `file.type` komt van de browser en
 * is dus door de indiener te kiezen: een html-bestand dat zich als pdf
 * voordoet kwam door de oude check, werd met dat content-type opgeslagen en
 * later via een signed URL geopend in de browser van een collega. Deze lijst
 * kijkt naar wat er werkelijk in het bestand staat.
 */
const MAGISCHE_BYTES: [naam: string, bytes: number[]][] = [
  ["pdf", [0x25, 0x50, 0x44, 0x46]], // %PDF
  ["docx", [0x50, 0x4b, 0x03, 0x04]], // zip-container
  ["doc", [0xd0, 0xcf, 0x11, 0xe0]], // OLE2
];

function heeftGeldigeKop(buffer: Buffer): boolean {
  return MAGISCHE_BYTES.some(([, bytes]) => bytes.every((b, i) => buffer[i] === b));
}

/** Valideert een bijgevoegd document; zet een foutmelding of geeft het bestand terug. Geen
 *  bestand levert geen fout op — de aanroeper bepaalt zelf of ontbreken verplicht is. */
async function pickDoc(
  formData: FormData,
  key: string,
  errors: Record<string, string>,
): Promise<{ file: File; buffer: Buffer } | null> {
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
  // Pas hierna inlezen: een te groot bestand hoeft niet eerst in het geheugen.
  const buffer = Buffer.from(await f.arrayBuffer());
  if (!heeftGeldigeKop(buffer)) {
    errors[key] = "Dit lijkt geen pdf of Word-document. Controleer het bestand.";
    return null;
  }
  return { file: f, buffer };
}

/** Upload een document naar de privébucket 'sollicitaties'; geeft het pad terug (of null bij fout). */
async function uploadDoc(
  supabase: DbClient,
  doc: { file: File; buffer: Buffer },
  vacatureSlug: string,
  soort: string,
): Promise<string | null> {
  const ext =
    (doc.file.name.split(".").pop() ?? "pdf").toLowerCase().replace(/[^a-z0-9]/g, "") || "pdf";
  const path = `${vacatureSlug || "open"}/${soort}-${crypto.randomUUID()}.${ext}`;
  try {
    const { error } = await supabase.storage
      .from("sollicitaties")
      .upload(path, doc.buffer, { contentType: doc.file.type, upsert: false });
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
  let link = str(formData, "link");

  // Validatie — verzamel álle fouten tegelijk.
  const errors: Record<string, string> = {};
  if (naam.length < 2) errors.naam = "Vul je naam in.";
  else if (naam.length > 200) errors.naam = "Naam is te lang (max. 200 tekens).";
  if (!EMAIL_RE.test(email)) errors.email = "Vul een geldig e-mailadres in.";
  else if (email.length > 320) errors.email = "E-mailadres is te lang.";
  if (telefoon.length > 40) errors.telefoon = "Telefoonnummer is te lang.";
  if (link.length > 500) errors.link = "De link is te lang.";
  // Normaliseer: zonder schema toch een werkende URL maken.
  if (link && !/^https?:\/\//i.test(link)) link = `https://${link}`;

  const cvFile = await pickDoc(formData, "cv", errors);
  const motivatieFile = await pickDoc(formData, "motivatie_bestand", errors);

  // Cv en motivatiebrief zijn altijd verplicht, of het nu de open sollicitatie
  // op /werken-bij is of een sollicitatie op een specifieke vacature.
  if (!cvFile && !errors.cv) errors.cv = "Voeg je cv toe.";
  if (!motivatieFile && !errors.motivatie_bestand) {
    errors.motivatie_bestand = "Voeg een motivatiebrief toe.";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, message: "Controleer de gemarkeerde velden.", errors };
  }

  const supabase = inzendingClient();

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

  /**
   * Ruimt de zojuist geüploade bestanden op. Mislukt de insert daarna, dan
   * blijven cv en motivatiebrief anders als weesbestanden in de privébucket
   * staan: niemand kan er nog bij, niemand weet meer van wie ze zijn, en ze
   * tellen wel mee voor de bewaartermijn.
   */
  const ruimBestandenOp = async () => {
    const paden = [cvPath, motivatiePath].filter((p): p is string => Boolean(p));
    if (paden.length === 0) return;
    const { error } = await supabase.storage.from("sollicitaties").remove(paden);
    if (error) console.error("[sollicitatie] weesbestanden niet opgeruimd:", error.message);
  };

  let id: string | null = null;
  try {
    const { data, error } = await supabase
      .from("sollicitaties")
      .insert({
        vacature_slug: vacatureSlug || "open-sollicitatie",
        naam,
        email,
        telefoon: telefoon || null,
        motivatie_url: motivatiePath,
        link_url: link || null,
        cv_url: cvPath,
      })
      .select("id")
      .single();
    if (error) {
      await ruimBestandenOp();
      return {
        ok: false,
        message:
          "Er ging iets mis bij het versturen. Probeer het later opnieuw of mail people@thenewwaveit.com.",
      };
    }
    id = data.id;
  } catch {
    await ruimBestandenOp();
    return {
      ok: false,
      message:
        "Er ging iets mis bij het versturen. Probeer het later opnieuw of mail people@thenewwaveit.com.",
    };
  }

  const vacatureNaam = vacatureTitel || vacatureSlug || "Open sollicitatie";

  // Interne notificatie (fail-safe: breekt de sollicitatie nooit).
  await sendSollicitatieNotificatie({
    naam,
    email,
    telefoon,
    vacature: vacatureNaam,
    linkedinUrl: link,
    bron: vacatureSlug ? "Vacaturepagina" : "Open sollicitatie",
    cmsUrl: `${SITE_URL}/admin/sollicitaties?open=${id}`,
  });

  // Recruitment-contactpersoon (dynamisch): reply-to op de bevestiging + ondertekening.
  const rec = await getContactpersoon("recruitment");
  const recNaam = rec?.naam || "Mitchel Wallaart";
  const recEmail = rec?.email || "people@thenewwaveit.com";

  // Bevestiging naar de sollicitant zelf (fail-safe).
  await sendSollicitatieBevestiging({
    to: email,
    voornaam: naam.split(" ")[0] || naam,
    vacature: vacatureNaam,
    recruiterNaam: recNaam,
    recruiterEmail: recEmail,
  });

  const recVoornaam = recNaam.split(" ")[0] || "Mitchel";
  return {
    ok: true,
    message: `Bedankt, je sollicitatie staat bij ons binnen. Je ontvangt zo een bevestiging per mail, en je hoort binnen drie werkdagen van ons, meestal van ${recVoornaam} zelf.`,
  };
}
