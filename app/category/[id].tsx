import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { ListRow, RowDivider } from '@/components/ListRow';
import { ScreenState } from '@/components/ScreenState';
import { formatDuration, toRoman } from '@/lib/format';
import { fetchCategory, fetchConfessionsByCategory } from '@/lib/queries';
import { Colors, Spacing, TypeScale } from '@/lib/theme';
import type { Category } from '@/lib/types';
import { useAsync } from '@/lib/useAsync';

/**
 * The category's own rank among all 14, in beacon, beside its name. Rendered
 * only once the category has loaded, since the numeral comes from
 * category.sort_order; before that the plain name paints instantly instead.
 */
function CategoryHeaderTitle({ category, fallbackName }: { category: Category | null; fallbackName: string }) {
  if (!category) {
    return <Text style={styles.headerName}>{fallbackName}</Text>;
  }
  return (
    <Text style={styles.headerTitle} numberOfLines={1}>
      <Text style={styles.headerRoman}>{toRoman(category.sort_order)}</Text>
      <Text style={styles.headerDot}> · </Text>
      <Text style={styles.headerName}>{category.name}</Text>
    </Text>
  );
}

export default function CategoryScreen() {
  const { id, name } = useLocalSearchParams<{ id: string; name?: string }>();
  const router = useRouter();

  const load = useCallback(async () => {
    const [category, confessions] = await Promise.all([
      fetchCategory(id),
      fetchConfessionsByCategory(id),
    ]);
    return { category, confessions };
  }, [id]);
  const state = useAsync(load);

  const category = state.status === 'success' ? state.data.category : null;

  let body;
  if (state.status === 'loading') {
    body = <ScreenState kind="loading" />;
  } else if (state.status === 'error') {
    body = <ScreenState kind="error" error={state.error} onRetry={state.reload} />;
  } else if (!category) {
    body = (
      <ScreenState
        kind="empty"
        title="Category not found"
        message="This category may have been removed."
      />
    );
  } else if (state.data.confessions.length === 0) {
    body = (
      <ScreenState
        kind="empty"
        title="No confessions in this category yet"
        message="Check back soon."
      />
    );
  } else {
    body = (
      <FlatList
        data={state.data.confessions}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <ListRow
            leading={
              <Text style={styles.liturgyNumber}>{`No. ${String(index + 1).padStart(2, '0')}`}</Text>
            }
            title={item.title}
            titleFace="serif"
            trailing={formatDuration(item.duration_seconds)}
            onPress={() =>
              router.push({ pathname: '/confession/[id]', params: { id: item.id, categoryId: id } })
            }
          />
        )}
        ItemSeparatorComponent={RowDivider}
        contentContainerStyle={styles.list}
        style={styles.screen}
      />
    );
  }

  return (
    <>
      <Stack.Screen
        options={{ headerTitle: () => <CategoryHeaderTitle category={category} fallbackName={name ?? ''} /> }}
      />
      <View style={styles.screen}>{body}</View>
    </>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.paper },
  list: { paddingTop: Spacing.sm, paddingBottom: Spacing.xxl },
  headerTitle: { flexShrink: 1 },
  headerRoman: { ...TypeScale.rowLabel, color: Colors.beacon, fontWeight: '700' },
  headerDot: { ...TypeScale.rowLabel, color: Colors.hairline },
  headerName: { ...TypeScale.rowLabel, color: Colors.ink },
  liturgyNumber: {
    ...TypeScale.meta,
    color: Colors.stone,
    fontVariant: ['tabular-nums'],
    width: 52,
  },
});
