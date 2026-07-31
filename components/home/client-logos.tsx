/**
 * Klanten voor de "Vertrouwd door"-wall. Zet een `logo`-pad zodra er een
 * officieel logobestand in /public/assets/logos/klanten/ staat; anders toont
 * de tegel een nette tekst-wordmark als placeholder.
 */
// `w`/`h` = intrinsieke verhouding van het logobestand; nodig zodat de browser
// de breedte reserveert vóór het laden (anders vallen de marquee-helften samen).
export type Client = { naam: string; logo?: string; w?: number; h?: number };

// Zet een `logo`-pad zodra het officiële bestand in /public/assets/logos/klanten/
// staat (SVG of transparante PNG). Zolang dat er niet is, toont de tegel een
// nette tekst-wordmark.
export const CLIENTS: Client[] = [
  { naam: "COA", logo: "/assets/logos/klanten/coa.svg", w: 71, h: 50 },
  { naam: "Gemeente Rotterdam", logo: "/assets/logos/klanten/gemeente-rotterdam.svg", w: 320, h: 64 },
  { naam: "Rabobank", logo: "/assets/logos/klanten/rabobank.svg", w: 130, h: 24 },
  { naam: "Van Mossel", logo: "/assets/logos/klanten/van-mossel.svg", w: 195, h: 30 },
  { naam: "Netradyne", logo: "/assets/logos/klanten/netradyne.svg", w: 261, h: 44 },
  { naam: "AutoBinck", logo: "/assets/logos/klanten/autobinck.svg", w: 194, h: 48 },
  { naam: "XXImo", logo: "/assets/logos/klanten/xximo.svg", w: 124, h: 37 },
  { naam: "Welcome app", logo: "/assets/logos/klanten/welcome-app.svg", w: 68, h: 42 },
  // Nog aan te leveren officiële bestanden (schone SVG of transparante PNG):
  // Moove is opgegaan in Netradyne (zelfde logo) — voorlopig wordmark.
  { naam: "Moove Connected Mobility" }, // moove.svg
  { naam: "De Derde Linden Groep" }, // derde-linden-groep.svg
];

export { AWARD } from "@/lib/award";

export function ClientLogos() {
  return (
    <div className="logo-track">
      {[0, 1].map((dup) => (
        <div className="logo-set" key={dup} aria-hidden={dup === 1}>
          {CLIENTS.map((c) => (
            <div className="logo-tile" key={c.naam}>
              {c.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={c.logo} alt={c.naam} className="logo-img" width={c.w} height={c.h} loading="lazy" />
              ) : (
                <span className="wordmark">{c.naam}</span>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
