// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    "@/assets/styles/reset.css",
  ],
  vite: {
    css: {
      preprocessorOptions: {
        sass: {
          additionalData: '@import "@/assets/styles/main.sass"'
        }
      }
    },
  },
  app: {
    head: {
      title: '予約システム',
      htmlAttrs: {
        lang: 'ja'
      },
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:400,700' },
      ]
    }
  },
  runtimeConfig: {
    public: {
      apiBaseURL: process.env.API_BASE_URL
    }
  }
})
