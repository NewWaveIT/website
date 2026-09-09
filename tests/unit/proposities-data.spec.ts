import { beforeEach, describe, expect, it, vi } from "vitest";
import { zonder } from "./helpers/cms-rij";

/**
 * Proposities is het sjabloon voor het gedeelde leespad: CMS-rij is de waarheid,
 * de seed vangt alleen ongeldige of ontbrekende velden op, en een rij die niet
 * geldig te krijgen is valt weg in plaats van half te renderen.
 */

const { state, getPublishedContent } = vi.hoisted(() => {
  const state: { rows: Record<string, unknown>[] } = { rows: [] };
  return { state, getPublishedContent: vi.fn(async () => state.rows) };
});

vi.mock("@/lib/cms/content", () => ({ getPublishedContent }));

const { getProposities, getPropositiesVoorSector } = await import("@/lib/proposities-data");
const { PROPOSITIES } = await import("@/lib/proposities");

const eerste = PROPOSITIES[0]!;

function rij(slug: string, titel: string, data: Record<string, unknown>) {
  return {
    id: slug,
    slug,
    titel,
    status: "live",
    volgorde: 0,
    bijgewerkt_op: "",
    bewerkt_door: null,
    data,
  };
}

/** Een complete rij, zoals de admin hem na een gewone opslag wegschrijft. */
function heleRij(slug = eerste.slug, extra: Record<string, unknown> = {}) {
  return rij(slug, eerste.titel, { ...zonder(eerste, "slug", "titel"), ...extra });
}

beforeEach(() => {
  state.rows = [];
  getPublishedContent.mockClear();
  vi.spyOn(console, "error").mockImplementation(() => {});
});

describe("getProposities", () => {
  it("valt op de seed terug als er geen rijen zijn", async () => {
    expect(await getProposities()).toEqual(PROPOSITIES);
  });

  it("laat de CMS-rij winnen, inclusief een bewust leeggemaakt veld", async () => {
    state.rows = [heleRij(eerste.slug, { belofte: "" })];
    const [p] = await getProposities();
    expect(p?.belofte).toBe("");
  });

  it("vult een ontbrekend veld aan uit de seed", async () => {
    state.rows = [rij(eerste.slug, eerste.titel, zonder(eerste, "slug", "titel", "belofte"))];
    const [p] = await getProposities();
    expect(p?.belofte).toBe(eerste.belofte);
  });

  it("herstelt één ongeldig veld en laat de rest van de rij staan", async () => {
    state.rows = [heleRij(eerste.slug, { wat: "geen array", hoe: ["Eigen tekst"] })];
    const [p] = await getProposities();
    expect(p?.wat).toEqual(eerste.wat);
    expect(p?.hoe).toEqual(["Eigen tekst"]);
  });

  it("slaat een rij over die niet geldig te krijgen is", async () => {
    // Zelf aangemaakte slug (geen seed) met een ontbrekend verplicht veld.
    state.rows = [rij("eigen-propositie", "Eigen", { nummer: 9 })];
    expect(await getProposities()).toEqual([]);
  });

  it("sorteert op nummer", async () => {
    state.rows = [heleRij(eerste.slug, { nummer: 3 }), heleRij("tweede", { nummer: 1 })];
    expect((await getProposities()).map((p) => p.nummer)).toEqual([1, 3]);
  });
});

describe("getPropositiesVoorSector", () => {
  it("geeft alles zonder selectie en respecteert de opgegeven volgorde", async () => {
    expect(await getPropositiesVoorSector()).toHaveLength(PROPOSITIES.length);
    const twee = [PROPOSITIES[1]!.slug, PROPOSITIES[0]!.slug];
    expect((await getPropositiesVoorSector(twee)).map((p) => p.slug)).toEqual(twee);
  });
});
