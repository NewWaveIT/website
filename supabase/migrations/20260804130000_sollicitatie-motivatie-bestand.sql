-- Sollicitaties: motivatie kan nu ook een geüpload bestand zijn (naast/i.p.v. de
-- vrije tekst), plus een optionele LinkedIn-/portfolio-link als laagdrempelig
-- alternatief voor een cv.
-- Bestandspaden wijzen naar de privébucket 'sollicitaties' (signed URL in de admin).

alter table public.sollicitaties
  add column if not exists motivatie_url text,
  add column if not exists link_url text;
