<script lang="ts" setup>
import { titleCase } from 'scule'

const navRoutes = useNavRoutes()
</script>

<template>
  <header
    ref="headerRef"
    class="fixed inset-s-0 top-0 z-50 w-full"
  >
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
            :text="titleCase(item.name as string)"
            :content="{
              positionStrategy: 'absolute',
            }"
          >
            <ULink
              :to="item.path"
              class="
                relative flex items-center justify-center px-3 py-4 transition
                hover:text-primary-500
                dark:hover:text-primary-400
              "
              active-class="text-primary-600 dark:text-primary-400"
            >
              <Icon
                aria-hidden="true"
                :name="(item.meta.icon as string) || 'lucide:circle-dashed'"
                class="z-10 size-5"
              />
              <span
                v-if="$route.path === item.path"
                class="
                  absolute inset-x-1 -bottom-px h-px bg-linear-to-r
                  from-primary-500/0 via-primary-500/70 to-primary-500/0
                  dark:from-primary-400/0 dark:via-primary-400/40
                  dark:to-primary-400/0
                "
              />
              <span
                v-if="$route.path === item.path"
                class="
                  absolute top-1/2 left-1/2 z-0 size-8 -translate-1/2
                  rounded-full bg-neutral-100
                  dark:bg-white/10
                "
              />
              <span class="sr-only">{{ titleCase(item.name as string) }}</span>
            </ULink>
          </UTooltip>
        </li>
        <li class="flex-1" />
        <li>
          <AppThemeToggle />
        </li>
      </ul>
    </UContainer>
  </header>
</template>
