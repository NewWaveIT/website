-- Inzendingen kunnen alleen nog via de server action binnenkomen (9 sep 2026).
--
-- Het probleem: `anon` mocht rechtstreeks inserten in contact_aanvragen en
-- sollicitaties, en uploaden naar de cv-bucket. De anon-sleutel staat in elke
-- browser, dus iedereen kon met een enkele HTTP-request naar de Supabase-API
-- de honeypot, de veldvalidatie én de rate-limiter overslaan — die zitten
-- alle drie in de server action. De bescherming gold dus alleen voor wie het
-- formulier netjes invulde.
--
-- Alle drie de formulieren schrijven al server-side, ook de bestandsupload
-- (app/(marketing)/vacatures/[slug]/actions.ts). Sinds
-- lib/supabase/inzendingen.ts doen ze dat met de service_role-sleutel, die
-- nooit de browser bereikt. `anon` heeft deze rechten daarom niet meer nodig.
--
-- Let op: hierdoor hebben de publieke formulieren SUPABASE_SERVICE_ROLE_KEY
-- nodig als server-env. Die stond al in de Vercel-configuratie (zie CLAUDE.md);
-- ontbreekt hij, dan geeft het formulier een nette foutmelding.

drop policy if exists "anon kan contactaanvraag indienen" on public.contact_aanvragen;
drop policy if exists "anon kan solliciteren" on public.sollicitaties;
drop policy if exists "anon uploadt sollicitatie-cv" on storage.objects;

-- Controle. Verwacht:
--   contact_aanvragen / sollicitaties : alleen policies voor 'authenticated'
--   storage.objects                   : geen enkele policy meer voor 'anon'
select tablename, policyname, roles, cmd
from pg_policies
where (schemaname = 'public' and tablename in ('contact_aanvragen', 'sollicitaties'))
   or (schemaname = 'storage' and tablename = 'objects')
order by tablename, policyname;
