"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Teamlid } from "@/lib/team";

export function TeamCarousel({ team }: { team: Teamlid[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  if (team.length === 0) return null;

  return (
    <div className="team-carousel">
      <div className="tc-nav">
        <button type="button" aria-label="Vorige" onClick={() => scroll(-1)}>
          <ChevronLeft />
        </button>
        <button type="button" aria-label="Volgende" onClick={() => scroll(1)}>
          <ChevronRight />
        </button>
      </div>
      <div className="tc-track" ref={trackRef}>
        {team.map((m) => (
          <div className="tcard" key={m.slug}>
            <div className="pf">
              <Image src={m.foto} alt={m.naam} fill sizes="300px" style={{ objectPosition: "top" }} />
            </div>
            <div className="nm">{m.naam}</div>
            <div className="rl">{m.rol}</div>
            {m.bio && <p>{m.bio}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
