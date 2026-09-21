import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

import { formatDuration } from '@/lib/format';
import type { PlayerState } from '@/lib/usePlayer';
import { Colors, Spacing } from '@/lib/theme';

interface PlayerProps extends PlayerState {
  /** 'light' for the paper screen, 'dark' for the ink playing screen. */
  variant: 'light' | 'dark';
}

/**
 * Purely presentational transport control: a play/pause button and a
 * progress bar. Holds no audio state itself — usePlayer supplies everything
 * here as props, so this component can be re-themed between the paper and
 * ink layouts without ever unmounting the underlying audio connection.
 */
export function Player({
  playing,
  busy,
  failed,
  hasDuration,
  currentTime,
  duration,
  progress,
  disabled,
  toggle,
  variant,
}: PlayerProps) {
  const dark = variant === 'dark';
  const buttonColor = disabled ? Colors.hairline : dark ? Colors.paper : Colors.ink;
  const glyphColor = disabled ? Colors.stone : dark ? Colors.ink : '#FFFFFF';
  const trackColor = dark ? '#3A352C' : Colors.hairline;
  const fillColor = dark ? Colors.paper : Colors.ink;
  const timeColor = Colors.stone;

  const button = (
    <Pressable
      onPress={toggle}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={playing ? 'Pause' : 'Play'}
      accessibilityState={{ disabled, busy }}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: buttonColor, opacity: pressed && !disabled ? 0.85 : 1 },
      ]}
    >
      {busy ? (
        <ActivityIndicator color={glyphColor} />
      ) : (
        <Text style={[styles.icon, { color: glyphColor }]}>{playing ? '❚❚' : '▶'}</Text>
      )}
    </Pressable>
  );

  // No audio: the original Phase 2a treatment — button plus a caption, no
  // track — is preserved exactly rather than growing a progress bar nobody
  // asked to see for a confession that can never play.
  if (disabled) {
    return (
      <View style={styles.wrap}>
        <View style={styles.controls}>
          {button}
          <Text style={[styles.caption, { color: timeColor }]}>Audio coming soon</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.wrap}>
      <View style={styles.controls}>
        {button}
        <View style={styles.timing}>
          <View style={[styles.track, { backgroundColor: trackColor }]}>
            <View style={[styles.fill, { backgroundColor: fillColor, width: `${progress * 100}%` }]} />
          </View>
          <Text style={[styles.time, { color: timeColor }]}>
            {hasDuration
              ? `${formatDuration(Math.floor(currentTime))} / ${formatDuration(Math.round(duration))}`
              : busy
                ? 'Buffering…'
                : ' '}
          </Text>
        </View>
      </View>
      {failed ? (
        <Text style={[styles.caption, { color: timeColor }]}>
          Audio unavailable. Check your connection and tap play to retry.
        </Text>
      ) : null}
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
  icon: { fontSize: 18, fontWeight: '700' },
  timing: { flex: 1, gap: Spacing.xs },
  track: { height: 4, borderRadius: 2, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 2 },
  time: { fontSize: 13, fontVariant: ['tabular-nums'] },
  caption: { fontSize: 13 },
});
