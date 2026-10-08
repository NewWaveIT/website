import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

/**
 * De changelog en het versienummer lopen niet uit de pas.
 *
 * Aanleiding: een changelog die je met de hand bijhoudt wordt precies één keer
 * vergeten en is daarna niet meer te vertrouwen -- hetzelfde patroon als de
 * handgeschreven routekaart in `revalidate.ts`, die wegdreef omdat niets hem
 * tegenhield. Deze test houdt de twee aan elkaar vast: wie `version` bumpt moet
 * een regel schrijven, en wie een regel schrijft moet bumpen.
 *
 * Wat hij niet controleert: of het gekozen niveau (major/minor/patch) klopt.
 * Dat is een inhoudelijk oordeel; de tabel in CLAUDE.md is daar de maat.
 */

const KOP = /^## (\d+)\.(\d+)\.(\d+) — (.+)$/gm;

type Versie = { tekst: string; delen: [number, number, number]; datum: string };

function versiesUitChangelog(): Versie[] {
  const changelog = readFileSync("CHANGELOG.md", "utf8");
  return [...changelog.matchAll(KOP)].map((m) => ({
    tekst: `${m[1]}.${m[2]}.${m[3]}`,
    delen: [Number(m[1]), Number(m[2]), Number(m[3])],
    datum: m[4]!.trim(),
  }));
}

describe("changelog", () => {
  const versies = versiesUitChangelog();

  it("heeft minstens één versiekop in de verwachte vorm", () => {
    expect(versies.length, 'een kop ziet eruit als "## 1.2.3 — 8 oktober 2026"').toBeGreaterThan(0);
  });

  it("de bovenste versie is die in package.json", () => {
    const pkg = JSON.parse(readFileSync("package.json", "utf8")) as { version?: string };
    expect(
      versies[0]!.tekst,
      "bump package.json's version, of schrijf een regel in CHANGELOG.md -- niet één van beide",
    ).toBe(pkg.version);
  });

  it("staat op volgorde, nieuwste bovenaan", () => {
    for (let i = 1; i < versies.length; i++) {
      const nieuwer = versies[i - 1]!;
      const ouder = versies[i]!;
      const hoger =
        nieuwer.delen[0] !== ouder.delen[0]
          ? nieuwer.delen[0] > ouder.delen[0]
          : nieuwer.delen[1] !== ouder.delen[1]
            ? nieuwer.delen[1] > ouder.delen[1]
            : nieuwer.delen[2] > ouder.delen[2];
      expect(hoger, `${nieuwer.tekst} staat boven ${ouder.tekst}`).toBe(true);
    }
  });

  it("elke versie heeft een datum achter het streepje", () => {
    expect(
      versies.filter((v) => v.datum === "").map((v) => v.tekst),
      "zonder datum is de volgorde het enige houvast",
    ).toEqual([]);
  });
});
