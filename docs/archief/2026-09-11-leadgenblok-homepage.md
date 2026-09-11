# Archief — leadgenblok homepage

Dertien sleutels die tot 11 september 2026 in de `home`-rij van `cms_paginas`
stonden en nergens gerenderd werden. Ze zijn die dag verwijderd
(`supabase/scripts/20260911-weessleutels-2-opruimen.sql`). Hier bewaard omdat het
geen rommel is maar een afgemaakt blok: geschreven teksten, drie ingangen,
duidelijke doelgroepen.

## Wat het was

Een sectie onder aan de homepage die de bezoeker langs drie ingangen leidde,
gesegmenteerd op rol.

| sleutel         | waarde                                                                            |
| --------------- | --------------------------------------------------------------------------------- |
| `leadgenKicker` | Zet de volgende stap                                                              |
| `leadgenTitel`  | Kies het gesprek dat bij je past                                                  |
| `leadgenIntro`  | Of je nu strategisch verkent of concreet wilt starten: er is een passende ingang. |

**Ingang 1**

| sleutel      | waarde                                                                                                    |
| ------------ | --------------------------------------------------------------------------------------------------------- |
| `lead1Aud`   | Voor directie & C-suite                                                                                   |
| `lead1Titel` | Strategiegesprek                                                                                          |
| `lead1Tekst` | Een vrijblijvend gesprek van 45 minuten over jouw sectorvraagstuk en waar technologie het verschil maakt. |

**Ingang 2**

| sleutel      | waarde                                                                                    |
| ------------ | ----------------------------------------------------------------------------------------- |
| `lead2Aud`   | Voor IT & afdelingsmanagers                                                               |
| `lead2Titel` | Quick scan                                                                                |
| `lead2Tekst` | In één sessie brengen we samen je grootste kans in kaart, met een concreet vervolgadvies. |

**Ingang 3**

| sleutel      | waarde                                                                                       |
| ------------ | -------------------------------------------------------------------------------------------- |
| `lead3Aud`   | Voor de verdieping                                                                           |
| `lead3Titel` | Sectorrapport                                                                                |
| `lead3Tekst` | Download het rapport voor jouw markt: businessvraagstukken, benchmarks en concrete outcomes. |

**Losse sleutel uit dezelfde periode**

| sleutel          | waarde                    |
| ---------------- | ------------------------- |
| `heroCtaPrimair` | Plan een strategiegesprek |

## Waarom het weg is

Niet vergeten, maar afgeschaft. De positionering is verschoven van "plan een
strategiegesprek" naar "begin met wat je in één dag kunt doen", en dat is
vastgelegd in een test:

```ts
// tests/e2e/smoke.spec.ts
test("de contact-CTA is laagdrempelig, geen strategiegesprek", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText(/strategiegesprek/i)).toHaveCount(0);
});
```

`heroCtaPrimair` en `lead1Titel` zouden die test dus rood maken. De rijen bleven
staan omdat er nooit SQL bij de codewijziging is geschreven — precies de
bugklasse waar CLAUDE.md voor waarschuwt.

## Als je het terugbrengt

De structuur is bruikbaar; de invulling niet meer. Per ingang:

- **Strategiegesprek** — botst met de test hierboven. Wil je een zware ingang
  voor directie, geef die dan een naam die bij de huidige positionering past.
- **Quick scan** — is inmiddels een echte dienst geworden: de AI Opportunity
  Scan. Een tweede, vagere "quick scan" ernaast verwart eerder dan dat het helpt.
- **Sectorrapport** — hieraan hangt een losse draad. `sectorrapport` staat nog
  altijd in `CONTACT_TYPES` (`lib/services-vragen.ts`) als geldig contacttype en
  `app/(marketing)/contact/actions.ts` houdt er rekening mee, maar sinds dit blok
  weg is zet niets op de site dat type nog. Een contactroute zonder deur. Of dat
  rapport überhaupt bestaat, is niet uit de code op te maken.

De drie instapdiensten op `/diensten` (App in a Day, AI Agent in a Day, AI
Opportunity Scan) doen nu min of meer wat dit blok deed, maar zonder de
doelgroeplabels — en die labels waren het sterkste deel.
