-- Portretten voor Koen, Jeroen en Sonny.
--
-- Aanleiding: het auteursblok onder een artikel toont naam, functie en foto.
-- Jeroen en Sonny hadden helemaal geen foto, en bij Koen stond een portret dat
-- een ander persoon toont dan het portret op de oude site.
--
-- De drie bestanden komen van thenewwaveit.com/over-ons (de oude site), zijn
-- teruggebracht naar 800x800 WebP en staan in public/assets/photos/.
--
-- LET OP bij Koen: de foto die er stond (portret-blauw.webp) en de nieuwe
-- (portret-koen-wijsman.webp) tonen niet dezelfde persoon. Ik kan niet zien
-- welke de juiste is. Controleer dat vóór je regel 2 draait; laat hem anders
-- staan en draai alleen de twee eronder.

-- 1 - Wat staat er nu?
select slug, titel, data->>'foto' as foto
from public.cms_teamleden
where slug in ('koen-wijsman', 'jeroen-plooij', 'sonny-van-rein')
order by slug;

-- 2 - Koen. Sla deze over als het oude portret de juiste was.
update public.cms_teamleden
set data = jsonb_set(data, '{foto}', '"/assets/photos/portret-koen-wijsman.webp"', true)
where slug = 'koen-wijsman';

-- 3 - Jeroen en Sonny hadden nog niets.
update public.cms_teamleden
set data = jsonb_set(data, '{foto}', '"/assets/photos/portret-jeroen-plooij.webp"', true)
where slug = 'jeroen-plooij';

update public.cms_teamleden
set data = jsonb_set(data, '{foto}', '"/assets/photos/portret-sonny-van-rein.webp"', true)
where slug = 'sonny-van-rein';

-- 4 - Controle. Verwacht: drie rijen met een gevuld fotopad.
select slug, titel, data->>'foto' as foto
from public.cms_teamleden
where slug in ('koen-wijsman', 'jeroen-plooij', 'sonny-van-rein')
order by slug;
