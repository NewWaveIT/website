import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Award } from "lucide-react";
import { HeroSplit } from "@/components/home/hero-split";
import { HomeInteractions } from "@/components/home/home-interactions";
import { SectorSplit } from "@/components/sector-split";
import { ClientLogos, AWARD } from "@/components/home/client-logos";
import { CasesCarousel } from "@/components/home/cases-carousel";
import { SlotCta } from "@/components/layout/slot-cta";
import { getPagina } from "@/lib/paginas-data";
import { getKlantverhalen } from "@/lib/klantverhalen-data";
import { getInstapPerRichting } from "@/lib/services-data";
import type { ServiceRichting } from "@/lib/services";
import "./home.css";

export const metadata: Metadata = {
  title: "Business-specialist in Mendix, AI en strategie",
  description:
    "Wij maken van business en IT één beweging. Diepgaande sectorkennis in publieke sector, mobiliteit, banken, zorg en manufacturing, gecombineerd met Mendix, AI en strategie.",
  alternates: { canonical: "/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "The New Wave IT",
  description:
    "Business-specialist in Mendix, AI en strategie voor publieke sector, mobiliteit, banken, zorg en manufacturing.",
  url: "https://thenewwaveit.com",
  email: "hello@thenewwaveit.com",
  sameAs: ["https://www.linkedin.com/company/the-new-wave-it"],
};

export const revalidate = 300;

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
  const [t, instap, klantverhalen] = await Promise.all([
    getPagina("home"),
    getInstapPerRichting(),
    getKlantverhalen(),
  ]);
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* Hero */}
      <HeroSplit />

      {/* Klantenband */}
      <div className="proof">
        <div className="wrap-wide">
          <div className="proof-head">
            <span className="cap">Vertrouwd door</span>
            <a className="award" href={AWARD.url} target="_blank" rel="noopener noreferrer">
              <Award /> {AWARD.label}
            </a>
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
              product van één dag met een vaste prijs — daarna schaal je op wanneer het werkt.
            </p>
          </div>
          <div className="tabs" role="tablist">
            {instap.map(({ richting, naam }, i) => (
              <button
                className="tab"
                role="tab"
                aria-selected={i === 0}
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
                  <div className="dienst-prijs">
                    {s.prijzen.map((p) => (
                      <span key={p.label}>
                        <strong>{p.label}</strong>
                        {p.variant ? ` ${p.variant}` : ""}
                      </span>
                    ))}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "var(--space-6)",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <Link href={`/contact?dienst=${s.slug}`} className="btn btn-outline">
                      {s.ctaLabel}
                    </Link>
                    <Link
                      href={href}
                      style={{
                        fontWeight: "var(--fw-semibold)",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      Alle {naam}-diensten <ArrowRight style={{ width: 15, height: 15 }} />
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
        </div>
      </section>

      {/* Sectoren */}
      <section className="block sectoren">
        <div className="wrap-wide">
          <SectorSplit
            kicker="Onze sectoren"
            titel="Wij spreken de taal van jouw sector."
            intro="Wij kennen de regels, de systemen en de druk waaronder jouw organisatie werkt. Daardoor leveren we sneller iets dat écht past."
            items={[
              {
                naam: "Publieke sector",
                href: "/sectoren/publieke-sector",
                cap: "Publieke sector",
                theme: "publiek",
                hook: "“Onze doorlooptijden groeien sneller dan onze formatie.”",
                chal: "Digitale dienstverlening die burgers vertrouwen: sneller vergunnen, minder papier, volledig aantoonbaar.",
                kpi: "Sneller vergunnen",
              },
              {
                naam: "Mobiliteit & logistiek",
                href: "/sectoren/mobiliteit",
                cap: "Mobiliteit & logistiek",
                theme: "mobiliteit",
                hook: "“Onze assets worden slimmer, onze systemen niet.”",
                chal: "Realtime grip op planning, assets en stromen, van de eerste kilometer tot de laatste.",
                kpi: "Realtime inzicht",
              },
              {
                naam: "Banken & financials",
                href: "/sectoren/banken",
                cap: "Banken & financials",
                theme: "banken",
                hook: "“Elke innovatie strandt op compliance.”",
                chal: "Compliant, veilig en schaalbaar, zonder in te leveren op snelheid of gebruiksgemak.",
                kpi: "Audit-proof",
              },
              {
                naam: "Zorg",
                href: "/sectoren/zorg",
                cap: "Zorg",
                theme: "zorg",
                hook: "“Onze mensen registreren meer dan ze zorgen.”",
                chal: "Meer tijd voor de patiënt door betrouwbare, veilige processen die zorgprofessionals ontlasten.",
                kpi: "Minder registratielast",
              },
              {
                naam: "Manufacturing",
                href: "/sectoren/manufacturing",
                cap: "Manufacturing",
                theme: "manufacturing",
                hook: "“Onze machines produceren data die niemand gebruikt.”",
                chal: "Productie die meebeweegt met de vraag, gestuurd op data, van shopfloor tot boardroom.",
                kpi: "Kortere omsteltijden",
              },
            ]}
            moreHref="/sectoren"
            moreTitel="Niet jouw sector? Plan een verkenning"
          />
        </div>
      </section>

      {/* Klantverhalen */}
      <section className="block featured">
        <div className="wrap-wide">
          <div className="sec-head">
            <div className="kicker">Klantverhalen</div>
            <h2
              style={{
                fontSize: "var(--text-3xl)",
                fontWeight: "var(--fw-extrabold)",
                margin: "var(--space-4) 0 0",
              }}
            >
              Business-impact, geen technische anekdote.
            </h2>
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
              <h2
                style={{
                  fontSize: "var(--text-3xl)",
                  fontWeight: "var(--fw-extrabold)",
                  margin: "var(--space-4) 0 var(--space-5)",
                }}
              >
                {t.mensenTitel}
              </h2>
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
                style={{ marginBottom: "var(--space-5)" }}
              >
                <Award /> {AWARD.label}
              </a>
              <div
                style={{
                  display: "flex",
                  gap: "var(--space-5)",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <Link href="/over-ons" className="btn btn-dark">
                  Ontmoet ons team
                </Link>
                <Link
                  href="/werken-bij"
                  style={{
                    fontWeight: "var(--fw-semibold)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  Werken bij The New Wave IT <ArrowRight style={{ width: 15, height: 15 }} />
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
                  style={{ objectPosition: "top" }}
                />
              </div>
              <div className="slot small">
                <Image
                  src="/assets/photos/portret-bordeaux.webp"
                  alt="Teamlid van The New Wave IT"
                  fill
                  sizes="(max-width: 900px) 50vw, 20vw"
                  style={{ objectPosition: "top" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inzichten */}
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
            <article className="post">
              <Link
                href="/inzichten/novi-ai-collega-overheid"
                className="cover"
                style={{
                  backgroundImage: "url('/assets/photos/project-parkeergarage-rotterdam.webp')",
                  backgroundPosition: "center",
                }}
              >
                <span className="cat">Publieke sector</span>
              </Link>
              <div className="pbody">
                <div className="meta">Leestijd 4 min · 24 juni 2025</div>
                <h3>Novi: de AI-collega die overheidsteams grip geeft op digitalisering</h3>
                <p>
                  Hoe een zelflerende AI-assistent nieuwe medewerkers sneller inwerkt en 24/7
                  antwoord geeft op IT-vragen.
                </p>
                <Link href="/inzichten/novi-ai-collega-overheid" className="more">
                  Lees meer <ArrowRight />
                </Link>
              </div>
            </article>
            <article className="post">
              <Link
                href="/inzichten/security-mendix-in-de-zorg"
                className="cover"
                style={{
                  backgroundImage: "url('/assets/photos/team-overleg-flipover.webp')",
                  backgroundPosition: "center",
                }}
              >
                <span className="cat">Zorg</span>
              </Link>
              <div className="pbody">
                <div className="meta">Leestijd 4 min · 16 mei 2025</div>
                <h3>Security &amp; Mendix in de zorg: bewustwording, geen blok aan het been</h3>
                <p>
                  Waarom security in Mendix-applicaties een mindset moet zijn, van developer tot
                  zorgverlener.
                </p>
                <Link href="/inzichten/security-mendix-in-de-zorg" className="more">
                  Lees meer <ArrowRight />
                </Link>
              </div>
            </article>
            <article className="post">
              <Link
                href="/inzichten/van-0-naar-100-apps-in-een-bank"
                className="cover"
                style={{
                  backgroundImage: "url('/assets/photos/team-overleg-cafe.webp')",
                  backgroundPosition: "center",
                }}
              >
                <span className="cat">Banken</span>
              </Link>
              <div className="pbody">
                <div className="meta">Leestijd 8 min · 10 april 2026</div>
                <h3>Van 0 naar 100 apps in een bank: de 5 fases die wél werken</h3>
                <p>
                  Waarom schalen in een bank sneller complex wordt dan elders, en welke keuzes het
                  verschil maken.
                </p>
                <Link href="/inzichten/van-0-naar-100-apps-in-een-bank" className="more">
                  Lees meer <ArrowRight />
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* CTA */}
      <SlotCta titel={t.ctaTitel ?? ""} knop={t.ctaKnop} />

      <HomeInteractions />
    </div>
  );
}
