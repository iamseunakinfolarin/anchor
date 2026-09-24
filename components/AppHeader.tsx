import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AnchorMark } from '@/components/AnchorMark';
import { Colors, Layout, Radius, Shadow, Space, Type } from '@/lib/theme';

/**
 * Header for the four tab screens: logo, a small uppercase "ANCHOR" eyebrow in
 * the outline color, and the screen title. No notification bell, no avatar.
 */
export function AppHeader({ title }: { title: string }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.wrap, { paddingTop: insets.top }]}>
      <View style={styles.row}>
        <View style={styles.logo}>
          <AnchorMark size={20} color={Colors.onSurface} />
        </View>
        <View style={styles.text}>
          <Text style={styles.eyebrow}>ANCHOR</Text>
          <Text style={styles.title} numberOfLines={1} accessibilityRole="header">
            {title}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { backgroundColor: Colors.surface, zIndex: 2, ...Shadow.header },
  row: {
    height: Layout.headerHeight,
    paddingHorizontal: Space.margin,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Space.sm,
  },
  logo: {
    width: 32,
    height: 32,
    borderRadius: Radius.full,
    backgroundColor: Colors.surfaceContainerLowest,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow.card,
  },
  text: { flex: 1, minWidth: 0 },
  eyebrow: { ...Type.labelSm, color: Colors.outline },
  title: { ...Type.headlineSm, color: Colors.onSurface },
});
