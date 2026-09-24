import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Icon, type IconName } from '@/components/Icon';
import { Colors, Radius, Shadow, Space, Type } from '@/lib/theme';

/** Home quick-access tile: a 48px primary-fixed circle with a primary icon, label below. */
export function QuickTile({ icon, label, onPress }: { icon: IconName; label: string; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => [styles.tile, pressed && styles.pressed]}
    >
      <View style={styles.circle}>
        <Icon name={icon} size={24} color={Colors.primary} />
      </View>
      <Text style={styles.label} numberOfLines={1}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: Radius.base,
    backgroundColor: Colors.surfaceContainerLowest,
    ...Shadow.card,
  },
  pressed: { transform: [{ scale: 0.95 }] },
  circle: {
    width: 48,
    height: 48,
    borderRadius: Radius.full,
    backgroundColor: Colors.primaryFixed,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: { ...Type.labelMd, color: Colors.onSurface, marginTop: Space.sm + 2 },
});
