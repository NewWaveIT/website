import type { Metadata } from "next";
import Image from "next/image";
import { Generator } from "@/components/handtekening/generator";
import { SITE_URL } from "@/lib/site";
import "./pakket.css";

/**
 * Het medewerkerspakket op één pagina: bureaubladachtergronden,
 * Teams-achtergronden, LinkedIn-banners en de e-mailhandtekening.
 *
 * Niet in de navigatie, niet in de sitemap en op `noindex`. Dit is intern
 * materiaal: geen geheim, maar het hoort niet tussen de zoekresultaten van
 * klanten. Wie de URL heeft kan erbij; dat is genoeg voor wat het is.
 *
 * De afbeeldingen staan als echte PNG's in public/medewerkerspakket/, op ware
 * grootte. Downloaden moet een bestand opleveren dat je meteen kunt instellen,
 * niet iets dat de browser eerst nog moet omzetten.
 */

export const metadata: Metadata = {
  title: "Medewerkerspakket",
  description: "Achtergronden, banners en de e-mailhandtekening in de huisstijl.",
  robots: { index: false, follow: false },
};

const VERCEL_URL = "https://thenewwaveit.vercel.app";

interface Uiting {
  bestand: string;
  naam: string;
  maat: string;
  waarom: string;
  breedte: number;
  hoogte: number;
}

const WALLPAPERS: Uiting[] = [
  {
    bestand: "wallpaper-01-espresso.png",
    naam: "01 · Espresso",
    maat: "donker · standaard",
    waarom: "Voor de meeste laptops. Rustig genoeg om de hele dag naar te kijken.",
    breedte: 2560,
    hoogte: 1600,
  },
  {
    bestand: "wallpaper-02-eggshell.png",
    naam: "02 · Eggshell",
    maat: "licht",
    waarom: "Voor wie in het licht werkt of veel screenshots deelt.",
    breedte: 2560,
    hoogte: 1600,
  },
  {
    bestand: "wallpaper-03-oranje.png",
    naam: "03 · Golf",
    maat: "oranje · expressief",
    waarom: "Vol merk. Fijn op een tweede scherm of tijdens events.",
    breedte: 2560,
    hoogte: 1600,
  },
  {
    bestand: "wallpaper-04-minimaal.png",
    naam: "04 · Minimaal",
    maat: "alleen het beeldmerk",
    waarom: "Als je bureaublad vol staat en je het merk alleen wil aanstippen.",
    breedte: 2560,
    hoogte: 1600,
  },
];

const TEAMS: Uiting[] = [
  {
    bestand: "teams-donker.png",
    naam: "Teams · donker",
    maat: "1920 × 1080",
    waarom: "Standaard voor klantgesprekken.",
    breedte: 1920,
    hoogte: 1080,
  },
  {
    bestand: "teams-licht.png",
    naam: "Teams · licht",
    maat: "1920 × 1080",
    waarom: "Bij daglicht en in ruimtes met een lichte wand.",
    breedte: 1920,
    hoogte: 1080,
  },
];

const LINKEDIN: Uiting[] = [
  {
    bestand: "linkedin-01-bedrijf.png",
    naam: "01 · Bedrijf",
    maat: "1584 × 396",
    waarom: "De bedrijfsbanner. Gebruik deze als je niets wil aanpassen.",
    breedte: 1584,
    hoogte: 396,
  },
  {
    bestand: "linkedin-03-licht.png",
    naam: "02 · Licht",
    maat: "1584 × 396",
    waarom: "Zelfde opbouw op eggshell, voor wie een lichte profielfoto heeft.",
    breedte: 1584,
    hoogte: 396,
  },
];

