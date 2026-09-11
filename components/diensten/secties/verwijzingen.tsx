import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { CaseVerwijzing } from "@/lib/content-blokken";
import type { Artikel } from "@/lib/inzichten";
import "./secties.css";

/** Doorverwijzingen: klantverhaal, sectoren en inzichten. */

interface KlantverhaalProps extends CaseVerwijzing {
  /** Alternatieve alinea zolang er geen goedgekeurd klantverhaal is. */
  waarborg?: string;
}

export function KlantverhaalSectie({ waarborg, ...c }: KlantverhaalProps) {
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
        <div className="sec-head">
          <div className="kicker">Klantverhaal</div>
          <h2 className="sectie-h2">{c.caseTitle}</h2>
        </div>
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
                Lees het volledige verhaal →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Sectoren waar deze richting het meest speelt. Verbindt de twee assen van de site. */
export function SectorkoppelingSectie({
  sectoren,
}: {
  sectoren: { slug: string; naam: string }[];
}) {
  if (!sectoren.length) return null;
  return (
    <section className="block sect-strip">
      <div className="wrap-wide">
        <div className="sec-head">
          <div className="kicker">In welke sectoren</div>
          <h2 className="sectie-h2">Waar dit het meest speelt</h2>
        </div>
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

export function InzichtenSectie({ artikelen, titel }: { artikelen: Artikel[]; titel?: string }) {
  if (!artikelen.length) return null;
  return (
    <section className="block">
      <div className="wrap-wide">
        <div className="eyebrow-row">
          <div>
            <div className="kicker">Inzichten</div>
            <h2>{titel || "Kennis over dit onderwerp"}</h2>
          </div>
          <Link href="/inzichten" className="btn btn-outline btn-sm">
            Alle inzichten <ArrowRight />
          </Link>
        </div>
        <div className="cards3">
          {artikelen.slice(0, 3).map((a) => (
            <Link href={`/inzichten/${a.slug}`} className="post" key={a.slug}>
              <div className="cover">
                <Image src={a.image} alt={a.titel} fill sizes="(max-width: 980px) 100vw, 33vw" />
                <span className="cat">{a.cat}</span>
              </div>
              <div className="pbody">
                <div className="meta">
                  {a.leestijd} · {a.datum}
                </div>
                <h3>{a.titel}</h3>
                <span className="more">
                  Lees meer <ArrowRight />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
