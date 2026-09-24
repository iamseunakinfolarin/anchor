import type { useRouter } from 'expo-router';

type Router = ReturnType<typeof useRouter>;

/** Opens the player. Pass the category so the player's previous/next walk that playlist. */
export function openPlayer(router: Router, confessionId: string, categoryId: string | null) {
  router.push({
    pathname: '/confession/[id]',
    params: categoryId ? { id: confessionId, categoryId } : { id: confessionId },
  });
}

export function openCategory(router: Router, categoryId: string) {
  router.push({ pathname: '/category/[id]', params: { id: categoryId } });
}
