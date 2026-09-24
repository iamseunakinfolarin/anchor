import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { ConfessionRow } from '@/components/ConfessionRow';
import { CoverArt } from '@/components/CoverArt';
import { Icon } from '@/components/Icon';
import { ScreenState } from '@/components/ScreenState';
import { StackHeader } from '@/components/StackHeader';
import { confessionsIn } from '@/lib/catalog';
import { totalSeconds, wholeMinutes } from '@/lib/format';
import { openPlayer } from '@/lib/navigation';
import { Colors, Radius, Shadow, Space, Type } from '@/lib/theme';
import { useCatalog } from '@/lib/useCatalog';

/** Category detail, styled from the export's Playlist screen. */
export default function CategoryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const state = useCatalog();

  let body;
  let title = '';
  if (state.status === 'loading') {
    body = <ScreenState kind="loading" />;
  } else if (state.status === 'error') {
    body = <ScreenState kind="error" error={state.error} onRetry={state.reload} />;
  } else {
    const catalog = state.data;
    const category = catalog.categories.find((c) => c.id === id);
    if (!category) {
      // Unknown id, or a category with no published confessions (hidden everywhere).
      body = (
        <ScreenState kind="empty" title="Nothing here yet" message="This category has no published confessions." />
      );
    } else {
      title = category.name;
      const items = confessionsIn(catalog, category.id);
      // Shown only when every duration is known; a partial sum would be invented.
      const total = totalSeconds(items.map((c) => c.duration_seconds));
      const label = [
        'Scripture Meditations',
        `${category.count} ${category.count === 1 ? 'Declaration' : 'Declarations'}`,
        total !== null ? `${wholeMinutes(total)} min` : null,
      ]
        .filter(Boolean)
        .join(' • ');

      body = (
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.hero}>
            <CoverArt id={category.id} aspectRatio={16 / 10} radius={Radius.lg} />
            <View style={styles.heroText}>
              <Text style={styles.name} accessibilityRole="header">
                {category.name}
              </Text>
              <Text style={styles.label}>{label}</Text>
            </View>
            <Pressable
              onPress={() => items[0] && openPlayer(router, items[0].id, category.id)}
              accessibilityRole="button"
              accessibilityLabel={`Play all ${category.name}`}
              style={({ pressed }) => [styles.playAll, pressed && styles.pressed]}
            >
              <Icon name="play-arrow" size={24} color={Colors.onPrimary} />
              <Text style={styles.playAllText}>Play all</Text>
            </Pressable>
          </View>

          <View>
            {items.map((c) => (
              <ConfessionRow
                key={c.id}
                id={c.id}
                title={c.title}
                durationSeconds={c.duration_seconds}
                reference={c.scriptures[0]?.reference ?? null}
                onPlay={() => openPlayer(router, c.id, category.id)}
              />
            ))}
          </View>
        </ScrollView>
      );
    }
  }

  return (
    <View style={styles.screen}>
      <StackHeader title={title} onBack={() => router.back()} />
      {body}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.surface },
  content: { paddingHorizontal: Space.margin, paddingTop: Space.md, paddingBottom: Space.xl, gap: Space.lg },
  hero: { gap: Space.md },
  heroText: { gap: Space.xs },
  name: { ...Type.headlineLg, color: Colors.onSurface },
  label: { ...Type.bodySm, color: Colors.tertiary },
  playAll: {
    alignSelf: 'flex-start',
    height: 52,
    paddingHorizontal: Space.lg,
    borderRadius: Radius.full,
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Space.sm,
    ...Shadow.glowLg,
  },
  pressed: { transform: [{ scale: 0.97 }] },
  playAllText: { ...Type.labelLg, color: Colors.onPrimary },
});
