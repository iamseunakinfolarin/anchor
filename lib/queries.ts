import { isConfigured, MISSING_CONFIG_MESSAGE } from '@/lib/env';
import { supabase } from '@/lib/supabase';
import type { Category, ConfessionWithScriptures } from '@/lib/types';

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

/** All categories, in display order. */
export async function fetchCategories(): Promise<Category[]> {
  assertConfigured();
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('sort_order', { ascending: true });
  if (error) throw new Error(error.message);
  return data;
}

/** One category by id, or null when it does not exist. */
export async function fetchCategory(id: string): Promise<Category | null> {
  assertConfigured();
  const { data, error } = await supabase.from('categories').select('*').eq('id', id).maybeSingle();
  if (error) throw new Error(error.message);
  return data;
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
