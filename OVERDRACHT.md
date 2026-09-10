# Overdracht — dienstdetailpagina's (10 september 2026)

Voor de sessie die hier verdergaat. Lees eerst `CLAUDE.md` en `CONTRIBUTING.md`;
dit bestand vult aan met wat er vandaag gebeurd is en wat er nog ligt.

Branch: `dienstdetailpaginas` · PR: NewWaveIT/website#11

---

## 1 · Waar het staat

Het sjabloon voor de dienstdetailpagina is af en werkt. **Acht van de negen
diensten zijn gevuld.** Alleen `consultant-inhuren` niet: die verving Foundation
Starterkit en heeft daarom geen eigen ontwerp (zie 2.3).

### Wat er gebouwd is

`app/(marketing)/diensten/[slug]/page.tsx` + `dienst.css` — geport uit
`ui_kits/website/dienst-*.html` (Claude Design). De negen ontwerpen zijn
structureel identiek, dus het is één sjabloon met per dienst een dataset.

Elf secties in vaste volgorde:

1. Hero met sticky boekkaart (tags, kop, lead, feitenregel · prijs, bullets, CTA)
2. Sticky subnavigatie — toont alleen ankers van secties die bestaan
3. "Herken je dit?" — drie citaten
4. "Wat je meeneemt" — icoonlijst naast een foto
5. Het programma — donkere band met tijd/weekblokken
6. Voorbereiding — "Wij zorgen voor" / "Jij zorgt voor"
7. Daarna — vervolgdiensten met reden en prijs
8. FAQ — `<details>`, met FAQPage-structured data
9. De rest van de catalogus
10. Slot-CTA

**Elke sectie verbergt zichzelf als haar velden leeg zijn.** Dat is geen
bijkomstigheid: zeven diensten hebben deze content nog niet, en die horen geen
lege koppen te tonen.

Heeft een dienst géén van die secties, dan valt de pagina terug op de tekst die
er al was: `beschrijving`, `doelgroep` en de gekoppelde inzichten. Zonder die
terugval bleef er een kop met een pitchregel en een boekkaart over — geen tekst
om op gevonden te worden. De terugval verdwijnt vanzelf zodra de dienst gevuld
is, dus de geporte pagina's zien hem nooit.

De inzichten staan in een eigen `.dienst-secties`-wrapper. Zet die class **niet**
op de paginaroot: `.subnav` en `.crumbs` uit `secties.css` botsen met het nieuwe
ontwerp. Laat je de scope wég, dan verliest `.cover` zijn positionering en
ontsnapt de `fill`-afbeelding naar de viewport, dwars over de hero heen.

### Contentmodel

`Service` (`lib/services.ts`) heeft er 22 optionele velden bij: `kop`, `lead`,
`feiten`, `prijsToelichting`, `boekPunten`, `herkenIntro`, `herken`,
`meeneemtTitel`, `meeneemt`, `meeneemtFoto`, `dagLabel`, `dagTitel`, `dagIntro`,
`dagSlots`, `voorbereidingIntro`, `wijZorgen`, `jijZorgt`, `daarnaIntro`,
`vervolg`, `faqTitel`, `faq`, `ctaTitel`.

Bijbehorende typen staan in `lib/content-blokken.ts` (`Feit`, `Meeneem`,
`DagSlot`, `Vervolg`, `FaqItem`), het runtime-schema in `lib/cms/schemas.ts` en
de admin-velden in `lib/cms/schema.ts`. Alle drie moeten mee bij een wijziging.

`FaqItem` stond in `lib/sectoren-detail.ts` en is naar `content-blokken.ts`
verhuisd, want de dienstpagina's gebruiken hem nu ook.

---

## 2 · Wat er nog moet gebeuren

### 2.1 De ontwerpen ophalen — ~~zeven diensten vullen~~ nog één

**De ontwerpen zijn gewoon leesbaar met de `DesignSync`-tool**, ook vanuit een
websessie. Dat scheelt de OAuth-omweg uit de vorige overdracht:

```
DesignSync  get_project / list_files / get_file
projectId   93963f8e-4fc4-4c82-8ea7-312c015ef6b8   ("The New Wave IT | Huisstijl")
```

Let op: `list_projects` toont dit project **niet**, want dat filtert op
design-system-projecten en dit is een gewoon project. Ga rechtstreeks met het
projectId naar `get_project` of `list_files`.

Er staan **ook mobiele ontwerpen** (`mobile-dienst-*.html`) naast de
desktopvarianten. Die zijn niet apart geport — het sjabloon is responsive en is
nagelopen van 320 tot 1440px — maar raadpleeg ze als je twijfelt over de
bedoelde mobiele volgorde.

Gevuld: `app-in-a-day`, `ai-agent-in-a-day`, `ai-opportunity-scan`,
`ai-strategie`, `it-strategie`, `mendix-scale-sessie`,
`fusion-team-startsprint`, `training-enablement`. Alleen `consultant-inhuren`
ontbreekt; zie 2.3.

