import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  Boxes,
  BrainCircuit,
  Route,
  Check,
  Plus,
  Play,
  ArrowRight,
} from "lucide-react";
import { getDienstBySlug, getDienstSlugs } from "@/lib/diensten-detail-data";
import { MOBILE_DIENSTEN } from "@/lib/mobile-detail";
import { SectorHeroAnim } from "@/components/sector-hero-anim";
import { MobileDetail } from "@/components/mobile/mobile-detail";
import "./dienst-detail.css";

export const revalidate = 300;

const BADGE_ICON = { boxes: Boxes, "brain-circuit": BrainCircuit, route: Route };

export async function generateStaticParams() {
  return (await getDienstSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const d = await getDienstBySlug(slug);
  if (!d) return {};
  return {
    title: `${d.naam} — ${d.h1}`,
    description: d.intro,
    alternates: { canonical: `/diensten/${slug}` },
  };
}

export default async function DienstPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const d = await getDienstBySlug(slug);
  if (!d) notFound();

  const Badge = BADGE_ICON[d.badgeIcon];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: d.naam,
    description: d.intro,
    provider: { "@type": "Organization", name: "The New Wave IT" },
    url: `https://thenewwaveit.com/diensten/${slug}`,
  };

  return (
    <>
      {MOBILE_DIENSTEN[slug] && <MobileDetail data={MOBILE_DIENSTEN[slug]} />}
    <div className="p-dienst only-desktop">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <section className="shero">
        <SectorHeroAnim theme={slug} />
        <div className="wrap-wide">
          <div className="crumbs">
            <Link href="/">Home</Link> / <Link href="/diensten">Diensten</Link> /{" "}
            {d.naam}
          </div>
          <div style={{ position: "relative", paddingTop: "var(--space-6)" }}>
            <span className="badge">
              <Badge /> {d.badgeLabel}
            </span>
            <h1>{d.h1}</h1>
            <p>{d.intro}</p>
            <div className="hero-actions">
              <Link href="/contact" className="btn btn-primary">
                Plan een strategiegesprek <ArrowRight />
              </Link>
              <Link href="/klantverhalen" className="btn btn-ghost-dark">
                {d.ctaSecondary}
              </Link>
            </div>
            <div className="kpis">
              {d.kpis.map((k, i) => (
                <div key={i}>
                  <div className="n">{k.n}</div>
                  <div className="l">{k.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <nav className="subnav" aria-label="Op deze pagina">
        <div className="wrap-wide">
          <a href="#vraagstukken">Vraagstukken</a>
          <a href="#diensten">{d.naam}-diensten</a>
          <a href="#aanpak">Aanpak</a>
          <a href="#waarom">Waarom wij</a>
          <a href="#klantverhaal">Klantverhalen</a>
        </div>
      </nav>

      <section className="block" id="vraagstukken">
        <div className="wrap-wide">
          <div className="sec-head">
            <div className="kicker">Wanneer zet je dit in</div>
            <h2 style={{ fontSize: "var(--text-3xl)", fontWeight: "var(--fw-extrabold)", margin: "var(--space-4) 0" }}>
              Hiervoor komen organisaties bij ons
            </h2>
          </div>
          <div className="chal-grid">
            {d.vraagstukken.map((v, i) => (
              <div className="chal-card" key={i}>
                <div className="q">{v.q}</div>
                <h3>{v.titel}</h3>
                <p>{v.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="block" id="diensten" style={{ background: "var(--eggshell)" }}>
        <div className="wrap-wide">
          <div className="sec-head">
            <div className="kicker">Wat we doen</div>
            <h2 style={{ fontSize: "var(--text-3xl)", fontWeight: "var(--fw-extrabold)", margin: "var(--space-4) 0" }}>
              Onze {d.naam}-diensten
            </h2>
            <p>{d.pijlersIntro}</p>
          </div>
          <div className="pillars">
            {d.pijlers.map((p) => (
              <div className="pillar" key={p.num}>
                <div className="num">{p.num}</div>
                <h3>{p.titel}</h3>
                <p>{p.p}</p>
                {p.items.map((it, idx) => (
                  <details key={idx} open={idx === 0}>
                    <summary>
                      {it.summary} <Plus />
                    </summary>
                    <p>{it.p}</p>
                  </details>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="block sol" id="aanpak" style={{ background: "var(--paper)" }}>
        <div className="wrap-wide">
          <div className="sec-head">
            <div className="kicker">Onze aanpak</div>
            <h2 style={{ fontSize: "var(--text-3xl)", fontWeight: "var(--fw-extrabold)", margin: "var(--space-4) 0" }}>
              Zo pakken we het aan
            </h2>
          </div>
          {d.aanpak.map((row, i) => (
            <div className={i % 2 === 1 ? "sol-row rev" : "sol-row"} key={i}>
              <div className="txt">
                <div className="kicker">{row.kicker}</div>
                <h3>{row.titel}</h3>
                <p>{row.p}</p>
                <ul>
                  {row.punten.map((pt, idx) => (
                    <li key={idx}>
                      <Check /> {pt}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="ph">
                <span className="lbl">{row.ph}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="block why" id="waarom">
        <div className="wrap-wide">
          <div className="sec-head">
            <div className="kicker">Waarom The New Wave IT</div>
            <h2 style={{ fontSize: "var(--text-3xl)", fontWeight: "var(--fw-extrabold)", margin: "var(--space-4) 0" }}>
              De juiste partner voor jouw traject
            </h2>
          </div>
          <div className="grid">
            <div>
              {d.waarom.map((w, i) => (
                <div className="vitem" key={i}>
                  <div className="num">{String(i + 1).padStart(2, "0")}</div>
                  <div>
                    <h4>{w.titel}</h4>
                    <p>{w.p}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="experts">
              <p className="exphead">{d.expertsHead}</p>
              {d.experts.map((e, i) => (
                <div className="expert" key={i}>
                  <Image src={e.img} alt={`Portret ${e.naam}`} width={76} height={76} />
                  <div>
                    <div className="role">{e.role}</div>
                    <h4>{e.naam}</h4>
                    <div className="links">
                      <a href={`tel:${e.tel}`}>{e.tel.replace("+31", "0")}</a>
                      <a href="mailto:hello@thenewwaveit.com">Mail</a>
                      <a href="https://www.linkedin.com/company/the-new-wave-it" target="_blank" rel="noopener noreferrer">
                        LinkedIn
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="partners-strip">
        <div className="wrap-wide">
          <span className="plabel">Technologiepartners</span>
          {d.partners.map((p) => (
            <span className="plogo" key={p}>
              {p}
            </span>
          ))}
        </div>
      </section>

      <section className="block outcomes">
        <div className="wrap-wide">
          <div className="sec-head">
            <div className="kicker on-dark">Resultaten met {d.naam}</div>
            <h2 style={{ color: "#fff", fontSize: "var(--text-3xl)", fontWeight: "var(--fw-extrabold)", margin: "var(--space-4) 0 0" }}>
              Wat het oplevert
            </h2>
          </div>
          <div className="grid">
            {d.outcomes.map((o, i) => (
              <div className="oc" key={i}>
                <div className="n">{o.n}</div>
                <div className="l">{o.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="block featured" id="klantverhaal">
        <div className="wrap-wide">
          <div className="sec-head">
            <div className="kicker">Klantverhaal</div>
            <h2 style={{ fontSize: "var(--text-3xl)", fontWeight: "var(--fw-extrabold)", margin: "var(--space-4) 0 0" }}>
              {d.caseTitle}
            </h2>
          </div>
          <div className="case-mini">
            <div className="media" style={{ backgroundImage: `url('${d.caseImage}')` }}>
              <button type="button" className="playbig" aria-label="Bekijk video">
                <Play />
              </button>
            </div>
            <div className="body">
              <div className="kicker">{d.caseSector}</div>
              <blockquote>{d.caseQuote}</blockquote>
              <div className="who">
                <strong>{d.caseNaam}</strong>, {d.caseRol}
                <br />
                <Link href="/klantverhalen/coa" className="more" style={{ display: "inline-block", marginTop: 14 }}>
                  Lees het volledige verhaal →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="block">
        <div className="wrap-wide">
          <div className="eyebrow-row">
            <div>
              <div className="kicker">Inzichten</div>
              <h2>{d.insightsTitle}</h2>
            </div>
            <Link href="/inzichten" className="btn btn-outline btn-sm">
              Alle inzichten <ArrowRight />
            </Link>
          </div>
          <div className="cards3">
            {d.insights.map((post, i) => (
              <article className="post" key={i}>
                <div className="cover">
                  <span className="cat">{post.cat}</span>
                </div>
                <div className="pbody">
                  <div className="meta">{post.meta}</div>
                  <h3>{post.titel}</h3>
                  <Link href="/inzichten" className="more">
                    Lees meer <ArrowRight />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="wrap-wide">
          <h2>{d.ctaTitle}</h2>
          <Link href="/contact" className="btn btn-on">
            Plan een strategiegesprek <ArrowRight />
          </Link>
        </div>
      </section>
    </div>
    </>
  );
}
