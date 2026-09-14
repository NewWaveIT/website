-- De laatste twee echte gaten tussen seed en CMS (14 september 2026).
--
-- De volledigheidscontrole vond 24 rijen met ontbrekende schemavelden. Bijna
-- allemaal onterecht alarm: dat veld is óók leeg in de seed, dus er valt niets
-- te vullen. Dat zijn optionele velden die nog nooit iemand heeft ingevuld,
-- geen weggelopen content.
--
-- Twee gevallen zijn wél echt, want daar staat in de seed tekst die de site
-- toont en die in de admin niet te vinden is:
--
--   1. De drie richting-hubs missen `welNietTitel`, `welWanneer` en
--      `nietWanneer`: het blok "wanneer wel, wanneer niet" waar een e2e-test
--      op staat. Die tekst leeft nu alleen in lib/diensten-detail.ts.
--   2. De homepage mist de tien sectiekoppen die vandaag naar het CMS zijn
--      verhuisd (diensten, sectoren, klantverhalen, inzichten).
--
-- Let op wat dit níet is: er gaat niets stuk zonder dit script. `vulAan` in
-- lib/cms/merge.ts vult een ontbrekende sleutel aan uit de seed en valideert
-- daarna gewoon, dus er komt geen console.error en de site klopt. Het enige
-- probleem is de admin: daar staat een leeg veld terwijl er op de site tekst
-- staat, en een redacteur kan niet zien waar die vandaan komt.
--
-- `jsonb_build_object(...) || data`: bij een botsing wint wat er al in de rij
-- staat. Dit vult gaten en overschrijft nooit iets.


update public.cms_diensten
   set data = jsonb_build_object(
                'nietWanneer', '["Je zoekt één AI-tool om aan te schaffen. Wij beginnen bij jullie processen, niet bij een product.", "Je wilt een presentatie over de mogelijkheden; onze dagen zijn werksessies waarin je team zelf bouwt.", "Er is geen enkele ruimte om afspraken te maken over wat er met bedrijfsgegevens mag."]'::jsonb,
                'welNietTitel', 'Wanneer AI wel past, en wanneer niet'::text,
                'welWanneer', '["Er zijn plekken waar je mensen beslissingen nemen met onvolledige informatie.", "Je wilt eerst weten waar AI geld oplevert en waar niet, voordat je investeert.", "Je teams willen het zelf doen: één echte taak meenemen en er een werkende agent voor bouwen."]'::jsonb
              ) || data,
       bijgewerkt_op = now()
 where slug = 'ai';

update public.cms_diensten
   set data = jsonb_build_object(
                'nietWanneer', '["Je proces is standaard en je zoekt standaardsoftware. Dan is een pakket vrijwel altijd goedkoper.", "Je wilt een prototype om te laten zien, niet iets dat morgen in gebruik gaat.", "Je wilt de bouw volledig uitbesteden: al onze diensten gaan ervan uit dat jullie eigen mensen meedoen en het daarna zelf kunnen."]'::jsonb,
                'welNietTitel', 'Wanneer Mendix wel past, en wanneer niet'::text,
                'welWanneer', '["Er loopt een proces vast in spreadsheets en mailtjes, en je wilt er iets werkends voor.", "Je werkt al met Mendix en het landschap groeit harder dan de architectuur, governance en het deliverymodel eromheen.", "Je hebt twee of meer apps in productie of op de rol, en app nummer twee moet goedkoper worden dan nummer één.", "Je wilt dat business en IT samen bouwen in plaats van specificaties uitwisselen."]'::jsonb
              ) || data,
       bijgewerkt_op = now()
 where slug = 'mendix';

update public.cms_diensten
   set data = jsonb_build_object(
                'nietWanneer', '["De directie kan er niet zelf bij zijn; dan levert het een document op dat niemand draagt.", "Je wilt volgende week bouwen. Begin dan bij App in a Day of AI Agent in a Day en kom hier later terug."]'::jsonb,
                'welNietTitel', 'Wanneer een strategietraject wel past, en wanneer niet'::text,
                'welWanneer', '["De eindverantwoordelijke zit zelf aan tafel: zonder directie werkt het niet.", "Low-code en AI groeien harder dan de inrichting eromheen, en je wilt weten waar ze wél en niet passen.", "Je wilt vastgestelde prioriteiten, inclusief een expliciete niet-doen-lijst."]'::jsonb
              ) || data,
       bijgewerkt_op = now()
 where slug = 'strategie';

update public.cms_paginas
   set data = jsonb_build_object(
                'dienstenKicker', 'Hoe wij het doen'::text,
                'dienstenTitel', 'Jouw uitdaging, drie richtingen naar de oplossing.'::text,
                'dienstenIntro', 'Een proces dat vastloopt, een systeem dat niet meebeweegt, een koers die nog moet landen. Mendix, AI en strategie zijn de drie richtingen waarlangs we dat aanpakken. Elke richting begint met een concreet product van één dag met een vaste prijs, zodat je snel weet waar je aan toe bent.'::text,
                'sectorenKicker', 'Onze sectoren'::text,
                'sectorenTitel', 'Wij spreken de taal van jouw sector.'::text,
                'sectorenIntro', 'Wij kennen de regels, de systemen en de druk waaronder jouw organisatie werkt. Daardoor leveren we sneller iets dat écht past.'::text,
                'casesKicker', 'Klantverhalen'::text,
                'casesTitel', 'Business-impact, geen technische anekdote.'::text,
                'inzichtenKicker', 'Inzichten & thought leadership'::text,
                'inzichtenTitel', 'Sectorkennis die je helpt voorop te lopen'::text
              ) || data,
       bijgewerkt_op = now()
 where slug = 'home';


-- Controle: vier regels met 0 in de kolom `ontbreekt`.
select 'diensten' as soort, slug,
       (case when data ? 'welNietTitel' then 0 else 1 end)
     + (case when data ? 'welWanneer'   then 0 else 1 end)
     + (case when data ? 'nietWanneer'  then 0 else 1 end) as ontbreekt
  from public.cms_diensten
 where slug in ('mendix', 'ai', 'strategie')
union all
select 'paginas', slug,
       (select count(*) from unnest(array[
          'dienstenKicker','dienstenTitel','dienstenIntro',
          'sectorenKicker','sectorenTitel','sectorenIntro',
          'casesKicker','casesTitel','inzichtenKicker','inzichtenTitel'
        ]) as v where not (data ? v))
  from public.cms_paginas
 where slug = 'home'
 order by 1, 2;
