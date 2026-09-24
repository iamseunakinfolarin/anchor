import { Pressable, StyleSheet, Text, View } from 'react-native';

import { CoverArt } from '@/components/CoverArt';
import { PlayCircle } from '@/components/PlayCircle';
import { Colors, Radius, Shadow, Space, Translucent, Type } from '@/lib/theme';

/**
 * Categories feed card: 16:10 cover (radius 20 inside the radius-32 card,
 * the nested-corner look), the category name, and the charter's fixed label
 * with the real count. The play button starts the category's first confession.
 */
export function CategoryCard({
  id,
  name,
  count,
  featured,
  onOpen,
  onPlay,
}: {
  id: string;
  name: string;
  count: number;
  featured: boolean;
  onOpen: () => void;
  onPlay: () => void;
}) {
  return (
    <View style={styles.card}>
      {/* Cover area: the cover opens the category; the play button is its sibling, not a child. */}
      <View>
        <Pressable
          onPress={onOpen}
          accessibilityRole="button"
          accessibilityLabel={`${name}, ${count} declarations`}
          style={({ pressed }) => pressed && styles.pressed}
        >
          <CoverArt id={id} aspectRatio={16 / 10} radius={Radius.inner} />
          {featured ? (
            <View style={styles.featured}>
              <Text style={styles.featuredText}>FEATURED</Text>
            </View>
          ) : null}
        </Pressable>
        <View style={styles.play}>
          <PlayCircle size={40} onPress={onPlay} label={`Play ${name}`} />
        </View>
      </View>
      {/* Same action as the cover; hidden from screen readers so it isn't announced twice. */}
      <Pressable onPress={onOpen} accessible={false} importantForAccessibility="no-hide-descendants" style={styles.text}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.label} numberOfLines={1}>
          Scripture Meditations • {count} {count === 1 ? 'Declaration' : 'Declarations'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
    borderRadius: Radius.lg,
    backgroundColor: Colors.surfaceContainerLowest,
    ...Shadow.card,
  },
  pressed: { transform: [{ scale: 0.99 }] },
  featured: {
    position: 'absolute',
    top: 12,
    left: 12,
    paddingHorizontal: 12,
    paddingVertical: Space.xs,
    borderRadius: Radius.full,
    backgroundColor: Translucent.pill,
  },
  featuredText: { ...Type.labelSm, color: Colors.onSurface },
  play: { position: 'absolute', right: 12, bottom: 12 },
  text: { paddingTop: 14, paddingBottom: Space.xs, paddingHorizontal: 6 },
  name: { ...Type.headlineSm, color: Colors.onSurface },
  label: { ...Type.bodySm, color: Colors.tertiary },
});
