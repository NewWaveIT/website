"use client";

import { useState } from "react";
import "./generator.css";

/**
 * Handtekeninggenerator voor collega's: vul je gegevens in, kopieer, plakken in
 * Outlook of Gmail.
 *
 * De opmaak komt uit ui_kits/website/medewerkerspakket.html. Eén functie bouwt
 * de HTML, en die wordt zowel voor het voorbeeld als voor het klembord
 * gebruikt. Dat is geen detail: zodra voorbeeld en uitvoer twee keer worden
 * opgeschreven lopen ze uit elkaar, en dan kopieert iemand iets anders dan hij
 * ziet.
 */

/** Zodat een & of < in een naam of functietitel de tabel niet openbreekt. */
function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const MAILDOMEIN = "thenewwaveit.com";

/**
 * Leidt het e-mailadres af uit de naam: voornaam.achternaam@thenewwaveit.com.
 *
 * Elk woord krijgt een punt, ook een tussenvoegsel: Sonny van Rein wordt
 * sonny.van.rein. Diakrieten gaan eruit, want een e-mailadres heeft ze niet
 * (José -> jose). Het veld blijft te overschrijven, en zodra iemand dat doet
 * houdt deze functie op met invullen.
 *
 * Een naam van één woord levert niets op: een adres met alleen een voornaam is
 * nooit goed, en het laten flitsen terwijl iemand zijn achternaam typt is
 * onrustiger dan even niets doen.
 */
export function mailUitNaam(naam: string): string {
  const delen = naam
    .normalize("NFD")
    // De combining marks die NFD losmaakt van hun letter.
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .split(/\s+/)
    .map((d) => d.replace(/[^a-z0-9-]/g, "").replace(/^-+|-+$/g, ""))
    .filter(Boolean);
  if (delen.length < 2) return "";
  return `${delen.join(".")}@${MAILDOMEIN}`;
}

/** `tel:` wil een nummer zonder spaties; de zichtbare tekst juist mét. */
function telHref(nummer: string): string {
  const schoon = nummer.replace(/[^\d+]/g, "");
  return schoon.startsWith("+") ? schoon : schoon.replace(/^0/, "+31");
}

export interface Gegevens {
  naam: string;
  functie: string;
  email: string;
  telefoon: string;
  donker: boolean;
  basisUrl: string;
}

/** Espresso, gelijk aan --ink-900. Hier als letterlijke waarde: een e-mail
 *  heeft geen designtokens, en een mailclient laadt de stylesheet van de site
 *  niet. */
const VLAK_DONKER = "#2E251A";

