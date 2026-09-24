import { StyleSheet, Text, View } from 'react-native';

import { Colors, Radius, Shadow, Space, Type } from '@/lib/theme';
import type { Scripture } from '@/lib/types';

/** Only these translations are licensed for display; anything else hides the verse text. */
const ALLOWED_VERSIONS = new Set(['KJV', 'WEB']);

function isLicensedVersion(version: string | null): boolean {
  return version === null || ALLOWED_VERSIONS.has(version.toUpperCase());
}

export function ScriptureList({ scriptures }: { scriptures: Scripture[] }) {
  return (
    <View style={styles.section}>
      <Text style={styles.heading}>Scriptures</Text>
      {scriptures.length === 0 ? (
        <Text style={styles.empty}>No scripture references yet.</Text>
      ) : (
        scriptures.map((s) => (
          <View key={s.id} style={styles.item}>
            <Text style={styles.reference}>
              {s.reference}
              {s.version ? <Text style={styles.version}>{`  ·  ${s.version}`}</Text> : null}
            </Text>
            {s.text && isLicensedVersion(s.version) ? (
              <Text style={styles.verse}>{s.text}</Text>
            ) : null}
          </View>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  section: { gap: Space.md },
  heading: { ...Type.labelSm, color: Colors.outline },
  empty: { ...Type.bodyMd, color: Colors.tertiary },
  item: {
    gap: Space.xs,
    padding: Space.md,
    borderRadius: Radius.base,
    backgroundColor: Colors.surfaceContainerLowest,
    ...Shadow.card,
  },
  reference: { ...Type.headlineSm, color: Colors.onSurface },
  version: { ...Type.bodySm, color: Colors.tertiary },
  verse: { ...Type.bodyMd, color: Colors.onSurface },
});
