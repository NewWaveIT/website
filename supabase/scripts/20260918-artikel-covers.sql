-- Artikelen: de dode sleutel `image` bevat de foto, het veld dat de site leest
-- heet `cover`.
--
-- Aanleiding: de nulmeting op /admin/baseline meldt vier weessleutels
-- `artikelen.<slug>.image` met een echt fotopad erin. Het veldschema kent dat
-- veld niet meer -- het heet `cover` -- en `lib/inzichten-data.ts` bouwt de
-- afbeelding uit `cover`, met terugval op één algemene foto.
--
-- Nagemeten op de live site (18 september, og:image van de vier artikelen):
-- `cover` is overal gevuld, met vier verschillende foto's, en géén ervan is de
-- terugvalfoto. De redactie heeft dus eigen covers gekozen. Stap 2 hieronder
-- raakt daarmee naar verwachting nul rijen -- hij staat er als vangnet voor het
-- geval één artikel toch geen cover heeft.
--
-- Het gevolg: "Weessleutels verwijderen" op de nulmeting is veilig. Er gaat
-- niets verloren; de oude paden staan sowieso nog in `lib/inzichten.ts`.
--
-- Let wel op: die seedpaden wijken nu af van wat de site toont. Valt Supabase
-- weg, dan tonen deze vier artikelen de oude foto's. Dat is een losse keuze:
-- de seed bijwerken naar de gekozen covers, of laten staan.

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
