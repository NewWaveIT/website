import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Building2, Play, ArrowRight } from "lucide-react";
import { getKlantverhalen, getKlantverhaalBySlug } from "@/lib/klantverhalen-data";
import { MobileCase } from "@/components/mobile/mobile-case";
import "./case.css";
import "./mobile.css";

export const revalidate = 300;

export async function generateStaticParams() {
  return (await getKlantverhalen()).map((k) => ({ slug: k.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const k = await getKlantverhaalBySlug(slug);
  if (!k) return {};
  return {
    title: `Klantverhaal ${k.tag}`,
    description: k.intro,
    alternates: { canonical: `/klantverhalen/${slug}` },
    openGraph: { type: "article", images: [k.image] },
  };
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const k = await getKlantverhaalBySlug(slug);
  if (!k) notFound();

  const meer = (await getKlantverhalen()).filter((x) => x.slug !== slug).slice(0, 3);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: k.h1,
    description: k.intro,
    image: `https://thenewwaveit.com${k.image}`,
    author: { "@type": "Organization", name: "The New Wave IT" },
    publisher: { "@type": "Organization", name: "The New Wave IT" },
  };

  return (
    <>
      <MobileCase k={k} meer={meer} />
    <div className="p-case only-desktop">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <section className="chero">
        <div className="wrap-wide">
          <div className="crumbs">
            <Link href="/">Home</Link> / <Link href="/klantverhalen">Klantverhalen</Link> /{" "}
            {k.quoteNaam ? k.tag.split("·").pop()?.trim() : k.tag}
          </div>
          <span className="tag">
            <Building2 /> {k.tag}
          </span>
          <h1>{k.h1}</h1>
          <p>{k.intro}</p>
          <div className="video" style={{ backgroundImage: `url('${k.image}')` }}>
            <button type="button" className="playbig" aria-label="Bekijk klantvideo">
              <Play />
            </button>
            <span className="cap">[ klantvideo · {k.quoteNaam} over de samenwerking ]</span>
          </div>
        </div>
      </section>

      <div className="impact">
        <div className="wrap-wide">
          {k.impact.map((m, i) => (
            <div className="m" key={i}>
              <div className="n">{m.n}</div>
              <div className="l">{m.l}</div>
            </div>
          ))}
        </div>
      </div>

      <section className="block">
        <div className="wrap-wide article">
          <div className="prose">
            <h2>De uitdaging</h2>
            <div dangerouslySetInnerHTML={{ __html: k.challenge }} />
            <p className="pull">{k.pull}</p>
            <h2>De aanpak</h2>
            {k.aanpak.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <h2>Het resultaat</h2>
            <div dangerouslySetInnerHTML={{ __html: k.resultaat }} />
          </div>
          <aside>
            <div className="aside-card">
              <h4>Over dit project</h4>
              <div className="row">
                <span className="k">Sector</span>
                <span className="v">{k.aside.sector}</span>
              </div>
              <div className="row">
                <span className="k">Diensten</span>
                <span className="v">{k.aside.diensten}</span>
              </div>
              <div className="row">
                <span className="k">Doorlooptijd</span>
                <span className="v">{k.aside.doorlooptijd}</span>
              </div>
              <div className="row">
                <span className="k">Team</span>
                <span className="v">{k.aside.team}</span>
              </div>
              <Link href="/contact" className="btn btn-primary">
                Vergelijkbaar vraagstuk? <ArrowRight />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="block qblock">
        <div className="wrap-wide">
          <div className="av" />
          <div>
            <blockquote>{k.quote}</blockquote>
            <div className="who">
              <strong>{k.quoteNaam}</strong>, {k.quoteRol}
            </div>
          </div>
        </div>
      </section>

      <section className="block">
        <div className="wrap-wide">
          <div className="eyebrow-row">
            <div>
              <div className="kicker">Meer klantverhalen</div>
              <h2>Resultaten in andere sectoren</h2>
            </div>
            <Link href="/klantverhalen" className="btn btn-outline btn-sm">
              Alle verhalen <ArrowRight />
            </Link>
          </div>
          <div className="cards3">
            {meer.map((m) => (
              <Link href={`/klantverhalen/${m.slug}`} className="post" key={m.slug}>
                <div className="cover" style={{ backgroundImage: `url('${m.image}')` }}>
                  <span className="cat">{m.sector}</span>
                </div>
                <div className="pbody">
                  <h3>{m.cardTitel}</h3>
                  <span className="more">
                    Lees het verhaal <ArrowRight />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="wrap-wide">
          <h2>Herken je dit vraagstuk in jouw organisatie?</h2>
          <Link href="/contact" className="btn btn-on">
            Plan een strategiegesprek <ArrowRight />
          </Link>
        </div>
      </section>
    </div>
    </>
  );
}
