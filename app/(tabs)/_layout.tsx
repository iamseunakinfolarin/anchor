import { BlurTargetView, BlurView } from 'expo-blur';
import { TabList, TabSlot, TabTrigger, Tabs } from 'expo-router/ui';
import { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TabButton } from '@/components/TabButton';
import { Colors, Layout, Radius, Shadow, Space, Translucent } from '@/lib/theme';

/**
 * The bottom navigation: always exactly four tabs. Detail screens and the
 * player are root-stack screens, so they push over this bar.
 *
 * Android's blur needs a target view that contains what sits behind the bar,
 * so the screens (TabSlot) are wrapped in a BlurTargetView and the BlurView
 * lives inside the TabList, outside that target.
 */
export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  const target = useRef<View>(null);

  return (
    <Tabs style={styles.root}>
      <BlurTargetView ref={target} style={styles.root}>
        <TabSlot />
      </BlurTargetView>
      <TabList style={[styles.bar, { paddingBottom: insets.bottom, height: Layout.tabBarHeight + insets.bottom }]}>
        <BlurView
          blurTarget={target}
          blurMethod="dimezisBlurViewSdk31Plus"
          intensity={40}
          tint="light"
          style={[StyleSheet.absoluteFill, styles.clip]}
        />
        <View style={[StyleSheet.absoluteFill, styles.clip, styles.fill]} pointerEvents="none" />
        <TabTrigger name="index" href="/" asChild>
          <TabButton icon="home" label="Home" />
        </TabTrigger>
        <TabTrigger name="categories" href="/categories" asChild>
          <TabButton icon="grid-view" label="Categories" />
        </TabTrigger>
        <TabTrigger name="saved" href="/saved" asChild>
          <TabButton icon="bookmark" label="Saved" />
        </TabTrigger>
        <TabTrigger name="settings" href="/settings" asChild>
          <TabButton icon="settings" label="Settings" />
        </TabTrigger>
      </TabList>
    </Tabs>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.surface },
  bar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: Space.margin,
    borderTopLeftRadius: Radius.lg,
    borderTopRightRadius: Radius.lg,
    // No overflow clip here: it could clip the upward dock shadow. The blur
    // and fill layers carry the rounded clip instead.
    ...Shadow.dock,
  },
  clip: { borderTopLeftRadius: Radius.lg, borderTopRightRadius: Radius.lg, overflow: 'hidden' },
  fill: { backgroundColor: Translucent.tabBar },
});
