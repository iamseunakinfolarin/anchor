import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { ConfessionRow } from '@/components/ConfessionRow';
import { Icon } from '@/components/Icon';
import { ScreenState } from '@/components/ScreenState';
import { SearchPillInput } from '@/components/SearchPill';
import { StackHeader } from '@/components/StackHeader';
import { firstCategoryOf, type Catalog } from '@/lib/catalog';
import { openPlayer } from '@/lib/navigation';
import { Colors, Space, Type } from '@/lib/theme';
import { useCatalog } from '@/lib/useCatalog';

/** Title, any scripture reference, or any linked category name — case-insensitive. */
function filterCatalog(catalog: Catalog, query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return catalog.confessions;
  const names = new Map(catalog.categories.map((c) => [c.id, c.name.toLowerCase()]));
  return catalog.confessions.filter(
    (c) =>
      c.title.toLowerCase().includes(q) ||
      c.scriptures.some((s) => s.reference.toLowerCase().includes(q)) ||
      c.categoryIds.some((id) => names.get(id)?.includes(q)),
  );
}

export default function SearchScreen() {
  const router = useRouter();
  const state = useCatalog();
  const [query, setQuery] = useState('');

  const results = useMemo(
    () => (state.status === 'success' ? filterCatalog(state.data, query) : []),
    [state, query],
  );

  let body;
  if (state.status === 'loading') {
    body = <ScreenState kind="loading" />;
  } else if (state.status === 'error') {
    body = <ScreenState kind="error" error={state.error} onRetry={state.reload} />;
  } else if (results.length === 0) {
    body = (
      <View style={styles.empty}>
        <Icon name="search-off" size={40} color={Colors.outline} />
        <Text style={styles.emptyTitle}>
          {query.trim() ? `No confessions match "${query.trim()}"` : 'No confessions yet'}
        </Text>
        {query.trim() ? (
          <Text style={styles.emptyBody}>{'Try a scripture reference like \u201cIsaiah 41\u201d or a category name.'}</Text>
        ) : null}
      </View>
    );
  } else {
    const catalog = state.data;
    body = (
      <FlatList
        data={results}
        keyExtractor={(c) => c.id}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <ConfessionRow
            id={item.id}
            title={item.title}
            durationSeconds={item.duration_seconds}
            reference={item.scriptures[0]?.reference ?? null}
            onPlay={() => openPlayer(router, item.id, firstCategoryOf(catalog, item))}
          />
        )}
      />
    );
  }

  return (
    <View style={styles.screen}>
      <StackHeader onBack={() => router.back()}>
        <SearchPillInput value={query} onChangeText={setQuery} />
      </StackHeader>
      {body}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.surface },
  list: { paddingHorizontal: Space.margin, paddingTop: Space.md, paddingBottom: Space.xl },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Space.xl, gap: Space.sm },
  emptyTitle: { ...Type.headlineSm, color: Colors.onSurface, textAlign: 'center' },
  emptyBody: { ...Type.bodyMd, color: Colors.tertiary, textAlign: 'center', maxWidth: 300 },
});
