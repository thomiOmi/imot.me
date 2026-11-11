// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

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
  devtools: { enabled: true },
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
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'My personal website' },
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
  ui: {
    fonts: false,
  },
  compatibilityDate: '2025-07-15',
  nitro: {
    prerender: {
      routes: ['/'],
      crawlLinks: true,
    },
  },
  eslint: {
    config: {
      stylistic: true,
      formatters: true,
      typescript: {
        tsconfigPath: './tsconfig.json',
      },
    },
  },
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
})
