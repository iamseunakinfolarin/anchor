import { useCallback } from 'react';

import { fetchCatalog } from '@/lib/queries';
import { useAsync } from '@/lib/useAsync';

/** The browse catalog for a screen: loading / error / data, with reload for Retry. */
export function useCatalog() {
  const load = useCallback(() => fetchCatalog(), []);
  return useAsync(load);
}
