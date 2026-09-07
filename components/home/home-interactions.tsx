"use client";

import { useEffect } from "react";

/**
 * Client-side interactielaag voor de homepage: diensten-tabs, featured-case
 * parallax en scroll-reveal. Respecteert prefers-reduced-motion.
 * (De oude hero-word-reveal + canvas-golf vervielen met de split-hero.)
 */
export function HomeInteractions() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: Array<() => void> = [];

    // Diensten-tabs
    const tabs = Array.from(document.querySelectorAll<HTMLButtonElement>(".tab"));
    const onTab = (t: HTMLButtonElement) => () => {
      const id = t.getAttribute("data-tab");
      tabs.forEach((x) => x.setAttribute("aria-selected", x === t ? "true" : "false"));
      document.querySelectorAll<HTMLElement>(".panel").forEach((p) => {
        p.classList.toggle("active", p.getAttribute("data-panel") === id);
      });
    };
    tabs.forEach((t) => {
      const handler = onTab(t);
      t.addEventListener("click", handler);
      cleanups.push(() => t.removeEventListener("click", handler));
    });

    // Featured case: parallax op Ken Burns-laag
    (() => {
      if (reduced) return;
      const wrap = document.querySelector<HTMLElement>(".fcase .kbwrap");
      if (!wrap || !wrap.parentElement) return;
      const parent = wrap.parentElement;
      let ticking = false;
      const update = () => {
        ticking = false;
        const r = parent.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) return;
        const d = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
        wrap.style.transform = `translateY(${(-d * 44).toFixed(1)}px)`;
      };
      const onScroll = () => {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(update);
        }
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      update();
      cleanups.push(() => window.removeEventListener("scroll", onScroll));
    })();

    // Scroll-reveal
    (() => {
      if (reduced || !("IntersectionObserver" in window)) return;
      const targets = document.querySelectorAll<HTMLElement>(
        ".sector-card, .fcase, .wcard, .post, .svc-card, .sec-head, .eyebrow-row",
      );
      targets.forEach((el) => el.classList.add("reveal"));
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (!e.isIntersecting) return;
            const el = e.target as HTMLElement;
            const sibs = Array.prototype.filter.call(el.parentNode?.children ?? [], (c: Element) =>
              c.classList.contains("reveal"),
            );
            const i = sibs.indexOf(el);
            el.style.transitionDelay = `${i > 0 ? Math.min(i, 6) * 70 : 0}ms`;
            el.classList.add("in");
            io.unobserve(el);
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
      );
      targets.forEach((el) => io.observe(el));
      cleanups.push(() => io.disconnect());
    })();

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
