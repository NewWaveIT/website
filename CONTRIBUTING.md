# Bijdragen & conventies

Praktische gids voor onderhoud aan de The New Wave IT-website. Doel: **goed te
onderhouden, standaard-conform, schaalbaar en snel**. Houd je aan onderstaande
afspraken zodat de codebase consistent blijft.

## Stack

- **Next.js 16** (App Router, React Server Components) + **React 19**
- **TypeScript** in `strict`-modus (incl. `noUncheckedIndexedAccess`)
- **Tailwind CSS 4** + `app/globals.css` voor het designsysteem
- **Supabase** (Postgres + Storage) als CMS-backend, met ingebouwde fallback-content
- **Vercel** voor hosting (ISR, `revalidate 300`)

## Commando's

```bash
npm run dev          # lokale ontwikkelserver (poort 3000)
npm run build        # productie-build
npm run typecheck    # tsc --noEmit
npm run lint         # ESLint, faalt bij >0 warnings
npm run format       # Prettier: schrijf formattering
npm run format:check # Prettier: alleen controleren (zoals CI doet)
npm run manifest     # Genereert docs/manifest.json + docs/MANIFEST.md opnieuw uit de code
npm run test:unit    # Vitest: unittests voor pure logica (sanitize, formuliervalidatie)
npm run test:e2e     # Playwright-smoketests (bouwt + start op poort 3100)
```

Een Husky pre-commit hook draait automatisch ESLint + Prettier op staged bestanden en
daarna `npm run typecheck`, zodat een rode CI-run lokaal al wordt opgevangen. Handmatig
(of als referentie voor wat CI doet): `npm run typecheck && npm run lint && npm run
format:check && npm run test:unit && npm run build`. CI draait exact deze checks plus de
Playwright-smoketests op elke PR en push naar `main`, plus Dependabot (wekelijkse
dependency-updates).

## Waar staat wat

`docs/MANIFEST.md` is de kaart: per contenttype de tabel, seed, datalaag en publieke
route; per pagina-ingang de velden en welke bestanden ze lezen; en alle publieke routes.
Hij is **gegenereerd** — `npm run manifest` — en `tests/unit/manifest.spec.ts` faalt zodra
hij achterloopt. Werk hem dus niet met de hand bij.

`/admin/baseline` is de tegenhanger voor de data: die zet elke CMS-rij naast het veldschema
en de seed en telt de verschillen. Draai hem na elke contentmodelwijziging.

## Projectstructuur

```
app/(marketing)/     Publieke pagina's (RSC). Eén responsieve component per pagina.
app/admin/           CMS-UI (client components + server actions).
app/api/             Route handlers.
components/          Herbruikbare UI, gegroepeerd per domein (home/, layout/, admin/, contact/…).
lib/                 Datalagen (*-data.ts), CMS-schema (cms/), helpers.
supabase/migrations/ SQL-migraties (chronologisch geprefixt).
tests/e2e/           Playwright-smoketests.
tests/unit/          Vitest-unittests (pure logica, geen browser/server nodig).
```

## Conventies

- **Eén responsieve component per pagina.** Geen aparte desktop-/mobiel-componenten;
  stuur layout via CSS-breakpoints in `globals.css`. De navigatie splitst wél:
  `Header` (≥1041px) en `MobileShell` (≤1040px).
- **Datums altijd met tijdzone.** Elke `toLocale*`-aanroep krijgt
  `{ timeZone: "Europe/Amsterdam" }`. Zonder dit rendert Vercel (UTC) anders dan de
  client → hydration-fout #418.
- **Afbeeldingen via `next/image`** met `width`/`height` (of `fill`). Alleen bij een
  net-geüploade blob/preview in de editor mag een kale `<img>` (met
  `eslint-disable-next-line @next/next/no-img-element` erboven).
- **Datalaag met fallback.** Publieke content komt uit `lib/<type>-data.ts`. Die leest
  Supabase en valt terug op ingebouwde content als er geen rij/env is, zodat build en
  tests zonder keys werken. Pagina's importeren nooit direct de Supabase-client.
- **CMS-velden** worden gedeclareerd in `lib/cms/schema.ts` (`FieldDef`). Voeg een veld
  toe aan het schema in plaats van losse inputs in de editor te hardcoderen.
- **`noUncheckedIndexedAccess`:** index-toegang (`arr[i]`, `record[key]`) levert
  `T | undefined`. Guard expliciet (`if (!x) return …`) of gebruik een tuple-type waar
  de lengte vaststaat. Geen `!` tenzij aantoonbaar veilig.
- **Geen geheimen in de repo of in de chat.** Supabase service-keys staan in Vercel /
  `.env.local`. Alleen publieke (`NEXT_PUBLIC_*`) keys mogen in de client.

## Een CMS-contenttype toevoegen (kort)

1. SQL-migratie in `supabase/migrations/` (tabel `cms_<type>` + RLS).
2. Schema in `lib/cms/schema.ts` (velden + label + type).
3. Zod-schema in `lib/cms/schemas.ts` en een bouwer in `lib/cms/rij.ts`.
4. Datalaag `lib/<type>-data.ts` met `maakLezer` en fallback-content.
5. Menu-item in `lib/admin-nav.ts` en een rij in `lib/cms/admin-paden.ts`.
6. Publieke pagina leest via de datalaag.
7. `npm run manifest` — anders faalt de versheidstest.

## Een CMS-veld verwijderen

Een veld weghalen uit `lib/cms/schema.ts` is niet genoeg: de sleutel blijft in elke
opgeslagen rij staan en komt terug zodra iemand hem opnieuw invoert. Haal hem óók uit het
zod-schema, de TypeScript-interface en de seed. De sleutel uit de rijen halen doe je
daarna op `/admin/baseline`: hij verschijnt daar als weessleutel, met een knop die hem in
alle tabellen tegelijk opruimt. Met de hand kan ook
(`data - array['sleutel']::text[]`, zie `supabase/scripts/20260914-dode-velden.sql`), maar
dan mis je de controle achteraf.

## Git & CI

- Werk op een feature-branch; open een PR naar `main`.
- CI moet groen zijn (typecheck, lint, format, unit-tests, build, e2e) voor merge.
- Dependabot opent wekelijks PR's voor npm- en GitHub Actions-dependencies en meldt
  kwetsbaarheden. Geen CodeQL: code scanning vereist GitHub Code Security, wat op een
  private repo onder een persoonlijk account niet beschikbaar is.
- Deploy gebeurt via `git push` (Vercel bouwt automatisch).
