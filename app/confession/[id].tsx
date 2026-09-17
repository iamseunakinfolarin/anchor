import { Stack, useLocalSearchParams } from 'expo-router';
import { useCallback } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Player } from '@/components/Player';
import { ScreenState } from '@/components/ScreenState';
import { ScriptureList } from '@/components/ScriptureList';
import { formatDuration } from '@/lib/format';
import { fetchConfession } from '@/lib/queries';
import { Spacing, useTheme } from '@/lib/theme';
import { useAsync } from '@/lib/useAsync';

export default function ConfessionScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colors = useTheme();

  const load = useCallback(() => fetchConfession(id), [id]);
  const state = useAsync(load);

  if (state.status === 'loading') return <ScreenState kind="loading" />;
  if (state.status === 'error') return <ScreenState kind="error" error={state.error} onRetry={state.reload} />;
  if (!state.data) {
    return <ScreenState kind="empty" title="Confession not found" message="This confession may have been unpublished." />;
  }

  const confession = state.data;
  const duration = formatDuration(confession.duration_seconds);

  return (
    <>
      <Stack.Screen options={{ title: confession.title }} />
      <ScrollView
        style={{ backgroundColor: colors.background }}
        contentContainerStyle={styles.content}
        contentInsetAdjustmentBehavior="automatic"
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]} accessibilityRole="header">
            {confession.title}
          </Text>
          {duration ? <Text style={[styles.meta, { color: colors.textSecondary }]}>{duration}</Text> : null}
        </View>

        <Player title={confession.title} audioUrl={confession.audio_url} />

        {confession.description ? (
          <Text style={[styles.description, { color: colors.text }]}>{confession.description}</Text>
        ) : null}

        <ScriptureList scriptures={confession.scriptures} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  content: { padding: Spacing.md, paddingBottom: Spacing.xl, gap: Spacing.lg },
  header: { gap: Spacing.xs },
  title: { fontSize: 28, fontWeight: '700', lineHeight: 34 },
  meta: { fontSize: 14, fontVariant: ['tabular-nums'] },
  description: { fontSize: 17, lineHeight: 26 },
});
