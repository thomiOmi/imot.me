<script setup lang="ts">
// Resolve the year once so the prerendered HTML and the hydrated client agree.
const year = useState('footer-year', () => new Date().getFullYear())
</script>

<template>
  <footer class="pb-8 text-center text-sm text-muted">
    <p>&copy; {{ year }} Thomi Syauqi. {{ $t('footer.rights') }}</p>
  </footer>
</template>
