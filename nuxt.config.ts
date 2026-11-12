// https://nuxt.com/docs/api/configuration/nuxt-config

// `@types/node` is not installed, so declare only the Node API used here.
declare const process: { env: Record<string, string | undefined> }

// Prerendered SEO tags (canonical/hreflang) are baked into the HTML at build
// time, so the canonical URL must be resolved during the build, not at runtime.
// Precedence: explicit override -> Vercel production domain -> local fallback.
const vercelProductionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL
const siteUrl = (
  process.env.NUXT_PUBLIC_I18N_BASE_URL
  || (vercelProductionHost ? `https://${vercelProductionHost}` : '')
  || 'http://localhost:3000'
).replace(/\/+$/, '')

export default defineNuxtConfig({

  modules: [
    '@nuxt/image',
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxtjs/color-mode',
    '@vueuse/nuxt',
    '@nuxtjs/i18n',
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
      routes: ['/', '/en', '/id'],
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
  i18n: {
    baseUrl: siteUrl,
    defaultLocale: 'en',
    strategy: 'prefix_and_default',
    restructureDir: 'app',
    langDir: 'locales',
    locales: [
      { code: 'en', language: 'en-US', file: 'en.json' },
      { code: 'id', language: 'id-ID', file: 'id.json' },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
  },
  icon: {
    serverBundle: {
      collections: ['lucide'],
    },
  },
})
