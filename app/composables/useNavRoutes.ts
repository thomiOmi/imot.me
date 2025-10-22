import { useRouter } from '#app'
import type { RouteRecordNormalized } from 'vue-router'

/**
 * A composable that provides a filtered and sorted list of navigation routes.
 *
 * @remarks
 * This composable is designed to work with Nuxt 3's file-based routing system.
 * It processes the router's route list to provide a clean set of navigation-ready routes.
 *
 * @returns {ComputedRef<RouteRecordNormalized[]>} A computed ref containing an array of route records
 * that are suitable for navigation menus.
 *
 * @example
 * Basic usage:
 * ```ts
 * const navRoutes = useNavRoutes()
 * ```
 *
 * @example
 * Using with v-for in a template:
 * ```vue
 * <template>
 *   <nav>
 *     <NuxtLink
 *       v-for="route in navRoutes"
 *       :key="route.path"
 *       :to="route.path"
 *     >
 *       {{ route.meta.title || route.name }}
 *     </NuxtLink>
 *   </nav>
 * </template>
 *
 * <script setup>
 * const navRoutes = useNavRoutes()
 * </script>
 * ```
 *
 * @example
 * Page meta configuration:
 * ```ts
 * // pages/about.vue
 * definePageMeta({
 *   title: 'About Us',      // Display name for the route
 *   icon: 'lucide:info',    // Icon to display in navigation
 *   order: 2,               // Sort order (lower numbers come first)
 *   hidden: false           // Set to true to exclude from navigation
 * })
 * ```
 *
 * @feature
 * - Filters out dynamic routes (e.g., `[slug].vue`)
 * - Excludes private routes (prefixed with `/_`)
 * - Only includes top-level routes (e.g., `/`, `/about`)
 * - Respects `meta.hidden` flag to hide routes
 * - Sorts routes using `meta.order` (default: 999)
 */
export const useNavRoutes = (): ComputedRef<RouteRecordNormalized[]> => {
  const router = useRouter()

  const routes = computed(() =>
    router
      .getRoutes()
      // Only top-level pages (e.g., "/", "/about")
      .filter((r) => {
        const segments = r.path.split('/').filter(Boolean)
        return segments.length <= 1
      })
      // Skip dynamic and underscore routes
      .filter((r) => !r.path.includes(':') && !r.path.includes('/_'))
      // Skip hidden routes
      .filter((r) => !r.meta?.hidden)
      // Sort by meta.order (default 999)
      .sort((a, b) => (a.meta.order ?? 999) - (b.meta.order ?? 999))
  )

  return routes
}
