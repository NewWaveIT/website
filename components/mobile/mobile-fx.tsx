"use client";

import { useEffect } from "react";

/**
 * Gedeelde mobiele interacties (geport uit mobile.js): scroll-reveal (.rv),
 * accordeon (.acc-head), carrousel-dots (.carousel + .dots) en count-up
 * (.pstat .n). Werkt op alle .m-page-content; alleen actief ≤767px.
 */
export function MobileFx() {
  useEffect(() => {
    if (!window.matchMedia("(max-width: 767px)").matches) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scope = document.querySelector(".m-page");
    if (!scope) return;
    const cleanups: Array<() => void> = [];

    // Reveal
    if (!reduced && "IntersectionObserver" in window) {
      const targets = scope.querySelectorAll<HTMLElement>(".rv");
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (!e.isIntersecting) return;
            const el = e.target as HTMLElement;
            const sibs = Array.prototype.filter.call(
              el.parentNode?.children ?? [],
              (c: Element) => c.classList.contains("rv"),
            );
            el.style.transitionDelay = `${Math.min(sibs.indexOf(el), 5) * 70}ms`;
            el.classList.add("in");
            io.unobserve(el);
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -30px 0px" },
      );
      targets.forEach((el) => io.observe(el));
      cleanups.push(() => io.disconnect());
    } else {
      scope.querySelectorAll(".rv").forEach((el) => el.classList.add("in"));
    }

    // Accordeon
    const heads = scope.querySelectorAll<HTMLButtonElement>(".acc-head");
    heads.forEach((h) => {
      // Toegankelijkheid: koppel kop aan paneel + geef open-status door.
      const item = h.parentElement;
      const body = item?.querySelector<HTMLElement>(".acc-body");
      h.setAttribute("aria-expanded", item?.classList.contains("open") ? "true" : "false");
      if (body) {
        const bid = body.id || `acc-panel-${Math.random().toString(36).slice(2, 8)}`;
        body.id = bid;
        h.setAttribute("aria-controls", bid);
      }
      const handler = () => {
        if (!item) return;
        const wasOpen = item.classList.contains("open");
        item.closest(".acc")?.querySelectorAll(".acc-item").forEach((i) => {
          i.classList.remove("open");
          i.querySelector(".acc-head")?.setAttribute("aria-expanded", "false");
        });
        if (!wasOpen) {
          item.classList.add("open");
          h.setAttribute("aria-expanded", "true");
        }
      };
      h.addEventListener("click", handler);
      cleanups.push(() => h.removeEventListener("click", handler));
    });

    // Carrousel-dots
    scope.querySelectorAll<HTMLElement>(".carousel").forEach((car) => {
      const dots = car.nextElementSibling as HTMLElement | null;
      if (!dots || !dots.classList.contains("dots")) return;
      const cards = car.children;
      dots.innerHTML = "";
      for (let i = 0; i < cards.length; i++) {
        const d = document.createElement("i");
        if (i === 0) d.className = "on";
        dots.appendChild(d);
      }
      const onScroll = () => {
        const first = cards[0] as HTMLElement | undefined;
        if (!first) return;
        let i = Math.round(car.scrollLeft / (first.offsetWidth + 14));
        i = Math.max(0, Math.min(cards.length - 1, i));
        for (let k = 0; k < dots.children.length; k++) {
          dots.children[k].classList.toggle("on", k === i);
        }
      };
      car.addEventListener("scroll", onScroll, { passive: true });
      cleanups.push(() => car.removeEventListener("scroll", onScroll));
    });

    // Count-up
    if (!reduced && "IntersectionObserver" in window) {
      const cio = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (!e.isIntersecting) return;
            cio.unobserve(e.target);
            const el = e.target as HTMLElement;
            const orig = el.textContent ?? "";
            const t0 = performance.now();
            const frame = (now: number) => {
              const p = Math.min((now - t0) / 1400, 1);
              const ease = 1 - Math.pow(1 - p, 3);
              el.textContent = orig.replace(/\d+(\.\d+)?/g, (m) =>
                (parseFloat(m) * ease).toFixed((m.split(".")[1] || "").length),
              );
              if (p < 1) requestAnimationFrame(frame);
              else el.textContent = orig;
            };
            requestAnimationFrame(frame);
          });
        },
        { threshold: 0.6 },
      );
      scope.querySelectorAll(".pstat .n").forEach((el) => cio.observe(el));
      cleanups.push(() => cio.disconnect());
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
