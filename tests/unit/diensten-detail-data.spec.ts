import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Het contenttype `diensten` beschrijft de drie richtingen (mendix/ai/strategie)
 * die elk een eigen statische hub-pagina hebben. De negen boekbare diensten
 * staan in `services` en hebben hun eigen pagina onder /diensten/<dienst>.
 *
 * Deze test bewaakt dat de datalaag alléén de drie richtingen bedient: rijen die
 * nog uit het vorige ontwerp stammen (toen dit type de dienstdetailpagina's
 * voedde) mogen niet meer renderen.
 */

const { state, getPublishedContent } = vi.hoisted(() => {
  const state: { rows: Record<string, unknown>[] } = { rows: [] };
  return { state, getPublishedContent: vi.fn(async () => state.rows) };
});

vi.mock("@/lib/cms/content", () => ({ getPublishedContent }));

const { getRichtingBySlug, getRichtingSlugs } = await import("@/lib/diensten-detail-data");
const { RICHTING_SLUGS } = await import("@/lib/diensten-detail");

function rij(slug: string, data: Record<string, unknown> = {}) {
  return {
    id: slug,
    slug,
    titel: "",
    status: "live",
    volgorde: 0,
    bijgewerkt_op: "",
    bewerkt_door: null,
    data,
  };
}

beforeEach(() => {
  state.rows = [];
  getPublishedContent.mockClear();
});

describe("getRichtingSlugs", () => {
  it("geeft precies de drie richtingen", async () => {
    expect((await getRichtingSlugs()).sort()).toEqual([...RICHTING_SLUGS].sort());
  });

  it("blijft bij die drie, ook als het CMS andere rijen bevat", async () => {
    state.rows = [rij("it-strategie"), rij("consultant-inhuren")];
    expect(await getRichtingSlugs()).toEqual([...RICHTING_SLUGS]);
  });
});

describe("getRichtingBySlug", () => {
  it("geeft de seed-content van een richting", async () => {
    const r = await getRichtingBySlug("mendix");
    expect(r?.naam).toBe("Mendix");
    expect(r?.vraagstukken.length).toBeGreaterThan(0);
    expect(r?.pijlers.length).toBeGreaterThan(0);
  });

  it("laat een CMS-rij per veld over de seed heen winnen", async () => {
    state.rows = [rij("mendix", { h1: "Nieuwe kop" })];
    const r = await getRichtingBySlug("mendix");
    expect(r?.h1).toBe("Nieuwe kop");
    // Niet aangeraakte velden blijven uit de seed komen.
    expect(r?.vraagstukken.length).toBeGreaterThan(0);
  });

  it("geeft null voor een dienst-slug: die heeft een eigen pagina uit de catalogus", async () => {
    expect(await getRichtingBySlug("it-strategie")).toBeNull();
    state.rows = [rij("it-strategie", { h1: "Oude CMS-inhoud" })];
    expect(await getRichtingBySlug("it-strategie")).toBeNull();
  });

  it("geeft null voor een onbekende slug", async () => {
    expect(await getRichtingBySlug("bestaat-niet")).toBeNull();
  });
});
