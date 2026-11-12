<script setup lang="ts">
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const localeCodes = computed(() =>
  locales.value.map(localeItem => typeof localeItem === 'string' ? localeItem : localeItem.code),
)
</script>

<template>
  <nav
    class="flex items-center gap-1"
    :aria-label="$t('nav.language')"
  >
    <NuxtLink
      v-for="code in localeCodes"
      :key="code"
      :to="switchLocalePath(code)"
      class="rounded-sm px-1.5 py-1 text-xs font-medium uppercase transition"
      :class="locale === code
        ? 'text-primary-600 dark:text-primary-400'
        : 'text-muted hover:text-default'"
      :aria-current="locale === code ? 'page' : undefined"
    >
      {{ code }}
    </NuxtLink>
  </nav>
</template>
