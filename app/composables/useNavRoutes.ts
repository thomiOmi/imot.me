import type { RouteRecordNormalized } from 'vue-router'

/**
 * Provides the top-level routes that belong in the site navigation.
 *
 * Localized routing registers one record per locale and, with
 * `prefix_and_default`, both `/` and `/en` for the default locale. Records are
 * therefore deduplicated by base name and the shortest path wins, so links keep
 * pointing at the canonical unprefixed URL regardless of registration order.
 *
 * Nested, dynamic, private (path segment starting with `_`) and `meta.hidden`
 * routes are excluded. The result is sorted by `meta.order` (default: 999).
 *
 * @returns A computed list of routes ready to render a navigation menu.
 */
export const useNavRoutes = (): ComputedRef<RouteRecordNormalized[]> => {
  const router = useRouter()

  return computed(() => {
    const routesByBaseName = new Map<string, RouteRecordNormalized>()

    for (const route of router.getRoutes()) {
      const segments = route.path.split('/').filter(Boolean)
      const isTopLevel = segments.length <= 1
      const isPrivate = segments[0]?.startsWith('_') ?? false
      const isDynamic = route.path.includes(':')

      if (!isTopLevel || isPrivate || isDynamic || route.meta.hidden) {
        continue
      }

      const baseName = typeof route.name === 'string'
        ? route.name.split('___')[0] ?? route.path
        : route.path
      const registeredRoute = routesByBaseName.get(baseName)

      if (!registeredRoute || route.path.length < registeredRoute.path.length) {
        routesByBaseName.set(baseName, route)
      }
    }

    return [...routesByBaseName.values()].sort(
      (firstRoute, secondRoute) => (firstRoute.meta.order ?? 999) - (secondRoute.meta.order ?? 999),
    )
  })
}
