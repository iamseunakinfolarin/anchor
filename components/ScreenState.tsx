import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

import { ConfigError } from '@/lib/queries';
import { Spacing, useTheme } from '@/lib/theme';

type Props =
  | { kind: 'loading' }
  | { kind: 'empty'; title: string; message?: string }
  | { kind: 'error'; error: Error; onRetry?: () => void };

/** Shared full-screen state for loading, empty results, and failures. */
export function ScreenState(props: Props) {
  const colors = useTheme();

  if (props.kind === 'loading') {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]} accessibilityRole="progressbar">
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  if (props.kind === 'empty') {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.title, { color: colors.text }]}>{props.title}</Text>
        {props.message ? <Text style={[styles.message, { color: colors.textSecondary }]}>{props.message}</Text> : null}
      </View>
    );
  }

  const isConfig = props.error instanceof ConfigError;
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>
        {isConfig ? 'Supabase is not configured' : 'Something went wrong'}
      </Text>
      <Text style={[styles.message, { color: colors.textSecondary }]}>{props.error.message}</Text>
      {!isConfig && props.onRetry ? (
        <Pressable
          onPress={props.onRetry}
          accessibilityRole="button"
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: colors.accent, opacity: pressed ? 0.8 : 1 },
          ]}
        >
          <Text style={styles.buttonText}>Try again</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing.lg, gap: Spacing.sm },
  title: { fontSize: 18, fontWeight: '600', textAlign: 'center' },
  message: { fontSize: 15, lineHeight: 22, textAlign: 'center', maxWidth: 320 },
  button: { marginTop: Spacing.sm, paddingHorizontal: Spacing.lg, paddingVertical: Spacing.sm + 2, borderRadius: 999 },
  buttonText: { color: '#FFFFFF', fontWeight: '600', fontSize: 15 },
});
