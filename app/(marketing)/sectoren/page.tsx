import type { Metadata } from "next";
import Link from "next/link";
import {
  Landmark,
  TrainFront,
  Banknote,
  HeartPulse,
  Factory,
  MessageCircleQuestion,
  ArrowRight,
} from "lucide-react";
import { SectorHeroAnim } from "@/components/sector-hero-anim";
import { MobileSectoren } from "@/components/mobile/mobile-sectoren";
import { getPagina } from "@/lib/paginas-data";
import "./sectoren.css";
import "./mobile.css";

export const metadata: Metadata = {
  title: "Sectoren — publieke sector, mobiliteit, banken, zorg, manufacturing",
  description:
    "Wij spreken de taal van jouw sector. Business-specialist in vijf markten: we kennen de processen, wetgeving en systemen en gaan meteen de diepte in.",
  alternates: { canonical: "/sectoren" },
};

const SECTOREN = [
  {
    slug: "publieke-sector",
    naam: "Publieke sector",
    Icon: Landmark,
    hook: "“Onze doorlooptijden groeien sneller dan onze formatie.”",
    tekst:
      "Van vergunningverlening tot subsidies: wij helpen overheden processen versnellen, papierstromen vervangen en volledig aantoonbaar werken, veilig en binnen alle kaders.",
    kpi: "-40% doorlooptijd",
  },
  {
    slug: "mobiliteit",
    naam: "Mobiliteit",
    Icon: TrainFront,
    hook: "“Onze assets worden slimmer, onze systemen niet.”",
    tekst:
      "Van assetbeheer tot reizigersinformatie: wij bouwen de systemen waarmee infra, OV en logistiek sneller schakelen op verstoringen én op groei.",
    kpi: "Realtime inzicht",
  },
  {
    slug: "banken",
    naam: "Banken",
    Icon: Banknote,
    hook: "“Elke innovatie strandt op compliance.”",
    tekst:
      "Compliant én wendbaar: wij digitaliseren kernprocessen van banken en financials zonder concessies aan toezicht, beheersing en klantvertrouwen.",
    kpi: "Audit-proof",
  },
  {
    slug: "zorg",
    naam: "Zorg",
    Icon: HeartPulse,
    hook: "“Onze mensen registreren meer dan ze zorgen.”",
    tekst:
      "Wij nemen registratielast weg en geven zorgprofessionals systemen die met ze meewerken: veilig, gekoppeld aan je EPD en gebouwd rond het echte werkproces.",
    kpi: "Minder registratielast",
  },
  {
    slug: "manufacturing",
    naam: "Manufacturing",
    Icon: Factory,
    hook: "“Onze machines produceren data die niemand gebruikt.”",
    tekst:
      "Wij verbinden productie, planning en kwaliteit in applicaties die je operatie écht versnellen, gebouwd op de data die je machines al produceren.",
    kpi: "Kortere omsteltijden",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: SECTOREN.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: s.naam,
    url: `https://thenewwaveit.com/sectoren/${s.slug}`,
  })),
};

export const revalidate = 300;

export default async function SectorenPage() {
  const t = await getPagina("sectoren");
  return (
    <>
      <MobileSectoren sectoren={t} />
    <div className="p-sectoren only-desktop">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <section className="dhero">
        <SectorHeroAnim theme="sectoren" />
        <div className="wrap-wide">
          <div className="crumbs">
            <Link href="/">Home</Link> / Sectoren
          </div>
          <div className="kicker on-dark" style={{ marginTop: "var(--space-6)" }}>
            {"// Sectoren"}
          </div>
          <h1>
            {t.heroTitleStart}
            <em>{t.heroAccent}</em>.
          </h1>
          <p>{t.heroLead}</p>
        </div>
      </section>

      <section className="block">
        <div className="wrap-wide">
          <div className="sgrid">
            {SECTOREN.map(({ slug, naam, Icon, hook, tekst, kpi }) => (
              <Link key={slug} href={`/sectoren/${slug}`} className="scard">
                <div className="top">
                  <span className="ic">
                    <Icon />
                  </span>
                  <h2>{naam}</h2>
                </div>
                <div className="hook">{hook}</div>
                <p>{tekst}</p>
                <div className="foot">
                  <span className="kpi">{kpi}</span>
                  <span className="go">
                    Bekijk de sector <ArrowRight />
                  </span>
                </div>
              </Link>
            ))}
            <Link href="/contact" className="scard alt">
              <div className="top">
                <span className="ic">
                  <MessageCircleQuestion />
                </span>
                <h2>Jouw sector er niet bij?</h2>
              </div>
              <p>
                Onze aanpak, businessvraagstuk eerst en technologie als middel,
                werkt ook daarbuiten. Leg je vraagstuk voor en we vertellen eerlijk
                of we de juiste partner zijn.
              </p>
              <div className="foot" style={{ borderTop: 0, paddingTop: 0 }}>
                <span className="go">
                  Neem contact op <ArrowRight />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="block werkwijze">
        <div className="wrap-wide">
          <div className="sec-head">
            <div className="kicker on-dark">{t.werkwijzeKicker}</div>
            <h2 style={{ color: "#fff", fontSize: "var(--text-3xl)", fontWeight: "var(--fw-extrabold)", margin: "var(--space-4) 0 0" }}>
              {t.werkwijzeTitel}
            </h2>
          </div>
          <div className="grid">
            {["1", "2", "3"].map((n) => (
              <div className="wcard" key={n}>
                <div className="num">{`0${n}`}</div>
                <h3>{t[`wijze${n}Titel`]}</h3>
                <p>{t[`wijze${n}Tekst`]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="wrap-wide">
          <h2>{t.ctaTitel}</h2>
          <Link href="/contact" className="btn btn-on">
            Plan een strategiegesprek <ArrowRight />
          </Link>
        </div>
      </section>
    </div>
    </>
  );
}
