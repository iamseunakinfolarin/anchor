import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { useEffect } from 'react';

export interface PlayerState {
  /** True only while audio is actively playing (not paused, not just buffering). */
  playing: boolean;
  busy: boolean;
  failed: boolean;
  hasDuration: boolean;
  currentTime: number;
  duration: number;
  progress: number;
  /** True when there is no audio to play (placeholder confessions). */
  disabled: boolean;
  toggle: () => void;
}

/**
 * Owns the single expo-audio connection for a confession screen. Call this
 * once, unconditionally, at the top of the screen component — never inside a
 * conditional branch of the paper/ink layout, or switching layouts would
 * unmount this hook and kill the live stream mid-playback.
 *
 * Pass null/empty when the confession hasn't loaded yet or has no audio;
 * useAudioPlayer accepts a null source and simply stays inert.
 */
export function usePlayer(audioUrl: string | null, title: string): PlayerState {
  const player = useAudioPlayer(audioUrl ? { uri: audioUrl } : null);
  const status = useAudioPlayerStatus(player);

  useEffect(() => {
    return () => {
      // The hook releases the player on unmount; drop the media notification with it.
      try {
        player.clearLockScreenControls();
      } catch {
        // Player already released — nothing to clear.
      }
    };
  }, [player]);

  const failed = status.error !== null;
  const busy = status.isBuffering && !failed;
  const hasDuration = status.isLoaded && status.duration > 0;
  const finished =
    status.didJustFinish || (hasDuration && status.currentTime >= status.duration - 0.05);

  const toggle = () => {
    if (!audioUrl) return;
    if (status.playing) {
      player.pause();
      return;
    }
    if (finished) player.seekTo(0);
    player.play();
    // Required on Android for sustained background playback, and what puts the
    // confession title with a play/pause control on the notification / lock screen.
    // Called on EVERY play press, not once: if a binding attempt fails transiently
    // (e.g. right after a cold start), the native connection stays retryable and the
    // next press recovers it. When already active this just refreshes the metadata.
    try {
      player.setActiveForLockScreen(
        true,
        { title, artist: 'Anchor' },
        { showSeekForward: false, showSeekBackward: false },
      );
    } catch {
      // Non-fatal: playback works without lock-screen controls; retried on next press.
    }
  };

  return {
    playing: status.playing,
    busy,
    failed,
    hasDuration,
    currentTime: status.currentTime,
    duration: status.duration,
    progress: hasDuration ? Math.min(status.currentTime / status.duration, 1) : 0,
    disabled: !audioUrl,
    toggle,
  };
}
