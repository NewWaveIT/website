-- Weessleutels in cms_paginas -- stap 3 van 3: controle
--
-- De home-rij had 23 sleutels terwijl het schema er 10 kent. Die dertien
-- stonden nooit in PAGE_FIELDS; ze komen uit een ontwerp van vóór de velden die
-- we eerder verwijderden. Geen pagina leest ze en de editor toont ze niet, want
-- die genereert zijn velden uit het schema. Ze staan er alleen.
--
-- Deze drift is niet met een unittest te vangen: tests/unit/cms-pages.spec.ts
-- vergelijkt code met schema, en de database zit daar niet bij.
--
-- De lijst hieronder is gegenereerd uit PAGE_FIELDS. Regenereer hem als het
-- schema wijzigt, anders ruimt stap 2 iets op dat wél gebruikt wordt.

-- in_database en in_schema horen op elke regel gelijk te zijn.

with schema_sleutels (slug, sleutels) as (
  values
    ('contact', array['heroTitleStart', 'heroAccent', 'heroLead', 'verwachtTitel', 'verwacht1Titel', 'verwacht1Tekst', 'verwacht2Titel', 'verwacht2Tekst', 'verwacht3Titel', 'verwacht3Tekst', 'ctaTitel']),
    ('diensten', array['heroTitleStart', 'heroAccent', 'heroTitleEnd', 'heroLead', 'basisKicker', 'basisTitel', 'basisTekst', 'basisRol1Label', 'basisRol1Naam', 'basisRol1Tekst', 'basisRol2Label', 'basisRol2Naam', 'basisRol2Tekst', 'basisRol3Label', 'basisRol3Naam', 'basisRol3Tekst', 'basisRol4Label', 'basisRol4Naam', 'basisRol4Tekst', 'basisPersoonRol', 'basisPersoonTekst', 'basisInzetLabel', 'basisInzetWaarde', 'basisPunt1', 'basisPunt2', 'basisPunt3', 'basisPunt4', 'basisCta', 'basisCtaAlt', 'instapKicker', 'instapTitel', 'instapIntro', 'verdiepingKicker', 'verdiepingTitel', 'verdiepingIntro', 'verdiepingRichtingTekst', 'verdiepingCapaciteitTekst', 'fase1Titel', 'fase1Tekst', 'fase2Titel', 'fase2Tekst', 'fase3Titel', 'fase3Tekst', 'fase4Titel', 'fase4Tekst', 'fase5Titel', 'fase5Tekst', 'ctaTitel']),
    ('diensten-ai', array['metaTitle', 'metaDescription', 'badgeLabel', 'heroTitleStart', 'heroLead', 'crossrefTitel', 'ctaTitel']),
    ('diensten-mendix', array['metaTitle', 'metaDescription', 'badgeLabel', 'heroTitleStart', 'heroLead', 'crossrefTitel', 'ctaTitel']),
    ('diensten-strategie', array['metaTitle', 'metaDescription', 'badgeLabel', 'heroTitleStart', 'heroLead', 'instapTitel', 'instapTekst', 'instapKnop', 'crossrefTitel', 'ctaTitel']),
    ('home', array['heroTitleStart', 'heroAccent', 'heroLead', 'ctaTitel', 'ctaKnop', 'waaromTitel', 'mensenKicker', 'mensenTitel', 'mensenP1', 'mensenP2']),
    ('over-ons', array['heroTitleStart', 'heroAccent', 'heroLead', 'missieTitel', 'missieP1', 'missieP2', 'teamTitel', 'teamP1', 'teamP2', 'ctaTitel', 'waardenKicker', 'waardenTitel', 'waarde1Titel', 'waarde1Tekst', 'waarde2Titel', 'waarde2Tekst', 'waarde3Titel', 'waarde3Tekst', 'waarde4Titel', 'waarde4Tekst']),
    ('sectoren', array['heroTitleStart', 'heroAccent', 'heroLead', 'werkwijzeKicker', 'werkwijzeTitel', 'wijze1Titel', 'wijze1Tekst', 'wijze2Titel', 'wijze2Tekst', 'wijze3Titel', 'wijze3Tekst', 'ctaTitel']),
    ('werken-bij', array['heroTitleStart', 'heroAccent', 'heroLead', 'groeiKicker', 'groeiTitel', 'groeiIntro', 'groei1Titel', 'groei1Tekst', 'groei2Titel', 'groei2Tekst', 'groei3Titel', 'groei3Tekst', 'tpKicker', 'tpTitel', 'tpIntro', 'tp1Titel', 'tp1Tekst', 'tp2Titel', 'tp2Tekst', 'tp3Titel', 'tp3Tekst', 'cultuurKicker', 'cultuurTitel', 'cultuurP', 'cultuur1', 'cultuur2', 'cultuur3', 'cultuur4', 'ctaTitel'])
)
select p.slug,
       (select count(*) from jsonb_object_keys(p.data)) as in_database,
       coalesce(array_length(s.sleutels, 1), 0)         as in_schema
  from cms_paginas p
  left join schema_sleutels s on s.slug = p.slug
 order by p.slug;
