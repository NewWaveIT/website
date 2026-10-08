# CLAUDE.md

Context voor AI-agents (Claude Code) die aan deze codebase werken. De canonieke
conventies staan in **[`CONTRIBUTING.md`](CONTRIBUTING.md)**. Dit bestand vult aan met de
kaart, de werkwijze en de valkuilen die je hier niet uit de code afleidt.

**Begin bij [`docs/MANIFEST.md`](docs/MANIFEST.md) en
[`docs/BESLISSINGEN.md`](docs/BESLISSINGEN.md).** Het eerste is de kaart (gegenereerd met
`npm run manifest`, een unittest faalt zodra hij achterloopt). Het tweede is het waarom
achter bijna elke regel hieronder: de aanleiding, het incident, en wat we hebben
afgewogen. Lees dat voordat je iets weghaalt, want een regel zonder aanleiding leest als
willekeur en wordt teruggedraaid omdat het een verbetering lijkt.

## Kernprincipes

Waar een regel hieronder geen uitsluitsel geeft, kies je hiermee.

- **Hergebruik vóór je bouwt.** Loop [UI en herbruikbaarheid](#ui-en-herbruikbaarheid)
  langs voordat je een nieuwe vorm verzint. Consistentie boven creativiteit: er bestaat
  geen tweede oranje, geen tweede kaart, geen tweede "meer"-link.
- **Zo min mogelijk code.** Drie gelijkende regels zijn beter dan een abstractie voor een
  patroon dat één keer voorkomt. Extraheer bij de derde herhaling, niet preventief bij de
  tweede.
- **Server Components zijn de standaard.** `"use client"` alleen bij echte
  interactiviteit. Kan hover of focus via CSS, dan via CSS.
- **Meet het, raad niet.** Een schermafdruk op 1440 en 390 bewijst niets over 800. Een
  SQL-update die nul rijen raakt meldt zichzelf niet. `/admin/baseline` telt wat er niet
  klopt; draai hem na elke contentmodelwijziging.
- **Geen workaround zonder het te melden.** Iets omzeilen in plaats van oplossen (een
  geforceerde cast, een uitgezette check, `--no-verify`) mag soms, maar dan expliciet
  benoemen mét reden. Nooit stilzwijgend.
- **Alleen aanpassen wat gevraagd is.** Zie je iets anders dat aandacht verdient, benoem
  het apart in plaats van het mee te nemen.
- **Verzin nooit inhoud.** Geen claims, cijfers, tarieven, senioriteit, klantnamen of
  teamleden. De eigenaar levert copy aan. Zie `docs/BESLISSINGEN.md`, "Sanne Willems en
  Jesse de Boer bestonden niet".
- **Verificatie hoort bij "klaar".** `npm run typecheck && npm run lint &&
npm run format:check && npm run test:unit` vóór je iets afmeldt, niet pas in CI.

## Snel oriënteren

| Wat                     | Waar                                                                                                            |
| ----------------------- | --------------------------------------------------------------------------------------------------------------- |
| Publieke pagina         | `app/(marketing)/<pagina>/page.tsx` + eigen `<pagina>.css` (gescoped onder `.p-<pagina>` of `.home`)            |
| Admin/CMS               | `app/admin/` — achter Supabase-auth; editor is schemagedreven                                                   |
| Contentschema (8 typen) | `lib/cms/schema.ts` (`FIELD_SCHEMAS`) — nieuw veld = hier toevoegen                                             |
| Publieke datalaag       | `lib/<type>-data.ts` → `getPublishedContent(type)` (`status='live'`) met fallback op de seed in `lib/<type>.ts` |
| Leespad CMS → pagina    | `lib/cms/lees.ts` (`maakLezer`), `lib/cms/merge.ts` (`leesRijen`/`vulAan`), `lib/cms/schemas.ts` (zod)          |
| Server actions          | co-located `actions.ts` (contact, vacatures, admin/\*)                                                          |
| Designtokens            | `app/globals.css` `:root` — kleuren, spacing, type                                                              |
| E-mail                  | `lib/email.ts` (Resend, fail-safe, 4 huisstijltemplates)                                                        |
| Auth                    | `proxy.ts` (Next 16-naam voor middleware) + `requireAdmin()` in `lib/dal.ts`                                    |
| Migraties               | `supabase/migrations/` (chronologisch geprefixt)                                                                |
| Unit tests              | `tests/unit/` (Vitest) — pure logica                                                                            |
| E2e                     | `tests/e2e/` (Playwright, poort 3100)                                                                           |
| Schermafdrukken         | `npm run shots` → `docs/shots/<breedte>/<pagina>.png` (twaalf pagina's × drie breedtes, niet in git)            |
| CMS tegen code          | `/admin/baseline` — ontbrekende sleutels, weessleutels, afwijking van de seed                                   |
| Admin zonder database   | `/ontwerp` — de echte adminschermen met verzonnen rijen; alleen in dev en met `ADMIN_VOORBEELD=1`               |
| Wat er live staat       | `CHANGELOG.md` (nieuwste bovenaan) + `package.json` `version`                                                   |

## Werkwijze bij elke wijziging

1. **Verifieer lokaal.** De pre-commit hook (Husky + lint-staged) draait ESLint + Prettier
   op staged bestanden en daarna `npm run typecheck`. Dat dekt de CI-gate _"Typecheck ·
   Lint · Format · Build"_ af. Unittests draaien daar **niet** in; draai `npm run
test:unit` zelf.
2. **Commit in het Nederlands**, met de aanleiding erbij, niet alleen wat er veranderde.
   **Push alleen als de gebruiker erom vraagt.** Direct naar `main`, geen PR
   (`docs/BESLISSINGEN.md`), tenzij het tokenbudget bijna op is.
3. **Werk `CHANGELOG.md` bij** in dezelfde commit: één regel bovenaan onder de datum van
   vandaag. Zo is "wat staat er nu live" in één oogopslag te zien in plaats van via
   `git log`.
4. **Bump `package.json`'s `version`** volgens de tabel hieronder, in diezelfde commit.
   Eén wijziging met meerdere soorten: het hoogste niveau wint. Twijfel je bij een
   grensgeval, leg het voor met onderbouwing in plaats van te gokken.

| Niveau            | Wanneer                                                                                                                  |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **MAJOR** (X.0.0) | Breekt iets voor bezoeker of redacteur, of is onomkeerbaar: contenttype weg, URL-structuur om, destructieve datamigratie |
| **MINOR** (x.Y.0) | Nieuwe pagina, sectie, CMS-veld of adminscherm; backward compatible                                                      |
| **PATCH** (x.y.Z) | Bugfix, tekstcorrectie, performance, toegankelijkheid — geen nieuw gedrag                                                |
| **Geen bump**     | Alleen tests, documentatie, een refactor zonder zichtbaar gevolg, een dependency-bump                                    |

`tests/unit/changelog.spec.ts` faalt als `version` en de bovenste `CHANGELOG.md`-regel uit
de pas lopen.

### Een contentmodelwijziging is pas af als de data mee is

Verwijder je een veld, een sectie of een contenttype uit de code, schrijf dan in dezelfde
wijziging de SQL die de bijbehorende rijen en sleutels in Supabase opruimt (of ze op
concept zet), en laat de gebruiker die draaien. Niets ruimt dit vanzelf op: data die uit
de code verdwijnt blijft gewoon in de database staan. Dat is de oorzaak van élke
lege-content-bug tot nu toe — verzonnen klantverhalen die live bleven, `secties` in de
oude vorm, dode `samen*`-velden, onbereikbare dienstrijen.

### SQL gefaseerd, en altijd met een controlequery

Een script dat data raakt én code (een kolom die de leescode nog gebruikt) gaat in drie
stappen: **data migreren → code omzetten → destructief opruimen**, elke stap apart
geverifieerd. Nooit in één keer.

- Elk script eindigt met een query die de nieuwe toestand teruggeeft. Meld niets als
  afgerond voordat je die uitvoer hebt gezien.
- Bestaat een sleutel? `data ? 'sleutel'`, niet `data->>'sleutel'` vergelijken. Een
  ontbrekende sleutel geeft `null` en dat leest als "leeg", niet als "afwezig".
- Draai daarna `/admin/baseline`. Dat is het verschil tussen "de update is uitgevoerd" en
  "de update heeft gedaan wat hij moest doen".

## Architectuur

Elk punt hieronder heeft een aanleiding in `docs/BESLISSINGEN.md`; daar staat waarom het
niet anders kan.

- **De admin is de waarheid, de seed is een koude start.** Elk contenttype leest via
  `maakLezer` (`lib/cms/lees.ts`). Tabel leeg ⇒ de seed in `lib/<type>.ts` rendert (verse
  database, of Supabase onbereikbaar). Tabel gevuld ⇒ **alleen** wat in het CMS staat; een
  slug die je daar verwijdert verdwijnt van de site en komt niet terug uit de seed.
- **Binnen een rij: leeg is echt leeg.** `leesRijen`/`leesRij` (`lib/cms/merge.ts`)
  valideren elke rij tegen zijn zod-schema na platslaan door `rijNaarRuw`. Drie gevallen,
  en het verschil telt: een **leeg opgeslagen** veld blijft leeg; een veld dat de rij
  **niet noemt** wordt door `vulAan` stil uit de seed aangevuld (**geen logregel**, de
  validatie slaagt daarna gewoon); een veld met een **ongeldige waarde** komt uit de seed
  mét een `console.error` in de Vercel-logs. Een rij die zo nóg niet compleet is valt weg:
  uit een overzicht, of als 404 op een detailpagina. Gevolg van dat stille aanvullen: een
  ontbrekende sleutel geeft op de site de seedtekst en in de admin een leeg veld, zonder
  spoor. Schrijf dus geen eigen `mapRow` met `??`-ketens; dat compenseert precies de
  rommel die dit pad zichtbaar hoort te maken. `lib/inzichten-data.ts` is de enige,
  gedocumenteerde uitzondering.
- **Caching: Cache Components (`cacheComponents: true`).** Geen `export const revalidate`.
  Een pagina zegt zelf wat gecachet mag worden met `"use cache"` + `cacheLife("content")`
  bovenin de component; `content` is één profiel in `next.config.ts` (5 min vers, 1 dag
  houdbaar) zodat er nergens losse getallen staan. Hetzelfde voor `generateMetadata`. De
  admin staat erbuiten met `export const instant = false` op `app/admin/layout.tsx`.
- **Wat per request verschilt, hoort niet in een cache-scope.** `searchParams`, `cookies()`
  en `new Date()` niet binnen `use cache`. Kan de waarde in de browser bepaald worden, doe
  dat met `useBrowserwaarde` (`lib/hooks/use-browserwaarde.ts`); dan blijft de pagina
  statisch. Die hook gebruikt `useSyncExternalStore`, dus `lees` moet een primitieve,
  stabiele waarde teruggeven.
- **Een dynamische route zonder `generateStaticParams` kan geen echte 404 geven.** Alle
  detailroutes hebben een slug-lijst; `/vacatures/[slug]` is de uitzondering (geen live
  vacatures) en geeft een 200 met `noindex`.
- **Revalidatie is grofmazig en dat is de bedoeling.** `revalidateContent()` neemt geen
  argumenten en ververst de hele site.
- **Een client component leest zelf niets uit het CMS.** Geef teksten veld voor veld door,
  niet als één `t`-object: `tests/unit/cms-pages.spec.ts` ziet een doorgegeven object niet.
- **Geen databaseleesactie in `app/(marketing)/layout.tsx`.** Wat de schil uit het CMS
  nodig heeft staat in `components/layout/schil-cms.tsx`, elk onderdeel met een eigen
  cache-scope.
- **Pagina-ingangen: één per pagina, plus vier sjablonen en één algemene.** Naast de echte
  pagina's staan in `PAGE_FIELDS` de slugs `sector-detail`, `dienst-detail`,
  `klantverhaal-detail` en `vacature-detail` (koppen en labels die op álle items van dat
  type gelden), en `algemeen` (voettekst, cookiemelding).
- **Contactgegevens staan op één plek.** `lib/contactgegevens.ts` houdt de terugval,
  `lib/contact-data.ts` leest het CMS erover heen, de WhatsApp-link volgt uit het nummer.
  De foutpagina en de mailtemplates gebruiken bewust de terugval: die moeten het juist doen
  als de database onbereikbaar is.
- **Dynamische contactpersonen.** Teamleden hebben een `contactrol` (Sales/Recruitment);
  `getContactpersoon(rol)` levert de juiste persoon voor contact- en vacaturepagina's.

### Beveiliging

- **Elke admin-ingang autoriseert zelf, niet alleen `proxy.ts`.** De proxy stuurt door,
  de DAL autoriseert. Twee vormen, en het verschil is bewust: een **pagina** gebruikt
  `requireAdmin()` (`lib/dal.ts`), dat naar de login redirect; een **server action**
  gebruikt `getCurrentUser()` met een `if (!user) return { ok: false }`, want een redirect
  uit een action die geen navigatie is levert geen bruikbare foutmelding op. Een action
  zónder een van beide is een publiek POST-eindpunt. Enige uitzondering: `logout`, dat
  niets te beschermen heeft.
- **Publieke formulieren schrijven met de service-rol, niet met anon.** De anon-sleutel
  staat in elke browser; daarmee kon je rechtstreeks posten en de honeypot, de validatie én
  `magDoor()` overslaan. De drie server actions gebruiken `inzendingClient()`
  (`lib/supabase/inzendingen.ts`). Die omzeilt RLS — alleen voor de insert van een al
  gevalideerde inzending.
- **Rate-limiting op elke publieke server action.** Na de honeypot-check
  `magDoor(actie, max, vensterSeconden)` (`lib/rate-limit.ts`), atomisch afgedwongen in
  Postgres via `check_rate_limit()`. Niet in-memory: dat werkt niet op serverless.
  Fail-safe: bij een DB-storing gaat de aanvraag door.
- **Secrets staan in Vercel en `.env.local`**, nooit in de repo of in de chat. Alleen
  `NEXT_PUBLIC_*` mag de browser in.
- **De CSP staat in `next.config.ts`.** `style-src-elem 'self'` blijft dicht; zie
  `docs/BESLISSINGEN.md` voor de afweging die dat 660ms kost.

### Omgevingsvariabelen

Geen van deze hoort hardcoded of met een fallback in code, behalve waar hieronder staat dat
er een terugval is. `VERCEL_ENV` en `VERCEL_GIT_COMMIT_SHA` zet Vercel zelf.

| Variabele                                                   | Waarvoor                                                               | Verplicht?                                      |
| ----------------------------------------------------------- | ---------------------------------------------------------------------- | ----------------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Publieke leesclient                                                    | Ja — anders rendert overal de seed              |
| `SUPABASE_SERVICE_ROLE_KEY`                                 | Gebruikersbeheer + de insert van publieke formulieren                  | Ja — zonder deze falen beide                    |
| `NEXT_PUBLIC_SITE_URL`                                      | Canonical, sitemap, JSON-LD, maillogo en -links, de e-mailhandtekening | Ja (terugval: `https://www.thenewwaveit.com`)   |
| `RESEND_API_KEY`                                            | Alle uitgaande mail                                                    | Ja — zonder deze slaat `lib/email.ts` stil over |
| `MAIL_FROM`                                                 | Afzender notificaties (notificaties@)                                  | Ja                                              |
| `MAIL_FROM_PUBLIC`                                          | Afzender naar bezoekers (orders@ — hello@ bestaat niet)                | Ja                                              |
| `NOTIFY_EMAIL`                                              | Ontvanger sollicitaties (people@)                                      | Ja                                              |
| `NOTIFY_EMAIL_AANVRAGEN`                                    | Ontvanger contactaanvragen (orders@)                                   | Ja                                              |
| `NEXT_PUBLIC_GA_ID`                                         | Google Analytics, achter de cookiemelding                              | Nee — zonder deze laadt GA niet                 |
| `ADMIN_VOORBEELD`                                           | Zet `/ontwerp` aan buiten development (`playwright.config.ts` zet hem) | Nee — op Vercel bewust niet gezet               |

**Signup staat uit in Supabase Auth**: elke ingelogde gebruiker is volledig admin.
Gebruikers alleen aanmaken via `/admin/gebruikers`.

## Performance

Streefwaarden op de publieke site: **LCP < 2,5s · INP < 200ms · CLS < 0,1**. De admin telt
niet mee voor SEO maar een trage mutatie is evengoed een bug.

- **Haal in een lijst alleen op wat je toont.** `listContentSamenvatting`, niet
  `listContent` (die haalt tientallen KB's bodytekst op voor een tabel met titels). Een
  nieuw filter voeg je toe aan `LIJST_FACETTEN`; de query volgt. Zijbalktellers komen uit
  één RPC (`admin_aantallen`).
- **Het LCP-element mag niet lui laden en niet infaden.** `loading="lazy"` diskwalificeert
  het, en `opacity: 0` stelt het uit. De eerste hero-afbeelding krijgt daarom `preload` en
  een eigen animatie zonder fade (`.hsec-foto-eerst`).
- **`<Image fill>` krijgt altijd `sizes`**, anders laadt de browser de grootste variant.
  Bij een vaste `width` + `height` is `sizes` niet nodig en staat het er hier ook niet.
  Uitsluitend WebP in `public/assets/`.
- **Redactioneel beeld gaat door `<BeeldKader>`.** Het kader voegt zich naar de verhouding
  van het beeld en toont het nooit breder dan het zelf is; maten uit `lib/beeldmaten.ts`,
  gemeten tijdens de build.

## UI en herbruikbaarheid

Check deze tabel vóór je iets nieuws bouwt. Elke rij bestaat omdat dezelfde vorm hier al
een keer twee tot vijf keer los was nagebouwd; de tellingen staan in `docs/BESLISSINGEN.md`.

| Nodig                                         | Gebruik                                                                            | Niet                                                                                |
| --------------------------------------------- | ---------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Kleur, spacing, typemaat                      | De CSS-vars uit `globals.css`. AA-veilig oranje voor tekst is `--orange-text`      | Hex hardcoden, of `orange-600` voor tekst                                           |
| Paginamarge / binnenmarge van een tekstkaart  | `--gutter`, `--pad-kaart`, `--pad-kaart-ruim` (alle drie kleiner onder 640px)      | `--space-7` op een kaart met lopende tekst                                          |
| Witte kaart                                   | `.kaart` (knop: `--kaart-pad`)                                                     | Eigen `background` + `border` + `radius` per pagina-CSS                             |
| Klein kapitaal boven een kop                  | `.kicker` (`--kicker-maat`, `--kicker-kleur`)                                      | Eigen `letter-spacing` + `text-transform`                                           |
| "Meer"-link met pijltje                       | `.meer-link`                                                                       | Eigen link + inline `<svg>`                                                         |
| Rond stapnummer                               | `.nummer-badge` (`--badge-maat`, `--badge-kleur`, `--badge-vlak`, `--badge-rand`)  | Eigen cirkel met `border-radius: 50%`                                               |
| Uitgelichte kaart (beeld links, tekst rechts) | `.beeldkaart` op de wrapper, hooguit `--beeldkaart-h`                              | Een vijfde kopie met een eigen kolomverhouding                                      |
| Doorlopende tekst (artikel, case, juridisch)  | `.langvorm` (`--leesbreedte`)                                                      | Eigen `max-width` + prose-regels per pagina                                         |
| Formulierveld met label en fout               | `.field` (`--veld-ruimte` is de enige knop)                                        | Eigen label/input/foutregel per formulier                                           |
| Redactioneel beeld                            | `<BeeldKader>` (`components/beeld-kader.tsx`)                                      | `<Image>` met vaste hoogte + `object-fit: cover`                                    |
| Kruimels **en** BreadcrumbList                | `<Kruimelpad>` — levert allebei                                                    | Kruimels zonder structured data, of andersom                                        |
| Structured data                               | `<JsonLd>` (escapet `<`)                                                           | Eigen `<script type="application/ld+json">`                                         |
| Admintabel op een telefoon                    | `tabel-stapel` op het `<table>`, `data-kop` op een cel zonder duidelijke kop       | Kolommen laten staan en hopen dat het past                                          |
| Een variant van een gedeelde vorm             | De variabele overschrijven (`--badge-kleur`)                                       | De eigenschap overschrijven (`color`) — dat wint of verliest op stylesheet-volgorde |
| Een adminscherm kunnen tonen zonder database  | Data ophalen en tekenen scheiden; het echte component in `app/ontwerp/schermen.ts` | Markup nabouwen in een fixture                                                      |

**Page-CSS-scoping.** Elke marketingpagina importeert een eigen `.css` met regels onder een
pagina-rootclass. Gedeelde component-CSS staat onder de eigen componentclass en wordt door
de component zelf geïmporteerd.

**Formulieren.** Server action + `useActionState`; validatie verzamelt **álle** fouten
tegelijk → `{ ok, message, errors }`. De client toont `aria-invalid` + `.field-err` en zet
focus op het eerste foute veld. Honeypot heet `website`; `noValidate` op het `<form>`.

## Code-kwaliteit en testen

### Wat te vermijden

- `export const revalidate` — niet toegestaan onder Cache Components.
- `new Date()`, `cookies()` of `searchParams` binnen een `use cache`-scope.
- Een eigen `mapRow` met per-veld-`??`-ketens.
- `listContent` op een lijstpagina.
- Een eigen `<script type="application/ld+json">`.
- Een `<style>` in de productie-HTML (de CSP weigert hem, de pagina komt kaal binnen).
- Hex-kleuren, en `orange-600` voor tekst.
- Een vaste px-waarde onder `--text-xs` (gebruik `--text-2xs`/`--text-3xs`).
- Een em-streepje in zichtbare tekst, en de u-vorm buiten de admin.
- `toLocale*` zonder `{ timeZone: "Europe/Amsterdam" }` — anders hydration-mismatch.
- `next lint` (deprecated, breekt CI). Lint is de flat config in `eslint.config.mjs`.

### Wat CI voor je bewaakt

Deze tests bestaan omdat de fout die ze vangen echt is gemaakt. Zet er geen uit zonder te
weten welke.

| Test                                       | Vangt                                                                                                                                                   |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tests/unit/manifest.spec.ts`              | Het manifest loopt achter; een pagina-ingang die niets rendert; een contenttype zonder datalaag of seed                                                 |
| `tests/unit/cms-pages.spec.ts`             | Een paginaveld dat in de admin staat maar nergens gerenderd wordt                                                                                       |
| `tests/unit/cms-velden.spec.ts`            | Hetzelfde voor de contenttypen                                                                                                                          |
| `tests/unit/changelog.spec.ts`             | `package.json`'s `version` en de bovenste regel in `CHANGELOG.md` lopen uit de pas                                                                      |
| `tests/unit/admin-aria.spec.ts`            | Icoonknop zonder naam, dialoog zonder `aria-modal`/naam/focusbeheer, schakelgroep zonder `aria-pressed`                                                 |
| `tests/unit/admin-editor.spec.ts`          | Een veld dat zijn wijziging niet meldt (verborgen invoer zonder `VerborgenWaarde`)                                                                      |
| `tests/unit/admin-opmaak.spec.ts`          | Nieuwe inline styles in de admin                                                                                                                        |
| `tests/unit/schrijfstijl.spec.ts`          | Em-streepjes in zichtbare tekst; de u-vorm buiten de admin                                                                                              |
| `tests/unit/gedeelde-opmaak.spec.ts`       | Een kaart, "meer"-link of kicker met de hand nagebouwd in plaats van `.kaart`, `.meer-link` of `.kicker`                                                |
| `tests/unit/handtekening.spec.ts`          | Een donkere e-mailhandtekening zonder eigen achtergrond (wit op wit in Outlook); een naam die de tabel openbreekt; een logo-URL buiten het eigen domein |
| `tests/e2e/formulieren.spec.ts`            | Foutmarkering, focussprong en bedankstaat van beide formulieren                                                                                         |
| `tests/e2e/admin-toegankelijkheid.spec.ts` | Contrast en horizontaal schuiven in de admin, op drie breedtes                                                                                          |
| `tests/e2e/admin-editor.spec.ts`           | Een knop van de editorbalk buiten beeld, een balk die het laatste veld afdekt, een van de vijf admintabellen die op een telefoon niet stapelt           |
| `tests/e2e/schil.spec.ts`                  | Mobiel menu en cookiemelding                                                                                                                            |
| `tests/e2e/mobiel.spec.ts`                 | Horizontaal schuiven op 320px, een ankersprong achter de vaste balk, een menu dat niet scrollt, contrast op 375px                                       |
| `tests/e2e/artikel.spec.ts`                | Een coverbeeld dat bijgesneden of opgeschaald wordt; auteursblok en verwante artikelen; een label zonder waarde in de byline                            |
| `tests/e2e/beeldkaart.spec.ts`             | Een vijfde variant van de uitgelichte kaart, of een foto die binnenmarge krijgt                                                                         |
| `tests/e2e/langvorm.spec.ts`               | Doorlopende tekst breder dan 80 tekens per regel; een kop midden in de tekst zonder sectiegrens                                                         |
| `tests/e2e/sector.spec.ts`                 | Herkenningspunten die als losse regels wegvallen; een gat naast een oneven laatste kaart                                                                |
| `tests/e2e/kritieke-css.spec.ts`           | Een `<style>` in de productie-HTML: die weigert de CSP en de pagina komt kaal binnen                                                                    |

Daarnaast draait CI Dependabot (wekelijks). **Geen CodeQL:** code scanning vereist GitHub
Code Security, niet beschikbaar op een private repo onder een persoonlijk account — de
workflow is verwijderd in plaats van permanent rood te laten staan.

### Een nieuwe bewaker schrijven

Breek hem expres, kijk of hij rood wordt, zet hem terug. Een test die je niet hebt zien
falen bewaakt niets. Zoek je in broncode naar een los woord, blank dan eerst het
commentaar uit. Wacht in e2e op een zichtbaar gevolg, niet op een netwerktoestand.

## Zo ontstaan hier fouten

Deze vijf hebben elk minstens één keer echt schade aangericht. Ze staan er met het incident
erbij, want een regel zonder aanleiding leest als een dooddoener en wordt overgeslagen.

**1 · Bewerk met tekst die je net gelezen hebt, niet met een script dat ankers raadt.**
Een opruimscript zocht met `rindex("/**")` het commentaar boven een interface en at drie
buurinterfaces op. Een import werd ingevoegd "na de laatste importregel" en landde midden
in een import die over vijftien regels liep. `tk={{…}}` werd twee keer als `tk={…}`
geschreven en brak de JSX. Lees het bestand, kopieer de exacte tekst, vervang die. Draai
`npm run typecheck` direct na elke structurele bewerking. Een script dat halverwege een
`assert` faalt schrijft níéts weg — controleer het bestand in plaats van aan te nemen dat
de eerste helft is gelukt.

**2 · Een SQL-update die nul rijen raakt is geen succes.** Drie van de zes updates in de
homepage-feedback raakten niets: de sleutel `pitch` stond helemaal niet in de sectorrijen,
dus `where data->>'pitch' = '<oud>'` matchte nooit. Dat is anderhalf uur lang als "gedaan"
gerapporteerd. Zie de werkwijze hierboven.

**3 · Beweer niets over het leespad zonder `lib/cms/merge.ts` te hebben gelezen.** Er is
drie keer beweerd dat een ontbrekende sleutel een `console.error` per render oplevert. Dat
klopt niet: `vulAan` vult stil aan en de validatie slaagt daarna. Alleen een aanwezige maar
ongeldige waarde logt. Het verschil bepaalt of iets urgent is of alleen slordig.

**4 · Een bewaker die je niet hebt zien falen, bewaakt niets.** De ARIA-test zocht naar de
tekst `aria-pressed` in de bron, en de toelichting boven het component bevatte dat woord —
de regel controleerde dus niets bij precies het bestand dat hij moest bewaken. Een e2e-test
wachtte op `networkidle`, wat op deze site nooit intreedt. Een locator op `"Menu"` matchte
ook `"Sluit menu"`.

**5 · Inventariseer met code, niet met het oog.** De vraag "staat er nog hardgecodeerde
tekst" is beantwoord met een scan per bestand, en daardoor bleef het aanmeldformulier op de
inzichten-pagina's staan: dat is geen eigen bestand maar een blok binnen de CTA eronder.
Tel wat je zoekt, en laat de telling zakken naar nul in plaats van een lijst door te lezen.

## Omgeving en valkuilen

- **OS: Windows + PowerShell.** Draai de dev-server via de browser-preview-tools op poort
  3000, niet via een losse shell.
- **Kill poort 3100 vóór een lokale e2e-run.** `playwright.config.ts` heeft
  `reuseExistingServer: !CI`, dus lokaal test hij tegen een server die er al draait, ook als
  die een oudere build serveert. Dat levert groene tests op code die je net hebt gewijzigd,
  waarna CI alsnog rood gaat. Sluit de poort af (`Get-NetTCPConnection -LocalPort 3100 |
Stop-Process`) en laat Playwright zelf bouwen.
- **Een corrupte `.next/dev/types` laat de pre-commit hook falen op fouten die niet van jou
  zijn.** Een dev-server die halverwege is afgebroken laat dat bestand stuk achter.
  Verwijder `.next` en draai opnieuw, zoek niet in je eigen wijziging.
- **De admin zit achter Supabase-auth** — lokaal staat geen werkende sleutel, dus inloggen
  lukt niet. Gebruik `/ontwerp` voor alles wat opmaak is, en test echte admin-flows op
  productie.
- **Supabase-MCP kan naar een ánder project wijzen.** Controleer met `list_projects`; de
  TNW-database is niet altijd via MCP bereikbaar. Verifieer DB-zaken via de SQL Editor of
  een echte formuliertest op de live site.
- **Nieuwe kolom of bucket = migratie** in `supabase/migrations/` **én** draaien. Publieke
  pagina's lezen alleen `status='live'`.
- **Bash-heredocs eten backslashes.** Een regex of een `\b` in een gegenereerd bestand komt
  stuk aan. Gebruik de Write-tool, of `chr(92)`.

## Openstaand

Geen verplichte roadmap; pak op wat raakt aan waar je toch werkt. Afgeronde items blijven
als één regel staan.

- **Tekst van de eigenaar nodig:** een zin voor de privacyverklaring over Vercel Web
  Analytics (cookieloos, geen toestemming vereist, maar wel benoemen), en een tweede zin
  voor waarde 4 "Duurzaam ondernemen" op /over-ons — die heeft er nu één sinds het
  CO2-doel voor 2030 eruit is.
- **PageSpeed-restanten:** 29 KiB ongebruikte JS, 14 KiB legacy polyfills, zes
  niet-gecomposite animaties. Gemeten, niet opgepakt.
- **LinkedIn-carrousel** op de site: twee open vragen (waar hij komt, en of we toegang tot
  de Community Management API aanvragen).
- Afgerond: CMS-querylast (`listContentSamenvatting`, `admin_aantallen`), `/ontwerp` voor
  de admin zonder database, de vier gedeelde vormen, `.langvorm`, `.field`, LCP van de
  hero, Vercel Web Analytics, de handtekening op het eigen domein.

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.
