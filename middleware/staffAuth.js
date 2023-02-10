import { useStaffAuth } from "~~/composables/useStaffAuth";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { staffLoggedIn, getToken } = useStaffAuth()
  try {
    const data = await $fetch(`${useRuntimeConfig().apiBaseURL}/staff/auth/validate_token`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    staffLoggedIn.value = data.success
  } catch (e) {
    if (e.status === 401) {
      staffLoggedIn.value = false
    } else {
      throw e
    }
  }

  if (!staffLoggedIn.value && to.path !== '/staff/login') {
    const path = '/staff/login'
    return { path }
  }
})