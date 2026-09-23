import { notFound } from "next/navigation";
import { ContentListScherm } from "@/components/admin/content-list";
import { ContentEditor } from "@/components/admin/content-editor";
import { AanvragenBoard } from "@/components/admin/aanvragen-board";
import { ActiviteitTabel } from "@/components/admin/activiteit-tabel";
import { GebruikersBeheer } from "@/components/admin/gebruikers-beheer";
import { NieuwsbriefLijst } from "@/components/admin/nieuwsbrief-lijst";
import { Tabel as BaselineTabel } from "@/app/admin/baseline/page";
import { ADMIN_PADEN } from "@/lib/cms/admin-paden";
import {
  VOORBEELD_AUDIT,
  VOORBEELD_BEVINDINGEN,
  VOORBEELD_GEBRUIKERS,
  VOORBEELD_LEADS,
  VOORBEELD_NIEUWSBRIEF,
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

  if (sleutel === "activiteit") {
    return (
      <>
        <Kop sleutel={sleutel} />
        <ActiviteitTabel rows={VOORBEELD_AUDIT} />
      </>
    );
  }

  if (sleutel === "gebruikers") {
    return (
      <>
        <Kop sleutel={sleutel} />
        <GebruikersBeheer gebruikers={VOORBEELD_GEBRUIKERS} currentUserId="g1" />
      </>
    );
  }

  if (sleutel === "nieuwsbrief") {
    return (
      <>
        <Kop sleutel={sleutel} />
        <NieuwsbriefLijst leads={VOORBEELD_NIEUWSBRIEF} />
      </>
    );
  }

  if (sleutel === "baseline") {
    return (
      <>
        <Kop sleutel={sleutel} />
        <div className="card">
          <BaselineTabel rijen={VOORBEELD_BEVINDINGEN} />
        </div>
      </>
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
