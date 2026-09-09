-- Drie garanties die in het CMS-schema ontbraken (9 september 2026).
--
-- 1. `status` mag alleen 'live' of 'concept' zijn. Het was afspraak, geen regel:
--    één typefout in handmatige SQL ('Live') en de RLS-policy `using (status =
--    'live')` verbergt die rij, zonder foutmelding. Dat is precies het soort
--    stille verdwijning waar we deze week meermaals achteraan hebben gezeten.
-- 2. `bijgewerkt_op` werd alleen door saveContent gezet. Elke wijziging via SQL
--    liet de datum op de oude waarde staan, dus "laatst bijgewerkt" in de admin
--    loog. Nu doet de database het.
-- 3. `created_at` bestond niet en is achteraf niet te reconstrueren.
--
-- Controleer eerst dat er geen onverwachte statuswaarden staan. Levert deze
-- query rijen op, voer de rest dan NIET uit maar meld wat je ziet — anders
-- faalt de constraint halverwege.

do $$
declare
  t text;
  n bigint;
begin
  foreach t in array array[
    'cms_paginas','cms_cases','cms_diensten','cms_sectoren','cms_artikelen',
    'cms_vacatures','cms_teamleden','cms_proposities','cms_services'
  ]
  loop
    execute format('select count(*) from public.%I where status not in (''live'',''concept'')', t)
      into n;
    if n > 0 then
      raise exception 'Tabel % heeft % rij(en) met een onverwachte status', t, n;
    end if;
  end loop;
end $$;

-- Zet bijgewerkt_op bij elke update, ongeacht wie of wat de rij aanpast.
create or replace function public.zet_bijgewerkt_op()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.bijgewerkt_op = now();
  return new;
end;
$$;

do $$
declare
  t text;
begin
  foreach t in array array[
    'cms_paginas','cms_cases','cms_diensten','cms_sectoren','cms_artikelen',
    'cms_vacatures','cms_teamleden','cms_proposities','cms_services'
  ]
  loop
    execute format(
      'alter table public.%I add column if not exists created_at timestamptz not null default now()',
      t
    );

    execute format(
      'alter table public.%I drop constraint if exists %I',
      t, t || '_status_check'
    );
    execute format(
      'alter table public.%I add constraint %I check (status in (''live'', ''concept''))',
      t, t || '_status_check'
    );

    execute format('drop trigger if exists %I on public.%I', t || '_bijgewerkt_op', t);
    execute format(
      'create trigger %I before update on public.%I
         for each row execute function public.zet_bijgewerkt_op()',
      t || '_bijgewerkt_op', t
    );
  end loop;
end $$;

-- Controle: elke tabel hoort nu een check-constraint, een trigger en created_at
-- te hebben. Negen regels verwacht.
select
  c.relname as tabel,
  (select count(*) from pg_constraint x
     where x.conrelid = c.oid and x.contype = 'c' and x.conname like '%\_status\_check') as status_check,
  (select count(*) from pg_trigger g
     where g.tgrelid = c.oid and not g.tgisinternal) as triggers,
  (select count(*) from information_schema.columns k
     where k.table_name = c.relname and k.column_name = 'created_at') as created_at
from pg_class c
join pg_namespace n on n.oid = c.relnamespace
where n.nspname = 'public' and c.relname like 'cms\_%'
order by c.relname;
