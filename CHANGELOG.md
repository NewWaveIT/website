# Changelog

Wat er live staat, nieuwste bovenaan. Eén regel per wijziging, geschreven voor wie niet in
de code kijkt: wat merkt een bezoeker of een redacteur ervan.

Het versienummer volgt [semver](https://semver.org/lang/nl/) en staat in `package.json`.
Welk niveau wanneer hoort, staat in [`CLAUDE.md`](CLAUDE.md#werkwijze-bij-elke-wijziging).
`tests/unit/changelog.spec.ts` faalt als de twee uit de pas lopen.

Een wijziging zonder gevolg voor de site (alleen tests, documentatie, een refactor) krijgt
geen eigen versie; die valt onder de eerstvolgende regel hieronder.

## 1.0.0 — 8 oktober 2026

De site zoals hij nu op www.thenewwaveit.com staat. Vanaf hier houdt dit bestand de
wijzigingen bij; wat daarvóór gebeurde staat in `git log` en in
[`docs/BESLISSINGEN.md`](docs/BESLISSINGEN.md).

De laatste stappen naar deze versie:

- Het logo in de e-mailhandtekening wijst altijd naar het eigen domein, niet meer naar een
  previewadres dat na de domeinovergang verdween.
- Vercel Web Analytics staat aan (cookieloos, dus buiten de cookiemelding).
- De hero-afbeelding op de homepage blokkeert de LCP niet meer.
- Alle vijf de admintabellen stapelen op een telefoon.
- `/ontwerp` laat de echte adminschermen zien zonder database.
