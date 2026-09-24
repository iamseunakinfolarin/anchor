/** 95 -> "1:35"; 3600 -> "60:00". Returns null when there is no duration to show. */
export function formatDuration(seconds: number | null): string | null {
  if (seconds === null || !Number.isFinite(seconds) || seconds < 0) return null;
  const whole = Math.round(seconds);
  const minutes = Math.floor(whole / 60);
  const rest = whole % 60;
  return `${minutes}:${rest.toString().padStart(2, '0')}`;
}

/** 189 -> "03:09", matching the export's mm:ss rows. Null when unknown. */
export function formatClock(seconds: number | null): string | null {
  const plain = formatDuration(seconds);
  if (plain === null) return null;
  const [m, s] = plain.split(':');
  return `${m.padStart(2, '0')}:${s}`;
}

/** 189 -> 3, never below 1 for a non-empty duration. */
export function wholeMinutes(seconds: number): number {
  return Math.max(1, Math.round(seconds / 60));
}

/**
 * Sum of durations, or null if any one is unknown — a partial total would be
 * a fabricated number, so the caller hides it instead.
 */
export function totalSeconds(durations: (number | null)[]): number | null {
  if (durations.length === 0) return null;
  let sum = 0;
  for (const d of durations) {
    if (d === null) return null;
    sum += d;
  }
  return sum;
}

/** Time-of-day greeting for Home's header. */
export function greeting(date: Date = new Date()): string {
  const h = date.getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}
