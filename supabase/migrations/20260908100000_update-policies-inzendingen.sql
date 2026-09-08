-- ============================================================
-- UPDATE-policies voor de inzendingentabellen.
--
-- De init-migratie gaf `authenticated` alleen select op contact_aanvragen en
-- sollicitaties. De admin wijzigt daar wél status, toewijzing en interne notitie
-- (app/admin/aanvragen/actions.ts, app/admin/sollicitaties/actions.ts). Zonder
-- UPDATE-policy raakt zo'n update 0 rijen zónder fout, dus de wijziging verdween
-- stil. Anon houdt alleen insert; lezen en wijzigen blijft staf-only.
-- ============================================================

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'contact_aanvragen'
      and policyname = 'auth kan contactaanvragen bijwerken'
  ) then
    create policy "auth kan contactaanvragen bijwerken"
      on public.contact_aanvragen for update
      to authenticated
      using (true) with check (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'sollicitaties'
      and policyname = 'auth kan sollicitaties bijwerken'
  ) then
    create policy "auth kan sollicitaties bijwerken"
      on public.sollicitaties for update
      to authenticated
      using (true) with check (true);
  end if;
end $$;
