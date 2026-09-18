import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors, HairlineWidth, Spacing, TypeScale } from '@/lib/theme';

interface ListRowProps {
  /** Leading slot: a medallion, or nothing. */
  leading?: ReactNode;
  title: string;
  /** Which face the title takes. Categories read as labels, confessions as titles. */
  titleFace?: 'serif' | 'sans';
  /** Second line under the title. */
  subtitle?: string | null;
  /** Right-aligned value, e.g. a duration. */
  trailing?: string | null;
  onPress?: () => void;
  accessibilityLabel?: string;
}

/**
 * The single row pattern for every list in the app. Phase 3's Search and Saved
 * screens reuse this untouched. No card, no shadow, no radius: rows are
 * separated by the hairline divider the list draws between them.
 */
export function ListRow({
  leading,
  title,
  titleFace = 'sans',
  subtitle,
  trailing,
  onPress,
  accessibilityLabel,
}: ListRowProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={accessibilityLabel ?? title}
      style={({ pressed }) => [styles.row, pressed && onPress ? styles.pressed : null]}
    >
      {leading ? <View style={styles.leading}>{leading}</View> : null}
      <View style={styles.text}>
        <Text style={titleFace === 'serif' ? styles.titleSerif : styles.titleSans}>{title}</Text>
        {subtitle ? (
          <Text style={styles.subtitle} numberOfLines={2}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      {trailing ? <Text style={styles.trailing}>{trailing}</Text> : null}
    </Pressable>
  );
}

/** Hairline divider, for use as a FlatList ItemSeparatorComponent. */
export function RowDivider() {
  return <View style={styles.divider} />;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  pressed: { backgroundColor: Colors.hairline },
  leading: { flexShrink: 0 },
  text: { flex: 1, gap: 2 },
  titleSans: { ...TypeScale.rowLabel, color: Colors.ink },
  titleSerif: { ...TypeScale.rowTitle, color: Colors.ink },
  subtitle: { ...TypeScale.meta, color: Colors.stone },
  trailing: { ...TypeScale.meta, color: Colors.stone, fontVariant: ['tabular-nums'] },
  divider: {
    height: HairlineWidth,
    backgroundColor: Colors.hairline,
    marginLeft: Spacing.lg,
  },
});
