import "server-only";
import { readFile } from "node:fs/promises";
import { join, normalize } from "node:path";
import sharp from "sharp";

/**
 * De echte afmetingen van een afbeelding, zodat een kader zich naar het beeld
 * kan voegen in plaats van andersom.
 *
 * Waarom dit bestaat: het coverbeeld van een artikel stond in een kader met een
 * vaste hoogte van 420px en `object-fit: cover`. Een diagram van 378x263 werd
 * daardoor opgeschaald naar 978 breed (2,6x, dus wazig) en er verdween 262px
 * aan hoogte -- precies de bovenste rij van de matrix. Een redacteur kan daar
 * niets aan doen en ziet het in de editor ook niet.
 *
 * De maten stonden nergens: de uploadactie méét ze wel, maar het coverveld
 * bewaart alleen de URL. Ze hier alsnog bepalen werkt met terugwerkende kracht,
 * ook voor de beelden die er al staan, en vraagt geen enkele handeling van de
 * redactie. Het gebeurt tijdens de build (de artikelpagina's zijn geprerenderd),
 * dus het kost een bezoeker niets.
 *
 * Lukt het niet, dan levert dit `null` en valt de opmaak terug op een kader met
 * `object-fit: scale-down`: nooit bijgesneden, nooit opgeschaald, hooguit wat
 * ruimte eromheen. Een storing mag nooit een pagina kosten.
 */

export interface Beeldmaat {
  breedte: number;
  hoogte: number;
}

/** Zelfde build, zelfde antwoord: elk beeld wordt één keer gemeten. */
const gemeten = new Map<string, Promise<Beeldmaat | null>>();

const HAAL_TIMEOUT_MS = 5000;

async function lokaal(src: string): Promise<Buffer | null> {
  // Alleen binnen public/: een pad met .. mag nooit buiten de map wijzen.
  const relatief = normalize(decodeURIComponent(src)).replace(/^[\\/]+/, "");
  if (relatief.startsWith("..")) return null;
  try {
    return await readFile(join(process.cwd(), "public", relatief));
  } catch {
    return null;
  }
}

async function opAfstand(src: string): Promise<Buffer | null> {
  try {
    const antwoord = await fetch(src, { signal: AbortSignal.timeout(HAAL_TIMEOUT_MS) });
    if (!antwoord.ok) return null;
    return Buffer.from(await antwoord.arrayBuffer());
  } catch {
    return null;
  }
}

async function meet(src: string): Promise<Beeldmaat | null> {
  const bytes = /^https?:\/\//.test(src) ? await opAfstand(src) : await lokaal(src);
  if (!bytes) return null;
  try {
    const { width, height } = await sharp(bytes).metadata();
    if (!width || !height) return null;
    return { breedte: width, hoogte: height };
  } catch {
    return null;
  }
}

/** Meet één afbeelding. Onbekend of onbereikbaar ⇒ `null`. */
export function beeldMaten(src: string | null | undefined): Promise<Beeldmaat | null> {
  if (!src) return Promise.resolve(null);
  const bestaand = gemeten.get(src);
  if (bestaand) return bestaand;
  const belofte = meet(src);
  gemeten.set(src, belofte);
  return belofte;
}
