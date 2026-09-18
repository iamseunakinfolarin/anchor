import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import { ListRow, RowDivider } from '@/components/ListRow';
import { ScreenState } from '@/components/ScreenState';
import { formatDuration } from '@/lib/format';
import { fetchCategory, fetchConfessionsByCategory } from '@/lib/queries';
import { Colors, Spacing } from '@/lib/theme';
import { useAsync } from '@/lib/useAsync';

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

  // The name param gives an instant title; the loaded row corrects it if the param was absent.
  const title =
    state.status === 'success' && state.data.category ? state.data.category.name : (name ?? '');

  let body;
  if (state.status === 'loading') {
    body = <ScreenState kind="loading" />;
  } else if (state.status === 'error') {
    body = <ScreenState kind="error" error={state.error} onRetry={state.reload} />;
  } else if (!state.data.category) {
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
        renderItem={({ item }) => (
          <ListRow
            title={item.title}
            titleFace="serif"
            trailing={formatDuration(item.duration_seconds)}
            onPress={() =>
              router.push({ pathname: '/confession/[id]', params: { id: item.id } })
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
      <Stack.Screen options={{ title }} />
      {body}
    </>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.paper },
  list: { paddingTop: Spacing.sm, paddingBottom: Spacing.xxl },
});
