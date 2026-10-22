import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

/* De CSP staat als losse regels in next.config.ts. We lezen de bron in plaats van de
   config te importeren: dat houdt de test vrij van Next-interne imports. */
const bron = readFileSync("next.config.ts", "utf8");
const directive = (naam: string) => bron.match(new RegExp(`"${naam} ([^"]+)"`))?.[1] ?? "";

describe("Content-Security-Policy", () => {
  /* Regressietest: de CMS-editor toont een geüpload beeld als gewone <img> rechtstreeks
     uit Supabase Storage, terwijl de publieke site via next/image (same-origin) gaat.
     `img-src 'self' data:` blokkeerde de editorvariant, dus het beeld stond kapot in de
     editor en werkte op de site. Dat valt alleen op in een browser, niet in tsc. */
  it("staat beelden uit het publieke Supabase Storage-pad toe", () => {
    expect(directive("img-src")).toContain("https://*.supabase.co/storage/v1/object/public/");
  });

  it("opent niet heel *.supabase.co voor beelden", () => {
    expect(directive("img-src")).not.toMatch(/https:\/\/\*\.supabase\.co(\s|$)/);
  });
});
