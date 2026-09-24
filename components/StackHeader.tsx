import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Icon } from '@/components/Icon';
import { Colors, Layout, Radius, Shadow, Space, Type } from '@/lib/theme';

/** Header for pushed screens, from the export's Playlist screen: back arrow and title. */
export function StackHeader({ title, onBack, children }: { title?: string; onBack: () => void; children?: ReactNode }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.wrap, { paddingTop: insets.top }]}>
      <View style={styles.row}>
        <Pressable
          onPress={onBack}
          accessibilityRole="button"
          accessibilityLabel="Back"
          hitSlop={8}
          style={({ pressed }) => [styles.back, pressed && styles.pressed]}
        >
          <Icon name="arrow-back" size={24} color={Colors.onSurface} />
        </Pressable>
        {children ?? (
          <Text style={styles.title} numberOfLines={1} accessibilityRole="header">
            {title}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { backgroundColor: Colors.surface, zIndex: 2, ...Shadow.header },
  row: {
    height: Layout.headerHeight,
    paddingHorizontal: Space.margin - Space.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Space.xs,
  },
  back: { width: 44, height: 44, borderRadius: Radius.full, alignItems: 'center', justifyContent: 'center' },
  pressed: { backgroundColor: Colors.surfaceContainer },
  title: { ...Type.headlineSm, color: Colors.onSurface, flex: 1 },
});
