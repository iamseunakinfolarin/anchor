import { loadFont } from '@remotion/google-fonts/PlusJakartaSans';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { Colors } from './theme';

const { fontFamily } = loadFont('normal', {
  weights: ['500', '800'],
  subsets: ['latin'],
});

export const Title: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const mark = spring({ frame, fps, config: { damping: 200 } });
  const subtitle = interpolate(frame, [12, 32], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: Colors.background,
        fontFamily,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 32,
      }}
    >
      <div
        style={{
          width: 240,
          height: 240,
          borderRadius: 120,
          backgroundColor: Colors.primary,
          boxShadow: '0 32px 64px rgba(183, 19, 26, 0.32)',
          transform: `scale(${mark})`,
        }}
      />
      <h1
        style={{
          fontSize: 140,
          fontWeight: 800,
          letterSpacing: -4,
          color: Colors.onBackground,
          margin: 0,
          opacity: mark,
        }}
      >
        Anchor
      </h1>
      <p
        style={{
          fontSize: 52,
          fontWeight: 500,
          color: Colors.onSurfaceVariant,
          margin: 0,
          opacity: subtitle,
          transform: `translateY(${interpolate(subtitle, [0, 1], [24, 0])}px)`,
        }}
      >
        Spoken Scripture confessions
      </p>
    </AbsoluteFill>
  );
};
