import type { RouterOptions } from '@nuxt/schema'
import { RouterOptions as VueRouterOptions } from 'vue-router'

export default <RouterOptions> {
  routes(_routes: VueRouterOptions['routes']) {
    return [..._routes, {
      name: 'customer-root',
      path: '/',
      component: () => import('~/pages/customer/index.vue')
    }]
  }
}