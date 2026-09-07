import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * De catalogus-logica: hoe de 9 diensten over de keuzematrix en de richting-hubs
 * verdeeld worden. Hier zitten drie regels in die zichtbaar zijn voor de
 * bezoeker en dus niet stil mogen wegvallen:
 *   1. geen enkel vak in de matrix blijft leeg;
 *   2. dezelfde dienst staat nooit twee keer op één hub;
 *   3. een "(geen)"-keuze in het CMS wist een seed-waarde echt.
 */

const { state, getPublishedContent } = vi.hoisted(() => {
  const state: { rows: Record<string, unknown>[] } = { rows: [] };
  return { state, getPublishedContent: vi.fn(async () => state.rows) };
});

vi.mock("@/lib/cms/content", () => ({ getPublishedContent }));

const {
  getServices,
  getServiceBySlug,
  getDienstMatrix,
  getRichtingHub,
  getInstapPerRichting,
  getFaseItems,
} = await import("@/lib/services-data");
const { SERVICES, RICHTINGEN } = await import("@/lib/services");

/** CMS-rij voor één dienst; `data` bevat alleen wat de redacteur heeft aangeraakt. */
function rij(slug: string, data: Record<string, unknown> = {}, volgorde = 0) {
  return {
    id: slug,
    slug,
    titel: "",
    status: "live",
    volgorde,
    bijgewerkt_op: "",
    bewerkt_door: null,
    data,
  };
}

beforeEach(() => {
  state.rows = [];
  getPublishedContent.mockClear();
});

describe("getServices", () => {
  it("valt zonder CMS-rijen terug op de seed", async () => {
    const s = await getServices();
    expect(s).toHaveLength(SERVICES.length);
    expect(s.map((x) => x.slug)).toContain("app-in-a-day");
  });

  it("sorteert op familie (doen → richting → capaciteit) en dan op volgorde", async () => {
    const families = (await getServices()).map((s) => s.familie);
    expect(families).toEqual(
      [...families].sort((a, b) => {
        const o = { doen: 0, richting: 1, capaciteit: 2 };
        return o[a] - o[b];
      }),
    );
  });
});

describe("CMS-keuzevelden", () => {
  it("laat een echte waarde de seed overschrijven", async () => {
    state.rows = [rij("app-in-a-day", { richting: "ai" })];
    expect((await getServiceBySlug("app-in-a-day"))?.richting).toBe("ai");
  });

  it("'(geen)' bij richting wist de seed-waarde", async () => {
    state.rows = [rij("app-in-a-day", { richting: "(geen)" })];
    expect((await getServiceBySlug("app-in-a-day"))?.richting).toBeUndefined();
  });

  it("'(zelfde als familie)' bij hubTier wist de seed-waarde", async () => {
    // AI-strategie staat in de seed op hubTier "doen"; de sentinel moet dat opheffen.
    state.rows = [rij("ai-strategie", { hubTier: "(zelfde als familie)" })];
    expect((await getServiceBySlug("ai-strategie"))?.hubTier).toBeUndefined();
  });

  it("'(geen)' bij fase wist de fase", async () => {
    state.rows = [rij("app-in-a-day", { fase: "(geen)" })];
    expect((await getServiceBySlug("app-in-a-day"))?.fase).toBeUndefined();
  });

  it("leest een fase als getal, niet als tekst", async () => {
    state.rows = [rij("app-in-a-day", { fase: "3" })];
    expect((await getServiceBySlug("app-in-a-day"))?.fase).toBe(3);
  });

  it("houdt een veld dat de redacteur niet aanraakte op de seed-waarde", async () => {
    state.rows = [rij("app-in-a-day", { pitch: "Nieuwe pitch." })];
    const s = await getServiceBySlug("app-in-a-day");
    expect(s?.pitch).toBe("Nieuwe pitch.");
    expect(s?.richting).toBe("mendix");
    expect(s?.prijzen.length).toBeGreaterThan(0);
  });
});

