import { JsonLd } from "@/components/json-ld";
import { cacheLife } from "next/cache";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Award } from "lucide-react";
import { HeroSector } from "@/components/home/hero-sector";
import { HomeInteractions } from "@/components/home/home-interactions";
import { SectorSplit } from "@/components/sector-split";
import { ClientLogos, AWARD } from "@/components/home/client-logos";
import { CasesCarousel } from "@/components/home/cases-carousel";
import { MarqueePauze } from "@/components/home/marquee-pauze";
import { SlotCta } from "@/components/layout/slot-cta";
import { getPagina } from "@/lib/paginas-data";
import { getKlantverhalen } from "@/lib/klantverhalen-data";
import { getArtikelen } from "@/lib/inzichten-data";
import { getCatalogus, getInstapPerRichting } from "@/lib/services-data";
import { getSectorKaarten } from "@/lib/sectoren-detail-data";
import type { ServiceRichting } from "@/lib/services";
import { SITE_URL } from "@/lib/site";
import "./home.css";

export const metadata: Metadata = {
  title: "Business-specialist in Mendix, AI en strategie",
  description:
    "Wij maken van business en IT één beweging: sectorkennis in publieke sector, mobiliteit, banken, zorg en manufacturing, met Mendix, AI en strategie.",
  alternates: { canonical: "/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "The New Wave IT",
  description:
    "Business-specialist in Mendix, AI en strategie voor publieke sector, mobiliteit, banken, zorg en manufacturing.",
  url: SITE_URL,
  email: "hello@thenewwaveit.com",
  sameAs: ["https://www.linkedin.com/company/the-new-wave-it"],
};

/** Beeld per richting bij de dienstensectie. */
const DIENST_FOTO: Record<ServiceRichting, string> = {
  mendix: "/assets/photos/overleg-laptop.webp",
  ai: "/assets/photos/team-overleg-scherm.webp",
  strategie: "/assets/photos/klantgesprek-tafel.webp",
};
const DIENST_ALT: Record<ServiceRichting, string> = {
  mendix: "Consultants werken samen aan een Mendix-applicatie",
  ai: "Team bespreekt een AI-toepassing",
  strategie: "Strategiesessie aan tafel",
};

export default async function HomePage() {
  "use cache";
  cacheLife("content");

  const [t, instap, catalogus, sectoren, klantverhalen, artikelen] = await Promise.all([
    getPagina("home"),
    getInstapPerRichting(),
    getCatalogus(),
    getSectorKaarten(),
    getKlantverhalen(),
    getArtikelen(),
  ]);
  const inzichten = artikelen.slice(0, 3);
  const cases = klantverhalen.map((k) => ({
    slug: k.slug,
    tag: k.tag || k.sector,
    image: k.image,
    quote: k.quote || k.pull,
    naam: k.quoteNaam,
    rol: k.quoteRol,
    impact: k.impact,
  }));
  return (
    <div className="home">
      <JsonLd data={jsonLd} />

      {/* Hero */}
      <HeroSector />

      {/* Klantenband */}
      <div className="proof">
        <div className="wrap-wide">
          <div className="proof-head">
            <span className="cap">Vertrouwd door</span>
            <a className="award" href={AWARD.url} target="_blank" rel="noopener noreferrer">
              <Award /> {AWARD.label}
            </a>
            <MarqueePauze />
          </div>
          <ClientLogos />
        </div>
      </div>

      {/* Diensten — instapdienst per richting, rechtstreeks uit de catalogus */}
      <section className="block diensten" id="diensten">
        <div className="wrap-wide">
          <div className="sec-head">
            <div className="kicker">Hoe wij het doen</div>
            <h2>Drie richtingen. Begin met wat je in één dag kunt doen.</h2>
            <p>
              Mendix, AI en strategie zijn de ingangen. Elke richting begint met een concreet
              product van één dag met een vaste prijs. Daarna schaal je op wanneer het werkt.
            </p>
          </div>
          <div className="tabs" role="tablist">
            {instap.map(({ richting, naam }, i) => (
              <button
                className="tab"
                role="tab"
                id={`tab-${richting}`}
                aria-selected={i === 0}
                aria-controls={`panel-${richting}`}
                // Roving tabindex: alleen de actieve tab zit in de tabvolgorde,
                // de rest bereik je met de pijltoetsen (zie HomeInteractions).
                tabIndex={i === 0 ? 0 : -1}
                data-tab={richting}
                key={richting}
              >
                {naam}
              </button>
            ))}
          </div>

          {instap.map(({ richting, naam, href, service: s }, i) =>
            s ? (
              <div
                className={`panel${i === 0 ? " active" : ""}`}
                id={`panel-${richting}`}
                role="tabpanel"
                aria-labelledby={`tab-${richting}`}
                tabIndex={0}
                data-panel={richting}
                key={richting}
              >
                <div>
                  <div className="dienst-meta">
                    Instap · {s.duur}
                    {s.groepsgrootte ? ` · ${s.groepsgrootte}` : ""}
                  </div>
                  <h3>{s.naam}</h3>
                  <p>{s.pitch}</p>
                  <ul>
                    {s.resultaten.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                  {s.prijzen.length > 0 && (
                    <div className="dienst-prijs">
                      {s.prijzen.map((p) => (
                        <span key={p.label}>
                          <strong>{p.label}</strong>
                          {p.variant ? ` ${p.variant}` : ""}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="acties">
                    <Link
                      href={`/contact?dienst=${s.slug}`}
                      className="btn btn-outline"
                      aria-label={`${s.ctaLabel}, ${s.naam}`}
                    >
                      {s.ctaLabel}
                    </Link>
                    <Link href={href} className="tekstlink">
                      Alle {naam}-diensten <ArrowRight />
                    </Link>
                  </div>
                </div>
                <div className="media-img">
                  <Image
                    src={DIENST_FOTO[richting]}
                    alt={DIENST_ALT[richting]}
                    fill
                    sizes="(max-width: 900px) 100vw, 45vw"
                  />
                </div>
              </div>
            ) : null,
          )}
          {/* De tabs tonen per richting alleen de instapdienst; zonder deze regel
              is nergens te zien dat er een hele catalogus achter zit. Het aantal
              komt uit de catalogus zelf, zodat het niet kan verlopen. */}
          {catalogus.length > 0 && (
            <p className="catalogus-cue">
              Dit is de instapdienst per richting.{" "}
              <Link href="/diensten">
                Bekijk alle {catalogus.length} diensten <ArrowRight />
              </Link>
            </p>
          )}
        </div>
      </section>

      {/* Sectoren */}
      <section className="block sectoren">
        <div className="wrap-wide">
          <SectorSplit
            kicker="Onze sectoren"
            titel="Wij spreken de taal van jouw sector."
            intro="Wij kennen de regels, de systemen en de druk waaronder jouw organisatie werkt. Daardoor leveren we sneller iets dat écht past."
            items={sectoren.map((s) => ({
              naam: s.naam,
              href: s.href,
              cap: s.naam,
              theme: s.theme,
              hook: s.hook,
              chal: s.pitch,
              kpi: s.kpiLabel,
            }))}
            moreHref="/sectoren"
            moreTitel="Niet jouw sector? Plan een verkenning"
          />
        </div>
      </section>

      {/* Klantverhalen */}
      <section className="block featured">
        <div className="wrap-wide">
          <div className="eyebrow-row">
            <div>
              <div className="kicker on-dark">Klantverhalen</div>
              <h2>Business-impact, geen technische anekdote.</h2>
            </div>
            <Link href="/klantverhalen" className="btn btn-ghost-on btn-sm">
              Alle klantverhalen <ArrowRight />
            </Link>
          </div>
          <CasesCarousel items={cases} />
        </div>
      </section>

      {/* Mensen */}
      <section className="block mensen">
        <div className="wrap-wide">
          <div className="grid">
            <div className="txt">
              <div className="kicker">{t.mensenKicker}</div>
              <h2>{t.mensenTitel}</h2>
              <p>{t.mensenP1}</p>
              <p>{t.mensenP2}</p>
              <p>
                Dat onze mensen hier met plezier werken, blijkt ook extern: The New Wave IT is
                bekroond in de Computable Werkgevers Awards 2025.
              </p>
              <a
                className="award-badge on-light"
                href={AWARD.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Award /> {AWARD.label}
              </a>
              <div className="acties">
                <Link href="/over-ons" className="btn btn-primary">
                  Ontmoet ons team
                </Link>
                <Link href="/werken-bij" className="tekstlink">
                  Werken bij The New Wave IT <ArrowRight />
                </Link>
              </div>
            </div>
            <div className="collage">
              <div className="slot big">
                <Image
                  src="/assets/photos/overleg-lachend.webp"
                  alt="Consultants van The New Wave IT in overleg"
                  fill
                  sizes="(max-width: 900px) 100vw, 35vw"
                />
              </div>
              <div className="slot small">
                <Image
                  src="/assets/photos/portret-blauw.webp"
                  alt="Teamlid van The New Wave IT"
                  fill
                  sizes="(max-width: 900px) 50vw, 20vw"
                  className="uitsnede-boven"
                />
              </div>
              <div className="slot small">
                <Image
                  src="/assets/photos/portret-bordeaux.webp"
                  alt="Teamlid van The New Wave IT"
                  fill
                  sizes="(max-width: 900px) 50vw, 20vw"
                  className="uitsnede-boven"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inzichten — de drie nieuwste artikelen, uit dezelfde bron als
          /inzichten. Ze stonden hier hardgecodeerd, met ingekorte titels en
          samenvattingen die daardoor uit de pas liepen met het CMS. */}
      {inzichten.length > 0 && (
        <section className="block" id="inzichten">
          <div className="wrap-wide">
            <div className="eyebrow-row">
              <div>
                <div className="kicker">Inzichten &amp; thought leadership</div>
                <h2>Sectorkennis die je vooruit denkt</h2>
              </div>
              <Link href="/inzichten" className="btn btn-outline btn-sm">
                Alle inzichten <ArrowRight />
              </Link>
            </div>
            <div className="cards3">
              {inzichten.map((a) => (
                <article className="post" key={a.slug}>
                  <Link href={`/inzichten/${a.slug}`} className="cover">
                    <Image src={a.image} alt="" fill sizes="(max-width: 900px) 100vw, 33vw" />
                    <span className="cat">{a.cat}</span>
                  </Link>
                  <div className="pbody">
                    <div className="meta">
                      Leestijd {a.leestijd} · {a.datum}
                    </div>
                    <h3>{a.titel}</h3>
                    <p>{a.intro}</p>
                    <Link href={`/inzichten/${a.slug}`} className="more">
                      Lees meer <ArrowRight />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <SlotCta titel={t.ctaTitel ?? ""} knop={t.ctaKnop} />

      <HomeInteractions />
    </div>
  );
}
