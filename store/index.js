export const actions = {
  nuxtServerInit({dispatch}) {
    dispatch('auth/autoLogin')
  }
}