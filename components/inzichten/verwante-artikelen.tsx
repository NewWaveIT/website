import { ArtikelKaart } from "@/components/artikel-kaart";
import type { Artikel } from "@/lib/inzichten";

/**
 * Drie artikelen onder het gelezen artikel.
 *
 * Het artikel eindigde met de laatste zin en daarna meteen de nieuwsbriefband:
 * geen enkele volgende stap voor wie net iets nuttigs heeft gelezen.
 *
 * De selectie is een voorkeursvolgorde, geen filter: eerst dezelfde discipline,
 * dan dezelfde sector, dan de nieuwste. Zo staan er altijd drie — een filter dat
 * niets vindt zou het blok laten verdwijnen op precies het artikel dat nergens
 * bij hoort.
 */
export function kiesVerwant(alle: Artikel[], huidig: Artikel, aantal = 3): Artikel[] {
  const anderen = alle.filter((a) => a.slug !== huidig.slug);
  const score = (a: Artikel) =>
    (a.discipline && a.discipline !== "Algemeen" && a.discipline === huidig.discipline ? 2 : 0) +
    (a.sector && a.sector !== "Algemeen" && a.sector === huidig.sector ? 1 : 0);
  // Stabiel: bij gelijke score blijft de bestaande volgorde (nieuwste eerst).
  return anderen
    .map((a, i) => ({ a, i, s: score(a) }))
    .sort((x, y) => y.s - x.s || x.i - y.i)
    .slice(0, aantal)
    .map((x) => x.a);
}

export function VerwanteArtikelen({
  artikelen,
  titel,
  meerLabel,
}: {
  artikelen: Artikel[];
  titel: string;
  meerLabel: string;
}) {
  if (artikelen.length === 0) return null;

  return (
    <section className="block verwant">
      <div className="wrap-wide">
        <h2 className="verwant-kop">{titel}</h2>
        <div className="cards3">
          {artikelen.map((a) => (
            <ArtikelKaart key={a.slug} artikel={a} meerLabel={meerLabel} />
          ))}
        </div>
      </div>
    </section>
  );
}
