import { beforeEach, describe, expect, it, vi } from "vitest";
import { zonder } from "./helpers/cms-rij";

const { state, getPublishedContent } = vi.hoisted(() => {
  const state: { rows: Record<string, unknown>[] } = { rows: [] };
  return { state, getPublishedContent: vi.fn(async () => state.rows) };
});

vi.mock("@/lib/cms/content", () => ({ getPublishedContent }));

const { getSectorBySlug, getSectorSlugs, getSectoren, getSectorKaarten } =
  await import("@/lib/sectoren-detail-data");
const { SECTOREN, SECTOR_SLUGS, SECTOR_VOLGORDE } = await import("@/lib/sectoren-detail");
const { SECTOR_ICONEN } = await import("@/components/sector-iconen");

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

  it("toont een sector niet meer zodra hij uit het CMS is", async () => {
    state.rows = [heleRij(SECTOR_SLUGS[1]!)];
    expect(await getSectorBySlug(eerste.slug)).toBeNull();
  });

  it("geeft null voor een slug die nergens bestaat", async () => {
    expect(await getSectorBySlug("bestaat-niet")).toBeNull();
  });
});

describe("getSectorSlugs", () => {
  it("volgt het CMS, zodat er niets wordt voorgerenderd wat niet bestaat", async () => {
    state.rows = [heleRij("eigen-sector")];
    expect(await getSectorSlugs()).toEqual(["eigen-sector"]);
  });

  it("gebruikt de seed als koude start, met een lege tabel", async () => {
    expect(await getSectorSlugs()).toEqual([...SECTOR_SLUGS]);
  });
});

describe("getSectoren", () => {
  it("levert alle sectoren voor de sectorkoppeling op de richting-hubs", async () => {
    expect((await getSectoren()).map((s) => s.slug)).toEqual(SECTOR_SLUGS);
  });
});

/**
 * De sectorkaart is de enige bron voor de homepage, /sectoren en
 * /klantverhalen. Hiervoor stond dezelfde pitch in vier versies op vier plekken;
 * deze tests houden dat zo.
 */
describe("getSectorKaarten", () => {
  it("levert alle sectoren in de vastgelegde volgorde", async () => {
    const kaarten = await getSectorKaarten();
    expect(kaarten.map((k) => k.slug)).toEqual([...SECTOR_VOLGORDE]);
  });

  it("noemt elke sector uit de seed precies één keer", () => {
    expect([...SECTOR_VOLGORDE].sort()).toEqual([...SECTOR_SLUGS].sort());
  });

  it("neemt naam, pitch en label uit het CMS over", async () => {
    state.rows = [
      heleRij(eerste.slug, { naam: "Anders", pitch: "Andere pitch.", kpiLabel: "Kort" }),
    ];
    const kaart = (await getSectorKaarten()).find((k) => k.slug === eerste.slug);
    expect(kaart).toMatchObject({ naam: "Anders", pitch: "Andere pitch.", kpiLabel: "Kort" });
  });

  it("laat een sector weg die niet in de volgorde staat", async () => {
    state.rows = [heleRij("een-onbekende-sector")];
    const kaarten = await getSectorKaarten();
    expect(kaarten.map((k) => k.slug)).not.toContain("een-onbekende-sector");
  });

  it("verwijst naar een icoon dat bestaat", async () => {
    for (const k of await getSectorKaarten()) {
      expect(SECTOR_ICONEN[k.icon], `${k.slug} → ${k.icon}`).toBeTruthy();
    }
  });
});

/**
 * Het schema laat een lege string toe — dat is bewust, want een redacteur mag
 * een veld leegmaken. De seed is de koude start en moet dus wél compleet zijn.
 */
describe("de seed vult de overzichtsvelden", () => {
  for (const slug of SECTOR_SLUGS) {
    it(slug, () => {
      const s = SECTOREN[slug]!;
      expect(s.hook.trim()).not.toBe("");
      expect(s.pitch.trim()).not.toBe("");
      expect(s.kpiLabel.trim()).not.toBe("");
      // De kaart op de homepage is ~90 tekens breed; daarboven breekt de layout.
      expect(s.pitch.length, `pitch van ${slug} is ${s.pitch.length} tekens`).toBeLessThanOrEqual(
        115,
      );
    });
  }
});
