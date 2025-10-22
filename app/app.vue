<script setup lang="ts">
// import * as locales from '@nuxt/ui/locale'

// const { locale } = useI18n()

// const lang = computed(() => locales[locale.value].code)
// const dir = computed(() => locales[locale.value].dir)

const colorMode = useColorMode();

const isDark = computed({
  get() {
    return colorMode.value === 'dark';
  },
  set(_isDark) {
    colorMode.preference = _isDark ? 'dark' : 'light';
  },
});

useHead({
  // htmlAttrs: {
  //   lang,
  //   dir,
  // },
  meta: [
    {
      name: 'theme-color',
      content: isDark.value ? '#0f172b' : '#ffffff',
    },
  ],
});
</script>

<template>
  <NuxtLoadingIndicator color="#14b8a6" />

  <UApp>
    <div class="flex min-h-dvh flex-col">
      <AppNavbar />

      <NuxtPage />

      <AppFooter />
    </div>
  </UApp>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(5px);
}
</style>