describe("getDienstMatrix", () => {
  it("laat nooit een leeg vak zien", async () => {
    const { rijen } = await getDienstMatrix();
    for (const r of rijen) {
      if (r.layout === "kolommen") {
        expect(r.cellen).toHaveLength(RICHTINGEN.length);
        expect(r.cellen.every((c) => c.service)).toBe(true);
      } else {
        expect(r.diensten.length).toBeGreaterThan(0);
      }
    }
  });

  it("plaatst alle 9 diensten precies één keer", async () => {
    const { rijen } = await getDienstMatrix();
    const slugs = rijen.flatMap((r) =>
      r.layout === "kolommen" ? r.cellen.map((c) => c.service.slug) : r.diensten.map((s) => s.slug),
    );
    expect(slugs).toHaveLength(SERVICES.length);
    expect(new Set(slugs).size).toBe(SERVICES.length);
  });

  it("maakt het capaciteitsniveau breed, omdat het richting-overstijgend is", async () => {
    const { rijen } = await getDienstMatrix();
    const instap = rijen.find((r) => r.familie === "doen");
    const capaciteit = rijen.find((r) => r.familie === "capaciteit");
    expect(instap?.layout).toBe("kolommen");
    expect(capaciteit?.layout).toBe("breed");
    expect(capaciteit?.diensten.map((s) => s.slug)).toEqual([
      "fusion-team-startsprint",
      "foundation-starterkit",
      "training-enablement",
    ]);
  });

  it("zet AI-strategie via hubTier op het instapniveau van Strategie", async () => {
    const { rijen } = await getDienstMatrix();
    const instap = rijen.find((r) => r.familie === "doen");
    expect(instap?.cellen.find((c) => c.richting === "strategie")?.service.slug).toBe(
      "ai-strategie",
    );
  });
});

describe("getRichtingHub", () => {
  it("geeft per niveau ten hoogste één dienst en nooit een dubbele", async () => {
    for (const { key } of RICHTINGEN) {
      const { tiers } = await getRichtingHub(key);
      const slugs = tiers.map((t) => t.service.slug);
      expect(new Set(slugs).size).toBe(slugs.length);
      expect(new Set(tiers.map((t) => t.familie)).size).toBe(tiers.length);
      expect(tiers.every((t) => t.service.richting === key)).toBe(true);
    }
  });

  it("toont Mendix drie niveaus en AI/Strategie twee", async () => {
    expect((await getRichtingHub("mendix")).tiers).toHaveLength(3);
    expect((await getRichtingHub("ai")).tiers).toHaveLength(2);
    expect((await getRichtingHub("strategie")).tiers).toHaveLength(2);
  });

  it("zet richting-overstijgende diensten als kruisverwijzing, niet als kaart", async () => {
    const hub = await getRichtingHub("ai");
    const kaarten = hub.tiers.map((t) => t.service.slug);
    const kruis = hub.crossRefs.map((s) => s.slug);
    expect(kruis).toContain("training-enablement");
    expect(kaarten).not.toContain("training-enablement");
    expect(kruis.every((s) => !kaarten.includes(s))).toBe(true);
  });

  it("verwijst IT-strategie en Mendix Scale Sessie naar elkaars hub", async () => {
    expect((await getRichtingHub("mendix")).crossRefs.map((s) => s.slug)).toContain("it-strategie");
    expect((await getRichtingHub("strategie")).crossRefs.map((s) => s.slug)).toContain(
      "mendix-scale-sessie",
    );
  });
});

describe("getInstapPerRichting", () => {
  it("geeft per richting de dienst van niveau 1", async () => {
    const instap = await getInstapPerRichting();
    expect(instap.map((i) => [i.richting, i.service?.slug])).toEqual([
      ["mendix", "app-in-a-day"],
      ["ai", "ai-agent-in-a-day"],
      ["strategie", "ai-strategie"],
    ]);
  });
});

describe("getFaseItems", () => {
  it("geeft vijf gelijkvormige fasen met de teksten uit de pagina", () => {
    const fases = getFaseItems({
      fase1Titel: "Basis",
      fase1Tekst: "Tekst 1",
      fase4Titel: "Schalen",
    });
    expect(fases).toHaveLength(5);
    expect(fases[0]).toEqual({ nummer: 1, titel: "Basis", tekst: "Tekst 1" });
    // Geen dienstverwijzingen meer: fase 4 en 5 zien er net zo uit als de rest.
    expect(Object.keys(fases[3] ?? {})).toEqual(["nummer", "titel", "tekst"]);
  });
});
