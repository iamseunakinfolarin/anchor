import { useColorScheme } from 'react-native';

export const Colors = {
  light: {
    background: '#F3F5F7',
    surface: '#FFFFFF',
    text: '#1B2431',
    textSecondary: '#5E6B7C',
    border: '#D8DEE5',
    accent: '#0F6E73',
    accentSoft: '#E1F0F0',
    disabled: '#C9D1DA',
    disabledText: '#6B7785',
  },
  dark: {
    background: '#0F151C',
    surface: '#171F29',
    text: '#E6EBF0',
    textSecondary: '#98A4B3',
    border: '#2A3441',
    accent: '#4FB3B8',
    accentSoft: '#143033',
    disabled: '#2A3441',
    disabledText: '#7E8A99',
  },
} as const;

export type ThemeColors = (typeof Colors)[keyof typeof Colors];

export const Spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 } as const;

export function useTheme(): ThemeColors {
  return useColorScheme() === 'dark' ? Colors.dark : Colors.light;
}
