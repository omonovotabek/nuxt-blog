
export const actions = { 

  async fetch({commit}, name) {
    try {
      let url = `/api/post`;
      if (name) {
        if (name === "Images") {
          url = `/api/post?sort=images`;
        }
        if (name === "Videos") {
          url = `/api/post?sort=videos`;
        }
        if (name === "Audios") {
          url = `/api/post?sort=audios`;
        }
        if (name === "Documents") {
          url = `/api/post?sort=documents`;
        }
      }
      return await this.$axios.$get(url);
      // return await this.$axios.$get('/api/post')
    } catch (e) {
      commit("setError", e.response, { root: true });
    }
  },

  async fetchAdmin({commit}) {
    try {
      return await this.$axios.$get('/api/post/admin')
    } catch (e) {
      commit("setError", e.response, { root: true });
    }
  },

  async fetchById({commit}, id) {
    try {
      return await this.$axios.$get(`/api/post/${id}`)
    } catch (e) {
      commit("setError", e.response, { root: true });
    }
  },

  async fetchAdminById({commit}, {params, query}) {
    try {
      const queryString = Object.entries(query).map(e => e.join('=')).join('&');
      return await this.$axios.$get(`/api/post/admin/${params.id}?${queryString}`)
    } catch (e) {
      commit("setError", e.response, { root: true });
    }
  },

  async create({commit }, {title, text, image}) {
    try {     
      const fd = new FormData()
      fd.append('title', title)
      fd.append('text', text)
      fd.append('image', image)          
      await this.$axios.$post('/api/post/admin', fd)
    } catch (e) {
      commit("setError", e.response, { root: true });
    }
  },

  async remove({ commit }, {id, imageName}) {
    try {
      await this.$axios.$delete(`/api/post/admin/${id}?imageName=${imageName}`)
    } catch (e) {
      commit("setError", e.response, { root: true });
    }
  },

  async update({ commit }, { id, text }) {
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
