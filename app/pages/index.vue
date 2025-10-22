<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
definePageMeta({
  order: 1,
  icon: 'lucide:house',
  name: 'home',
});
</script>

<template>
  <UContainer as="main" class="flex flex-1 flex-col gap-24 pt-32">
    <HomeIntro />
    <HomeSocialLinks />
  </UContainer>
</template>
