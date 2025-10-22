<script setup lang="ts">
// import * as locales from '@nuxt/ui/locale'

// const { locale } = useI18n()

// const lang = computed(() => locales[locale.value].code)
// const dir = computed(() => locales[locale.value].dir)

useHead({
  // htmlAttrs: {
  //   lang,
  //   dir,
  // },
  title: 'Thomi Syauqi',
})
</script>

<template>
  <NuxtLoadingIndicator />

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
