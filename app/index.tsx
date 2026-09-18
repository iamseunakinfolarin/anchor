import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AnchorMark } from '@/components/AnchorMark';
import { CategoryMedallion } from '@/components/CategoryMedallion';
import { ListRow, RowDivider } from '@/components/ListRow';
import { ScreenState } from '@/components/ScreenState';
import { TodayCard } from '@/components/TodayCard';
import { fetchCategories, fetchDailyConfession } from '@/lib/queries';
import { Colors, Spacing, TypeScale } from '@/lib/theme';
import { useAsync } from '@/lib/useAsync';

export default function HomeScreen() {
  const router = useRouter();

  const load = useCallback(async () => {
    const [categories, today] = await Promise.all([fetchCategories(), fetchDailyConfession()]);
    return { categories, today };
  }, []);
  const state = useAsync(load);

  const header = (
    <View style={styles.masthead}>
      <AnchorMark size={26} color={Colors.ink} />
      <Text style={styles.wordmark}>Anchor</Text>
    </View>
  );

  if (state.status === 'loading') return <ScreenState kind="loading" />;
  if (state.status === 'error') {
    return <ScreenState kind="error" error={state.error} onRetry={state.reload} />;
  }

  const { categories, today } = state.data;

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'left', 'right']}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View>
            {header}
            {today ? (
              <TodayCard
                confession={today}
                onPress={() =>
                  router.push({ pathname: '/confession/[id]', params: { id: today.id } })
                }
              />
            ) : null}
          </View>
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>No categories yet</Text>
            <Text style={styles.emptyBody}>Categories will appear here once they are added.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <ListRow
            leading={<CategoryMedallion slug={item.slug} />}
            title={item.name}
            onPress={() =>
              router.push({ pathname: '/category/[id]', params: { id: item.id, name: item.name } })
            }
          />
        )}
        ItemSeparatorComponent={RowDivider}
        contentContainerStyle={styles.list}
        style={styles.screen}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.paper },
  list: { paddingBottom: Spacing.xxl },
  masthead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm + 2,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.lg,
  },
  wordmark: { ...TypeScale.wordmark, color: Colors.ink },
  empty: { paddingHorizontal: Spacing.lg, paddingVertical: Spacing.xl, gap: Spacing.sm },
  emptyTitle: { ...TypeScale.rowTitle, color: Colors.ink },
  emptyBody: { ...TypeScale.meta, color: Colors.stone },
});
