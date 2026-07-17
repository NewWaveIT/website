# Brand-assets

## Status

- ✅ **Logos** (`logos/`) — 10 varianten, gecomprimeerd en geplaatst.
- ✅ **Brand-badges** (`brand/`) — wave-badge espresso + eggshell, geplaatst.
- ✅ **Foto's** (`photos/`) — 12 teamfoto's geplaatst en gecomprimeerd (16MB → 4,2MB).

Nieuwe foto's toevoegen? Zet ze in `public/assets/photos/` en draai
`node scripts/optimize-assets.mjs --public`.

De logos/brand zijn opgehaald uit het Claude Design-project en gecomprimeerd
met `scripts/optimize-assets.mjs` (resize + PNG-optimalisatie, ~73% kleiner).

## Foto's nog toevoegen

De teamfoto's konden niet automatisch worden opgehaald: de design-import-tool
kapt bestanden af op **256 KB** en de foto's zijn groter. Voeg ze zelf toe:

1. Exporteer/download deze bestanden uit het Design-project (map `assets/photos/`)
   of gebruik de originelen, en zet ze in `public/assets/photos/`:

   | Bestand | Gebruikt in |
   |---|---|
   | `team-presentatie-breed.png` | Featured case + Werken-bij |
   | `overleg-laptop.png` | Diensten (Mendix) + inzichten |
   | `team-overleg-scherm.png` | Diensten (AI) |
   | `klantgesprek-tafel.png` | Diensten (Strategie) + inzichten |
   | `overleg-lachend.png` | Mensen-sectie + inzichten |
   | `portret-blauw.png` | Mensen-collage + lead-card (CEO) |
   | `portret-bordeaux.png` | Mensen-collage |
   | `portret-3.png`, `portret-duimen.png` | Team/over-ons |
   | `founders-trio.png` | Over-ons |
   | `cutout-spreker-bordeaux.png`, `cutout-spreker-groen.png` | Sector/dienst-hero's |

2. Comprimeer ze in één keer (resize naar max 1600px + optimalisatie):

   ```bash
   node scripts/optimize-assets.mjs --public
   ```

Tot de foto's er staan renderen de pagina's volledig, maar blijven de
`next/image`-vlakken leeg.
