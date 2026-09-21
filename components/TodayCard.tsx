import { Pressable, StyleSheet, Text, View } from 'react-native';

import { formatDuration } from '@/lib/format';
import { Colors, HairlineWidth, Spacing, TypeScale } from '@/lib/theme';
import type { ConfessionWithScriptures } from '@/lib/types';

interface TodayCardProps {
  confession: ConfessionWithScriptures;
  onPress: () => void;
}

/**
 * The daily confession on Home. Beacon appears here and nowhere else on the
 * screen: once as the marker dot, once as the word. Everything else is ink and
 * stone. No card background, no shadow; a hairline rule closes the module.
 */
export function TodayCard({ confession, onPress }: TodayCardProps) {
  const duration = formatDuration(confession.duration_seconds);
  const reference = confession.scriptures[0]?.reference ?? null;
  const meta = [reference, duration].filter(Boolean).join('  ·  ');

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Today: ${confession.title}`}
      style={({ pressed }) => [styles.wrap, pressed ? styles.pressed : null]}
    >
      <View style={styles.tag}>
        <View style={styles.dot} />
        <Text style={styles.tagText}>Today</Text>
      </View>
      <Text style={styles.title}>{confession.title}</Text>
      {confession.description ? (
        <View style={styles.quote}>
          <View style={styles.quoteRule} />
          <Text style={styles.quoteText}>{confession.description}</Text>
        </View>
      ) : null}
      {meta ? <Text style={styles.meta}>{meta}</Text> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xl,
    gap: Spacing.sm,
    borderBottomWidth: HairlineWidth,
    borderBottomColor: Colors.hairline,
  },
  pressed: { backgroundColor: Colors.hairline },
  tag: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.beacon },
  tagText: { ...TypeScale.eyebrow, color: Colors.beacon },
  title: { ...TypeScale.title, color: Colors.ink },
  quote: { flexDirection: 'row', gap: Spacing.sm, paddingVertical: 2 },
  quoteRule: { width: 2, backgroundColor: Colors.hairline },
  quoteText: { ...TypeScale.body, color: Colors.ink, fontStyle: 'italic', flex: 1 },
  meta: { ...TypeScale.meta, color: Colors.stone },
});
