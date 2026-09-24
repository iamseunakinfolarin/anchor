import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { hashString } from '@/lib/covers';

const BAR_COUNT = 40;
const MIN_HEIGHT = 5;
const MAX_HEIGHT = 30;

/** Tiny deterministic PRNG so a given seed always yields the same sequence. */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}


interface WaveformProps {
  /** Anything stable per confession, e.g. its id — the same seed always draws the same bars. */
  seed: string;
  /** 0 to 1: bars up to this fraction render in the active color, the rest muted. */
  progress: number;
  activeColor: string;
  mutedColor: string;
}

/**
 * A stand-in waveform: bar heights are generated once per seed, not from real
 * audio amplitude (not available this phase). Plain Views, no SVG needed for
 * solid rectangles.
 */
export function Waveform({ seed, progress, activeColor, mutedColor }: WaveformProps) {
  const heights = useMemo(() => {
    const rand = mulberry32(hashString(seed));
    return Array.from({ length: BAR_COUNT }, () => MIN_HEIGHT + rand() * (MAX_HEIGHT - MIN_HEIGHT));
  }, [seed]);

  const activeCount = Math.round(Math.min(Math.max(progress, 0), 1) * BAR_COUNT);

  return (
    <View style={styles.row} accessible={false}>
      {heights.map((h, i) => (
        <View
          key={i}
          style={[
            styles.bar,
            { height: h, backgroundColor: i < activeCount ? activeColor : mutedColor },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-end', gap: 3, height: MAX_HEIGHT },
  bar: { width: 3, borderRadius: 1.5 },
});
