import {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  useFonts,
} from '@expo-google-fonts/plus-jakarta-sans';
import { MaterialIcons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { View } from 'react-native';

import { configureAudioSession } from '@/lib/audioSession';
import { Colors } from '@/lib/theme';

// Hold the splash until the typeface and icon font are ready, so nothing
// renders in a system fallback and swaps.
SplashScreen.preventAutoHideAsync().catch(() => {
  // Already hidden, or unavailable on this platform. Non-fatal.
});

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    ...MaterialIcons.font,
  });

  useEffect(() => {
    configureAudioSession();
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync().catch(() => {
        // Already hidden. Non-fatal.
      });
    }
  }, [fontsLoaded]);

  // Surface-colored holding view, not null, so the handoff from the splash
  // never flashes a white or black frame.
  if (!fontsLoaded) return <View style={{ flex: 1, backgroundColor: Colors.surface }} />;

  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: Colors.surface } }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="category/[id]" />
        <Stack.Screen name="search" />
        <Stack.Screen name="confession/[id]" />
      </Stack>
    </>
  );
}
