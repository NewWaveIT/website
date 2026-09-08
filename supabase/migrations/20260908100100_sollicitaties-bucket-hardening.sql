-- ============================================================
-- Bucket 'sollicitaties' hardenen.
--
-- De insert-policy laat anon uploaden (dat heeft het sollicitatieformulier
-- nodig), maar toetste alleen bucket_id. Omdat de anon-key publiek is, kon
-- iedereen rechtstreeks op de Storage-API willekeurige bestanden van
-- willekeurige grootte posten en zo de MIME-/8 MB-check in het formulier én de
-- rate-limiter omzeilen. Limieten op de bucket zelf gelden ook voor die route.
--
-- De waarden komen exact overeen met DOC_TYPES en MAX_DOC in
-- app/(marketing)/vacatures/[slug]/actions.ts — houd ze gelijk.
-- ============================================================

update storage.buckets
set
  file_size_limit = 8388608, -- 8 MB
  allowed_mime_types = array[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]
where id = 'sollicitaties';
