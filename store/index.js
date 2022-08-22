export const actions = {
  nuxtServerInit({dispatch}) {
    dispatch('auth/autoLogin')
  }
}

export const state = () => ({
  error: null
})

export const mutations = {
setError(state, payload) {
  state.error = payload
}
}

export const getters = {
  isError(state) {
    return state.error
  },
}

