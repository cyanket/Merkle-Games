// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  srcDir: 'app/',
  css: ['~/assets/styles/main.scss'],
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:8000/api/v1'
    }
  },
  app: {
    head: {
      title: 'Game World',
      meta: [
        { name: 'description', content: 'Explore games released between 2015 and 2017.' }
      ]
    }
  }
})
