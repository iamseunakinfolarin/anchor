import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { useEffect } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

import { formatDuration } from '@/lib/format';
import { Spacing, useTheme } from '@/lib/theme';

interface PlayerProps {
  title: string;
  audioUrl: string | null;
}

/**
 * Single-confession player: play/pause, buffering indicator, elapsed and total time.
 * Duration comes from the stream at runtime, not from the database.
 * Confessions without audio render a disabled control instead.
 */
export function Player({ title, audioUrl }: PlayerProps) {
  if (!audioUrl) return <DisabledPlayer caption="Audio coming soon" />;
  return <StreamingPlayer title={title} audioUrl={audioUrl} />;
}

function StreamingPlayer({ title, audioUrl }: { title: string; audioUrl: string }) {
  const colors = useTheme();
  const player = useAudioPlayer({ uri: audioUrl });
  const status = useAudioPlayerStatus(player);

  useEffect(() => {
    const p = player;
    return () => {
      // The hook releases the player on unmount; drop the media notification with it.
      try {
        p.clearLockScreenControls();
      } catch {
        // Player already released — nothing to clear.
      }
    };
  }, [player]);

  const failed = status.error !== null;
  const busy = status.isBuffering && !failed;
  const hasDuration = status.isLoaded && status.duration > 0;
  const finished =
    status.didJustFinish || (hasDuration && status.currentTime >= status.duration - 0.05);

  const onToggle = () => {
    if (status.playing) {
      player.pause();
      return;
    }
    if (finished) player.seekTo(0);
    player.play();
    // Required on Android for sustained background playback, and what puts the
    // confession title with a play/pause control on the notification / lock screen.
    // Called on EVERY play press, not once: if a binding attempt fails transiently
    // (e.g. right after a cold start), the native connection stays retryable and the
    // next press recovers it. When already active this just refreshes the metadata.
    try {
      player.setActiveForLockScreen(
        true,
        { title, artist: 'Anchor' },
        { showSeekForward: false, showSeekBackward: false },
      );
    } catch {
      // Non-fatal: playback works without lock-screen controls; retried on next press.
    }
  };

  const progress = hasDuration ? Math.min(status.currentTime / status.duration, 1) : 0;

  return (
    <View style={styles.wrap}>
      <View style={styles.controls}>
        <Pressable
          onPress={onToggle}
          accessibilityRole="button"
          accessibilityLabel={status.playing ? 'Pause' : 'Play'}
          accessibilityState={{ busy }}
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: colors.accent, opacity: pressed ? 0.85 : 1 },
          ]}
        >
          {busy ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.icon}>{status.playing ? '❚❚' : '▶'}</Text>
          )}
        </Pressable>
        <View style={styles.timing}>
          <View style={[styles.track, { backgroundColor: colors.disabled }]}>
            <View
              style={[
                styles.fill,
                { backgroundColor: colors.accent, width: `${progress * 100}%` },
              ]}
            />
          </View>
          <Text style={[styles.time, { color: colors.textSecondary }]}>
            {hasDuration
              ? `${formatDuration(Math.floor(status.currentTime))} / ${formatDuration(Math.round(status.duration))}`
              : busy
                ? 'Buffering…'
                : ' '}
          </Text>
        </View>
      </View>
      {failed ? (
        <Text style={[styles.caption, { color: colors.textSecondary }]}>
          Audio unavailable. Check your connection and tap play to retry.
        </Text>
      ) : null}
    </View>
  );
}

function DisabledPlayer({ caption }: { caption: string }) {
  const colors = useTheme();
  return (
    <View style={styles.wrap}>
      <View style={styles.controls}>
        <Pressable
          disabled
          accessibilityRole="button"
          accessibilityLabel="Play"
          accessibilityState={{ disabled: true }}
          accessibilityHint="Audio playback is not available for this confession yet"
          style={[styles.button, { backgroundColor: colors.disabled }]}
        >
          <Text style={[styles.icon, { color: colors.disabledText }]}>▶</Text>
        </Pressable>
        <Text style={[styles.caption, { color: colors.textSecondary }]}>{caption}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: Spacing.sm },
  controls: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: { color: '#FFFFFF', fontSize: 18, fontWeight: '700' },
  timing: { flex: 1, gap: Spacing.xs },
  track: { height: 4, borderRadius: 2, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 2 },
  time: { fontSize: 13, fontVariant: ['tabular-nums'] },
  caption: { fontSize: 13 },
});
