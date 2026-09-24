import { Pressable, StyleSheet, Text, View } from 'react-native';

import { CoverArt } from '@/components/CoverArt';
import { Colors, Radius, Shadow, Space, Translucent, Type } from '@/lib/theme';

/**
 * Home's two-column collection tile: square cover at radius 48, name, and the
 * real confession count. The tag pill only appears on the featured category,
 * since categories carry no tag data to show otherwise.
 */
export function CollectionTile({
  id,
  name,
  count,
  featured,
  onPress,
}: {
  id: string;
  name: string;
  count: number;
  featured: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${name}, ${count} confessions`}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View>
        <CoverArt id={id} aspectRatio={1} radius={Radius.xl} />
        {featured ? (
          <View style={styles.tag}>
            <Text style={styles.tagText}>Featured</Text>
          </View>
        ) : null}
      </View>
      <View style={styles.text}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.count}>
          {count} {count === 1 ? 'Confession' : 'Confessions'}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 10,
    borderRadius: Radius.base,
    backgroundColor: Colors.surfaceContainerLowest,
    ...Shadow.card,
  },
  pressed: { transform: [{ scale: 0.98 }] },
  tag: {
    position: 'absolute',
    top: Space.sm,
    left: Space.sm,
    paddingHorizontal: Space.sm,
    paddingVertical: 2,
    borderRadius: Radius.full,
    backgroundColor: Translucent.tag,
  },
  tagText: { ...Type.labelSm, color: Colors.primary },
  text: { paddingHorizontal: Space.xs, paddingTop: 10 },
  name: { ...Type.headlineSm, color: Colors.onSurface },
  count: { ...Type.bodySm, color: Colors.tertiary },
});
