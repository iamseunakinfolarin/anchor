-- Anchor · Phase 1 · Row Level Security
-- Anonymous clients may SELECT only. No insert/update/delete policies exist,
-- and default write privileges are revoked as a second line of defence.

alter table public.categories            enable row level security;
alter table public.confessions           enable row level security;
alter table public.scriptures            enable row level security;
alter table public.confession_categories enable row level security;

revoke insert, update, delete, truncate on
  public.categories, public.confessions, public.scriptures, public.confession_categories
from anon, authenticated;

drop policy if exists "anon read categories" on public.categories;
create policy "anon read categories"
  on public.categories for select to anon using (true);

drop policy if exists "anon read published confessions" on public.confessions;
create policy "anon read published confessions"
  on public.confessions for select to anon using (is_published = true);

drop policy if exists "anon read scriptures of published confessions" on public.scriptures;
create policy "anon read scriptures of published confessions"
  on public.scriptures for select to anon
  using (exists (select 1 from public.confessions c
                 where c.id = scriptures.confession_id and c.is_published));

drop policy if exists "anon read links of published confessions" on public.confession_categories;
create policy "anon read links of published confessions"
  on public.confession_categories for select to anon
  using (exists (select 1 from public.confessions c
                 where c.id = confession_categories.confession_id and c.is_published));
