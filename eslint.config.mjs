// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import { defineFlatConfig } from 'eslint-flat-config-utils'

export default withNuxt(
  defineFlatConfig({
    plugins: {
      prettier: require('eslint-plugin-prettier'),
    },
    extends: ['plugin:prettier/recommended'],
    rules: {
      'prettier/prettier': 'error',
    },
  })
)
