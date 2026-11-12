<template>
  <div class="space-y-6">
    <NuxtImg
      src="/avatar.jpeg"
      alt="Thomi Syauqi"
      class="
        size-12 rounded-full border border-muted ring-2 ring-muted
        transition-all duration-300
        hover:ring-4
        sm:size-16
      "
      sizes="48px sm:64px"
      width="64"
      height="64"
      placeholder
      format="webp"
    />
    <h1 class="text-xl font-bold tracking-tight text-default">
      {{ $t('home.hero.title') }}
    </h1>
    <p class="text-muted">
      {{ $t('home.hero.description') }}
    </p>
  </div>
</template>
