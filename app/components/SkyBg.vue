<script setup lang="ts">
interface Star {
  id: string
  x: number
  y: number
  size: number
  depth: number
  twinkleDelay: number
  durationMultiplier: number
}

const TWINKLE_DURATION_SECONDS = {
  slow: 4,
  normal: 2,
  fast: 1,
} as const

const props = withDefaults(
  defineProps<{
    starCount?: number
    color?: string
    size?: { min: number, max: number }
    speed?: 'slow' | 'normal' | 'fast'
    parallax?: boolean
    parallaxStrength?: number
  }>(),
  {
    starCount: 50,
    color: 'var(--ui-primary)',
    size: () => ({
      min: 1,
      max: 3,
    }),
    speed: 'normal',
    parallax: true,
    parallaxStrength: 20,
  },
)

const containerRef = useTemplateRef<HTMLElement>('containerRef')

// VueUse parallax (handles mouse + mobile gyroscope safely with SSR)
const { tilt, roll } = useParallax(containerRef)

// Normalize VueUse's -0.5..0.5 range to -1..1 and apply strength in pixels
const parallaxOffset = computed(() => {
  if (!props.parallax) {
    return { x: '0px', y: '0px' }
  }

  return {
    x: `${String(tilt.value * 2 * props.parallaxStrength)}px`,
    y: `${String(roll.value * 2 * props.parallaxStrength)}px`,
  }
})

// Generate random stars with size-based depth layering
const generateStars = (count: number): Star[] => {
  const sizeRange = props.size.max - props.size.min || 1

  return Array.from({ length: count }, (_, index) => {
    const size = Math.random() * (props.size.max - props.size.min) + props.size.min
    const normalizedSize = (size - props.size.min) / sizeRange

    return {
      id: `star-${String(index)}`,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size,
      // Larger stars appear closer (depth 0.2 to 1.0) and move faster
      depth: Number((0.2 + normalizedSize * 0.8).toFixed(2)),
      twinkleDelay: Number((Math.random() * 5).toFixed(2)),
      durationMultiplier: Number((0.8 + Math.random() * 0.5).toFixed(2)),
    }
  })
}

// Stars are random, so share the server-generated layout through Nuxt state to
// keep the client hydration deterministic.
const stars = useState<Star[]>('sky-bg-stars', () => generateStars(props.starCount))

// Regenerate stars if count or size bounds change dynamically at runtime
watch(
  () => [props.starCount, props.size.min, props.size.max],
  () => {
    stars.value = generateStars(props.starCount)
  },
)

const baseDuration = computed(() => TWINKLE_DURATION_SECONDS[props.speed])
</script>

<template>
  <div
    ref="containerRef"
    aria-hidden="true"
    class="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    :style="{
      '--parallax-x': parallaxOffset.x,
      '--parallax-y': parallaxOffset.y,
    }"
  >
    <div
      v-for="star in stars"
      :key="star.id"
      class="star absolute rounded-full"
      :style="{
        'left': `${star.x}%`,
        'top': `${star.y}%`,
        '--star-size': `${star.size}px`,
        '--star-color': color,
        '--star-depth': star.depth,
        '--twinkle-delay': `${star.twinkleDelay}s`,
        '--twinkle-duration': `${(baseDuration * star.durationMultiplier).toFixed(2)}s`,
      }"
    />
  </div>
</template>

<style scoped>
.star {
  width: var(--star-size);
  height: var(--star-size);
  background-color: var(--star-color);
  transform: translate3d(
    calc(-50% + (var(--parallax-x, 0px) * var(--star-depth))),
    calc(-50% + (var(--parallax-y, 0px) * var(--star-depth))),
    0
  );
  transition: transform 0.15s ease-out;
  animation: twinkle var(--twinkle-duration) ease-in-out var(--twinkle-delay) infinite;
}

@keyframes twinkle {
  0%,
  100% {
    opacity: 0.2;
  }
  50% {
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .star {
    animation: none;
    transition: none;
    transform: translate(-50%, -50%);
    opacity: 0.6;
  }
}
</style>
