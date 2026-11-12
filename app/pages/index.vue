<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
const { t } = useI18n()

definePageMeta({
  order: 1,
  icon: 'lucide:house',
  name: 'home',
})

useSeoMeta({
  title: () => t('home.meta.title'),
  description: () => t('home.hero.description'),
})
</script>

<template>
  <UMain class="flex flex-1 flex-col gap-24 pt-32">
    <HomeIntro />
    <HomeSocialLinks />
  </UMain>
</template>
