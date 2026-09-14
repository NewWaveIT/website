import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Geen opmaak in de JSX.
 *
 * De admin had 71 inline `style`-objecten. Die winnen het van elke regel in
 * admin.css, erven geen designtoken, kunnen niet reageren op hover, focus of
 * schermbreedte, en ze staan niet op de plek waar je zoekt als iets er scheef
 * uitziet. Ze zijn allemaal een klasse geworden — op drie na, waar de waarde
 * echt pas in de browser bekend is.
 *
 * Die drie staan hieronder met naam en aantal. Een nieuwe inline style laat de
 * test dus vallen, en wie er tóch een nodig heeft zet hem hier neer met een
 * reden erbij.
 */

const UITZONDERINGEN: Record<string, { aantal: number; waarom: string }> = {
  "app/admin/page.tsx": {
    aantal: 2,
    waarom: "breedte van de live/concept-balk, een percentage per contenttype",
  },
  "components/admin/modal.tsx": {
    aantal: 1,
    waarom: "maxWidth die de aanroeper per dialoog meegeeft",
  },
};

const MAPPEN = ["app/admin", "components/admin"];

function bronbestanden(map: string, uit: string[] = []): string[] {
  for (const naam of readdirSync(map)) {
    const pad = join(map, naam);
    if (statSync(pad).isDirectory()) bronbestanden(pad, uit);
    else if (naam.endsWith(".tsx")) uit.push(pad);
  }
  return uit;
}

describe("de admin regelt zijn opmaak in CSS", () => {
  const gevonden: Record<string, number> = {};
  for (const pad of MAPPEN.flatMap((m) => bronbestanden(m))) {
    const n = [...readFileSync(pad, "utf8").matchAll(/\bstyle=\{/g)].length;
    if (n > 0) gevonden[pad] = n;
  }

  it("alleen de vastgelegde uitzonderingen hebben een inline style", () => {
    const verwacht = Object.fromEntries(
      Object.entries(UITZONDERINGEN).map(([pad, { aantal }]) => [pad, aantal]),
    );
    expect(gevonden, "zet nieuwe opmaak in app/admin/admin.css, niet in de JSX").toEqual(verwacht);
  });

  it("elke uitzondering heeft een reden", () => {
    for (const { waarom } of Object.values(UITZONDERINGEN)) {
      expect(waarom.length).toBeGreaterThan(10);
    }
  });
});
