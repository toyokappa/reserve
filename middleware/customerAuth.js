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

  if (!loggedIn.value && to.path !== '/login') {
    const path = '/login'
    return { path }
  }
})