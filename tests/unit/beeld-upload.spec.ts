import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { MAX_UPLOAD_BYTES } from "@/lib/beeld-eisen";
import {
  HERCODEER_VANAF_BYTES,
  MAX_BREEDTE_UPLOAD,
  doelAfmeting,
  moetVerkleinen,
  nogSteedsTeGroot,
  verkleindMelding,
} from "@/lib/beeld-upload";

const MB = 1024 * 1024;

/**
 * De storing die dit bestand verklaart: een foto van 1,12 MB gaf een 500. Niet
 * door onze code maar door de body-limiet van een server action, die in Next
 * standaard 1 MB is en hier niet gezet was. De eigen controle stond op 5 MB en
 * kwam dus nooit aan bod — de melding beloofde iets dat niet kon.
 */

describe("de twee limieten mogen niet uit elkaar lopen", () => {
  /* Dit is de eigenlijke bewaker. Zet iemand MAX_UPLOAD_BYTES omhoog zonder de
     configuratie mee te nemen, dan is de 500 terug. */
  it("MAX_UPLOAD_BYTES blijft onder de bodySizeLimit uit next.config.ts", () => {
    const config = readFileSync("next.config.ts", "utf8");
    const m = config.match(/bodySizeLimit:\s*["'](\d+)mb["']/i);
    expect(m, "bodySizeLimit staat niet in next.config.ts").not.toBeNull();
    const limiet = Number(m![1]) * MB;
    expect(
      MAX_UPLOAD_BYTES,
      `upload ${MAX_UPLOAD_BYTES / MB} MB tegen een body-limiet van ${limiet / MB} MB`,
    ).toBeLessThan(limiet);
  });

  it("de verkleiner grijpt in ruim vóór de uploadgrens", () => {
    expect(HERCODEER_VANAF_BYTES).toBeLessThan(MAX_UPLOAD_BYTES);
  });
});

describe("wanneer verkleinen we", () => {
  it("laat een klein bestand met rust", () => {
    expect(moetVerkleinen(200 * 1024)).toBe(false);
  });

  it("pakt alles boven de hercodeergrens", () => {
    expect(moetVerkleinen(HERCODEER_VANAF_BYTES + 1)).toBe(true);
    expect(moetVerkleinen(8 * MB)).toBe(true);
  });

  /* Een kleine maar extreem brede afbeelding kost geen bandbreedte, maar de
     server slaat wel duizenden pixels op die nergens getoond worden. */
  it("pakt ook een klein bestand dat veel te breed is", () => {
    expect(moetVerkleinen(100 * 1024, MAX_BREEDTE_UPLOAD + 1)).toBe(true);
    expect(moetVerkleinen(100 * 1024, MAX_BREEDTE_UPLOAD)).toBe(false);
  });
});

describe("de doelafmeting", () => {
  it("vergroot nooit", () => {
    expect(doelAfmeting(800, 600)).toEqual({ breedte: 800, hoogte: 600 });
  });

  it("schaalt naar de maximumbreedte en houdt de verhouding", () => {
    expect(doelAfmeting(4000, 3000)).toEqual({ breedte: 2560, hoogte: 1920 });
    expect(doelAfmeting(5120, 2880)).toEqual({ breedte: 2560, hoogte: 1440 });
  });
});

describe("wat de redacteur te zien krijgt", () => {
  const nep = (bytes: number) => ({ size: bytes, name: "x.webp" }) as File;

  it("meldt niets als er niet verkleind is", () => {
    expect(
      verkleindMelding({ bestand: nep(1000), verkleind: false, vanBytes: 1000 }),
    ).toBeUndefined();
  });

  it("noemt van hoeveel naar hoeveel", () => {
    const m = verkleindMelding({ bestand: nep(1 * MB), verkleind: true, vanBytes: 8 * MB });
    expect(m).toMatch(/8,00 MB/);
    expect(m).toMatch(/1,00 MB/);
  });

  /* Verkleinen lost bijna alles op; blijft het daarna tóch te groot, dan is er
     iets aan de hand dat de redacteur zelf moet oplossen. */
  it("ziet dat het na verkleinen nog steeds niet past", () => {
    expect(
      nogSteedsTeGroot({ bestand: nep(MAX_UPLOAD_BYTES + 1), verkleind: true, vanBytes: 20 * MB }),
    ).toBe(true);
    expect(
      nogSteedsTeGroot({ bestand: nep(MAX_UPLOAD_BYTES), verkleind: true, vanBytes: 20 * MB }),
    ).toBe(false);
  });
});
