<script setup lang="ts">
const colorMode = useColorMode()

const isDark = computed(() => colorMode.value === 'dark')

const i18nHead = useLocaleHead()

useHead(() => ({
  htmlAttrs: {
    ...i18nHead.value.htmlAttrs,
  },
  link: [...i18nHead.value.link],
  meta: [
    ...i18nHead.value.meta,
    {
      name: 'theme-color',
      content: isDark.value ? '#0f172b' : '#ffffff',
    },
  ],
}))
</script>

<template>
  <NuxtLoadingIndicator color="#14b8a6" />

  <UApp>
    <SkyBg />

    <UContainer
      class="
        relative flex min-h-dvh flex-col border-default bg-default
        sm:border-x
      "
    >
      <AppNavbar />

      <NuxtPage />

      <AppFooter />
    </UContainer>
  </UApp>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition:
    opacity 0.2s,
    transform 0.2s;
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
