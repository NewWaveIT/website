-- Herofoto van de sectorpagina's (10 september 2026).
--
-- De hero van /sectoren/[slug] toont alleen nog de sectoranimatie; de foto
-- ernaast is eruit. Daarmee vervallen drie velden uit het contentmodel:
-- heroFoto, heroFotoBijschrift en heroFotoPositie. Ze zijn verwijderd uit
-- lib/sectoren-detail.ts, lib/cms/schemas.ts en lib/cms/schema.ts.
--
-- Het leespad negeert sleutels die het schema niet kent, dus dit breekt niets
-- als je het niet draait — het blijft dan alleen als dode data in de rij staan
-- en duikt op in de contentcontrole. Daarom hier weg.

update public.cms_sectoren
set data = data - 'heroFoto' - 'heroFotoBijschrift' - 'heroFotoPositie'
where data ?| array['heroFoto', 'heroFotoBijschrift', 'heroFotoPositie'];

-- Controle: dit hoort nul rijen op te leveren.
select slug, titel
from public.cms_sectoren
where data ?| array['heroFoto', 'heroFotoBijschrift', 'heroFotoPositie'];
