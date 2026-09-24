import { forwardRef } from 'react';
import { Pressable, StyleSheet, Text, View, type PressableProps } from 'react-native';

import { Icon, type IconName } from '@/components/Icon';
import { Colors, Type } from '@/lib/theme';

type TabButtonProps = PressableProps & {
  icon: IconName;
  label: string;
  /** Injected by TabTrigger asChild. */
  isFocused?: boolean;
};

/** One tab: icon over label, primary when active, tertiary otherwise (export's data-active-classes). */
export const TabButton = forwardRef<View, TabButtonProps>(function TabButton(
  { icon, label, isFocused, ...rest },
  ref,
) {
  const color = isFocused ? Colors.primary : Colors.tertiary;
  return (
    <Pressable
      ref={ref}
      {...rest}
      accessibilityRole="tab"
      accessibilityLabel={label}
      accessibilityState={{ selected: !!isFocused }}
      aria-selected={!!isFocused}
      style={styles.button}
    >
      <Icon name={icon} size={24} color={color} />
      <Text style={[isFocused ? styles.labelActive : styles.label, { color }]}>{label}</Text>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  button: { flex: 1, minWidth: 56, height: 48, alignItems: 'center', justifyContent: 'center', gap: 2 },
  label: { ...Type.labelSm },
  labelActive: { ...Type.labelSm, fontFamily: Type.labelMd.fontFamily },
});
