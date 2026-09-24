import { forwardRef } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { Icon } from '@/components/Icon';
import { Colors, Radius, Shadow, Space, Type } from '@/lib/theme';

const PLACEHOLDER = 'Search confessions, scripture, or categories';

/** Tappable pill (Categories): opens Search. No microphone. */
export function SearchPillButton({ onPress }: { onPress: () => void }) {
  return (
    <Pressable onPress={onPress} accessibilityRole="search" accessibilityLabel="Search" style={styles.pill}>
      <Icon name="search" size={22} color={Colors.tertiary} />
      <Text style={styles.placeholder} numberOfLines={1}>
        {PLACEHOLDER}
      </Text>
    </Pressable>
  );
}

/** Live input pill (Search screen). The clear button only appears once there's text. */
export const SearchPillInput = forwardRef<TextInput, { value: string; onChangeText: (t: string) => void }>(
  function SearchPillInput({ value, onChangeText }, ref) {
    return (
      <View style={[styles.pill, styles.inputPill]}>
        <Icon name="search" size={22} color={Colors.tertiary} />
        <TextInput
          ref={ref}
          value={value}
          onChangeText={onChangeText}
          placeholder={PLACEHOLDER}
          placeholderTextColor={Colors.tertiary}
          style={styles.input}
          autoFocus
          autoCorrect={false}
          returnKeyType="search"
          accessibilityLabel="Search confessions"
        />
        {value ? (
          <Pressable
            onPress={() => onChangeText('')}
            accessibilityRole="button"
            accessibilityLabel="Clear search"
            hitSlop={8}
            style={styles.clear}
          >
            <Icon name="close" size={18} color={Colors.tertiary} />
          </Pressable>
        ) : null}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  pill: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: Space.md,
    borderRadius: Radius.full,
    backgroundColor: Colors.surfaceContainerLowest,
    ...Shadow.card,
  },
  inputPill: { flex: 1 },
  placeholder: { ...Type.bodyMd, color: Colors.tertiary, flex: 1 },
  input: { ...Type.bodyMd, color: Colors.onSurface, flex: 1, paddingVertical: 0 },
  clear: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
});
