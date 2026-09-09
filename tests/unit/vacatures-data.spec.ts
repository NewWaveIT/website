import { beforeEach, describe, expect, it, vi } from "vitest";
import { zonder } from "./helpers/cms-rij";

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

const eerste = VACATURES[0]!;

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

function heleRij(slug = eerste.slug, extra: Record<string, unknown> = {}) {
  return rij(slug, eerste.functietitel, { ...zonder(eerste, "slug"), ...extra });
}

beforeEach(() => {
  state.rows = [];
  getPublishedContent.mockClear();
  vi.spyOn(console, "error").mockImplementation(() => {});
});

describe("getVacatures", () => {
  it("valt op de statische lijst terug als er geen rijen zijn", async () => {
    expect((await getVacatures()).map((v) => v.slug)).toEqual(VACATURES.map((v) => v.slug));
  });

  it("laat de CMS-rij winnen en houdt een leeggemaakt veld leeg", async () => {
    state.rows = [heleRij(eerste.slug, { locatie: "" })];
    const [v] = await getVacatures();
    expect(v?.locatie).toBe("");
    expect(v?.functietitel).toBe(eerste.functietitel);
  });

  it("vult secties die de rij niet kent aan uit de seed", async () => {
    const rest = zonder(heleRij().data, "secties");
    state.rows = [rij(eerste.slug, eerste.functietitel, rest)];
    expect((await getVacatures())[0]?.secties.length).toBe(eerste.secties.length);
  });

  it("ontsmet de intro", async () => {
    state.rows = [heleRij(eerste.slug, { intro: "Hoi <script>alert(1)</script><b>daar</b>" })];
    const [v] = await getVacatures();
    expect(v?.intro).not.toContain("<script");
    expect(v?.intro).toContain("<b>daar</b>");
  });

  it("slaat een onvolledige eigen vacature over", async () => {
    state.rows = [rij("eigen-rol", "Eigen rol", { locatie: "Utrecht" })];
    expect(await getVacatures()).toEqual([]);
  });
});

describe("getVacatureBySlug", () => {
  it("valt per slug terug op de seed als er andere rijen bestaan", async () => {
    state.rows = [heleRij("andere-rol", { functietitel: "Andere rol" })];
    expect((await getVacatureBySlug(eerste.slug))?.functietitel).toBe(eerste.functietitel);
  });

  it("geeft null voor een slug die nergens bestaat", async () => {
    expect(await getVacatureBySlug("bestaat-niet")).toBeNull();
  });
});
