-- De regel onder het open-sollicitatieformulier op /werken-bij ("Na je
-- sollicitatie neemt {naam} binnen twee werkdagen contact op. Een echt mens,
-- geen automatische afwijzing.") viel weg: hij herhaalde wat de bedankstaat na
-- het versturen al zegt ("je hoort binnen drie werkdagen van ons, meestal van
-- {naam} zelf"), met een ander aantal werkdagen erbij, en de expliciete
-- geruststelling ("een echt mens, geen automatische afwijzing") was overdreven.
-- Het veld openSollNoot is uit VELDEN/TEKSTEN in lib/cms/paginas/werken-bij.ts
-- gehaald; deze sleutel in de live rij is nu een weessleutel.

update cms_paginas
set data = data - 'openSollNoot'
where slug = 'werken-bij'
  and data ? 'openSollNoot';

-- Controle: moet 0 rijen tonen.
select slug, data ? 'openSollNoot' as heeft_nog_openSollNoot
from cms_paginas
where slug = 'werken-bij';
