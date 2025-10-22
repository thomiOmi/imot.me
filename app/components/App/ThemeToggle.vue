<script lang="ts" setup>
const colorMode = useColorMode()

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set(_isDark) {
    colorMode.preference = _isDark ? 'dark' : 'light'
  },
})
</script>

<template>
  <ClientOnly v-if="!colorMode?.forced">
    <UTooltip
      text="Toggle theme"
      :content="{
        positionStrategy: 'absolute',
      }"
    >
      <button
        class="hover:text-primary-500 dark:hover:text-primary-400 relative flex cursor-pointer items-center justify-center px-3 py-4 transition"
        type="button"
        @click="isDark = !isDark"
      >
        <Icon aria-hidden="true" :name="isDark ? 'lucide:sun' : 'lucide:moon'" class="size-5" />
        <span class="sr-only">Toggle theme</span>
      </button>
    </UTooltip>

    <template #fallback>
      <div class="px-3 py-4">
        <span class="size-5" />
      </div>
    </template>
  </ClientOnly>
</template>
