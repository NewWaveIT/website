# Motion-briefing: hero-animatie "Business en IT als één beweging"

Briefing voor wie de animatie ontwerpt (motion designer of een motion-tool). Alles wat hier
staat komt uit de huidige hero (`components/home/hero-sector.tsx` en `hero-sector.css`) en uit
de huisstijltokens in `app/globals.css`. Geen enkel getal of claim is verzonnen; waar iets
nog beslist moet worden, staat het onder _Keuzes voor de opdrachtgever_.

## 1. Waar het om gaat

De homepage opent met een hero over de volle schermhoogte. Vijf sectoren wisselen elkaar af,
elk met een foto van mensen aan het werk. De kop luidt **"Business en IT als één beweging."**
en de intro **"Sectorkennis, Mendix en AI in één team, van eerste sessie tot werkende software
voor de mensen die ermee werken."** (Dit zijn de standaardteksten; kop en intro komen uit het
CMS en kunnen veranderen. De animatie mag er dus niet van afhangen.)

De foto's tonen de **business**: mensen in hun werk. Wat ontbreekt is de **IT-kant**: hoe dat
werk met Mendix (low-code) tot werkende software wordt. De animatie laat zien dat die twee één
beweging zijn: een moment uit het werk, en daar direct uit voortkomend een eenvoudige applicatie
die dat werk makkelijker maakt.

**Verhaal in één zin:** een mens doet zijn werk, een oranje lijn verbindt dat met een app die
je ziet ontstaan, en de app geeft iets terug aan die mens.

## 2. Wat er nu staat (niet vervangen, wel meebewegen)

| Onderdeel | Nu                                                                                            |
| --------- | --------------------------------------------------------------------------------------------- |
| Beeld     | Volledig scherm foto per sector, crossfade van 1,1 s en een trage inzoom (schaal 1 naar 1,12) |
| Cyclus    | 5 scenes van **6,5 s** (`CYCLE_MS`), samen 32,5 s, daarna opnieuw                             |
| Tekst     | Links, maximaal 700 px breed, op een zijdelingse verduistering (scrim)                        |
| Onderbalk | Links één praktijkregel per sector, rechts vijf streepjes en een pauzeknop                    |
| Bediening | De streepjes springen naar een sector, de pauzeknop stopt het wisselen (WCAG 2.2.2)           |
| Start     | De wisseling begint pas na `load`, de eerste scene staat in de server-HTML                    |

De vijf scenes, met hun praktijkregel zoals die nu in de hero staat:

| #   | Sector          | Praktijkregel onder in beeld                                   |
| --- | --------------- | -------------------------------------------------------------- |
| 1   | Publieke sector | Aan de balie wordt de aanvraag samen doorgenomen               |
| 2   | Zorg            | De wijkverpleegkundige legt de meting vast bij de cliënt thuis |
| 3   | Mobiliteit      | Op de terminal komen trein, truck en kraan samen               |
| 4   | Banken          | In de boardroom staan de cijfers op tafel                      |
| 5   | Manufacturing   | Aan de lijn stuurt de operator de productie bij                |

## 3. Aanpak: een IT-laag óver de foto's (aanbevolen)

**Behoud de foto's.** Ze laten echte mensen zien; dat is precies de boodschap "de mens centraal".
Teken geen mensen na en vervang de foto's niet. Leg er een **IT-laag** overheen die per sector
een korte, rustige animatie speelt aan de rechterkant van het beeld.

Opbouw per scene (6,5 s, tijden zijn richtwaarden):

| Tijd        | Wat gebeurt er                                                                                                         |
| ----------- | ---------------------------------------------------------------------------------------------------------------------- |
| 0,0 – 0,8 s | De foto wisselt (bestaande crossfade). De IT-laag is nog leeg.                                                         |
| 0,8 – 1,6 s | Een kleine oranje ring verschijnt op het punt waar het werk gebeurt (zie kolom _Anker_ hieronder).                     |
| 1,6 – 3,0 s | Vanuit de ring trekt een oranje lijn naar rechts. Aan het eind bouwt een eenvoudig app-scherm zich op, blok voor blok. |
| 3,0 – 4,6 s | Drie knooppunten (aanleiding, controle, resultaat) verbinden zich tot een korte flow onder of naast het scherm.        |
| 4,6 – 5,4 s | Eén puls loopt door de flow en zet een vinkje of een "bijgestuurd"-teken. Het werkt.                                   |
| 5,4 – 6,5 s | De laag kalmeert en dimt weg, zodat de volgende scene schoon begint.                                                   |

