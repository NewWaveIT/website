"use client";

import { useState } from "react";
import Link from "next/link";

export interface SectorSplitItem {
  naam: string;
  href: string;
  chal: string;
  image: string;
  cap: string;
  hook?: string;
  kpi?: string;
}

/**
 * Sector split-index (geport uit het design): links een sticky preview die op
 * hover van beeld + bijschrift wisselt, rechts een interactieve kieslijst.
 * `big` = overzichtsvariant (h2 + hook + kpi); anders homepagevariant (h3 + chal).
 */
export function SectorSplit({
  kicker,
  titel,
  intro,
  items,
  moreHref,
  moreTitel,
  moreChal,
  big = false,
}: {
  kicker: string;
  titel: string;
  intro: string;
  items: SectorSplitItem[];
  moreHref: string;
  moreTitel: string;
  moreChal?: string;
  big?: boolean;
}) {
  const [key, setKey] = useState<number | "more">(0);
  const imgIndex = key === "more" ? 0 : key;
  const caption = key === "more" ? moreTitel : items[key]?.cap;
  const Head = big ? "h2" : "h3";

  return (
    <div className="sec-split">
      <div className="sec-left">
        <div className="kicker">{kicker}</div>
        <h2>{titel}</h2>
        <p className="intro">{intro}</p>
        <div className="sec-preview">
          {items.map((it, i) => (
            <div
              key={i}
              className={`ci${i === imgIndex ? " on" : ""}`}
              style={{ backgroundImage: `url('${it.image}')` }}
            />
          ))}
          <span className="cap">{caption}</span>
        </div>
      </div>

      <div className="sec-index">
        {items.map((it, i) => (
          <Link
            key={i}
            href={it.href}
            className={`sec-item${key === i ? " active" : ""}`}
            onMouseEnter={() => setKey(i)}
            onFocus={() => setKey(i)}
          >
            <div className="top">
              <Head>{it.naam}</Head>
              <span className="idx">{String(i + 1).padStart(2, "0")}</span>
            </div>
            {it.hook && <div className="hook">{it.hook}</div>}
            <p className="chal">{it.chal}</p>
            {it.kpi && <span className="kpi">{it.kpi}</span>}
          </Link>
        ))}
        <Link
          href={moreHref}
          className={`sec-item more${key === "more" ? " active" : ""}`}
          onMouseEnter={() => setKey("more")}
          onFocus={() => setKey("more")}
        >
          <div className="top">
            <Head>
              {moreTitel} <span className="arrow">→</span>
            </Head>
          </div>
          {moreChal && <p className="chal">{moreChal}</p>}
        </Link>
      </div>
    </div>
  );
}
