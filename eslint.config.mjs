// @ts-check
import betterTailwindcss from 'eslint-plugin-better-tailwindcss'
import { getDefaultAttributes } from 'eslint-plugin-better-tailwindcss/api/defaults'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt()
  .append(
    betterTailwindcss.configs['correctness-error'],
    {
      settings: {
        'better-tailwindcss': {
          entryPoint: 'app/assets/css/main.css',
          attributes: [
            ...getDefaultAttributes(),
            ['^(v-bind:|:)?ui$', [{ match: 'objectValues' }]],
          ],
        },
      },
      rules: {
        // `star` is a scoped class defined in SkyBg.vue, not a Tailwind utility
        'better-tailwindcss/no-unknown-classes': ['error', { ignore: ['^star$'] }],
      },
    },
  )
