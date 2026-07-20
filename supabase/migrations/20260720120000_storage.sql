-- The New Wave IT — Storage voor CMS-afbeeldingen
-- Publieke bucket 'content': iedereen leest, alleen ingelogde staff uploadt/beheert.

insert into storage.buckets (id, name, public)
values ('content', 'content', true)
on conflict (id) do nothing;

do $$
begin
  if not exists (select 1 from pg_policies where schemaname = 'storage' and policyname = 'publiek leest content') then
    create policy "publiek leest content" on storage.objects
      for select using (bucket_id = 'content');
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'storage' and policyname = 'auth uploadt content') then
    create policy "auth uploadt content" on storage.objects
      for insert to authenticated with check (bucket_id = 'content');
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'storage' and policyname = 'auth wijzigt content') then
    create policy "auth wijzigt content" on storage.objects
      for update to authenticated using (bucket_id = 'content');
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'storage' and policyname = 'auth verwijdert content') then
    create policy "auth verwijdert content" on storage.objects
      for delete to authenticated using (bucket_id = 'content');
  end if;
end $$;
