import { Stack, useLocalSearchParams } from 'expo-router';
import { useCallback } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Player } from '@/components/Player';
import { ScreenState } from '@/components/ScreenState';
import { ScriptureList } from '@/components/ScriptureList';
import { formatDuration } from '@/lib/format';
import { fetchConfession } from '@/lib/queries';
import { Colors, Spacing, TypeScale } from '@/lib/theme';
import { useAsync } from '@/lib/useAsync';
import { usePlayer } from '@/lib/usePlayer';

export default function ConfessionScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const load = useCallback(() => fetchConfession(id), [id]);
  const state = useAsync(load);
  const confession = state.status === 'success' ? state.data : null;

  // Called unconditionally, before any early return below, and with stable
  // fallback args while loading. This is the one thing that must never move:
  // if the paper/ink branches further down were allowed to remount this hook,
  // switching state would restart the stream mid-playback. See lib/usePlayer.ts.
  const player = usePlayer(confession?.audio_url ?? null, confession?.title ?? '');
  const isPlaying = player.playing;

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

  const duration = formatDuration(confession.duration_seconds);
  const firstReference = confession.scriptures[0]?.reference ?? null;

  return (
    <>
      <Stack.Screen
        options={{
          // The dominant title already lives on-screen while playing; the
          // header keeps only a dark-tinted back affordance so navigation
          // never disappears.
          title: isPlaying ? '' : confession.title,
          headerStyle: { backgroundColor: isPlaying ? Colors.ink : Colors.paper },
          headerTintColor: isPlaying ? Colors.paper : Colors.ink,
        }}
      />
      <View style={[styles.screen, { backgroundColor: isPlaying ? Colors.ink : Colors.paper }]}>
        {isPlaying ? (
          <PlayingContent
            title={confession.title}
            description={confession.description}
            reference={firstReference}
            player={player}
          />
        ) : (
          <NotPlayingContent
            title={confession.title}
            duration={duration}
            description={confession.description}
            scriptures={confession.scriptures}
            player={player}
          />
        )}
      </View>
    </>
  );
}

/** Unchanged from before this phase, only re-plumbed onto the shared hook. */
function NotPlayingContent({
  title,
  duration,
  description,
  scriptures,
  player,
}: {
  title: string;
  duration: string | null;
  description: string | null;
  scriptures: import('@/lib/types').Scripture[];
  player: import('@/lib/usePlayer').PlayerState;
}) {
  return (
    <ScrollView
      style={{ backgroundColor: Colors.paper }}
      contentContainerStyle={styles.content}
      contentInsetAdjustmentBehavior="automatic"
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: Colors.ink }]} accessibilityRole="header">
          {title}
        </Text>
        {duration ? <Text style={[styles.meta, { color: Colors.stone }]}>{duration}</Text> : null}
      </View>

      <Player {...player} variant="light" />

      {description ? (
        <Text style={[styles.description, { color: Colors.ink }]}>{description}</Text>
      ) : null}

      <ScriptureList scriptures={scriptures} />
    </ScrollView>
  );
}

/**
 * The declaration screen. Title dominates in beacon caps, the confession's
 * own words follow in paper on ink, and the reference sits small and quiet
 * beneath. Space below the reference is left open for loop and sleep-timer
 * controls in a later phase — nothing is added there now.
 */
function PlayingContent({
  title,
  description,
  reference,
  player,
}: {
  title: string;
  description: string | null;
  reference: string | null;
  player: import('@/lib/usePlayer').PlayerState;
}) {
  return (
    <ScrollView
      style={{ backgroundColor: Colors.ink }}
      contentContainerStyle={styles.playingContent}
    >
      <Text style={styles.playingTitle} accessibilityRole="header">
        {title}
      </Text>
      {description ? <Text style={styles.playingBody}>{description}</Text> : null}
      {reference ? <Text style={styles.playingReference}>{reference}</Text> : null}

      <View style={styles.reserved} />

      <Player {...player} variant="dark" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { padding: Spacing.md, paddingBottom: Spacing.xl, gap: Spacing.lg },
  header: { gap: Spacing.xs },
  title: { fontSize: 28, fontWeight: '700', lineHeight: 34 },
  meta: { fontSize: 14, fontVariant: ['tabular-nums'] },
  description: { fontSize: 17, lineHeight: 26 },

  playingContent: {
    flexGrow: 1,
    padding: Spacing.lg,
    paddingTop: Spacing.xxl,
    paddingBottom: Spacing.xl,
  },
  playingTitle: {
    ...TypeScale.playingTitle,
    color: Colors.beacon,
    textTransform: 'uppercase',
    marginBottom: Spacing.lg,
  },
  playingBody: {
    ...TypeScale.playingBody,
    color: Colors.paper,
    marginBottom: Spacing.lg,
  },
  playingReference: {
    ...TypeScale.playingReference,
    color: Colors.stone,
  },
  // Reserved for a loop toggle and sleep timer in a later phase.
  reserved: { flexGrow: 1, minHeight: Spacing.xxl },
});
