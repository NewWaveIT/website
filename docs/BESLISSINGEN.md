# Beslissingen

Wat we bewust zo hebben gedaan, en waarom. Alleen dingen die je **niet uit de code
kunt aflezen** — de code zelf zegt wat er gebeurt, dit zegt waarom het niet anders is.

Waarom dit bestand bestaat: een AI-sessie begint elke keer zonder geheugen. Zonder deze
lijst draait een volgende sessie iets terug omdat het een verbetering lijkt. Dat is geen
theorie; het is de reden dat de handgeschreven routekaart in `revalidate.ts` ooit weg
moest en dat er verzonnen klantverhalen live hebben gestaan.

Nieuwe regel erbij? Eén alinea, met de datum en de aanleiding. Wordt een besluit
teruggedraaid, laat het staan en schrijf eronder waarom.

---

## Content en tekst

**Proposities zijn verwijderd, niet vergeten** — 14 september 2026
Er was een contenttype `proposities` met een tabel, een admin-pagina, een veldschema en
vier geschreven proposities. Geen enkele publieke pagina rendeerde ze; het commentaar in
`revalidate.ts` noemde dat zelfs al. De keuze was: alsnog bouwen als PMC op de
sectorpagina's, of weg. De eigenaar koos weg. `drop table` is uitgevoerd, dus de vier
teksten zijn er niet meer. Bouw het niet terug zonder daar opnieuw naar te vragen.

**Navigatielabels blijven in de code** — 14 september 2026
"Diensten", "Sectoren", "Werken bij" en de CTA's in de header, de footer en het mobiele
menu staan bewust niet in het CMS. Ze horen bij de routes: een label wijzigen zonder de
route mee te nemen levert een menu-item op dat iets anders belooft dan het opent. Alle
overige zichtbare tekst is wél redactioneel.

**Toegankelijkheidsteksten blijven in de code** — 14 september 2026
`aria-label`, `alt` en "Direct naar inhoud" zijn techniek, geen content. Een lege of
verkeerde waarde breekt de site voor schermlezers zonder dat iemand het ziet, en
`tests/unit/admin-aria.spec.ts` bewaakt ze nu. Uit het CMS houden dus.

**`{naam}` en `{dienst}` zijn plaatshouders in CMS-teksten**
Een paar koppen noemen het item waar ze boven staan: "Onze {naam}-diensten", "Resultaten
met {naam}", "Je vraag gaat over {dienst}". `vulIn` (`lib/utils.ts`) vult ze in. Laat een
redacteur de plaatshouder weg, dan verdwijnt de naam — dat is toegestaan, geen fout.

**Wit op flame haalt bewust geen AA op de publieke site**
`#f15822` met witte tekst is een merkkeuze. In de admin is dat wél rechtgetrokken naar
`--orange-700`, want daar is geen merkargument. Repareer de publieke kant niet zonder
te vragen.

**Alleen instapdiensten tonen een prijs**
Al het andere is "Prijs op aanvraag". Verzin nooit bedragen, tarieven, senioriteits-
niveaus, klantnamen of teamnamen: die levert de eigenaar aan.

## Architectuur

**Vier sjabloon-ingangen en één algemene in `PAGE_FIELDS`** — 14 september 2026
`sector-detail`, `dienst-detail`, `klantverhaal-detail` en `vacature-detail` bevatten de
koppen en labels die voor _alle_ items van dat type tegelijk gelden; `algemeen` bevat wat
op elke pagina staat. Ze horen niet bij één item en ook niet bij de overzichtspagina. Het
pad in `PAGE_PATH` wijst naar het overzicht omdat revalidatie toch grofmazig is.

**De keuzelijsten in het contactformulier blijven arrays in de code**
Sector en onderwerp zijn `string[]`. Het paginateksten-pad houdt alleen strings over
(`getPagina` laat alles vallen wat geen string is). Een lijst als tekstveld met
scheidingstekens werkt wel maar is een valkuil in de editor. Moeten ze aanpasbaar worden,
dan hoort daar een eigen veldtype bij.

