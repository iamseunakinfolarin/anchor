import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Icon } from '@/components/Icon';
import { PlayCircle } from '@/components/PlayCircle';
import { wholeMinutes } from '@/lib/format';
import { Colors, Radius, Shadow, Space, Type } from '@/lib/theme';

/**
 * Today's Focus: the daily confession. The duration pill only appears when the
 * duration is actually known — never a guessed or zero value.
 */
export function TodayFocusCard({
  title,
  durationSeconds,
  onPlay,
}: {
  title: string;
  durationSeconds: number | null;
  onPlay: () => void;
}) {
  return (
    <Pressable
      onPress={onPlay}
      accessibilityRole="button"
      accessibilityLabel={`Play today's focus: ${title}`}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.left}>
        <PlayCircle size={40} label={`Play ${title}`} />
        <View style={styles.text}>
          <Text style={styles.eyebrow}>{'TODAY\u2019S FOCUS'}</Text>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
        </View>
      </View>
      {durationSeconds !== null ? (
        <View style={styles.pill}>
          <Icon name="schedule" size={16} color={Colors.tertiary} />
          <Text style={styles.pillText}>{wholeMinutes(durationSeconds)}m</Text>
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Space.sm,
    padding: Space.md,
    borderRadius: Radius.base,
    backgroundColor: Colors.surfaceContainerLowest,
    ...Shadow.card,
  },
  pressed: { backgroundColor: Colors.surfaceContainerLow },
  left: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1, minWidth: 0 },
  text: { flex: 1, minWidth: 0 },
  eyebrow: { ...Type.labelSm, color: Colors.primary },
  title: { ...Type.headlineSm, color: Colors.onSurface },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: Radius.full,
    backgroundColor: Colors.surfaceContainer,
  },
  pillText: { ...Type.labelSm, color: Colors.tertiary },
});
