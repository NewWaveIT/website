import type { Metadata } from "next";
import Link from "next/link";
import { getArtikelen } from "@/lib/inzichten-data";
import { SectorHeroAnim } from "@/components/sector-hero-anim";
import { InzichtenList } from "@/components/inzichten-list";
import { LeadCta } from "@/components/inzichten/lead-cta";
import "./inzichten.css";

export const metadata: Metadata = {
  title: "Inzichten — kennis die je morgen kunt gebruiken",
  description:
    "Praktische artikelen over Mendix, AI en digitale strategie, geschreven vanuit de vraagstukken van onze vijf sectoren, zonder jargon.",
  alternates: { canonical: "/inzichten" },
};

// Publieke content komt uit Supabase (met lib-fallback); ververs periodiek.
export const revalidate = 300;

export default async function InzichtenPage() {
  const artikelen = await getArtikelen();
  return (
    <div className="p-inzichten">
      <section className="dhero">
        <SectorHeroAnim theme="inzichten" />
        <div className="wrap-wide">
          <div className="crumbs">
            <Link href="/">Home</Link> / Inzichten
          </div>
          <div className="kicker on-dark" style={{ marginTop: "var(--space-6)" }}>
            {"Inzichten"}
          </div>
          <h1>
            Kennis die je <em>morgen</em> kunt gebruiken.
          </h1>
          <p>
            Praktische artikelen over Mendix, AI en digitale strategie, geschreven vanuit de
            vraagstukken van onze vijf sectoren, zonder jargon.
          </p>
        </div>
      </section>

      <section className="block">
        <div className="wrap-wide">
          <InzichtenList artikelen={artikelen} />
        </div>
      </section>

      <LeadCta />
    </div>
  );
}