**De foutpagina en de mailtemplates lezen de terugval, niet het CMS**
`app/error.tsx`, `app/not-found.tsx` en `lib/email.ts` gebruiken `CONTACT_TERUGVAL` uit
`lib/contactgegevens.ts`. De foutpagina moet het juist doen als de database onbereikbaar
is — dat is precies het moment waarop iemand belt — en een mail wordt verstuurd vlak na
een inzending en hoort daar geen tweede leesactie bij te krijgen die kan mislukken.

**De laadstaat van de vacaturepagina staat niet in het CMS**
`app/(marketing)/vacatures/[slug]/loading.tsx` rendert vóór er data is. Een leesactie zou
daar precies het wachten toevoegen dat die zin moet opvangen.

**`lib/inzichten-data.ts` gebruikt geen `maakLezer`**
De enige uitzondering op het gedeelde leespad. Artikelen worden verrijkt met auteur
(uit teamleden) en dienst, en passen daarom niet in de standaardvorm. Staat als
uitzondering in `tests/unit/manifest.spec.ts`.

## Werkwijze

**De nulmeting staat in de admin, niet in een SQL-script** — 15 september 2026
Er lagen negen losse controlescripts in `supabase/scripts/` die elk op één moment met de
hand waren gegenereerd, en die daarna stil verouderden: `20260914-cms-volledigheid.sql`
vraagt nog naar `cms_proposities`, `20260914-seed-vs-cms.sql` meldt een homepagetekst die
allang is gecorrigeerd. Een script dat onzin meldt wordt niet meer gedraaid. `/admin/baseline`
leest het schema en de seed rechtstreeks uit de code van dezelfde build en kan daardoor
niet achterlopen. De oude scripts blijven staan als naslag van wat er toen speelde; draai
ze niet meer.

**Bij een verschil tussen CMS en seed wint het CMS** — 15 september 2026
De eigenaar wil dat de fallback niet van het CMS afwijkt. De richting is dan: de tekst in
de admin is de waarheid, en de seed in de code trekt bij. Daarom heeft de nulmeting wél
een knop voor ontbrekende sleutels (die voegt alleen toe) en géén knop die een CMS-tekst
overschrijft met de seed. De JSON-export levert de CMS-waarden die nodig zijn om de seed
in de code bij te werken.

**Nieuwe content alleen in het CMS is geen fout, maar wel een verschil** — 15 september 2026
CLAUDE.md zegt: content hoort in de admin, niet in de code. Een klantverhaal dat alleen in
het CMS staat is dus normaal — en tegelijk verdwijnt het van de site zodra Supabase
onbereikbaar is. De nulmeting toont die rijen daarom als "ter info" in plaats van als
afwijking. Wil je ook dáár geen verschil, dan hoort het item in de seed; dat is een keuze
per item, geen regel.

**Direct naar `main`, geen PR** — 14 september 2026
De eigenaar werkt alleen aan dit project en heeft gevraagd om rechtstreekse merges. CI
draait wel op elke push. Maak geen PR aan tenzij erom gevraagd wordt.

**SQL draait de eigenaar, of de AI met MCP-toegang** — 14 september 2026
Tot 14 september had een sessie geen databaseverbinding en ging elke query via de
eigenaar. Sindsdien is er Supabase-MCP. Die toegang is **niet** read-only: hij kan
schrijven en bij `contact_aanvragen` en `sollicitaties`, waar persoonsgegevens in staan.
Afspraak: alleen lezen uit `cms_*`, geen migratie of schrijfactie zonder dat expliciet
voor te leggen.

**Geheimen niet in de repo en niet in de chat**
Service-keys staan in Vercel en `.env.local`. Alleen `NEXT_PUBLIC_*` mag in de client.
