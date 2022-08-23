

export const actions = { 

  async fetch({}) {
    try {
      return await this.$axios.$get('/api/post')
    } catch (e) {
      commit("setError", e.response, { root: true });
    }
  },

  async fetchAdmin({}) {
    try {
      return await this.$axios.$get('/api/post/admin')
    } catch (e) {
      commit("setError", e.response, { root: true });
    }
  },

  async fetchById({}, id) {
    try {
      return await this.$axios.$get(`/api/post/${id}`)
    } catch (e) {
      commit("setError", e.response, { root: true });
    }
  },

  async fetchAdminById({}, {params, query}) {
    try {
      const queryString = Object.entries(query).map(e => e.join('=')).join('&');
      return await this.$axios.$get(`/api/post/admin/${params.id}?${queryString}`)
    } catch (e) {
      commit("setError", e.response, { root: true });
    }
  },

  async create({ }, {title, text, image}) {
    try {
      const fd = new FormData()
      fd.append('title', title)
      fd.append('text', text)
      fd.append('image', image)       
      return await this.$axios.$post('/api/post/admin', fd)
    } catch (e) {
      commit("setError", e.response, { root: true });
    }
  },

  async remove({ }, id) {
    try {
      const ad = await this.$axios.$delete(`/api/post/admin/${id}`)
      // console.log(ad)
      return ad
    } catch (e) {
      commit("setError", e.response, { root: true });
    }
  },

  async update({ }, { id, text }) {
    try {
      const ad = await this.$axios.$put(`/api/post/admin/${id}`, {text})
      // console.log(ad)
      return ad
    } catch (e) {
      commit("setError", e.response, { root: true });
    }
  },
  async addView({ }, {views, _id}) {
    try {
      return await this.$axios.$put(`/api/post/add/view/${_id}`, {views})
    } catch (e) {
      console.log(e)
    }
  },

  async getAnalytics({commit}) {
    try {
      return await this.$axios.$get('api/post/admin/get/analytics')
    } catch (error) {
      console.log(error)
    }
  }
  
}
