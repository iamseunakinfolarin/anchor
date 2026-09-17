import { setAudioModeAsync } from 'expo-audio';

/**
 * Configures the global audio session once, at app start.
 *
 * - shouldPlayInBackground keeps playback alive when the app is backgrounded or the
 *   screen is locked (paired with the expo-audio config plugin's Android foreground
 *   media service).
 * - interruptionMode 'doNotMix' is REQUIRED by expo-audio for setActiveForLockScreen;
 *   it also pauses other apps' audio while a confession plays.
 * - playsInSilentMode lets spoken confessions play with the ringer silenced.
 */
export function configureAudioSession(): void {
  setAudioModeAsync({
    shouldPlayInBackground: true,
    interruptionMode: 'doNotMix',
    playsInSilentMode: true,
  }).catch((reason: unknown) => {
    // Non-fatal: playback still works in the foreground without the session tweaks.
    console.warn('Audio session setup failed:', reason);
  });
}
