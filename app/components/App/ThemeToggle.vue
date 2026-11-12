<script setup lang="ts">
const colorMode = useColorMode()
const { t } = useI18n()

const nextTheme = computed<'light' | 'dark'>(() => (colorMode.value === 'dark' ? 'light' : 'dark'))
const themeLabel = computed(() => t(`theme.${nextTheme.value}`))

const switchTheme = () => {
  colorMode.preference = nextTheme.value
}

const startViewTransition = (event: MouseEvent) => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!('startViewTransition' in document) || prefersReducedMotion) {
    switchTheme()
    return
  }

  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))

  const transition = document.startViewTransition(() => {
    switchTheme()
  })

  transition.ready.then(() => {
    document.documentElement.animate(
      {
        clipPath: [`circle(0px at ${String(x)}px ${String(y)}px)`, `circle(${String(endRadius)}px at ${String(x)}px ${String(y)}px)`],
      },
      {
        duration: 600,
        easing: 'cubic-bezier(.76,.32,.29,.99)',
        pseudoElement: '::view-transition-new(root)',
      },
    )
  }).catch(() => {
    // The transition is skipped when it is interrupted by another toggle
  })
}
</script>

<template>
  <ClientOnly>
    <UButton
      :aria-label="themeLabel"
      :icon="nextTheme === 'dark' ? 'lucide:sun' : 'lucide:moon'"
      color="neutral"
      variant="ghost"
      size="sm"
      class="cursor-pointer rounded-full"
      :ui="{
        leadingIcon: 'size-5',
        trailingIcon: 'size-5',
      }"
      @click="startViewTransition"
    />
    <template #fallback>
      <div class="size-5" />
    </template>
  </ClientOnly>
</template>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-new(root) {
  z-index: 9999;
}
::view-transition-old(root) {
  z-index: 1;
}
</style>
