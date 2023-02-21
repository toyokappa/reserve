const login = (loggedIn, cookie) => async (loginInfo) => {
  const { $toast } = useNuxtApp()
  try {
    const data = await $fetch('/staff/auth/sign_in', {
      baseURL: useRuntimeConfig().apiBaseURL,
      method: 'POST',
      body: loginInfo,
    })
    cookie.value = data.access_token
    loggedIn.value = true

    const to = useRoute().redirectedFrom?.path || '/staff'
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

const logout = (loggedIn) => () => {
  loggedIn.value = false
  useCookie('staff_access_token').value = null
  useNuxtApp().$toast.info('ログアウトしました')
  useRouter().push('/staff/login')
}

const getAuth = (cookie) => () => {
  if (cookie.value) {
    return 'Bearer ' + cookie.value
  } else {
    return ''
  }
}

export const useStaffAuth = () => {
  const cookie = useCookie('staff_access_token')
  const loggedIn = useState('staffLoggedIn', () => false)
  const currentStaff = useState('currentStaff')
  return {
    loggedIn,
    currentStaff,
    getAuth: getAuth(cookie),
    login: login(loggedIn, cookie),
    logout: logout(loggedIn),
  }
}