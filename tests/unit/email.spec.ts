import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

/**
 * `lib/email.ts` draagt één belofte: hij gooit nooit. De drie formulieracties
 * versturen hun mail ná een geslaagde insert, zodat een storing bij Resend een
 * inzending niet kan breken. Die belofte stond nergens in een test — het bestand
 * werd in de andere specs alleen gemockt, dus de echte code liep nooit.
 *
 * De env-variabelen worden op moduleniveau gelezen, dus die moeten staan vóór de
 * import. `RESEND_API_KEY` leest `verstuur` bij elke aanroep en kan dus per test.
 */
process.env.MAIL_FROM = "Test Admin <admin@test.nl>";
process.env.MAIL_FROM_PUBLIC = "Test Publiek <hallo@test.nl>";
process.env.NOTIFY_EMAIL = "intern@test.nl";
process.env.NOTIFY_EMAIL_AANVRAGEN = "aanvragen@test.nl";

const { sendAanvraagNotificatie } = await import("@/lib/email");

const AANVRAAG = {
  naam: "Jane Doe",
  organisatie: "Acme",
  email: "jane@example.com",
  rol: "CIO",
  dienst: "Mendix Scale Sessie",
  sector: "Banken",
  vraagstuk: "Mendix / applicaties",
  toelichting: "Graag contact.",
  cmsUrl: "https://www.thenewwaveit.com/admin/aanvragen?open=test-id",
};

let fetchMock: ReturnType<typeof vi.fn>;

beforeEach(() => {
  fetchMock = vi.fn(async () => new Response("", { status: 200 }));
  vi.stubGlobal("fetch", fetchMock);
  vi.spyOn(console, "warn").mockImplementation(() => {});
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

/** De JSON die naar Resend ging. */
function verzonden(): Record<string, string> {
  const init = fetchMock.mock.calls[0]?.[1] as RequestInit | undefined;
  return JSON.parse(String(init?.body ?? "{}"));
}

describe("zonder RESEND_API_KEY", () => {
  beforeEach(() => vi.stubEnv("RESEND_API_KEY", ""));

  it("slaat de mail over in plaats van te falen", async () => {
    await expect(sendAanvraagNotificatie(AANVRAAG)).resolves.toBeUndefined();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("laat wel een spoor achter in de logs", async () => {
    await sendAanvraagNotificatie(AANVRAAG);
    expect(console.warn).toHaveBeenCalledWith(expect.stringContaining("RESEND_API_KEY ontbreekt"));
  });
});

describe("met RESEND_API_KEY", () => {
  beforeEach(() => vi.stubEnv("RESEND_API_KEY", "re_test123"));

  it("post naar Resend met de sleutel in de header", async () => {
    await sendAanvraagNotificatie(AANVRAAG);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("https://api.resend.com/emails");
    expect(init.method).toBe("POST");
    expect((init.headers as Record<string, string>).Authorization).toBe("Bearer re_test123");
  });

  it("stuurt de interne notificatie naar NOTIFY_EMAIL_AANVRAGEN", async () => {
    await sendAanvraagNotificatie(AANVRAAG);
    const body = verzonden();
    expect(body.to).toBe("aanvragen@test.nl");
    expect(body.from).toBe("Test Admin <admin@test.nl>");
    expect(body.subject).toContain("Acme");
    expect(body.reply_to).toBe(AANVRAAG.email);
  });

  it("gooit niet als Resend een fout teruggeeft", async () => {
    fetchMock.mockResolvedValueOnce(new Response("rate limited", { status: 429 }));
    await expect(sendAanvraagNotificatie(AANVRAAG)).resolves.toBeUndefined();
    expect(console.error).toHaveBeenCalledWith(expect.stringContaining("429"));
  });

  it("gooit niet als het netwerk wegvalt", async () => {
    fetchMock.mockRejectedValueOnce(new Error("ECONNREFUSED"));
    await expect(sendAanvraagNotificatie(AANVRAAG)).resolves.toBeUndefined();
    expect(console.error).toHaveBeenCalledWith("[email] versturen mislukt:", expect.any(Error));
  });

  /**
   * De naam, de toelichting en de preheader komen rechtstreeks van een bezoeker
   * en landen in HTML die een collega in zijn mailclient opent.
   */
  it("escapet invoer van de bezoeker in de HTML", async () => {
    await sendAanvraagNotificatie({
      ...AANVRAAG,
      naam: '<script>alert("xss")</script>',
      organisatie: "",
      toelichting: "Regel 1\nRegel 2 <b>vet</b>",
    });
    const html = verzonden().html ?? "";
    expect(html).not.toContain("<script>");
    expect(html).toContain("&lt;script&gt;");
    expect(html).not.toContain("<b>vet</b>");
    // Vrije tekst houdt wel zijn regelovergangen.
    expect(html).toContain("Regel 1<br>Regel 2");
  });
});
