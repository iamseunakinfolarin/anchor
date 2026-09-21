import { StyleSheet } from 'react-native';

/**
 * Anchor's design tokens. Single source of truth.
 * Components must read from here; no hex literals anywhere else.
 */
export const Colors = {
  /** Primary text, and the anchor mark on light backgrounds. */
  ink: '#0B0B0A',
  /** Background. */
  paper: '#F6F1E7',
  /**
   * The single accent. Sanctioned uses only: the "Today" marker on Home, the
   * category index numeral on category detail, the confession title while a
   * confession is playing, and saved-filled state (future). Nowhere else.
   */
  beacon: '#E15039',
  /** Secondary text, metadata. */
  stone: '#8A8172',
  /** Dividers, borders. */
  hairline: '#DED5C4',
} as const;

export type ColorToken = keyof typeof Colors;

/** Font families, as registered by useFonts in the root layout. */
export const Fonts = {
  display: 'Fraunces_400Regular',
  displayMedium: 'Fraunces_500Medium',
  /** Only for the playing-state confession title: the one place a heavy serif weight is wanted. */
  displayBold: 'Fraunces_700Bold',
  ui: 'Inter_400Regular',
  uiMedium: 'Inter_500Medium',
  uiSemiBold: 'Inter_600SemiBold',
  /** Only for the playing-state confession text. */
  uiBold: 'Inter_700Bold',
} as const;

/** 8pt-derived rhythm, generous at the top end for the single-column layout. */
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

/**
 * Type scale. Serif for confession titles and scripture references,
 * sans for labels, durations and navigation.
 */
export const TypeScale = {
  wordmark: { fontFamily: Fonts.displayMedium, fontSize: 22, lineHeight: 28 },
  title: { fontFamily: Fonts.display, fontSize: 26, lineHeight: 33 },
  rowTitle: { fontFamily: Fonts.display, fontSize: 18, lineHeight: 24 },
  rowLabel: { fontFamily: Fonts.ui, fontSize: 16, lineHeight: 22 },
  body: { fontFamily: Fonts.ui, fontSize: 16, lineHeight: 24 },
  meta: { fontFamily: Fonts.ui, fontSize: 13, lineHeight: 18 },
  eyebrow: { fontFamily: Fonts.uiMedium, fontSize: 12, lineHeight: 16, letterSpacing: 0.8 },
  /** Confession title while playing: the dominant element on the screen. Pair with textTransform: 'uppercase'. */
  playingTitle: { fontFamily: Fonts.displayBold, fontSize: 34, lineHeight: 40, letterSpacing: 0.3 },
  /** The confession's spoken text while playing. */
  playingBody: { fontFamily: Fonts.uiBold, fontSize: 22, lineHeight: 34 },
  /** The single scripture reference shown while playing: small and quiet. */
  playingReference: { fontFamily: Fonts.display, fontSize: 14, lineHeight: 20 },
} as const;

export const HairlineWidth = StyleSheet.hairlineWidth;
