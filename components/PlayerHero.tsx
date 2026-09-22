import { LinearGradient } from 'expo-linear-gradient';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';

import { Waveform } from '@/components/Waveform';
import { formatDuration } from '@/lib/format';
import { Colors, Spacing, TypeScale } from '@/lib/theme';
import type { PlayerState } from '@/lib/usePlayer';

const BACKGROUND = require('@/assets/player-background.jpg');

interface PlayerHeroProps {
  confessionId: string;
  title: string;
  reference: string | null;
  player: PlayerState;
  onBack: () => void;
  onPrevious: (() => void) | null;
  onNext: (() => void) | null;
}

/**
 * The full-bleed now-playing screen: background image, dark gradient rising
 * from the bottom third, a translucent info card, a waveform, and transport
 * controls. Deliberately breaks the app's flat, hairline-and-ink language —
 * a scoped exception for this one immersive screen, the same restraint
 * Spotify and Apple Music keep for their own player screen.
 */
export function PlayerHero({
  confessionId,
  title,
  reference,
  player,
  onBack,
  onPrevious,
  onNext,
}: PlayerHeroProps) {
  const timeLabel = player.disabled
    ? 'Audio coming soon'
    : player.failed
      ? 'Audio unavailable'
      : player.hasDuration
        ? null
        : player.busy
          ? 'Buffering…'
          : null;

  return (
    <ImageBackground source={BACKGROUND} style={styles.hero} resizeMode="cover">
      <LinearGradient
        colors={['transparent', 'rgba(11,11,10,0.6)', 'rgba(11,11,10,0.95)']}
        locations={[0, 0.38, 0.68]}
        style={StyleSheet.absoluteFill}
      />

      <Pressable
        onPress={onBack}
        accessibilityRole="button"
        accessibilityLabel="Back"
        style={({ pressed }) => [styles.backButton, { opacity: pressed ? 0.7 : 1 }]}
      >
        <Text style={styles.backIcon}>‹</Text>
      </Pressable>

      <View style={styles.bottom}>
        <View style={styles.card}>
          <Text style={styles.cardTitle} numberOfLines={2}>
            {title}
          </Text>
          {reference ? <Text style={styles.cardReference}>{reference}</Text> : null}
        </View>

        <Waveform
          seed={confessionId}
          progress={player.progress}
          activeColor={Colors.beacon}
          mutedColor="rgba(246,241,231,0.28)"
        />

        <View style={styles.times}>
          {player.hasDuration ? (
            <>
              <Text style={styles.timeText}>{formatDuration(Math.floor(player.currentTime))}</Text>
              <Text style={styles.timeText}>{formatDuration(Math.round(player.duration))}</Text>
            </>
          ) : timeLabel ? (
            <Text style={styles.timeText}>{timeLabel}</Text>
          ) : null}
        </View>

        <View style={styles.transport}>
          <TransportButton
            label="Previous"
            glyph="︱◀"
            onPress={onPrevious}
            disabled={!onPrevious}
          />
          <Pressable
            onPress={player.toggle}
            disabled={player.disabled}
            accessibilityRole="button"
            accessibilityLabel={player.playing ? 'Pause' : 'Play'}
            accessibilityState={{ disabled: player.disabled }}
            style={({ pressed }) => [
              styles.playButton,
              { opacity: player.disabled ? 0.4 : pressed ? 0.85 : 1 },
            ]}
          >
            <Text style={styles.playIcon}>{player.playing ? '❚❚' : '▶'}</Text>
          </Pressable>
          <TransportButton label="Next" glyph="▶︱" onPress={onNext} disabled={!onNext} />
        </View>
      </View>
    </ImageBackground>
  );
}

function TransportButton({
  label,
  glyph,
  onPress,
  disabled,
}: {
  label: string;
  glyph: string;
  onPress: (() => void) | null;
  disabled: boolean;
}) {
  return (
    <Pressable
      onPress={onPress ?? undefined}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled }}
      style={({ pressed }) => [
        styles.smallButton,
        { opacity: disabled ? 0.35 : pressed ? 0.7 : 1 },
      ]}
    >
      <Text style={styles.smallIcon}>{glyph}</Text>
    </Pressable>
  );
}

const HERO_HEIGHT = 560;

const styles = StyleSheet.create({
  hero: { height: HERO_HEIGHT, width: '100%' },
  backButton: {
    position: 'absolute',
    top: Spacing.xl,
    left: Spacing.md,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(11,11,10,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  backIcon: { color: Colors.paper, fontSize: 20, fontWeight: '600' },
  bottom: {
    marginTop: 'auto',
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
    gap: Spacing.md,
  },
  card: {
    backgroundColor: 'rgba(11,11,10,0.4)',
    borderRadius: 16,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    gap: Spacing.xs,
  },
  cardTitle: { ...TypeScale.rowTitle, color: Colors.paper, fontWeight: '700' },
  cardReference: { ...TypeScale.meta, color: '#C9C2B4' },
  times: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeText: {
    ...TypeScale.meta,
    color: '#C9C2B4',
    fontVariant: ['tabular-nums'],
  },
  transport: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xl,
    marginTop: Spacing.xs,
  },
  smallButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(11,11,10,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallIcon: { color: Colors.paper, fontSize: 14 },
  playButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.beacon,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIcon: { color: '#FFFFFF', fontSize: 20, fontWeight: '700' },
});
