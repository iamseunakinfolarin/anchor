-- Anchor · Phase 1 · catalog schema
-- Apply with: node db/apply.mjs   (or paste into the Supabase SQL editor)

create table if not exists public.categories (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  slug        text not null unique,
  sort_order  int  not null default 0,
  description text null,
  created_at  timestamptz not null default now()
);

create table if not exists public.confessions (
  id               uuid primary key default gen_random_uuid(),
  title            text not null,
  audio_url        text null,
  duration_seconds int  null,
  description      text null,
  sort_order       int  not null default 0,
  is_published     boolean not null default true,
  created_at       timestamptz not null default now()
);

create table if not exists public.scriptures (
  id            uuid primary key default gen_random_uuid(),
  confession_id uuid not null references public.confessions(id) on delete cascade,
  reference     text not null,
  version       text null,
  text          text null,
  sort_order    int  not null default 0
);

create table if not exists public.confession_categories (
  confession_id uuid not null references public.confessions(id) on delete cascade,
  category_id   uuid not null references public.categories(id) on delete cascade,
  primary key (confession_id, category_id)
);

create index if not exists categories_sort_order_idx     on public.categories (sort_order);
create index if not exists scriptures_confession_idx     on public.scriptures (confession_id, sort_order);
create index if not exists confession_categories_cat_idx on public.confession_categories (category_id);
