import type { Category, ConfessionWithScriptures } from '@/lib/types';

/** A published confession with the ids of every category it's linked to. */
export type CatalogConfession = ConfessionWithScriptures & { categoryIds: string[] };

/** A category plus the real count of its published confessions. */
export type CatalogCategory = Category & { count: number };

export interface Catalog {
  /** Only categories with at least one published confession, in sort order. */
  categories: CatalogCategory[];
  /** Published confessions, in sort order. */
  confessions: CatalogConfession[];
}

/**
 * Builds the catalog from raw rows. Empty categories are dropped here, once,
 * so Home, Categories and Search can never show one — and one reappears the
 * moment it gets a published confession, with no code change.
 */
export function buildCatalog(categories: Category[], confessions: CatalogConfession[]): Catalog {
  const counts = new Map<string, number>();
  for (const c of confessions) {
    for (const id of c.categoryIds) counts.set(id, (counts.get(id) ?? 0) + 1);
  }
  return {
    categories: categories
      .map((cat) => ({ ...cat, count: counts.get(cat.id) ?? 0 }))
      .filter((cat) => cat.count > 0),
    confessions,
  };
}

/** Confessions in a category, in the category's playlist order (sort_order). */
export function confessionsIn(catalog: Catalog, categoryId: string): CatalogConfession[] {
  return catalog.confessions.filter((c) => c.categoryIds.includes(categoryId));
}

/**
 * Today's Focus: deterministic by day of year across published confessions in
 * sort order. Changes once a day with no scheduled job and no writes.
 */
export function pickDaily(catalog: Catalog, now: Date = new Date()): CatalogConfession | null {
  const list = catalog.confessions;
  if (list.length === 0) return null;
  const startOfYear = Date.UTC(now.getUTCFullYear(), 0, 0);
  const dayOfYear = Math.floor((now.getTime() - startOfYear) / 86_400_000);
  return list[dayOfYear % list.length] ?? null;
}

/** The category Today's Focus belongs to: its first linked category by category sort order. */
export function featuredCategory(
  catalog: Catalog,
  daily: CatalogConfession | null,
): CatalogCategory | null {
  if (!daily) return null;
  return catalog.categories.find((cat) => daily.categoryIds.includes(cat.id)) ?? null;
}

/** First category (by sort order) a confession belongs to — passed to the player for prev/next. */
export function firstCategoryOf(catalog: Catalog, confession: CatalogConfession): string | null {
  return catalog.categories.find((cat) => confession.categoryIds.includes(cat.id))?.id ?? null;
}
