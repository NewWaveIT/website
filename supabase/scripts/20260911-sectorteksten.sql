-- Sectorteksten voor de overzichten: één bron in plaats van vier
--
-- De homepage, /sectoren en /klantverhalen toonden elk hun eigen hardcoded
-- versie van dezelfde sectorpitch, naast de versie in deze tabel. Vanaf nu
-- lezen alle drie de overzichten `hook`, `pitch` en `kpiLabel` uit deze rijen.
--
-- Draai dit ná de deploy. Doe je het niet, dan vallen die drie velden terug op
-- de seed in lib/sectoren-detail.ts -- de site blijft dus goed -- maar de admin
-- toont ze leeg en elke render zet een console.error in de Vercel-logs.
--
-- De pitch komt uit de tweede zin van de bestaande `intro` van dezelfde rij,
-- losgemaakt zodat hij zelfstandig leesbaar is.

begin;

update cms_sectoren
   set data = data || '{"hook": "“Onze assets worden slimmer, onze systemen niet.”", "pitch": "Wij verbinden werkplaats, fleet, warehouse en klantproces in apps die live zijn binnen weken.", "kpiLabel": "Realtime inzicht"}'::jsonb,
       bijgewerkt_op = now()
 where slug = 'mobiliteit';

update cms_sectoren
   set data = data || '{"hook": "“Onze doorlooptijden groeien sneller dan onze formatie.”", "pitch": "Wij bouwen applicaties die in weken aanpasbaar zijn, niet in jaren.", "kpiLabel": "Sneller vergunnen"}'::jsonb,
       bijgewerkt_op = now()
 where slug = 'publieke-sector';

update cms_sectoren
   set data = data || '{"hook": "“Onze mensen registreren meer dan ze zorgen.”", "pitch": "Wij digitaliseren processen en verbinden systemen, zodat zorgverleners tijd terugkrijgen voor de patiënt.", "kpiLabel": "Minder registratielast"}'::jsonb,
       bijgewerkt_op = now()
 where slug = 'zorg';

update cms_sectoren
   set data = data || '{"hook": "“Onze machines produceren data die niemand gebruikt.”", "pitch": "Wij bouwen planning, kwaliteit en shopfloor bovenop de data en het ERP die je al hebt.", "kpiLabel": "Kortere omsteltijden"}'::jsonb,
       bijgewerkt_op = now()
 where slug = 'manufacturing';

update cms_sectoren
   set data = data || '{"hook": "“Elke innovatie strandt op compliance.”", "pitch": "Wij helpen banken en verzekeraars opschalen met governance die de snelheid niet in de weg zit.", "kpiLabel": "Audit-proof"}'::jsonb,
       bijgewerkt_op = now()
 where slug = 'banken';

-- Controle: vijf rijen, alle drie de velden gevuld.
select slug,
       naam,
       data->>'kpiLabel'      as label,
       length(data->>'pitch') as pitch_lengte,
       (data ? 'hook')        as heeft_hook
  from cms_sectoren
 order by slug;

commit;
