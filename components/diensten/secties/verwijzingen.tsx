import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { CaseVerwijzing } from "@/lib/content-blokken";
import type { Artikel } from "@/lib/inzichten";
import "./secties.css";
import { getPagina } from "@/lib/paginas-data";
import { ArtikelKaart } from "@/components/artikel-kaart";
import { SectieKop } from "@/components/sectie-kop";

/** Doorverwijzingen: klantverhaal, sectoren en inzichten. */

interface KlantverhaalProps extends CaseVerwijzing {
  /** Alternatieve alinea zolang er geen goedgekeurd klantverhaal is. */
  waarborg?: string;
}

export async function KlantverhaalSectie({ waarborg, ...c }: KlantverhaalProps) {
  const t = await getPagina("dienst-detail");
  if (!c.caseTitle) {
    if (!waarborg) return null;
    return (
      <section className="block">
        <div className="wrap-wide">
          <div className="waarborg-card">
            <p>{waarborg}</p>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="block featured" id="klantverhaal">
      <div className="wrap-wide">
        <SectieKop kicker={t.caseKicker} titel={c.caseTitle} groot />
        <div className="case-mini">
          <div className="media">
            {c.caseImage && (
              <Image src={c.caseImage} alt="" fill sizes="(max-width: 980px) 100vw, 45vw" />
            )}
          </div>
          <div className="body">
            <div className="kicker">{c.caseSector}</div>
            <blockquote>{c.caseQuote}</blockquote>
            <div className="who">
              <strong>{c.caseNaam}</strong>, {c.caseRol}
              <br />
              <Link href={c.caseHref ?? "/klantverhalen"} className="more lees-meer">
                {t.caseLink}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Sectoren waar deze richting het meest speelt. Verbindt de twee assen van de site. */
export async function SectorkoppelingSectie({
  sectoren,
}: {
  sectoren: { slug: string; naam: string }[];
}) {
  const t = await getPagina("dienst-detail");
  if (!sectoren.length) return null;
  return (
    <section className="block sect-strip">
      <div className="wrap-wide">
        <SectieKop kicker={t.sectorenKicker} titel={t.sectorenTitel} groot />
        <div className="row">
          {sectoren.map((s) => (
            <Link href={`/sectoren/${s.slug}`} className="sect-chip" key={s.slug}>
              {s.naam}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export async function InzichtenSectie({
  artikelen,
  titel,
}: {
  artikelen: Artikel[];
  titel?: string;
}) {
  const t = await getPagina("dienst-detail");
  if (!artikelen.length) return null;
  return (
    <section className="block">
      <div className="wrap-wide">
        <div className="eyebrow-row">
          <div>
            <div className="kicker">{t.inzichtenKicker}</div>
            <h2>{titel || "Kennis over dit onderwerp"}</h2>
          </div>
          <Link href="/inzichten" className="btn btn-outline btn-sm">
            {t.inzichtenAlle} <ArrowRight />
          </Link>
        </div>
        <div className="cards3">
          {artikelen.slice(0, 3).map((a) => (
            <ArtikelKaart key={a.slug} artikel={a} meerLabel={t.inzichtenMeer} />
          ))}
        </div>
      </div>
    </section>
  );
}
