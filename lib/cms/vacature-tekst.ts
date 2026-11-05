/**
 * De vacaturetekst is één stuk opgemaakte tekst: koppen, alinea's en opsommingen. Dit bestand
 * bevat de drie pure stukjes logica eromheen, zonder `server-only` omdat de editor (client) ze
 * ook gebruikt:
 *
 * - `plakTekstNaarHtml`: platte tekst uit LinkedIn of een Word-bestand wordt in één keer
 *   opgemaakt. Alinea's blijven alinea's, regels met `*`, `-` of `•` worden opsommingen, en een
 *   korte regel zonder punt wordt een kop.
 * - `kiesPlak`: wanneer dat plakken van ons is, en wanneer de editor zijn gang mag gaan (een
 *   plakactie die al echte lijsten of koppen draagt).
 * - `splitsVacature`: de eerste alinea is de intro in de header, de rest is de tekst eronder.
 *
 * Dit is een inschatting, geen vertaler: een kop herkennen we aan zijn vorm, niet aan wat hij
 * betekent. Klopt er een kop niet, dan zet de redacteur hem met één klik om in de editor.
 */

/** Hoeveel koppen er vóór de intro mogen staan ("Over de rol" boven de eerste alinea). */
export const MAX_KOPPEN_VOOR_INTRO = 3;

const BULLET = /^[*\-•·▪◦‣]\s+(.+)$/;
const EINDE_ZIN = /[.,;:!]$/;
const MAX_KOP_TEKENS = 70;
const MAX_KOP_WOORDEN = 9;

/** Regels die er bij kopiëren uit een LinkedIn-pagina meekomen en niet bij de tekst horen. */
const RUIS = new Set(["over de vacature"]);

/** Plakactie met echte structuur: dan weet de editor zelf wat hij ermee moet. */
const STRUCTUUR = /<(ul|ol|li|h[1-6]|table)\b/i;

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function isKop(regel: string): boolean {
  if (regel.length > MAX_KOP_TEKENS) return false;
  if (regel.split(/\s+/).length > MAX_KOP_WOORDEN) return false;
  return !EINDE_ZIN.test(regel);
}

type Blok =
  | { soort: "alinea"; tekst: string }
  | { soort: "kop"; tekst: string }
  | { soort: "lijst"; items: string[] };

export function plakTekstNaarHtml(tekst: string): string {
  const regels = tekst
    .replace(/\r\n?/g, "\n")
    .split("\n")
    .map((r) => r.trim());

  const blokken: Blok[] = [];
  let lijst: string[] | null = null;

  /** Is de eerstvolgende regel met inhoud een bullet? (Voor een lege regel binnen een lijst.) */
  const volgtBullet = (vanaf: number): boolean => {
    for (let j = vanaf; j < regels.length; j++) {
      if (regels[j]) return BULLET.test(regels[j]!);
    }
    return false;
  };

  regels.forEach((regel, i) => {
    if (!regel) {
      if (lijst && !volgtBullet(i + 1)) lijst = null;
      return;
    }
    if (RUIS.has(regel.toLowerCase())) return;

    const bullet = BULLET.exec(regel);
    if (bullet) {
      if (!lijst) {
        lijst = [];
        blokken.push({ soort: "lijst", items: lijst });
      }
      lijst.push(bullet[1]!);
      return;
    }

    lijst = null;
    blokken.push({ soort: isKop(regel) ? "kop" : "alinea", tekst: regel });
  });

  // Niveaus. Vraagkoppen ("Wat ga je doen?") zijn de hoofdkoppen; wat er na de eerste vraagkop
  // zonder vraagteken komt ("Must-haves", "Software engineering") hangt eronder. Zonder
  // vraagkoppen is elke kop een H2.
  const heeftVraagkop = blokken.some((b) => b.soort === "kop" && b.tekst.endsWith("?"));
  let vraagkopGezien = false;

  return blokken
    .map((b) => {
      if (b.soort === "alinea") return `<p>${esc(b.tekst)}</p>`;
      if (b.soort === "lijst") {
        return `<ul>${b.items.map((it) => `<li><p>${esc(it)}</p></li>`).join("")}</ul>`;
      }
      const vraag = b.tekst.endsWith("?");
      if (vraag) vraagkopGezien = true;
      const niveau = heeftVraagkop && !vraag && vraagkopGezien ? 3 : 2;
      return `<h${niveau}>${esc(b.tekst)}</h${niveau}>`;
    })
    .join("");
}

/**
 * De HTML die we in de editor zetten voor deze plakactie, of `null` als de editor het zelf mag
 * afhandelen. Echte lijsten of koppen op het klembord (uit een webpagina of Word) laten we
 * ongemoeid; platte tekst met meerdere regels zetten we om.
 */
export function kiesPlak(html: string, tekst: string): string | null {
  if (STRUCTUUR.test(html)) return null;
  const plat = tekst.trim();
  if (!plat.includes("\n")) return null;
  return plakTekstNaarHtml(plat) || null;
}

/**
 * Splitst de opgeslagen HTML in de intro voor de header en de tekst eronder.
 *
 * De intro is de eerste alinea, met hooguit {@link MAX_KOPPEN_VOOR_INTRO} koppen ervoor. Die
 * koppen blijven bij de tekst: "Over de rol" hoort boven het vervolg van de rol, niet in de
 * header. Begint de tekst met een lijst, dan is er geen intro.
 */
export function splitsVacature(html: string): { intro: string; body: string } {
  let rest = html.trim();
  let koppen = "";
  for (let i = 0; i < MAX_KOPPEN_VOOR_INTRO; i++) {
    const kop = /^<h[23]>[\s\S]*?<\/h[23]>/.exec(rest);
    if (!kop) break;
    koppen += kop[0];
    rest = rest.slice(kop[0].length).trimStart();
  }
  const alinea = /^<p>([\s\S]*?)<\/p>/.exec(rest);
  if (!alinea) return { intro: "", body: html.trim() };
  return { intro: alinea[1]!.trim(), body: koppen + rest.slice(alinea[0].length).trimStart() };
}
