import { beforeEach, describe, expect, it, vi } from "vitest";
import { zonder } from "./helpers/cms-rij";

const { state, getPublishedContent } = vi.hoisted(() => {
  const state: { rows: Record<string, unknown>[] } = { rows: [] };
  return { state, getPublishedContent: vi.fn(async () => state.rows) };
});

vi.mock("@/lib/cms/content", () => ({ getPublishedContent }));

const { getSectorBySlug, getSectorSlugs, getSectoren } = await import("@/lib/sectoren-detail-data");
const { SECTOREN, SECTOR_SLUGS } = await import("@/lib/sectoren-detail");

const eerste = SECTOREN[SECTOR_SLUGS[0]!]!;

function rij(slug: string, data: Record<string, unknown>) {
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

function heleRij(slug = eerste.slug, extra: Record<string, unknown> = {}) {
  return rij(slug, { ...zonder(eerste, "slug"), ...extra });
}

beforeEach(() => {
  state.rows = [];
  getPublishedContent.mockClear();
  vi.spyOn(console, "error").mockImplementation(() => {});
});

describe("getSectorBySlug", () => {
  it("valt zonder rijen terug op de seed", async () => {
    expect((await getSectorBySlug(eerste.slug))?.h1).toBe(eerste.h1);
  });

  it("laat de CMS-rij winnen", async () => {
    state.rows = [heleRij(eerste.slug, { h1: "Eigen kop" })];
    expect((await getSectorBySlug(eerste.slug))?.h1).toBe("Eigen kop");
  });

  it("valt per slug terug als er alleen ándere rijen zijn", async () => {
    state.rows = [heleRij(SECTOR_SLUGS[1]!)];
    expect((await getSectorBySlug(eerste.slug))?.h1).toBe(eerste.h1);
  });

  it("geeft null voor een slug die nergens bestaat", async () => {
    expect(await getSectorBySlug("bestaat-niet")).toBeNull();
  });
});

describe("getSectorSlugs", () => {
  it("voegt zelf aangemaakte sectoren toe zonder de seed te verliezen", async () => {
    state.rows = [heleRij("eigen-sector")];
    const slugs = await getSectorSlugs();
    expect(slugs).toContain("eigen-sector");
    for (const s of SECTOR_SLUGS) expect(slugs).toContain(s);
  });
});

describe("getSectoren", () => {
  it("levert alle sectoren voor de sectorkoppeling op de richting-hubs", async () => {
    expect((await getSectoren()).map((s) => s.slug)).toEqual(SECTOR_SLUGS);
  });
});
