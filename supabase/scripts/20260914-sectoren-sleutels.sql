-- Waarom deze query: bij de vorige controle kwam `data->>'pitch'` op alle drie
-- de sectorrijen leeg terug. Niet "oude tekst blijven staan", maar: de sleutel
-- staat helemaal niet in de rij.
--
-- Dat is op zichzelf niet stuk. `leesRijen` (lib/cms/merge.ts) vult een veld
-- dat de rij niet noemt aan uit de seed van dezelfde slug, dus de nieuwe pitch
-- staat gewoon op de site zodra de deploy er is. Maar het doet dat mét een
-- console.error in de Vercel-logs, precies om dit zichtbaar te maken: een
-- redacteur die de pitch in de admin wil aanpassen ziet een veld dat leeg
-- lijkt terwijl er op de site iets anders staat.
--
-- Deze query laat per sectorrij zien welke sleutels er wél in staan, zodat
-- duidelijk wordt of alleen `pitch` ontbreekt of dat de rij grotendeels leeg is.

-- 1 · Aantal sleutels en de sleutels zelf, per sector.
select slug,
       status,
       jsonb_object_keys_count.aantal,
       (select string_agg(k, ', ' order by k)
          from jsonb_object_keys(data) as k) as sleutels
  from public.cms_sectoren
  cross join lateral (
    select count(*) as aantal from jsonb_object_keys(data) as k
  ) as jsonb_object_keys_count
 order by slug;

-- 2 · Specifiek de drie overzichtsvelden die op de homepage staan.
select slug,
       data ? 'hook'     as heeft_hook,
       data ? 'pitch'    as heeft_pitch,
       data ? 'kpiLabel' as heeft_kpilabel
  from public.cms_sectoren
 order by slug;

-- 3 · En de staart van de zorg-intro, om te zien of die update wél geraakt
--     heeft (de vorige controle kapte af op 60 tekens, en daar zit het
--     verschil niet).
select slug, right(data->>'intro', 70) as staart
  from public.cms_sectoren
 where slug = 'zorg';
