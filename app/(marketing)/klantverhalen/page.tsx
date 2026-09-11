import { cacheLife } from "next/cache";
import type { Metadata } from "next";
import { citaat } from "@/lib/utils";
import Link from "next/link";
import { PaginaHero } from "@/components/layout/pagina-hero";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getKlantverhalen } from "@/lib/klantverhalen-data";
import { getSectorKaarten } from "@/lib/sectoren-detail-data";
import { SECTOR_ICONEN } from "@/components/sector-iconen";
import { SectorHeroAnim } from "@/components/sector-hero-anim";
import { SlotCta } from "@/components/layout/slot-cta";
import "./klantverhalen.css";

export const metadata: Metadata = {
  title: "Klantverhalen — resultaat dat je kunt navragen",
  description:
    "Verhalen van organisaties in de publieke sector, mobiliteit, banken, zorg en manufacturing, verteld met de cijfers erbij.",
  alternates: { canonical: "/klantverhalen" },
};

/**
 * De drie cijfers per sector. Alleen deze staan nog in de pagina: naam, icoon en
 * pitch komen uit `cms_sectoren`, zodat een tekstwijziging in de admin hier
 * meteen doorwerkt.
 *
 * Deze getallen hebben géén bron in de sectordata — er stond een comment dat ze
 * "1-op-1 uit lib/sectoren-detail.ts (kpis)" kwamen, maar dat veld bestaat daar
 * niet en "6\u201310\u00d7" komt er nul keer in voor. Het is één algemene
 * low-codeclaim die bij alle vijf de sectoren herhaald wordt. Bewust laten
 * staan tot er cijfers zijn die je kunt onderbouwen.
 */
const SECTOR_KPIS: Record<string, { n: string; l: string }[]> = {
  "publieke-sector": [
    { n: "Korter", l: "Doorlooptijd van aanvragen" },
    { n: "Sneller", l: "Live dan met traditionele bouw" },
    { n: "Auditproof", l: "En AVG-compliant opgeleverd" },
  ],
  mobiliteit: [
    { n: "Realtime", l: "Inzicht in assets en stromen" },
    { n: "6–10×", l: "Sneller live met low-code" },
    { n: "24/7", l: "Beschikbaar en beheersbaar" },
  ],
  banken: [
    { n: "Audit-proof", l: "Herleidbaar en beheerst" },
    { n: "6–10×", l: "Sneller live met low-code" },
    { n: "100%", l: "Binnen toezicht en beleid" },
  ],
  zorg: [
    { n: "Minder", l: "Registratielast" },
    { n: "6–10×", l: "Sneller live met low-code" },
    { n: "100%", l: "Veilig en gekoppeld aan je EPD" },
  ],
  manufacturing: [
    { n: "Kortere", l: "Omsteltijden en doorlooptijd" },
    { n: "6–10×", l: "Sneller live met low-code" },
    { n: "Realtime", l: "Zicht van shopfloor tot boardroom" },
  ],
};

export default async function KlantverhalenPage() {
  "use cache";
  cacheLife("content");

  const [verhalen, sectoren] = await Promise.all([getKlantverhalen(), getSectorKaarten()]);
  const featured = verhalen[0];
  return (
    <div className="p-klanten">
      <PaginaHero
        kruimels={[{ naam: "Klantverhalen", pad: "/klantverhalen" }]}
        kicker="Klantverhalen"
        titel="Resultaat dat je kunt "
        accent="navragen"
        staart="."
        lead="Business-impact, geen technische anekdote. Hier laten we zien wat er daadwerkelijk verandert bij een klant als strategie, Mendix en AI samenkomen: minder handwerk, snellere processen, meetbaar resultaat."
        achtergrond={<SectorHeroAnim theme="klantverhalen" />}
      />

      {featured && (
        <section className="block" style={{ background: "var(--eggshell)" }}>
          <div className="wrap-wide">
            <div className="sec-head">
              <div className="kicker">Uitgelicht</div>
              <h2>{featured.cardTitel}</h2>
            </div>
            <div className="case-mini">
              <div className="media">
                <Image
                  src={featured.image}
                  alt={featured.cardTitel}
                  fill
                  sizes="(max-width: 980px) 100vw, 45vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="body">
                <div className="kicker">{featured.tag}</div>
                <blockquote>{citaat(featured.quote)}</blockquote>
                <div className="who">
                  <strong>{featured.quoteNaam}</strong>, {featured.quoteRol}
                  <br />
                  <Link
                    href={`/klantverhalen/${featured.slug}`}
                    style={{
                      display: "inline-block",
                      marginTop: 14,
                      fontWeight: "var(--fw-semibold)",
                    }}
                  >
                    Lees het volledige verhaal →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="block">
        <div className="wrap-wide">
          <div className="sec-head">
            <div className="kicker">Onze sectoren</div>
            <h2>Nog geen klantverhaal in jouw sector? Dit is wat je kunt verwachten.</h2>
            <p>
              We werken pas kort genoeg samen met organisaties als Moove om al hun verhaal te kunnen
              delen — de rest volgt. Hieronder alvast het type resultaat dat we per sector al
              aantoonbaar leveren.
            </p>
          </div>
          <div className="belofte-grid">
            {sectoren.map((s) => {
              const Icon = SECTOR_ICONEN[s.icon];
              return (
                <Link href={s.href} className="belofte-card" key={s.slug}>
                  <span className="ic">
                    <Icon />
                  </span>
                  <h3>{s.naam}</h3>
                  <p>{s.pitch}</p>
                  <div className="kpis">
                    {(SECTOR_KPIS[s.slug] ?? []).map((k, i) => (
                      <div className="kpi" key={i}>
                        <div className="n">{k.n}</div>
                        <div className="l">{k.l}</div>
                      </div>
                    ))}
                  </div>
                  <span className="more">
                    Bekijk {s.naam.toLowerCase()} <ArrowRight />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <SlotCta titel="Herken je jouw vraagstuk in deze verhalen?" />
    </div>
  );
}
