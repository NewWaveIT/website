import { notFound } from "next/navigation";
import { ContentListScherm } from "@/components/admin/content-list";
import { ContentEditor } from "@/components/admin/content-editor";
import { AanvragenBoard } from "@/components/admin/aanvragen-board";
import { ADMIN_PADEN } from "@/lib/cms/admin-paden";
import {
  VOORBEELD_LEADS,
  VOORBEELD_RIJ,
  VOORBEELD_RIJEN,
  voorbeeldToegestaan,
} from "@/lib/cms/voorbeeldrijen";
import { SCHERMEN, type SchermSleutel } from "../schermen";

/** Kop boven elk scherm, zodat je weet waar je naar kijkt. */
function Kop({ sleutel }: { sleutel: SchermSleutel }) {
  const s = SCHERMEN.find((x) => x.sleutel === sleutel)!;
  return (
    <>
      <div className="crumb">Ontwerpweergave</div>
      <div className="page-head">
        <div>
          <h1>{s.titel}</h1>
          <p className="sub">{s.toelichting}</p>
        </div>
      </div>
    </>
  );
}

export default async function OntwerpScherm({ params }: { params: Promise<{ scherm: string }> }) {
  if (!voorbeeldToegestaan()) notFound();
  const { scherm } = await params;
  if (!SCHERMEN.some((s) => s.sleutel === scherm)) notFound();
  const sleutel = scherm as SchermSleutel;

  if (sleutel === "lijst") {
    // Het echte scherm, inclusief kop en Nieuw-knop; geen eigen kop eroverheen.
    return (
      <ContentListScherm
        type="paginas"
        crumb="Ontwerpweergave"
        titel="Pagina's"
        sub="Beheer de vaste pagina's."
        rows={VOORBEELD_RIJEN}
        orderable
        nieuwHref="/ontwerp/editor-nieuw"
      />
    );
  }

  if (sleutel === "aanvragen") {
    return (
      <>
        <Kop sleutel={sleutel} />
        <AanvragenBoard leads={VOORBEELD_LEADS} eigenaren={["Voorbeeld", "Tweede Voorbeeld"]} />
      </>
    );
  }

  // De twee editorvarianten verschillen alleen in of er een rij is.
  return (
    <>
      <Kop sleutel={sleutel} />
      <ContentEditor
        type="paginas"
        label={ADMIN_PADEN.paginas.label}
        listPath="/ontwerp"
        row={sleutel === "editor" ? VOORBEELD_RIJ : null}
      />
    </>
  );
}
