-- Anchor · Phase 1 · seed data (idempotent; safe to re-run)

insert into public.categories (name, slug, sort_order)
select v.name,
       trim(both '-' from regexp_replace(lower(replace(v.name, '&', 'and')), '[^a-z0-9]+', '-', 'g')),
       v.sort_order
from (values
  ('Courage and Boldness', 1),
  ('Faith in God', 2),
  ('God is All Powerful', 3),
  ('Growth and Progress', 4),
  ('Health', 5),
  ('Love of God', 6),
  ('My Identity is Christ', 7),
  ('Peace from God', 8),
  ('Prosperity & Wealth', 9),
  ('Purpose Driven Life', 10),
  ('Renewed Mind', 11),
  ('Security', 12),
  ('Strengthened by God', 13),
  ('Victory Over Flesh & Sin', 14)
) as v(name, sort_order)
on conflict (slug) do nothing;

insert into public.confessions (id, title, audio_url, duration_seconds, description, sort_order) values
  ('00000000-0000-4000-8000-000000000001', 'I Am Strong and Courageous',
   'https://audio.anchor.example/placeholder/i-am-strong-and-courageous.mp3', 95,
   'I am not afraid, because God is with me. He strengthens me and upholds me.', 1),
  ('00000000-0000-4000-8000-000000000002', 'Nothing Is Impossible With God',
   'https://audio.anchor.example/placeholder/nothing-is-impossible-with-god.mp3', 120,
   'Nothing is too hard for my God. I trust His power over every situation.', 2),
  ('00000000-0000-4000-8000-000000000003', 'By His Stripes I Am Healed',
   'https://audio.anchor.example/placeholder/by-his-stripes-i-am-healed.mp3', 88,
   'Healing belongs to me. My body responds to the word of God.', 3),
  ('00000000-0000-4000-8000-000000000004', 'My Mind Is Renewed',
   'https://audio.anchor.example/placeholder/my-mind-is-renewed.mp3', 140,
   'I think God''s thoughts. My mind is renewed by His word daily.', 4),
  ('00000000-0000-4000-8000-000000000005', 'The Peace of God Guards My Heart',
   'https://audio.anchor.example/placeholder/the-peace-of-god-guards-my-heart.mp3', 110,
   'I refuse anxiety. The peace of God keeps my heart and mind.', 5)
on conflict (id) do nothing;

insert into public.scriptures (confession_id, reference, version, text, sort_order)
select v.confession_id, v.reference, v.version, v.text, v.sort_order
from (values
  ('00000000-0000-4000-8000-000000000001'::uuid, 'Isaiah 41:10',    'KJV', 'Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee; yea, I will uphold thee with the right hand of my righteousness.', 1),
  ('00000000-0000-4000-8000-000000000001'::uuid, 'Joshua 1:9',      'KJV', 'Have not I commanded thee? Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest.', 2),
  ('00000000-0000-4000-8000-000000000002'::uuid, 'Luke 1:37',       'KJV', 'For with God nothing shall be impossible.', 1),
  ('00000000-0000-4000-8000-000000000002'::uuid, 'Jeremiah 32:27',  'KJV', 'Behold, I am the LORD, the God of all flesh: is there any thing too hard for me?', 2),
  ('00000000-0000-4000-8000-000000000003'::uuid, 'Isaiah 53:5',     'KJV', 'But he was wounded for our transgressions, he was bruised for our iniquities: the chastisement of our peace was upon him; and with his stripes we are healed.', 1),
  ('00000000-0000-4000-8000-000000000003'::uuid, '1 Peter 2:24',    'KJV', 'Who his own self bare our sins in his own body on the tree, that we, being dead to sins, should live unto righteousness: by whose stripes ye were healed.', 2),
  ('00000000-0000-4000-8000-000000000004'::uuid, 'Romans 12:2',     'KJV', 'And be not conformed to this world: but be ye transformed by the renewing of your mind, that ye may prove what is that good, and acceptable, and perfect, will of God.', 1),
  ('00000000-0000-4000-8000-000000000005'::uuid, 'Philippians 4:7', 'KJV', 'And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus.', 1),
  ('00000000-0000-4000-8000-000000000005'::uuid, 'John 14:27',      'KJV', 'Peace I leave with you, my peace I give unto you: not as the world giveth, give I unto you. Let not your heart be troubled, neither let it be afraid.', 2)
) as v(confession_id, reference, version, text, sort_order)
where not exists (
  select 1 from public.scriptures s
  where s.confession_id = v.confession_id and s.reference = v.reference
);

insert into public.confession_categories (confession_id, category_id)
select v.confession_id::uuid, c.id
from (values
  ('00000000-0000-4000-8000-000000000001', 'courage-and-boldness'),
  ('00000000-0000-4000-8000-000000000001', 'strengthened-by-god'),
  ('00000000-0000-4000-8000-000000000002', 'god-is-all-powerful'),
  ('00000000-0000-4000-8000-000000000002', 'faith-in-god'),
  ('00000000-0000-4000-8000-000000000003', 'health'),
  ('00000000-0000-4000-8000-000000000004', 'renewed-mind'),
  ('00000000-0000-4000-8000-000000000004', 'my-identity-is-christ'),
  ('00000000-0000-4000-8000-000000000005', 'peace-from-god'),
  ('00000000-0000-4000-8000-000000000005', 'security')
) as v(confession_id, slug)
join public.categories c on c.slug = v.slug
on conflict do nothing;
