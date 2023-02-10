const login = (loggedIn, cookie) => async (loginInfo) => {
  try {
    const data = await $fetch('/customer/auth/sign_in', {
      baseURL: useRuntimeConfig().apiBaseURL,
      method: 'POST',
      body: loginInfo,
    })
    cookie.value = data.access_token
    loggedIn.value = true

    const to = useRoute().redirectedFrom?.path || '/'
    useRouter().push(to)
  } catch (e) {
    throw e
  }
}

const logout = (loggedIn, cookie) => async () => {
  loggedIn.value = false
  cookie.value = null
}

const getAuth = (cookie) => () => {
  if (cookie.value) {
    return 'Bearer ' + cookie.value
  } else {
    return ''
  }
}

export const useCustomerAuth = () => {
  const cookie = useCookie('customer_access_token')
  const loggedIn = useState('customerLoggedIn', () => false)
  const currentCustomer = useState('currentCustomer')
  return {
    loggedIn,
    currentCustomer,
    getAuth: getAuth(cookie),
    login: login(loggedIn, cookie),
    logout: logout(loggedIn, cookie),
  }
}