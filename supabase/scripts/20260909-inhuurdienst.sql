-- Foundation Starterkit wordt "Consultant of team inhuren" (9 september 2026).
--
-- De dienst verandert niet van vorm maar van inhoud: waar het aanbod eerst een
-- op te leveren fundering was, is het nu capaciteit — een gecertificeerde
-- Mendix-consultant of een team dat meedraait.
--
-- Bewust een update op de bestaande rij en geen delete + insert: zo blijven het
-- id, de aanmaakdatum en de audittrail intact. De slug wijzigt mee, dus de
-- oude URL /diensten/foundation-starterkit bestaat daarna niet meer. Dat kan,
-- want de site is nog niet live en er verwijst niets naar buiten.
--
-- De tekst is een voorzet, afgeleid uit de Fusion Team-beschrijving en de
-- vacatureteksten. Herschrijf hem in /admin/diensten; vanaf dat moment is de
-- CMS-rij leidend en doet de seed er niet meer toe.

update public.cms_services
set slug = 'consultant-inhuren',
    titel = 'Consultant of team inhuren',
    volgorde = 7,
    data = '{"naam":"Consultant of team inhuren","familie":"capaciteit","ookRelevantVoor":["mendix"],"fase":3,"pitch":"Een gecertificeerde Mendix-consultant die meedraait in jouw team, of een team dat een traject draagt.","beschrijving":"Soms is er geen vraagstuk om te onderzoeken, maar werk dat gedaan moet worden. Dan lever je capaciteit. Onze consultants zijn Mendix Advanced of Expert gecertificeerd en draaien mee in jullie eigen ritme en Scrum-proces — als teamlid, niet als externe partij ernaast. Ze bouwen niet alleen: ze coachen de mensen om zich heen en nemen mee wat ze bij andere opdrachtgevers hebben gezien. Eén consultant om een team te versterken, of een compleet team dat een traject draagt. Wat past, hangt af van wat er ligt.","doelgroep":"Organisaties met werk op de plank en te weinig handen, of zonder Mendix-kennis in huis.","duur":"In overleg","prijzen":[],"resultaten":["Een gecertificeerde consultant die meedraait in jullie ritme","Kennisoverdracht onderweg, zodat jullie eigen mensen meegroeien","Op- of afschalen in overleg"],"volgendeStap":"Een Fusion Team Startsprint als jullie het daarna zelf willen kunnen, of uitbreiding naar een tweede team.","volgendeStapSlugs":["fusion-team-startsprint"],"ctaLabel":"Plan een kennismaking (20 min)","ctaType":"kennismaking"}'::jsonb
where slug = 'foundation-starterkit';

-- Controle: negen diensten, met 'consultant-inhuren' erbij en
-- 'foundation-starterkit' verdwenen.
select slug, titel, volgorde, data->>'familie' as familie
from public.cms_services
order by volgorde;
