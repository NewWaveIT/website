# CLAUDE.md

Context voor AI-agents (Claude Code) die aan deze codebase werken. De canonieke
conventies staan in **[`CONTRIBUTING.md`](CONTRIBUTING.md)** — lees die eerst. Dit
bestand vult aan met een snelle map, de werkwijze en de valkuilen die je hier niet
uit de code afleidt.

## Snel oriënteren

**Begin bij [`docs/MANIFEST.md`](docs/MANIFEST.md) en
[`docs/BESLISSINGEN.md`](docs/BESLISSINGEN.md).** Het eerste is de kaart, het tweede
bevat wat we bewust zo hebben gedaan en waarom — dingen die je niet uit de code kunt
aflezen en die een sessie zonder geheugen anders terugdraait omdat het een verbetering
lijkt. Lees ze allebei voordat je iets weghaalt.

**De kaart.** Daar staat per contenttype de
tabel, de seed, de datalaag en de publieke route; per pagina-ingang welke velden er zijn
en welke bestanden ze lezen; en de lijst publieke routes. Dat bestand is gegenereerd uit
de code (`npm run manifest`) en een unittest faalt zodra het achterloopt — het kan dus
niet stilletjes wegdrijven zoals de handgeschreven routekaart in `revalidate.ts` deed.

