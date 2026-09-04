import { beforeEach, describe, expect, it, vi } from "vitest";

const insertMock = vi.fn(async () => ({ error: null }));
const fromMock = vi.fn(() => ({ insert: insertMock }));
const createClientMock = vi.fn(async () => ({ from: fromMock }));

vi.mock("@/lib/supabase/server", () => ({
  createClient: createClientMock,
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
    expect(createClientMock).not.toHaveBeenCalled();
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
