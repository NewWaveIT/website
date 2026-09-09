import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * De adminlijst haalt bewust niet de hele rij op, maar de kolommen die de tabel
 * toont plus de velden waarop gefilterd wordt. Dat is precies het soort
 * optimalisatie waarbij later stilletjes een veld wegvalt: dan filtert een
 * lijst op iets wat nooit is meegekomen en lijkt elke waarde leeg, zonder dat
 * er iets kapotgaat. Vandaar deze tests op de selectie zelf.
 */

const { state, from, rpc } = vi.hoisted(() => {
  const state: { selectie: string; rows: unknown[]; error: { message: string } | null } = {
    selectie: "",
    rows: [],
    error: null,
  };
  const bouwer = () => {
    const q = {
      select: (s: string) => {
        state.selectie = s;
        return q;
      },
      order: () => q,
      abortSignal: () => Promise.resolve({ data: state.rows, error: state.error }),
    };
    return q;
  };
  const rpc = vi.fn(() => ({
    abortSignal: () => Promise.resolve({ data: state.rows, error: state.error }),
  }));
  return { state, from: vi.fn(bouwer), rpc };
});

vi.mock("@/lib/supabase/server", () => ({ createClient: async () => ({ from, rpc }) }));

const { listContentSamenvatting, getAdminCounts } = await import("@/lib/cms/content");
const { LIJST_FACETTEN } = await import("@/lib/cms/admin-lijst");

beforeEach(() => {
  state.selectie = "";
  state.rows = [];
  state.error = null;
  from.mockClear();
  rpc.mockClear();
  vi.spyOn(console, "error").mockImplementation(() => {});
});

describe("listContentSamenvatting", () => {
  it("vraagt de inhoud van de rij niet op", async () => {
    await listContentSamenvatting("cases");
    expect(state.selectie).not.toContain("*");
    expect(state.selectie).not.toMatch(/(^|[\s,])data([\s,]|$)/);
  });

  it("vraagt precies de kolommen op die de tabel toont", async () => {
    await listContentSamenvatting("cases");
    for (const kolom of [
      "id",
      "slug",
      "titel",
      "status",
      "volgorde",
      "bijgewerkt_op",
      "bewerkt_door",
    ]) {
      expect(state.selectie, `kolom ${kolom}`).toContain(kolom);
    }
  });

  it("haalt elk facetveld los uit de jsonb", async () => {
    await listContentSamenvatting("artikelen", ["discipline", "sector"]);
    expect(state.selectie).toContain("discipline:data->>discipline");
    expect(state.selectie).toContain("sector:data->>sector");
  });

  it("zet die velden terug onder `data`, zodat de lijst één vorm ziet", async () => {
    state.rows = [
      {
        id: "1",
        slug: "moove",
        titel: "Moove",
        status: "live",
        volgorde: 0,
        bijgewerkt_op: "",
        bewerkt_door: null,
        sector: "Mobiliteit",
      },
    ];
    const [rij] = await listContentSamenvatting("cases", ["sector"]);
    expect(rij?.data).toEqual({ sector: "Mobiliteit" });
    expect(rij?.titel).toBe("Moove");
  });

  it("weigert een veldnaam die geen veldnaam is", async () => {
    await listContentSamenvatting("cases", ["sector); drop table cms_cases--"]);
    expect(state.selectie).not.toContain("drop table");
  });

  it("geeft een lege lijst bij een databasefout in plaats van te gooien", async () => {
    state.error = { message: "kapot" };
    expect(await listContentSamenvatting("cases")).toEqual([]);
  });
});

describe("LIJST_FACETTEN", () => {
  it("gebruikt alleen veldnamen die veilig in een query passen", () => {
    for (const facets of Object.values(LIJST_FACETTEN)) {
      for (const f of facets ?? []) expect(f.key).toMatch(/^[A-Za-z0-9_]+$/);
    }
  });
});

describe("getAdminCounts", () => {
  it("haalt alle tellers in één databaseaanroep op", async () => {
    state.rows = [
      { naam: "cases", aantal: 1 },
      { naam: "sectoren", aantal: 5 },
    ];
    expect(await getAdminCounts()).toEqual({ cases: 1, sectoren: 5 });
    expect(rpc).toHaveBeenCalledTimes(1);
    expect(rpc).toHaveBeenCalledWith("admin_aantallen");
  });

  it("valt terug op lege tellers als de aanroep mislukt", async () => {
    state.error = { message: "kapot" };
    expect(await getAdminCounts()).toEqual({});
  });
});
