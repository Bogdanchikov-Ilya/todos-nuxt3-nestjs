// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
    runtimeConfig: {
        public: {
            // baseURL: process.env.BASE_URL || 'https://jsonplaceholder.typicode.com/',
          baseURL: 'http://localhost:3001/'
        },
    },
  // plugins: ['~/plugins/editor.js'],
  modules: ['@pinia/nuxt'],
  routeRules: {
    // '/': { ssr: false },
  }
})
