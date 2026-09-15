import { useCallback } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { CategoryRow } from '@/components/CategoryRow';
import { ScreenState } from '@/components/ScreenState';
import { fetchCategories } from '@/lib/queries';
import { Spacing, useTheme } from '@/lib/theme';
import { useAsync } from '@/lib/useAsync';

export default function HomeScreen() {
  const colors = useTheme();
  const load = useCallback(() => fetchCategories(), []);
  const state = useAsync(load);

  if (state.status === 'loading') return <ScreenState kind="loading" />;
  if (state.status === 'error') return <ScreenState kind="error" error={state.error} onRetry={state.reload} />;
  if (state.data.length === 0) {
    return <ScreenState kind="empty" title="No categories yet" message="Categories will appear here once they are added." />;
  }

  return (
    <FlatList
      data={state.data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <CategoryRow category={item} />}
      ItemSeparatorComponent={() => <View style={[styles.separator, { backgroundColor: colors.border }]} />}
      contentContainerStyle={styles.list}
      style={{ backgroundColor: colors.background }}
    />
  );
}

const styles = StyleSheet.create({
  list: { paddingVertical: Spacing.sm },
  separator: { height: StyleSheet.hairlineWidth, marginLeft: Spacing.md },
});
