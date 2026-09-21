import { JsonLd } from "@/components/json-ld";
import { cacheLife } from "next/cache";
import type { Metadata } from "next";
import { Kruimelpad } from "@/components/kruimelpad";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getArtikelen, getArtikelBySlug, isoDatum } from "@/lib/inzichten-data";
import { ArticleContent } from "@/components/article-content";
import { BeeldKader } from "@/components/beeld-kader";
import { AuteurBlok } from "@/components/inzichten/auteur-blok";
import { ArtikelZijkolom } from "@/components/inzichten/artikel-zijkolom";
import { koppenUit } from "@/lib/artikel-koppen";
import { kiesVerwant, VerwanteArtikelen } from "@/components/inzichten/verwante-artikelen";
import { LeadCta } from "@/components/inzichten/lead-cta";
import { getPagina } from "@/lib/paginas-data";
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
  const [a, t, alg, alle] = await Promise.all([
    getArtikelBySlug(slug),
    getPagina("inzichten"),
    getPagina("algemeen"),
    getArtikelen(),
  ]);
  if (!a) notFound();

  const verwant = kiesVerwant(alle, a);
  // De inhoudsopgave komt uit de tekst zelf; geen h2's ⇒ geen lijst.
  const koppen = a.inhoudHtml ? koppenUit(a.inhoudHtml) : [];

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
          <Kruimelpad
            opDonker
            kruimels={[{ naam: "Inzichten", pad: "/inzichten" }, { naam: a.cat }]}
          />
          <h1>{a.titel}</h1>
          <div className="byline">
            {a.auteurFoto && (
              <Image className="av" src={a.auteurFoto} alt={a.auteur} width={40} height={40} />
            )}
            <span>
              {alg.artikelDoor} <strong>{a.auteur}</strong>
              {/* Het label hing eerder onvoorwaardelijk aan de waarde, dus een
                  leeg leestijdveld gaf letterlijk " leestijd · 18 sep 2026".
                  De leestijd wordt nu afgeleid uit de tekst, maar de rij blijft
                  ook kloppen als er ooit toch niets is. */}
              <span className="sub">
                {a.leestijd ? `${a.leestijd} leestijd · ` : ""}
                {a.datum}
              </span>
            </span>
          </div>
        </div>
      </section>

      <div className="wrap">
        <BeeldKader className="acover" src={a.image} alt={a.titel} maxBreedte={980} priority />
      </div>

      {/* Twee kolommen vanaf 1100px: de tekst smaller (66 tekens in plaats van
          80) en de leegte ernaast gevuld met de inhoudsopgave. Daaronder valt
          de zijkolom weg en blijft alleen de tekst over. */}
      <article className="block">
        <div className="wrap artikel-grid">
          <div className="aprose">
            {/* Een lege samenvatting leverde een lege alinea van 22px op. */}
            {a.intro && <p className="lead">{a.intro}</p>}
            {a.inhoudHtml ? (
              <ArticleContent html={a.inhoudHtml} />
            ) : (
              a.body.map((p, i) => <p key={i}>{p}</p>)
            )}
            <AuteurBlok
              naam={a.auteur}
              rol={a.auteurRol}
              foto={a.auteurFoto}
              label={t.artikelAuteurLabel}
              cta={t.artikelAuteurCta}
            />
          </div>
          <ArtikelZijkolom
            koppen={koppen}
            titel={t.artikelInhoudTitel}
            leestijd={a.leestijd}
            datum={a.datum}
            auteur={a.auteur}
            doorLabel={alg.artikelDoor}
          />
        </div>
      </article>

      <VerwanteArtikelen
        artikelen={verwant}
        titel={t.artikelVerwantTitel}
        meerLabel={alg.inzichtenMeer}
      />

      <LeadCta
        titel={t.artikelLeadTitel}
        tekst={t.artikelLeadTekst}
        tk={{ leadHint: alg.leadHint, leadKnop: alg.leadKnop, leadKnopBezig: alg.leadKnopBezig }}
      />
    </div>
  );
}
