import Image from "next/image";

/**
 * Klanten voor de "Vertrouwd door"-wall. Zet een `logo`-pad zodra er een
 * officieel logobestand in /public/assets/logos/klanten/ staat; anders toont
 * de tegel een nette tekst-wordmark als placeholder.
 */
export type Client = { naam: string; logo?: string };

export const CLIENTS: Client[] = [
  { naam: "COA" },
  { naam: "Gemeente Rotterdam" },
  { naam: "Rabobank" },
  { naam: "Van Mossel" },
  { naam: "Netradyne" },
  { naam: "Welcome app" },
  { naam: "Moove Connected Mobility" },
  { naam: "AutoBinck" },
  { naam: "XXImo" },
  { naam: "De Derde Linden Groep" },
];

export const AWARD = {
  label: "#4 · Computable Werkgevers Awards 2025",
  url: "https://computable.nl/e-magazine/editie-04-2025/pagina-03-werkgeversonderzoek-ict/",
};

export function ClientLogos() {
  return (
    <div className="logo-track">
      {[0, 1].map((dup) => (
        <div className="logo-set" key={dup} aria-hidden={dup === 1}>
          {CLIENTS.map((c) => (
            <div className="logo-tile" key={c.naam}>
              {c.logo ? (
                <Image
                  src={c.logo}
                  alt={c.naam}
                  width={160}
                  height={40}
                  style={{ height: 30, width: "auto", objectFit: "contain" }}
                />
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