**Per sector** (alleen vorm, nooit cijfers, namen of echte data):

| Sector          | Anker (waar de ring staat)       | App-scherm in de animatie                                                     | Flow (3 knooppunten)                       |
| --------------- | -------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------ |
| Publieke sector | De aanvraag op de balie          | Een aanvraag met drie statusstappen die achter elkaar aangaan                 | Ontvangen, beoordeeld, besloten            |
| Zorg            | De meting bij de cliënt          | Een invoerveld en een eenvoudige tijdlijn                                     | Vastleggen, controleren, in het dossier    |
| Mobiliteit      | De terminal waar alles samenkomt | Een planbord met drie banen (trein, truck, kraan) waarin een blok doorschuift | Aankomst, plannen, toewijzen               |
| Banken          | De cijfers op tafel              | Een dashboard met abstracte staafjes en twee vinkjes (vier-ogen)              | Aanvraag, eerste controle, tweede controle |
| Manufacturing   | De bediening aan de lijn         | Een lijn met een schuifregelaar en een statuslampje                           | Meten, bijsturen, bevestigen               |

De knooppunten krijgen **geen tekst in de animatie**. Zie _Tekst_ onder 6.

## 4. De Mendix-koppeling visueel maken

Mendix is low-code: applicaties worden uit **blokken** samengesteld. Dat is het beeld.

- **Blokken die op hun plek klikken.** Afgeronde rechthoeken (een invoerveld, een lijst, een
  statuskaart) schuiven met een korte, rustige beweging op hun plek, alsof ze in elkaar vallen.
- **Een microflow als lijn met knooppunten.** Drie cirkels op een lijn, verbonden door een
  oranje pad dat zich tekent. Eenvoudig, leesbaar op afstand.
- **Eén domeinmodel-hint (optioneel).** Twee kleine kaartjes met een verbindingslijn ertussen,
  hooguit een halve seconde in beeld. Geen volledig schema.

**Wat we niet willen zien:** neonlijnen en "Matrix"-code, hologrammen, robots, gloeiende
breinen en kruiende AI-clichés, stockachtige tech-patronen, en een mens die in de animatie
wordt nagetekend. De foto is de mens.

**Mendix-logo en -blauw:** niet gebruiken zonder dat de opdrachtgever de merkrichtlijnen van
Mendix heeft gecontroleerd. Het verhaal werkt ook zonder logo, in onze eigen kleuren.

## 5. Huisstijl

Gebruik de kleuren als **variabelen** (zie levering), zodat ze 1-op-1 op onze tokens passen.

| Rol                                          | Token                   | Waarde                           |
| -------------------------------------------- | ----------------------- | -------------------------------- |
| Donkere achtergrond (scrim)                  | `--ink-950`             | `#211a11`                        |
| Espresso                                     | `--ink-900`             | `#2e251a`                        |
| **De verbinding** (lijn, ring, puls, vinkje) | `--orange-500`          | `#f15822`                        |
| Oranje voor kleine elementen op donker       | `--orange-text-on-dark` | `#f47c4d`                        |
| Blokken en lijnen op de foto                 | `--paper`               | `#fbfaf6`, op 12 tot 30% dekking |
| Eggshell (lichte vlakken)                    | `--eggshell`            | `#f4f1ea`                        |

- **Oranje is alleen voor de verbinding.** Het is het enige dat de aandacht trekt. Alle blokken
  zijn paper op lage dekking. Zo blijft de foto leidend en de koppeling het verhaal.
- Lijndikte 2 px, vlak ontwerp, geen verlopen en geen zware schaduwen. Hoeken afgerond zoals de
  kaarten op de site.
- De tekst in de hero (kop, intro, knoppen) en de onderbalk blijven **altijd** vrij en leesbaar.

## 6. Tekst

