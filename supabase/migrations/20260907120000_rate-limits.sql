-- Server-side rate-limiting voor publieke formulieren (contact, sollicitaties,
-- inzichten-leads). Nodig sinds serverless functions geen geheugen delen tussen
-- invocations — in-memory tellers werken niet betrouwbaar op Vercel. Sleutel is
-- "<actie>:<ip>"; de functie is atomisch (één upsert) zodat gelijktijdige
-- verzoeken elkaar niet kunnen omzeilen.

create table if not exists public.rate_limits (
  key text primary key,
  count integer not null default 1,
  window_start timestamptz not null default now()
);

alter table public.rate_limits enable row level security;
-- Geen policies: alleen de SECURITY DEFINER-functie hieronder raakt deze tabel,
-- dus anon/authenticated hebben sowieso geen directe (insert/select/...) toegang.

create or replace function public.check_rate_limit(
  p_key text,
  p_max_attempts integer,
  p_window_seconds integer
) returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_count integer;
begin
  insert into public.rate_limits as rl (key, count, window_start)
  values (p_key, 1, now())
  on conflict (key) do update
    set count = case
          when rl.window_start < now() - make_interval(secs => p_window_seconds)
            then 1
          else rl.count + 1
        end,
        window_start = case
          when rl.window_start < now() - make_interval(secs => p_window_seconds)
            then now()
          else rl.window_start
        end
  returning rl.count into v_count;

  return v_count <= p_max_attempts;
end;
$$;

revoke all on function public.check_rate_limit(text, integer, integer) from public;
grant execute on function public.check_rate_limit(text, integer, integer) to anon, authenticated;
