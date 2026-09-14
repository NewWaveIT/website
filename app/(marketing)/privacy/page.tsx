import type { Metadata } from "next";
import { cacheLife } from "next/cache";
import { PaginaHero } from "@/components/layout/pagina-hero";
import { ArticleContent } from "@/components/article-content";
import { getPagina } from "@/lib/paginas-data";
import { sanitizeFull } from "@/lib/cms/sanitize";
import "./privacy.css";

export async function generateMetadata(): Promise<Metadata> {
  "use cache";
  cacheLife("content");

  const t = await getPagina("privacy");
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: { canonical: "/privacy" },
  };
}

/**
 * De verklaring zelf staat als één richtext-veld in het CMS. Hij stond hiervoor
 * als twintig alinea's JSX in dit bestand, en daardoor was elke juridische
 * correctie een deploy. Sanitizen blijft nodig: de tekst komt uit de editor.
 */
export default async function PrivacyPage() {
  "use cache";
  cacheLife("content");

  const t = await getPagina("privacy");
  return (
    <div className="p-legal">
      <PaginaHero
        kruimels={[{ naam: "Privacybeleid", pad: "/privacy" }]}
        titel={t.heroTitel}
        lead={t.heroLead}
      />

      <section className="legal-body">
        <div className="wrap-wide">
          <div className="prose">
            <ArticleContent html={sanitizeFull(t.body)} />
          </div>
        </div>
      </section>
    </div>
  );
}
