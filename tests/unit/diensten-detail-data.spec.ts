import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * De routing-guard: /diensten/mendix, /ai en /strategie zijn sinds de
 * dienstencatalogus lichte hub-pagina's met hun eigen routebestand. De
 * dynamische route [slug] mag die paden daarom niet nóg eens aanleveren — ook
 * niet als er in cms_diensten nog oude rijen voor die slugs staan. Zonder deze
 * filter prerendert Next hetzelfde pad twee keer.
 */

const { state, getPublishedContent } = vi.hoisted(() => {
  const state: { rows: Record<string, unknown>[] } = { rows: [] };
  return { state, getPublishedContent: vi.fn(async () => state.rows) };
});

vi.mock("@/lib/cms/content", () => ({ getPublishedContent }));

const { getDienstBySlug, getDienstSlugs } = await import("@/lib/diensten-detail-data");
const { DIENST_SLUGS, RICHTING_SLUGS } = await import("@/lib/diensten-detail");

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

describe("getDienstSlugs", () => {
  it("geeft de drie dienstdetailpagina's uit de seed", async () => {
    expect((await getDienstSlugs()).sort()).toEqual([...DIENST_SLUGS].sort());
  });

  it("filtert de richting-slugs, ook als het CMS ze nog bevat", async () => {
    state.rows = RICHTING_SLUGS.map((s) => rij(s));
    const slugs = await getDienstSlugs();
    for (const richting of RICHTING_SLUGS) {
      expect(slugs).not.toContain(richting);
    }
  });

  it("neemt een nieuwe CMS-slug wel mee", async () => {
    state.rows = [rij("nieuwe-dienst")];
    expect(await getDienstSlugs()).toContain("nieuwe-dienst");
  });
});

describe("getDienstBySlug", () => {
  it("geeft null voor een richting-slug, zodat [slug] die nooit rendert", async () => {
    for (const richting of RICHTING_SLUGS) {
      expect(await getDienstBySlug(richting)).toBeNull();
      state.rows = [rij(richting, { h1: "Oude CMS-inhoud" })];
      expect(await getDienstBySlug(richting)).toBeNull();
      state.rows = [];
    }
  });

  it("geeft de seed-content voor een dienstdetailpagina", async () => {
    const d = await getDienstBySlug("it-strategie");
    expect(d?.naam).toBe("IT-strategie op low-code en AI");
    expect(d?.serviceSlug).toBe("it-strategie");
    expect(d?.heroTheme).toBe("strategie");
    expect(d?.waarborg).toBeTruthy();
  });

  it("laat een CMS-rij over de seed heen winnen, per veld", async () => {
    state.rows = [rij("it-strategie", { h1: "Nieuwe kop" })];
    const d = await getDienstBySlug("it-strategie");
    expect(d?.h1).toBe("Nieuwe kop");
    // Niet aangeraakte velden blijven uit de seed komen.
    expect(d?.vraagstukken.length).toBeGreaterThan(0);
    expect(d?.serviceSlug).toBe("it-strategie");
  });

  it("geeft null voor een onbekende slug", async () => {
    expect(await getDienstBySlug("bestaat-niet")).toBeNull();
  });
});
