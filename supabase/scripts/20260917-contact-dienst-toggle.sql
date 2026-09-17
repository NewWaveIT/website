-- Contactformulier versimpeld: "Aantal deelnemers" is weg (overbodige
-- frictie), en de dienstkeuze staat nu standaard ingeklapt achter een
-- aanvinkbare toggle, zodat "plan een gesprek" zonder specifieke dienst net zo
-- simpel is als ermee. De velden veldGroep/veldGroepBij/hintGroep zijn uit
-- VELDEN/TEKSTEN in lib/cms/paginas/contact.ts gehaald; veldDienstToggle is
-- nieuw. Deze sleutels in de live rij zijn nu weessleutels resp. missen.

update cms_paginas
set data = data - 'veldGroep' - 'veldGroepBij' - 'hintGroep'
where slug = 'contact';

-- Controle: moet 0 tonen voor de oude sleutels, en de nieuwe sleutel mag
-- ontbreken (vulAan vult 'm dan stil aan uit de seed).
select
  slug,
  data ? 'veldGroep' as heeft_nog_veldGroep,
  data ? 'veldGroepBij' as heeft_nog_veldGroepBij,
  data ? 'hintGroep' as heeft_nog_hintGroep,
  data ? 'veldDienstToggle' as heeft_veldDienstToggle
from cms_paginas
where slug = 'contact';
