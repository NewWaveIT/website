import { beforeEach, describe, expect, it, vi } from "vitest";
import { z } from "zod";

/**
 * `maakLezer` is sinds deze opzet het enige leespad van de site. De regel die
 * hij afdwingt: de admin is de waarheid, de seed is een koude start. Deze test
 * bewaakt dat onderscheid, want het is precies wat eerder per contenttype uit
 * elkaar liep.
 */

const { state, getPublishedContent } = vi.hoisted(() => {
  const state: { rows: Record<string, unknown>[] } = { rows: [] };
  return { state, getPublishedContent: vi.fn(async () => state.rows) };
});
vi.mock("@/lib/cms/content", () => ({ getPublishedContent }));

const { maakLezer } = await import("@/lib/cms/lees");

interface Ding {
  slug: string;
  titel: string;
  nummer: number;
}

const schema = z.object({ slug: z.string(), titel: z.string(), nummer: z.number() });
const SEED: Ding[] = [
  { slug: "een", titel: "Eén", nummer: 1 },
  { slug: "twee", titel: "Twee", nummer: 2 },
];

function rij(slug: string, titel: string, data: Record<string, unknown> = {}) {
  return {
    id: slug,
    slug,
    titel,
    status: "live",
    volgorde: 0,
    bijgewerkt_op: "",
    bewerkt_door: null,
    data: { titel, nummer: 9, ...data },
  };
}

// `proposities` als drager: die bouwer neemt slug en titel uit de kolommen.
const maak = (extra: Partial<Parameters<typeof maakLezer<Ding>>[0]> = {}) =>
  maakLezer<Ding>({ type: "proposities", schema, seed: SEED, ...extra });

beforeEach(() => {
  state.rows = [];
  getPublishedContent.mockClear();
  vi.spyOn(console, "error").mockImplementation(() => {});
});

describe("koude start", () => {
  it("toont de seed als de tabel leeg is", async () => {
    expect((await maak().alle()).map((d) => d.slug)).toEqual(["een", "twee"]);
  });

  it("vindt een seed-item op slug als de tabel leeg is", async () => {
    expect((await maak().bijSlug("twee"))?.titel).toBe("Twee");
  });
});

describe("de admin is de waarheid", () => {
  it("toont alleen wat in het CMS staat zodra er rijen zijn", async () => {
    state.rows = [rij("drie", "Drie")];
    expect((await maak().alle()).map((d) => d.slug)).toEqual(["drie"]);
  });

  /** De kern van de regel: een verwijderde rij komt niet terug uit de seed. */
  it("laat een seed-item dat niet in het CMS staat verdwijnen", async () => {
    state.rows = [rij("drie", "Drie")];
    expect(await maak().bijSlug("een")).toBeNull();
  });

  it("laat de CMS-waarde winnen van de seed", async () => {
    state.rows = [rij("een", "Andere titel")];
    expect((await maak().bijSlug("een"))?.titel).toBe("Andere titel");
  });
});

describe("verrijk en sorteer", () => {
  it("past verrijk toe op zowel de seed als het CMS", async () => {
    const lezer = maak({ verrijk: (d) => ({ ...d, titel: d.titel.toUpperCase() }) });
    expect((await lezer.alle())[0]?.titel).toBe("EÉN");

    state.rows = [rij("drie", "Drie")];
    expect((await lezer.alle())[0]?.titel).toBe("DRIE");
  });

  it("sorteert wat het CMS teruggeeft", async () => {
    const lezer = maak({ sorteer: (a, b) => a.nummer - b.nummer });
    state.rows = [rij("hoog", "Hoog", { nummer: 5 }), rij("laag", "Laag", { nummer: 2 })];
    expect((await lezer.alle()).map((d) => d.nummer)).toEqual([2, 5]);
  });

  it("laat de databasevolgorde staan zonder sorteerfunctie", async () => {
    state.rows = [rij("b", "B", { nummer: 5 }), rij("a", "A", { nummer: 2 })];
    expect((await maak().alle()).map((d) => d.slug)).toEqual(["b", "a"]);
  });
});

describe("onbruikbare rijen", () => {
  it("slaat een rij over die niet geldig te krijgen is", async () => {
    state.rows = [rij("eigen", "Eigen", { nummer: "geen getal" })];
    expect(await maak().alle()).toEqual([]);
  });

  it("repareert een ongeldig veld met de seed van dezelfde slug", async () => {
    state.rows = [rij("een", "Eén", { nummer: "geen getal" })];
    expect((await maak().bijSlug("een"))?.nummer).toBe(1);
  });
});
