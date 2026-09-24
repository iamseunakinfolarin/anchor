import { StyleSheet, Text, View } from 'react-native';

import { AppHeader } from '@/components/AppHeader';
import { Icon } from '@/components/Icon';
import { Colors, Layout, Radius, Space, Type } from '@/lib/theme';

// Phase 3: saving confessions (AsyncStorage, already installed) lands here.
// Until then this screen shows no controls, so nothing on it can fail to work.
export default function SavedScreen() {
  return (
    <View style={styles.screen}>
      <AppHeader title="Saved" />
      <View style={styles.body}>
        <View style={styles.circle}>
          <Icon name="bookmark-border" size={28} color={Colors.primary} />
        </View>
        <Text style={styles.title}>Nothing saved yet</Text>
        <Text style={styles.message}>Confessions you save will appear here.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.surface },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Space.xl,
    paddingBottom: Layout.tabBarClearance,
    gap: Space.sm,
  },
  circle: {
    width: 56,
    height: 56,
    borderRadius: Radius.full,
    backgroundColor: Colors.primaryFixed,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Space.sm,
  },
  title: { ...Type.headlineSm, color: Colors.onSurface },
  message: { ...Type.bodyMd, color: Colors.tertiary, textAlign: 'center' },
});
