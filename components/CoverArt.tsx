import { LinearGradient } from 'expo-linear-gradient';
import { Image, StyleSheet, Text, View, type DimensionValue } from 'react-native';

import { coverFor } from '@/lib/covers';
import { Colors, Radius, Space, Translucent, Type } from '@/lib/theme';

interface CoverArtProps {
  /** Confession or category id; the cover is chosen deterministically from it. */
  id: string;
  width?: DimensionValue;
  height?: DimensionValue;
  aspectRatio?: number;
  radius?: number;
  /** Player only (Phase 2): overlay the title in bold white uppercase over a dark bottom gradient. */
  title?: string;
}

export function CoverArt({ id, width = '100%', height, aspectRatio, radius = Radius.base, title }: CoverArtProps) {
  return (
    <View
      style={[
        styles.frame,
        { width, height, aspectRatio, borderRadius: radius },
      ]}
    >
      <Image source={coverFor(id)} style={StyleSheet.absoluteFill} resizeMode="cover" />
      {title ? (
        <>
          <LinearGradient
            colors={[Translucent.coverScrimTop, Translucent.coverScrimBottom]}
            locations={[0.4, 1]}
            style={StyleSheet.absoluteFill}
          />
          <Text style={styles.title} numberOfLines={3}>
            {title}
          </Text>
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  frame: { overflow: 'hidden', backgroundColor: Colors.surfaceContainerHigh, justifyContent: 'flex-end' },
  title: {
    ...Type.headlineMd,
    fontFamily: Type.headlineXl.fontFamily,
    color: Colors.onPrimary,
    textTransform: 'uppercase',
    padding: Space.md,
  },
});
