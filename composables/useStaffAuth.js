const login = (loggedIn, cookie) => async (loginInfo) => {
  try {
    const data = await $fetch('/staff/auth/sign_in', {
      baseURL: useRuntimeConfig().apiBaseURL,
      method: 'POST',
      body: loginInfo,
    })
    cookie.value = data.access_token
    loggedIn.value = true

    const to = useRoute().redirectedFrom?.path || '/staff'
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

export const useStaffAuth = () => {
  const cookie = useCookie('staff_access_token')
  const loggedIn = useState('staffLoggedIn', () => false)
  const currentStaff = useState('currentStaff')
  return {
    loggedIn,
    currentStaff,
    getAuth: getAuth(cookie),
    login: login(loggedIn, cookie),
    logout: logout(loggedIn, cookie),
  }
}