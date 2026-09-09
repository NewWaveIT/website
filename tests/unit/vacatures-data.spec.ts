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
