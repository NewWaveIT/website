import { describe, expect, it } from "vitest";
import { sanitizeFull, sanitizeInline, sanitizeLite, stripHtml } from "@/lib/cms/sanitize";

describe("sanitizeFull", () => {
  it("behoudt toegestane tags", () => {
    expect(sanitizeFull("<p>Hallo <strong>wereld</strong></p>")).toBe(
      "<p>Hallo <strong>wereld</strong></p>",
    );
  });

  it("strip niet-toegestane tags maar behoudt de tekst", () => {
    expect(sanitizeFull('<script>alert("xss")</script><p>Veilig</p>')).toBe("<p>Veilig</p>");
  });

  it("voegt rel=noopener noreferrer nofollow toe aan links", () => {
    expect(sanitizeFull('<a href="https://example.com">link</a>')).toBe(
      '<a href="https://example.com" rel="noopener noreferrer nofollow">link</a>',
    );
  });

  it("staat afbeeldingen met src/alt/width/height toe", () => {
    expect(sanitizeFull('<img src="/x.webp" alt="X" width="10" height="10">')).toBe(
      '<img src="/x.webp" alt="X" width="10" height="10" />',
    );
  });
});

describe("sanitizeInline", () => {
  it("staat alleen inline-opmaak toe, geen blokken", () => {
    expect(sanitizeInline("<p>Blok</p><em>nadruk</em>")).toBe("Blok<em>nadruk</em>");
  });

  it("trimt whitespace rondom de output", () => {
    expect(sanitizeInline("  <strong>vet</strong>  ")).toBe("<strong>vet</strong>");
  });
});

describe("stripHtml", () => {
  it("verwijdert alle tags en normaliseert whitespace", () => {
    expect(stripHtml("<p>Hallo   <strong>wereld</strong></p>\n<p>Nieuw</p>")).toBe(
      "Hallo wereld Nieuw",
    );
  });

  it("geeft lege string terug voor lege input", () => {
    expect(stripHtml("")).toBe("");
  });
});

describe("sanitizeLite", () => {
  it("geeft lege string terug voor lege input", () => {
    expect(sanitizeLite("")).toBe("");
  });

  it("wrapt platte tekst (legacy data zonder blok-tag) in <p>", () => {
    expect(sanitizeLite("Gewoon platte tekst")).toBe("<p>Gewoon platte tekst</p>");
  });

  it("laat bestaande blok-tags (p/ul/ol) ongewijzigd staan", () => {
    expect(sanitizeLite("<ul><li>item</li></ul>")).toBe("<ul><li>item</li></ul>");
  });

  it("strip niet-toegestane tags zoals h2, maar behoudt de tekst erin", () => {
    // <h2> is geen toegestane tag in sanitizeLite: de tag verdwijnt, de tekst
    // blijft staan en het geheel wordt (want begint niet met p/ul/ol) alsnog
    // in <p> gewrapt.
    expect(sanitizeLite("<h2>Kop</h2><p>Tekst</p>")).toBe("<p>Kop<p>Tekst</p></p>");
  });
});
