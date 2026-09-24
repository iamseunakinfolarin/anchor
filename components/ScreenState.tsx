import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

import { ConfigError } from '@/lib/queries';
import { Colors, Radius, Shadow, Space, Type } from '@/lib/theme';

type Props =
  | { kind: 'loading' }
  | { kind: 'empty'; title: string; message?: string }
  | { kind: 'error'; error: Error; onRetry?: () => void };

/** Shared full-screen state for loading, empty results, and failures. */
export function ScreenState(props: Props) {
  if (props.kind === 'loading') {
    return (
      <View style={styles.container} accessibilityRole="progressbar">
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (props.kind === 'empty') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{props.title}</Text>
        {props.message ? <Text style={styles.message}>{props.message}</Text> : null}
      </View>
    );
  }

  const isConfig = props.error instanceof ConfigError;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isConfig ? 'Supabase is not configured' : 'Something went wrong'}</Text>
      <Text style={styles.message}>{props.error.message}</Text>
      {!isConfig && props.onRetry ? (
        <Pressable
          onPress={props.onRetry}
          accessibilityRole="button"
          style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        >
          <Text style={styles.buttonText}>Try again</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Space.lg,
    gap: Space.sm,
    backgroundColor: Colors.surface,
  },
  title: { ...Type.headlineSm, color: Colors.onSurface, textAlign: 'center' },
  message: { ...Type.bodyMd, color: Colors.tertiary, textAlign: 'center', maxWidth: 320 },
  button: {
    marginTop: Space.md,
    paddingHorizontal: Space.lg,
    height: 44,
    justifyContent: 'center',
    borderRadius: Radius.full,
    backgroundColor: Colors.primary,
    ...Shadow.glowSm,
  },
  pressed: { transform: [{ scale: 0.97 }] },
  buttonText: { ...Type.labelLg, color: Colors.onPrimary },
});
