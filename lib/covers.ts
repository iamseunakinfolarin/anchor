import type { ImageSourcePropType } from 'react-native';

/**
 * The bundled cover textures, in a fixed order. Append new covers at the end
 * (see README "Adding a cover"). Changing the count re-maps most items to a
 * different cover, because assignment is the id hash modulo this length.
 */
export const COVERS: readonly ImageSourcePropType[] = [
  require('@/assets/covers/cover-01.jpg'),
  require('@/assets/covers/cover-02.jpg'),
  require('@/assets/covers/cover-03.jpg'),
  require('@/assets/covers/cover-04.jpg'),
  require('@/assets/covers/cover-05.jpg'),
];

/** Stable 32-bit string hash (the same one the waveform uses for its bars). */
export function hashString(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (Math.imul(31, h) + input.charCodeAt(i)) | 0;
  }
  return h;
}

/** Same id, same cover — across sessions, devices and installs. */
export function coverFor(id: string): ImageSourcePropType {
  const index = Math.abs(hashString(id)) % COVERS.length;
  return COVERS[index];
}
