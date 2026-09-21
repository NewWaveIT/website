/**
 * De h2-koppen uit een artikel, voor de inhoudsopgave naast de tekst.
 *
 * Waarom dit bestaat: een artikel is op een breed scherm 8,5 scherm lang, met
 * een tekstkolom van 720px in een venster van 1440 — de helft van de pagina
 * stond leeg terwijl er geen enkele manier was om ergens heen te springen. De
 * koppen staan er al; ze werden alleen nergens voor gebruikt.
 *
 * De id's worden hier én in de gerenderde tekst uit dezelfde functie afgeleid,
 * anders wijst de inhoudsopgave naar ankers die niet bestaan.
 */

export interface Kop {
  id: string;
  tekst: string;
}

/** Tekst → anker. Zelfde regels als een slug: kleine letters, streepjes. */
export function kopSlug(tekst: string): string {
  const basis = tekst
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  // Een kop die alleen uit leestekens bestaat levert een lege slug op; dan is
  // een vast voorvoegsel beter dan een anker van niets.
  return basis || "kop";
}

/** Zichtbare tekst uit een stukje HTML, zonder de tags ertussen. */
function tekstUit(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Alle h2's in volgorde, met een uniek anker.
 *
 * Bewust een regex en geen parser: dit draait tijdens de build op tekst die de
 * saneerstap al heeft gehad, dus er zit geen exotische HTML in. Hij accepteert
 * attributen op de kop en tags erbinnen, want vet en cursief komen daar echt
 * in voor. Twee koppen met dezelfde tekst krijgen -2, -3 erachter; anders
 * springen twee items in de inhoudsopgave naar hetzelfde anker.
 */
export function koppenUit(html: string): Kop[] {
  const koppen: Kop[] = [];
  const gezien = new Map<string, number>();

  for (const m of html.matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/gi)) {
    const tekst = tekstUit(m[1] ?? "");
    if (!tekst) continue;
    const basis = kopSlug(tekst);
    const n = (gezien.get(basis) ?? 0) + 1;
    gezien.set(basis, n);
    koppen.push({ id: n === 1 ? basis : `${basis}-${n}`, tekst });
  }

  return koppen;
}
