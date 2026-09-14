-- Contentfeedback op de homepage (14 september 2026).
--
-- Zes waarden die in het CMS staan en dus niet met de seed meeveranderen. De
-- nieuwe sectiekoppen (diensten, sectoren, klantverhalen, inzichten) staan er
-- bewust niet bij: die sleutels bestaan nog niet in de rij, en een sleutel die
-- de rij niet noemt komt uit de seed. Ze verschijnen dus vanzelf, en staan
-- daarna in de admin klaar om aan te passen.
--
-- Elke update noemt de oude waarde in de WHERE, zodat hij niets doet als er
-- intussen iets anders staat. Nul geraakte rijen betekent hier: kijk even.


update public.cms_paginas
   set data = jsonb_set(data, '{ctaTitel}', to_jsonb('Samen bouwen aan schaalbare groei?'::text)),
       bijgewerkt_op = now()
 where slug = 'home'
   and data->>'ctaTitel' = 'Klaar om samen te bouwen aan meetbare groei?';

update public.cms_sectoren
   set data = jsonb_set(data, '{pitch}', to_jsonb('Jouw proces in vier weken gedigitaliseerd, van aanvraag tot besluit.'::text)),
       bijgewerkt_op = now()
 where slug = 'publieke-sector'
   and data->>'pitch' = 'Wij bouwen applicaties die in weken aanpasbaar zijn, niet in jaren.';

update public.cms_sectoren
   set data = jsonb_set(data, '{pitch}', to_jsonb('Wij helpen banken en verzekeraars opschalen met governance die snelheid en controle samen laat gaan.'::text)),
       bijgewerkt_op = now()
 where slug = 'banken'
   and data->>'pitch' = 'Wij helpen banken en verzekeraars opschalen met governance die de snelheid niet in de weg zit.';

update public.cms_sectoren
   set data = jsonb_set(data, '{pitch}', to_jsonb('Wij digitaliseren processen en verbinden systemen, zodat zorgverleners tijd terugkrijgen voor patiënt en cliënt.'::text)),
       bijgewerkt_op = now()
 where slug = 'zorg'
   and data->>'pitch' = 'Wij digitaliseren processen en verbinden systemen, zodat zorgverleners tijd terugkrijgen voor de patiënt.';

update public.cms_sectoren
   set data = jsonb_set(data, '{intro}', to_jsonb('De zorgvraag groeit, de handen worden schaarser en de administratie blijft. Wij digitaliseren processen en verbinden systemen, zodat zorgverleners tijd terugkrijgen voor de patiënt en de cliënt.'::text)),
       bijgewerkt_op = now()
 where slug = 'zorg'
   and data->>'intro' = 'De zorgvraag groeit, de handen worden schaarser en de administratie blijft. Wij digitaliseren processen en verbinden systemen, zodat zorgverleners tijd terugkrijgen voor de patiënt.';

update public.cms_cases
   set data = jsonb_set(data, '{image}', to_jsonb('/assets/photos/team-overleg-flipover.webp'::text)),
       bijgewerkt_op = now()
 where slug = 'moove'
   and data->>'image' = '/assets/photos/team-overleg-scherm.webp';


-- Controle: zes regels met de nieuwe waarde. Staat er een oude tussen, dan
-- heeft die update niets geraakt.
select 'paginas' as bron, slug, data->>'ctaTitel' as waarde
  from public.cms_paginas where slug = 'home'
union all
select 'sectoren', slug, data->>'pitch'
  from public.cms_sectoren where slug in ('publieke-sector', 'banken', 'zorg')
union all
select 'sectoren-intro', slug, left(data->>'intro', 60)
  from public.cms_sectoren where slug = 'zorg'
union all
select 'cases', slug, data->>'image'
  from public.cms_cases where slug = 'moove'
order by bron, slug;
