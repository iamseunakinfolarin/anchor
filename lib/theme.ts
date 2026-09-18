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
  /** The single accent: playing state, "Today" marker, saved-filled state. Nowhere else. */
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
  ui: 'Inter_400Regular',
  uiMedium: 'Inter_500Medium',
  uiSemiBold: 'Inter_600SemiBold',
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
} as const;

export const HairlineWidth = StyleSheet.hairlineWidth;
