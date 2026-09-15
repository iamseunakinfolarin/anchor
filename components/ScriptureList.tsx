import { StyleSheet, Text, View } from 'react-native';

import { Spacing, useTheme } from '@/lib/theme';
import type { Scripture } from '@/lib/types';

export function ScriptureList({ scriptures }: { scriptures: Scripture[] }) {
  const colors = useTheme();

  return (
    <View style={styles.section}>
      <Text style={[styles.heading, { color: colors.textSecondary }]}>SCRIPTURES</Text>
      {scriptures.length === 0 ? (
        <Text style={[styles.empty, { color: colors.textSecondary }]}>No scripture references yet.</Text>
      ) : (
        scriptures.map((s) => (
          <View
            key={s.id}
            style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}
          >
            <Text style={[styles.reference, { color: colors.accent }]}>
              {s.reference}
              {s.version ? <Text style={{ color: colors.textSecondary }}>{`  ·  ${s.version}`}</Text> : null}
            </Text>
            {s.text ? <Text style={[styles.verse, { color: colors.text }]}>{s.text}</Text> : null}
          </View>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  section: { gap: Spacing.sm },
  heading: { fontSize: 12, fontWeight: '600', letterSpacing: 1.2 },
  empty: { fontSize: 15 },
  card: { borderWidth: StyleSheet.hairlineWidth, borderRadius: 10, padding: Spacing.md, gap: Spacing.xs },
  reference: { fontSize: 15, fontWeight: '600' },
  verse: { fontSize: 16, lineHeight: 24 },
});
