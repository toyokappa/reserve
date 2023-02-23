const getAuth = () => () => {
  const { apiBasicUser, apiBasicPass } = useRuntimeConfig().public
  return 'Basic ' + btoa(`${apiBasicUser}:${apiBasicPass}`)
}

export const useAdminAuth = () => {
  return {
    getAuth: getAuth()
  }
}