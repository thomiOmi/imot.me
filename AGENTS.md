# AGENTS.md

Guidance for AI coding agents working in this repo.

## Project

- Personal website for Thomi Syauqi, built with Nuxt 4, Vue 3, and TypeScript. Prerendered at build time.
- Locales: `en` (default) and `id`.
- Stack: Nuxt UI, Tailwind CSS 4 (configured in `app/assets/css/main.css`, no `tailwind.config`), @nuxt/image, @nuxt/fonts, @nuxt/icon, @nuxtjs/color-mode, @vueuse/nuxt, @nuxtjs/i18n, @nuxt/eslint.
- Package manager: Bun. Do not change the lockfile unless the task requires it.

## Commands

Use only scripts that exist in `package.json`.

- `bun run dev`, `bun run build`, `bun run preview`, `bun run generate`
- `bun run lint` and `bun run lint:fix`. ESLint handles formatting. Do not add Prettier.
- `bun run typecheck`. If types are missing, run `bunx nuxt prepare` first.
- Before finishing, `bun run lint` and `bun run build` must pass. Run `typecheck` if you changed TypeScript types.
- There is no test script by default. Do not add a test framework without asking. If a test script exists, run it after changing logic.
- `lint:fix` formats the whole project. Afterwards, check `git status` and report files outside the task scope. Do not revert them yourself.
- If the build fails for a reason unrelated to your task, report it and ask. Do not fix unrelated files silently.

## Scope and Boundaries

- Keep changes within the task. Do not reformat, rename, or refactor unrelated files.
- Ask before you:
  - change modules, prerender settings, `compatibilityDate`, or `routeRules` in `nuxt.config.ts`
  - delete files or routes
  - add a dependency (state the reason in your summary)
- Never run `git push --force`, `git reset --hard`, or delete branches without asking.
- Do not edit `.nuxt/` or `.output/`. They are generated.
- Do not commit `.env` files with secrets. When you add an environment variable, add a placeholder to `.env.example` in the same change.
- Never print secret values in logs or summaries. Never put secrets under `runtimeConfig.public`.

## Git

- Use Conventional Commits: `type(scope): description`.
- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`.
- Imperative mood, lowercase, no trailing period. Example: `feat(i18n): add indonesian translation for home page`.
- Use `!` or a `BREAKING CHANGE:` footer for breaking changes.
- One logical change per commit. Do not mix formatting with features.

## Project Structure

- `app/pages/`: file-based routing. Route meta goes in `definePageMeta`.
- `app/components/`, `app/composables/`, `app/utils/`: auto-imported.
- `app/layouts/`, `app/middleware/`, `app/plugins/`: layouts, route middleware, plugins.
- `app/app.config.ts`: runtime app config and Nuxt UI theme.
- `app/error.vue`: error page. It is not a route, so do not use `definePageMeta` there.
- `shared/utils/`, `shared/types/`: shared by app and server.
- `server/api/`, `server/routes/`: Nitro endpoints. `server/` is at the project root, not inside `app/`.
- Locale files: `en.json` and `id.json`, in the directory set by `@nuxtjs/i18n`.

## Vue and Nuxt

- Use `<script setup lang="ts">` and the Composition API. Do not use the Options API.
- Fetch data with `useFetch` or `useAsyncData` in component setup. A bare `$fetch` in setup runs twice. Use `$fetch` only in event handlers or client-only code.
- Every `useAsyncData` call needs a unique key. Use `refresh` to reload.
- Data used during prerender must be available at build time.
- Share state with `useState`. Avoid module-level global state.
- Read config with `useRuntimeConfig()`. Keys under `runtimeConfig.public` are visible to the client.
- Validate every request body, query, and route param in `server/` with a schema before using it.
- `window`, `document`, and `localStorage` fail during SSR and prerender. Guard them with `import.meta.client` or move them into `onMounted`. Use `useCookie` for values that must survive SSR.
- Do not render values that differ between server and client, such as `Date.now()` or `Math.random()`, directly in templates. Use `onMounted` or `<ClientOnly>`.
- Use `useRoute`, `useRouter`, and `navigateTo`, not `window.location`. Use `<NuxtLink>` for internal links.
- Set page metadata with `useSeoMeta` or `useHead`.
- Use `<NuxtImg>` or `<NuxtPicture>`, not `<img>`.
- Errors: `createError({ status, statusText, message })`. `statusText` must be short ASCII text. Put details in `message`. In production, the error page only receives `message` and `data`, so catch other errors and rethrow them with `createError` when the client needs details. Use `clearError({ redirect })` to leave the error page.

## i18n

- All user-facing text goes through `@nuxtjs/i18n`. Do not hardcode strings. Use `$t()` in templates and `useI18n()` in `<script setup>`.
- Add every new key to both `en` and `id` in the same change. Use nested keys, such as `home.hero.title`.
- Use `localePath()` for internal links and `switchLocalePath()` for language switches.
- Use `useLocaleHead()` or the module's SEO helpers for `lang`, `hreflang`, and alternate links.
- Do not translate route paths or code identifiers.
- Write Bahasa Indonesia naturally. Do not translate word for word from English.

## Theme, Styling, and UI

- Prefer Tailwind utility classes. Use Nuxt UI semantic color tokens so light and dark mode both work.
- Change global theme tokens in `app/app.config.ts` or `main.css`, not inside components.
- Use `<style scoped>` only when Tailwind cannot express the style, such as keyframe animations.
- If eslint-plugin-better-tailwindcss reports an unknown class, fix the class name first.
- Use Nuxt UI components such as `UButton` and `UModal` before writing custom ones. Change their look through the `ui` prop or `app.config.ts`. Confirm names in the Nuxt UI docs.
- Fonts come only from @nuxt/fonts. Do not add font `<link>` tags or `@import` rules. `ui.fonts` is `false`. Do not re-enable it.
- Icons: `<Icon name="lucide:icon-name" />` from @nuxt/icon. Other collections need a config change first.
- Keep `app.pageTransition` unless the task asks to change it.

## Docs and Utilities

- Check the docs before guessing an API: https://nuxt.com/docs/4.x, https://ui.nuxt.com, https://i18n.nuxtjs.org, https://vueuse.org, https://tailwindcss.com.
- VueUse composables are auto-imported. Check VueUse before writing a utility. Do not wrap a VueUse composable in a new one unless several places use it.

## Code Style

- Use `kebab-case` for non-component files and `PascalCase` for components.
- Avoid `any`. Use precise types, or `unknown` with explicit checks.
- Await promises, or handle them with `.catch` or `void`.
- Do not use `require()` in ESM files.
- Do not add `eslint-disable` without a clear reason in a comment.

## Done When

- The change matches the task scope and nothing unrelated changed.
- `bun run lint` and `bun run build` pass. `typecheck` passes if types changed.
- Every new i18n key exists in `en` and `id`.
- The summary lists changed files, commands run, and any command you did not run, with the reason.