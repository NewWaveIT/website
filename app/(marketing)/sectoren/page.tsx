import { JsonLd } from "@/components/json-ld";
import { cacheLife } from "next/cache";
import type { Metadata } from "next";
import { Kruimelpad } from "@/components/kruimelpad";
import { SectorHeroAnim } from "@/components/sector-hero-anim";
import { SectorSplit } from "@/components/sector-split";
import { SlotCta } from "@/components/layout/slot-cta";
import { getPagina } from "@/lib/paginas-data";
import { getSectorKaarten } from "@/lib/sectoren-detail-data";
import { SITE_URL } from "@/lib/site";
import "./sectoren.css";

export const metadata: Metadata = {
  title: "Sectoren — vijf markten die we echt kennen",
  description:
    "Wij spreken de taal van jouw sector. Business-specialist in vijf markten: we kennen de processen, wetgeving en systemen en gaan meteen de diepte in.",
  alternates: { canonical: "/sectoren" },
};

export default async function SectorenPage() {
  "use cache";
  cacheLife("content");

  const [t, sectoren] = await Promise.all([getPagina("sectoren"), getSectorKaarten()]);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: sectoren.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.naam,
      url: `${SITE_URL}${s.href}`,
    })),
  };
  return (
    <div className="p-sectoren">
      <JsonLd data={jsonLd} />

      <section className="dhero">
        <SectorHeroAnim theme="sectoren" />
        <div className="wrap-wide">
          <Kruimelpad kruimels={[{ naam: "Sectoren", pad: "/sectoren" }]} />
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
            items={sectoren.map((s) => ({
              naam: s.naam,
              href: s.href,
              chal: s.pitch,
              hook: s.hook,
              kpi: s.kpiLabel,
              theme: s.theme,
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
            <h2
              style={{
                color: "#fff",
                fontSize: "var(--text-3xl)",
                fontWeight: "var(--fw-extrabold)",
                margin: "var(--space-4) 0 0",
              }}
            >
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

      <SlotCta titel={t.ctaTitel ?? ""} />
    </div>
  );
}
