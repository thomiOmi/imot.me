<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
definePageMeta({
  order: 1,
  icon: 'lucide:house',
  name: 'home',
});
</script>

<template>
  <UMain class="flex flex-1 flex-col gap-24 pt-32">
    <HomeIntro />
    <HomeSocialLinks />
  </UMain>
</template>
