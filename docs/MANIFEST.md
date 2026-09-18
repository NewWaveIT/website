# Projectmanifest

Gegenereerd uit de code door `tests/unit/manifest.spec.ts`. **Niet met de hand
bijwerken** — draai `npm run manifest`. Loopt dit bestand achter op de code, dan
faalt de unittest.

## Contenttypen

| Type      | Tabel           | Velden | Seed                     | Datalaag                      | Admin              | Publiek          |
| --------- | --------------- | ------ | ------------------------ | ----------------------------- | ------------------ | ---------------- |
| artikelen | `cms_artikelen` | 8      | —                        | —                             | `/admin/inzichten` | `/inzichten`     |
| cases     | `cms_cases`     | 20     | `lib/klantverhalen.ts`   | `lib/klantverhalen-data.ts`   | `/admin/cases`     | `/klantverhalen` |
| diensten  | `cms_diensten`  | 27     | `lib/diensten-detail.ts` | `lib/diensten-detail-data.ts` | `/admin/diensten`  | `/diensten`      |
| paginas   | `cms_paginas`   | 3      | —                        | —                             | `/admin/paginas`   | —                |
| sectoren  | `cms_sectoren`  | 43     | `lib/sectoren-detail.ts` | `lib/sectoren-detail-data.ts` | `/admin/sectoren`  | `/sectoren`      |
| services  | `cms_services`  | 49     | `lib/services.ts`        | `lib/services-data.ts`        | `/admin/services`  | `/diensten`      |
| teamleden | `cms_teamleden` | 7      | `lib/team.ts`            | `lib/team-data.ts`            | `/admin/teamleden` | —                |
| vacatures | `cms_vacatures` | 9      | `lib/vacatures.ts`       | `lib/vacatures-data.ts`       | `/admin/vacatures` | `/vacatures`     |

## Paginateksten

| Slug                 | Velden | Pad                   | Gelezen door                                                                                                                                                                                                                                                                                                                                                      |
| -------------------- | ------ | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| algemeen             | 19     | /                     | `app/(marketing)/inzichten/[slug]/page.tsx`<br>`app/(marketing)/inzichten/page.tsx`<br>`app/(marketing)/page.tsx`<br>`components/layout/schil-cms.tsx`                                                                                                                                                                                                            |
| algemene-voorwaarden | 5      | /algemene-voorwaarden | `app/(marketing)/algemene-voorwaarden/page.tsx`                                                                                                                                                                                                                                                                                                                   |
| contact              | 64     | /contact              | `app/(marketing)/contact/page.tsx`<br>`lib/contact-data.ts`                                                                                                                                                                                                                                                                                                       |
| dienst-detail        | 49     | /diensten             | `app/(marketing)/diensten/[slug]/page.tsx`<br>`components/diensten/fase-tijdlijn.tsx`<br>`components/diensten/richting-hub.tsx`<br>`components/diensten/secties/aanpak.tsx`<br>`components/diensten/secties/bewijs.tsx`<br>`components/diensten/secties/probleem.tsx`<br>`components/diensten/secties/verwijzingen.tsx`<br>`components/diensten/service-card.tsx` |
| diensten             | 51     | /diensten             | `app/(marketing)/diensten/page.tsx`<br>`components/diensten/richting-hub.tsx`<br>`lib/services-data.ts`                                                                                                                                                                                                                                                           |
| diensten-ai          | 7      | /diensten/ai          | `components/diensten/richting-hub.tsx`                                                                                                                                                                                                                                                                                                                            |
| diensten-mendix      | 7      | /diensten/mendix      | `components/diensten/richting-hub.tsx`                                                                                                                                                                                                                                                                                                                            |
| diensten-strategie   | 10     | /diensten/strategie   | `components/diensten/richting-hub.tsx`                                                                                                                                                                                                                                                                                                                            |
| home                 | 28     | /                     | `app/(marketing)/page.tsx`                                                                                                                                                                                                                                                                                                                                        |
| inzichten            | 14     | /inzichten            | `app/(marketing)/inzichten/[slug]/page.tsx`<br>`app/(marketing)/inzichten/page.tsx`                                                                                                                                                                                                                                                                               |
| klantverhaal-detail  | 18     | /klantverhalen        | `app/(marketing)/klantverhalen/[slug]/page.tsx`                                                                                                                                                                                                                                                                                                                   |
| klantverhalen        | 13     | /klantverhalen        | `app/(marketing)/klantverhalen/page.tsx`                                                                                                                                                                                                                                                                                                                          |
| over-ons             | 33     | /over-ons             | `app/(marketing)/over-ons/page.tsx`                                                                                                                                                                                                                                                                                                                               |
| privacy              | 5      | /privacy              | `app/(marketing)/privacy/page.tsx`                                                                                                                                                                                                                                                                                                                                |
| sector-detail        | 22     | /sectoren             | `app/(marketing)/sectoren/[slug]/page.tsx`                                                                                                                                                                                                                                                                                                                        |
| sectoren             | 17     | /sectoren             | `app/(marketing)/sectoren/page.tsx`                                                                                                                                                                                                                                                                                                                               |
| vacature-detail      | 33     | /werken-bij           | `app/(marketing)/vacatures/[slug]/page.tsx`<br>`app/(marketing)/werken-bij/page.tsx`                                                                                                                                                                                                                                                                              |
| werken-bij           | 41     | /werken-bij           | `app/(marketing)/werken-bij/page.tsx`                                                                                                                                                                                                                                                                                                                             |

## Publieke routes

- `/`
- `/algemene-voorwaarden`
- `/contact`
- `/diensten`
- `/diensten/[slug]`
- `/diensten/ai`
- `/diensten/mendix`
- `/diensten/strategie`
- `/inzichten`
- `/inzichten/[slug]`
- `/klantverhalen`
- `/klantverhalen/[slug]`
- `/over-ons`
- `/privacy`
- `/sectoren`
- `/sectoren/[slug]`
- `/vacatures/[slug]`
- `/werken-bij`

## Aantallen

- bronbestanden: 211
- clientComponenten: 40
- servercomponenten: 171
- unittests: 33
- e2etests: 7
