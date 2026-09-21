"use client";

import { useState } from "react";
import { uploadImage } from "@/app/admin/content/actions";
import { teGroot, type BeeldSoort } from "@/lib/beeld-eisen";
import { klaarVoorUpload, nogSteedsTeGroot, verkleindMelding } from "@/lib/beeld-upload";

/**
 * Eén pad voor elke beeldupload in de admin.
 *
 * Het coverveld en de rich-text-editor hadden allebei hun eigen afhandeling, en
 * ze liepen uit elkaar: de een gaf het soort beeld door aan de server en de
 * ander niet, de een toonde een waarschuwing en de ander gooide hem weg, en
 * geen van tweeën keek naar de bestandsgrootte vóór het versturen — waardoor
 * een foto van 1,12 MB een 500 opleverde in plaats van een melding.
 *
 * De volgorde is hier: verkleinen, meten, versturen. In die volgorde, want een
 * bestand dat na het verkleinen ruim onder de limiet zit hoeft geen foutmelding
 * te krijgen.
 */
export interface UploadUitkomst {
  url: string;
  breedte?: number;
  hoogte?: number;
}

export function useBeeldUpload(soort: BeeldSoort) {
  const [bezig, setBezig] = useState(false);
  const [fout, setFout] = useState("");
  const [melding, setMelding] = useState("");

  const wis = () => {
    setFout("");
    setMelding("");
  };

  /** Geeft de URL terug, of `null` als er niets is geüpload. */
  const verwerk = async (file: File): Promise<UploadUitkomst | null> => {
    wis();
    setBezig(true);
    try {
      const klaar = await klaarVoorUpload(file);

      if (nogSteedsTeGroot(klaar)) {
        // Ná het verkleinen nog te groot: dan is het geen kwestie van
        // comprimeren meer en moet de redacteur zelf iets kiezen.
        setFout(teGroot(klaar.bestand.size) ?? "Dit bestand is te groot.");
        return null;
      }

      const fd = new FormData();
      fd.append("file", klaar.bestand);
      fd.append("soort", soort);
      const res = await uploadImage(fd);

      if (res.error || !res.url) {
        setFout(res.error ?? "Uploaden mislukt.");
        return null;
      }

      // Twee dingen kunnen tegelijk gelden: verkleind én te klein of te
      // vierkant. Allebei melden, anders los je er één op en blijft de ander.
      setMelding([verkleindMelding(klaar), res.waarschuwing].filter(Boolean).join(" "));
      return { url: res.url, breedte: res.width, hoogte: res.height };
    } finally {
      setBezig(false);
    }
  };

  return { bezig, fout, melding, setFout, wis, verwerk };
}
