/** 95 -> "1:35"; 3600 -> "60:00". Returns null when there is no duration to show. */
export function formatDuration(seconds: number | null): string | null {
  if (seconds === null || !Number.isFinite(seconds) || seconds < 0) return null;
  const whole = Math.round(seconds);
  const minutes = Math.floor(whole / 60);
  const rest = whole % 60;
  return `${minutes}:${rest.toString().padStart(2, '0')}`;
}

const ROMAN_TABLE: [number, string][] = [
  [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
  [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
  [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
];

/** 1 -> "I", 14 -> "XIV". Used for the category detail header's index. */
export function toRoman(n: number): string {
  let remaining = Math.max(0, Math.floor(n));
  let out = '';
  for (const [value, symbol] of ROMAN_TABLE) {
    while (remaining >= value) {
      out += symbol;
      remaining -= value;
    }
  }
  return out;
}
