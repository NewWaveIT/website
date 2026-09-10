# Overdracht — dienstdetailpagina's (10 september 2026)

Voor de sessie die hier verdergaat. Lees eerst `CLAUDE.md` en `CONTRIBUTING.md`;
dit bestand vult aan met wat er vandaag gebeurd is en wat er nog ligt.

Branch: `dienstdetailpaginas` · PR: NewWaveIT/website#11

---

## 1 · Waar het staat

Het sjabloon voor de dienstdetailpagina is af en werkt. **Twee van de negen
diensten zijn gevuld.**

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

### 2.1 De zeven resterende diensten vullen

Ophalen via de claude_design MCP, project `93963f8e-4fc4-4c82-8ea7-312c015ef6b8`
(auth via `/design-login` in een **interactieve** terminal — in de desktop-app
lukt de OAuth-flow niet):

| Ontwerp                               | Service-slug                    |
| ------------------------------------- | ------------------------------- |
| `dienst-app-in-a-day.html`            | `app-in-a-day`                  |
| `dienst-ai-opportunity-scan.html`     | `ai-opportunity-scan`           |
| `dienst-ai-strategie.html`            | `ai-strategie`                  |
| `dienst-mendix-scale-sessie.html`     | `mendix-scale-sessie`           |
| `dienst-fusion-team-startsprint.html` | `fusion-team-startsprint`       |
| `dienst-training-enablement.html`     | `training-enablement`           |
| `dienst-foundation-starterkit.html`   | **bestaat niet meer — zie 2.3** |

Neem het blok van `ai-agent-in-a-day` in `lib/services.ts` als voorbeeld; de
veldvolgorde volgt de secties van de pagina.

Twee dingen om op te letten:

- **Iconen.** De ontwerpen gebruiken lucide-namen (`bot`, `map`, `git-fork`,
  `shield-check`, …). Die moeten in de `ICONEN`-map bovenin `page.tsx` staan;
  een onbekende naam valt stil terug op een vinkje, dus controleer het.
- **Foto's.** In de ontwerpen `.png`, in de repo uitsluitend `.webp`. Controleer
  of het bestand in `public/assets/photos/` bestaat voordat je ernaar verwijst.

### 2.2 SQL voor alle negen CMS-rijen — dit is de belangrijkste stap

**De seed is een koude start; de CMS-rij wint.** Zolang je alleen
`lib/services.ts` bijwerkt, verandert er niets op de live site. Per dienst:

```sql
update public.cms_services
set data = data || '{ … nieuwe sleutels … }'::jsonb
where slug = '…';
```

Gebruik `data || jsonb` en niet een volledige overschrijving, zodat wat de
eigenaar zelf in de admin heeft aangepast blijft staan. Zet het script in
`supabase/scripts/` en laat de eigenaar het draaien.

### 2.3 Foundation Starterkit bestaat niet meer

Die dienst is op 9 september vervangen door `consultant-inhuren` (zie
`supabase/scripts/20260909-inhuurdienst.sql`, al gedraaid). Twee ontwerpen
verwijzen er nog naar als vervolgstap, met een reden die niet op een consultant
slaat ("Van losse agents naar iets dat structureel in je landschap zit").

Ik heb die kaarten weggelaten; die twee pagina's tonen nu twee vervolgdiensten
in plaats van drie. **Vraag de eigenaar om één regel** waarom Consultant of team
inhuren logisch volgt, als de kaart terug moet. Niet zelf verzinnen.

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

- De dienstpagina **onder de vouw** (programma, voorbereiding, vervolg, FAQ,
  catalogus) en op mobiel. Alleen de hero is op 1440px bekeken.
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

---

## 5 · Nog open van eerder deze week

- De eigenaar levert nog: de drie teamleden per sector, de "wanneer wel / wanneer
  niet"-teksten per richting-hub, en de definitieve tekst van
  `consultant-inhuren` (nu een voorzet, zonder tarieven).
- `supabase/scripts/20260910-sectorhero-zonder-foto.sql` is gedraaid.
- `/sectoren` (het overzicht) noemt de sector nog "Banken & financials", terwijl
  de detailpagina "Financial services" heet.
