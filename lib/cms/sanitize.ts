import "server-only";
import sanitizeHtml from "sanitize-html";

const SCHEMES = ["http", "https", "mailto", "tel"];
const linkTransform = {
  a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer nofollow" }),
};

/** Volledige opmaak (artikelen): koppen, lijsten, citaat, links, afbeeldingen. */
export function sanitizeFull(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: [
      "p",
      "h2",
      "h3",
      "strong",
      "b",
      "em",
      "i",
      "s",
      "u",
      "ul",
      "ol",
      "li",
      "blockquote",
      "a",
      "br",
      "code",
      "pre",
      "figure",
      "img",
      "figcaption",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel"],
      img: ["src", "alt", "width", "height"],
      figure: ["data-type", "data-align"],
    },
    allowedSchemes: SCHEMES,
    transformTags: linkTransform,
  });
}

/** Inline opmaak (intro's in hero's): alleen nadruk + links, geen blokken. Veilig binnen een <p>. */
export function sanitizeInline(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: ["strong", "b", "em", "i", "a", "br"],
    allowedAttributes: { a: ["href", "target", "rel"] },
    allowedSchemes: SCHEMES,
    transformTags: linkTransform,
  }).trim();
}

/** Alle tags weg → platte tekst (voor meta-description en JSON-LD). */
export function stripHtml(html: string): string {
  return sanitizeHtml(html, { allowedTags: [], allowedAttributes: {} }).replace(/\s+/g, " ").trim();
}

/**
 * Kort platte tekst in op een woordgrens, voor meta-descriptions. Zoekmachines
 * kappen rond de 155 tekens af; een hele intro-alinea levert een afgeknotte zin op.
 */
export function kort(tekst: string, max = 155): string {
  if (tekst.length <= max) return tekst;
  const snee = tekst.slice(0, max - 1);
  const spatie = snee.lastIndexOf(" ");
  return `${(spatie > max * 0.6 ? snee.slice(0, spatie) : snee).replace(/[,;:.\s]+$/, "")}…`;
}

/** Lichte opmaak (body-velden buiten artikelen): alleen inline + eenvoudige lijsten. */
export function sanitizeLite(html: string): string {
  const clean = sanitizeHtml(html, {
    allowedTags: ["p", "strong", "b", "em", "i", "a", "ul", "ol", "li", "br"],
    allowedAttributes: { a: ["href", "target", "rel"] },
    allowedSchemes: SCHEMES,
    transformTags: linkTransform,
  }).trim();
  if (!clean) return "";
  // Zorg dat platte tekst (oude data) toch als blok rendert.
  return /^<(p|ul|ol)\b/i.test(clean) ? clean : `<p>${clean}</p>`;
}
