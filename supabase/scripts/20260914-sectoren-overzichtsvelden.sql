-- De drie overzichtsvelden terug in de sectorrijen (14 september 2026).
--
-- Alle vijf de sectorrijen hebben 38 sleutels, en alle vijf missen dezelfde
-- drie: `hook`, `pitch` en `kpiLabel`. Dat zijn precies de velden die op de
-- homepage en op /sectoren de kaart vullen. Ze zijn later aan het schema
-- toegevoegd dan de rijen zijn ingeladen, dus ze hebben er nooit in gestaan.
--
-- Waarom dat opgelost moet worden terwijl de site het gewoon doet: `leesRijen`
-- (lib/cms/merge.ts) vult een ontbrekend veld aan uit de seed van dezelfde
-- slug, mét een console.error per render. De site klopt dus, maar de logs lopen
-- vol en in de admin staan drie lege velden waar op de site tekst staat. Zet
-- een redacteur daar iets in, dan verschijnt het; laat hij ze leeg, dan blijft
-- het raden waar die tekst vandaan komt.
--
-- De waarden komen uit de seed (lib/sectoren-detail.ts), inclusief de drie
-- pitches die vandaag zijn herschreven.
--
-- `jsonb_build_object(...) || data` en niet andersom: bij een botsing wint de
-- rechterkant, dus een waarde die al in de rij staat blijft staan. Dit script
-- vult alleen gaten en overschrijft nooit iets.


update public.cms_sectoren
   set data = jsonb_build_object(
                'hook',     '“Onze assets worden slimmer, onze systemen niet.”'::text,
                'pitch',    'Wij verbinden werkplaats, fleet, warehouse en klantproces in apps die live zijn binnen weken.'::text,
                'kpiLabel', 'Realtime inzicht'::text
              ) || data,
       bijgewerkt_op = now()
 where slug = 'mobiliteit';

update public.cms_sectoren
   set data = jsonb_build_object(
                'hook',     '“Onze doorlooptijden groeien sneller dan onze formatie.”'::text,
                'pitch',    'Jouw proces in vier weken gedigitaliseerd, van aanvraag tot besluit.'::text,
                'kpiLabel', 'Sneller vergunnen'::text
              ) || data,
       bijgewerkt_op = now()
 where slug = 'publieke-sector';

update public.cms_sectoren
   set data = jsonb_build_object(
                'hook',     '“Onze mensen registreren meer dan ze zorgen.”'::text,
                'pitch',    'Wij digitaliseren processen en verbinden systemen, zodat zorgverleners tijd terugkrijgen voor patiënt en cliënt.'::text,
                'kpiLabel', 'Minder registratielast'::text
              ) || data,
       bijgewerkt_op = now()
 where slug = 'zorg';

update public.cms_sectoren
   set data = jsonb_build_object(
                'hook',     '“Onze machines produceren data die niemand gebruikt.”'::text,
                'pitch',    'Wij bouwen planning, kwaliteit en shopfloor bovenop de data en het ERP die je al hebt.'::text,
                'kpiLabel', 'Kortere omsteltijden'::text
              ) || data,
       bijgewerkt_op = now()
 where slug = 'manufacturing';

update public.cms_sectoren
   set data = jsonb_build_object(
                'hook',     '“Elke innovatie strandt op compliance.”'::text,
                'pitch',    'Wij helpen banken en verzekeraars opschalen met governance die snelheid en controle samen laat gaan.'::text,
                'kpiLabel', 'Audit-proof'::text
              ) || data,
       bijgewerkt_op = now()
 where slug = 'banken';


-- Controle: vijf regels, alle drie de kolommen `true`, en de pitch zoals hij
-- in de seed staat.
select slug,
       data ? 'hook'     as heeft_hook,
       data ? 'pitch'    as heeft_pitch,
       data ? 'kpiLabel' as heeft_kpilabel,
       data->>'pitch'    as pitch
  from public.cms_sectoren
 order by slug;
