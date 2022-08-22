// vuex ni ishlash prinsipi
// vuexdan foydalanishdan maqsad istalgan vue fayldan turib store papkasi ichida yozigan js fayl ichiga murojat qilish imkonini beradi
// vuex maxsus 3 ta object va 1 ta ozgaruvchi saqlab uni qaytarib beradigan funksiyadan iborat.
// state => ozgaruvchilarni saqlash uchun foydalaniladi
// mutations => methodlar qachon ishlaydi qachonki action objectidagi methodlarda murojat bolganda ishlaydi
// actions => server bilan ishlashda api larni yuborish uchun
// getters => statedagi qiymatlar ozgarishi bilan gettersdagi methodlar ishlaydi
// vuexda actionsdagi methoddan mutationsdagi methodga murojat qilish uchun
// mahsus method jonatuvchi kalit soz object ichiga olingan holda methodga parametr sifatida beriladi {dispatch, commit}. 
// actions objecti ichida ishlatish uchun dispatch("name", value)
// mutationsga murojat qilishda commitdan foydalaniladi
// name => mutationsga jonatilishi kerak bolgan method nomi; value => qandaydir qiymat
// commit => globalniy dispatch => localniy
// vuex shu tartibda ishlaydi
// Endi vue fayllardan turib vuex ga murojat qilishni korib chiqamiz
// vue fayllardan murojat asosan actions va gettersga boladi
// actionsga murojat: dispatch("faylnomi/methodnomi", parametr)
// gettersga murojat: store.getters['faylnomi/methodnomi']



import Cookie from 'cookie'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'
 
export const state = () => ({
  token: null
})

export const mutations = {
  setToken(state, payload) {
    state.token = payload
  },
  clearToken(state) {
    state.token = null
  }
}

export const actions = {
  async createUser({commit}, payload) {
    try {
      return await this.$axios.$post('/api/auth/admin/signUp', payload)  
    } catch (e) { 
      commit('setError',  e.response.data, { root: true })
    }
  },
  async login({ dispatch, commit }, payload) {
    try {
      const {token, message} = await this.$axios.$post('/api/auth/admin/signIn', payload)
      if(token)
        dispatch('setToken', token)
      return message
    } catch (e) {
      commit('setError',  e.response, { root: true })
    }
  },

  setToken({ commit }, payload) {
    this.$axios.setToken(payload)
    commit('setToken', payload)
    Cookies.set('jwt-token', payload)
  },

  logout({ commit }) {
    this.$axios.setToken(false)
    commit('clearToken')
    Cookies.remove('jwt-token')
  },


  autoLogin({ dispatch }) {
    const cookieStr = process.browser
      ? document.cookie
      : this.app.context.req.headers.cookie

    const cookies = Cookie.parse(cookieStr || '') || {}
    const token = cookies['jwt-token']

    if (isJWTValid(token)) {
      dispatch('setToken', token)
    } else {
      dispatch('logout')
    }
  }


}

export const getters = {
  isAuthenticated(state) {
    return Boolean(state.token)
  },
  token: state => state.token,
}

function isJWTValid(token) {
  if (!token)
    return false

  const jwtData = jwtDecode(token) || {}
  const expires = jwtData.exp || 0

  return (new Date().getTime() / 1000) < expires
}