Neem het blok van `ai-agent-in-a-day` in `lib/services.ts` als voorbeeld; de
veldvolgorde volgt de secties van de pagina.

Twee dingen om op te letten:

- **Iconen.** De ontwerpen gebruiken lucide-namen (`bot`, `map`, `git-fork`,
  `shield-check`, …). Die moeten in `iconen.ts` naast `page.tsx` staan; een
  onbekende naam valt stil terug op een vinkje. `tests/unit/diensten-detail.spec.ts`
  vangt dat nu af, samen met ontbrekende foto's en dode vervolg-slugs.
- **Foto's.** In de ontwerpen `.png`, in de repo uitsluitend `.webp`. Controleer
  of het bestand in `public/assets/photos/` bestaat voordat je ernaar verwijst.
- **Prijzen in de toelichting.** Het ontwerp van AI-strategie zet een staffel
  ("€ 3.500 – 4.500 per dagdeel") in `prijsToelichting`. Bewust weggelaten:
  alleen de instapdiensten tonen een bedrag. Kom je zoiets tegen, laat het weg.

### 2.2 SQL voor alle negen CMS-rijen — dit is de belangrijkste stap

**De seed is een koude start; de CMS-rij wint.** Zolang je alleen
`lib/services.ts` bijwerkt, verandert er niets op de live site.

`supabase/scripts/20260910-dienstdetail-velden.sql` doet dit voor de acht
gevulde diensten (22 sleutels per dienst, AI-strategie 21).
**De eigenaar moet het nog draaien.**

Het script is uit de seed gegenereerd, niet overgetypt. Vul je een dienst bij,
genereer het dan opnieuw in plaats van er met de hand een blok bij te schrijven:
lees `SERVICES` uit `lib/services.ts`, houd per dienst de 22 nieuwe sleutels
over die niet leeg zijn, en schrijf per dienst één

```sql
update public.cms_services
set data = data || $json$ … $json$::jsonb
where slug = '…';
```

`data || jsonb` en niet een volledige overschrijving, zodat wat de eigenaar zelf
in de admin heeft aangepast blijft staan. Dollar-quoting omdat de copy
apostroffen bevat.

### 2.3 Foundation Starterkit bestaat niet meer

Die dienst is op 9 september vervangen door `consultant-inhuren` (zie
`supabase/scripts/20260909-inhuurdienst.sql`, al gedraaid). Twee ontwerpen
verwijzen er nog naar als vervolgstap, met een reden die niet op een consultant
slaat ("Van losse agents naar iets dat structureel in je landschap zit").

Inmiddels verwijzen **vijf** ontwerpen naar Foundation Starterkit als
vervolgstap. Al die kaarten zijn weggelaten; die pagina's tonen nu twee
vervolgdiensten in plaats van drie. **Vraag de eigenaar om één regel** waarom
Consultant of team inhuren logisch volgt, als de kaart terug moet. Niet zelf
verzinnen.

Dezelfde vraag blokkeert de negende dienstpagina: `consultant-inhuren` heeft
geen ontwerp, dus zonder copy van de eigenaar blijft die op de terugval staan
(eigen beschrijving, doelgroep en inzichten). Het `dienst-foundation-starterkit`
-ontwerp is er nog wel en kan als vorm dienen — maar de tekst gaat over een
gedeelde fundering, niet over het inhuren van mensen, dus die is niet
overdraagbaar.

### 2.4 Openstaande beslissing: vijf velden zijn ongebruikt geworden

Het nieuwe ontwerp vervangt de oude diepte-secties: `herken` ≈ `vraagstukken`,
`dagSlots` ≈ `aanpak`, `meeneemt` ≈ `waarom`/`outcomes`. Daardoor worden
`kpis`, `vraagstukken`, `aanpak`, `waarom` en `outcomes` op de dienstpagina
**niet meer gerenderd**.

De typen zelf blijven nodig: `lib/diensten-detail.ts` gebruikt ze voor de
richting-hubs (`/diensten/mendix|ai|strategie`).

Drie diensten hebben die content wél in het CMS staan (`it-strategie`,
`fusion-team-startsprint`, en de rij die nu `consultant-inhuren` heet). Volgens
de werkafspraak in CLAUDE.md hoort dat opgeruimd — **maar leg dat eerst aan de
eigenaar voor.** Het is inhoud die hij zelf heeft laten staan.

Hetzelfde geldt voor `volgendeStap` en `volgendeStapSlugs`: op deze pagina
vervangen door `vervolg`, maar controleer of ze elders nog gerenderd worden
(richting-hubs, `/diensten`) voordat je ze weghaalt.

### 2.5 Nog niet visueel gecontroleerd

