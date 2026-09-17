import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import JSZip from "jszip";

/**
 * Bundelt het medewerkerspakket tot één download.
 *
 * Draai dit opnieuw zodra er een achtergrond, banner of logo bijkomt of
 * verandert: `npm run pakket`. De zip staat in de repo omdat hij op de pagina
 * als download hangt, en een bestand dat bezoekers ophalen hoort niet pas bij
 * een build te ontstaan — dan verschilt hij per omgeving.
 */

const BRON = "public/medewerkerspakket";
const HANDTEKENING = "public/handtekening";
const DOEL = join(BRON, "medewerkerspakket.zip");

const LEESMIJ = `MEDEWERKERSPAKKET - THE NEW WAVE IT
===================================

Alles wat je zelf instelt. De pagina met voorbeelden, uitleg en de
handtekeninggenerator staat op:

    /medewerkerspakket

Daar vul je je naam en functie in en kopieer je de handtekening met
een klik. Dat werkt prettiger dan het met de hand aanpassen.


BUREAUBLADACHTERGROND (2560 x 1600)
-----------------------------------
wallpaper-01-espresso.png     donker, standaard
wallpaper-02-eggshell.png     licht
wallpaper-03-oranje.png       oranje, expressief
wallpaper-04-minimaal.png     alleen het beeldmerk

Windows: rechtermuisknop op het bureaublad -> Persoonlijke
instellingen -> Achtergrond. Zet "Passend maken" op Vullen.
macOS: Systeeminstellingen -> Achtergrond -> Foto toevoegen.
Kies Vullen, niet Aanpassen.


TEAMS-ACHTERGROND (1920 x 1080)
-------------------------------
teams-donker.png              standaard, voor klantgesprekken
teams-licht.png               bij daglicht of een lichte wand

Tijdens een gesprek: Meer -> Video-effecten en instellingen ->
Meer toevoegen -> kies het bestand.


LINKEDIN-BANNER (1584 x 396)
----------------------------
linkedin-01-bedrijf.png       de bedrijfsbanner
linkedin-03-licht.png         lichte variant

Profiel -> potloodje bij je omslagfoto -> Afbeelding uploaden.
Upload op ware grootte, LinkedIn comprimeert zelf. Je profielfoto
en naam vallen linksonder over de banner, daarom staat alle tekst
rechts.


LOGO VOOR DE E-MAILHANDTEKENING
-------------------------------
handtekening-logo.png         voor een lichte achtergrond
handtekening-logo-wit.png     voor een donker thema

Deze twee zitten erbij zodat je ze kunt bekijken. Gebruik ze niet
als bestand in je handtekening: een handtekening kan geen
afbeelding van je eigen computer meesturen. Ze staan daarom ook op
een vast openbaar adres, en de generator op de pagina vult dat
adres voor je in.


EIGEN VARIANT NODIG?
--------------------
Vraag het aan, dan leveren we hem in de juiste maat en kleuren.
Zelf iets in elkaar zetten in Canva of PowerPoint levert bijna
altijd verkeerde kleuren en een uitgerekt logo op.
`;

const zip = new JSZip();

const plaatjes = readdirSync(BRON).filter((f) => f.endsWith(".png"));
for (const naam of plaatjes) zip.file(naam, readFileSync(join(BRON, naam)));

zip.file("handtekening-logo.png", readFileSync(join(HANDTEKENING, "logo.png")));
zip.file("handtekening-logo-wit.png", readFileSync(join(HANDTEKENING, "logo-wit.png")));
zip.file("LEES-MIJ.txt", LEESMIJ);

// Vaste datum: anders verandert de zip bij elke run en staat er telkens een
// diff in de repo zonder dat de inhoud anders is.
const buffer = await zip.generateAsync({
  type: "nodebuffer",
  compression: "DEFLATE",
  compressionOptions: { level: 9 },
  date: new Date("2026-01-01T00:00:00Z"),
});
writeFileSync(DOEL, buffer);

const kb = (buffer.length / 1024).toFixed(0);
console.log(`${DOEL} — ${plaatjes.length + 3} bestanden, ${kb} KB`);
