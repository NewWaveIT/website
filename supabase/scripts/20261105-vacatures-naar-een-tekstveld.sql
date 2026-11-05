-- Vacatures van het oude model (losse intro + secties met bullets) naar het ene tekstveld.
--
-- De vacature-editor kent sinds 5 november 2026 één groot veld, `inhoud`, met koppen, alinea's
-- en opsommingen; de eerste alinea is de intro in de header. Een rij uit het oude model heeft
-- dat veld nog niet en blijft op de site werken via de oude weergave. Dit script zet zulke
-- rijen om, zodat ze in de nieuwe editor te bewerken zijn.
--
--   intro                 -> <p>intro</p>                    (de eerste alinea: de intro)
--   secties[].titel       -> <h2>titel</h2>
--   secties[].items[]     -> <ul><li><p>punt</p></li>…</ul>
--
-- Fase 1 van drie (data migreren -> code omzetten -> opruimen). De oude sleutels `intro` en
-- `secties` blijven bewust staan: het opruimen is een aparte stap, na de controle hieronder.
-- Idempotent: een rij die al `inhoud` heeft wordt niet aangeraakt. Status verandert niet.

update cms_vacatures v
set data = v.data || jsonb_build_object(
  'inhoud',
  -- De intro: als platte tekst in een alinea, of als HTML (uit de oude lichte editor) zoals hij is.
  case
    when coalesce(v.data->>'intro', '') = '' then ''
    when (v.data->>'intro') ~ '^\s*<p' then v.data->>'intro'
    else '<p>' || replace(replace(replace(v.data->>'intro', '&', '&amp;'), '<', '&lt;'), '>', '&gt;') || '</p>'
  end
  -- De secties, in hun oorspronkelijke volgorde, met per sectie een kop en een lijst.
  || coalesce((
    select string_agg(
      '<h2>' || replace(replace(replace(coalesce(s.sectie->>'titel', ''), '&', '&amp;'), '<', '&lt;'), '>', '&gt;') || '</h2>'
      || '<ul>' || coalesce((
        select string_agg(
          '<li><p>' || replace(replace(replace(p.punt, '&', '&amp;'), '<', '&lt;'), '>', '&gt;') || '</p></li>',
          '' order by p.n
        )
        from jsonb_array_elements_text(s.sectie->'items') with ordinality as p(punt, n)
      ), '') || '</ul>',
      '' order by s.o
    )
    from jsonb_array_elements(v.data->'secties') with ordinality as s(sectie, o)
  ), '')
)
where not (v.data ? 'inhoud')
  and (v.data ? 'intro' or v.data ? 'secties');

-- Controle: elke rij hoort nu `inhoud` te hebben, met een tekst die niet leeg is.
select slug, titel, status, data ? 'inhoud' as heeft_tekst, length(data->>'inhoud') as tekens
from cms_vacatures
order by volgorde, slug;
