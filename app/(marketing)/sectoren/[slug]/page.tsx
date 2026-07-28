import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  Building2,
  TrainFront,
  Banknote,
  HeartPulse,
  Factory,
  Check,
  Play,
  ArrowRight,
} from "lucide-react";
import { getSectorBySlug, getSectorSlugs } from "@/lib/sectoren-detail-data";
import { stripHtml } from "@/lib/cms/sanitize";
import { getArtikelenVoorSector } from "@/lib/inzichten-data";
import { MOBILE_SECTOREN } from "@/lib/mobile-detail";
import { SectorHeroAnim } from "@/components/sector-hero-anim";
import { MobileDetail } from "@/components/mobile/mobile-detail";
import "./sector-detail.css";

export const revalidate = 300;

const ICONS = {
  "building-2": Building2,
  "train-front": TrainFront,
  banknote: Banknote,
  "heart-pulse": HeartPulse,
  factory: Factory,
};

export async function generateStaticParams() {
  return (await getSectorSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = await getSectorBySlug(slug);
  if (!s) return {};
  return {
    title: `${s.naam} — ${s.h1}`,
    description: stripHtml(s.intro),
    alternates: { canonical: `/sectoren/${slug}` },
  };
}

export default async function SectorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = await getSectorBySlug(slug);
  if (!s) notFound();
  const artikelen = await getArtikelenVoorSector(slug);

  const Icon = ICONS[s.icon];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: `IT-consultancy voor ${s.naam.toLowerCase()}`,
    name: `The New Wave IT — ${s.naam}`,
    description: stripHtml(s.intro),
    provider: { "@type": "Organization", name: "The New Wave IT" },
    url: `https://thenewwaveit.com/sectoren/${slug}`,
  };

  return (
    <>
      {MOBILE_SECTOREN[slug] && <MobileDetail data={MOBILE_SECTOREN[slug]} />}
    <div className="p-sector only-desktop">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <section className="shero">
        <SectorHeroAnim theme={slug === "publieke-sector" ? "publiek" : slug} />
        <div className="wrap-wide">
          <div className="crumbs">
            <Link href="/">Home</Link> / <Link href="/sectoren">Sectoren</Link> /{" "}
            {s.naam}
          </div>
          <div style={{ position: "relative", paddingTop: "var(--space-6)" }}>
            <span className="badge">
              <Icon /> {s.naam}
            </span>
            <h1>{s.h1}</h1>
            <p dangerouslySetInnerHTML={{ __html: s.intro }} />
            <div className="hero-actions">
              <Link href="/contact" className="btn btn-primary">
                Plan een strategiegesprek <ArrowRight />
              </Link>
              <Link href="/contact?type=sectorrapport" className="btn btn-ghost-dark">
                Download sectorrapport
              </Link>
            </div>
            <div className="kpis">
              {s.kpis.map((k, i) => (
                <div key={i}>
                  <div className="n">{k.n}</div>
                  <div className="l">{k.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="block">
        <div className="wrap-wide">
          <div className="sec-head">
            <div className="kicker">Businessvraagstukken</div>
            <h2 style={{ fontSize: "var(--text-3xl)", fontWeight: "var(--fw-extrabold)", margin: "var(--space-4) 0" }}>
              De uitdagingen die we dagelijks oplossen
            </h2>
            <p>{s.challengesIntro}</p>
          </div>
          <div className="chal-grid">
            {s.challenges.map((c, i) => (
              <div className="chal-card" key={i}>
                <div className="q">{c.q}</div>
                <h3>{c.titel}</h3>
                <p>{c.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="block sol">
        <div className="wrap-wide">
          <div className="sec-head">
            <div className="kicker">Onze aanpak</div>
            <h2 style={{ fontSize: "var(--text-3xl)", fontWeight: "var(--fw-extrabold)", margin: "var(--space-4) 0" }}>
              Van vraagstuk naar werkende oplossing
            </h2>
          </div>
          {s.solutions.map((row, i) => (
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

      <section className="block outcomes">
        <div className="wrap-wide">
          <div className="sec-head">
            <div className="kicker on-dark">Resultaten in {s.naam.toLowerCase()}</div>
            <h2 style={{ color: "#fff", fontSize: "var(--text-3xl)", fontWeight: "var(--fw-extrabold)", margin: "var(--space-4) 0 0" }}>
              Wat het oplevert
            </h2>
          </div>
          <div className="grid">
            {s.outcomes.map((o, i) => (
              <div className="oc" key={i}>
                <div className="n">{o.n}</div>
                <div className="l">{o.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="block featured">
        <div className="wrap-wide">
          <div className="sec-head">
            <div className="kicker">Klantverhaal</div>
            <h2 style={{ fontSize: "var(--text-3xl)", fontWeight: "var(--fw-extrabold)", margin: "var(--space-4) 0 0" }}>
              {s.caseTitle}
            </h2>
          </div>
          <div className="case-mini">
            <div className="media" style={{ backgroundImage: `url('${s.caseImage}')` }}>
              <button type="button" className="playbig" aria-label="Bekijk video">
                <Play />
              </button>
            </div>
            <div className="body">
              <div className="kicker">{s.caseSector}</div>
              <blockquote>{s.caseQuote}</blockquote>
              <div className="who">
                <strong>{s.caseNaam}</strong>, {s.caseRol}
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
              <div className="kicker">Inzichten voor {s.naam.toLowerCase()}</div>
              <h2>{s.insightsTitle}</h2>
            </div>
            <Link href="/inzichten" className="btn btn-outline btn-sm">
              Alle inzichten <ArrowRight />
            </Link>
          </div>
          <div className="cards3">
            {artikelen.length > 0
              ? artikelen.slice(0, 3).map((a) => (
                  <Link href={`/inzichten/${a.slug}`} className="post" key={a.slug}>
                    <div className="cover">
                      <Image src={a.image} alt={a.titel} fill sizes="(max-width: 980px) 100vw, 33vw" style={{ objectFit: "cover" }} />
                      <span className="cat">{a.cat}</span>
                    </div>
                    <div className="pbody">
                      <div className="meta">{a.leestijd} · {a.datum}</div>
                      <h3>{a.titel}</h3>
                      <span className="more">
                        Lees meer <ArrowRight />
                      </span>
                    </div>
                  </Link>
                ))
              : s.insights.map((post, i) => (
                  <article className="post" key={i}>
                    <div className="cover">
                      <span className="cat">{s.naam}</span>
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
          <h2>{s.ctaTitle}</h2>
          <Link href="/contact" className="btn btn-on">
            Plan een strategiegesprek <ArrowRight />
          </Link>
        </div>
      </section>
    </div>
    </>
  );
}
