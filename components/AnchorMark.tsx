import Svg, { Path } from 'react-native-svg';

import { Colors } from '@/lib/theme';

const VIEW_W = 100;
const VIEW_H = 122;

/**
 * The Anchor mark: one flat-filled path, no gradient, no baked color.
 *
 * Three subpaths on a 100x122 grid, combined with the even-odd rule so the
 * ring reads as a ring:
 *  - the ring, drawn as an annular sector whose 50 degrees of missing arc form
 *    the notch on the lower right;
 *  - the crossbar;
 *  - the shank and flukes as one traced silhouette, mirrored about x=50.
 */
const PATH =
  'M55.5,35 A16,16 0 1,1 65,25.5 L58.5,23.1 A9,9 0 1,0 53.1,28.5 Z ' +
  'M18,40 L82,40 L82,51 L18,51 Z ' +
  'M42,22 L42,64 C42,78 37,88 28,91 L5,70 L11,90 C20,103 34,110 50,122 ' +
  'C66,110 80,103 89,90 L95,70 L72,91 C63,88 58,78 58,64 L58,22 Z';

interface AnchorMarkProps {
  /** Rendered height in px. Width follows the mark's 100:122 ratio. */
  size?: number;
  /** Any color token value. Defaults to ink, for light backgrounds. */
  color?: string;
}

export function AnchorMark({ size = 24, color = Colors.ink }: AnchorMarkProps) {
  return (
    <Svg
      width={(size * VIEW_W) / VIEW_H}
      height={size}
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      accessibilityRole="image"
      accessibilityLabel="Anchor"
    >
      <Path d={PATH} fill={color} fillRule="evenodd" />
    </Svg>
  );
}
