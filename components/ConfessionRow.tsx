import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { formatDuration } from '@/lib/format';
import { Spacing, useTheme } from '@/lib/theme';
import type { ConfessionWithScriptures } from '@/lib/types';

export function ConfessionRow({ confession }: { confession: ConfessionWithScriptures }) {
  const colors = useTheme();
  const duration = formatDuration(confession.duration_seconds);
  const firstScripture = confession.scriptures[0]?.reference ?? null;

  return (
    <Link href={{ pathname: '/confession/[id]', params: { id: confession.id } }} asChild>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={confession.title}
        style={({ pressed }) => [styles.row, { backgroundColor: pressed ? colors.accentSoft : 'transparent' }]}
      >
        <View style={styles.text}>
          <Text style={[styles.title, { color: colors.text }]}>{confession.title}</Text>
          {firstScripture ? (
            <Text style={[styles.reference, { color: colors.accent }]}>{firstScripture}</Text>
          ) : null}
        </View>
        {duration ? <Text style={[styles.duration, { color: colors.textSecondary }]}>{duration}</Text> : null}
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    gap: Spacing.md,
  },
  text: { flex: 1, gap: 2 },
  title: { fontSize: 17, fontWeight: '600' },
  reference: { fontSize: 14 },
  duration: { fontSize: 14, fontVariant: ['tabular-nums'] },
});
