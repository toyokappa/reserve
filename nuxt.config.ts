// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
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
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap' },
      ],
      script: [
        { src: 'https://js.pay.jp/v2/pay.js', defer: true }, // TODO: 呼び出し方は要検討
      ]
    }
  },
  runtimeConfig: {
    public: {
      appHost: process.env.APP_HOST,
      apiBaseURL: process.env.API_BASE_URL,
      apiBasicUser: process.env.API_BASIC_USER,
      apiBasicPass: process.env.API_BASIC_PASS,
      payjpApiToken: process.env.PAYJP_API_TOKEN,
    }
  }
})
