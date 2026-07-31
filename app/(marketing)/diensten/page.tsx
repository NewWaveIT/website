import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Check,
  ArrowRight,
  Landmark,
  TrainFront,
  Banknote,
  HeartPulse,
  Factory,
} from "lucide-react";
import { SectorHeroAnim } from "@/components/sector-hero-anim";
import { MobileDiensten } from "@/components/mobile/mobile-diensten";
import { SlotCta } from "@/components/layout/slot-cta";
import { getPagina } from "@/lib/paginas-data";
import "./diensten.css";
import "./mobile.css";

export const metadata: Metadata = {
  title: "Diensten — Mendix, AI en digitale strategie",
  description:
    "Drie diensten, één doel: jouw resultaat. Wij combineren Mendix, AI en digitale strategie tot oplossingen die werken voor de mensen die ermee werken.",
  alternates: { canonical: "/diensten" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: [
    { "@type": "Service", position: 1, name: "Mendix", url: "https://thenewwaveit.com/diensten/mendix" },
    { "@type": "Service", position: 2, name: "AI", url: "https://thenewwaveit.com/diensten/ai" },
    { "@type": "Service", position: 3, name: "Digitale strategie", url: "https://thenewwaveit.com/diensten/strategie" },
  ],
};

export const revalidate = 300;

export default async function DienstenPage() {
  const t = await getPagina("diensten");
  return (
    <>
      <MobileDiensten diensten={t} />
    <div className="p-diensten only-desktop">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

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

      <section className="block">
        <div className="wrap-wide">
          <div className="dienst-row" style={{ paddingTop: 0 }}>
            <div className="txt">
              <div className="num">01 · Applicaties</div>
              <h2>Mendix</h2>
              <p>
                Bedrijfskritische low-code applicaties die aansluiten op je
                landschap: van proof-of-concept tot productie in weken, niet
                maanden. Schaalbaar, beheerbaar en gebouwd rond je mensen.
              </p>
              <ul>
                <li>
                  <Check /> Van vergunningproces tot planningsysteem
                </li>
                <li>
                  <Check /> Integraties met je bestaande kernsystemen
                </li>
                <li>
                  <Check /> Kennisoverdracht zodat je team zelf verder kan
                </li>
              </ul>
              <div className="acts">
                <Link href="/diensten/mendix" className="btn btn-primary">
                  Ontdek Mendix <ArrowRight />
                </Link>
                <Link href="/klantverhalen">Bekijk cases →</Link>
              </div>
            </div>
            <div className="media-img">
              <Image
                src="/assets/photos/overleg-laptop.webp"
                alt="Consultants werken aan een Mendix-applicatie"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
              />
            </div>
          </div>

          <div className="dienst-row rev">
            <div className="txt">
              <div className="num">02 · Intelligentie</div>
              <h2>AI</h2>
              <p>
                Strategische en verantwoorde inzet van AI binnen je bestaande
                IT-landschap. Geen hype, wél oplossingen die processen aantoonbaar
                verbeteren en uitlegbaar blijven, met de mens aan het stuur.
              </p>
              <ul>
                <li>
                  <Check /> AI-scan: van hype naar businesscase
                </li>
                <li>
                  <Check /> Werkende pilots binnen zes weken
                </li>
                <li>
                  <Check /> AVG- en AI Act-proof, zonder black boxes
                </li>
              </ul>
              <div className="acts">
                <Link href="/diensten/ai" className="btn btn-primary">
                  Ontdek AI <ArrowRight />
                </Link>
                <Link href="/klantverhalen">Bekijk cases →</Link>
              </div>
            </div>
            <div className="media-img">
              <Image
                src="/assets/photos/team-overleg-scherm.webp"
                alt="Team bespreekt een AI-toepassing"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
              />
            </div>
          </div>

          <div className="dienst-row" style={{ borderBottom: 0, paddingBottom: 0 }}>
            <div className="txt">
              <div className="num">03 · Richting</div>
              <h2>Digitale strategie</h2>
              <p>
                Wij verbinden business en IT in een concreet plan en blijven aan
                boord tot het werkt. Geen dik rapport voor in de la, maar
                mijlpalen die je operatie meteen merkt.
              </p>
              <ul>
                <li>
                  <Check /> Van ambitie naar geprioriteerde roadmap
                </li>
                <li>
                  <Check /> Businesscase per initiatief
                </li>
                <li>
                  <Check /> Begeleiding bij de verandering, niet alleen het plan
                </li>
              </ul>
              <div className="acts">
                <Link href="/diensten/strategie" className="btn btn-primary">
                  Ontdek Strategie <ArrowRight />
                </Link>
                <Link href="/klantverhalen">Bekijk cases →</Link>
              </div>
            </div>
            <div className="media-img">
              <Image
                src="/assets/photos/klantgesprek-tafel.webp"
                alt="Strategiesessie aan tafel"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="block fasen">
        <div className="wrap-wide">
          <div className="sec-head">
            <div className="kicker">Zo werken we</div>
            <h2>Van vraagstuk naar livegang in vijf fasen</h2>
            <p>
              Strategie en bouw in één beweging: we starten bij het probleem en werken
              snel naar iets dat écht draait — met Mendix en AI als middel.
            </p>
          </div>
          <div className="fasen-grid">
            {[
              { titel: "Strategische sessies", tekst: "Samen maken we het vraagstuk scherp." },
              { titel: "Delivery-model", tekst: "We zetten de aanpak op en scherpen die aan." },
              { titel: "Eén use case", tekst: "We kiezen één concrete casus om mee te starten." },
              { titel: "Direct bouwen", tekst: "We bouwen meteen, met Mendix en AI." },
              { titel: "Itereren naar live", tekst: "In korte cycli verbeteren richting livegang." },
            ].map((f, i) => (
              <div className="fase" key={f.titel}>
                <div className="fnum">{`0${i + 1}`}</div>
                <h3>{f.titel}</h3>
                <p>{f.tekst}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="block samen">
        <div className="wrap-wide">
          <div className="sec-head">
            <div className="kicker on-dark">{t.samenKicker}</div>
            <h2 style={{ color: "#fff", fontSize: "var(--text-3xl)", fontWeight: "var(--fw-extrabold)", margin: "var(--space-4) 0" }}>
              {t.samenTitel}
            </h2>
            <p style={{ color: "var(--text-on-dark-muted)" }}>{t.samenIntro}</p>
          </div>
          <div className="grid">
            {[
              { n: "1", num: "Strategie → Mendix" },
              { n: "2", num: "Mendix → AI" },
              { n: "3", num: "AI → Strategie" },
            ].map(({ n, num }) => (
              <div className="scard" key={n}>
                <div className="num">{num}</div>
                <h3>{t[`samen${n}Titel`]}</h3>
                <p>{t[`samen${n}Tekst`]}</p>
              </div>
            ))}
          </div>
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

      <SlotCta titel={t.ctaTitel} />
    </div>
    </>
  );
}
