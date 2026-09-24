import { Pressable, StyleSheet, View } from 'react-native';

import { Icon } from '@/components/Icon';
import { Colors, Radius, Shadow } from '@/lib/theme';

const GLOW = { 40: Shadow.glowMd, 48: Shadow.glowMd, 64: Shadow.glowLg } as const;

/** The export's primary play button: solid primary circle, white icon, red glow. */
export function PlayCircle({
  size = 40,
  onPress,
  label,
}: {
  size?: 40 | 48 | 64;
  /** Omit when a parent control already performs the play action: renders visual-only, no nested button. */
  onPress?: () => void;
  label: string;
}) {
  if (!onPress) {
    return (
      <View style={[styles.circle, { width: size, height: size }, GLOW[size]]} accessible={false}>
        <Icon name="play-arrow" size={size / 2} color={Colors.onPrimary} />
      </View>
    );
  }
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      hitSlop={6}
      style={({ pressed }) => [
        styles.circle,
        { width: size, height: size },
        GLOW[size],
        pressed && styles.pressed,
      ]}
    >
      <Icon name="play-arrow" size={size / 2} color={Colors.onPrimary} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  circle: { borderRadius: Radius.full, backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center' },
  pressed: { transform: [{ scale: 0.95 }] },
});
