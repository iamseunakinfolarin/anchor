import { isConfigured, MISSING_CONFIG_MESSAGE } from '@/lib/env';
import { supabase } from '@/lib/supabase';
import { buildCatalog, type Catalog, type CatalogConfession } from '@/lib/catalog';
import type { ConfessionWithScriptures } from '@/lib/types';

type ConfessionListRow = ConfessionWithScriptures & {
  confession_categories: { category_id: string }[];
};

export class ConfigError extends Error {
  constructor() {
    super(MISSING_CONFIG_MESSAGE);
    this.name = 'ConfigError';
  }
}

function assertConfigured(): void {
  if (!isConfigured) throw new ConfigError();
}

/**
 * Published confessions linked to a category, with their scriptures embedded.
 * The inner join on confession_categories filters to the category; the join rows are dropped
 * from the result so callers get plain ConfessionWithScriptures objects.
 */
export async function fetchConfessionsByCategory(
  categoryId: string,
): Promise<ConfessionWithScriptures[]> {
  assertConfigured();
  const { data, error } = await supabase
    .from('confessions')
    .select('*, scriptures(*), confession_categories!inner(category_id)')
    .eq('confession_categories.category_id', categoryId)
    .eq('is_published', true)
    .order('sort_order', { ascending: true })
    .order('sort_order', { referencedTable: 'scriptures', ascending: true });
  if (error) throw new Error(error.message);
  // Drop the join rows; the caller only needs the confession and its scriptures.
  return (data as ConfessionListRow[]).map(({ confession_categories: _links, ...confession }) => confession);
}

/** One published confession with its scriptures, or null when it does not exist. */
export async function fetchConfession(id: string): Promise<ConfessionWithScriptures | null> {
  assertConfigured();
  const { data, error } = await supabase
    .from('confessions')
    .select('*, scriptures(*)')
    .eq('id', id)
    .eq('is_published', true)
    .order('sort_order', { referencedTable: 'scriptures', ascending: true })
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data;
}

/**
 * Everything the browse screens need in two requests: categories, and every
 * published confession with its scriptures and category links. RLS only
 * exposes published confessions and their links to the anon key, so counts
 * derived from this are real published counts.
 */
export async function fetchCatalog(): Promise<Catalog> {
  assertConfigured();
  const [categories, confessions] = await Promise.all([
    supabase.from('categories').select('*').order('sort_order', { ascending: true }),
    supabase
      .from('confessions')
      .select('*, scriptures(*), confession_categories(category_id)')
      .eq('is_published', true)
      .order('sort_order', { ascending: true })
      .order('sort_order', { referencedTable: 'scriptures', ascending: true }),
  ]);
  if (categories.error) throw new Error(categories.error.message);
  if (confessions.error) throw new Error(confessions.error.message);

  const rows = (confessions.data as ConfessionListRow[]).map(
    ({ confession_categories: links, ...confession }): CatalogConfession => ({
      ...confession,
      categoryIds: links.map((l) => l.category_id),
    }),
  );
  return buildCatalog(categories.data, rows);
}
