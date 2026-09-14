-- Eén query, één resultaat: de SQL-editor toont alleen de laatste, en de eerste
-- twee vragen verdwenen daardoor uit beeld.
--
-- Waarom deze vraag: bij de controle na de homepage-feedback kwam
-- `data->>'pitch'` op alle drie de sectorrijen leeg terug. Niet "de oude tekst
-- staat er nog", maar: de sleutel staat helemaal niet in de rij.
--
-- Dat is op zichzelf niet stuk. `leesRijen` (lib/cms/merge.ts) vult een veld
-- dat de rij niet noemt aan uit de seed van dezelfde slug, dus de nieuwe pitch
-- staat gewoon op de site. Maar het doet dat mét een console.error in de
-- Vercel-logs, precies om dit zichtbaar te maken: in de admin ziet een
-- redacteur een leeg veld terwijl er op de site iets anders staat.
--
-- De uitkomst zegt of alleen `pitch` ontbreekt of dat de rijen breder leeg zijn.

select slug,
       status,
       (select count(*) from jsonb_object_keys(data) as k) as aantal_sleutels,
       data ? 'hook'     as heeft_hook,
       data ? 'pitch'    as heeft_pitch,
       data ? 'kpiLabel' as heeft_kpilabel,
       (select string_agg(k, ', ' order by k) from jsonb_object_keys(data) as k) as sleutels
  from public.cms_sectoren
 order by slug;
