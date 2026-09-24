import { Pressable, StyleSheet, Text, View } from 'react-native';

import { CoverArt } from '@/components/CoverArt';
import { Icon } from '@/components/Icon';
import { formatClock } from '@/lib/format';
import { Colors, Radius, Space, Type } from '@/lib/theme';

/**
 * Playlist row from the export: 48px circular cover, title, "mm:ss • first
 * reference", and a play icon. Unknown durations are omitted, never shown as 0:00.
 */
export function ConfessionRow({
  id,
  title,
  durationSeconds,
  reference,
  onPlay,
}: {
  id: string;
  title: string;
  durationSeconds: number | null;
  reference: string | null;
  onPlay: () => void;
}) {
  const meta = [formatClock(durationSeconds), reference].filter(Boolean).join(' • ');
  return (
    <Pressable
      onPress={onPlay}
      accessibilityRole="button"
      accessibilityLabel={`Play ${title}`}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
    >
      <View style={styles.left}>
        <CoverArt id={id} width={48} height={48} radius={Radius.full} />
        <View style={styles.text}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          {meta ? <Text style={styles.meta}>{meta}</Text> : null}
        </View>
      </View>
      <View style={styles.play} accessible={false}>
        <Icon name="play-arrow" size={24} color={Colors.tertiary} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: Radius.xl,
  },
  pressed: { backgroundColor: Colors.surfaceContainerLowest },
  left: { flexDirection: 'row', alignItems: 'center', gap: 14, flex: 1, minWidth: 0 },
  text: { flex: 1, minWidth: 0 },
  title: { ...Type.headlineSm, color: Colors.onSurface },
  meta: { ...Type.bodySm, color: Colors.tertiary, marginTop: 2 },
  play: { width: 40, height: 40, borderRadius: Radius.full, alignItems: 'center', justifyContent: 'center', marginLeft: Space.sm },
});
