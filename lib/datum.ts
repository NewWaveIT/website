/**
 * Datumhulp die zowel op de server als in de browser gebruikt wordt.
 *
 * `isoDatum` stond in lib/inzichten-data.ts, en dat bestand is `server-only`:
 * het trekt de Supabase-client mee. Zodra een client-component de artikelkaart
 * ging renderen, brak de build daarop. Dit is pure tekstbewerking zonder
 * datatoegang, dus die hoort hier.
 */

const MAANDEN: Record<string, string> = {
  jan: "01",
  feb: "02",
  mrt: "03",
  apr: "04",
  mei: "05",
  jun: "06",
  jul: "07",
  aug: "08",
  sep: "09",
  okt: "10",
  nov: "11",
  dec: "12",
};

/**
 * Weergavedatum → ISO (YYYY-MM-DD) voor structured data; `datePublished` moet
 * ISO zijn, anders vallen de Article-rich-results af. Het model bewaart alleen
 * de Nederlandse weergave (zie `fmtDatum`), dus draaien we die hier terug.
 * Geeft een lege string als het formaat niet herkend wordt — beter geen veld
 * dan een ongeldig veld.
 */
export function isoDatum(d: string): string {
  if (/^\d{4}-\d{2}-\d{2}$/.test(d)) return d;
  const m = /^(\d{1,2})\s+([a-z]{3})[a-z.]*\s+(\d{4})$/i.exec(d.trim());
  if (!m) return "";
  const maand = MAANDEN[m[2]!.toLowerCase()];
  return maand ? `${m[3]}-${maand}-${m[1]!.padStart(2, "0")}` : "";
}
