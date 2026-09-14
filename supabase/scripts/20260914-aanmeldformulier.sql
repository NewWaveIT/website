-- Drie sleutels erbij op 'algemeen' (14 september 2026).
--
-- Het aanmeldformulier onderaan de inzichten-pagina's had zijn placeholder en
-- knoptekst nog in de code. Dat viel bij de eerste ronde buiten beeld omdat het
-- geen apart formulierbestand is maar een blok in de CTA eronder.
--
-- Zelfde merge als altijd: wat er al staat wint.

update public.cms_paginas
   set data = '{"leadHint": "naam@organisatie.nl", "leadKnop": "Aanmelden", "leadKnopBezig": "Versturen…"}'::jsonb || data,
       bijgewerkt_op = now()
 where slug = 'algemeen';

-- Controle: één regel, 18 sleutels.
select slug, (select count(*) from jsonb_object_keys(data)) as sleutels
  from public.cms_paginas
 where slug = 'algemeen';
