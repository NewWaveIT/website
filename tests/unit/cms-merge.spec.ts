import { beforeEach, describe, expect, it, vi } from "vitest";
import { z } from "zod";
import { leesRij } from "@/lib/cms/merge";

/**
 * Het leespad kent drie soorten uitspraken van een CMS-rij, en het verschil
 * daartussen is waar alle lege-content-bugs vandaan kwamen:
 *
 *  - sleutel afwezig   → de rij is ouder dan het veld; de seed vult aan
 *  - sleutel leeg      → de redacteur heeft hem leeggemaakt; leeg is echt leeg
 *  - sleutel ongeldig  → onbruikbaar; de seed is het vangnet, mét melding
 */

const schema = z.object({
  titel: z.string(),
  punten: z.array(z.string()),
  ondertitel: z.string().optional(),
  kaarten: z.array(z.object({ titel: z.string(), tekst: z.string() })).optional(),
});

const seed = {
  titel: "Seed-titel",
  punten: ["een", "twee"],
  ondertitel: "Seed-ondertitel",
  kaarten: [{ titel: "Seed-kaart", tekst: "…" }],
};

beforeEach(() => {
  vi.spyOn(console, "error").mockImplementation(() => {});
});

describe("leesRij", () => {
  it("laat een complete rij ongemoeid", () => {
    const ruw = { titel: "Eigen", punten: ["a"], ondertitel: "Eigen sub", kaarten: [] };
    const { waarde, fouten } = leesRij(schema, ruw, seed);
    expect(waarde).toEqual(ruw);
    expect(fouten).toEqual([]);
  });

  it("vult een ontbrekend verplicht veld aan uit de seed, zonder melding", () => {
    const { waarde, fouten } = leesRij(schema, { punten: ["a"] }, seed);
    expect(waarde?.titel).toBe("Seed-titel");
    expect(fouten).toEqual([]);
  });

  it("vult ook een ontbrekend optioneel veld aan uit de seed", () => {
    const { waarde } = leesRij(schema, { titel: "Eigen", punten: [] }, seed);
    expect(waarde?.ondertitel).toBe("Seed-ondertitel");
    expect(waarde?.kaarten).toEqual(seed.kaarten);
  });

  it("laat een bewust leeggemaakt veld leeg, ook als de seed gevuld is", () => {
    const ruw = { titel: "", punten: [], ondertitel: "", kaarten: [] };
    const { waarde } = leesRij(schema, ruw, seed);
    expect(waarde).toEqual(ruw);
  });

  it("herstelt één ongeldig veld uit de seed en meldt dat", () => {
    const { waarde, fouten } = leesRij(
      schema,
      { titel: "Eigen", punten: "geen lijst", ondertitel: "", kaarten: [] },
      seed,
    );
    expect(waarde?.punten).toEqual(seed.punten);
    expect(waarde?.titel).toBe("Eigen");
    expect(waarde?.ondertitel).toBe("");
    expect(fouten.map((f) => f.veld)).toEqual(["punten"]);
  });

  it("geeft null als een verplicht veld ontbreekt en er geen seed is", () => {
    const { waarde, fouten } = leesRij(schema, { titel: "Eigen" }, undefined);
    expect(waarde).toBeNull();
    expect(fouten.map((f) => f.veld)).toEqual(["punten"]);
  });

  it("geeft null als de seed het ongeldige veld ook niet kan repareren", () => {
    const { waarde } = leesRij(schema, { titel: "Eigen", punten: 42 }, { titel: "Seed-titel" });
    expect(waarde).toBeNull();
  });

  it("negeert sleutels die het schema niet kent", () => {
    const { waarde } = leesRij(schema, { titel: "Eigen", punten: [], oudVeld: "rest" }, seed);
    expect(waarde).not.toHaveProperty("oudVeld");
    expect(waarde?.titel).toBe("Eigen");
  });
});
