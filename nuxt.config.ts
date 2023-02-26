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
      title: '予約システム | Sympl Reserve',
      htmlAttrs: {
        lang: 'ja'
      },
      meta: [
        { name: 'apple-mobile-web-app-title', content: 'Reserve' },
        { name: 'application-name', content: 'Reserve' },
        { name: 'msapplication-TileColor', content: '#ffc40d' },
        { name: 'theme-color', content: '#ffffff' },
      ],
      link: [
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#68b3f9' },      
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
  },
  router: {
    options: {
      strict: true
    }
  },
})
