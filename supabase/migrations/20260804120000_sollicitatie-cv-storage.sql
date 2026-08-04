-- ============================================================
-- Privébucket voor cv-uploads bij sollicitaties.
-- Anonieme bezoekers mogen uploaden (via het sollicitatieformulier);
-- alleen ingelogde staff mag lezen (via tijdelijke signed URLs).
-- ============================================================

insert into storage.buckets (id, name, public)
values ('sollicitaties', 'sollicitaties', false)
on conflict (id) do nothing;

do $$
begin
  -- Publiek formulier: iedereen mag een cv uploaden.
  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage' and policyname = 'anon uploadt sollicitatie-cv'
  ) then
    create policy "anon uploadt sollicitatie-cv" on storage.objects
      for insert to anon with check (bucket_id = 'sollicitaties');
  end if;

  -- Alleen ingelogde staff mag cv's lezen (nodig voor signed URLs).
  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage' and policyname = 'auth leest sollicitatie-cv'
  ) then
    create policy "auth leest sollicitatie-cv" on storage.objects
      for select to authenticated using (bucket_id = 'sollicitaties');
  end if;

  -- Staff mag opruimen.
  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage' and policyname = 'auth verwijdert sollicitatie-cv'
  ) then
    create policy "auth verwijdert sollicitatie-cv" on storage.objects
      for delete to authenticated using (bucket_id = 'sollicitaties');
  end if;
end $$;
