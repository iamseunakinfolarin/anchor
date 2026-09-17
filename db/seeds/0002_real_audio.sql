-- Anchor · Phase 2a · three confessions with real Cloudflare R2 audio (idempotent)
-- Re-running always converges audio_url to the real files.

insert into public.confessions (id, title, audio_url, duration_seconds, description, sort_order) values
  ('00000000-0000-4000-8000-000000000006', 'God Gave Me Power',
   'https://pub-620bdc12913443d38af8db7eaa82a967.r2.dev/GodGaveMePower.mp3', null,
   'God has not given me a spirit of fear, but of power, of love, and of a sound mind.', 6),
  ('00000000-0000-4000-8000-000000000007', 'God Goes With Me',
   'https://pub-620bdc12913443d38af8db7eaa82a967.r2.dev/GodGoesWithMe.mp3', null,
   'The Lord goes before me. I am never alone and I will not be dismayed.', 7),
  ('00000000-0000-4000-8000-000000000008', 'God Is With Me',
   'https://pub-620bdc12913443d38af8db7eaa82a967.r2.dev/GodIsWithMe.mp3', null,
   'I fear no evil, for God is with me wherever I go.', 8)
on conflict (id) do update
  set audio_url = excluded.audio_url,
      title = excluded.title;

insert into public.scriptures (confession_id, reference, version, text, sort_order)
select v.confession_id, v.reference, v.version, v.text, v.sort_order
from (values
  ('00000000-0000-4000-8000-000000000006'::uuid, '2 Timothy 1:7', 'KJV', 'For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind.', 1),
  ('00000000-0000-4000-8000-000000000006'::uuid, 'Luke 10:19', 'KJV', 'Behold, I give unto you power to tread on serpents and scorpions, and over all the power of the enemy: and nothing shall by any means hurt you.', 2),
  ('00000000-0000-4000-8000-000000000007'::uuid, 'Deuteronomy 31:8', 'KJV', 'And the LORD, he it is that doth go before thee; he will be with thee, he will not fail thee, neither forsake thee: fear not, neither be dismayed.', 1),
  ('00000000-0000-4000-8000-000000000008'::uuid, 'Isaiah 41:10', 'KJV', 'Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee; yea, I will uphold thee with the right hand of my righteousness.', 1),
  ('00000000-0000-4000-8000-000000000008'::uuid, 'Psalm 23:4', 'KJV', 'Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me.', 2)
) as v(confession_id, reference, version, text, sort_order)
where not exists (
  select 1 from public.scriptures s
  where s.confession_id = v.confession_id and s.reference = v.reference
);

insert into public.confession_categories (confession_id, category_id)
select v.confession_id::uuid, c.id
from (values
  ('00000000-0000-4000-8000-000000000006', 'strengthened-by-god'),
  ('00000000-0000-4000-8000-000000000006', 'god-is-all-powerful'),
  ('00000000-0000-4000-8000-000000000007', 'courage-and-boldness'),
  ('00000000-0000-4000-8000-000000000007', 'peace-from-god'),
  ('00000000-0000-4000-8000-000000000008', 'faith-in-god'),
  ('00000000-0000-4000-8000-000000000008', 'security')
) as v(confession_id, slug)
join public.categories c on c.slug = v.slug
on conflict do nothing;
