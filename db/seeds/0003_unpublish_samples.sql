-- Anchor · unpublish the five Phase 1 sample confessions (data only, idempotent).
--
-- They carried invented durations and placeholder audio URLs that never play,
-- which breaks the charter's "no fabricated data" and "no non-functional
-- controls" rules. Rows are kept, not deleted; their invented durations are
-- cleared so nothing fabricated survives if one is ever republished.
-- Because this runs after 0001_seed.sql, a fresh `npm run db:apply` can never
-- bring them back as published.

update public.confessions
set is_published = false,
    duration_seconds = null
where id in (
  '00000000-0000-4000-8000-000000000001',
  '00000000-0000-4000-8000-000000000002',
  '00000000-0000-4000-8000-000000000003',
  '00000000-0000-4000-8000-000000000004',
  '00000000-0000-4000-8000-000000000005'
);
