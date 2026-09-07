import { beforeEach, describe, expect, it, vi } from "vitest";

type InsertResult = { error: { message: string } | null };
type RpcResult = { data: boolean | null; error: { message: string } | null };

const insertMock = vi.fn<(record: Record<string, unknown>) => Promise<InsertResult>>(async () => ({
  error: null,
}));
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
      formData({
        naam: "A",
        email: "geen-email",
        toelichting: "x".repeat(5001),
        dienst: "onbestaande-dienst",
      }),
    );
    expect(result.ok).toBe(false);
    expect(result.errors).toEqual({
      naam: "Vul je naam in.",
      email: "Vul een geldig e-mailadres in.",
      toelichting: "Toelichting is te lang (max. 5000 tekens).",
      dienst: "Kies een geldige dienst.",
    });
    expect(insertMock).not.toHaveBeenCalled();
  });

  it("onbekende dienst-slug geeft een foutmelding, zonder insert", async () => {
    const result = await submitContact(
      initialState,
      formData({ naam: "Jane Doe", email: "jane@example.com", dienst: "bestaat-niet" }),
    );
    expect(result.ok).toBe(false);
    expect(result.errors).toEqual({ dienst: "Kies een geldige dienst." });
    expect(insertMock).not.toHaveBeenCalled();
  });

  it("slaat een inzending zonder dienst op als een algemeen gesprek", async () => {
    const result = await submitContact(
      initialState,
      formData({ naam: "Jane Doe", email: "jane@example.com" }),
    );
    expect(result.ok).toBe(true);
    expect((insertMock.mock.calls[0]![0] as { type: string }).type).toBe("gesprek");
  });

  it("maakt er een dienstaanvraag van zodra een dienst gekozen is, ook vanaf de algemene pagina", async () => {
    const result = await submitContact(
      initialState,
      // De contactpagina stuurt haar eigen type mee als hidden veld; een
      // gekozen dienst moet daar dan alsnog boven gaan.
      formData({
        naam: "Jane Doe",
        email: "jane@example.com",
        type: "gesprek",
        dienst: "app-in-a-day",
      }),
    );
    expect(result.ok).toBe(true);
    expect((insertMock.mock.calls[0]![0] as { type: string }).type).toBe("dienstaanvraag");
  });

  it("laat een specifiekere ingang zoals kennismaking staan", async () => {
    const result = await submitContact(
      initialState,
      formData({
        naam: "Jane Doe",
        email: "jane@example.com",
        type: "kennismaking",
        dienst: "it-strategie",
      }),
    );
    expect(result.ok).toBe(true);
    expect((insertMock.mock.calls[0]![0] as { type: string }).type).toBe("kennismaking");
  });

  it("'weet-ik-niet' als dienst is altijd geldig", async () => {
    const result = await submitContact(
      initialState,
      formData({ naam: "Jane Doe", email: "jane@example.com", dienst: "weet-ik-niet" }),
    );
    expect(result.ok).toBe(true);
    expect(insertMock).toHaveBeenCalled();
  });

  it("een vervolgvraag-antwoord buiten de toegestane opties geeft een foutmelding", async () => {
    const result = await submitContact(
      initialState,
      formData({
        naam: "Jane Doe",
        email: "jane@example.com",
        dienst: "app-in-a-day",
        mendixOmgeving: "Misschien",
      }),
    );
    expect(result.ok).toBe(false);
    expect(result.errors).toEqual({ mendixOmgeving: "Kies een van de opties." });
    expect(insertMock).not.toHaveBeenCalled();
  });

  it("slaat een dienstaanvraag op met dienstnaam voorop en beantwoorde vervolgvragen in het bericht", async () => {
    const result = await submitContact(
      initialState,
      formData({
        naam: "Jane Doe",
        email: "jane@example.com",
        dienst: "app-in-a-day",
        mendixOmgeving: "Ja",
        procesInGedachten: "Vergunningaanvragen die nu in Excel bijgehouden worden.",
      }),
    );
    expect(result.ok).toBe(true);
    const record = insertMock.mock.calls[0]![0] as {
      onderwerp: string;
      bericht: string;
      type: string;
    };
    expect(record.type).toBe("dienstaanvraag");
    expect(record.onderwerp.startsWith("App in a Day")).toBe(true);
    expect(record.bericht).toContain("Is er al een Mendix-omgeving?: Ja");
    expect(record.bericht).toContain(
      "Welk proces heb je in gedachten?: Vergunningaanvragen die nu in Excel bijgehouden worden.",
    );
  });

  it("negeert vragen die niet bij de gekozen dienst horen", async () => {
    const result = await submitContact(
      initialState,
      formData({
        naam: "Jane Doe",
        email: "jane@example.com",
        dienst: "app-in-a-day",
        // Hoort bij ai-agent-in-a-day, niet bij app-in-a-day — mag genegeerd worden.
        claudeToegang: "Ja",
      }),
    );
    expect(result.ok).toBe(true);
    const record = insertMock.mock.calls[0]![0] as { bericht: string };
    expect(record.bericht).not.toContain("Claude");
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
