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
