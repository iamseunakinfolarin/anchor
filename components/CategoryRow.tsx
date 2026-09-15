import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Spacing, useTheme } from '@/lib/theme';
import type { Category } from '@/lib/types';

export function CategoryRow({ category }: { category: Category }) {
  const colors = useTheme();
  const router = useRouter();
  return (
    <Pressable
      onPress={() => router.push({ pathname: '/category/[id]', params: { id: category.id, name: category.name } })}
      accessibilityRole="button"
      accessibilityLabel={category.name}
      style={({ pressed }) => [styles.row, { backgroundColor: pressed ? colors.accentSoft : 'transparent' }]}
    >
      <View style={styles.text}>
        <Text style={[styles.name, { color: colors.text }]}>{category.name}</Text>
        {category.description ? (
          <Text style={[styles.description, { color: colors.textSecondary }]} numberOfLines={2}>
            {category.description}
          </Text>
        ) : null}
      </View>
      <Text style={[styles.chevron, { color: colors.textSecondary }]}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    gap: Spacing.md,
  },
  text: { flex: 1, gap: 2 },
  name: { fontSize: 17, fontWeight: '600' },
  description: { fontSize: 14, lineHeight: 20 },
  chevron: { fontSize: 24, lineHeight: 24 },
});
