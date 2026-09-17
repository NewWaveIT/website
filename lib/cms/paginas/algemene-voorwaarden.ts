import type { FieldDef } from "../schema";

/** De velden die de editor voor deze pagina toont. */
export const VELDEN = [
  { key: "metaTitle", label: "Meta-titel", type: "text" },
  { key: "metaDescription", label: "Meta-omschrijving", type: "textarea" },
  { key: "heroTitel", label: "Hero — titel", type: "text" },
  { key: "heroLead", label: "Hero — introtekst", type: "textarea" },
  {
    key: "body",
    label: "Algemene voorwaarden",
    type: "richtext",
    help: "De volledige tekst. Koppen worden h2, dus begin niet met een h1.",
  },
] as const satisfies readonly FieldDef[];

/** Standaardtekst per veld: de startwaarde in de editor en de terugval op de site. */
export const TEKSTEN = {
  metaTitle: "Algemene voorwaarden",
  metaDescription:
    "De algemene voorwaarden van The New Wave IT B.V. voor de levering van IT-diensten en producten.",
  heroTitel: "Algemene voorwaarden",
  heroLead: "De voorwaarden die gelden voor iedere overeenkomst met The New Wave IT B.V.",
  body: `<h2>Artikel 1 – Definities</h2>
<p>The New Wave IT is een B.V. die zich ten doel stelt de verkoop van IT-diensten en producten.</p>
<p>Algemene voorwaarden verwijst naar de onderhavige Algemene voorwaarden.</p>
<p>Klant verwijst naar de natuurlijke persoon die niet handelt voor doeleinden die verband houden met zijn bedrijfs- of beroepsactiviteit en gebruikmaakt van de Diensten van The New Wave IT.</p>
<p>Partijen verwijst naar The New Wave IT en/of Klant.</p>
<p>Overeenkomst verwijst naar de tussen The New Wave IT en Klant gesloten Overeenkomst, waarbij The New Wave IT zich verbindt Diensten te verrichten en Producten te leveren en Klant zich verbindt hiervoor een prijs te betalen. De Overeenkomst komt tot stand door een aanbod van The New Wave IT en de aanvaarding daarvan door Klant.</p>
<p>Diensten omvatten alle door The New Wave IT en/of door haar ingeschakelde derden aan Klant geleverde IT Support, Developmentwerk, Consultancy en Producten.</p>
<p>Producten omvatten alle door The New Wave IT en/of door haar ingeschakelde derden aan Klant geleverde software, tools of applicaties die op de Website worden aangeboden.</p>
<p>Website verwijst naar de website van The New Wave IT, te raadplegen via <a href="https://www.thenewwaveit.com">www.thenewwaveit.com</a>.</p>
<h2>Artikel 2 – Identiteit van The New Wave IT</h2>
<address>The New Wave IT B.V.<br>KvK-nummer: 90814738<br>BTW-nummer: NL 865467572B01<br>Ganzenmarkt 6, 3512 GD, Utrecht<br>E-mail: <a href="mailto:People@thenewwaveit.com">People@thenewwaveit.com</a><br>Telefoon: <a href="tel:+31610751254">+31 6 107 512 54</a></address>
<h2>Artikel 3 – Toepasselijkheid van de Algemene voorwaarden</h2>
<p>De Algemene voorwaarden zijn van toepassing op ieder aanbod van The New Wave IT en op alle huidige en toekomstige Overeenkomsten.</p>
<p>Afwijkingen van de Algemene voorwaarden zijn alleen geldig indien deze uitdrukkelijk en schriftelijk met The New Wave IT zijn overeengekomen.</p>
<p>De Algemene voorwaarden zijn ook van toepassing op aanvullende of gewijzigde opdrachten van Klant.</p>
<p>Indien een bepaling in deze Algemene voorwaarden nietig blijkt te zijn, blijft de geldigheid van de overige bepalingen behouden. Partijen zullen de nietige bepaling vervangen door een nieuwe, geldige bepaling.</p>
<h2>Artikel 4 – Aanbod en totstandkoming Overeenkomst</h2>
<p>Alle aanbiedingen op de Website zijn vrijblijvend, tenzij uitdrukkelijk anders aangegeven.</p>
<p>Klant kan contact opnemen met The New Wave IT via e-mail of telefoon voor de aangeboden Diensten of Producten.</p>
<p>The New Wave IT overlegt met Klant over zijn verwachtingen en kan daarna een offerte opstellen die per e-mail wordt verstuurd. De Overeenkomst komt pas tot stand door ondertekening van de offerte middels een (elektronische) opdrachtbevestiging.</p>
<p>Indien Klant aantekeningen maakt of reacties geeft op de offerte van The New Wave IT, maken deze geen deel uit van de Overeenkomst, tenzij The New Wave IT deze schriftelijk bevestigt.</p>
<p>Een opdracht door Klant waaraan geen schriftelijke offerte vooraf is gegaan, behoeft schriftelijke aanvaarding door The New Wave IT.</p>
<h2>Artikel 5 – Uitvoering van de Overeenkomst</h2>
<p>The New Wave IT zal zich inspannen de Diensten naar beste inzicht en vermogen uit te voeren.</p>
<p>The New Wave IT heeft het recht bepaalde werkzaamheden door derden te laten verrichten en zal hierbij de nodige zorgvuldigheid betrachten.</p>
<p>De Overeenkomst kan alleen correct worden uitgevoerd indien Klant volledige en juiste (contact)gegevens verstrekt.</p>
<p>Indien voor de uitvoering een termijn is overeengekomen, is dit geen fatale termijn. Bij overschrijding dient Klant The New Wave IT schriftelijk in gebreke te stellen.</p>
<h2>Artikel 6 – Wijziging van de Overeenkomst</h2>
<p>Indien tijdens de uitvoering blijkt dat wijzigingen noodzakelijk zijn, zullen Partijen hierover in overleg treden.</p>
<p>Indien de Overeenkomst wordt gewijzigd, wordt er vooraf een aparte afspraak gemaakt over de honorering van de extra werkzaamheden.</p>
<p>Wijzigingen in de oorspronkelijke Overeenkomst zijn pas geldig vanaf het moment dat deze schriftelijk door beide Partijen zijn bevestigd.</p>
<h2>Artikel 7 – Opschorting, ontbinding en tussentijdse opzegging</h2>
<p>The New Wave IT is bevoegd de verplichtingen op te schorten of de Overeenkomst te ontbinden indien Klant zijn verplichtingen niet nakomt en binnen een redelijke termijn na ingebrekestelling geen verbetering optreedt.</p>
<p>Indien Klant een jaarlijkse licentie afneemt, factureert The New Wave IT deze kosten eenmaal per jaar. De licentie wordt automatisch verlengd tenzij deze minstens een maand voor de einddatum is opgezegd.</p>
<p>The New Wave IT hanteert een betalingstermijn van veertien dagen voor alle facturen.</p>
<p>Indien Klant zijn verplichtingen niet nakomt en in verzuim is, heeft The New Wave IT het recht de Overeenkomst direct te ontbinden en schadevergoeding te eisen.</p>`,
} satisfies Record<(typeof VELDEN)[number]["key"], string>;
