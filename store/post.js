import fileWebService from "../firebase/fileWebService"  
// import fileLocalService from "../firebase/fileLocalService" 

export const actions = { 

  async fetch({commit}) {
    try {
      return await this.$axios.$get('/api/post')
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
      // const fd = new FormData()
      // fd.append('title', title)
      // fd.append('text', text)
      // fd.append('image', image)     
      let imageUrl;
      // if(process.env.NODE_ENV === 'development')   
      //    imageUrl = await fileWebService.saveFile(image)
      
      // if(process.env.NODE_ENV === 'production') 
         imageUrl = await fileWebService.saveFile(image)
      
      await this.$axios.$post('/api/post/admin', {title, text, imageUrl})
    } catch (e) {
      commit("setError", e.response, { root: true });
    }
  },

  async remove({ commit }, id) {
    try {
      const imageUrl = await this.$axios.$delete(`/api/post/admin/${id}`)
      fileWebService.deleteFile(imageUrl)
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
