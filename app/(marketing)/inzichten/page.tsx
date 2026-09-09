import { cacheLife } from "next/cache";
import type { Metadata } from "next";
import { Kruimelpad } from "@/components/kruimelpad";
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

export default async function InzichtenPage() {
  "use cache";
  cacheLife("content");

  const artikelen = await getArtikelen();
  return (
    <div className="p-inzichten">
      <section className="dhero">
        <SectorHeroAnim theme="inzichten" />
        <div className="wrap-wide">
          <Kruimelpad kruimels={[{ naam: "Inzichten", pad: "/inzichten" }]} />
          <div className="kicker on-dark" style={{ marginTop: "var(--space-6)" }}>
            {"Inzichten"}
          </div>
          <h1>
            Kennis die je <em>morgen</em> kunt gebruiken.
          </h1>
          <p>
            Sectorkennis die je vooruit denkt. Praktijkervaring uit projecten bij gemeenten, banken,
            zorginstellingen en mobiliteitsbedrijven, vertaald naar artikelen die je direct kan
            gebruiken, geen gerecycled nieuws.
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
