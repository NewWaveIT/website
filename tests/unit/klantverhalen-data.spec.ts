import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Regressietest: een cms_cases-rij mag de rijkere seed-content niet weggooien.
 * De keten-stappen, de secties per app en de eindresultaten zitten (nog) niet in
 * FIELD_SCHEMAS.cases, dus zonder merge over de seed verdween die content zodra
 * er een CMS-rij bestond — precies wat er op productie gebeurde.
 */

const { state, getPublishedContent } = vi.hoisted(() => {
  const state: { rows: Record<string, unknown>[] } = { rows: [] };
  return { state, getPublishedContent: vi.fn(async () => state.rows) };
});

vi.mock("@/lib/cms/content", () => ({
  getPublishedContent,
  fotoWebp: (s: string | null | undefined) => s ?? "",
}));

const { getKlantverhaalBySlug } = await import("@/lib/klantverhalen-data");
const { KLANTVERHAAL_MAP } = await import("@/lib/klantverhalen");

/** Een dunne CMS-rij zoals die op productie stond: alleen de oude basisvelden. */
function dunneRij(slug: string, data: Record<string, unknown> = {}) {
  return {
    id: slug,
    slug,
    titel: "Moove",
    status: "live",
    volgorde: 0,
    bijgewerkt_op: "",
    bewerkt_door: null,
    data: { intro: "Korte CMS-intro.", ...data },
  };
}

beforeEach(() => {
  state.rows = [];
  getPublishedContent.mockClear();
});

describe("getKlantverhaalBySlug", () => {
  it("valt zonder CMS-rijen terug op de seed", async () => {
    const k = await getKlantverhaalBySlug("moove");
    expect(k?.secties?.length).toBe(KLANTVERHAAL_MAP.moove?.secties?.length);
    expect(k?.ketenStappen?.length).toBeGreaterThan(0);
  });

  it("houdt keten, secties en eindresultaten uit de seed bij een dunne CMS-rij", async () => {
    state.rows = [dunneRij("moove")];
    const k = await getKlantverhaalBySlug("moove");
    const seed = KLANTVERHAAL_MAP.moove;

    // CMS wint waar hij iets zegt…
    expect(k?.intro).toBe("Korte CMS-intro.");
    // …maar de rijke structuur blijft staan.
    expect(k?.ketenStappen?.length).toBe(seed?.ketenStappen?.length);
    expect(k?.ketenTitel).toBe(seed?.ketenTitel);
    expect(k?.secties?.length).toBe(seed?.secties?.length);
    expect(k?.eindresultaten?.length).toBe(seed?.eindresultaten?.length);
    expect(k?.impact.length).toBe(seed?.impact.length);
    expect(k?.quote).toBe(seed?.quote);
  });

  it("laat het CMS de structuurvelden wel overschrijven", async () => {
    state.rows = [
      dunneRij("moove", {
        ketenStappen: [{ label: "01", titel: "Alleen deze stap" }],
        eindresultaten: [{ titel: "Eén kaart", tekst: "…" }],
      }),
    ];
    const k = await getKlantverhaalBySlug("moove");
    expect(k?.ketenStappen).toEqual([{ label: "01", titel: "Alleen deze stap" }]);
    expect(k?.eindresultaten).toEqual([{ titel: "Eén kaart", tekst: "…" }]);
  });

  it("geeft null voor een slug die niet in het CMS staat", async () => {
    state.rows = [dunneRij("moove")];
    expect(await getKlantverhaalBySlug("bestaat-niet")).toBeNull();
  });
});

/**
 * Een rij die vóór de verrijking is geseed heeft wél een `secties`-array, maar
 * in de oude vorm. Die array in zijn geheel overnemen gaf op productie lege
 * koppen ("Situatie & uitdaging" zonder tekst) en lege resultaatkaarten.
 */
describe("secties uit een rij van vóór de modelwijziging", () => {
  it("vult situatie en aanpak aan vanuit de seed", async () => {
    const seed = KLANTVERHAAL_MAP.moove!;
    state.rows = [
      dunneRij("moove", {
        secties: seed.secties!.map((s) => ({ titel: s.titel, tekst: "" })),
      }),
    ];

    const k = await getKlantverhaalBySlug("moove");
    expect(k?.secties?.length).toBe(seed.secties!.length);
    expect(k?.secties?.[0]?.situatie).toBe(seed.secties![0]!.situatie);
    expect(k?.secties?.[0]?.aanpak).toBe(seed.secties![0]!.aanpak);
    expect(k?.secties?.[0]?.resultaten.length).toBe(seed.secties![0]!.resultaten.length);
  });

  it("maakt van losse resultaat-strings echte kaarten", async () => {
    state.rows = [
      dunneRij("moove", {
        secties: [{ titel: "Eigen sectie", resultaten: ["Minder handmatig werk"] }],
      }),
    ];

    const k = await getKlantverhaalBySlug("moove");
    expect(k?.secties?.[0]?.resultaten).toEqual([{ titel: "", tekst: "Minder handmatig werk" }]);
  });

  it("laat ingevulde CMS-waarden winnen van de seed", async () => {
    state.rows = [
      dunneRij("moove", {
        secties: [{ titel: "Eigen sectie", situatie: "Eigen situatie", aanpak: "Eigen aanpak" }],
      }),
    ];

    const k = await getKlantverhaalBySlug("moove");
    expect(k?.secties?.[0]?.situatie).toBe("Eigen situatie");
    expect(k?.secties?.[0]?.aanpak).toBe("Eigen aanpak");
  });
});
