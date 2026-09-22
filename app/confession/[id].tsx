import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { PlayerHero } from '@/components/PlayerHero';
import { ScreenState } from '@/components/ScreenState';
import { ScriptureList } from '@/components/ScriptureList';
import { fetchConfession, fetchConfessionsByCategory } from '@/lib/queries';
import { Colors, Spacing, TypeScale } from '@/lib/theme';
import { useAsync } from '@/lib/useAsync';
import { usePlayer } from '@/lib/usePlayer';

export default function ConfessionScreen() {
  const { id, categoryId } = useLocalSearchParams<{ id: string; categoryId?: string }>();
  const router = useRouter();

  const load = useCallback(async () => {
    // The category's ordered list is fetched only when we know which category
    // this confession was opened from — a confession can belong to more than
    // one, so "previous/next" only makes sense relative to that one list.
    const [confession, siblings] = await Promise.all([
      fetchConfession(id),
      categoryId ? fetchConfessionsByCategory(categoryId) : Promise.resolve(null),
    ]);
    return { confession, siblings };
  }, [id, categoryId]);
  const state = useAsync(load);
  const confession = state.status === 'success' ? state.data.confession : null;

  // Called unconditionally, before any early return below, with stable
  // fallback args while loading. Nothing in this screen ever swaps this
  // hook's position in the tree, so the live audio connection is never
  // interrupted by a re-render.
  const player = usePlayer(confession?.audio_url ?? null, confession?.title ?? '');

  if (state.status === 'loading') return <ScreenState kind="loading" />;
  if (state.status === 'error') return <ScreenState kind="error" error={state.error} onRetry={state.reload} />;
  if (!confession) {
    return (
      <ScreenState
        kind="empty"
        title="Confession not found"
        message="This confession may have been unpublished."
      />
    );
  }

  const siblings = state.data.siblings;
  const index = siblings?.findIndex((c) => c.id === confession.id) ?? -1;
  const previousId = siblings && index > 0 ? siblings[index - 1].id : null;
  const nextId = siblings && index !== -1 && index < siblings.length - 1 ? siblings[index + 1].id : null;

  const goTo = (nextConfessionId: string) => {
    // replace, not push — tapping next repeatedly shouldn't grow an
    // ever-longer back stack; back should return to the category list.
    router.replace({ pathname: '/confession/[id]', params: { id: nextConfessionId, categoryId } });
  };

  const firstReference = confession.scriptures[0]?.reference ?? null;

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView style={styles.screen} contentContainerStyle={styles.scrollContent}>
        <PlayerHero
          confessionId={confession.id}
          title={confession.title}
          reference={firstReference}
          player={player}
          onBack={() => router.back()}
          onPrevious={previousId ? () => goTo(previousId) : null}
          onNext={nextId ? () => goTo(nextId) : null}
        />

        <View style={styles.paper}>
          {confession.description ? (
            <>
              <Text style={styles.sectionHeading}>Confession</Text>
              <Text style={styles.description}>{confession.description}</Text>
            </>
          ) : null}
          <ScriptureList scriptures={confession.scriptures} />
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.ink },
  scrollContent: { flexGrow: 1 },
  paper: {
    backgroundColor: Colors.paper,
    padding: Spacing.lg,
    paddingBottom: Spacing.xl,
    gap: Spacing.lg,
  },
  sectionHeading: { ...TypeScale.eyebrow, color: Colors.stone },
  description: { fontSize: 17, lineHeight: 26, color: Colors.ink, marginTop: -Spacing.sm },
});
