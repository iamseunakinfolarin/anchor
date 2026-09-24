import Constants from 'expo-constants';
import { StyleSheet, Text, View } from 'react-native';

import { AppHeader } from '@/components/AppHeader';
import { Colors, Layout, Radius, Shadow, Space, Type } from '@/lib/theme';

// Phase 3: settings controls land here. For now it shows only real,
// read-only information, so there is no control that does nothing.
export default function SettingsScreen() {
  const version = Constants.expoConfig?.version ?? null;
  return (
    <View style={styles.screen}>
      <AppHeader title="Settings" />
      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.label}>Audio</Text>
          <Text style={styles.value}>Daily Anchor</Text>
        </View>
        {version ? (
          <View style={styles.card}>
            <Text style={styles.label}>Version</Text>
            <Text style={styles.value}>{version}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.surface },
  content: { padding: Space.margin, paddingBottom: Layout.tabBarClearance, gap: 12 },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Space.md,
    borderRadius: Radius.base,
    backgroundColor: Colors.surfaceContainerLowest,
    ...Shadow.card,
  },
  label: { ...Type.bodyLg, color: Colors.onSurface },
  value: { ...Type.bodyMd, color: Colors.tertiary },
});
