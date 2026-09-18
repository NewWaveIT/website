-- Artikelen: de dode sleutel `image` bevat de foto, het veld dat de site leest
-- heet `cover`.
--
-- Aanleiding: de nulmeting op /admin/baseline meldt vier weessleutels
-- `artikelen.<slug>.image` met een echt fotopad erin. Het veldschema kent dat
-- veld niet meer -- het heet `cover` -- en `lib/inzichten-data.ts` bouwt de
-- afbeelding uit `cover`, met terugval op één algemene foto. Staat `cover` leeg,
-- dan tonen alle vier de artikelen dus dezelfde foto.
--
-- "Weessleutels verwijderen" op de nulmeting gooit `image` weg. Draai dit script
-- éérst, anders verdwijnt met die sleutel ook de enige vastlegging van welke
-- foto bij welk artikel hoorde.
--
-- Volgorde: kijken, verplaatsen, opruimen, nakijken.

-- 1 · Wat staat er nu?
select slug,
       data->>'image' as dode_sleutel,
       coalesce(nullif(data->>'cover', ''), '(leeg)') as cover
from public.cms_artikelen
order by slug;

-- 2 · Verplaats de foto naar het veld dat gelezen wordt, en alleen waar er nog
--     geen cover staat. Een cover die de redactie zelf heeft gekozen wint.
update public.cms_artikelen
set data = jsonb_set(data, '{cover}', data->'image', true)
where data ? 'image'
  and coalesce(data->>'cover', '') = '';

-- 3 · Pas daarna de dode sleutel weg. (Dit doet ook de knop op de nulmeting;
--     hier staat hij zodat het in één keer klopt.)
update public.cms_artikelen
set data = data - 'image'
where data ? 'image';

-- 4 · Controle. Verwacht: elke rij een gevulde cover, nergens nog `image`.
--     Een update die nul rijen raakte meldt zichzelf niet -- deze query wel.
select slug,
       coalesce(nullif(data->>'cover', ''), '(leeg)') as cover,
       data ? 'image' as heeft_nog_image
from public.cms_artikelen
order by slug;
