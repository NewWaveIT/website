import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * De rate-limiter is de enige rem op de publieke formulieren, dus zijn
 * eigenaardigheden horen vastgelegd: hoe de sleutel eruitziet (per actie én per
 * IP, niet één teller voor iedereen) en dat een storing in de limiter zelf een
 * geldige inzending nooit tegenhoudt.
 */

const { state, rpc, headerWaarde } = vi.hoisted(() => {
  const state: { toegestaan: boolean; error: { message: string } | null; xff: string | null } = {
    toegestaan: true,
    error: null,
    xff: null,
  };
  // De parameters worden niet gebruikt maar wél getypeerd, zodat
  // `rpc.mock.calls[0][1]` in de tests een bekende vorm heeft.
  const rpc = vi.fn((...args: [string, Record<string, unknown>]) => {
    void args;
    return Promise.resolve({ data: state.toegestaan, error: state.error });
  });
  const headerWaarde = () => state.xff;
  return { state, rpc, headerWaarde };
});

vi.mock("next/headers", () => ({ headers: async () => ({ get: () => headerWaarde() }) }));
vi.mock("@/lib/supabase/server", () => ({ createClient: async () => ({ rpc }) }));

const { magDoor } = await import("@/lib/rate-limit");

beforeEach(() => {
  state.toegestaan = true;
  state.error = null;
  state.xff = "203.0.113.7";
  rpc.mockClear();
});

describe("magDoor", () => {
  it("laat door zolang de database ja zegt", async () => {
    expect(await magDoor("contact", 5, 600)).toBe(true);
  });

  it("houdt tegen zodra de database nee zegt", async () => {
    state.toegestaan = false;
    expect(await magDoor("contact", 5, 600)).toBe(false);
  });

  it("telt per actie én per IP, zodat één bezoeker niet iedereen blokkeert", async () => {
    await magDoor("contact", 5, 600);
    expect(rpc).toHaveBeenCalledWith("check_rate_limit", {
      p_key: "contact:203.0.113.7",
      p_max_attempts: 5,
      p_window_seconds: 600,
    });
  });

  it("neemt het eerste adres uit een keten van proxies", async () => {
    state.xff = "198.51.100.4, 70.41.3.18, 150.172.238.178";
    await magDoor("sollicitatie", 3, 3600);
    expect(rpc.mock.calls[0]?.[1]).toMatchObject({ p_key: "sollicitatie:198.51.100.4" });
  });

  it("valt terug op één gedeelde sleutel als er geen IP bekend is", async () => {
    state.xff = null;
    await magDoor("contact", 5, 600);
    expect(rpc.mock.calls[0]?.[1]).toMatchObject({ p_key: "contact:onbekend" });
  });

  /**
   * Fail-safe, net als lib/email.ts: een kapotte limiter mag geen geldige
   * sollicitatie weigeren. Spam tegenhouden is minder erg dan een kandidaat
   * kwijtraken.
   */
  it("laat door als de limiter zelf stuk is", async () => {
    state.error = { message: "kapot" };
    expect(await magDoor("contact", 5, 600)).toBe(true);
  });

  it("laat door als de databaseaanroep gooit", async () => {
    rpc.mockImplementationOnce(() => {
      throw new Error("netwerk weg");
    });
    expect(await magDoor("contact", 5, 600)).toBe(true);
  });
});
