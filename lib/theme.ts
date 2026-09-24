/**
 * Anchor's design tokens — ported from the Stitch export's Tailwind config
 * (the code.html files in design-reference). The only place a color, radius, spacing
 * value, type style or shadow is defined. Components never hold raw values.
 */

/** All 47 color tokens from the export, camelCased, values unchanged. */
export const Colors = {
  primary: '#b7131a',
  onPrimary: '#ffffff',
  primaryContainer: '#db322f',
  onPrimaryContainer: '#fffbff',
  primaryFixed: '#ffdad6',
  primaryFixedDim: '#ffb4ac',
  onPrimaryFixed: '#410002',
  onPrimaryFixedVariant: '#93000d',
  inversePrimary: '#ffb4ac',
  surfaceTint: '#bb171c',

  secondary: '#b51925',
  onSecondary: '#ffffff',
  secondaryContainer: '#d8363a',
  onSecondaryContainer: '#fffbff',
  secondaryFixed: '#ffdad7',
  secondaryFixedDim: '#ffb3ae',
  onSecondaryFixed: '#410004',
  onSecondaryFixedVariant: '#930015',

  tertiary: '#675859',
  onTertiary: '#ffffff',
  tertiaryContainer: '#817171',
  onTertiaryContainer: '#fffbff',
  tertiaryFixed: '#f2dede',
  tertiaryFixedDim: '#d5c2c2',
  onTertiaryFixed: '#241919',
  onTertiaryFixedVariant: '#514344',

  surface: '#f7f9ff',
  surfaceDim: '#d7dadf',
  surfaceBright: '#f7f9ff',
  surfaceContainerLowest: '#ffffff',
  surfaceContainerLow: '#f1f4f9',
  surfaceContainer: '#ebeef3',
  surfaceContainerHigh: '#e5e8ed',
  surfaceContainerHighest: '#e0e3e8',
  surfaceVariant: '#e0e3e8',
  onSurface: '#181c20',
  onSurfaceVariant: '#5b403d',
  inverseSurface: '#2d3135',
  inverseOnSurface: '#eef1f6',
  outline: '#906f6c',
  outlineVariant: '#e4beb9',

  error: '#ba1a1a',
  onError: '#ffffff',
  errorContainer: '#ffdad6',
  onErrorContainer: '#93000a',

  background: '#f7f9ff',
  onBackground: '#181c20',
} as const;

/**
 * Translucent values the export expresses as Tailwind opacity modifiers
 * (bg-surface-container-lowest/95, /80, /90). Kept here so no component
 * holds an rgba literal.
 */
export const Translucent = {
  tabBar: 'rgba(255,255,255,0.95)',
  pill: 'rgba(255,255,255,0.8)',
  tag: 'rgba(255,255,255,0.9)',
  coverScrimTop: 'rgba(24,28,32,0)',
  coverScrimBottom: 'rgba(24,28,32,0.72)',
  /** Player-only (Phase 2 redesigns it): the dark wash over the background image. */
  playerWash: 'rgba(24,28,32,0.6)',
  playerWashStrong: 'rgba(24,28,32,0.95)',
  playerPanel: 'rgba(24,28,32,0.4)',
  playerMuted: 'rgba(247,249,255,0.28)',
  playerSubtle: 'rgba(247,249,255,0.72)',
} as const;

/**
 * Radius scale: DEFAULT 16, lg 32, xl 48, full. `inner` (20) is the one
 * named exception: the cover image inside a 32px category card, which keeps
 * the nested-corner look (outer radius minus the card's 12px padding).
 */
export const Radius = {
  base: 16,
  inner: 20,
  lg: 32,
  xl: 48,
  full: 9999,
} as const;

export const Space = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  gutter: 16,
  margin: 20,
} as const;

/** React Native ignores fontWeight once a named family is set, so each weight is its own family. */
export const Font = {
  regular: 'PlusJakartaSans_400Regular',
  medium: 'PlusJakartaSans_500Medium',
  semibold: 'PlusJakartaSans_600SemiBold',
  bold: 'PlusJakartaSans_700Bold',
} as const;

export const Type = {
  headlineXl: { fontFamily: Font.bold, fontSize: 34, lineHeight: 42 },
  headlineLg: { fontFamily: Font.bold, fontSize: 26, lineHeight: 34 },
  headlineMd: { fontFamily: Font.semibold, fontSize: 20, lineHeight: 28 },
  headlineSm: { fontFamily: Font.semibold, fontSize: 17, lineHeight: 24 },
  bodyLg: { fontFamily: Font.medium, fontSize: 16, lineHeight: 24 },
  bodyMd: { fontFamily: Font.regular, fontSize: 14, lineHeight: 20 },
  bodySm: { fontFamily: Font.regular, fontSize: 12, lineHeight: 16 },
  labelLg: { fontFamily: Font.semibold, fontSize: 15, lineHeight: 20 },
  labelMd: { fontFamily: Font.medium, fontSize: 13, lineHeight: 18 },
  /** 0.04em at 11px. */
  labelSm: { fontFamily: Font.semibold, fontSize: 11, lineHeight: 14, letterSpacing: 0.44 },
} as const;

/**
 * Two shadow families, as React Native boxShadow (New Architecture):
 * neutral elevation for surfaces, primary-red glow for interactive and
 * playing elements. Values exactly as specified from the export.
 */
export const Shadow = {
  header: { boxShadow: '0px 1px 8px rgba(43,47,51,0.03)' },
  card: { boxShadow: '0px 8px 24px rgba(43,47,51,0.04)' },
  raised: { boxShadow: '0px 16px 36px rgba(43,47,51,0.06)' },
  dock: { boxShadow: '0px -8px 30px rgba(43,47,51,0.06)' },
  glowSm: { boxShadow: '0px 4px 12px rgba(183,19,26,0.25)' },
  glowMd: { boxShadow: '0px 6px 16px rgba(183,19,26,0.35)' },
  glowLg: { boxShadow: '0px 12px 28px rgba(183,19,26,0.38)' },
} as const;

/** Layout constants shared across screens. */
export const Layout = {
  headerHeight: 64,
  tabBarHeight: 64,
  /** Scroll content clears the floating tab bar. */
  tabBarClearance: 112,
} as const;
