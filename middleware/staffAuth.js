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

  const skipRedirectPath = [
    '/staff/login',
    '/staff/login/password',
    '/staff/login/password/sendMail',
    '/staff/login/password/reset',
  ]
  if (!loggedIn.value && !skipRedirectPath.includes(to.path)) {
    const path = '/staff/login'
    return { path }
  }
  if (loggedIn.value && skipRedirectPath.includes(to.path)) {
    return { path: '/staff' }
  }
})