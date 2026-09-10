"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Pause, Play } from "lucide-react";
import "./hero-sector.css";

/* Hero — geport uit ui_kits/website/Hero Opties.dc.html, variant 3c
   ("Achtergrond + sectorrail als bediening").

   De sectorfoto vult de hero en wisselt met een crossfade plus trage zoom; de
   scrim is radiaal en alleen donker waar tekst staat, zodat het beeld rechts
   helder blijft. Onderaan staan de vijf sectoren als rail — die is tegelijk de
   bediening, dus elk item is een knop.

   Twee bewuste afwijkingen van het design:

   1. De cijferkolom (metricValue/metricLabel — "1.940 ritten per week" en
      soortgelijke) is weggelaten. Dat zijn mockup-getallen uit het designdoc en
      op de rail lezen ze als harde claims over ons werk. Komt er een
      onderbouwd cijfer per sector, dan hoort dat in het CMS en niet hier.
   2. De <header> uit het design is weggelaten: de site heeft zijn eigen
      <Header> in app/(marketing)/layout.tsx. */

interface Scene {
  key: string;
  sector: string;
  /** Wat er in die sector op de werkvloer gebeurt — vult de hero-alinea en de rail. */
  real: string;
  foto: string;
}

const SCENES: Scene[] = [
  {
    key: "publiek",
    sector: "Publieke sector",
    real: "Aan de balie wordt de aanvraag samen doorgenomen",
    foto: "/assets/sectoren/hero/publiek.webp",
  },
  {
    key: "zorg",
    sector: "Zorg",
    real: "De wijkverpleegkundige legt de meting vast bij de cliënt thuis",
    foto: "/assets/sectoren/hero/zorg.webp",
  },
  {
    key: "mobiliteit",
    sector: "Mobiliteit",
    real: "Op de terminal komen trein, truck en kraan samen",
    foto: "/assets/sectoren/hero/mobiliteit.webp",
  },
  {
    key: "banken",
    sector: "Banken",
    real: "In de boardroom staan de cijfers op tafel",
    foto: "/assets/sectoren/hero/banken.webp",
  },
  {
    key: "manufacturing",
    sector: "Manufacturing",
    real: "Aan de lijn stuurt de operator de productie bij",
    foto: "/assets/sectoren/hero/manufacturing.webp",
  },
];

const CYCLE_MS = 6500;

export function HeroSector() {
  // i en vorige zitten in één state-object: de vorige scene blijft als
  // onderlaag staan zolang de nieuwe infadet (anders flitst de espresso-
  // achtergrond door de crossfade heen), en zo kan hij niet uit de pas lopen
  // met i. Een ref kan hier niet: die lees je tijdens render.
  const [scene, setScene] = useState({ i: 0, vorige: 0 });
  const [pauze, setPauze] = useState(false);
  const naar = useCallback((n: number) => {
    setScene((s) => ({ i: n, vorige: s.i }));
  }, []);

  // Scene-cyclus. Respecteert prefers-reduced-motion (dan geen cyclus) en is
  // pauzeerbaar: WCAG 2.2.2 vraagt een mechanisme voor bewegende content die
  // langer dan vijf seconden doorloopt, en hover telt niet voor toetsenbord.
  //
  // Start pas na 'load'. Meteen beginnen legt het scenewerk bovenop de
  // hydratie; de bezoeker ziet de eerste scene sowieso, die staat in de
  // server-HTML.
  useEffect(() => {
    if (pauze) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let id = 0;
    const start = () => {
      id = window.setInterval(() => {
        setScene((s) => ({ i: (s.i + 1) % SCENES.length, vorige: s.i }));
      }, CYCLE_MS);
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => {
      window.removeEventListener("load", start);
      clearInterval(id);
    };
  }, [pauze]);

  const { i } = scene;
  const s = SCENES[i]!;
  const vorigeScene = SCENES[scene.vorige]!;

  return (
    <section className="hsec" aria-label="The New Wave IT in vijf sectoren">
      <div className="hsec-beeld">
        {/* Onderlaag: de scene waar we vandaan komen. */}
        <Image
          className="hsec-foto"
          src={vorigeScene.foto}
          alt=""
          fill
          sizes="100vw"
          aria-hidden="true"
        />
        {/* Bovenlaag: de huidige scene, fadet in en zoomt langzaam uit.
            `priority` alleen op de scene die in de server-HTML staat: dat is de
            LCP-afbeelding. De rest komt binnen tijdens de crossfade. */}
        <Image
          key={s.key}
          className="hsec-foto hsec-foto-in"
          src={s.foto}
          alt=""
          fill
          sizes="100vw"
          priority={i === 0}
          aria-hidden="true"
        />
        <div className="hsec-scrim" aria-hidden="true" />
      </div>

      <div className="hsec-copy">
        <p className="hsec-kicker">
          <span className="hsec-kicker-streep" aria-hidden="true" />
          Business-specialist in vijf sectoren
        </p>
        <h1 className="hsec-h1">
          Wij maken van business en IT <span className="hsec-h1-accent">één beweging</span>.
        </h1>
        <p key={s.key} className="hsec-real">
          {s.real} — en achter die handeling draait software die wij samen met de sector bouwden.
        </p>
        <div className="hsec-acties">
          <Link className="hsec-cta" href="/contact">
            Plan een gesprek <span aria-hidden="true">→</span>
          </Link>
          <Link className="hsec-link" href="/klantverhalen">
            Klantverhalen
          </Link>
        </div>
      </div>

      <div className="hsec-rail">
        {SCENES.map((sc, n) => (
          <button
            key={sc.key}
            type="button"
            className="hsec-rail-item"
            aria-current={n === i ? "true" : undefined}
            onClick={() => naar(n)}
          >
            <span className="hsec-rail-baan" aria-hidden="true">
              <span
                key={`${sc.key}-${n === i ? i : "uit"}-${pauze ? "stil" : "loop"}`}
                className={n === i ? "hsec-rail-bar hsec-rail-bar-actief" : "hsec-rail-bar"}
                style={n === i && !pauze ? { animationDuration: `${CYCLE_MS}ms` } : undefined}
              />
            </span>
            <span className="hsec-rail-naam">{sc.sector}</span>
            <span className="hsec-rail-regel">{sc.real}</span>
          </button>
        ))}
        <button
          type="button"
          className="hsec-pauze"
          onClick={() => setPauze((p) => !p)}
          aria-pressed={pauze}
          aria-label={
            pauze ? "Sectoren automatisch laten wisselen" : "Wisselen van sector pauzeren"
          }
        >
          {pauze ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
        </button>
      </div>
    </section>
  );
}