Geen tekst in de animatie. Een kop, label of getal dat in het beeld is gebakken kan niet
vertaald, niet uitgelezen en niet gecontroleerd worden op contrast. Alles wat een woord is,
blijft live HTML in de hero. In de animatie zitten alleen vormen. De sectornaam en de
praktijkregel staan al in beeld en blijven daar.

Is er toch een microlabel nodig (bijvoorbeeld een stapnummer), dan IBM Plex Mono, 11 px of
groter, en alleen als het overleg het goedkeurt.

## 7. Veilige zones en schermen

- **Canvas:** de rechter ~55% van het scherm, tussen de bovenbalk en de onderbalk. Houd links
  **700 px + 40 px marge** vrij voor de tekst, onder **96 px** vrij voor de onderbalk.
- De hero is `min-height: max(560px, 100dvh)`. Ontwerp op **1440 × 900** en controleer op
  1920 × 1080 en 1280 × 720.
- **Onder 900 px** staat de tekst over de volle breedte. Dan valt de IT-laag weg, op dezelfde
  manier als de decoratieve animatie op de andere paginakoppen. Een mobiele variant mag, maar
  alleen onderin de hero en zonder de tekst te raken. Zie _Keuzes_.

## 8. Timing en gedrag

- Elke scene is **zelfstandig**. Bezoekers springen via de streepjes naar elke sector en
  kunnen pauzeren. Een animatie moet dus op elk moment bij t = 0 kunnen beginnen, zonder
  gevolgen van de vorige scene, en schoon stoppen en herstarten.
- Maximaal **6,0 s** per scene, zodat er 0,5 s overlap met de crossfade overblijft.
- **Pauzeren stopt ook de IT-laag.** Dat is een eis uit WCAG 2.2.2, niet een wens.
- **Verminderde beweging** (`prefers-reduced-motion`): lever per scene één **eindbeeld** (het
  moment na 5,4 s) als stilstaande variant.
- Geen flikkering boven 3 keer per seconde (WCAG 2.3.1). Rustig, doelgericht, één ding tegelijk.
- Bewegingstaal: ingangen met `cubic-bezier(0.16, 0.8, 0.24, 1)` (dezelfde curve als de
  sectornaam die inschuift), 0,4 tot 0,7 s per element, 80 tot 120 ms tussen elementen.
  Alleen `transform` en `opacity` bewegen; geen eigenschappen die layout veroorzaken.

## 9. Levering

**Voorkeur: pure SVG met CSS-keyframes.** Dat sluit aan op wat de site al doet
(`lib/sector-hero-svg.ts` bouwt de paginakop-vignetten zo): geen extra JavaScript, geen
library, tokens als CSS-variabelen, en het raakt de laadsnelheid niet.

Lever per scene:

1. **Een bronbestand** (After Effects, Rive of Figma) met benoemde lagen.
2. **De SVG-vormen** per element, met een `id` per laag, zonder `<style>`-element en zonder
   ingesloten lettertypen of afbeeldingen. (De CSP weigert een `<style>` in de HTML; zie
   `tests/e2e/kritieke-css.spec.ts`.)
3. **Een keyframe-tabel** per element: starttijd, duur, easing, begin- en eindwaarde van
   `transform` en `opacity`. Dat vertalen we direct naar CSS.
4. **Het eindbeeld** als stilstaande SVG voor verminderde beweging.

Alternatief als de beweging met SVG echt niet haalbaar is: een Lottie of Rive-bestand. Dat
kan alleen als de player past binnen onze CSP (zie `next.config.ts`) en binnen het budget. Geen
video met transparantie: Safari ondersteunt dat niet betrouwbaar.

**Budget per scene:** SVG en keyframes samen maximaal **30 KB** voor compressie. Totaal voor
alle vijf maximaal **120 KB**. De eerste scene mag het laden van de hero niet vertragen.

## 10. Eisen vanuit de site (voor wie het inbouwt)

- **LCP:** de eerste foto mag niet infaden en niet verborgen zijn. De IT-laag begint pas na
  `load`, net als de wisseling, en is zelf geen kandidaat voor LCP (geen groot vlak op
  dekking 0).
