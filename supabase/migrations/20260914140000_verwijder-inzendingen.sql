-- ============================================================
-- DELETE-policies voor de inzendingentabellen (14 september 2026).
--
-- De admin kon een aanvraag of sollicitatie niet verwijderen: er was geen
-- DELETE-policy, en zonder policy raakt een delete 0 rijen zónder fout. Dat is
-- dezelfde valkuil als bij de UPDATE-policies in
-- 20260908100000_update-policies-inzendingen.sql, en de server actions vangen
-- hem op dezelfde manier af — met `.select()` erbij, zodat een stille
-- mislukking niet als succes gemeld wordt.
--
-- Verwijderen is staf-only: anon houdt uitsluitend insert (en sinds
-- 20260909180000_inzendingen-alleen-via-server.sql zelfs dat niet meer — die
-- inserts lopen via de service-rol).
--
-- De bijbehorende cv's staan in de privébucket 'sollicitaties'. Die mocht
-- `authenticated` al opruimen (20260804120000_sollicitatie-cv-storage.sql);
-- de server action haalt het bestand weg zodra de rij weg is.
-- ============================================================

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'contact_aanvragen'
      and policyname = 'auth kan contactaanvragen verwijderen'
  ) then
    create policy "auth kan contactaanvragen verwijderen"
      on public.contact_aanvragen for delete
      to authenticated
      using (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'sollicitaties'
      and policyname = 'auth kan sollicitaties verwijderen'
  ) then
    create policy "auth kan sollicitaties verwijderen"
      on public.sollicitaties for delete
      to authenticated
      using (true);
  end if;
end $$;
