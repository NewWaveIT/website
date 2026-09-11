-- Dode paginavelden opruimen
--
-- Vierentwintig sleutels in cms_paginas hoorden bij een vorig ontwerp en werden
-- nergens meer gerenderd. Een redacteur kon ze wél invullen en opslaan, waarna
-- er niets veranderde -- negentien daarvan op de homepage alleen. Ze zijn uit
-- PAGE_FIELDS gehaald; deze regels halen ze uit de rijen, zodat de data de code
-- volgt en de admin niets meer belooft wat de site niet waarmaakt.
--
-- tests/unit/cms-pages.spec.ts bewaakt vanaf nu beide richtingen: een veld dat
-- nergens gerenderd wordt, en een sleutel die een pagina leest maar die niet in
-- het schema staat.
--
-- Draai dit ná de deploy. De volgorde maakt niet uit: de code leest deze
-- sleutels toch niet meer.

begin;

update cms_paginas
   set data = data - array['heroKicker', 'heroCtaVideo', 'statementKicker', 'statementTitel', 'statementBody', 'heroKickerMobiel', 'heroLeadMobiel', 'waaromKicker', 'waarom1Titel', 'waarom1Tekst', 'waarom2Titel', 'waarom2Tekst', 'waarom3Titel', 'waarom3Tekst', 'waarom4Titel', 'waarom4Tekst', 'joinusKicker', 'joinusTitel', 'joinusLead'],
       bijgewerkt_op = now()
 where slug = 'home';

update cms_paginas
   set data = data - array['heroLeadMobiel'],
       bijgewerkt_op = now()
 where slug = 'over-ons';

update cms_paginas
   set data = data - array['heroLeadMobiel'],
       bijgewerkt_op = now()
 where slug = 'contact';

update cms_paginas
   set data = data - array['heroLeadMobiel'],
       bijgewerkt_op = now()
 where slug = 'diensten';

update cms_paginas
   set data = data - array['heroLeadMobiel'],
       bijgewerkt_op = now()
 where slug = 'sectoren';

update cms_paginas
   set data = data - array['heroLeadMobiel'],
       bijgewerkt_op = now()
 where slug = 'werken-bij';

-- Controle: geen van de opgeruimde sleutels komt nog voor.
select slug,
       (select count(*)
          from jsonb_object_keys(data) k
         where k in ('heroKicker', 'heroCtaVideo', 'statementKicker', 'statementTitel',
                     'statementBody', 'heroKickerMobiel', 'heroLeadMobiel', 'waaromKicker',
                     'waarom1Titel', 'waarom1Tekst', 'waarom2Titel', 'waarom2Tekst',
                     'waarom3Titel', 'waarom3Tekst', 'waarom4Titel', 'waarom4Tekst',
                     'joinusKicker', 'joinusTitel', 'joinusLead')) as resten,
       (select count(*) from jsonb_object_keys(data)) as velden_over
  from cms_paginas
 order by slug;

commit;
