import { useStaffAuth } from "~~/composables/useStaffAuth";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { staffLoggedIn, currentStaff, getAuth } = useStaffAuth()
  try {
    const data = await $fetch('/staff/auth/validate_token', {
      baseURL: useRuntimeConfig().apiBaseURL,
      headers: {
        Authorization: getAuth()
      }
    })
    staffLoggedIn.value = data.success
    currentStaff.value = data.data
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