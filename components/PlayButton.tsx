import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Spacing, useTheme } from '@/lib/theme';

/**
 * Phase 1 placeholder. Audio playback arrives with the Cloudflare R2 phase, so the button
 * is rendered disabled and says so, rather than being hidden.
 */
export function PlayButton() {
  const colors = useTheme();
  return (
    <View style={styles.wrap}>
      <Pressable
        disabled
        accessibilityRole="button"
        accessibilityLabel="Play"
        accessibilityState={{ disabled: true }}
        accessibilityHint="Audio playback is not available yet"
        style={[styles.button, { backgroundColor: colors.disabled }]}
      >
        <Text style={[styles.icon, { color: colors.disabledText }]}>▶</Text>
        <Text style={[styles.label, { color: colors.disabledText }]}>Play</Text>
      </Pressable>
      <Text style={[styles.caption, { color: colors.textSecondary }]}>Audio coming soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'flex-start', gap: Spacing.xs },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm + 4,
    borderRadius: 999,
  },
  icon: { fontSize: 14 },
  label: { fontSize: 16, fontWeight: '600' },
  caption: { fontSize: 13 },
});