export function bouwHandtekening(g: Gegevens): string {
  const logo = `${g.basisUrl}/handtekening/${g.donker ? "logo-wit.png" : "logo.png"}`;
  const naamKleur = g.donker ? "#F4F1EA" : "#2E251A";
  const tekstKleur = g.donker ? "#C9BCA6" : "#4E4030";
  const voetKleur = g.donker ? "#8B7B64" : "#AC9D85";
  const regel = (letter: string, href: string, tekst: string) =>
    `<tr><td style="padding-right:8px;color:#F15822;font-weight:bold;">${letter}</td>` +
    `<td><a href="${href}" style="color:${tekstKleur};text-decoration:none;">${esc(tekst)}</a></td></tr>`;

  const kern = `<table cellpadding="0" cellspacing="0" border="0" role="presentation" style="font-family:Arial,Helvetica,sans-serif;border-collapse:collapse;">
  <tr>
    <td style="padding:2px 0 16px 0;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:20px;color:${tekstKleur};">Met vriendelijke groet,</td>
  </tr>
  <tr>
    <td>
      <table cellpadding="0" cellspacing="0" border="0" role="presentation" style="border-collapse:collapse;">
        <tr>
          <td valign="top" style="padding-right:28px;">
            <img src="${logo}" alt="The New Wave IT" width="150" height="37" style="display:block;width:150px;height:37px;border:0;">
          </td>
          <td width="3" style="width:3px;background:#F15822;font-size:0;line-height:0;">&nbsp;</td>
          <td valign="top" style="padding-left:24px;font-family:Arial,Helvetica,sans-serif;">
            <div style="font-size:17px;font-weight:bold;color:${naamKleur};letter-spacing:-0.2px;">${esc(g.naam)}</div>
            <div style="font-size:13px;font-weight:bold;color:#F15822;text-transform:uppercase;letter-spacing:1px;padding:3px 0 14px 0;">${esc(g.functie)}</div>
            <table cellpadding="0" cellspacing="0" border="0" role="presentation" style="border-collapse:collapse;font-size:13px;line-height:22px;color:${tekstKleur};">
${regel("W", "https://www.thenewwaveit.com", "www.thenewwaveit.com")}
${regel("E", `mailto:${g.email}`, g.email)}
${regel("T", `tel:${telHref(g.telefoon)}`, g.telefoon)}
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td style="padding-top:16px;">
      <div style="font-family:'Courier New',monospace;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:${voetKleur};">De nieuwe golf in IT-consultancy</div>
    </td>
  </tr>
</table>`;

  if (!g.donker) return kern;

  /*
   * De donkere variant zette alleen lichtere tekstkleuren en het witte logo,
   * en geen achtergrond. In Outlook kwam dat neer op wit op wit: de donkere
   * ondergrond bestond alleen in het voorbeeld op deze pagina, niet in wat je
   * plakte.
   *
   * Een e-mail kan zich niet naar het thema van de ontvanger voegen -- Outlook
   * voor Windows leest `prefers-color-scheme` in een bericht niet -- dus de
   * enige manier waarop deze variant overal hetzelfde leest, is door zijn eigen
   * vlak mee te nemen. Dat betekent ook: wie in een licht thema leest ziet een
   * espressokleurig blok onder de mail. Dat is de keuze, niet een bijwerking.
   *
   * `bgcolor` staat er naast `background-color` omdat Outlook op Windows met de
   * Word-renderer werkt: die honoreert het attribuut betrouwbaarder dan de
   * stijlregel, en op een `<div>` vaak geen van beide. Vandaar een tabel.
   *
   * De ronde hoek is bewust alleen CSS. Het nieuwe Outlook, Outlook op het web,
   * Gmail, Apple Mail en de mobiele apps tonen hem; het klassieke Outlook voor
   * Windows negeert `border-radius` en houdt rechte hoeken. Dat is geen fout
   * maar de ondergrens: de alternatieven (VML `roundrect` of vier hoekplaatjes)
   * overleven het plakken in de handtekeningeditor niet, omdat Outlook de HTML
   * daarbij door Word haalt. `border-collapse` moet hiervoor op `separate`
   * staan; bij `collapse` laten browsers de ronding van een tabel vallen.
   */
  return `<table cellpadding="0" cellspacing="0" border="0" role="presentation" bgcolor="${VLAK_DONKER}" style="border-collapse:separate;border-spacing:0;background-color:${VLAK_DONKER};border-radius:12px;">
  <tr>
    <td bgcolor="${VLAK_DONKER}" style="background-color:${VLAK_DONKER};padding:20px 24px;border-radius:12px;">
${kern}
    </td>
  </tr>
</table>`;
}

