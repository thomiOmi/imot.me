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
    <h2 class="mb-4 text-xs font-semibold text-toned uppercase">
      Find Me on
    </h2>
    <div class="space-y-5">
      <NuxtLink
        v-for="link in links"
        :key="link.icon"
        :to="link.url"
        target="_blank"
        external
        class="
          group flex items-end gap-4
          dark:hover:text-highlighted
        "
      >
        <span class="text-sm">
          {{ link.name }}
        </span>
        <div
          class="
  flex-1 border-b border-dashed border-muted transition-colors
  group-hover:border-inverted
"
        />
        <Icon
          :name="link.icon"
          class="size-5"
        />
      </NuxtLink>
    </div>
  </div>
</template>
