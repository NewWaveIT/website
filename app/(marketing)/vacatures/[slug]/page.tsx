import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Check, ArrowRight, Phone } from "lucide-react";
import { getVacatures, getVacatureBySlug } from "@/lib/vacatures-data";
import { MobileVacature } from "@/components/mobile/mobile-vacature";
import "./vacature.css";
import "./mobile.css";

export const revalidate = 300;

const PROCES = [
  { num: "01", titel: "Kennismaken", p: "Videocall of koffie met Mitchel. Geen assessment, wél een goed gesprek over jouw ambitie." },
  { num: "02", titel: "Verdieping", p: "Inhoudelijk gesprek met de practice lead: casuïstiek uit onze echte opdrachten." },
  { num: "03", titel: "Meet the Wavers", p: "Lunch of borrel met je toekomstige team. Jij interviewt ons net zo hard." },
  { num: "04", titel: "Voorstel", p: "Transparant aanbod, inclusief groeipad. Bedenktijd hoort erbij." },
];

export async function generateStaticParams() {
  return (await getVacatures()).map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const v = await getVacatureBySlug(slug);
  if (!v) return {};
  return {
    title: `Vacature ${v.functietitel}`,
    description: v.intro,
    alternates: { canonical: `/vacatures/${slug}` },
  };
}

export default async function VacaturePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const v = await getVacatureBySlug(slug);
  if (!v) notFound();

  const andere = (await getVacatures()).filter((x) => x.slug !== slug);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: v.functietitel,
    description: v.intro,
    datePosted: v.gepubliceerdOp,
    employmentType: v.employmentType,
    hiringOrganization: { "@type": "Organization", name: "The New Wave IT" },
    jobLocation: {
      "@type": "Place",
      address: { "@type": "PostalAddress", addressLocality: "Utrecht", addressCountry: "NL" },
    },
  };

  return (
    <>
      <MobileVacature v={v} andere={andere} />
    <div className="p-vacature only-desktop">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <section className="shero">
        <div className="wrap-wide">
          <div className="crumbs">
            <Link href="/">Home</Link> / <Link href="/werken-bij">Werken bij</Link> /{" "}
            {v.functietitel}
          </div>
          <div className="tags">
            {v.tags.map((t) => (
              <span className="tag" key={t}>
                {t}
              </span>
            ))}
          </div>
          <h1>{v.functietitel}</h1>
          <p>{v.intro}</p>
          <div className="hero-actions">
            <a href="#solliciteer" className="btn btn-primary">
              Solliciteer direct <ArrowRight />
            </a>
            <Link href="/werken-bij" className="btn btn-ghost-dark">
              Ontdek werken bij
            </Link>
          </div>
        </div>
      </section>

      <section className="block">
        <div className="wrap-wide vac-grid">
          <div className="vac-body">
            {v.secties.map((sectie) => (
              <section key={sectie.titel}>
                <h2>{sectie.titel}</h2>
                <ul>
                  {sectie.items.map((it, i) => (
                    <li key={i}>
                      <Check /> {it}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
          <aside className="vac-aside" id="solliciteer">
            <div className="apply-card">
              <div className="rec">
                <Image src="/assets/photos/portret-3.webp" alt="Mitchel Wallaart, recruiter" width={64} height={64} />
                <div>
                  <div className="role">Recruiter</div>
                  <h4>Mitchel Wallaart</h4>
                  <div className="contact">
                    <a href="tel:+31610751254">06–10751254</a>
                    <a href="mailto:hello@thenewwaveit.com">Mail</a>
                  </div>
                </div>
              </div>
              <a href="mailto:hello@thenewwaveit.com" className="btn btn-primary">
                Solliciteer direct <ArrowRight />
              </a>
              <p className="note">
                Binnen twee werkdagen reactie. Geen brief nodig, je cv of LinkedIn is genoeg.
              </p>
            </div>
            <div className="facts">
              <dl>
                <div className="frow">
                  <dt>Team</dt>
                  <dd>{v.facts.team}</dd>
                </div>
                <div className="frow">
                  <dt>Niveau</dt>
                  <dd>{v.facts.niveau}</dd>
                </div>
                <div className="frow">
                  <dt>Locatie</dt>
                  <dd>{v.facts.locatie}</dd>
                </div>
                <div className="frow">
                  <dt>Uren</dt>
                  <dd>{v.facts.uren}</dd>
                </div>
                <div className="frow">
                  <dt>Salaris</dt>
                  <dd>{v.facts.salaris}</dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </section>

      <section className="block proces">
        <div className="wrap-wide">
          <div className="sec-head">
            <div className="kicker">Zo solliciteer je</div>
            <h2>Vier stappen, twee weken</h2>
          </div>
          <div className="grid">
            {PROCES.map((s) => (
              <div className="step" key={s.num}>
                <div className="num">{s.num}</div>
                <h3>{s.titel}</h3>
                <p>{s.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="block vacatures">
        <div className="wrap-wide">
          <div className="sec-head">
            <div className="kicker on-dark">Andere vacatures</div>
            <h2 style={{ color: "#fff", fontSize: "var(--text-3xl)", fontWeight: "var(--fw-extrabold)", margin: "var(--space-4) 0 0" }}>
              Ook op zoek naar…
            </h2>
          </div>
          <div className="list">
            {andere.map((a) => (
              <Link href={`/vacatures/${a.slug}`} className="vrow" key={a.slug}>
                <h3>{a.functietitel}</h3>
                <span className="meta">{a.discipline}</span>
                <span className="meta">{a.locatie}</span>
                <ArrowRight className="arrow" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="wrap-wide">
          <h2>Twijfel je nog? Bel gewoon even met Mitchel.</h2>
          <a href="tel:+31610751254" className="btn btn-on">
            06–10751254 <Phone />
          </a>
        </div>
      </section>
    </div>
    </>
  );
}
