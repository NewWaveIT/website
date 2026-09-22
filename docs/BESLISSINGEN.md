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

**De LinkedIn-banner "eigen rol" staat bewust niet op het medewerkerspakket** — 21 september 2026
`linkedin-02-eigen-rol.png` ("Ik bouw AI-native organisaties") is op 18 september van de
pagina gehaald en op 21 en 22 september opnieuw geweigerd. Let op: hij zit wél in elke export
uit het ontwerpproject, dus bij een volgende levering staat hij gewoon weer in de zip.
Plaats hem niet omdat hij in de map zit; alleen als de eigenaar er opnieuw om vraagt.
De andere twee (`linkedin-01-bedrijf`, `linkedin-03-licht`) worden wél steeds vervangen
door de nieuwste versie.

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

**Mobiele marges lopen via tokens, niet via losse media queries** — 18 september 2026
`--gutter` (paginamarge) en `--pad-kaart` / `--pad-kaart-ruim` (binnenmarge van een kaart
met lopende tekst) staan in `:root` en krijgen onder 640px een kleinere waarde. Ze zien
eruit als overbodige omwegen om `var(--space-6)` en zijn dat niet: de paginamarge en de
kaartmarge stápelen, en met de vaste waardes bleef er op een telefoon 198 tot 263px tekst
over — ongeveer twintig tekens per regel, met een woordafbreking op bijna elke regel. Het
citaat op de homepage besloeg zo vijftien regels met acht afbrekingen. Met de tokens is
dat 287px. Zet een nieuwe kaart met tekst dus op `--pad-kaart`, niet op `--space-7`, en
laat elke `.wrap-wide` die zijn eigen zijmarge zet `--gutter` gebruiken; anders schuift de
ene sectie wel mee en de andere niet.

**`--text-3xs` en `--text-2xs` bestaan omdat 10px op een telefoon te klein is** — 18 september 2026
Er stonden 26 handgeschreven `font-size: 10px` en `11px` verspreid over dertien
bestanden. Als token schalen ze onder 640px een trap omhoog (10 → 11, 11 → 12). Schrijf
geen nieuwe vaste waarde onder `--text-xs`.

**De ankersprong telt twee offsets op** — 18 september 2026
`html { scroll-padding-top }` in `globals.css` dekt de vaste balk; een pagina met een
tweede balk telt er `scroll-margin-top` op de sectie zelf bovenop (nu alleen
`.p-dienst section[id]`, voor de subnavigatie). Ze stapelen, dus zet niet allebei de
volle hoogte. Zonder dit landde de sectiekop op y=48 terwijl de balken tot y=113 lopen.

**Het kader volgt het beeld, niet andersom** — 18 september 2026
Een coverbeeld stond in een kader van 980x420 met `object-fit: cover`. Dat werkt voor een
foto in ongeveer die verhouding en sloopt al het andere: een diagram van 417x290 werd
opgeschaald naar 978 breed (2,3x, dus wazig) en verloor 262px aan hoogte, precies de
bovenste rij. In de editor is daar niets van te zien, dus een redacteur kan het niet
voorkomen. `components/beeld-kader.tsx` draait het om. De afmetingen worden tijdens de
build gemeten (`lib/beeldmaten.ts`) en niet opgeslagen: dat werkt met terugwerkende kracht
voor alles wat er al staat en vraagt geen enkele handeling. Zet er geen vaste hoogte meer
op, ook niet in een media query — dat was de regel die op mobiel opnieuw ging bijsnijden.

**Leestijd wordt afgeleid, niet ingevuld** — 18 september 2026
Het veld bestaat nog en wint als het gevuld is, maar leeg laten geeft nu een leestijd uit
het aantal woorden (200 per minuut, minimaal één). Daarvóór hing het label
onvoorwaardelijk aan de waarde en stond er letterlijk " leestijd - 18 sep 2026" op een
live artikel. Dat geldt breder: een veld dat de redactie kan vergeten en dat af te leiden
valt, leiden we af.

**`lib/inzichten-data.ts` gebruikt geen `maakLezer`**
De enige uitzondering op het gedeelde leespad. Artikelen worden verrijkt met auteur
(uit teamleden) en dienst, en passen daarom niet in de standaardvorm. Staat als
uitzondering in `tests/unit/manifest.spec.ts`.

## Werkwijze

**De cijfers op de dienstenpagina's zijn van de eigenaar** — 15 september 2026
`-40%` minder repetitief werk, `+3×` snellere verwerking, `-60%` lagere ontwikkelkosten,
`6–10×` snellere oplevering: die staan in `outcomes` op /diensten/ai en /diensten/mendix, en
in `waarom`, `pijlers` en `intro` staan de bijbehorende ongenuanceerde claims ("productie in
weken, niet maanden", "werkende pilots binnen zes weken"). Een eerdere sessie had die in de
code afgezwakt naar "Minder", "Lager", "vaak" en "doorgaans", terwijl het CMS de cijfers
hield. Bij de nulmeting van 15 september is dat voorgelegd en koos de eigenaar voor de
cijfers. **Zwak ze niet opnieuw af.** De regel "verzin geen getallen" blijft gelden voor
nieuwe tekst; deze getallen zijn niet verzonnen maar bevestigd.

**Sanne Willems en Jesse de Boer bestonden niet** — 15 september 2026
Het veld `experts` op de drie richting-hubs noemde een "Lead Data & Fundament", een "Lead
Business Consulting" en een "Practice Lead Mendix" die in geen enkele teamtabel voorkwamen,
met een telefoonnummer dat één cijfer van dat van Koen verschilde. Ze stonden live. De code
kende daar alleen Koen Wijsman; het CMS was nooit meegegaan met die opschoning. De rijen zijn
op 15 september teruggezet naar de code-versie. Komt er zo'n naam terug, controleer hem dan
eerst tegen `cms_teamleden` voordat je hem als waarheid behandelt.

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

**Het CO2-doel voor 2030 staat niet meer op de site** — 21 september 2026
"In 2030 is ons businessmodel 100% CO2-neutraal" stond in de waarde 'Duurzaam ondernemen'
op /over-ons en als derde feit in de hero. De eigenaar: "dat heeft nu de focus niet meer".
De velden `kpi3Getal` en `kpi3Label` zijn daarom uit `PAGE_FIELDS.over-ons` verwijderd en
de rij is opgeschoond (`supabase/scripts/20260921-redactieronde.sql`). Zet de belofte niet
terug uit een oude export of schermafdruk: het is een ingetrokken doel, geen vergeten
tekst. De waarde zelf bleef staan, nu met alleen de eerste zin.

**Tegenstellingen van het type "X, niet Y" zijn hier een AI-tic** — 21 september 2026
De eigenaar wees drie zinnen aan die "erg AI-created" klonken, alle drie met dezelfde
vorm: "in weken aanpasbaar, niet in jaren", "mensen die de uitvoering kennen, niet alleen
de techniek", "mensen die naast je team staan, niet ernaast zitten". De vuistregel die
daaruit volgt: zet de bewering neer en laat het contrast weg. Ook "bouwen" werd
"ontwikkelen". Dit is smaak van de eigenaar, geen taalregel — schrijf nieuwe koppen in
deze vorm en draai bestaande niet terug.

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
