"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

type KPI = { n: string; l: string };
export type CaseCard = {
  slug: string;
  tag: string;
  image: string;
  quote: string;
  naam: string;
  rol: string;
  impact: KPI[];
};

function initials(naam: string): string {
  return naam
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/** Klantverhalen-carrousel: één verhaal tegelijk, met pijlen, dots en swipe. */
export function CasesCarousel({ items }: { items: CaseCard[] }) {
  const [i, setI] = useState(0);
  const [touch, setTouch] = useState<number | null>(null);
  if (items.length === 0) return null;

  const c = items[i];
  if (!c) return null;
  const go = (d: number) => setI((v) => (v + d + items.length) % items.length);

  return (
    <div
      className="fcase-wrap"
      onTouchStart={(e) => setTouch(e.touches[0]?.clientX ?? null)}
      onTouchEnd={(e) => {
        if (touch === null) return;
        const end = e.changedTouches[0]?.clientX;
        if (end === undefined) return;
        const dx = end - touch;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        setTouch(null);
      }}
    >
      <div className="fcase">
        <div className="media">
          <div className="kbwrap">
            <div className="kb" style={{ backgroundImage: `url('${c.image}')` }} />
          </div>
          {c.tag && <span className="tag">{c.tag}</span>}
        </div>
        <div className="body">
          {c.quote && <blockquote>“{c.quote}”</blockquote>}
          {c.impact.length > 0 && (
            <div className="metrics">
              {c.impact.slice(0, 3).map((m, k) => (
                <div className="m" key={k}>
                  <div className="n">{m.n}</div>
                  <div className="l">{m.l}</div>
                </div>
              ))}
            </div>
          )}
          <div className="who">
            {c.naam && (
              <>
                <div className="av">{initials(c.naam)}</div>
                <div>
                  <div className="nm">{c.naam}</div>
                  <div className="rl">{c.rol}</div>
                </div>
              </>
            )}
            <Link
              href={`/klantverhalen/${c.slug}`}
              className="btn btn-outline btn-sm"
              style={{ marginLeft: "auto" }}
            >
              Lees het verhaal
            </Link>
          </div>
        </div>
      </div>

      {items.length > 1 && (
        <div className="fcase-nav">
          <button
            type="button"
            className="fcase-arrow"
            aria-label="Vorige klantverhaal"
            onClick={() => go(-1)}
          >
            <ChevronLeft />
          </button>
          <div className="fcase-dots">
            {items.map((_, k) => (
              <button
                key={k}
                type="button"
                aria-label={`Ga naar klantverhaal ${k + 1}`}
                aria-current={k === i}
                className={k === i ? "on" : ""}
                onClick={() => setI(k)}
              />
            ))}
          </div>
          <button
            type="button"
            className="fcase-arrow"
            aria-label="Volgende klantverhaal"
            onClick={() => go(1)}
          >
            <ChevronRight />
          </button>
        </div>
      )}
    </div>
  );
}
