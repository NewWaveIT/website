import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

/**
 * De toegangspoort tot de admin. Wat hier vastligt is de belangrijkste regel:
 * niets telt als "ingelogd" behalve een gebruiker die de auth-server bevestigt.
 * Twijfel is dus geen toegang.
 */

const { state, getUser, createClient, redirect } = vi.hoisted(() => {
  const state: { user: unknown; error: { message: string } | null } = { user: null, error: null };
  const getUser = vi.fn(async () => ({ data: { user: state.user }, error: state.error }));
  const createClient = vi.fn(async () => ({ auth: { getUser } }));
  const redirect = vi.fn((pad: string) => {
    throw new Error(`REDIRECT:${pad}`);
  });
  return { state, getUser, createClient, redirect };
});

vi.mock("@/lib/supabase/server", () => ({ createClient }));
vi.mock("next/navigation", () => ({ redirect }));

const { getCurrentUser, requireAdmin } = await import("@/lib/dal");

const ORIGINEEL = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL,
  key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
};

beforeEach(() => {
  process.env.NEXT_PUBLIC_SUPABASE_URL = "https://voorbeeld.supabase.co";
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "anon-sleutel";
  state.user = null;
  state.error = null;
  getUser.mockClear();
  createClient.mockClear();
  redirect.mockClear();
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  process.env.NEXT_PUBLIC_SUPABASE_URL = ORIGINEEL.url;
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = ORIGINEEL.key;
});

describe("getCurrentUser", () => {
  it("geeft de gebruiker die de auth-server bevestigt", async () => {
    state.user = { id: "abc", email: "mitchel@thenewwaveit.com" };
    expect(await getCurrentUser()).toEqual(state.user);
  });

  it("geeft null als de auth-server een fout meldt", async () => {
    state.user = { id: "abc" };
    state.error = { message: "token verlopen" };
    expect(await getCurrentUser()).toBeNull();
  });

  /**
   * Zonder Supabase-config gooide `createClient`, en die fout sloeg door tot
   * een generieke foutpagina in plaats van de login. Nu meteen null — en
   * belangrijker: er wordt geen client meer gemaakt.
   */
  it("geeft null zonder Supabase-config, zonder een client te maken", async () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    expect(await getCurrentUser()).toBeNull();
    expect(createClient).not.toHaveBeenCalled();
  });

  it("geeft ook null als alleen de sleutel ontbreekt", async () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    expect(await getCurrentUser()).toBeNull();
    expect(createClient).not.toHaveBeenCalled();
  });
});

describe("requireAdmin", () => {
  it("laat een ingelogde gebruiker door", async () => {
    state.user = { id: "abc" };
    expect(await requireAdmin()).toEqual(state.user);
    expect(redirect).not.toHaveBeenCalled();
  });

  it("stuurt naar de login zonder gebruiker", async () => {
    await expect(requireAdmin()).rejects.toThrow("REDIRECT:/admin/login");
  });

  it("stuurt ook naar de login als Supabase niet geconfigureerd is", async () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    await expect(requireAdmin()).rejects.toThrow("REDIRECT:/admin/login");
  });
});
