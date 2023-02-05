import type { RouterOptions } from '@nuxt/schema'
import { RouterOptions as VueRouterOptions } from 'vue-router'

export default <RouterOptions> {
  routes(_routes: VueRouterOptions['routes']) {
    return [..._routes, {
      path: '/',
      component: () => import('~/pages/customer/index.vue')
    }]
  }
}