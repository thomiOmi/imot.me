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
  routeRules: {
    '/': { prerender: true },
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      titleTemplate: '%s %separator %siteName',
      templateParams: {
        separator: '·',
        siteName: 'Thomi Syauqi',
      },
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        {
          name: 'description',
          content: 'My personal website',
        },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
    },
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
  icon: {
    serverBundle: {
      collections: ['lucide'],
    },
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
});
