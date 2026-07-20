import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Play,
  Building2,
  Truck,
  Landmark,
  HeartPulse,
  Factory,
  Compass,
  Target,
  Users,
  Workflow,
  ShieldCheck,
  Layers,
  BrainCircuit,
  Route,
  CalendarCheck,
  Gauge,
  FileDown,
} from "lucide-react";
import { HomeInteractions } from "@/components/home/home-interactions";
import { MobileHome } from "@/components/mobile/mobile-home";
import { getPagina } from "@/lib/paginas-data";
import "./home.css";
import "./mobile-home.css";

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
  return (
    <>
      <MobileHome home={t} />
      <div className="home only-desktop">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* Hero */}
      <section className="hero">
        <div className="hero-bg" />
        <canvas className="hero-wave" aria-hidden="true" />
        <div className="wrap-wide">
          <div className="hero-inner">
            <div className="kicker on-dark">{t.heroKicker}</div>
            <h1>
              {t.heroTitleStart}
              <span className="accent">{t.heroAccent}</span>.
            </h1>
            <p className="lead">{t.heroLead}</p>
            <div className="hero-actions">
              <Link href="/contact" className="btn btn-primary">
                {t.heroCtaPrimair} <ArrowRight />
              </Link>
              <Link href="/klantverhalen" className="play">
                <span className="circle">
                  <Play />
                </span>{" "}
                {t.heroCtaVideo}
              </Link>
            </div>
            <div className="sector-chips">
              <span className="lab">Kies jouw sector</span>
              <Link href="/sectoren/publieke-sector" className="chip">
                <Building2 /> Publieke sector
              </Link>
              <Link href="/sectoren/mobiliteit" className="chip">
                <Truck /> Mobiliteit
              </Link>
              <Link href="/sectoren/banken" className="chip">
                <Landmark /> Banken
              </Link>
              <Link href="/sectoren/zorg" className="chip">
                <HeartPulse /> Zorg
              </Link>
              <Link href="/sectoren/manufacturing" className="chip">
                <Factory /> Manufacturing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Klantenband */}
      <div className="proof">
        <div className="wrap-wide">
          <div className="clientband">
            <span className="cap">Vertrouwd door</span>
            <div className="track">
              <div className="set">
                <span className="client">COA</span>
                <span className="client">Gemeente Rotterdam</span>
                <span className="client">Rabobank</span>
                <span className="client">Netradyne</span>
                <span className="client">Welcome app</span>
                <span className="client">Van Mossel</span>
                <span className="client" aria-hidden="true">COA</span>
                <span className="client" aria-hidden="true">Gemeente Rotterdam</span>
                <span className="client" aria-hidden="true">Rabobank</span>
                <span className="client" aria-hidden="true">Netradyne</span>
                <span className="client" aria-hidden="true">Welcome app</span>
                <span className="client" aria-hidden="true">Van Mossel</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statement */}
      <section className="statement">
        <div className="wrap-wide">
          <div>
            <div className="kicker">{t.statementKicker}</div>
            <h2 style={{ marginTop: "var(--space-4)" }}>{t.statementTitel}</h2>
          </div>
          <p>{t.statementBody}</p>
        </div>
      </section>

      {/* Sectoren */}
      <section className="block sectoren">
        <div className="wrap-wide">
          <div className="eyebrow-row">
            <div>
              <div className="kicker">Onze sectoren</div>
              <h2>Vijf sectoren. Eén partner die de taal spreekt.</h2>
            </div>
            <p
              style={{
                maxWidth: "38ch",
                color: "var(--text-muted)",
                fontSize: "var(--text-md)",
                lineHeight: "var(--leading-relaxed)",
                margin: 0,
              }}
            >
              Wij kennen de regels, de systemen en de druk waaronder jouw
              organisatie werkt. Daardoor leveren we sneller iets dat écht past.
            </p>
          </div>
          <div className="sec-grid">
            <Link href="/sectoren/publieke-sector" className="sector-card">
              <div className="ic">
                <Building2 />
              </div>
              <h3>Publieke sector</h3>
              <p className="chal">
                Digitale dienstverlening die burgers vertrouwen: sneller
                vergunnen, minder papier, volledig aantoonbaar.
              </p>
              <span className="go">
                Bekijk sectoroplossing <ArrowRight />
              </span>
            </Link>
            <Link href="/sectoren/mobiliteit" className="sector-card">
              <div className="ic">
                <Truck />
              </div>
              <h3>Mobiliteit &amp; logistiek</h3>
              <p className="chal">
                Realtime grip op planning, assets en stromen, van de eerste
                kilometer tot de laatste.
              </p>
              <span className="go">
                Bekijk sectoroplossing <ArrowRight />
              </span>
            </Link>
            <Link href="/sectoren/banken" className="sector-card">
              <div className="ic">
                <Landmark />
              </div>
              <h3>Banken &amp; financials</h3>
              <p className="chal">
                Compliant, veilig en schaalbaar, zonder in te leveren op snelheid
                of gebruiksgemak.
              </p>
              <span className="go">
                Bekijk sectoroplossing <ArrowRight />
              </span>
            </Link>
            <Link href="/sectoren/zorg" className="sector-card">
              <div className="ic">
                <HeartPulse />
              </div>
              <h3>Zorg</h3>
              <p className="chal">
                Meer tijd voor de patiënt door betrouwbare, veilige processen die
                zorgprofessionals ontlasten.
              </p>
              <span className="go">
                Bekijk sectoroplossing <ArrowRight />
              </span>
            </Link>
            <Link href="/sectoren/manufacturing" className="sector-card">
              <div className="ic">
                <Factory />
              </div>
              <h3>Manufacturing</h3>
              <p className="chal">
                Productie die meebeweegt met de vraag, gestuurd op data, van
                shopfloor tot boardroom.
              </p>
              <span className="go">
                Bekijk sectoroplossing <ArrowRight />
              </span>
            </Link>
            <Link href="/sectoren" className="sector-card more">
              <div className="ic">
                <Compass />
              </div>
              <h3>Niet jouw sector?</h3>
              <p className="chal">
                We denken graag mee over jouw specifieke businessvraagstuk, ook
                buiten deze vijf markten.
              </p>
              <span className="go">
                Plan een verkenning <ArrowRight />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured case */}
      <section className="block featured">
        <div className="wrap-wide">
          <div className="sec-head">
            <div className="kicker">Klantverhaal</div>
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
          <div className="fcase">
            <div className="media">
              <div className="kbwrap">
                <div
                  className="kb"
                  style={{
                    backgroundImage:
                      "url('/assets/photos/team-presentatie-breed.png')",
                  }}
                />
              </div>
              <span className="tag">Publieke sector · COA</span>
              <button type="button" className="playbig" aria-label="Bekijk video">
                <Play />
              </button>
            </div>
            <div className="body">
              <div className="kick">Doorlooptijd aanvragen</div>
              <blockquote>
                “The New Wave IT denkt écht mee met onze uitdagingen. We leveren
                nu in weken wat eerst maanden kostte.”
              </blockquote>
              <div className="metrics">
                <div className="m">
                  <div className="n">-60%</div>
                  <div className="l">Doorlooptijd per aanvraag</div>
                </div>
                <div className="m">
                  <div className="n">8×</div>
                  <div className="l">Sneller live dan geraamd</div>
                </div>
                <div className="m">
                  <div className="n">100%</div>
                  <div className="l">Auditproof opgeleverd</div>
                </div>
              </div>
              <div className="who">
                <div className="av">PD</div>
                <div>
                  <div className="nm">Peter van Dam</div>
                  <div className="rl">IT Manager, COA</div>
                </div>
                <Link
                  href="/klantverhalen/coa"
                  className="btn btn-outline btn-sm"
                  style={{ marginLeft: "auto" }}
                >
                  Lees het verhaal
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Diensten */}
      <section className="block diensten" id="diensten">
        <div className="wrap-wide">
          <div className="sec-head">
            <div className="kicker">Hoe wij het doen</div>
            <h2>Technologie als middel: drie manieren waarop we versnellen</h2>
            <p>
              Onze sectorkennis wordt tastbaar via drie disciplines. We kiezen wat
              jouw vraagstuk oplost, niet wat toevallig in de mode is.
            </p>
          </div>
          <div className="tabs" role="tablist">
            <button className="tab" role="tab" aria-selected="true" data-tab="mendix">
              Mendix
            </button>
            <button className="tab" role="tab" aria-selected="false" data-tab="ai">
              AI
            </button>
            <button
              className="tab"
              role="tab"
              aria-selected="false"
              data-tab="strategie"
            >
              Strategie
            </button>
          </div>

          <div className="panel active" data-panel="mendix">
            <div>
              <h3>Mendix-applicaties op maat</h3>
              <p>
                Op maat gemaakte low-code applicaties die jouw specifieke
                uitdaging oplossen, een factor 6 tot 10 sneller dan traditionele
                bouw. Slim, efficiënt en toekomstbestendig.
              </p>
              <ul>
                <li>Van proof-of-concept tot productie in weken</li>
                <li>Schaalbare architectuur die met je meegroeit</li>
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
                src="/assets/photos/overleg-laptop.png"
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
                Strategische inzet van AI binnen je bestaande IT-landschap. Geen
                hype, wél oplossingen die processen verbeteren en de mens centraal
                stellen.
              </p>
              <ul>
                <li>AI-scan van je processen en datalandschap</li>
                <li>Praktische pilots met meetbaar resultaat</li>
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
                src="/assets/photos/team-overleg-scherm.png"
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
                Wij ontwikkelen jouw strategie en vertalen die direct naar
                praktische resultaten in de operatie. Zo werk je efficiënter en
                ben je klaar voor de toekomst.
              </p>
              <ul>
                <li>Heldere roadmap van ambitie naar uitvoering</li>
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
                  Plan een strategiegesprek
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
                  Meer over Strategie{" "}
                  <ArrowRight style={{ width: 15, height: 15 }} />
                </Link>
              </div>
            </div>
            <div className="media-img">
              <Image
                src="/assets/photos/klantgesprek-tafel.png"
                alt="Strategiesessie aan tafel"
                fill
                sizes="(max-width: 900px) 100vw, 45vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Waarom wij */}
      <section className="block waarom">
        <div className="wrap-wide">
          <div className="sec-head">
            <div className="kicker on-dark">{t.waaromKicker}</div>
            <h2
              style={{
                color: "#fff",
                fontSize: "var(--text-3xl)",
                fontWeight: "var(--fw-extrabold)",
                margin: "var(--space-4) 0 0",
              }}
            >
              {t.waaromTitel}
            </h2>
          </div>
          <div className="grid">
            <div className="wcard">
              <div className="ic">
                <Target />
              </div>
              <h4>{t.waarom1Titel}</h4>
              <p>{t.waarom1Tekst}</p>
            </div>
            <div className="wcard">
              <div className="ic">
                <Users />
              </div>
              <h4>{t.waarom2Titel}</h4>
              <p>{t.waarom2Tekst}</p>
            </div>
            <div className="wcard">
              <div className="ic">
                <Workflow />
              </div>
              <h4>{t.waarom3Titel}</h4>
              <p>{t.waarom3Tekst}</p>
            </div>
            <div className="wcard">
              <div className="ic">
                <ShieldCheck />
              </div>
              <h4>{t.waarom4Titel}</h4>
              <p>{t.waarom4Tekst}</p>
            </div>
          </div>
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
                  Werken bij The New Wave IT{" "}
                  <ArrowRight style={{ width: 15, height: 15 }} />
                </Link>
              </div>
            </div>
            <div className="collage">
              <div className="slot big">
                <Image
                  src="/assets/photos/overleg-lachend.png"
                  alt="Consultants van The New Wave IT in overleg"
                  fill
                  sizes="(max-width: 900px) 100vw, 35vw"
                />
              </div>
              <div className="slot small">
                <Image
                  src="/assets/photos/portret-blauw.png"
                  alt="Teamlid van The New Wave IT"
                  fill
                  sizes="(max-width: 900px) 50vw, 20vw"
                  style={{ objectPosition: "top" }}
                />
              </div>
              <div className="slot small">
                <Image
                  src="/assets/photos/portret-bordeaux.png"
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

      {/* Word een Waver */}
      <section className="block joinus">
        <div className="wrap-wide">
          <div className="grid">
            <div>
              <div className="kicker on-dark">{t.joinusKicker}</div>
              <h2>{t.joinusTitel}</h2>
              <p className="lead">{t.joinusLead}</p>
              <div className="roles">
                <Link href="/vacatures/lead-mendix-consultant" className="role">
                  <Layers /> Lead Mendix Consultant
                </Link>
                <Link href="/vacatures/ai-engineer" className="role">
                  <BrainCircuit /> AI Engineer
                </Link>
                <Link href="/vacatures/business-consultant" className="role">
                  <Route /> Business Consultant
                </Link>
              </div>
              <div className="actions">
                <Link href="/werken-bij" className="btn btn-primary">
                  Bekijk alle vacatures <ArrowRight />
                </Link>
                <Link href="/werken-bij#cultuur" className="btn btn-ghost-dark">
                  Lees over onze cultuur
                </Link>
              </div>
            </div>
            <div className="figure">
              <Image
                src="/assets/photos/team-presentatie-breed.png"
                alt="Wavers tijdens een kennissessie"
                fill
                sizes="(max-width: 900px) 100vw, 45vw"
              />
              <div className="count">
                <span className="num">3</span>
                <span className="lbl">open rollen</span>
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
                href="/inzichten/vergunningverlening-in-weken"
                className="cover"
                style={{
                  backgroundImage: "url('/assets/photos/klantgesprek-tafel.png')",
                  backgroundPosition: "center",
                }}
              >
                <span className="cat">Publieke sector</span>
              </Link>
              <div className="pbody">
                <div className="meta">Leestijd 4 min · 15 maart 2026</div>
                <h3>Vergunningverlening in weken, niet maanden</h3>
                <p>
                  Hoe gemeenten met low-code de doorlooptijd van aanvragen
                  structureel verkorten.
                </p>
                <Link
                  href="/inzichten/vergunningverlening-in-weken"
                  className="more"
                >
                  Lees meer <ArrowRight />
                </Link>
              </div>
            </article>
            <article className="post">
              <Link
                href="/inzichten/ai-in-de-zorg"
                className="cover"
                style={{
                  backgroundImage: "url('/assets/photos/overleg-lachend.png')",
                  backgroundPosition: "center",
                }}
              >
                <span className="cat">Zorg</span>
              </Link>
              <div className="pbody">
                <div className="meta">Leestijd 5 min · 10 maart 2026</div>
                <h3>AI in de zorg: 5 toepassingen die tijd teruggeven</h3>
                <p>
                  Concrete voorbeelden van AI die zorgprofessionals ontlast,
                  verantwoord ingezet.
                </p>
                <Link href="/inzichten/ai-in-de-zorg" className="more">
                  Lees meer <ArrowRight />
                </Link>
              </div>
            </article>
            <article className="post">
              <Link
                href="/inzichten/compliant-en-snel"
                className="cover"
                style={{
                  backgroundImage: "url('/assets/photos/overleg-laptop.png')",
                  backgroundPosition: "center 30%",
                }}
              >
                <span className="cat">Banken</span>
              </Link>
              <div className="pbody">
                <div className="meta">Leestijd 6 min · 5 maart 2026</div>
                <h3>Compliant én snel: de valse tegenstelling</h3>
                <p>
                  Waarom veiligheid en snelheid elkaar niet hoeven uit te sluiten
                  in financiële IT.
                </p>
                <Link href="/inzichten/compliant-en-snel" className="more">
                  Lees meer <ArrowRight />
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Lead-gen */}
      <section className="block leadgen" id="lead">
        <div className="wrap-wide">
          <div className="sec-head center">
            <div className="kicker">Zet de volgende stap</div>
            <h2>Kies het gesprek dat bij je past</h2>
            <p>
              Of je nu strategisch verkent of concreet wilt starten: er is een
              passende ingang.
            </p>
          </div>
          <div className="lead-grid">
            <div className="lead-card">
              <div className="ic">
                <CalendarCheck />
              </div>
              <div className="aud">Voor directie &amp; C-suite</div>
              <h3>Strategiegesprek</h3>
              <p>
                Een vrijblijvend gesprek van 45 minuten over jouw sectorvraagstuk
                en waar technologie het verschil maakt.
              </p>
              <div className="spokesperson">
                <Image
                  src="/assets/photos/portret-blauw.png"
                  alt="Koen Wijsman, CEO"
                  width={40}
                  height={40}
                />
                <span>
                  Je spreekt direct met <strong>Koen Wijsman</strong>, CEO
                </span>
              </div>
              <Link href="/contact" className="go">
                Plan een gesprek <ArrowRight />
              </Link>
            </div>
            <div className="lead-card">
              <div className="ic">
                <Gauge />
              </div>
              <div className="aud">Voor IT &amp; afdelingsmanagers</div>
              <h3>Quick scan</h3>
              <p>
                In één sessie brengen we samen je grootste kans in kaart, met een
                concreet vervolgadvies.
              </p>
              <Link href="/contact?type=quickscan" className="go">
                Doe de quick scan <ArrowRight />
              </Link>
            </div>
            <div className="lead-card">
              <div className="ic">
                <FileDown />
              </div>
              <div className="aud">Voor de verdieping</div>
              <h3>Sectorrapport</h3>
              <p>
                Download het rapport voor jouw markt: businessvraagstukken,
                benchmarks en concrete outcomes.
              </p>
              <Link href="/contact?type=sectorrapport" className="go">
                Download het rapport <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="wrap-wide">
          <h2>{t.ctaTitel}</h2>
          <Link href="/contact" className="btn btn-on">
            {t.ctaKnop} <ArrowRight />
          </Link>
        </div>
      </section>

      <HomeInteractions />
      </div>
    </>
  );
}
