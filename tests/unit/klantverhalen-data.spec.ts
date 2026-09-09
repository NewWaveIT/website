import { beforeEach, describe, expect, it, vi } from "vitest";
import { zonder } from "./helpers/cms-rij";

/**
 * Klantverhalen leest via het gedeelde pad (`leesRijen`). De regels daarvan:
 * de CMS-rij is de waarheid, een leeg opgeslagen veld blijft leeg, een veld dat
 * de rij niet noemt of niet geldig kan leveren komt uit de seed, en een rij die
 * zo nóg niet compleet is valt weg in plaats van half te renderen.
 */

const { state, getPublishedContent } = vi.hoisted(() => {
  const state: { rows: Record<string, unknown>[] } = { rows: [] };
  return { state, getPublishedContent: vi.fn(async () => state.rows) };
});

vi.mock("@/lib/cms/content", () => ({
  getPublishedContent,
  fotoWebp: (s: string | null | undefined) => s ?? "",
}));

const { getKlantverhalen, getKlantverhaalBySlug } = await import("@/lib/klantverhalen-data");
const { KLANTVERHAAL_MAP } = await import("@/lib/klantverhalen");

const seed = KLANTVERHAAL_MAP.moove!;

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

/** Een dunne rij zoals er op productie stonden: alleen de oude basisvelden. */
function dunneRij(slug = "moove", data: Record<string, unknown> = {}) {
  return rij(slug, "Moove", { intro: "Korte CMS-intro.", ...data });
}

/** Een complete rij, zoals de admin hem na een gewone opslag wegschrijft. */
function heleRij(slug = "moove", extra: Record<string, unknown> = {}) {
  return rij(slug, seed.cardTitel, { ...zonder(seed, "slug"), ...extra });
}

beforeEach(() => {
  state.rows = [];
  getPublishedContent.mockClear();
  vi.spyOn(console, "error").mockImplementation(() => {});
  vi.spyOn(console, "warn").mockImplementation(() => {});
});

describe("getKlantverhaalBySlug", () => {
  it("valt zonder CMS-rijen terug op de seed", async () => {
    const k = await getKlantverhaalBySlug("moove");
    expect(k?.secties?.length).toBe(seed.secties?.length);
    expect(k?.ketenStappen?.length).toBeGreaterThan(0);
  });

  it("laat een seed-item dat niet in het CMS staat verdwijnen", async () => {
    // De admin is de waarheid: zodra er rijen zijn, telt alleen wat daar staat.
    // Een verwijderd klantverhaal komt niet terug uit de seed.
    state.rows = [heleRij("andere-case", { cardTitel: "Andere case" })];
    expect(await getKlantverhaalBySlug("moove")).toBeNull();
    expect((await getKlantverhalen()).map((k) => k.slug)).toEqual(["andere-case"]);
  });

  it("geeft null voor een slug die nergens bestaat", async () => {
    state.rows = [heleRij()];
    expect(await getKlantverhaalBySlug("bestaat-niet")).toBeNull();
  });
});

describe("dunne rij", () => {
  it("wint met wat hij zegt en leent de rest uit de seed", async () => {
    state.rows = [dunneRij()];
    const k = await getKlantverhaalBySlug("moove");

    expect(k?.intro).toBe("Korte CMS-intro.");
    expect(k?.impact.length).toBe(seed.impact.length);
    expect(k?.quote).toBe(seed.quote);
    expect(k?.aside).toEqual(seed.aside);
  });

  /**
   * Regressie: een rij van vóór de verrijking noemt de optionele structuur
   * helemaal niet. Die dan als "bewust leeg" lezen wiste op productie het halve
   * klantverhaal — niet genoemd is geen uitspraak van de redacteur.
   */
  it("houdt keten, secties en eindresultaten uit de seed", async () => {
    state.rows = [dunneRij()];
    const k = await getKlantverhaalBySlug("moove");

    expect(k?.ketenTitel).toBe(seed.ketenTitel);
    expect(k?.ketenStappen?.length).toBe(seed.ketenStappen?.length);
    expect(k?.secties?.length).toBe(seed.secties?.length);
    expect(k?.eindresultaten?.length).toBe(seed.eindresultaten?.length);
  });
});

describe("hele rij", () => {
  it("laat een bewust leeggemaakt veld ook leeg", async () => {
    state.rows = [heleRij("moove", { quote: "" })];
    expect((await getKlantverhaalBySlug("moove"))?.quote).toBe("");
  });

  it("laat eigen secties winnen van de seed", async () => {
    const eigen = [
      {
        titel: "Eigen sectie",
        situatie: "Eigen situatie",
        aanpak: "Eigen aanpak",
        resultaten: [{ titel: "Eén kaart", tekst: "…" }],
      },
    ];
    state.rows = [heleRij("moove", { secties: eigen })];
    expect((await getKlantverhaalBySlug("moove"))?.secties).toEqual(eigen);
  });

  it("herstelt één ongeldig veld en laat de rest van de rij staan", async () => {
    // Secties in de oude vorm: koppen zonder situatie, aanpak of resultaten.
    state.rows = [
      heleRij("moove", {
        secties: seed.secties!.map((s) => ({ titel: s.titel, tekst: "" })),
        intro: "Eigen intro.",
      }),
    ];
    const k = await getKlantverhaalBySlug("moove");

    expect(k?.secties).toEqual(seed.secties);
    expect(k?.intro).toBe("Eigen intro.");
  });
});

describe("getKlantverhalen", () => {
  it("slaat een rij over die niet geldig te krijgen is", async () => {
    // Zelf aangemaakte slug (geen seed) met alleen een intro.
    state.rows = [dunneRij("eigen-case")];
    expect(await getKlantverhalen()).toEqual([]);
    expect(await getKlantverhaalBySlug("eigen-case")).toBeNull();
  });

  it("leidt tag af van de sector als hij niet apart is ingevuld", async () => {
    state.rows = [heleRij("moove", { tag: "", sector: "Mobiliteit" })];
    expect((await getKlantverhalen())[0]?.tag).toBe("Mobiliteit");
  });
});
