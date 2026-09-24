import { LinearGradient } from 'expo-linear-gradient';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';

import { Waveform } from '@/components/Waveform';
import { formatDuration } from '@/lib/format';
import { Colors, Radius, Space, Translucent, Type } from '@/lib/theme';
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
 * controls. Layout unchanged since the previous phase; only its tokens were
 * swapped for the Stitch system. Phase 2 redesigns this screen.
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
        colors={[Translucent.coverScrimTop, Translucent.playerWash, Translucent.playerWashStrong]}
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
          activeColor={Colors.primary}
          mutedColor={Translucent.playerMuted}
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
    top: Space.xl,
    left: Space.md,
    width: 36,
    height: 36,
    borderRadius: Radius.full,
    backgroundColor: Translucent.playerPanel,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  backIcon: { ...Type.headlineMd, color: Colors.surface },
  bottom: {
    marginTop: 'auto',
    paddingHorizontal: Space.lg,
    paddingBottom: Space.xl,
    gap: Space.md,
  },
  card: {
    backgroundColor: Translucent.playerPanel,
    borderRadius: Radius.base,
    paddingVertical: Space.md,
    paddingHorizontal: Space.lg,
    gap: Space.xs,
  },
  cardTitle: { ...Type.headlineSm, fontFamily: Type.headlineLg.fontFamily, color: Colors.surface },
  cardReference: { ...Type.labelMd, color: Translucent.playerSubtle },
  times: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeText: {
    ...Type.labelMd,
    color: Translucent.playerSubtle,
    fontVariant: ['tabular-nums'],
  },
  transport: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Space.xl,
    marginTop: Space.xs,
  },
  smallButton: {
    width: 44,
    height: 44,
    borderRadius: Radius.full,
    backgroundColor: Translucent.playerPanel,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallIcon: { ...Type.labelMd, color: Colors.surface },
  playButton: {
    width: 60,
    height: 60,
    borderRadius: Radius.full,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIcon: { ...Type.headlineMd, fontFamily: Type.headlineLg.fontFamily, color: Colors.onPrimary },
});
