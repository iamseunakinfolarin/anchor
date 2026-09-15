import { useCallback, useEffect, useState } from 'react';

export type AsyncState<T> =
  | { status: 'loading' }
  | { status: 'error'; error: Error }
  | { status: 'success'; data: T };

type Settled<T> = Exclude<AsyncState<T>, { status: 'loading' }>;

interface SettledFor<T> {
  load: () => Promise<T>;
  attempt: number;
  result: Settled<T>;
}

/**
 * Runs `load` on mount and whenever its identity changes; exposes `reload` for Retry buttons.
 * Callers must memoise `load` with useCallback so the effect does not re-run every render.
 *
 * The loading state is derived rather than set: a settled result is tagged with the `load`
 * and `attempt` it belongs to, and anything else renders as loading. This keeps setState out
 * of the synchronous effect body.
 */
export function useAsync<T>(load: () => Promise<T>): AsyncState<T> & { reload: () => void } {
  const [settled, setSettled] = useState<SettledFor<T> | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    load().then(
      (data) => {
        if (!cancelled) setSettled({ load, attempt, result: { status: 'success', data } });
      },
      (reason: unknown) => {
        if (cancelled) return;
        const error = reason instanceof Error ? reason : new Error(String(reason));
        setSettled({ load, attempt, result: { status: 'error', error } });
      },
    );
    return () => {
      cancelled = true;
    };
  }, [load, attempt]);

  const reload = useCallback(() => setAttempt((n) => n + 1), []);

  const state: AsyncState<T> =
    settled && settled.load === load && settled.attempt === attempt
      ? settled.result
      : { status: 'loading' };

  return { ...state, reload };
}
