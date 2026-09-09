# CLAUDE.md

Context voor AI-agents (Claude Code) die aan deze codebase werken. De canonieke
conventies staan in **[`CONTRIBUTING.md`](CONTRIBUTING.md)** — lees die eerst. Dit
bestand vult aan met een snelle map, de werkwijze en de valkuilen die je hier niet
uit de code afleidt.

## Snel oriënteren

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

## Kernpatronen

- **Alleen designtokens voor kleur.** Nooit hex hardcoden; gebruik de CSS-vars uit
  `globals.css`. AA-veilig oranje voor tekst is `--orange-text` (#c2410c), **niet**
  `orange-600`. Witte tekst op flame (`#f15822`) haalt bewust geen AA — dat is een
  brandkeuze, niet per ongeluk.
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
  `rijNaarRuw` (`lib/cms/rij.ts`). Een **leeg opgeslagen** veld blijft leeg; een veld dat de
  rij **niet noemt** of **niet geldig** levert komt uit de seed van dezelfde slug (met een
  `console.error` in de Vercel-logs); een rij die zo nóg niet compleet is valt weg — uit een
  overzicht, of als 404 op een detailpagina. Schrijf dus geen eigen `mapRow` met per-veld-
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
- **Auth/RLS.** `proxy.ts` (de Next 16-naam voor middleware) redirect ongeauthenticeerde `/admin` → login; `requireAdmin()`
  (`lib/dal.ts`) in élke admin-action en -pagina. Anon mag alleen `insert` op de
  formuliertabellen; de service-role-client (`lib/supabase/admin.ts`) is uitsluitend voor
  gebruikersbeheer.
- **E-mail.** `lib/email.ts` gooit nooit en slaat over zonder `RESEND_API_KEY`; aanroepen
  gebeuren ná een geslaagde DB-insert, zodat een mailfout een inzending nooit breekt.
- **Dynamische contactpersonen.** Teamleden hebben een `contactrol` (Sales/Recruitment);
  `getContactpersoon(rol)` levert de juiste persoon voor contact- en vacaturepagina's.
- **Afbeeldingen.** Uitsluitend WebP in `public/assets/` (geen PNG-foto's meer).

## Omgeving & valkuilen

- **OS: Windows + PowerShell.** Draai de dev-server via de browser-preview-tools op poort
  3000, niet via een losse shell.
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
  (hello@), `NOTIFY_EMAIL` (people@)
- **Signup uit** in Supabase Auth: elke ingelogde gebruiker is volledig admin — gebruikers
  alleen aanmaken via `/admin/gebruikers`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
