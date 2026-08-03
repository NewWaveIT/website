"use client";

import { useEffect, useRef } from "react";

/**
 * Voortgangsgolf (desktop) — geport uit guidelines/motion-scrollwave.html.
 * Toont de scrollvoortgang als een golf onder de sticky nav; fase gekoppeld
 * aan scrollY, stilstaand bij prefers-reduced-motion (voortgang blijft werken).
 * Alleen actief ≥768px; mobiel heeft de golf in MobileShell.
 */
export function ScrollWave() {
  const baseRef = useRef<SVGPathElement>(null);
  const fillRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(min-width: 768px)").matches) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const W = 1200,
      MID = 11,
      AMP = 5;
    const wavePath = (len: number, phase: number) => {
      let d = "";
      for (let x = 0; x <= len; x += 6) {
        const y = MID + AMP * Math.sin(x * 0.03 - phase);
        d += (x === 0 ? "M" : "L") + x.toFixed(1) + "," + y.toFixed(1);
      }
      return d || `M0,${MID}`;
    };

    let ticking = false;
    const draw = () => {
      ticking = false;
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      const phase = reduced ? 0 : window.scrollY * 0.05;
      baseRef.current?.setAttribute("d", wavePath(W, phase));
      fillRef.current?.setAttribute("d", wavePath(W * p, phase));
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(draw);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    draw();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="scrollwave-d" aria-hidden="true">
      <svg viewBox="0 0 1200 22" preserveAspectRatio="none">
        <path ref={baseRef} className="sw-base" d="" />
        <path ref={fillRef} className="sw-fill" d="" />
      </svg>
    </div>
  );
}
