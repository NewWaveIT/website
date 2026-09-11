import { JsonLd } from "@/components/json-ld";
import { cacheLife } from "next/cache";
import type { Metadata } from "next";
import { Kruimelpad } from "@/components/kruimelpad";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getArtikelen, getArtikelBySlug, isoDatum } from "@/lib/inzichten-data";
import { ArticleContent } from "@/components/article-content";
import { LeadCta } from "@/components/inzichten/lead-cta";
import { SITE_URL } from "@/lib/site";
import "./article.css";

export async function generateStaticParams() {
  return (await getArtikelen()).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  "use cache";
  cacheLife("content");

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

export default async function ArtikelPage({ params }: { params: Promise<{ slug: string }> }) {
  "use cache";
  cacheLife("content");

  const { slug } = await params;
  const a = await getArtikelBySlug(slug);
  if (!a) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.titel,
    description: a.intro,
    image: `${SITE_URL}${a.image}`,
    ...(isoDatum(a.datum) ? { datePublished: isoDatum(a.datum) } : {}),
    mainEntityOfPage: `${SITE_URL}/inzichten/${slug}`,
    author: { "@type": "Person", name: a.auteur },
    publisher: {
      "@type": "Organization",
      name: "The New Wave IT",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/assets/logos/logo-horizontal-espresso.png`,
      },
    },
    articleSection: a.cat,
  };

  return (
    <div className="p-artikel">
      <JsonLd data={jsonLd} />

      <section className="ahero">
        <div className="wrap">
          <Kruimelpad kruimels={[{ naam: "Inzichten", pad: "/inzichten" }, { naam: a.cat }]} />
          <div className="kicker on-dark">{`// ${a.cat}`}</div>
          <h1>{a.titel}</h1>
          <div className="byline">
            {a.auteurFoto && (
              <Image className="av" src={a.auteurFoto} alt={a.auteur} width={40} height={40} />
            )}
            <span>
              door <strong>{a.auteur}</strong>
              <span className="sub">
                {a.leestijd} leestijd · {a.datum}
              </span>
            </span>
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
          {a.inhoudHtml ? (
            <ArticleContent html={a.inhoudHtml} />
          ) : (
            a.body.map((p, i) => <p key={i}>{p}</p>)
          )}
        </div>
      </article>

      <LeadCta
        titel="Dit soort inzichten, één keer per maand"
        tekst="Laat je e-mail achter en ontvang onze scherpste inzichten over technologie in jouw sector. Geen sales, uitschrijven kan altijd."
      />
    </div>
  );
}
