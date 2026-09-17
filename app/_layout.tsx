import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';

import { configureAudioSession } from '@/lib/audioSession';
import { Colors } from '@/lib/theme';

export default function RootLayout() {
  useEffect(() => {
    configureAudioSession();
  }, []);

  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const colors = isDark ? Colors.dark : Colors.light;

  return (
    <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerTintColor: colors.accent,
          headerTitleStyle: { color: colors.text },
          headerStyle: { backgroundColor: colors.background },
          headerShadowVisible: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Anchor' }} />
        <Stack.Screen name="category/[id]" options={{ title: '' }} />
        <Stack.Screen name="confession/[id]" options={{ title: '' }} />
      </Stack>
    </ThemeProvider>
  );
}
