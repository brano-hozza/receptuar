// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    mongoUrl: process.env.MONGO_URL,
  },
  modules: [
    '@nuxt/image',
    '@nuxt/devtools',
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/google-fonts',
    '@nuxtjs/color-mode',
    '@nuxtjs/html-validator',
    '@pinia/nuxt',
    'nuxt-icon',
  ],
})
