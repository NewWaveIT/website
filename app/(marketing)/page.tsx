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

export default async function HomePage() {
  const t = await getPagina("home");
  const cases = (await getKlantverhalen()).map((k) => ({
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

      {/* Diensten */}
      <section className="block diensten" id="diensten">
        <div className="wrap-wide">
          <div className="sec-head">
            <div className="kicker">Hoe wij het doen</div>
            <h2>Technologie als middel: drie manieren waarop we versnellen</h2>
            <p>
              Technologie als middel: drie manieren waarop we versnellen. We kiezen wat jouw
              vraagstuk oplost, niet wat toevallig in de mode is.
            </p>
          </div>
          <div className="tabs" role="tablist">
            <button className="tab" role="tab" aria-selected="true" data-tab="mendix">
              Mendix
            </button>
            <button className="tab" role="tab" aria-selected="false" data-tab="ai">
              AI
            </button>
            <button className="tab" role="tab" aria-selected="false" data-tab="strategie">
              Strategie
            </button>
          </div>

          <div className="panel active" data-panel="mendix">
            <div>
              <h3>Mendix-applicaties op maat</h3>
              <p>
                Op maat gemaakte low-code applicaties, gebouwd in weken in plaats van maanden. Vaak
                staat er binnen een week een eerste werkende versie, en binnen drie maanden een live
                applicatie.
              </p>
              <ul>
                <li>Vaak een eerste werkende versie binnen een week</li>
                <li>Live binnen enkele maanden, niet binnen een jaar</li>
                <li>Kennisoverdracht zodat je team zelf verder kan</li>
              </ul>
              <div
                style={{
                  display: "flex",
                  gap: "var(--space-6)",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <Link href="/contact" className="btn btn-outline">
                  Bespreek jouw applicatie
                </Link>
                <Link
                  href="/diensten/mendix"
                  style={{
                    fontWeight: "var(--fw-semibold)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  Meer over Mendix <ArrowRight style={{ width: 15, height: 15 }} />
                </Link>
              </div>
            </div>
            <div className="media-img">
              <Image
                src="/assets/photos/overleg-laptop.webp"
                alt="Consultants werken samen aan een Mendix-applicatie"
                fill
                sizes="(max-width: 900px) 100vw, 45vw"
              />
            </div>
          </div>

          <div className="panel" data-panel="ai">
            <div>
              <h3>AI die processen echt verbetert</h3>
              <p>
                Strategische inzet van AI binnen je bestaande IT-landschap. Doorgaans binnen zes
                weken een werkend, geautomatiseerd proces. Geen hype, wel resultaat dat de mens
                centraal stelt.
              </p>
              <ul>
                <li>AI-scan van je processen en datalandschap</li>
                <li>Doorgaans een werkend proces binnen 6 weken</li>
                <li>Verantwoorde, uitlegbare inzet van AI</li>
              </ul>
              <div
                style={{
                  display: "flex",
                  gap: "var(--space-6)",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <Link href="/contact" className="btn btn-outline">
                  Doe de AI-scan
                </Link>
                <Link
                  href="/diensten/ai"
                  style={{
                    fontWeight: "var(--fw-semibold)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  Meer over AI <ArrowRight style={{ width: 15, height: 15 }} />
                </Link>
              </div>
            </div>
            <div className="media-img">
              <Image
                src="/assets/photos/team-overleg-scherm.webp"
                alt="Team bespreekt een AI-toepassing"
                fill
                sizes="(max-width: 900px) 100vw, 45vw"
              />
            </div>
          </div>

          <div className="panel" data-panel="strategie">
            <div>
              <h3>Business en IT, verbonden</h3>
              <p>
                Wij ontwikkelen je strategie niet los van de uitvoering. In één dag met je directie
                leveren we een scherpe roadmap én een eerste werkende app: Strategy &amp; App in a
                Day. Zo weet je dezelfde dag nog of de koers klopt.
              </p>
              <ul>
                <li>Strategie en app opgeleverd in één dag</li>
                <li>Architectuur- en portfoliokeuzes die standhouden</li>
                <li>Begeleiding bij de verandering, niet alleen het plan</li>
              </ul>
              <div
                style={{
                  display: "flex",
                  gap: "var(--space-6)",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <Link href="/contact" className="btn btn-outline">
                  Plan een Strategy &amp; App in a Day
                </Link>
                <Link
                  href="/diensten/strategie"
                  style={{
                    fontWeight: "var(--fw-semibold)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  Meer over Strategie <ArrowRight style={{ width: 15, height: 15 }} />
                </Link>
              </div>
            </div>
            <div className="media-img">
              <Image
                src="/assets/photos/klantgesprek-tafel.webp"
                alt="Strategiesessie aan tafel"
                fill
                sizes="(max-width: 900px) 100vw, 45vw"
              />
            </div>
          </div>
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
                  backgroundImage: "url('/assets/photos/klantgesprek-tafel.webp')",
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
                  backgroundImage: "url('/assets/photos/overleg-lachend.webp')",
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
                  backgroundImage: "url('/assets/photos/overleg-laptop.webp')",
                  backgroundPosition: "center 30%",
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