- ~~De dienstpagina onder de vouw en op mobiel.~~ Gedaan: alle negen slugs op
  320, 360, 375, 390, 620, 621, 700, 768, 800, 801, 900, 1024, 1280 en 1440px.
  Geen horizontale overflow, één `<h1>` per pagina, alle foto's laden, geen
  console-errors, geen icoon dat terugvalt op een vinkje.

  Drie bugs kwamen daar uit, alle drie verholpen: de `.cover`-bug hierboven, de
  nowrap-knop in de slot-CTA-band, en lange samenstellingen die de pagina opzij
  duwden. Voor dat laatste is `overflow-wrap: anywhere` nodig en **niet**
  `break-word` — alleen `anywhere` telt mee in de min-content-breedte, en juist
  die bepaalt hoe smal een grid- of flexkolom mag worden.

- `/sectoren/[slug]` na het verwijderen van de herofoto — alleen manufacturing
  is nagekeken.
- De nieuwe homepage-hero-foto's na deploy. Zelfde bestandsnamen, andere
  beeldverhouding (4:3 → 16:9), dus een gecachte variant valt op als een rare
  uitsnede. Hard verversen; blijft het hangen, hernoem de bestanden.

---

## 3 · Beslissingen van vandaag die je niet uit de code haalt

- **Nooit cijfers, tarieven, senioriteitsniveaus, klantnamen of teamnamen
  verzinnen.** De eigenaar levert copy aan. De mockup-getallen uit de ontwerpen
  ("1.940 ritten per week", "87% kredietaanvragen") zijn daarom overal
  weggelaten, ook in de homepage-hero.
- **Prijzen: alleen instapdiensten tonen een bedrag** — App in a Day en AI Agent
  in a Day. De rest krijgt "Prijs op aanvraag". De ontwerpen tonen overal een
  prijs; dat is bewust niet overgenomen (expliciet zo besloten met de eigenaar).
- **De homepage-hero is variant 3a** uit `ui_kits/website/Hero Opties.dc.html`
  ("Crossfade + trage zoom, scrim alleen links"), niet 3c. De foto loopt onder de
  navigatie door: op de homepage staat de balk `position: fixed` en is hij
  doorzichtig met een wit logo tot je de hero voorbij bent.
- **De sectorhero heeft geen foto meer**, alleen de animatie.

---

## 4 · Omgeving

- **Supabase is vanaf deze machine niet bereikbaar.** De MCP is niet
  geautoriseerd, `.env.local` bevat placeholders (anon key 13 tekens,
  service-role 21 — allebei 401), er is geen Supabase CLI en geen Vercel CLI.
  Alle SQL moet de eigenaar zelf in de SQL Editor plakken. Wil je dit oplossen:
  echte keys in `.env.local` zetten, of `/mcp` in een interactieve terminal.
- **De browser-preview-tools kunnen vastlopen.** Ze zijn deze sessie een uur
  onbruikbaar geweest (time-outs van 5 minuten op `navigate` en `screenshot`).
  Tab sluiten en `preview_start` opnieuw hielp uiteindelijk. Val terug op
  `curl` + de uitgeleverde HTML/CSS als het niet lukt.
- **Push alleen als de eigenaar erom vraagt.**
- Draai `npm run test:unit` en laat de pre-commit hook (eslint + prettier +
  typecheck) zijn werk doen. CI draait daarnaast Playwright en Lighthouse.

### Vanuit een Claude Code-websessie (Linux-container)

Werkt anders dan de desktop-app, en beter voor de visuele controle:

- **Supabase is er net zo onbereikbaar**, maar dat is bruikbaar: zet placeholders
  in `.env.local`, dan lopen de queries in een timeout en rendert `npm run dev`
  de seed. Precies wat je wilt om de nog niet gevulde diensten te bekijken.
- **Screenshots met de voorgeïnstalleerde Chromium**, want de browserversie in
  de repo staat er niet: `chromium.launch({ executablePath: "/opt/pw-browsers/chromium" })`.
  Draai `npm ci` eerst, de container start met een lege `node_modules`.
- **De Vercel-preview is niet met `curl` te halen** (het netwerkbeleid blokkeert
  de host), wel via de Vercel-MCP `web_fetch_vercel_url`.
- **De Claude Design-ontwerpen zijn hier wél bereikbaar**, met `DesignSync`. Zie
  2.1 voor het projectId en de valkuil met `list_projects`.

---

## 5 · Nog open van eerder deze week

- De eigenaar levert nog: de drie teamleden per sector, de "wanneer wel / wanneer
  niet"-teksten per richting-hub, en de definitieve tekst van
  `consultant-inhuren` (nu een voorzet, zonder tarieven).
- `supabase/scripts/20260910-sectorhero-zonder-foto.sql` is gedraaid.
- `/sectoren` (het overzicht) noemt de sector nog "Banken & financials", terwijl
  de detailpagina "Financial services" heet.
