import { beforeEach, describe, expect, it, vi } from "vitest";
import { zonder } from "./helpers/cms-rij";

/**
 * Teamleden is het type waar de strengheid van het leespad het hardst aankomt:
 * de meeste rijen zijn door de redactie zelf aangemaakt en hebben dus geen
 * seed om op terug te vallen. Deze tests leggen vast wanneer zo'n rij gewoon
 * meedoet en wanneer hij bewust wegvalt.
 */

const { state, getPublishedContent } = vi.hoisted(() => {
  const state: { rows: Record<string, unknown>[] } = { rows: [] };
  return { state, getPublishedContent: vi.fn(async () => state.rows) };
});

vi.mock("@/lib/cms/content", () => ({
  getPublishedContent,
  fotoWebp: (s: string | null | undefined) => s ?? "",
}));

const { getTeamleden, getContactpersoon } = await import("@/lib/team-data");
const { TEAMLEDEN } = await import("@/lib/team");

const koen = TEAMLEDEN.find((t) => t.slug === "koen-wijsman")!;

function rij(slug: string, naam: string, data: Record<string, unknown>) {
  return {
    id: slug,
    slug,
    titel: naam,
    status: "live",
    volgorde: 0,
    bijgewerkt_op: "",
    bewerkt_door: null,
    data,
  };
}

/** Een rij zoals de admin hem wegschrijft: elk veld uit het schema staat erin. */
function heleRij(slug: string, naam: string, extra: Record<string, unknown> = {}) {
  return rij(slug, naam, {
    rol: "Consultant",
    foto: "",
    bio: "Korte bio.",
    contactrol: "",
    telefoon: "",
    email: "",
    linkedin: "",
    ...extra,
  });
}

beforeEach(() => {
  state.rows = [];
  getPublishedContent.mockClear();
  vi.spyOn(console, "error").mockImplementation(() => {});
});

describe("getTeamleden", () => {
  it("valt op de standaardlijst terug als er geen rijen zijn", async () => {
    expect((await getTeamleden()).map((t) => t.slug)).toEqual(TEAMLEDEN.map((t) => t.slug));
  });

  it("toont een teamlid dat alleen in het CMS bestaat", async () => {
    state.rows = [heleRij("nieuwe-waver", "Nieuwe Waver")];
    const [t] = await getTeamleden();
    expect(t?.naam).toBe("Nieuwe Waver");
    expect(t?.rol).toBe("Consultant");
  });

  it("houdt een leeggemaakte bio leeg in plaats van de seed terug te zetten", async () => {
    state.rows = [heleRij(koen.slug, koen.naam, { bio: "" })];
    expect((await getTeamleden())[0]?.bio).toBe("");
  });

  it("vult een veld dat de rij niet kent aan uit de seed", async () => {
    const rest = zonder(heleRij(koen.slug, koen.naam).data, "bio");
    state.rows = [rij(koen.slug, koen.naam, rest)];
    expect((await getTeamleden())[0]?.bio).toBe(koen.bio);
  });

  it("slaat een onvolledige rij zonder seed over en logt dat", async () => {
    const fout = vi.spyOn(console, "error").mockImplementation(() => {});
    state.rows = [rij("half-ingevuld", "Half Ingevuld", { telefoon: "06" })];
    expect(await getTeamleden()).toEqual([]);
    expect(fout).toHaveBeenCalled();
  });
});

describe("getContactpersoon", () => {
  it("vindt de persoon met de gevraagde rol, ook bij een dubbelrol", async () => {
    state.rows = [
      heleRij("een", "Een", { contactrol: "Sales" }),
      heleRij("twee", "Twee", { contactrol: "Sales & recruitment" }),
    ];
    expect((await getContactpersoon("sales"))?.naam).toBe("Een");
    expect((await getContactpersoon("recruitment"))?.naam).toBe("Twee");
  });

  it("geeft null als niemand is aangewezen", async () => {
    state.rows = [heleRij("een", "Een")];
    expect(await getContactpersoon("recruitment")).toBeNull();
  });
});
