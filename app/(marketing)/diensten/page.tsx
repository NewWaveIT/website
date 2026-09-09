import { cacheLife } from "next/cache";
import type { Metadata } from "next";
import Link from "next/link";
import { Landmark, TrainFront, Banknote, HeartPulse, Factory } from "lucide-react";
import { SectorHeroAnim } from "@/components/sector-hero-anim";
import { DienstMatrix } from "@/components/diensten/dienst-matrix";
import { FaseTijdlijn } from "@/components/diensten/fase-tijdlijn";
import { SlotCta } from "@/components/layout/slot-cta";
import { getPagina } from "@/lib/paginas-data";
import { getDienstMatrix, getFaseItems } from "@/lib/services-data";
import type { Service } from "@/lib/services";
import { SITE_URL } from "@/lib/site";
import "./diensten.css";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld";

export const metadata: Metadata = {
  title: "Zo begin je — negen diensten van dag tot traject",
  description:
    "Kies een richting — Mendix, AI of strategie — en begin bij het instapniveau: één dag, vaste prijs. Schaal op wanneer het werkt.",
  alternates: { canonical: "/diensten" },
};

export default async function DienstenPage() {
  "use cache";
  cacheLife("content");

  const t = await getPagina("diensten");
  const matrix = await getDienstMatrix();
  const fases = getFaseItems(t);

  const alleDiensten: Service[] = matrix.rijen.flatMap((r) =>
    r.layout === "kolommen" ? r.cellen.map((c) => c.service) : r.diensten,
  );
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: alleDiensten.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      // Diensten zonder eigen pagina krijgen hun ankerpunt op het overzicht,
      // zodat elk item een eigen URL houdt.
      url: s.slug ? `${SITE_URL}/diensten/${s.slug}` : `${SITE_URL}/diensten#svc-${s.slug}`,
      item: {
        "@type": "Service",
        name: s.naam,
        description: s.pitch,
        provider: { "@type": "Organization", name: "The New Wave IT" },
      },
    })),
  };

  return (
    <div className="p-diensten">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <BreadcrumbJsonLd kruimels={[{ naam: "Home", pad: "/" }, { naam: "Diensten" }]} />

      <section className="dhero">
        <SectorHeroAnim theme="diensten" />
        <div className="wrap-wide">
          <div className="crumbs">
            <Link href="/">Home</Link> / Diensten
          </div>
          <div className="kicker on-dark" style={{ marginTop: "var(--space-6)" }}>
            {"Diensten"}
          </div>
          <h1>
            {t.heroTitleStart}
            <em>{t.heroAccent}</em>
            {t.heroTitleEnd}
          </h1>
          <p>{t.heroLead}</p>
        </div>
      </section>

      <section className="block matrix-blok" id="kies-je-richting">
        <div className="wrap-wide">
          <div className="sec-head">
            <div className="kicker">{t.matrixKicker}</div>
            <h2>{t.matrixTitel}</h2>
            <p>{t.matrixIntro}</p>
          </div>
          <DienstMatrix matrix={matrix} breedNoot={t.breedNoot ?? ""} />
        </div>
      </section>

      <section className="block fasen-blok" id="fasen">
        <div className="wrap-wide">
          <div className="sec-head">
            <div className="kicker">{t.fasenKicker}</div>
            <h2>{t.fasenTitel}</h2>
            <p>{t.fasenIntro}</p>
          </div>
          <FaseTijdlijn fases={fases} variant="vol" cta="Welke dienst past bij jouw fase?" />
        </div>
      </section>

      <section className="block sect-strip">
        <div className="wrap-wide">
          <div className="sec-head">
            <div className="kicker">{t.sectstripKicker}</div>
            <h2>{t.sectstripTitel}</h2>
            <p>{t.sectstripIntro}</p>
          </div>
          <div className="row">
            <Link href="/sectoren/publieke-sector" className="sect-chip">
              <Landmark /> Publieke sector
            </Link>
            <Link href="/sectoren/mobiliteit" className="sect-chip">
              <TrainFront /> Mobiliteit
            </Link>
            <Link href="/sectoren/banken" className="sect-chip">
              <Banknote /> Banken
            </Link>
            <Link href="/sectoren/zorg" className="sect-chip">
              <HeartPulse /> Zorg
            </Link>
            <Link href="/sectoren/manufacturing" className="sect-chip">
              <Factory /> Manufacturing
            </Link>
          </div>
        </div>
      </section>

      <SlotCta titel={t.ctaTitel ?? ""} />
    </div>
  );
}
