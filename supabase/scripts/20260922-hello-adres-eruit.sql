-- hello@thenewwaveit.com van de site af.
--
-- Aanleiding: dat adres bestaat niet. Wat erheen wordt gestuurd komt nergens
-- aan. Alles gaat voortaan naar orders@ (aanvragen, het algemene adres in de
-- voettekst en op /contact) of people@ (recruitment, en de twee juridische
-- pagina's -- de algemene voorwaarden noemden People@ al als bedrijfsadres).
--
-- De code is in dezelfde wijziging aangepast (lib/contactgegevens.ts,
-- lib/team.ts, lib/cms/paginas/contact.ts, lib/cms/paginas/privacy.ts,
-- .env.example) en een unittest in tests/unit/schrijfstijl.spec.ts houdt de
-- telling daar op nul. Dit script doet hetzelfde voor de CMS-rijen, want die
-- winnen van de seed.
--
-- LET OP, dit script dekt het niet helemaal af. Twee dingen moeten erbuiten:
--   1. MAIL_FROM_PUBLIC in Vercel staat op hello@. Zolang die er staat is dat
--      de afzender van elke bevestigingsmail aan een bezoeker. Zet hem op
--      'The New Wave IT <orders@thenewwaveit.com>' en deploy opnieuw.
--   2. Een eventuele forward of alias op hello@ bij de mailprovider.

-- ---------------------------------------------------------------------------
-- 1 - Waar staat het nog? Draai dit eerst.
--
-- Zoekt in alle acht de contenttabellen, niet alleen waar ik het verwacht --
-- een adres in een vacaturetekst of een artikel vind je niet met een lijstje
-- veldnamen uit je hoofd.
-- ---------------------------------------------------------------------------

select 'cms_paginas' as tabel, slug, status from public.cms_paginas where data::text like '%hello@%'
union all select 'cms_cases', slug, status from public.cms_cases where data::text like '%hello@%'
union all select 'cms_diensten', slug, status from public.cms_diensten where data::text like '%hello@%'
union all select 'cms_sectoren', slug, status from public.cms_sectoren where data::text like '%hello@%'
union all select 'cms_artikelen', slug, status from public.cms_artikelen where data::text like '%hello@%'
union all select 'cms_vacatures', slug, status from public.cms_vacatures where data::text like '%hello@%'
union all select 'cms_teamleden', slug, status from public.cms_teamleden where data::text like '%hello@%'
union all select 'cms_services', slug, status from public.cms_services where data::text like '%hello@%'
order by tabel, slug;

-- ---------------------------------------------------------------------------
-- 2 - Vervangen. Per tabel één update over de hele jsonb, zodat het niet
--     uitmaakt in welk veld het adres staat.
--
--     Paginas gaan per slug, want /contact hoort bij orders@ en de juridische
--     pagina's bij people@. De rest van de tabellen kan in één keer: daar komt
--     het adres alleen voor als contactadres van een teamlid of in lopende
--     tekst, en beide horen bij de postbus van dat onderwerp.
-- ---------------------------------------------------------------------------

-- /contact en alle overige paginas: het algemene adres wordt orders@.
update public.cms_paginas
set data = replace(data::text, 'hello@thenewwaveit.com', 'orders@thenewwaveit.com')::jsonb
where slug not in ('privacy', 'algemene-voorwaarden')
  and data::text like '%hello@thenewwaveit.com%';

-- De juridische pagina's: people@, gelijk aan wat de algemene voorwaarden al
-- als bedrijfsadres noemen.
update public.cms_paginas
set data = replace(data::text, 'hello@thenewwaveit.com', 'people@thenewwaveit.com')::jsonb
where slug in ('privacy', 'algemene-voorwaarden')
  and data::text like '%hello@thenewwaveit.com%';

-- Teamleden: het adres hangt aan de contactrol. Recruitment naar people@,
-- al het andere naar orders@.
update public.cms_teamleden
set data = replace(data::text, 'hello@thenewwaveit.com', 'people@thenewwaveit.com')::jsonb
where data->>'contactrol' = 'Recruitment'
  and data::text like '%hello@thenewwaveit.com%';

update public.cms_teamleden
set data = replace(data::text, 'hello@thenewwaveit.com', 'orders@thenewwaveit.com')::jsonb
where coalesce(data->>'contactrol', '') <> 'Recruitment'
  and data::text like '%hello@thenewwaveit.com%';

-- De overige tabellen: lopende tekst, naar orders@.
update public.cms_cases
set data = replace(data::text, 'hello@thenewwaveit.com', 'orders@thenewwaveit.com')::jsonb
where data::text like '%hello@thenewwaveit.com%';

update public.cms_diensten
set data = replace(data::text, 'hello@thenewwaveit.com', 'orders@thenewwaveit.com')::jsonb
where data::text like '%hello@thenewwaveit.com%';

update public.cms_sectoren
set data = replace(data::text, 'hello@thenewwaveit.com', 'orders@thenewwaveit.com')::jsonb
where data::text like '%hello@thenewwaveit.com%';

update public.cms_artikelen
set data = replace(data::text, 'hello@thenewwaveit.com', 'orders@thenewwaveit.com')::jsonb
where data::text like '%hello@thenewwaveit.com%';

-- Vacatures horen bij recruitment.
update public.cms_vacatures
set data = replace(data::text, 'hello@thenewwaveit.com', 'people@thenewwaveit.com')::jsonb
where data::text like '%hello@thenewwaveit.com%';

update public.cms_services
set data = replace(data::text, 'hello@thenewwaveit.com', 'orders@thenewwaveit.com')::jsonb
where data::text like '%hello@thenewwaveit.com%';

-- ---------------------------------------------------------------------------
-- 3 - Controle. Verwacht: nul rijen met hello@, en de nieuwe adressen op de
--     plekken waar er eerst een stond.
-- ---------------------------------------------------------------------------

select 'nog met hello@' as wat, count(*) as aantal
from (
  select 1 from public.cms_paginas where data::text like '%hello@%'
  union all select 1 from public.cms_cases where data::text like '%hello@%'
  union all select 1 from public.cms_diensten where data::text like '%hello@%'
  union all select 1 from public.cms_sectoren where data::text like '%hello@%'
  union all select 1 from public.cms_artikelen where data::text like '%hello@%'
  union all select 1 from public.cms_vacatures where data::text like '%hello@%'
  union all select 1 from public.cms_teamleden where data::text like '%hello@%'
  union all select 1 from public.cms_services where data::text like '%hello@%'
) t;

select slug, data->>'emailAdres' as email_adres
from public.cms_paginas
where slug = 'contact';

select slug,
       case when data->>'body' like '%people@thenewwaveit.com%' then 'people@ staat erin'
            else 'GEEN people@ - kijk na' end as juridische_tekst
from public.cms_paginas
where slug in ('privacy', 'algemene-voorwaarden')
order by slug;

select slug, data->>'contactrol' as contactrol, data->>'email' as email
from public.cms_teamleden
where data ? 'email'
order by slug;
