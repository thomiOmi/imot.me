<script lang="ts" setup>
import { titleCase } from 'scule'

const navRoutes = useNavRoutes()
const localePath = useLocalePath()
const route = useRoute()
const i18n = useI18n()

// @nuxtjs/i18n suffixes route names with `___<locale>`, which leaks into labels
const toBaseName = (routeName: unknown) =>
  typeof routeName === 'string' ? routeName.split('___')[0] ?? '' : ''

const navLabel = (routeName: unknown) => {
  const baseName = toBaseName(routeName)
  if (!baseName) return ''

  const key = `nav.${baseName}`
  return i18n.te(key) ? i18n.t(key) : titleCase(baseName)
}

// English is served from both `/` and `/en`, so compare base names instead of
// raw paths to keep the active indicator correct on either URL
const currentBaseName = computed(() => toBaseName(route.name))
const isActive = (routeName: unknown) => toBaseName(routeName) === currentBaseName.value
</script>

<template>
  <header class="fixed inset-s-0 top-0 z-50 w-full">
    <UContainer as="nav">
      <ul
        class="
          my-4 flex items-center rounded-full bg-white/90 px-3 text-sm
          font-medium text-neutral-800 shadow-lg ring-1 shadow-neutral-800/5
          ring-neutral-900/5 backdrop-blur-sm
          dark:bg-neutral-800/90 dark:text-neutral-200 dark:ring-white/20
        "
      >
        <li
          v-for="item in navRoutes"
          :key="item.path"
        >
          <UTooltip
            :text="navLabel(item.name)"
            :content="{
              positionStrategy: 'absolute',
            }"
          >
            <ULink
              :to="localePath(item.path)"
              class="
                relative flex items-center justify-center px-3 py-4 transition
                hover:text-primary-500
                dark:hover:text-primary-400
              "
              :class="isActive(item.name) ? 'text-primary-600 dark:text-primary-400' : undefined"
            >
              <Icon
                aria-hidden="true"
                :name="(item.meta.icon as string) || 'lucide:circle-dashed'"
                class="z-10 size-5"
              />
              <span
                v-if="isActive(item.name)"
                class="
                  absolute inset-x-1 -bottom-px h-px bg-linear-to-r
                  from-primary-500/0 via-primary-500/70 to-primary-500/0
                  dark:from-primary-400/0 dark:via-primary-400/40
                  dark:to-primary-400/0
                "
              />
              <span class="sr-only">{{ navLabel(item.name) }}</span>
            </ULink>
          </UTooltip>
        </li>
        <li class="flex-1" />
        <li>
          <AppLanguageSwitcher />
        </li>
        <li>
          <AppThemeToggle />
        </li>
      </ul>
    </UContainer>
  </header>
</template>
