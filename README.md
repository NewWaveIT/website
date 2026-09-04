# The New Wave IT — website

Marketingwebsite van The New Wave IT. Gebouwd op de huisstijl uit het Claude
Design-project (sector-gedreven positionering, autoriteit en lead-gen).

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript (strict) ·
Tailwind CSS 4 · Supabase · Vercel.

## Lokaal draaien

```bash
npm install
cp .env.example .env.local   # vul de Supabase-waarden in
npm run dev                  # http://localhost:3000
```

> **Brand-assets:** kopieer de logo's en foto's naar `public/assets/` volgens
> [`public/assets/ASSETS.md`](public/assets/ASSETS.md). Zonder deze bestanden
> rendert de pagina volledig, maar blijven de afbeeldingsvlakken leeg.

## Projectstructuur

```
app/                 App Router — pagina's, layout, globale CSS
  layout.tsx         Root layout: fonts, metadata, header/footer
  page.tsx           Homepage (implementatie van ui_kits/website/index.html)
  home.css           Homepage-specifieke styles
  globals.css        Design-tokens + gedeelde site-styles
components/
  layout/            Header, Footer
  home/              Homepage-interactielaag (client)
lib/
  supabase/          Supabase-clients (server + browser)
  nav.ts             Navigatiedata
  types.ts           Gedeelde content-types
  utils.ts           cn()
supabase/            Config + SQL-migraties
public/assets/       Brand-assets (zie ASSETS.md)
```

## Randvoorwaarden opzetten

### 1. GitHub

De repo wordt gehost op GitHub. Aanmaken en pushen (vanuit de projectmap):

```bash
git init
git add -A
git commit -m "Initial commit"
gh repo create <owner>/thenewwaveit-website --private --source=. --remote=origin --push
```

> Controleer eerst met `gh auth status` dat het juiste account actief is.
> Wisselen kan met `gh auth switch --user <username>`.

### 2. Vercel

Deploy via de GitHub-koppeling (aanbevolen, geeft automatische previews):

1. Ga naar [vercel.com/new](https://vercel.com/new) en importeer de GitHub-repo.
2. Framework preset: **Next.js** (wordt automatisch herkend).
3. Zet de environment variables uit `.env.example` onder
   **Settings → Environment Variables** (Production + Preview).
4. Deploy.

CLI-alternatief:

```bash
npm i -g vercel
vercel login
vercel link
vercel --prod
```

### 3. Supabase

1. Maak een project op [supabase.com](https://supabase.com).
2. Vul in `.env.local` de waarden uit **Project Settings → API**:
   `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
   `SUPABASE_SERVICE_ROLE_KEY`.
3. Draai de migratie:

```bash
npm i -g supabase        # of: npx supabase
supabase login
supabase link --project-ref <project-ref>
supabase db push         # voert supabase/migrations/*.sql uit
```

De migraties maken `contact_aanvragen`, `sollicitaties` en de CMS-contenttabellen
aan met RLS: anonieme bezoekers mogen formulieren indienen en alleen `live`
content lezen; ingelogde staff beheert alles.

### 4. CMS / admin (`/admin`)

De admin draait op `/admin` (buiten de site-huisstijl, eigen layout) en is
beveiligd met Supabase Auth via `middleware.ts`.

1. Maak een admin-gebruiker aan in Supabase → **Authentication → Users → Add user**
   (e-mail + wachtwoord). Optioneel `user_metadata`: `{ "naam": "Merel Jansen",
"rol": "Marketing & HR" }` voor de weergave in de sidebar.
2. Ga naar `/admin/login` en log in.
3. **Dashboard** toont openstaande aanvragen/sollicitaties; **Aanvragen** en
   **Sollicitaties** zijn kanban-borden met detail-drawers (status, eigenaar,
   notities). **Content** (pagina's, cases, inzichten, vacatures) leest uit de
   `cms_*`-tabellen; de WYSIWYG-editor en het live-lezen door de publieke
   pagina's volgen in de volgende fase.

## Scripts

| Script              | Doel                            |
| ------------------- | ------------------------------- |
| `npm run dev`       | Ontwikkelserver                 |
| `npm run build`     | Productiebuild                  |
| `npm run start`     | Productieserver                 |
| `npm run lint`      | ESLint                          |
| `npm run typecheck` | TypeScript-check                |
| `npm run test:unit` | Vitest-unittests (lib, actions) |
| `npm run test:e2e`  | Playwright-smoketests           |

## Status

- [x] Fundament: Next.js, tokens, fonts, layout, Supabase-clients
- [x] Homepage (`/`) met hero-canvas + interacties
- [x] Sectoren (`/sectoren` + 5 detailpagina's)
- [x] Diensten (`/diensten` + mendix/ai/strategie)
- [x] Klantverhalen (`/klantverhalen` + case-details)
- [x] Inzichten (`/inzichten` + artikel-details)
- [x] Over ons, Werken bij + vacature-details
- [x] Contact met Supabase-server action
- [x] Geanimeerde hero-vignettes (sector-hero) + SEO (sitemap/robots/JSON-LD)
- [x] Logos/brand-assets gecomprimeerd geplaatst
- [x] Teamfoto's als geoptimaliseerde WebP in `public/assets/photos/`
- [x] CMS/admin: content beheren (8 typen) + inzendingen als kanban
- [x] Sollicitatieformulier (cv/motivatie-upload) → privébucket + admin
- [x] Transactionele mail in huisstijl via Resend (notificatie + bevestiging)
- [x] Dynamische contactpersonen (contactrol sales/recruitment op teamleden)
