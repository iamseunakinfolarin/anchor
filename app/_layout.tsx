import {
  Fraunces_400Regular,
  Fraunces_500Medium,
  Fraunces_700Bold,
  useFonts,
} from '@expo-google-fonts/fraunces';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { View } from 'react-native';

import { configureAudioSession } from '@/lib/audioSession';
import { Colors, Fonts } from '@/lib/theme';

// Hold the splash until the typefaces are ready, so nothing renders in a
// system fallback and swaps.
SplashScreen.preventAutoHideAsync().catch(() => {
  // Already hidden, or unavailable on this platform. Non-fatal.
});

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Fraunces_400Regular,
    Fraunces_500Medium,
    Fraunces_700Bold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
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

  // Paper-colored holding view, not null, so the handoff from the splash never
  // flashes a white or black frame.
  if (!fontsLoaded) return <View style={{ flex: 1, backgroundColor: Colors.paper }} />;

  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerTintColor: Colors.ink,
          headerTitleStyle: { color: Colors.ink, fontFamily: Fonts.displayMedium, fontSize: 18 },
          headerStyle: { backgroundColor: Colors.paper },
          headerShadowVisible: false,
          contentStyle: { backgroundColor: Colors.paper },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="category/[id]" options={{ title: '' }} />
        <Stack.Screen name="confession/[id]" options={{ title: '' }} />
      </Stack>
    </>
  );
}
