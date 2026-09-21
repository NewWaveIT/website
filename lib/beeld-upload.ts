import { MAX_UPLOAD_BYTES, alsMb } from "@/lib/beeld-eisen";

/**
 * Een beeld klaarmaken vóór het naar de server gaat.
 *
 * Twee redenen, en de eerste is een echte storing geweest: een server action is
 * in Next standaard op 1 MB gemaximeerd, dus een foto van 1,12 MB sneuvelde in
 * het transport met een 500 — vóór onze eigen controle, dus zonder bruikbare
 * melding. De limiet staat nu ruimer (zie next.config.ts), maar een foto recht
 * uit een telefoon is zo 8 MB en die zou er alsnog tegenaan lopen.
 *
 * De tweede reden is de site zelf: een beeld van 4000px breed wordt nergens
 * groter dan 2560 getoond. Die pixels kosten alleen uploadtijd en serverwerk.
 *
 * Daarom: te groot of te breed ⇒ in de browser terugbrengen naar WebP op
 * maximaal 2560px. Kleine, al nette bestanden blijven ongemoeid — die opnieuw
 * coderen maakt ze alleen slechter. Lukt het verkleinen niet (oud apparaat,
 * rare codec), dan gaat het origineel gewoon door en vangt de maatcontrole het
 * af met een melding in plaats van een 500.
 */

/** Breder dan dit wordt een beeld nergens op de site getoond. */
export const MAX_BREEDTE_UPLOAD = 2560;

/**
 * Onder deze grens laten we een bestand met rust. Ruim onder MAX_UPLOAD_BYTES,
 * want hercoderen kost altijd wat kwaliteit en levert bij een klein bestand
 * nauwelijks winst op.
 */
export const HERCODEER_VANAF_BYTES = 1024 * 1024;

/** Kwaliteit van de hercodering. Hoog genoeg dat tekst in een schermafdruk
 *  leesbaar blijft; de winst zit toch vooral in de afmeting. */
const WEBP_KWALITEIT = 0.9;

/** Moet dit bestand door de verkleiner? Puur, en daarom te testen. */
export function moetVerkleinen(bytes: number, breedte?: number): boolean {
  if (bytes > HERCODEER_VANAF_BYTES) return true;
  return typeof breedte === "number" && breedte > MAX_BREEDTE_UPLOAD;
}

/** De afmeting na verkleinen: nooit groter dan het origineel. */
export function doelAfmeting(breedte: number, hoogte: number): { breedte: number; hoogte: number } {
  if (breedte <= MAX_BREEDTE_UPLOAD) return { breedte, hoogte };
  const factor = MAX_BREEDTE_UPLOAD / breedte;
  return { breedte: MAX_BREEDTE_UPLOAD, hoogte: Math.round(hoogte * factor) };
}

export interface Klaargemaakt {
  bestand: File;
  /** Is er daadwerkelijk hercodeerd? Alleen voor de melding aan de redacteur. */
  verkleind: boolean;
  vanBytes: number;
}

/**
 * Verklein in de browser. Geeft het origineel terug als verkleinen niet nodig
 * is, niet lukt, of niets oplevert — dat laatste gebeurt bij een al goed
 * gecomprimeerde WebP, waar een tweede ronde het bestand gróter maakt.
 */
export async function klaarVoorUpload(file: File): Promise<Klaargemaakt> {
  const origineel: Klaargemaakt = { bestand: file, verkleind: false, vanBytes: file.size };
  if (!moetVerkleinen(file.size)) return origineel;
  if (typeof createImageBitmap !== "function" || typeof OffscreenCanvas === "undefined") {
    return origineel;
  }

  try {
    // `from-image`: anders komt een staande telefoonfoto liggend op het doek.
    const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
    const doel = doelAfmeting(bitmap.width, bitmap.height);
    const doek = new OffscreenCanvas(doel.breedte, doel.hoogte);
    const ctx = doek.getContext("2d");
    if (!ctx) return origineel;
    ctx.drawImage(bitmap, 0, 0, doel.breedte, doel.hoogte);
    bitmap.close();

    const blob = await doek.convertToBlob({ type: "image/webp", quality: WEBP_KWALITEIT });
    if (!blob || blob.size >= file.size) return origineel;

    const naam = file.name.replace(/\.[^.]+$/, "") + ".webp";
    return {
      bestand: new File([blob], naam, { type: "image/webp" }),
      verkleind: true,
      vanBytes: file.size,
    };
  } catch {
    return origineel;
  }
}

/** De melding na het verkleinen, of `undefined` als er niets te melden valt. */
export function verkleindMelding(k: Klaargemaakt): string | undefined {
  if (!k.verkleind) return undefined;
  return `Verkleind van ${alsMb(k.vanBytes)} naar ${alsMb(k.bestand.size)} (maximaal ${MAX_BREEDTE_UPLOAD}px breed).`;
}

/** Blijft het bestand ná verkleinen te groot? Dan kan het er niet in. */
export function nogSteedsTeGroot(k: Klaargemaakt): boolean {
  return k.bestand.size > MAX_UPLOAD_BYTES;
}
