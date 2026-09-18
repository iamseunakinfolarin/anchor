import { StyleSheet, View } from 'react-native';
import Svg, { Circle, Path, type SvgProps } from 'react-native-svg';

import { Colors, HairlineWidth } from '@/lib/theme';

/**
 * Single-line glyphs, one per category, drawn ink-on-paper inside a hairline
 * circle. Keyed by category slug: this is presentation, not catalog data, so
 * names and ordering still come from Supabase. An unknown slug falls back to a
 * plain ring rather than crashing.
 */
type Glyph = (props: SvgProps & { stroke: string }) => React.ReactElement;

const stroke = (d: string): Glyph =>
  function GlyphPath(props) {
    return (
      <Svg viewBox="0 0 24 24" {...props}>
        <Path
          d={d}
          fill="none"
          stroke={props.stroke}
          strokeWidth={1.4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );
  };

const sunburst: Glyph = function Sunburst(props) {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <Circle cx={12} cy={12} r={4} fill="none" stroke={props.stroke} strokeWidth={1.4} />
      <Path
        d="M12 2.6v2.6M12 18.8v2.6M2.6 12h2.6M18.8 12h2.6M5.4 5.4l1.9 1.9M16.7 16.7l1.9 1.9M18.6 5.4l-1.9 1.9M7.3 16.7l-1.9 1.9"
        fill="none"
        stroke={props.stroke}
        strokeWidth={1.4}
        strokeLinecap="round"
      />
    </Svg>
  );
};

const compass: Glyph = function Compass(props) {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <Circle cx={12} cy={12} r={8.6} fill="none" stroke={props.stroke} strokeWidth={1.4} />
      <Path
        d="M12 7.2 14.3 12 12 16.8 9.7 12z"
        fill="none"
        stroke={props.stroke}
        strokeWidth={1.4}
        strokeLinejoin="round"
      />
    </Svg>
  );
};

const GLYPHS: Record<string, Glyph> = {
  'courage-and-boldness': stroke('M12 3.2 19 6v5c0 4.7-3.3 8-7 9.6C8.3 19 5 15.7 5 11V6z'),
  'faith-in-god': stroke('M2.5 18.5 9 7.5l3.7 6.2L15.2 10l6.3 8.5z'),
  'god-is-all-powerful': sunburst,
  'growth-and-progress': stroke('M3 17.5 9 12l3.4 2.6L20.5 6M15.2 6h5.3v5.2'),
  health: stroke('M2.6 12.2h4.1l2-5 3.2 10 2-5h7.5'),
  'love-of-god': stroke(
    'M12 20.4S3.8 15.2 3.8 9.6C3.8 6.9 5.9 5 8.2 5c1.6 0 2.9.9 3.8 2.2C12.9 5.9 14.2 5 15.8 5c2.3 0 4.4 1.9 4.4 4.6 0 5.6-8.2 10.8-8.2 10.8z',
  ),
  'my-identity-is-christ': stroke('M12 3v18M6 8.6h12'),
  'peace-from-god': stroke(
    'M4.2 20.2C7.5 16.4 12.8 9.6 19.6 4.4M9.6 13.4c1.4-2.3 4-2.8 5.6-2.2-.8 2.4-3.3 3.3-5.6 2.2zM13.8 8.2c1.2-2 3.4-2.5 4.9-2-.7 2.1-2.9 2.9-4.9 2z',
  ),
  'prosperity-and-wealth': stroke(
    'M12 21V8.5M12 9.6c-2.6 0-3.8-1.8-3.8-4 2.6 0 3.8 1.8 3.8 4zM12 9.6c2.6 0 3.8-1.8 3.8-4-2.6 0-3.8 1.8-3.8 4zM12 14.4c-2.6 0-3.8-1.8-3.8-4 2.6 0 3.8 1.8 3.8 4zM12 14.4c2.6 0 3.8-1.8 3.8-4-2.6 0-3.8 1.8-3.8 4z',
  ),
  'purpose-driven-life': compass,
  'renewed-mind': stroke(
    'M15.4 8.6a3.4 3.4 0 1 0-3.4 3.4 4.8 4.8 0 1 1 4.8-4.8M12 12a3.4 3.4 0 0 1 3.4 3.4 4.8 4.8 0 0 1-9.6 0',
  ),
  security: stroke('M4.6 10.4h14.8v9.8H4.6zM8.2 10.4V7.6a3.8 3.8 0 0 1 7.6 0v2.8'),
  'strengthened-by-god': stroke('M4.4 4.6h15.2M4.4 19.4h15.2M8.2 4.6v14.8M12 4.6v14.8M15.8 4.6v14.8'),
  'victory-over-flesh-and-sin': stroke(
    'M10.2 13.8 7.4 16.6a3.4 3.4 0 0 1-4.8-4.8l2.8-2.8M13.8 10.2l2.8-2.8a3.4 3.4 0 0 1 4.8 4.8l-2.8 2.8M11.4 5.4 12 2.6M18.6 12.6l2.8-.6M5.4 11.4l-2.8.6',
  ),
};

interface CategoryMedallionProps {
  slug: string;
  /** Diameter of the ring. */
  size?: number;
  color?: string;
}

export function CategoryMedallion({
  slug,
  size = 40,
  color = Colors.ink,
}: CategoryMedallionProps) {
  const Glyph = GLYPHS[slug];
  const glyphSize = Math.round(size * 0.52);

  return (
    <View
      style={[
        styles.disc,
        { width: size, height: size, borderRadius: size / 2, borderColor: Colors.hairline },
      ]}
    >
      {Glyph ? <Glyph width={glyphSize} height={glyphSize} stroke={color} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  disc: {
    borderWidth: HairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