export function Generator({ siteUrl, vercelUrl }: { siteUrl: string; vercelUrl: string }) {
  const [naam, setNaam] = useState("Voornaam Achternaam");
  const [functie, setFunctie] = useState("Functietitel");
  const [email, setEmail] = useState("voornaam.achternaam@thenewwaveit.com");
  /* Zodra iemand het adres zelf aanpast, houdt de naam ermee op. Maakt hij het
     veld weer leeg, dan neemt de naam het weer over. */
  const [emailZelf, setEmailZelf] = useState(false);
  const [telefoon, setTelefoon] = useState("+31 6 00 00 00 00");
  const [donker, setDonker] = useState(false);
  const [viaVercel, setViaVercel] = useState(false);
  const [gekopieerd, setGekopieerd] = useState<"html" | "opmaak" | null>(null);
  const [toonBron, setToonBron] = useState(false);

  const velden = { naam, functie, email, telefoon, donker };

  /** Wat op het klembord komt: met de absolute URL die een mailclient nodig heeft. */
  const html = bouwHandtekening({ ...velden, basisUrl: viaVercel ? vercelUrl : siteUrl });

  /**
   * Wat het voorbeeld toont. Zelfde functie, zelfde opmaak, maar met een
   * relatief pad naar het logo.
   *
   * Dat moet: de Content-Security-Policy van de site staat alleen afbeeldingen
   * van het eigen domein toe. Een absolute URL naar een ander domein, wat
   * de optie "het domein staat nog niet om" precies doet, wordt dan geweigerd.
   * De bezoeker zou een kapot plaatje zien terwijl er niets mis is met de
   * handtekening zelf. Een e-mailclient trekt zich van die policy niets aan.
   *
   * Alleen het adres van het logo verschilt dus; de markup en de opmaak komen
   * uit dezelfde functie, zodat voorbeeld en uitvoer niet uit elkaar lopen.
   */
  const voorbeeldHtml = bouwHandtekening({ ...velden, basisUrl: "" });

  /**
   * Als opgemaakte inhoud op het klembord, zodat plakken in Outlook of Gmail
   * meteen de handtekening oplevert in plaats van een lap code. Lukt dat niet
   * (oudere browser, geen veilige context), dan valt hij terug op de broncode.
   * Die kun je in Outlook via de HTML-weergave alsnog kwijt.
   */
  async function kopieer(soort: "html" | "opmaak") {
    try {
      if (soort === "opmaak" && typeof ClipboardItem !== "undefined") {
        await navigator.clipboard.write([
          new ClipboardItem({
            "text/html": new Blob([html], { type: "text/html" }),
            "text/plain": new Blob([html], { type: "text/plain" }),
          }),
        ]);
      } else {
        await navigator.clipboard.writeText(html);
      }
      setGekopieerd(soort);
      window.setTimeout(() => setGekopieerd(null), 2500);
    } catch {
      setToonBron(true);
    }
  }

  return (
    <div className="hgen">
      <div className="hgen-form">
        <h2>Je gegevens</h2>
        <div className="hgen-veld">
          <label htmlFor="hg-naam">Naam</label>
          <input
            id="hg-naam"
            value={naam}
            onChange={(e) => {
              setNaam(e.target.value);
              if (emailZelf) return;
              const afgeleid = mailUitNaam(e.target.value);
              if (afgeleid) setEmail(afgeleid);
            }}
          />
        </div>
        <div className="hgen-veld">
          <label htmlFor="hg-functie">Functietitel</label>
          <input id="hg-functie" value={functie} onChange={(e) => setFunctie(e.target.value)} />
        </div>
        <div className="hgen-veld">
          <label htmlFor="hg-email">E-mailadres</label>
          <input
            id="hg-email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailZelf(e.target.value.trim() !== "");
            }}
          />
          <span className="hgen-hint">
            Volgt je naam. Klopt jouw adres anders, typ het dan over; daarna blijft het staan.
          </span>
        </div>
        <div className="hgen-veld">
          <label htmlFor="hg-tel">Telefoonnummer</label>
          <input id="hg-tel" value={telefoon} onChange={(e) => setTelefoon(e.target.value)} />
          <span className="hgen-hint">Schrijf het zoals je het getoond wilt hebben.</span>
        </div>

        <div className="hgen-schakel">
          <input
            id="hg-donker"
            type="checkbox"
            checked={donker}
            onChange={(e) => setDonker(e.target.checked)}
          />
          <label htmlFor="hg-donker">
            Donkere handtekening
            <span className="hgen-hint">
              Wit logo op een espressokleurig vlak. Dat vlak gaat mee in de mail, dus ook wie in een
              licht thema leest ziet het donkere blok.
            </span>
          </label>
        </div>

        <div className="hgen-schakel">
          <input
            id="hg-vercel"
            type="checkbox"
            checked={viaVercel}
            onChange={(e) => setViaVercel(e.target.checked)}
          />
          <label htmlFor="hg-vercel">
            Het domein staat nog niet om
            <span className="hgen-hint">
              Zolang www.thenewwaveit.com nog naar de oude site wijst, blijft het logo leeg. Deze
              optie gebruikt een adres dat nu al werkt, en ook daarna blijft werken.
            </span>
          </label>
        </div>

        <div className="hgen-acties">
          <button type="button" className="btn btn-primary" onClick={() => kopieer("opmaak")}>
            {gekopieerd === "opmaak" ? "Gekopieerd" : "Kopieer handtekening"}
          </button>
          <button type="button" className="btn btn-outline" onClick={() => kopieer("html")}>
            {gekopieerd === "html" ? "Gekopieerd" : "Kopieer als HTML"}
          </button>
        </div>
        <p className="hgen-hint">
          <strong>Kopieer handtekening</strong> plak je rechtstreeks in Outlook of Gmail.{" "}
          <strong>Kopieer als HTML</strong> is voor wie de broncode zelf wil plakken.
        </p>
      </div>

      <div className="hgen-voorbeeld">
        <h2>Zo ziet hij eruit</h2>
        {/* Geen aparte donkere doek meer: de handtekening brengt zijn eigen vlak
            mee, dus het voorbeeld toont nu letterlijk wat je plakt. */}
        <div className="hgen-doek kaart">
          <div dangerouslySetInnerHTML={{ __html: voorbeeldHtml }} />
        </div>

        <button type="button" className="hgen-bronknop" onClick={() => setToonBron(!toonBron)}>
          {toonBron ? "Verberg de HTML" : "Toon de HTML"}
        </button>
        {toonBron && (
          <pre className="hgen-bron">
            <code>{html}</code>
          </pre>
        )}
      </div>
    </div>
  );
}
