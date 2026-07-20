import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { getArtikelen, getArtikelBySlug } from "@/lib/inzichten-data";
import "./article.css";

export const revalidate = 300;

export async function generateStaticParams() {
  return (await getArtikelen()).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = await getArtikelBySlug(slug);
  if (!a) return {};
  return {
    title: a.titel,
    description: a.intro,
    alternates: { canonical: `/inzichten/${slug}` },
    openGraph: { type: "article", images: [a.image] },
  };
}

export default async function ArtikelPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = await getArtikelBySlug(slug);
  if (!a) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.titel,
    description: a.intro,
    image: `https://thenewwaveit.com${a.image}`,
    datePublished: a.datum,
    author: { "@type": "Person", name: a.auteur },
    publisher: { "@type": "Organization", name: "The New Wave IT" },
    articleSection: a.cat,
  };

  return (
    <div className="p-artikel">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <section className="ahero">
        <div className="wrap">
          <div className="crumbs">
            <Link href="/">Home</Link> / <Link href="/inzichten">Inzichten</Link> / {a.cat}
          </div>
          <div className="kicker on-dark">{`// ${a.cat}`}</div>
          <h1>{a.titel}</h1>
          <div className="meta">
            {a.leestijd} leestijd · {a.datum} · door {a.auteur}
          </div>
        </div>
      </section>

      <div className="wrap">
        <div className="acover">
          <Image src={a.image} alt={a.titel} fill sizes="(max-width: 980px) 100vw, 980px" />
        </div>
      </div>

      <article className="block">
        <div className="wrap aprose">
          <p className="lead">{a.intro}</p>
          {a.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </article>

      <section className="cta">
        <div className="wrap-wide">
          <h2>Liever sparren over jouw situatie?</h2>
          <Link href="/contact" className="btn btn-on">
            Plan een strategiegesprek <ArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
}
