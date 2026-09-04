import { beforeEach, describe, expect, it, vi } from "vitest";

type InsertResult = { error: { message: string } | null };

const insertMock = vi.fn(async (): Promise<InsertResult> => ({ error: null }));
const fromMock = vi.fn(() => ({ insert: insertMock }));
const createClientMock = vi.fn(async () => ({ from: fromMock }));

vi.mock("@/lib/supabase/server", () => ({
  createClient: createClientMock,
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
    expect(createClientMock).not.toHaveBeenCalled();
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
