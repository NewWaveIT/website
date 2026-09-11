-- Resten in cms_diensten op concept zetten
--
-- Het contenttype `diensten` bedient sinds het vorige ontwerp alleen nog de drie
-- richting-hubs: /diensten/mendix, /diensten/ai en /diensten/strategie. De
-- dienstdetailpagina's zijn verhuisd naar cms_services. De oude rijen zijn nooit
-- opgeruimd; lib/diensten-detail-data.ts filtert ze er sindsdien stil uit.
--
-- Dit script zet ze op concept in plaats van ze te verwijderen: omkeerbaar, en
-- de admin toont ze dan nog wel zodat je kunt zien wat er was. Wil je ze echt
-- weg, dan is het daarna één delete op status = 'concept'.

-- 1 · Kijk eerst wat er staat. Draai dit apart en lees de uitkomst.
select slug,
       titel,
       status,
       bijgewerkt_op
  from cms_diensten
 order by (slug in ('mendix', 'ai', 'strategie')) desc,
          slug;

-- 2 · Pas hierna dit uit. Alles wat geen richting is, gaat op concept.
-- begin;
--
-- update cms_diensten
--    set status = 'concept',
--        bijgewerkt_op = now()
--  where slug not in ('mendix', 'ai', 'strategie')
--    and status = 'live';
--
-- -- Controle: alleen de drie richtingen staan nog live.
-- select status, count(*), string_agg(slug, ', ' order by slug)
--   from cms_diensten
--  group by status;
--
-- commit;
