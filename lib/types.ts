/**
 * Row types for the Anchor catalog tables in Supabase.
 * Kept in sync by hand with db/migrations/0001_schema.sql.
 */

export interface Category {
  id: string;
  name: string;
  slug: string;
  sort_order: number;
  description: string | null;
  created_at: string;
}

export interface Confession {
  id: string;
  title: string;
  audio_url: string | null;
  duration_seconds: number | null;
  description: string | null;
  sort_order: number;
  is_published: boolean;
  created_at: string;
}

export interface Scripture {
  id: string;
  confession_id: string;
  reference: string;
  version: string | null;
  text: string | null;
  sort_order: number;
}

export interface ConfessionCategory {
  confession_id: string;
  category_id: string;
}

/** A confession with its scriptures embedded, as returned by the list and detail queries. */
export type ConfessionWithScriptures = Confession & { scriptures: Scripture[] };

type ReadOnlyTable<Row> = {
  Row: Row;
  Insert: never;
  Update: never;
  Relationships: [];
};

/**
 * Database shape passed to `createClient<Database>()`.
 * Insert and Update are `never`: the app holds only the anon key and RLS permits SELECT only.
 */
export interface Database {
  public: {
    Tables: {
      categories: ReadOnlyTable<Category>;
      confessions: ReadOnlyTable<Confession>;
      scriptures: ReadOnlyTable<Scripture>;
      confession_categories: ReadOnlyTable<ConfessionCategory>;
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
