import type { Metadata } from "next";
import Link from "next/link";
import { SectorHeroAnim } from "@/components/sector-hero-anim";
import { SectorSplit } from "@/components/sector-split";
import { SlotCta } from "@/components/layout/slot-cta";
import { getPagina } from "@/lib/paginas-data";
import "./sectoren.css";

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
    image: "/assets/sectoren/foto-publieke-sector.webp",
    hook: "“Onze doorlooptijden groeien sneller dan onze formatie.”",
    tekst:
      "Van vergunningverlening tot subsidies: wij helpen overheden processen versnellen, papierstromen vervangen en volledig aantoonbaar werken, veilig en binnen alle kaders.",
    kpi: "-40% doorlooptijd",
  },
  {
    slug: "mobiliteit",
    naam: "Mobiliteit & logistiek",
    image: "/assets/sectoren/foto-mobiliteit.webp",
    hook: "“Onze assets worden slimmer, onze systemen niet.”",
    tekst:
      "Van assetbeheer tot reizigersinformatie: wij bouwen de systemen waarmee infra, OV en logistiek sneller schakelen op verstoringen én op groei.",
    kpi: "Realtime inzicht",
  },
  {
    slug: "banken",
    naam: "Banken & financials",
    image: "/assets/sectoren/foto-banken.webp",
    hook: "“Elke innovatie strandt op compliance.”",
    tekst:
      "Compliant én wendbaar: wij digitaliseren kernprocessen van banken en financials zonder concessies aan toezicht, beheersing en klantvertrouwen.",
    kpi: "Audit-proof",
  },
  {
    slug: "zorg",
    naam: "Zorg",
    image: "/assets/sectoren/foto-zorg.webp",
    hook: "“Onze mensen registreren meer dan ze zorgen.”",
    tekst:
      "Wij nemen registratielast weg en geven zorgprofessionals systemen die met ze meewerken: veilig, gekoppeld aan je EPD en gebouwd rond het echte werkproces.",
    kpi: "Minder registratielast",
  },
  {
    slug: "manufacturing",
    naam: "Manufacturing",
    image: "/assets/sectoren/foto-manufacturing.webp",
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
    <div className="p-sectoren">
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
            {"Sectoren"}
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
          <SectorSplit
            big
            kicker="Vijf focusmarkten"
            titel="Kies jouw sector."
            intro="Beweeg over een sector om het beeld te wisselen, of klik door naar de volledige sectoroplossing."
            items={SECTOREN.map((s) => ({
              naam: s.naam,
              href: `/sectoren/${s.slug}`,
              chal: s.tekst,
              hook: s.hook,
              kpi: s.kpi,
              image: s.image,
              cap: s.naam,
            }))}
            moreHref="/contact"
            moreTitel="Jouw sector er niet bij?"
            moreChal="Onze aanpak, businessvraagstuk eerst en technologie als middel, werkt ook daarbuiten. Leg je vraagstuk voor en we vertellen eerlijk of we de juiste partner zijn."
          />
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

      <SlotCta titel={t.ctaTitel} />
    </div>
  );
}
