import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getArtikelen } from "@/lib/inzichten-data";
import { SectorHeroAnim } from "@/components/sector-hero-anim";
import { InzichtenList } from "@/components/inzichten-list";
import { MobileInzichten } from "@/components/mobile/mobile-inzichten";
import "./inzichten.css";
import "./mobile.css";

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
    <>
      <MobileInzichten artikelen={artikelen} />
    <div className="p-inzichten only-desktop">
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
            Praktische artikelen over Mendix, AI en digitale strategie, geschreven
            vanuit de vraagstukken van onze vijf sectoren, zonder jargon.
          </p>
        </div>
      </section>

      <section className="block">
        <div className="wrap-wide">
          <InzichtenList artikelen={artikelen} />
        </div>
      </section>

      <section className="block nieuwsbrief">
        <div className="wrap-wide">
          <div className="inner">
            <div>
              <div className="kicker">Nieuwsbrief</div>
              <h2>Eén mail per maand, alleen het beste</h2>
              <p>
                Onze scherpste inzichten over technologie in jouw sector. Geen
                sales, uitschrijven kan altijd.
              </p>
            </div>
            <form action="/contact">
              <input type="email" placeholder="naam@organisatie.nl" aria-label="E-mailadres" />
              <button type="submit" className="btn btn-primary">
                Aanmelden
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="wrap-wide">
          <h2>Liever sparren dan lezen?</h2>
          <Link href="/contact" className="btn btn-on">
            Plan een strategiegesprek <ArrowRight />
          </Link>
        </div>
      </section>
    </div>
    </>
  );
}
