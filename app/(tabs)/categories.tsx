import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

import { AppHeader } from '@/components/AppHeader';
import { CategoryCard } from '@/components/CategoryCard';
import { ScreenState } from '@/components/ScreenState';
import { SearchPillButton } from '@/components/SearchPill';
import { confessionsIn, featuredCategory, pickDaily } from '@/lib/catalog';
import { openCategory, openPlayer } from '@/lib/navigation';
import { Colors, Layout, Space } from '@/lib/theme';
import { useCatalog } from '@/lib/useCatalog';

export default function CategoriesScreen() {
  const router = useRouter();
  const state = useCatalog();

  let body;
  if (state.status === 'loading') {
    body = <ScreenState kind="loading" />;
  } else if (state.status === 'error') {
    body = <ScreenState kind="error" error={state.error} onRetry={state.reload} />;
  } else {
    const catalog = state.data;
    const featured = featuredCategory(catalog, pickDaily(catalog));
    body =
      catalog.categories.length === 0 ? (
        <ScreenState
          kind="empty"
          title="No categories yet"
          message="Categories appear here as soon as they have a published confession."
        />
      ) : (
        <View style={styles.feed}>
          {catalog.categories.map((cat) => (
            <CategoryCard
              key={cat.id}
              id={cat.id}
              name={cat.name}
              count={cat.count}
              featured={cat.id === featured?.id}
              onOpen={() => openCategory(router, cat.id)}
              onPlay={() => {
                const first = confessionsIn(catalog, cat.id)[0];
                if (first) openPlayer(router, first.id, cat.id);
              }}
            />
          ))}
        </View>
      );
  }

  return (
    <View style={styles.screen}>
      <AppHeader title="Start Your Confession" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <SearchPillButton onPress={() => router.push('/search')} />
        {body}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.surface },
  content: {
    flexGrow: 1,
    paddingHorizontal: Space.margin,
    paddingTop: Space.sm,
    paddingBottom: Layout.tabBarClearance,
    gap: Space.md,
  },
  feed: { gap: Space.lg },
});
