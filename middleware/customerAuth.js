export default defineNuxtRouteMiddleware(async (to, from) => {
  const { loggedIn, currentCustomer, getAuth } = useCustomerAuth()
  try {
    const data = await $fetch('/customer/auth/validate_token', {
      baseURL: useRuntimeConfig().apiBaseURL,
      headers: {
        Authorization: getAuth()
      }
    })
    loggedIn.value = data.success
    currentCustomer.value = data.data
  } catch (e) {
    if (e.status === 401) {
      loggedIn.value = false
    } else {
      throw e
    }
  }

  const skipRedirectPath = [
    '/register',
    '/register/sendMail',
    '/register/complete',
    '/login',
    '/login/password',
    '/login/password/sendMail',
    '/login/password/reset',
    '/reserve',
    '/reserve/complete',
  ]
  if (!loggedIn.value && !skipRedirectPath.includes(to.path)) {
    const path = '/login'
    return { path }
  }
  const loggedInRedirectPath = [
    '/register',
    '/register/sendMail',
    '/register/complete',
    '/login',
    '/login/password',
    '/login/password/sendMail',
    '/login/password/reset',
  ]
  if (loggedIn.value && loggedInRedirectPath.includes(to.path)) {
    return { path: '/' }
  }
})