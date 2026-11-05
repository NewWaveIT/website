import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Vacatures is het enige contenttype met een lege seed: bij livegang staan er
 * geen rollen open. Dat maakt hem ook de test van "leeg is echt leeg" op
 * typeniveau — zonder rijen hoort de site niets te tonen in plaats van terug te
 * vallen op oude tekst. Zie de toelichting in lib/vacatures.ts.
 */

const { state, getPublishedContent } = vi.hoisted(() => {
  const state: { rows: Record<string, unknown>[] } = { rows: [] };
  return { state, getPublishedContent: vi.fn(async () => state.rows) };
});

vi.mock("@/lib/cms/content", () => ({
  getPublishedContent,
  fotoWebp: (s: string | null | undefined) => s ?? "",
}));

const { getVacatures, getVacatureBySlug } = await import("@/lib/vacatures-data");
const { VACATURES } = await import("@/lib/vacatures");

function rij(slug: string, titel: string, data: Record<string, unknown> = {}) {
  return {
    id: slug,
    slug,
    titel,
    status: "live",
    volgorde: 0,
    bijgewerkt_op: "",
    bewerkt_door: null,
    data: {
      functietitel: titel,
      discipline: "Mendix · Medior",
      locatie: "Utrecht / hybride",
      tags: ["Mendix"],
      intro: "Korte intro.",
      secties: [{ titel: "Wie ben jij?", items: ["Mendix-ervaring"] }],
      facts: {
        team: "Mendix",
        niveau: "Medior",
        locatie: "Utrecht / hybride",
        uren: "In overleg",
        salaris: "Marktconform",
      },
      employmentType: "FULL_TIME",
      gepubliceerdOp: "2026-09-01",
      ...data,
    },
  };
}

beforeEach(() => {
  state.rows = [];
  getPublishedContent.mockClear();
  vi.spyOn(console, "error").mockImplementation(() => {});
});

describe("lege seed", () => {
  it("heeft geen vacatures in de code staan", () => {
    expect(VACATURES).toEqual([]);
  });

  it("toont niets als er geen live rijen zijn", async () => {
    expect(await getVacatures()).toEqual([]);
    expect(await getVacatureBySlug("medior-mendix-consultant")).toBeNull();
  });
});

describe("getVacatures", () => {
  it("leest een live rij volledig uit het CMS", async () => {
    state.rows = [rij("medior-mendix-consultant", "Medior Mendix Consultant")];
    const [v] = await getVacatures();
    expect(v?.functietitel).toBe("Medior Mendix Consultant");
    expect(v?.secties[0]?.items).toEqual(["Mendix-ervaring"]);
  });

  it("ontsmet de intro", async () => {
    state.rows = [rij("rol", "Rol", { intro: "Hoi <script>alert(1)</script><b>daar</b>" })];
    const [v] = await getVacatures();
    expect(v?.intro).not.toContain("<script");
    expect(v?.intro).toContain("<b>daar</b>");
  });

  describe("met één tekstveld (inhoud)", () => {
    /** Zo slaat het admin-formulier een nieuwe vacature op: geen aparte intro, secties of feiten. */
    const nieuw = (inhoud: string) =>
      rij("ai", "AI", { inhoud, intro: undefined, secties: undefined, facts: undefined });

    it("leest een rij zonder losse intro, secties en feiten", async () => {
      state.rows = [nieuw("<p>Intro.</p><h2>Kop</h2><p>Tekst.</p>")];
      const [v] = await getVacatures();
      expect(v?.functietitel).toBe("AI");
      expect(v?.secties).toEqual([]);
      expect(v?.facts).toEqual({ team: "", niveau: "", locatie: "", uren: "", salaris: "" });
    });

    it("haalt de intro uit de eerste alinea en laat de rest als tekst", async () => {
      state.rows = [nieuw("<p>Dit is de intro.</p><h2>Kop</h2><p>Tekst.</p>")];
      const [v] = await getVacatures();
      expect(v?.intro).toBe("Dit is de intro.");
      expect(v?.inhoudHtml).toBe("<h2>Kop</h2><p>Tekst.</p>");
    });

    it("laat een kop vóór de eerste alinea bij de tekst staan", async () => {
      state.rows = [nieuw("<h2>Over de rol</h2><p>Intro.</p><p>Vervolg.</p>")];
      const [v] = await getVacatures();
      expect(v?.intro).toBe("Intro.");
      expect(v?.inhoudHtml).toBe("<h2>Over de rol</h2><p>Vervolg.</p>");
    });

    it("ontsmet intro en tekst", async () => {
      state.rows = [
        nieuw(
          "<p>Hoi <script>alert(1)</script><b>daar</b></p><p onclick='x()'>Tekst</p><script>x</script>",
        ),
      ];
      const [v] = await getVacatures();
      expect(v?.intro).not.toContain("<script");
      expect(v?.intro).toContain("<b>daar</b>");
      expect(v?.inhoudHtml).not.toContain("onclick");
      expect(v?.inhoudHtml).not.toContain("<script");
    });

    it("gebruikt de oude losse intro niet meer zodra er inhoud is", async () => {
      state.rows = [rij("ai", "AI", { inhoud: "<p>Nieuwe intro.</p>", intro: "Oude intro." })];
      const [v] = await getVacatures();
      expect(v?.intro).toBe("Nieuwe intro.");
    });

    it("heeft geen intro als de tekst met een lijst begint", async () => {
      state.rows = [nieuw("<ul><li><p>een</p></li></ul>")];
      const [v] = await getVacatures();
      expect(v?.intro).toBe("");
      expect(v?.inhoudHtml).toContain("<li>");
    });

    it("negeert een lege inhoud en valt terug op het oude model", async () => {
      state.rows = [rij("oud", "Oud", { inhoud: "  " })];
      const [v] = await getVacatures();
      expect(v?.inhoudHtml).toBeUndefined();
      expect(v?.secties[0]?.items).toEqual(["Mendix-ervaring"]);
    });
  });

  /** Zonder seed is er geen vangnet, dus een halve rij hoort niet te renderen. */
  it("slaat een onvolledige rij over", async () => {
    state.rows = [
      {
        id: "half",
        slug: "half",
        titel: "Half",
        status: "live",
        volgorde: 0,
        bijgewerkt_op: "",
        bewerkt_door: null,
        data: { locatie: "Utrecht" },
      },
    ];
    expect(await getVacatures()).toEqual([]);
  });
});

describe("getVacatureBySlug", () => {
  it("vindt een rij op slug", async () => {
    state.rows = [rij("senior-mendix-consultant", "Senior Mendix Consultant")];
    expect((await getVacatureBySlug("senior-mendix-consultant"))?.functietitel).toBe(
      "Senior Mendix Consultant",
    );
  });

  it("geeft null voor een slug die niet bestaat", async () => {
    state.rows = [rij("senior-mendix-consultant", "Senior Mendix Consultant")];
    expect(await getVacatureBySlug("bestaat-niet")).toBeNull();
  });
});
