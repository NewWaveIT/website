# Changelog

Wat er live staat, nieuwste bovenaan. Eén regel per wijziging, geschreven voor wie niet in
de code kijkt: wat merkt een bezoeker of een redacteur ervan.

Het versienummer volgt [semver](https://semver.org/lang/nl/) en staat in `package.json`.
Welk niveau wanneer hoort, staat in [`CLAUDE.md`](CLAUDE.md#werkwijze-bij-elke-wijziging).
`tests/unit/changelog.spec.ts` faalt als de twee uit de pas lopen.

Een wijziging zonder gevolg voor de site (alleen tests, documentatie, een refactor) krijgt
geen eigen versie; die valt onder de eerstvolgende regel hieronder.

## 1.1.2 — 9 oktober 2026

- Een foutmelding of 404 op een marketingpagina toonde de navigatie en de voettekst twee
  keer. Nu één keer, net als op een gewone pagina.
- De afsluitende klantquote krijgt een fors oranje aanhalingsteken en een bredere kaart,
  zodat het blok niet langer veel ruimte inneemt voor weinig tekst.

## 1.1.1 — 9 oktober 2026

- Citaten zien er overal hetzelfde uit. Ze stonden op zeven plekken met twee maten en twee
  gewichten door elkaar; nu één vorm met twee rollen: een kort uittreksel in lopende tekst
  blijft groot, een volledige klantuitspraak staat op leesmaat.
- De afsluitende quote op een klantverhaal staat in een witte kaart, net als de andere drie
  plekken waar een klantcitaat staat. Hij was acht regels van 36px breed uitgesmeerd over
  een lege band.

## 1.1.0 — 8 oktober 2026

- Het webadres van een klantverhaal, artikel, sector, dienst, vacature of teamlid is nu ook
  achteraf aan te passen in de editor. Verander je het van een item dat live staat, dan
  waarschuwt het veld dat het oude adres daarna een 404 geeft. Pagina-ingangen houden hun
  vaste adres: daar is de slug geen webadres maar de sleutel van het veldschema.

## 1.0.3 — 8 oktober 2026

- Klantverhaal: de oranje pill onder het kruimelpad heeft weer lucht boven zich.
- Klantverhaal: het citaat onderaan had een lege grijze cirkel naast zich, een fotoplek die
  nooit gevuld werd. Die is weg; het citaat staat nu gecentreerd in de huisvorm met de
  oranje lijn ernaast.

## 1.0.2 — 8 oktober 2026

- Beveiligingsupdates: Next naar 16.3.8, sharp naar 0.35.5. Daarmee zijn alle elf
  kwetsbaarheden weg die GitHub op de repository meldde. De enige die ons werkelijk raakte
  was server-side request forgery in de afbeeldingsoptimalisatie; de kritieke melding zat
  in `next/og`, dat we nergens gebruiken.

## 1.0.1 — 8 oktober 2026

- De foutpagina herkent nu de situatie waarin er een nieuwe versie is uitgerold terwijl je
  pagina openstond. Je krijgt dan een uitleg en een knop "Pagina herladen" in plaats van
  "Opnieuw proberen", die daar niets tegen kon beginnen. Geldt voor de admin en de
  publieke site.

## 1.0.0 — 8 oktober 2026

De site zoals hij nu op www.thenewwaveit.com staat. Vanaf hier houdt dit bestand de
wijzigingen bij; wat daarvóór gebeurde staat in `git log` en in
[`docs/BESLISSINGEN.md`](docs/BESLISSINGEN.md).

De laatste stappen naar deze versie:

- Het logo in de e-mailhandtekening wijst altijd naar het eigen domein, niet meer naar een
  previewadres dat na de domeinovergang verdween.
- Vercel Web Analytics staat aan (cookieloos, dus buiten de cookiemelding).
- De hero-afbeelding op de homepage blokkeert de LCP niet meer.
- Alle vijf de admintabellen stapelen op een telefoon.
- `/ontwerp` laat de echte adminschermen zien zonder database.
