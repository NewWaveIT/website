/**
 * Wat een geüpload beeld moet meebrengen, en wat de upload erover meldt.
 *
 * Twee dingen kan een redacteur in de editor niet zien en op de site wel:
 * een beeld dat te klein is (wazig) en een beeld dat te vierkant is (op de
 * kaart in een overzicht gaat er dan een hap af). Allebei worden ze gemeld en
 * geen van beide geweigerd — soms is een kleine schermafdruk het enige dat er
 * is, en een onscherpe afbeelding is beter dan geen.
 *
 * Staat los van de server action omdat een "use server"-bestand alleen async
 * functies mag exporteren.
 */

/**
 * De breedte die een beeld minstens moet hebben.
 *
 * Een coverbeeld wordt tot 980px breed getoond; op een scherm met dubbele
 * pixeldichtheid is dat 1960. Onder de 1200 wordt het zichtbaar zacht, en dat
 * is precies wat er gebeurde: er stond een schermafdruk van 378px als cover,
 * die in de editor prima oogt en op de site wazig is.
 *
 * Beeld in de lopende tekst staat op maximaal 720px, vandaar de lagere grens.
 */
export const MIN_BREEDTE = { cover: 1200, inline: 720 } as const;

export type BeeldSoort = keyof typeof MIN_BREEDTE;

/**
 * De verhouding van het beeldvlak op een artikelkaart (`.post .cover` in
 * globals.css). Alle kaarten in een raster delen één vorm — dat is de bedoeling,
 * anders wordt een overzicht rommelig — dus alles wat niet in die verhouding
 * wordt aangeleverd, wordt bijgesneden.
 *
 * 3:2 is voor deze content het optimum: de omslagen lopen van 1,13 tot 1,94, en
 * bij wortel(1,13 x 1,94) = 1,48 komen die twee uitersten op hetzelfde verlies
 * uit. Elke andere verhouding maakt het slechtste geval erger.
 */
export const KAART_VERHOUDING = 3 / 2;

/** Vanaf hier is de hap eruit groot genoeg om te melden. */
export const KAART_VERLIES_GRENS = 0.15;

/**
 * Welk deel van het beeld de kaart wegsnijdt, als fractie (0 = niets).
 *
 * Dit is precies wat `object-fit: cover` doet: het beeld wordt zo geschaald dat
 * het vlak vol is, en wat oversteekt valt weg. Bij een breder beeld gaat het
 * van de zijkanten af, bij een smaller beeld van boven en onder.
 */
export function kaartVerlies(breedte: number, hoogte: number): number {
  if (!breedte || !hoogte) return 0;
  const verhouding = breedte / hoogte;
  return 1 - Math.min(verhouding, KAART_VERHOUDING) / Math.max(verhouding, KAART_VERHOUDING);
}

/**
 * De melding bij een upload, of `undefined` als er niets aan de hand is. Twee
 * bezwaren kunnen tegelijk gelden; ze komen dan in één zin achter elkaar.
 */
export function uploadWaarschuwing(
  soort: BeeldSoort,
  breedte?: number,
  hoogte?: number,
): string | undefined {
  const delen: string[] = [];
  const ondergrens = MIN_BREEDTE[soort];

  if (breedte && breedte < ondergrens) {
    delen.push(
      `Deze afbeelding is ${breedte}px breed. Voor een scherp resultaat is minstens ${ondergrens}px nodig; hij wordt nu kleiner getoond dan de volle breedte.`,
    );
  }

  if (soort === "cover" && breedte && hoogte) {
    const verlies = kaartVerlies(breedte, hoogte);
    if (verlies >= KAART_VERLIES_GRENS) {
      const staand = breedte / hoogte < KAART_VERHOUDING;
      delen.push(
        `Op de kaart in het overzicht valt ${Math.round(verlies * 100)}% weg: die staat op 3:2 en deze is ${staand ? "vierkanter" : "breder"}. Lever hem als 3:2 aan (bijvoorbeeld 1800x1200) en er gaat niets af.`,
      );
    }
  }

  return delen.length ? delen.join(" ") : undefined;
}
