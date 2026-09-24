import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { AppHeader } from '@/components/AppHeader';
import { CollectionTile } from '@/components/CollectionTile';
import { QuickTile } from '@/components/QuickTile';
import { ScreenState } from '@/components/ScreenState';
import { TodayFocusCard } from '@/components/TodayFocusCard';
import { featuredCategory, pickDaily } from '@/lib/catalog';
import { greeting } from '@/lib/format';
import { openCategory, openPlayer } from '@/lib/navigation';
import { Colors, Layout, Space, Type } from '@/lib/theme';
import { useCatalog } from '@/lib/useCatalog';

export default function HomeScreen() {
  const router = useRouter();
  const state = useCatalog();

  let body;
  if (state.status === 'loading') {
    body = <ScreenState kind="loading" />;
  } else if (state.status === 'error') {
    body = <ScreenState kind="error" error={state.error} onRetry={state.reload} />;
  } else {
    const catalog = state.data;
    const daily = pickDaily(catalog);
    const featured = featuredCategory(catalog, daily);
    const collections = catalog.categories.slice(0, 4);
    const rows = [collections.slice(0, 2), collections.slice(2, 4)].filter((r) => r.length > 0);

    body = (
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.quickRow}>
          <QuickTile icon="graphic-eq" label="Confessions" onPress={() => router.push('/search')} />
          <QuickTile icon="bookmark" label="Saved" onPress={() => router.navigate('/saved')} />
          <QuickTile icon="folder-special" label="Collections" onPress={() => router.navigate('/categories')} />
        </View>

        {daily ? (
          <TodayFocusCard
            title={daily.title}
            durationSeconds={daily.duration_seconds}
            onPlay={() => openPlayer(router, daily.id, featured?.id ?? null)}
          />
        ) : null}

        {/* Phase 3 slot: "Based on what you shared" and "Continue Declaring" rows go here. Nothing renders yet. */}

        {collections.length > 0 ? (
          <View style={styles.section}>
            <View style={styles.sectionHead}>
              <Text style={styles.sectionTitle}>Collections</Text>
              <Pressable onPress={() => router.navigate('/categories')} accessibilityRole="link" hitSlop={8}>
                <Text style={styles.viewAll}>View all</Text>
              </Pressable>
            </View>
            {rows.map((row, i) => (
              <View key={i} style={styles.gridRow}>
                {row.map((cat) => (
                  <CollectionTile
                    key={cat.id}
                    id={cat.id}
                    name={cat.name}
                    count={cat.count}
                    featured={cat.id === featured?.id}
                    onPress={() => openCategory(router, cat.id)}
                  />
                ))}
                {row.length === 1 ? <View style={styles.gridSpacer} /> : null}
              </View>
            ))}
          </View>
        ) : (
          <ScreenState
            kind="empty"
            title="No collections yet"
            message="Collections appear here as soon as they have a published confession."
          />
        )}
      </ScrollView>
    );
  }

  return (
    <View style={styles.screen}>
      <AppHeader title={greeting()} />
      {body}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.surface },
  content: {
    paddingHorizontal: Space.margin,
    paddingTop: Space.md,
    paddingBottom: Layout.tabBarClearance,
    gap: Space.lg,
  },
  quickRow: { flexDirection: 'row', gap: 12 },
  section: { gap: 12 },
  sectionHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  sectionTitle: { ...Type.headlineMd, color: Colors.onSurface },
  viewAll: { ...Type.labelMd, fontFamily: Type.labelLg.fontFamily, color: Colors.primary },
  gridRow: { flexDirection: 'row', gap: 14 },
  gridSpacer: { flex: 1 },
});
