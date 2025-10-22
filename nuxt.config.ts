// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/image',
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxtjs/color-mode',
    '@vueuse/nuxt',
    // '@nuxtjs/i18n',
  ],
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  css: ['~/assets/css/main.css'],
  fonts: {
    defaults: {
      weights: ['100 900'],
    },
    families: [
      {
        name: 'Geist',
        provider: 'google',
      },
      {
        name: 'Geist Mono',
        provider: 'google',
      },
    ],
  },
  ui: {
    fonts: false,
  },
  // i18n: {
  //   defaultLocale: 'en',
  //   strategy: 'prefix_except_default',

  //   locales: [
  //     { code: 'en', name: 'English', file: 'en.json' },
  //     { code: 'id', name: 'Bahasa Indonesia', file: 'id.json' },
  //   ],

  //   detectBrowserLanguage: {
  //     useCookie: true,
  //     cookieKey: 'i18n_redirected',
  //     redirectOn: 'root',
  //   },
  // },
})
