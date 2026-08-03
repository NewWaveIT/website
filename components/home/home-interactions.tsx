"use client";

import { useEffect } from "react";

/**
 * Client-side interactielaag voor de homepage. Port van de vanilla scripts uit
 * ui_kits/website/index.html: diensten-tabs, hero word-reveal + accent, hero
 * canvas-golf, count-up statistieken, featured parallax en scroll-reveal.
 * Respecteert prefers-reduced-motion.
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

    // Hero: word-by-word reveal + accent underline
    (() => {
      const h1 = document.querySelector<HTMLElement>(".hero h1");
      if (!h1) return;
      const accent = h1.querySelector<HTMLElement>(".accent");
      if (reduced) {
        accent?.classList.add("draw");
        return;
      }
      let idx = 0;
      const split = (node: Node) => {
        Array.from(node.childNodes).forEach((child) => {
          if (child.nodeType === 3) {
            const frag = document.createDocumentFragment();
            (child.textContent ?? "").split(/(\s+)/).forEach((part) => {
              if (!part) return;
              if (/^\s+$/.test(part)) {
                frag.appendChild(document.createTextNode(part));
                return;
              }
              const s = document.createElement("span");
              s.className = "w";
              s.textContent = part;
              s.style.animationDelay = `${120 + idx * 55}ms`;
              idx++;
              frag.appendChild(s);
            });
            node.replaceChild(frag, child);
          } else if (child.nodeType === 1) {
            split(child);
          }
        });
      };
      split(h1);
      if (accent) {
        const to = window.setTimeout(() => accent.classList.add("draw"), 120 + idx * 55 + 350);
        cleanups.push(() => window.clearTimeout(to));
      }
    })();

    // Hero: interactieve canvas-golf
    (() => {
      if (reduced) return;
      const hero = document.querySelector<HTMLElement>(".hero");
      const cv = document.querySelector<HTMLCanvasElement>(".hero-wave");
      if (!hero || !cv) return;
      const ctx = cv.getContext("2d");
      if (!ctx) return;
      const orange =
        getComputedStyle(document.documentElement).getPropertyValue("--orange-400").trim() ||
        "#ff7a29";
      let W = 0,
        H = 0,
        t = 0,
        mx = 0.5,
        my = 0.5,
        tx = 0.5,
        ty = 0.5;
      let raf = 0;
      const resize = () => {
        W = cv.width = hero.offsetWidth;
        H = cv.height = hero.offsetHeight;
      };
      const onMove = (e: MouseEvent) => {
        const r = hero.getBoundingClientRect();
        tx = (e.clientX - r.left) / r.width;
        ty = (e.clientY - r.top) / r.height;
      };
      window.addEventListener("resize", resize);
      hero.addEventListener("mousemove", onMove);
      resize();
      const draw = () => {
        t += 0.007;
        mx += (tx - mx) * 0.045;
        my += (ty - my) * 0.045;
        ctx.clearRect(0, 0, W, H);
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = orange;
        for (let l = 0; l < 3; l++) {
          ctx.globalAlpha = 0.08 + l * 0.05;
          ctx.beginPath();
          const amp = (12 + l * 9) * (0.55 + my * 0.9);
          const yBase = H * (0.78 + l * 0.06);
          for (let x = 0; x <= W; x += 8) {
            const y =
              yBase +
              Math.sin(x * 0.004 + t * (1 + l * 0.35) + mx * 2.2) * amp +
              Math.sin(x * 0.011 - t * 0.7 + l) * amp * 0.35;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
        raf = requestAnimationFrame(draw);
      };
      draw();
      cleanups.push(() => {
        window.removeEventListener("resize", resize);
        hero.removeEventListener("mousemove", onMove);
        cancelAnimationFrame(raf);
      });
    })();

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
        ".sector-card, .fcase, .wcard, .post, .lead-card, .sec-head, .eyebrow-row",
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
