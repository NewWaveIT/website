import type { Metadata } from "next";
import { cacheLife } from "next/cache";
import { PaginaHero } from "@/components/layout/pagina-hero";
import { ArticleContent } from "@/components/article-content";
import { getPagina } from "@/lib/paginas-data";
import { sanitizeFull } from "@/lib/cms/sanitize";
import "./algemene-voorwaarden.css";

export async function generateMetadata(): Promise<Metadata> {
  "use cache";
  cacheLife("content");

  const t = await getPagina("algemene-voorwaarden");
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: { canonical: "/algemene-voorwaarden" },
  };
}

export default async function AlgemeneVoorwaardenPage() {
  "use cache";
  cacheLife("content");

  const t = await getPagina("algemene-voorwaarden");
  return (
    <div className="p-algemene-voorwaarden">
      <PaginaHero
        kruimels={[{ naam: "Algemene voorwaarden", pad: "/algemene-voorwaarden" }]}
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
