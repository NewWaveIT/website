import { describe, expect, it } from "vitest";
import { isPaginawissel, type LinkKlik } from "@/lib/navigatie";

const HUIDIG = "https://thenewwaveit.com/diensten?x=1";
const klik = (over: Partial<LinkKlik>): LinkKlik => ({
  href: "/over-ons",
  target: null,
  download: false,
  knop: 0,
  modifier: false,
  ...over,
});

describe("isPaginawissel", () => {
  it("telt een gewone interne link naar een andere pagina", () => {
    expect(isPaginawissel(klik({}), HUIDIG)).toBe(true);
    expect(isPaginawissel(klik({ href: "https://thenewwaveit.com/contact" }), HUIDIG)).toBe(true);
  });

  it("telt een andere zoekopdracht op dezelfde pagina als navigatie", () => {
    expect(isPaginawissel(klik({ href: "/diensten?x=2" }), HUIDIG)).toBe(true);
  });

  /* Een anker of dezelfde pagina veroorzaakt geen paginawissel, dus daar mag de indicator
     niet voor starten: een balk die nooit klaar komt is erger dan geen balk. */
  it("negeert een link naar hetzelfde adres of alleen een ander anker", () => {
    expect(isPaginawissel(klik({ href: "/diensten?x=1" }), HUIDIG)).toBe(false);
    expect(isPaginawissel(klik({ href: "/diensten?x=1#prijs" }), HUIDIG)).toBe(false);
    expect(isPaginawissel(klik({ href: "#prijs" }), HUIDIG)).toBe(false);
  });

  it("negeert een andere herkomst", () => {
    expect(isPaginawissel(klik({ href: "https://example.com/" }), HUIDIG)).toBe(false);
    expect(isPaginawissel(klik({ href: "mailto:orders@thenewwaveit.com" }), HUIDIG)).toBe(false);
    expect(isPaginawissel(klik({ href: "tel:+31610751254" }), HUIDIG)).toBe(false);
  });

  it("negeert nieuwe tabbladen, downloads, modifiers en niet-linkermuisknoppen", () => {
    expect(isPaginawissel(klik({ target: "_blank" }), HUIDIG)).toBe(false);
    expect(isPaginawissel(klik({ download: true }), HUIDIG)).toBe(false);
    expect(isPaginawissel(klik({ modifier: true }), HUIDIG)).toBe(false);
    expect(isPaginawissel(klik({ knop: 1 }), HUIDIG)).toBe(false);
  });

  it("telt target=_self wel", () => {
    expect(isPaginawissel(klik({ target: "_self" }), HUIDIG)).toBe(true);
  });

  it("valt niet om over een ongeldige URL", () => {
    expect(isPaginawissel(klik({ href: "http://" }), HUIDIG)).toBe(false);
    expect(isPaginawissel(klik({}), "geen-url")).toBe(false);
  });
});
