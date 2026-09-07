import { beforeEach, describe, expect, it, vi } from "vitest";

type InsertResult = { error: { message: string } | null };
type RpcResult = { data: boolean | null; error: { message: string } | null };

const insertMock = vi.fn(async (): Promise<InsertResult> => ({ error: null }));
const fromMock = vi.fn(() => ({ insert: insertMock }));
const rpcMock = vi.fn(async (): Promise<RpcResult> => ({ data: true, error: null }));
const createClientMock = vi.fn(async () => ({ from: fromMock, rpc: rpcMock }));

vi.mock("@/lib/supabase/server", () => ({
  createClient: createClientMock,
}));

vi.mock("next/headers", () => ({
  headers: vi.fn(async () => ({ get: () => "203.0.113.1" })),
}));

const { sendAanvraagNotificatie, sendAanvraagBevestiging } = vi.hoisted(() => ({
  sendAanvraagNotificatie: vi.fn(async () => {}),
  sendAanvraagBevestiging: vi.fn(async () => {}),
}));

vi.mock("@/lib/email", () => ({
  sendAanvraagNotificatie,
  sendAanvraagBevestiging,
}));

const { submitContact } = await import("@/app/(marketing)/contact/actions");

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
  sendAanvraagNotificatie.mockClear();
  sendAanvraagBevestiging.mockClear();
});

describe("submitContact", () => {
  it("honeypot: negeert de inzending stilzwijgend zonder Supabase-call", async () => {
    const result = await submitContact(
      initialState,
      formData({ naam: "Bot", email: "bot@example.com", website: "https://spam.example" }),
    );
    expect(result.ok).toBe(true);
    expect(createClientMock).not.toHaveBeenCalled();
    expect(sendAanvraagNotificatie).not.toHaveBeenCalled();
  });

  it("verzamelt alle validatiefouten tegelijk", async () => {
    const result = await submitContact(
      initialState,
      formData({ naam: "A", email: "geen-email", toelichting: "x".repeat(5001) }),
    );
    expect(result.ok).toBe(false);
    expect(result.errors).toEqual({
      naam: "Vul je naam in.",
      email: "Vul een geldig e-mailadres in.",
      toelichting: "Toelichting is te lang (max. 5000 tekens).",
    });
    expect(insertMock).not.toHaveBeenCalled();
  });

  it("blokkeert bij te veel pogingen (rate limit), zonder insert of mails", async () => {
    rpcMock.mockResolvedValueOnce({ data: false, error: null });
    const result = await submitContact(
      initialState,
      formData({ naam: "Jane Doe", email: "jane@example.com" }),
    );
    expect(result.ok).toBe(false);
    expect(result.message).toMatch(/te veel/i);
    expect(insertMock).not.toHaveBeenCalled();
    expect(sendAanvraagNotificatie).not.toHaveBeenCalled();
  });

  it("slaat een geldige inzending op en verstuurt beide mails", async () => {
    const result = await submitContact(
      initialState,
      formData({
        naam: "Jane Doe",
        email: "jane@example.com",
        toelichting: "Interesse in Mendix.",
      }),
    );
    expect(result.ok).toBe(true);
    expect(fromMock).toHaveBeenCalledWith("contact_aanvragen");
    expect(insertMock).toHaveBeenCalledWith(
      expect.objectContaining({ naam: "Jane Doe", email: "jane@example.com" }),
    );
    expect(sendAanvraagNotificatie).toHaveBeenCalledTimes(1);
    expect(sendAanvraagBevestiging).toHaveBeenCalledTimes(1);
  });

  it("geeft een foutmelding terug als de insert faalt, zonder mails te versturen", async () => {
    insertMock.mockResolvedValueOnce({ error: { message: "db down" } });
    const result = await submitContact(
      initialState,
      formData({ naam: "Jane Doe", email: "jane@example.com" }),
    );
    expect(result.ok).toBe(false);
    expect(sendAanvraagNotificatie).not.toHaveBeenCalled();
  });
});
