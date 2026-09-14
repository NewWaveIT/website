import { describe, expect, it } from "vitest";
import { slugify } from "@/lib/cms/slug";

describe("slugify", () => {
  it("maakt een kleinletterig webadres met koppeltekens", () => {
    expect(slugify("Mendix Scale Sessie")).toBe("mendix-scale-sessie");
  });

  it("haalt accenten weg in plaats van ze te vervangen door een koppelteken", () => {
    expect(slugify("Privacyverklaring café")).toBe("privacyverklaring-cafe");
    expect(slugify("Coördinatie & strategie")).toBe("coordinatie-strategie");
  });

  it("laat geen koppelteken aan het begin of het eind staan", () => {
    expect(slugify("  — Over ons! ")).toBe("over-ons");
  });

  it("levert altijd iets op dat de server-action accepteert", () => {
    const toegestaan = /^[a-z0-9-]*$/;
    for (const invoer of ["ÉÉN", "app in a day", "50% sneller", "тест", "—"]) {
      expect(slugify(invoer), invoer).toMatch(toegestaan);
    }
  });
});
