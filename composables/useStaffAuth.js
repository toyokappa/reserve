const login = (staffLoggedIn, cookie) => async (loginInfo) => {
  try {
    const data = await $fetch(`${useRuntimeConfig().apiBaseURL}/staff/auth/sign_in`, {
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

const getToken = (cookie) => () => {
  return cookie.value
}

export const useStaffAuth = () => {
  const cookie = useCookie('staff_access_token')
  const staffLoggedIn = useState('staffLoggedIn', () => false)
  const currentStaff = useState('currentStaff')
  return {
    staffLoggedIn,
    currentStaff,
    getToken: getToken(cookie),
    staffLogin: login(staffLoggedIn, cookie),
    staffLogout: logout(staffLoggedIn, cookie),
  }
}