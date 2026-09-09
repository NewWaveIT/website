import { beforeEach, describe, expect, it, vi } from "vitest";

const insertMock = vi.fn(async () => ({ error: null }));
const fromMock = vi.fn(() => ({ insert: insertMock }));
const rpcMock = vi.fn(async () => ({
  data: true as boolean | null,
  error: null as { message: string } | null,
}));
const createClientMock = vi.fn(async () => ({ from: fromMock, rpc: rpcMock }));

vi.mock("@/lib/supabase/server", () => ({
  createClient: createClientMock,
}));

// Inzendingen gaan sinds de policy-wijziging niet meer via de anon-client maar
// via lib/supabase/inzendingen (service-role, server-only). Zie de toelichting
// daar: anon mag niet meer inserten, anders is de rate-limiter te omzeilen.
vi.mock("@/lib/supabase/inzendingen", () => ({
  inzendingClient: () => ({ from: fromMock }),
}));

vi.mock("next/headers", () => ({
  headers: vi.fn(async () => ({ get: () => "203.0.113.1" })),
}));

const { subscribeLead } = await import("@/app/(marketing)/inzichten/actions");

function formData(fields: Record<string, string>): FormData {
  const fd = new FormData();
  for (const [key, value] of Object.entries(fields)) fd.set(key, value);
  return fd;
}

const initialState = { ok: false, message: "" };

beforeEach(() => {
  insertMock.mockClear();
  fromMock.mockClear();
  rpcMock.mockClear().mockResolvedValue({ data: true, error: null });
  createClientMock.mockClear();
});

describe("subscribeLead", () => {
  it("honeypot: negeert de inzending stilzwijgend zonder Supabase-call", async () => {
    const result = await subscribeLead(
      initialState,
      formData({ email: "bot@example.com", website: "https://spam.example" }),
    );
    expect(result.ok).toBe(true);
    expect(createClientMock).not.toHaveBeenCalled();
  });

  it("wijst een ongeldig e-mailadres af", async () => {
    const result = await subscribeLead(initialState, formData({ email: "geen-email" }));
    expect(result.ok).toBe(false);
    expect(insertMock).not.toHaveBeenCalled();
  });

  it("blokkeert bij te veel pogingen (rate limit)", async () => {
    rpcMock.mockResolvedValueOnce({ data: false, error: null });
    const result = await subscribeLead(initialState, formData({ email: "jane@example.com" }));
    expect(result.ok).toBe(false);
    expect(result.message).toMatch(/te veel/i);
    expect(insertMock).not.toHaveBeenCalled();
  });

  it("slaat een geldig e-mailadres op als lead", async () => {
    const result = await subscribeLead(
      initialState,
      formData({ email: "jane@example.com", naam: "Jane" }),
    );
    expect(result.ok).toBe(true);
    expect(fromMock).toHaveBeenCalledWith("contact_aanvragen");
    expect(insertMock).toHaveBeenCalledWith(
      expect.objectContaining({ email: "jane@example.com", type: "inzichten" }),
    );
  });

  it("gebruikt het e-mailadres als naam ontbreekt", async () => {
    await subscribeLead(initialState, formData({ email: "jane@example.com" }));
    expect(insertMock).toHaveBeenCalledWith(expect.objectContaining({ naam: "jane@example.com" }));
  });
});
