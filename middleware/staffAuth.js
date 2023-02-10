export default defineNuxtRouteMiddleware(async (to, from) => {
  const { loggedIn, currentStaff, getAuth } = useStaffAuth()
  try {
    const data = await $fetch('/staff/auth/validate_token', {
      baseURL: useRuntimeConfig().apiBaseURL,
      headers: {
        Authorization: getAuth()
      }
    })
    loggedIn.value = data.success
    currentStaff.value = data.data
  } catch (e) {
    if (e.status === 401) {
      loggedIn.value = false
    } else {
      throw e
    }
  }

  if (!loggedIn.value && to.path !== '/staff/login') {
    const path = '/staff/login'
    return { path }
  }
})