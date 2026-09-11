import { JsonLd } from "@/components/json-ld";
import { cacheLife } from "next/cache";
import type { Metadata } from "next";
import Link from "next/link";
import { PaginaHero } from "@/components/layout/pagina-hero";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Check, ArrowRight, Phone } from "lucide-react";
import { getVacatures, getVacatureBySlug } from "@/lib/vacatures-data";
import { getContactpersoon } from "@/lib/team-data";
import { stripHtml, kort } from "@/lib/cms/sanitize";
import { SollicitatieForm } from "@/components/vacatures/sollicitatie-form";
import "./vacature.css";

/** Alleen cijfers/+ voor een tel:-URI. */
function telHref(t: string): string {
  return `tel:${t.replace(/[^\d+]/g, "")}`;
}

/** Plaatsingsdatum (ISO) → een jaar later, voor `validThrough` in de JobPosting. */
function vacatureVervalt(gepubliceerdOp: string): string | undefined {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(gepubliceerdOp)) return undefined;
  const d = new Date(gepubliceerdOp);
  d.setFullYear(d.getFullYear() + 1);
  return d.toISOString().slice(0, 10);
}

const PROCES = [
  {
    num: "01",
    titel: "Kennismaken",
    p: "Videocall of koffie met {recruiter}. Geen assessment, wél een goed gesprek over jouw ambitie.",
  },
  {
    num: "02",
    titel: "Verdieping",
    p: "Inhoudelijk gesprek met de practice lead: casuïstiek uit onze echte opdrachten.",
  },
  {
    num: "03",
    titel: "Meet the Wavers",
    p: "Lunch of borrel met je toekomstige team. Jij interviewt ons net zo hard.",
  },
  {
    num: "04",
    titel: "Voorstel",
    p: "Transparant aanbod, inclusief groeipad. Bedenktijd hoort erbij.",
  },
];

export const instant = false;

/**
 * Bewust géén generateStaticParams, met één bekend gevolg.
 *
 * Onder Cache Components moet die functie minstens één param teruggeven, en er
 * staan nu geen vacatures open — de seed is leeg en de CMS-rijen staan op
 * concept. Zonder die lijst kent Next de geldige slugs niet en begint hij met
 * een statische shell te streamen, waarna `notFound()` de HTTP-status niet meer
 * kan zetten: /vacatures/<onzin> geeft 200 met de 404-pagina in beeld, in
 * plaats van een echte 404. De vier andere detailroutes hebben dat probleem
 * niet, juist omdat die wél een slug-lijst hebben.
 *
 * Waarom dat hier acceptabel is: nergens op de site of in de sitemap staat een
 * link naar een vacature, dus een crawler komt er niet, en het antwoord draagt
 * `noindex`. Zodra er weer één vacature live staat hoort hieronder terug te
 * komen — en daarmee ook de echte 404:
 *
 *   export async function generateStaticParams() {
 *     return (await getVacatures()).map((v) => ({ slug: v.slug }));
 *   }
 */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  "use cache";
  cacheLife("content");

  const { slug } = await params;
  const v = await getVacatureBySlug(slug);
  if (!v) return {};
  return {
    title: `Vacature ${v.functietitel}`,
    description: kort(stripHtml(v.intro), 155),
    alternates: { canonical: `/vacatures/${slug}` },
  };
}

export default async function VacaturePage({ params }: { params: Promise<{ slug: string }> }) {
  "use cache";
  cacheLife("content");

  const { slug } = await params;
  const v = await getVacatureBySlug(slug);
  if (!v) notFound();

  const andere = (await getVacatures()).filter((x) => x.slug !== slug);

  // Recruitment-contactpersoon (dynamisch), met terugval op een standaard.
  const rec = await getContactpersoon("recruitment");
  const recNaam = rec?.naam || "Mitchel Wallaart";
  const recVoornaam = recNaam.split(" ")[0] || recNaam;
  const recFoto = rec?.foto || "/assets/photos/portret-3.webp";
  const recTel = rec?.telefoon || "06–10751254";
  const recMail = rec?.email || "hello@thenewwaveit.com";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: v.functietitel,
    description: stripHtml(v.intro),
    datePosted: v.gepubliceerdOp,
    // Zonder einddatum laat Google Jobs een vacature na verloop van tijd vallen;
    // een jaar na plaatsing is ruim en voorkomt dat een open rol stil verdwijnt.
    validThrough: vacatureVervalt(v.gepubliceerdOp),
    employmentType: v.employmentType,
    hiringOrganization: { "@type": "Organization", name: "The New Wave IT" },
    jobLocation: {
      "@type": "Place",
      address: { "@type": "PostalAddress", addressLocality: "Utrecht", addressCountry: "NL" },
    },
  };

  return (
    <div className="p-vacature">
      <JsonLd data={jsonLd} />

      <PaginaHero
        kruimels={[{ naam: "Werken bij", pad: "/werken-bij" }, { naam: v.functietitel }]}
        kicker={
          <div className="tags">
            {v.tags.map((t) => (
              <span className="tag" key={t}>
                {t}
              </span>
            ))}
          </div>
        }
        titel={v.functietitel}
        leadHtml={v.intro}
      >
        <div className="hero-actions">
          <a href="#solliciteer" className="btn btn-primary">
            Solliciteer direct <ArrowRight />
          </a>
          <Link href="/werken-bij" className="btn btn-ghost-on">
            Ontdek werken bij
          </Link>
        </div>
        <p className="hero-note">
          Binnen twee werkdagen reactie — meestal van {recVoornaam} zelf. Geen motivatiebrief nodig.
        </p>
      </PaginaHero>

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
                <Image src={recFoto} alt={`${recNaam}, recruiter`} width={64} height={64} />
                <div>
                  <div className="role">Recruiter</div>
                  <h3>{recNaam}</h3>
                  <div className="contact">
                    <a href={telHref(recTel)}>{recTel}</a>
                    <a href={`mailto:${recMail}`}>Mail</a>
                  </div>
                </div>
              </div>
              <p className="note">
                Vragen vooraf? Bel of mail {recVoornaam} gerust. Binnen twee werkdagen reactie.
              </p>
            </div>
            <SollicitatieForm vacatureSlug={slug} vacatureTitel={v.functietitel} />
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
                <p>{s.p.replace("{recruiter}", recVoornaam)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="block vacatures">
        <div className="wrap-wide">
          <div className="sec-head">
            <div className="kicker on-dark">Andere vacatures</div>
            <h2>Ook op zoek naar…</h2>
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
          <h2>Twijfel je nog? Bel gewoon even met {recVoornaam}.</h2>
          <a href={telHref(recTel)} className="btn btn-on">
            {recTel} <Phone />
          </a>
        </div>
      </section>
    </div>
  );
}