function Galerij({ items, kolommen }: { items: Uiting[]; kolommen: "twee" | "een" }) {
  return (
    <div className={`pak-grid pak-grid--${kolommen}`}>
      {items.map((u) => (
        <figure className="pak-item" key={u.bestand}>
          <div className="pak-beeld" style={{ aspectRatio: `${u.breedte} / ${u.hoogte}` }}>
            <Image
              src={`/medewerkerspakket/${u.bestand}`}
              alt=""
              width={u.breedte}
              height={u.hoogte}
              sizes="(max-width: 760px) 100vw, 460px"
            />
          </div>
          <figcaption>
            <span className="pak-naam">{u.naam}</span>
            <span className="pak-maat">{u.maat}</span>
            <p>{u.waarom}</p>
            {/* Downloaden van een bestand op hetzelfde domein: `download` werkt
                hier en levert de PNG op ware grootte op. */}
            <a className="pak-download" href={`/medewerkerspakket/${u.bestand}`} download>
              Download PNG
            </a>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export default function MedewerkerspakketPagina() {
  return (
    <div className="p-pakket">
      {/* De hero is een donkere band met de foto rechts. De scrim loopt van de
          tekstkant het beeld in, zodat er geen harde naad tussen de twee zit en
          de kop leesbaar blijft ook als de foto verschuift. Zelfde principe als
          de homepage-hero, maar zonder de wisselende beelden: dit is één pagina
          met één boodschap. */}
      <header className="pak-kop">
        <div className="pak-kop-tekst">
          <p className="pak-kicker">{"// Medewerkerspakket"}</p>
          <h1>
            Jouw eigen uitingen,
            <br />
            in onze huisstijl
          </h1>
          <p className="pak-intro">
            Alles wat je zelf instelt: je bureaubladachtergrond, je Teams-achtergrond, je
            LinkedIn-banner en je e-mailhandtekening. Kies een variant, download of kopieer, klaar.
          </p>
          <div className="pak-alles">
            <a className="btn btn-primary" href="/medewerkerspakket/medewerkerspakket.zip" download>
              Download het hele pakket
            </a>
            <span className="pak-zipnoot">
              Zip met alle negen afbeeldingen, beide handtekeninglogo&apos;s en een leesmij. Losse
              bestanden staan hieronder.
            </span>
          </div>
        </div>
        <div className="pak-kop-beeld">
          <Image
            src="/assets/photos/team-hart-handen.webp"
            alt=""
            fill
            sizes="(max-width: 860px) 100vw, 50vw"
            priority
          />
        </div>
      </header>

      <section className="pak-sectie">
        <h2>Bureaubladachtergrond</h2>
        <p className="pak-meta">
          Vier varianten op 2560 × 1600, die meeschalen op 16:10 en 16:9. De linkerhelft blijft
          rustig, zodat je bureaubladpictogrammen leesbaar blijven.
        </p>
        <Galerij items={WALLPAPERS} kolommen="twee" />
        <div className="pak-hoe">
          <p>
            <strong>Windows</strong>: rechtermuisknop op het bureaublad → Persoonlijke instellingen
            → Achtergrond. Zet &quot;Passend maken&quot; op <em>Vullen</em>.
          </p>
          <p>
            <strong>macOS</strong>: Systeeminstellingen → Achtergrond → Foto toevoegen. Kies{" "}
            <em>Vullen</em>, niet <em>Aanpassen</em>.
          </p>
        </div>
      </section>

      <section className="pak-sectie">
        <h2>Teams-achtergrond</h2>
        <p className="pak-meta">
          Op 1920 × 1080. Teams zet jou midden in beeld, dus het merk staat links en het midden
          blijft leeg.
        </p>
        <Galerij items={TEAMS} kolommen="twee" />
        <div className="pak-hoe">
          <p>
            Tijdens een gesprek: <strong>Meer</strong> → Video-effecten en instellingen → Meer
            toevoegen → kies het bestand. Zet je camera vóór de achtergrond, niet erin.
          </p>
        </div>
      </section>

      <section className="pak-sectie">
        <h2>LinkedIn-banner</h2>
        <p className="pak-meta">
          Op 1584 × 396. Je profielfoto en naam vallen linksonder over de banner heen, daarom staat
          alle tekst rechts.
        </p>
        <Galerij items={LINKEDIN} kolommen="een" />
        <div className="pak-hoe">
          <p>
            Profiel → het potloodje bij je omslagfoto → Afbeelding uploaden. Upload op ware grootte;
            LinkedIn comprimeert zelf.
          </p>
        </div>
      </section>

      <section className="pak-sectie">
        <h2>E-mailhandtekening</h2>
        <p className="pak-meta">
          Vul je gegevens in, kopieer, en plak in Outlook of Gmail. Het voorbeeld hiernaast is
          precies wat er op je klembord komt.
        </p>
        <Generator siteUrl={SITE_URL} vercelUrl={VERCEL_URL} />

        <div className="pak-logos">
          <h3>Het logo uit de handtekening</h3>
          <p>
            De generator vult dit adres voor je in. Je hoeft het bestand dus niet te downloaden om
            de handtekening te laten werken. Het staat hier zodat je kunt zien wat er meekomt, en
            voor wie het ergens anders nodig heeft.
          </p>
          <div className="pak-logorij">
            {[
              { bestand: "logo.png", label: "Lichte achtergrond", donker: false },
              { bestand: "logo-wit.png", label: "Donker thema", donker: true },
            ].map((l) => (
              <figure key={l.bestand} className="pak-logo">
                <div className={l.donker ? "pak-logodoek pak-logodoek--donker" : "pak-logodoek"}>
                  <Image
                    src={`/handtekening/${l.bestand}`}
                    alt=""
                    width={300}
                    height={74}
                    sizes="150px"
                  />
                </div>
                <figcaption>
                  <span className="pak-naam">{l.label}</span>
                  <span className="pak-maat">300 × 74 · toont op 150 × 37</span>
                  <a className="pak-download" href={`/handtekening/${l.bestand}`} download>
                    Download PNG
                  </a>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="pak-hoe">
          <p>
            <strong>Outlook</strong>: Bestand → Opties → E-mail → Handtekeningen.{" "}
            <strong>Gmail</strong>: Instellingen → Alle instellingen → Handtekening.
          </p>
          <p>
            Het logo staat op een openbaar adres, want een handtekening kan geen bestand van je
            eigen computer meesturen. Ziet een ontvanger een leeg vlak, dan blokkeert zijn
            mailprogramma afbeeldingen. Dat is bij de meeste clients de standaardinstelling tot
            iemand de afzender vertrouwt.
          </p>
        </div>
      </section>

      <section className="pak-sectie pak-slot">
        <h2>Eigen variant nodig?</h2>
        <p className="pak-meta">
          Vraag het aan, dan leveren we hem in de juiste maat en kleuren. Zelf iets in elkaar zetten
          in Canva of PowerPoint levert bijna altijd verkeerde kleuren en een uitgerekt logo op.
        </p>
      </section>
    </div>
  );
}
