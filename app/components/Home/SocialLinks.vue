<script setup lang="ts">
const links = [
  {
    name: 'Github',
    url: 'https://github.com/thomiOmi',
    icon: 'lucide:github',
  },
]
</script>

<template>
  <div>
    <h2 class="text-toned mb-4 text-xs font-semibold uppercase">Find Me on</h2>
    <div class="space-y-5">
      <NuxtLink
        v-for="link in links"
        :key="link.icon"
        :to="link.url"
        target="_blank"
        external
        class="group dark:hover:text-highlighted flex items-end gap-4"
      >
        <span class="text-sm">
          {{ link.name }}
        </span>
        <div class="border-muted group-hover:border-inverted flex-1 border-b border-dashed transition-colors"></div>
        <Icon :name="link.icon" class="size-5" />
      </NuxtLink>
    </div>
  </div>
</template>
