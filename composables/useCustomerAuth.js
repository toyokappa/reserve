const login = (loggedIn, cookie) => async (loginInfo) => {
  const { $toast } = useNuxtApp()
  try {
    const data = await $fetch('/customer/auth/sign_in', {
      baseURL: useRuntimeConfig().apiBaseURL,
      method: 'POST',
      body: loginInfo,
    })
    cookie.value = data.access_token
    loggedIn.value = true

    const to = useRoute().redirectedFrom?.path || '/'
    $toast.info('ログインしました')
    useRouter().push(to)
  } catch (e) {
    if (e.status === 401) {
      $toast.error('正しいログイン情報を入力してください')
    } else {
      $toast.error(`ログインに失敗しました(code: ${e.status})`)
    }
    throw e
  }
}

const logout = (loggedIn, cookie) => async () => {
  loggedIn.value = false
  cookie.value = null
  useNuxtApp().$toast.info('ログアウトしました')
  useRouter().push('/login')
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