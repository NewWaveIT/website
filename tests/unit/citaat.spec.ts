import { describe, it, expect } from "vitest";
import { citaat } from "@/lib/utils";

/**
 * Citaten kwamen uit twee werelden: de helft van de weergaveplekken zette zelf
 * `“…”` om de waarde, de andere helft verwachtte dat die tekens in het CMS
 * stonden. Typte een redacteur ze er dan bij, dan stond er `““…””` op de
 * pagina. `citaat` maakt er altijd precies één paar van.
 */
describe("citaat", () => {
  it("laat een correct citaat staan", () => {
    expect(citaat("“Zo hoort het.”")).toBe("“Zo hoort het.”");
  });

  it("zet tekens om een kale zin", () => {
    expect(citaat("Zonder tekens.")).toBe("“Zonder tekens.”");
  });

  it("maakt van dubbele tekens één paar", () => {
    expect(citaat("““Dubbel.””")).toBe("“Dubbel.”");
  });

  it("normaliseert rechte aanhalingstekens", () => {
    expect(citaat('"Recht."')).toBe("“Recht.”");
  });

  it("laat een apostrof binnen de zin met rust", () => {
    expect(citaat("Onze collega's bouwen mee.")).toBe("“Onze collega's bouwen mee.”");
  });

  it("geeft niets terug bij een lege waarde, zodat er geen losse tekens komen", () => {
    expect(citaat("")).toBe("");
    expect(citaat("  “”  ")).toBe("");
  });
});