- **Toegankelijkheid:** de laag is decoratief (`aria-hidden`). Geen informatie die alleen in de
  animatie staat.
- **Bestaande bewakers die groen moeten blijven:** `tests/e2e/smoke.spec.ts` (geen
  console-fouten), `tests/e2e/kritieke-css.spec.ts`, `tests/e2e/toegankelijkheid.spec.ts` en de
  Lighthouse-drempel van 0,75 voor prestaties. `tests/e2e/hero-overlap.spec.ts` bewaakt nu
  alleen de decoratieve animatie op de paginakoppen, niet deze hero: bij het inbouwen hoort
  daar een gelijksoortige test voor de IT-laag bij (de laag mag de tekst niet raken, op 375,
  800 en 1280 px).
- **Schrijfstijl:** geen em-streepje in zichtbare tekst en geen u-vorm buiten de admin.

## 11. Acceptatiecriteria

- [ ] Alle vijf de scenes spelen vanaf t = 0, zelfstandig en schoon herstartbaar
- [ ] Elke scene is korter dan 6,0 s en eindigt rustig
- [ ] De tekst en de onderbalk zijn op elk moment vrij en leesbaar
- [ ] Oranje komt alleen voor in de verbinding
- [ ] Geen tekst, cijfer, merknaam of echte data in de animatie
- [ ] Per scene een eindbeeld voor verminderde beweging
- [ ] Pauzeren stopt de animatie; de streepjes werken nog
- [ ] Binnen het budget (30 KB per scene, 120 KB totaal)
- [ ] Gecontroleerd op 1280, 1440 en 1920 px breed, en de laag valt onder 900 px netjes weg
- [ ] Geen enkele bewaker uit hoofdstuk 10 wordt rood

## 12. Keuzes voor de opdrachtgever

1. **Aanpak A of B.** A (aanbevolen): foto's blijven, IT-laag erbovenop. B: de foto's worden
   vervangen door getekende scenes. B is veel meer werk en verliest de echte mensen.
2. **Mendix-logo.** Wel of niet tonen? Dan eerst de merkrichtlijnen van Mendix nalopen.
3. **Mobiel.** Laag weglaten onder 900 px (aanbevolen), of een aparte variant onderin.
4. **Eén verhaal of vijf.** Per sector een eigen app-scherm (zoals hierboven) of één
   universeel beeld met alleen een ander anker. Vijf is rijker, één is goedkoper en consistenter.

## 13. Prompt om direct te gebruiken

> Maak een rustige, vlakke hero-animatie in SVG met CSS-keyframes voor The New Wave IT, een
> Mendix-consultancy. Context: een hero over de volle schermhoogte met een foto van mensen aan
> het werk, vijf sectoren die elke 6,5 seconde wisselen (publieke sector, zorg, mobiliteit,
> banken, manufacturing). Kop: "Business en IT als één beweging." De animatie is een laag
> óver de foto, aan de rechterkant (rechter 55%, ontwerp op 1440 × 900), en laat per sector in
> maximaal 6 seconden zien hoe een moment uit het werk met low-code tot een eenvoudige app
> wordt: een oranje ring op het werkmoment, een oranje lijn naar rechts, een app-scherm dat
> uit blokken ontstaat, een flow van drie knooppunten, één puls en een vinkje, dan rustig
> wegdimmen. Kleuren: oranje `#f15822` alleen voor de verbinding, alle andere vormen in
> `#fbfaf6` op 12 tot 30% dekking, achtergrond blijft de foto. Lijndikte 2 px, afgeronde
> hoeken, geen verlopen, geen schaduwen, geen tekst, geen cijfers, geen mensfiguren, geen
> neon of code-regen, geen Mendix-logo. Alleen `transform` en `opacity` animeren. Curve
> `cubic-bezier(0.16, 0.8, 0.24, 1)`, 0,4 tot 0,7 s per element. Elke scene moet zelfstandig
> bij t = 0 kunnen starten en daarna kunnen pauzeren. Lever per scene: bronbestand, SVG-vormen
> met id's (geen `<style>`), een keyframe-tabel en een eindbeeld voor verminderde beweging.
> Maximaal 30 KB per scene.