| Wat                     | Waar                                                                                                            |
| ----------------------- | --------------------------------------------------------------------------------------------------------------- |
| Publieke pagina         | `app/(marketing)/<pagina>/page.tsx` + eigen `<pagina>.css` (regels gescoped onder `.p-<pagina>` of `.home`)     |
| Admin/CMS               | `app/admin/` — achter Supabase-auth; editor is schemagedreven                                                   |
| Contentschema (8 typen) | `lib/cms/schema.ts` (`FIELD_SCHEMAS`) — nieuw veld = hier toevoegen                                             |
| Publieke datalaag       | `lib/<type>-data.ts` → `getPublishedContent(type)` (`status='live'`) met fallback op de seed in `lib/<type>.ts` |
| Server actions          | co-located `actions.ts` (o.a. contact, vacatures, admin/*)                                                      |
| Designtokens            | `app/globals.css` `:root` — kleuren, spacing, type                                                              |
| E-mail                  | `lib/email.ts` (Resend, fail-safe, 4 huisstijltemplates)                                                        |
| Migraties               | `supabase/migrations/` (chronologisch geprefixt)                                                                |
| Unit tests              | `tests/unit/` (Vitest) — pure logica: sanitize, formuliervalidatie                                              |
| Schermafdrukken         | `npm run shots` → `docs/shots/<breedte>/<pagina>.png` (twaalf pagina's × drie breedtes, niet in git)            |
| CMS tegen code          | `/admin/baseline` — ontbrekende sleutels, weessleutels, en waar het CMS van de seed afwijkt                     |

## Werkwijze bij elke wijziging

- **Pre-commit hook (Husky + lint-staged) draait automatisch:** ESLint + Prettier op
  staged bestanden, daarna `npm run typecheck`. Dit dekt de CI-gate
  _"Typecheck · Lint · Format · Build"_ lokaal af — rood daar blokkeert de PR.
  Los daarvan blijft `npm run typecheck && npm run lint && npm run format:check`
  het handmatige/CI-referentiecommando.
- **CI draait daarnaast:** `npm run test:unit` (Vitest), de Playwright-e2e-smoketests,
  Dependabot (wekelijkse dependency-updates). **Geen CodeQL:** code scanning vereist
  GitHub Code Security, niet beschikbaar op een private repo onder een persoonlijk
  account — de workflow is daarom verwijderd i.p.v. permanent rood te laten staan.
- Commit met een heldere NL-boodschap. **Push alleen als de gebruiker erom vraagt.**
- **Hergebruik bestaande patronen, tokens en CSS exact.** Introduceer geen nieuwe kleur,
  stijl of component-variant als er al één bestaat — consistentie boven creativiteit.
- **Een contentmodelwijziging is pas af als de data mee is.** Verwijder je een veld, een
  sectie of een contenttype uit de code, schrijf dan in dezelfde wijziging de SQL die de
  bijbehorende rijen en sleutels in Supabase opruimt (of ze op concept zet), en laat de
  gebruiker die draaien. Niets ruimt dit vanzelf op: data die uit de code verdwijnt blijft
  gewoon in de database staan. Dat is de oorzaak van elke lege-content-bug tot nu toe —
  verzonnen klantverhalen die live bleven, `secties` in de oude vorm, dode `samen*`-velden,
  onbereikbare dienstrijen. Het leespad hieronder maakt zulke resten zichtbaar in de
  Vercel-logs in plaats van ze stil te compenseren; negeer die regels niet.
- **Meet het daarna, raad niet.** `/admin/baseline` zet elke rij naast het veldschema en de
  seed en telt wat er niet klopt. Draai hem na elke contentmodelwijziging en na elke
  SQL-actie: dat is het verschil tussen "de update is uitgevoerd" en "de update heeft
  gedaan wat hij moest doen". Een `update` die nul rijen raakt meldt zichzelf niet.

## Kernpatronen

- **Alleen designtokens voor kleur.** Nooit hex hardcoden; gebruik de CSS-vars uit
  `globals.css`. AA-veilig oranje voor tekst is `--orange-text` (#c2410c), **niet**
  `orange-600`. Witte tekst op flame (`#f15822`) haalt bewust geen AA — dat is een
  brandkeuze, niet per ongeluk.
- **Mobiele marges via tokens.** `--gutter` is de paginamarge, `--pad-kaart` en
  `--pad-kaart-ruim` de binnenmarge van een kaart met lopende tekst; alle drie worden
  onder 640px kleiner. Een nieuwe kaart met tekst krijgt `--pad-kaart`, niet `--space-7`,
  en elke `.wrap-wide` die zijn eigen zijmarge zet gebruikt `--gutter`. Onder `--text-xs`
  staan `--text-2xs` en `--text-3xs`; schrijf daar geen vaste px-waarde meer. Waarom in
  `docs/BESLISSINGEN.md`.
- **Page-CSS-scoping.** Elke marketingpagina importeert een eigen `.css` met regels
  onder een pagina-rootclass. Gedeelde component-CSS staat onder de eigen componentclass
  en wordt door de component zelf geïmporteerd (bv. `components/vacatures/sollicitatie-form.css`).
- **Formulieren.** Server action + `useActionState`; validatie verzamelt **álle** fouten
  tegelijk → `{ ok, message, errors }`. De client toont `aria-invalid` + `.field-err` en
  zet focus op het eerste foute veld. Honeypot-veld heet `website`; `noValidate` op het
  `<form>`. Alles fail-safe.
- **Rate-limiting.** Elke publieke server action (contact, sollicitatie, inzichten-lead)
  roept na de honeypot-check `magDoor(actie, max, vensterSeconden)` (`lib/rate-limit.ts`)
  aan — atomisch afgedwongen in Postgres via `check_rate_limit()` (zie
  `supabase/migrations/20260907120000_rate-limits.sql`), niet in-memory (werkt niet
  betrouwbaar op serverless). Fail-safe: bij een DB-storing staat de aanvraag toe.
- **CMS.** Editor genereert velden uit `FIELD_SCHEMAS` (`panel:"side"` = instellingenrail).
  Publieke pagina's lezen live-rijen met fallback op de seed; `saveContent` revalideert de
  publieke paden.
- **De admin is de waarheid, de seed is een koude start.** Elk contenttype leest via
  `maakLezer` (`lib/cms/lees.ts`) — één functie, geen zeven varianten. Tabel leeg ⇒ de
  seed in `lib/<type>.ts` rendert (verse database, of Supabase onbereikbaar). Tabel gevuld
  ⇒ **alleen** wat in het CMS staat; een slug die je daar verwijdert verdwijnt van de site
  en komt niet terug uit de seed. Content hoort dus in de admin te staan, niet in de code.
- **Binnen een rij: leeg is echt leeg.** `leesRijen`/`leesRij` (`lib/cms/merge.ts`)
  valideert elke rij tegen zijn zod-schema (`lib/cms/schemas.ts`) na platslaan door
  `rijNaarRuw` (`lib/cms/rij.ts`). Drie gevallen, en het verschil telt:
  een **leeg opgeslagen** veld blijft leeg; een veld dat de rij **niet noemt** wordt door
  `vulAan` stil uit de seed aangevuld (**geen logregel** — de validatie slaagt daarna
  gewoon); een veld met een **ongeldige waarde** komt uit de seed mét een `console.error`
  in de Vercel-logs. Een rij die zo nóg niet compleet is valt weg — uit een overzicht,
  of als 404 op een detailpagina. Het praktische gevolg van dat stille aanvullen: een
  sleutel die in de rij ontbreekt geeft op de site de seedtekst en in de admin een leeg
  veld, zonder enig spoor. `supabase/scripts/20260914-cms-volledigheid.sql` maakt dat
  zichtbaar. Schrijf dus geen eigen `mapRow` met per-veld-
  `??`-ketens; dat compenseerde precies de rommel die dit pad zichtbaar hoort te maken.
  `lib/inzichten-data.ts` is de enige, gedocumenteerde uitzondering.
- **Caching: Cache Components (`cacheComponents: true`).** Geen `export const revalidate`
  meer — dat is niet toegestaan. Een pagina zegt zelf wat gecachet mag worden met
  `"use cache"` + `cacheLife("content")` bovenin de component; `content` is één profiel in
  `next.config.ts` (5 min vers, 1 dag houdbaar) zodat er nergens losse getallen staan.
  Hetzelfde geldt voor `generateMetadata`. De admin staat er buiten met
  `export const instant = false` op `app/admin/layout.tsx`: die leest cookies en heeft
  niets te prerenderen.
- **Wat per request verschilt, hoort niet in een cache-scope.** `searchParams`, `cookies()`
  en `new Date()` mogen niet binnen `use cache`. Kan de waarde in de browser worden
  bepaald, doe dat dan met `useBrowserwaarde` (`lib/hooks/use-browserwaarde.ts`) — dan
  blijft de pagina volledig statisch. Zo leest het contactformulier zelf `?dienst=`, en
  vult de footer zelf het jaartal in. Let op: die hook gebruikt `useSyncExternalStore`, dus
  `lees` moet een primitieve, stabiele waarde teruggeven.
- **Een dynamische route zonder `generateStaticParams` kan geen echte 404 geven.** Cache
  Components streamt eerst een shell, en daarna staat de HTTP-status vast. Alle
  detailroutes hebben daarom een slug-lijst; `/vacatures/[slug]` is de gedocumenteerde
  uitzondering (geen live vacatures), en geeft een 200 met `noindex`.
- **Revalidatie is grofmazig en dat is de bedoeling.** `revalidateContent()` neemt geen
  argumenten en ververst de hele site. Hier stond een kaart van contenttype naar routes;
  die dreef weg. Elke pagina wordt sowieso elke vijf minuten opnieuw opgebouwd, dus dit
  vervroegt alleen wat toch gebeurt.
- **Haal in de admin alleen op wat je toont.** De lijstpagina's gebruiken
  `listContentSamenvatting` (`lib/cms/content.ts`): de kolommen die de tabel laat zien plus
  de `data`-velden waarop gefilterd wordt, afgeleid uit `LIJST_FACETTEN`
  (`lib/cms/admin-lijst.ts`). Niet `listContent`, want die haalt de volledige `data`-jsonb
  van elke rij op — tientallen KB's bodytekst voor een tabel met titels. Een nieuw filter
  voeg je toe aan `LIJST_FACETTEN`; de query volgt dan vanzelf. Zijbalktellers komen uit
  één RPC (`admin_aantallen`), niet uit elf count-queries.
- **Publieke formulieren schrijven met de service-rol, niet met anon.** `anon` heeft geen
  insert-rechten meer op `contact_aanvragen`, `sollicitaties` en de cv-bucket: die sleutel
  staat in elke browser, dus daarmee kon je rechtstreeks naar de Supabase-API posten en de
  honeypot, de validatie én `magDoor()` overslaan. De drie server actions gebruiken
  `inzendingClient()` (`lib/supabase/inzendingen.ts`). Die omzeilt RLS — gebruik hem alleen
  voor de insert van een al gevalideerde inzending.
- **Kruimelpad en structured data: één component.** `<Kruimelpad>` levert de zichtbare
  kruimels én de BreadcrumbList; `<JsonLd>` zet elk stuk structured data neer, mét de
  escape van `<`. Schrijf geen eigen `<script type="application/ld+json">` meer — dertien
  pagina's hadden kruimels en maar vier de bijbehorende structured data, precies omdat het
  twee losse handelingen waren.
- **Pagina-ingangen: één per pagina, plus vier sjablonen en één algemene.** Naast de
  echte pagina's (`home`, `contact`, …) staan in `PAGE_FIELDS` de slugs `sector-detail`,
  `dienst-detail`, `klantverhaal-detail` en `vacature-detail` met de koppen en labels die
  op _alle_ items van dat type tegelijk gelden, en `algemeen` met wat op elke pagina
  staat (voettekst, cookiemelding). Ze horen niet bij één item en ook niet bij het
  overzicht; het pad in `PAGE_PATH` wijst naar de overzichtspagina omdat revalidatie toch
  grofmazig is.
- **Een client component leest zelf niets uit het CMS.** Geef de teksten veld voor veld
  door vanaf de pagina, niet als één `t`-object: `tests/unit/cms-pages.spec.ts` zoekt
  `t.<sleutel>` in bestanden die `getPagina("<slug>")` aanroepen, en een doorgegeven
  object is daar onzichtbaar. Doorgeven-per-veld maakt een vergeten veld een rode test
  in plaats van een leeg plekje op de site.
- **Geen databaseleesactie in `app/(marketing)/layout.tsx`.** De layout rendert
  `children`, dus een `"use cache"` eromheen trekt elke pagina in dezelfde scope; zonder
  die scope weigert Next de route statisch te bouwen ("uncached or runtime data during
  prerendering"). Wat de schil uit het CMS nodig heeft staat in
  `components/layout/schil-cms.tsx`, elk onderdeel met een eigen cache-scope.
- **Contactgegevens staan op één plek.** `lib/contactgegevens.ts` houdt de terugval,
  `lib/contact-data.ts` leest het CMS erover heen, en de WhatsApp-link wordt uit het
  nummer afgeleid. De foutpagina en de mailtemplates gebruiken bewust de terugval: die
  moeten het juist doen als de database onbereikbaar is.
- **De nulmeting is de bron van waarheid over de data, niet je geheugen.**
  `/admin/baseline` (`lib/cms/baseline.ts`, puur en getest) vergelijkt elke rij met
  `FIELD_SCHEMAS`/`PAGE_FIELDS` en met de seed. Vier categorieën moeten naar nul: een
  sleutel die de rij mist (site toont de seed, admin een leeg veld), een sleutel die het
  schema niet kent (dode data), een leeg veld waar de seed tekst heeft, en een tekst die
  van de seed afwijkt. Bij dat laatste wint het CMS: de knop vult alleen aan, hij
  overschrijft nooit — de seed in de code trekt bij, met de JSON-export van die pagina.
  Schrijf hier geen nieuw SQL-controlescript voor; de oude in `supabase/scripts/` zijn
  precies daarom verouderd.
- **Auth/RLS.** `proxy.ts` (de Next 16-naam voor middleware) redirect ongeauthenticeerde `/admin` → login; `requireAdmin()`
  (`lib/dal.ts`) in élke admin-action en -pagina. Anon mag alleen `insert` op de
  formuliertabellen; de service-role-client (`lib/supabase/admin.ts`) is uitsluitend voor
  gebruikersbeheer.
- **E-mail.** `lib/email.ts` gooit nooit en slaat over zonder `RESEND_API_KEY`; aanroepen
  gebeuren ná een geslaagde DB-insert, zodat een mailfout een inzending nooit breekt.
- **Dynamische contactpersonen.** Teamleden hebben een `contactrol` (Sales/Recruitment);
  `getContactpersoon(rol)` levert de juiste persoon voor contact- en vacaturepagina's.
- **Afbeeldingen.** Uitsluitend WebP in `public/assets/` (geen PNG-foto's meer).
- **De uitgelichte kaart is `.beeldkaart`** (in `globals.css`): beeld links, tekst
  rechts. Hij staat op vier plekken — de klantverhalen-carrousel op de homepage, het
  uitgelichte klantverhaal op `/klantverhalen` en in een dienstsectie, en het uitgelichte
  artikel op `/inzichten`. Die vorm stond eerder vier keer los, met drie verschillende
  kolomverhoudingen. Voeg geen vijfde kopie toe: zet `beeldkaart` op je wrapper en stel
  hooguit `--beeldkaart-h` in. Wat er in de tekstkolom staat blijft van de pagina zelf.
  `tests/e2e/beeldkaart.spec.ts` bewaakt het.
- **Redactioneel beeld gaat door `<BeeldKader>`** (`components/beeld-kader.tsx`). Twee
  regels die samen gelden: het kader voegt zich naar de verhouding van het beeld (dus
  geen vaste hoogte met `object-fit: cover`, dat sneed diagrammen af) en een beeld wordt
  nooit breder getoond dan het zelf is (een schermafdruk van 417px werd uitgerekt naar
  978 en was wazig). De maten komen uit `lib/beeldmaten.ts`, dat tijdens de build meet —
  lokaal van schijf, op afstand via één fetch. Lukt dat niet, dan valt het kader terug op
  `object-fit: scale-down`, dat óók niet afsnijdt en niet opschaalt.
  `tests/e2e/artikel.spec.ts` legt alle drie vast.

## Zo ontstaan hier fouten

Deze vijf hebben in september elk minstens één keer echt schade aangericht. Ze staan er
met het incident erbij, want een regel zonder aanleiding leest als een dooddoener en
wordt overgeslagen.

### 1 · Bewerk met tekst die je net gelezen hebt, niet met een script dat ankers raadt

Een opruimscript zocht met `rindex("/**")` het commentaar boven een interface en at
daarmee drie buurinterfaces op. Een import werd ingevoegd "na de laatste importregel" en
landde middenin een import die over vijftien regels liep. `tk={{…}}` werd twee keer als
`tk={…}` geschreven en brak de JSX. Een gegenereerd SQL-bestand hield een wees-regel
`union all select 'proposities',` over omdat de filter per regel werkte en de waarde over
twee regels stond.

- Lees het bestand, kopieer de exacte tekst, vervang die. Geen ankers op vorm.
- Draai `npm run typecheck` **direct** na elke structurele bewerking, vóór de volgende.
- Een script dat halverwege een `assert` faalt schrijft níéts weg. Controleer het bestand
  in plaats van aan te nemen dat de eerste helft is gelukt.

### 2 · Een SQL-update die nul rijen raakt is geen succes

Drie van de zes updates in de homepage-feedback raakten niets: de sleutel `pitch` stond
helemaal niet in de sectorrijen, dus `where data->>'pitch' = '<oud>'` matchte nooit. Dat
is anderhalf uur lang als "gedaan" gerapporteerd.

- Elk script eindigt met een controlequery die de nieuwe toestand teruggeeft.
- Meld niets als afgerond voordat je die uitvoer hebt gezien.
- Wil je zeker weten of een sleutel bestaat: `data ? 'sleutel'`, niet `data->>'sleutel'`
  vergelijken. Een ontbrekende sleutel geeft `null` en dat leest als "leeg", niet als
  "afwezig".

### 3 · Beweer niets over het leespad zonder `lib/cms/merge.ts` te hebben gelezen

Er is drie keer beweerd dat een ontbrekende sleutel een `console.error` per render
oplevert. Dat klopt niet: `vulAan` vult stil aan en de validatie slaagt daarna. Alleen
een aanwezige maar ongeldige waarde logt. Het verschil bepaalt of iets urgent is of
alleen slordig.

### 4 · Een bewaker die je niet hebt zien falen, bewaakt niets

De ARIA-test zocht naar de tekst `aria-pressed` in de bron, en de toelichting boven het
component bevatte dat woord — de regel controleerde dus niets bij precies het bestand
dat hij moest bewaken. Een e2e-test wachtte op `networkidle`, wat op deze site nooit
intreedt. Een locator op `"Menu"` matchte ook `"Sluit menu"`.

- Breek elke nieuwe bewaker expres, kijk of hij rood wordt, zet hem terug.
- Blank commentaar uit voordat je in broncode naar losse woorden zoekt.
- Wacht in e2e op een zichtbaar gevolg, niet op een netwerktoestand.

### 5 · Inventariseer met code, niet met het oog

De vraag "staat er nog hardgecodeerde tekst" is beantwoord met een scan per bestand, en
daardoor bleef het aanmeldformulier op de inzichten-pagina's staan: dat is geen eigen
bestand maar een blok binnen de CTA eronder. Tel wat je zoekt, en laat de telling
zakken naar nul in plaats van een lijst door te lezen.

## Wat CI voor je bewaakt

Deze tests bestaan omdat de fout die ze vangen echt is gemaakt. Zet er geen uit zonder
te weten welke.

| Test                                       | Vangt                                                                                                                        |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| `tests/unit/manifest.spec.ts`              | Het manifest loopt achter; een pagina-ingang die niets rendert; een contenttype zonder datalaag of seed                      |
| `tests/unit/cms-pages.spec.ts`             | Een paginaveld dat in de admin staat maar nergens gerenderd wordt                                                            |
| `tests/unit/cms-velden.spec.ts`            | Hetzelfde voor de contenttypen                                                                                               |
| `tests/unit/admin-aria.spec.ts`            | Icoonknop zonder naam, dialoog zonder `aria-modal`/naam/focusbeheer, schakelgroep zonder `aria-pressed`                      |
| `tests/unit/admin-editor.spec.ts`          | Een veld dat zijn wijziging niet meldt (verborgen invoer zonder `VerborgenWaarde`)                                           |
| `tests/unit/admin-opmaak.spec.ts`          | Nieuwe inline styles in de admin                                                                                             |
| `tests/unit/schrijfstijl.spec.ts`          | Em-streepjes in zichtbare tekst; de u-vorm buiten de admin                                                                   |
| `tests/e2e/formulieren.spec.ts`            | Foutmarkering, focussprong en bedankstaat van beide formulieren                                                              |
| `tests/e2e/admin-toegankelijkheid.spec.ts` | Contrast en horizontaal schuiven in de admin, op drie breedtes                                                               |
| `tests/e2e/schil.spec.ts`                  | Mobiel menu en cookiemelding                                                                                                 |
| `tests/e2e/mobiel.spec.ts`                 | Horizontaal schuiven op 320px, een ankersprong achter de vaste balk, een menu dat niet scrollt, contrast op 375px            |
| `tests/e2e/artikel.spec.ts`                | Een coverbeeld dat bijgesneden of opgeschaald wordt; auteursblok en verwante artikelen; een label zonder waarde in de byline |
| `tests/e2e/beeldkaart.spec.ts`             | Een vijfde variant van de uitgelichte kaart (beeld links, tekst rechts), of een foto die binnenmarge krijgt                  |

## Omgeving & valkuilen

- **OS: Windows + PowerShell.** Draai de dev-server via de browser-preview-tools op poort
  3000, niet via een losse shell.
- **Kill poort 3100 vóór een lokale e2e-run.** `playwright.config.ts` heeft
  `reuseExistingServer: !CI`, dus lokaal test hij tegen een server die er al draait — ook
  als die een oudere build serveert. Dat levert groene tests op code die je net hebt
  gewijzigd, waarna CI alsnog rood gaat. Sluit de poort af (`Get-NetTCPConnection
-LocalPort 3100 | Stop-Process`) en laat Playwright zelf bouwen.
- **Lint = ESLint flat config** (`eslint.config.mjs`) met `ignores` voor gegenereerde
  bestanden (`.next`, `next-env.d.ts`, …). Ga **niet** terug naar `next lint` (deprecated,
  breekt CI).
- **Supabase-MCP kan naar een ánder project/organisatie wijzen.** Controleer met
  `list_projects`; de TNW-database is niet altijd via MCP bereikbaar. Verifieer DB-zaken via
  de Supabase SQL Editor of een echte formuliertest op de live/preview-site.
- **Nieuwe kolom/bucket = migratie** in `supabase/migrations/` **én** draaien
  (`supabase db push` of SQL Editor). Publieke pagina's lezen alleen `status='live'`.
- **De admin zit achter Supabase-auth** — lokaal zonder geldige key niet in te loggen; test
  admin-flows op staging/preview.
- **Datums** krijgen altijd `{ timeZone: "Europe/Amsterdam" }` (anders hydration-mismatch).

## Deploy-randvoorwaarden (env in Vercel)

- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SITE_URL` = `https://www.thenewwaveit.com` (mails gebruiken dit voor logo + links)
- `RESEND_API_KEY` (+ geverifieerd domein), `MAIL_FROM` (notificaties@), `MAIL_FROM_PUBLIC`
  (orders@ — hello@ bestaat niet), `NOTIFY_EMAIL` (people@ — sollicitaties),
  `NOTIFY_EMAIL_AANVRAGEN` (orders@ — contactaanvragen)
- **Signup uit** in Supabase Auth: elke ingelogde gebruiker is volledig admin — gebruikers
  alleen aanmaken via `/admin/gebruikers`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
