// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/eslint-module",
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxt/devtools",
    "@nuxtjs/stylelint-module",
    "@nuxtjs/google-fonts",
    "@nuxt/image",
    "@nuxtjs/color-mode",
    "nuxt-icon",
    "@nuxtjs/html-validator",
  ],
});
