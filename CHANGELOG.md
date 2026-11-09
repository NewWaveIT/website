# Changelog

Wat er live staat, nieuwste bovenaan. Eén regel per wijziging, geschreven voor wie niet in
de code kijkt: wat merkt een bezoeker of een redacteur ervan.

Het versienummer volgt [semver](https://semver.org/lang/nl/) en staat in `package.json`.
Welk niveau wanneer hoort, staat in [`CLAUDE.md`](CLAUDE.md#werkwijze-bij-elke-wijziging).
`tests/unit/changelog.spec.ts` faalt als de twee uit de pas lopen.

Een wijziging zonder gevolg voor de site (alleen tests, documentatie, een refactor) krijgt
geen eigen versie; die valt onder de eerstvolgende regel hieronder.

## 1.3.2 — 9 november 2026

- De "Vertrouwd door"-band op de homepage toont nu ook het logo van Vink Bouw.

## 1.3.1 — 5 november 2026

- De vacature-editor toont opsommingen nu met dezelfde oranje vinkjes als de site, in plaats van kale ingesprongen regels.

## 1.3.0 — 5 november 2026

- Een vacature opmaken kan nu in één groot tekstveld. Plak de hele vacature in één keer (uit
  LinkedIn of Word): koppen, alinea's en opsommingen worden vanzelf herkend en de opsommingen
  krijgen op de site het oranje vinkje. Koppen die niet kloppen zet je met één klik om.
- De eerste alinea van de vacaturetekst is de intro in de header van de pagina. De editor
  laat dat zien met het label "Intro in de header" bij die alinea.
- Een vacature kan nu gewone alinea's en subkoppen tonen, niet alleen koppen met opsommingen.
- Het kaartje met feiten naast de vacature is optioneel: lege regels, of het hele kaartje als
  er niets is ingevuld, worden niet meer getoond.
- Locatie, type dienstverband en publicatiedatum staan bij een nieuwe vacature al ingevuld.
- Zoekmachines krijgen bij een vacature nu de volledige tekst, niet alleen de intro.

## 1.2.4 — 27 oktober 2026

- Wie "verminderde beweging" aan heeft staan zag op de homepage nog steeds de klantenband
  voorbijschuiven en de sectorillustraties bewegen. Nu staat alles stil, en de klantenband
  toont dan alle klanten netjes naast en onder elkaar.
- Op een telefoon kon de plakkende "Plan een gesprek"-balk een link of veld afdekken dat je
  met het toetsenbord of een schermlezer selecteerde. Het scherm scrolt nu zo dat het
  geselecteerde element erboven blijft.
- Op de pagina Financial services was de groene tekst in het label "Platform en governance"
  te licht (4,2 in plaats van 4,5 contrast). Donkerder gemaakt.
- Op een telefoon zijn de links in de voettekst, de prijsbadge en "Klantverhalen" in de hero
  groter aan te raken (44 pixels hoog).
- De pagina "niet gevonden" heeft nu een eigen paginatitel.

## 1.2.3 — 22 oktober 2026

- Op een telefoon had de pagina "niet gevonden" (een verkeerd getypte link) geen menu en
  geen logo. Daar staan ze nu, zodat je vanaf die pagina verder kunt.
- Op de contactpagina stond op een telefoon een zwevende "Plan een gesprek"-knop over het
  formulier heen, terwijl hij naar diezelfde pagina verwees. Die knop blijft daar nu weg.
- Het logo bovenin en de regel "of bel …" onderaan zijn op een telefoon groter aan te raken
  (44 in plaats van 24 pixels hoog), zonder dat de pagina er anders uitziet.

## 1.2.2 — 22 oktober 2026

- De "Vertrouwd door"-band toont nu het logo van De Derde Linden in plaats van alleen de naam.
  Moove en De Pizzabakkers staan er niet meer in.

## 1.2.1 — 22 oktober 2026

- De IND staat nu in de "Vertrouwd door"-band op de homepage, naast het COA.

## 1.2.0 — 22 oktober 2026

- Wisselen van pagina voelt nu rustiger: bovenin loopt een dunne oranje balk zolang de
  volgende pagina laadt, en de nieuwe pagina verschijnt met een korte fade in plaats van
  met een harde wissel. Bij "verminderde beweging" in je apparaat blijft de fade weg.
- Op de pagina's Klantverhalen en Inzichten liepen op een telefoon of tablet sterren en een
  oranje lijn dwars door de introtekst. Op smalle schermen laten we die decoratie nu weg.

## 1.1.3 — 22 oktober 2026

- Een beeld dat je in de editor toevoegt stond daar als kapot plaatje, terwijl het op de
  site wel goed te zien was. De browser blokkeerde het beeld uit de opslag; dat is nu
  toegestaan voor het publieke opslagpad.

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
