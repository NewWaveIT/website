"use client";

import { useActionState, useState } from "react";
import { Modal } from "@/components/admin/modal";
import { vulAanUitSeed, verwijderWeessleutels, type HerstelState } from "./actions";

const INIT: HerstelState = { ok: false, message: "" };

/**
 * De twee herstelacties plus de export.
 *
 * Aanvullen voegt alleen toe en overschrijft nooit, dus die mag met één klik.
 * Weessleutels verwijderen gooit data weg en gaat daarom door dezelfde
 * bevestigingsmodal als het verwijderen van een item in de editor.
 *
 * Voor afwijkende teksten staat hier bewust geen knop. Welke kant daar wint is
 * een inhoudelijke keuze — de tekst in het CMS is meestal de juiste, en dan
 * hoort de seed in de code bij te trekken, niet andersom. De export levert
 * precies de waarden die daarvoor nodig zijn.
 */
export function Herstel({
  ontbrekend,
  wees,
  exportJson,
}: {
  ontbrekend: number;
  wees: number;
  exportJson: string;
}) {
  const [vulState, vulActie, vulBezig] = useActionState(async () => vulAanUitSeed(), INIT);
  const [weesState, weesActie, weesBezig] = useActionState(
    async () => verwijderWeessleutels(),
    INIT,
  );
  const [vraag, setVraag] = useState(false);
  const [gekopieerd, setGekopieerd] = useState(false);

  async function kopieer() {
    try {
      await navigator.clipboard.writeText(exportJson);
      setGekopieerd(true);
    } catch {
      setGekopieerd(false);
    }
  }

  const melding = vulState.message || weesState.message;
  const mislukt = (vulState.message && !vulState.ok) || (weesState.message && !weesState.ok);

  return (
    <div className="card melding bl-herstel">
      <h3>Herstellen</h3>

      <div className="bl-acties">
        <form action={vulActie}>
          <button type="submit" className="btn btn-outline" disabled={vulBezig || !ontbrekend}>
            {vulBezig ? "Bezig…" : `Ontbrekende sleutels aanvullen (${ontbrekend})`}
          </button>
        </form>

        <button
          type="button"
          className="btn btn-outline"
          disabled={weesBezig || !wees}
          onClick={() => setVraag(true)}
        >
          {weesBezig ? "Bezig…" : `Weessleutels verwijderen (${wees})`}
        </button>

        <button type="button" className="btn btn-outline" onClick={kopieer}>
          {gekopieerd ? "Gekopieerd" : "Afwijkende teksten als JSON"}
        </button>
      </div>

      <p className="melding-tekst">
        Aanvullen zet de seedtekst in elk veld dat de rij niet kent; wat al ingevuld is blijft
        staan. Verwijderen haalt sleutels weg die in geen enkel schema voorkomen; dat kan niet
        ongedaan gemaakt worden. De JSON bevat de volledige CMS-waarden van elke afwijkende tekst,
        zodat de seed in de code ernaartoe bijgewerkt kan worden.
      </p>

      {melding && (
        <p
          className={`melding-tekst ${mislukt ? "bl-melding-fout" : "bl-melding-ok"}`}
          role="status"
        >
          {melding}
        </p>
      )}

      {vraag && (
        <Modal
          title="Weessleutels verwijderen"
          onClose={() => setVraag(false)}
          footer={
            <>
              <button type="button" className="btn btn-outline" onClick={() => setVraag(false)}>
                Annuleren
              </button>
              <form action={weesActie}>
                <button
                  type="submit"
                  className="btn btn-danger"
                  onClick={() => setVraag(false)}
                  disabled={weesBezig}
                >
                  Definitief verwijderen
                </button>
              </form>
            </>
          }
        >
          <p className="modal-tekst">
            Dit verwijdert {wees} sleutel(s) uit de database die in geen enkel veldschema staan.
            Niets op de site leest ze, maar de waarden zijn daarna weg.
          </p>
        </Modal>
      )}
    </div>
  );
}
