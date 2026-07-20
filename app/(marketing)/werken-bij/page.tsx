import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Check, ArrowRight } from "lucide-react";
import { getVacatures } from "@/lib/vacatures-data";
import { MobileWerkenBij } from "@/components/mobile/mobile-werken-bij";
import "./werken-bij.css";
import "./mobile.css";

export const metadata: Metadata = {
  title: "Werken bij — word een Waver",
  description:
    "Werken bij The New Wave IT: een gelijk speelveld, open feedbackcultuur, persoonlijk groeipad en een jaarlijkse learning week. Bekijk onze vacatures.",
  alternates: { canonical: "/werken-bij" },
};

const GROEI = [
  { num: "01", titel: "Persoonlijk groeipad", p: "Jouw route bestaat uit activiteiten on-the-job, cursussen en trainingen, gekozen op basis van jouw ambitie, niet een standaardlijstje." },
  { num: "02", titel: "Open feedbackcultuur", p: "Regelmatige, open en eerlijke feedback hoort bij onze cultuur. Elk half jaar haal je bovendien 360°-feedback op uit je omgeving." },
  { num: "03", titel: "Learning week", p: "Jaarlijks trekken we er met z'n allen een volle week op uit om samen te ontwikkelen: vakinhoudelijk én persoonlijk." },
];

const TOTAL_PEOPLE = [
  { titel: "Presteren", p: "Uitdagende opdrachten bij partners in de publieke sector, mobiliteit, banken, zorg en manufacturing. Een rol op maat die jij zelf kiest." },
  { titel: "Groeien", p: "Zeggenschap over de koers: je beslist mee over strategie en investeringen van onze organisatie. Plus een persoonlijk groeipad met open feedback." },
  { titel: "Ontspannen", p: "Werk dat aansluit bij jouw doelen en drijfveren, met ruimte voor rust. Duurzaam onderweg in een elektrische auto van de zaak." },
];

const CULTUUR = [
  "Gelijke, transparante beloning bij gelijke ervaring, ongeacht gender of achtergrond",
  "Projecten gekozen op jouw ervaring, skills én ambitie",
  "Zeggenschap: meebeslissen over strategie en investeringen",
  "Maatschappelijke impact: duurzaamheid, gendergelijkheid en arbeidsparticipatie",
];

export const revalidate = 300;

export default async function WerkenBijPage() {
  const vacatures = await getVacatures();
  return (
    <>
      <MobileWerkenBij vacatures={vacatures} />
    <div className="p-werken only-desktop">
      <section className="shero">
        <div className="cutout">
          <Image src="/assets/photos/cutout-spreker-groen.png" alt="" fill sizes="32vw" />
        </div>
        <div className="wrap-wide">
          <div className="crumbs">
            <Link href="/">Home</Link> / Werken bij
          </div>
          <div className="kicker on-dark" style={{ marginTop: "var(--space-6)" }}>
            {"// Werken bij The New Wave IT"}
          </div>
          <h1>
            Word een <em>Waver</em>.
          </h1>
          <p>
            Het is onze droom dat elk mens werk doet dat aansluit bij persoonlijke
            doelen en drijfveren. Wij verzorgen de randvoorwaarden: een gelijk
            speelveld, een open cultuur en alle ruimte om te groeien. Jij zorgt
            voor de versnelling bij onze partners.
          </p>
          <div className="hero-actions">
            <a href="#vacatures" className="btn btn-primary">
              Bekijk vacatures <ArrowRight />
            </a>
            <Link href="/over-ons" className="btn btn-ghost-dark">
              Leer ons eerst kennen
            </Link>
          </div>
        </div>
      </section>

      <section className="block groei">
        <div className="wrap-wide">
          <div className="sec-head">
            <div className="kicker">Groei &amp; ontwikkeling</div>
            <h2>Elke dag samen beter worden</h2>
            <p>
              Persoonlijke aandacht en focus op groei zijn de kern. Samen
              verkennen we meerdere routes naar jouw ambitie en kiezen we de best
              passende weg.
            </p>
          </div>
          <div className="grid">
            {GROEI.map((g) => (
              <div className="gcard" key={g.num}>
                <div className="num">{g.num}</div>
                <h3>{g.titel}</h3>
                <p>{g.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="block totalpeople">
        <div className="wrap-wide">
          <div className="sec-head">
            <div className="kicker">Total People</div>
            <h2>Presteren, groeien én ontspannen</h2>
            <p>
              Bij ons staat het Total People-principe centraal: de balans tussen
              presteren, groeien en ontspannen. Jouw groei is onze groei.
            </p>
          </div>
          <div className="grid">
            {TOTAL_PEOPLE.map((t) => (
              <div className="tp" key={t.titel}>
                <h3>{t.titel}</h3>
                <p>{t.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="block cultuur" id="cultuur">
        <div className="wrap-wide">
          <div className="grid">
            <div className="media-img">
              <Image
                src="/assets/photos/team-presentatie-breed.png"
                alt="Wavers tijdens een kennissessie"
                fill
                sizes="(max-width: 900px) 100vw, 45vw"
              />
            </div>
            <div>
              <div className="kicker">Onze cultuur</div>
              <h2 style={{ fontSize: "var(--text-3xl)", fontWeight: "var(--fw-extrabold)", margin: "var(--space-4) 0 var(--space-5)" }}>
                Ondernemende mensen, gelijk speelveld.
              </h2>
              <p>
                Wij geloven dat de ondernemende mens zorgt voor vooruitgang en
                succesvolle verandering. Dat vraagt om een omgeving waarin iedereen
                gelijk is en verschillen versterken.
              </p>
              <ul>
                {CULTUUR.map((c, i) => (
                  <li key={i}>
                    <Check /> {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="block vacatures" id="vacatures">
        <div className="wrap-wide">
          <div className="sec-head">
            <div className="kicker on-dark">Vacatures</div>
            <h2 style={{ color: "#fff", fontSize: "var(--text-3xl)", fontWeight: "var(--fw-extrabold)", margin: "var(--space-4) 0 0" }}>
              Kom de golf versterken.
            </h2>
          </div>
          <div className="list">
            {vacatures.map((v) => (
              <Link href={`/vacatures/${v.slug}`} className="vrow" key={v.slug}>
                <h3>{v.functietitel}</h3>
                <span className="meta">{v.discipline}</span>
                <span className="meta">{v.locatie}</span>
                <ArrowRight className="arrow" />
              </Link>
            ))}
          </div>
          <p style={{ fontSize: "var(--text-sm)", color: "var(--text-on-dark-muted)", marginTop: "var(--space-6)" }}>
            Staat jouw rol er niet tussen? Stuur een open sollicitatie naar{" "}
            <a href="mailto:hello@thenewwaveit.com" style={{ color: "var(--orange-400)" }}>
              hello@thenewwaveit.com
            </a>{" "}
            of bel Mitchel: 06–10751254.
          </p>
        </div>
      </section>

      <section className="cta">
        <div className="wrap-wide">
          <h2>Eerst een kop koffie? Kom kennismaken.</h2>
          <a href="#vacatures" className="btn btn-on">
            Bekijk alle vacatures <ArrowRight />
          </a>
        </div>
      </section>
    </div>
    </>
  );
}
