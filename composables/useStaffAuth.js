const login = (staffLoggedIn, cookie) => async (loginInfo) => {
  try {
    const data = await $fetch('/staff/auth/sign_in', {
      baseURL: useRuntimeConfig().apiBaseURL,
      method: 'POST',
      body: loginInfo,
    })
    cookie.value = data.access_token
    staffLoggedIn.value = true

    const to = useRoute().redirectedFrom?.path || '/staff'
    useRouter().push(to)
  } catch (e) {
    throw e
  }
}

const logout = (staffLoggedIn, cookie) => async () => {
  staffLoggedIn.value = false
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
  const staffLoggedIn = useState('staffLoggedIn', () => false)
  const currentStaff = useState('currentStaff')
  return {
    staffLoggedIn,
    currentStaff,
    getAuth: getAuth(cookie),
    staffLogin: login(staffLoggedIn, cookie),
    staffLogout: logout(staffLoggedIn, cookie),
  }
}