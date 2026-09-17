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

export function bouwHandtekening(g: Gegevens): string {
  const logo = `${g.basisUrl}/handtekening/${g.donker ? "logo-wit.png" : "logo.png"}`;
  const naamKleur = g.donker ? "#F4F1EA" : "#2E251A";
  const tekstKleur = g.donker ? "#C9BCA6" : "#4E4030";
  const voetKleur = g.donker ? "#8B7B64" : "#AC9D85";
  const regel = (letter: string, href: string, tekst: string) =>
    `<tr><td style="padding-right:8px;color:#F15822;font-weight:bold;">${letter}</td>` +
    `<td><a href="${href}" style="color:${tekstKleur};text-decoration:none;">${esc(tekst)}</a></td></tr>`;

  return `<table cellpadding="0" cellspacing="0" border="0" role="presentation" style="font-family:Arial,Helvetica,sans-serif;border-collapse:collapse;">
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
}

export function Generator({ siteUrl, vercelUrl }: { siteUrl: string; vercelUrl: string }) {
  const [naam, setNaam] = useState("Voornaam Achternaam");
  const [functie, setFunctie] = useState("Functietitel");
  const [email, setEmail] = useState("voornaam.achternaam@thenewwaveit.com");
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
          <input id="hg-naam" value={naam} onChange={(e) => setNaam(e.target.value)} />
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
            onChange={(e) => setEmail(e.target.value)}
          />
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
            Ik gebruik een donker thema in mijn mailprogramma
            <span className="hgen-hint">Kiest het witte logo en lichtere tekstkleuren.</span>
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
        <div className={donker ? "hgen-doek hgen-doek--donker" : "hgen-doek"}>
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
