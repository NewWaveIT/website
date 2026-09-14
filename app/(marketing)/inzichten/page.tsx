import { cacheLife } from "next/cache";
import type { Metadata } from "next";
import { PaginaHero } from "@/components/layout/pagina-hero";
import { getArtikelen } from "@/lib/inzichten-data";
import { SectorHeroAnim } from "@/components/sector-hero-anim";
import { InzichtenList } from "@/components/inzichten-list";
import { LeadCta } from "@/components/inzichten/lead-cta";
import { getPagina } from "@/lib/paginas-data";
import "./inzichten.css";

export async function generateMetadata(): Promise<Metadata> {
  "use cache";
  cacheLife("content");

  const t = await getPagina("inzichten");
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: { canonical: "/inzichten" },
  };
}

// Publieke content komt uit Supabase (met lib-fallback); ververs periodiek.

export default async function InzichtenPage() {
  "use cache";
  cacheLife("content");

  const [t, artikelen] = await Promise.all([getPagina("inzichten"), getArtikelen()]);
  return (
    <div className="p-inzichten">
      <PaginaHero
        kruimels={[{ naam: "Inzichten", pad: "/inzichten" }]}
        kicker={t.heroKicker}
        titel={t.heroTitleStart}
        accent={t.heroAccent}
        staart={t.heroTitleEnd}
        lead={t.heroLead}
        achtergrond={<SectorHeroAnim theme="inzichten" />}
      />

      <section className="block">
        <div className="wrap-wide">
          <InzichtenList artikelen={artikelen} />
        </div>
      </section>

      <LeadCta titel={t.leadTitel} tekst={t.leadTekst} />
    </div>
  );
}
