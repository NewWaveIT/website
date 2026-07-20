import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Users, Scale, Sparkles, Leaf, MapPin, Award, Mail, ArrowRight } from "lucide-react";
import { MobileOverOns } from "@/components/mobile/mobile-over-ons";
import { getPagina } from "@/lib/paginas-data";
import "./over-ons.css";
import "./mobile.css";

export const metadata: Metadata = {
  title: "Over ons — de ondernemende mens zorgt voor vooruitgang",
  description:
    "The New Wave IT: opgericht in 2023, kantoor in Utrecht. Wij realiseren maximale digitale impact met de mens als maat, via low-code en AI.",
  alternates: { canonical: "/over-ons" },
};

const WAARDEN = [
  { Icon: Users, titel: "De mens 100% centraal", p: "Technologie is het middel. We bouwen oplossingen rond de mensen die ermee moeten werken, bij jou en bij ons." },
  { Icon: Scale, titel: "Gelijk speelveld", p: "Beloning is bij ons gelijk en transparant voor iedereen met dezelfde ervaring, ongeacht gender of achtergrond." },
  { Icon: Sparkles, titel: "Verschillen versterken", p: "Elk mens is gelijk. We geloven dat diverse teams tot betere oplossingen komen, voor onze partners en elkaar." },
  { Icon: Leaf, titel: "Duurzaam ondernemen", p: "Ondernemen en maatschappelijke bijdrage horen bij elkaar. In 2030 is ons businessmodel 100% CO2-neutraal." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "The New Wave IT",
  foundingDate: "2023",
  email: "hello@thenewwaveit.com",
  url: "https://thenewwaveit.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Ganzenmarkt 6",
    postalCode: "3512 GD",
    addressLocality: "Utrecht",
    addressCountry: "NL",
  },
};

export const revalidate = 300;

export default async function OverOnsPage() {
  const t = await getPagina("over-ons");
  return (
    <>
      <MobileOverOns over={t} />
    <div className="p-over only-desktop">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <section className="shero">
        <div className="badge-img">
          <Image src="/assets/photos/overleg-lachend.png" alt="" fill sizes="46vw" />
        </div>
        <div className="wrap-wide">
          <div className="crumbs">
            <Link href="/">Home</Link> / Over ons
          </div>
          <div className="kicker on-dark" style={{ marginTop: "var(--space-6)" }}>
            {"// Over ons"}
          </div>
          <h1>
            {t.heroTitleStart}
            <em>{t.heroAccent}</em>.
          </h1>
          <p>{t.heroLead}</p>
          <div className="kpis">
            <div>
              <div className="n">2023</div>
              <div className="l">Opgericht, kantoor in Utrecht</div>
            </div>
            <div>
              <div className="n">100%</div>
              <div className="l">De mens centraal, op elk project</div>
            </div>
            <div>
              <div className="n">2030</div>
              <div className="l">Doel: CO2-neutraal businessmodel</div>
            </div>
          </div>
        </div>
      </section>

      <section className="block missie">
        <div className="wrap-wide">
          <div className="grid">
            <div>
              <div className="kicker">Onze missie</div>
              <h2 style={{ fontSize: "var(--text-3xl)", fontWeight: "var(--fw-extrabold)", margin: "var(--space-4) 0 var(--space-5)" }}>
                {t.missieTitel}
              </h2>
              <p>{t.missieP1}</p>
              <p>{t.missieP2}</p>
            </div>
            <div className="media-img">
              <Image
                src="/assets/photos/klantgesprek-tafel.png"
                alt="Wavers in gesprek met een klant"
                fill
                sizes="(max-width: 900px) 100vw, 45vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="block waarden">
        <div className="wrap-wide">
          <div className="sec-head">
            <div className="kicker">Waar wij voor staan</div>
            <h2>Vier overtuigingen die je terugziet in ons werk</h2>
          </div>
          <div className="grid">
            {WAARDEN.map(({ Icon, titel, p }) => (
              <div className="vcard" key={titel}>
                <div className="ic">
                  <Icon />
                </div>
                <h3>{titel}</h3>
                <p>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="block team">
        <div className="wrap-wide">
          <div className="grid">
            <div className="media-img">
              <Image
                src="/assets/photos/founders-trio.png"
                alt="Het team achter The New Wave IT"
                fill
                sizes="(max-width: 900px) 100vw, 40vw"
              />
            </div>
            <div>
              <div className="kicker">Het team</div>
              <h2 style={{ fontSize: "var(--text-3xl)", fontWeight: "var(--fw-extrabold)", margin: "var(--space-4) 0 var(--space-5)" }}>
                {t.teamTitel}
              </h2>
              <p>{t.teamP1}</p>
              <p>{t.teamP2}</p>
              <div className="founder">
                <Image src="/assets/photos/portret-blauw.png" alt="Koen Wijsman" width={56} height={56} />
                <div>
                  <div className="nm">Koen Wijsman</div>
                  <div className="rl">CEO &amp; founder</div>
                </div>
                <Link href="/contact" className="btn btn-outline btn-sm" style={{ marginLeft: "auto" }}>
                  Kom kennismaken
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="feiten">
        <div className="wrap-wide">
          <div className="row">
            <span className="f">
              <MapPin /> Ganzenmarkt 6, 3512 GD Utrecht
            </span>
            <span className="f">
              <Award /> Mijn Rotterdam · genomineerd Computable Awards
            </span>
            <span className="f">
              <Mail /> hello@thenewwaveit.com
            </span>
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
