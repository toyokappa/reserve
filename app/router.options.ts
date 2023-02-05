import type { RouterOptions } from '@nuxt/schema'
import { RouterOptions as VueRouterOptions } from 'vue-router'

export default <RouterOptions> {
  routes(routes: VueRouterOptions['routes']) {
    const replacedRoutes = routes.map(route => {
      route.path = route.path.replace(/^\/customer\/?(.*)/, '/$1')
      return route
    })
    return replacedRoutes
  }
}