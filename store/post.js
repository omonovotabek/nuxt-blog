

export const actions = {

  async fetch({}) {
    try {
      return await this.$axios.$get('/api/post')
    } catch (e) {
      console.log(e)
    }
  },

  async fetchAdmin({}) {
    try {
      return await this.$axios.$get('/api/post/admin')
    } catch (e) {
      console.log(e)
    }
  },

  async fetchById({}, id) {
    try {
      return await this.$axios.$get(`/api/post/${id}`)
    } catch (e) {
      console.log(e)
    }
  },

  async fetchAdminById({}, {params, query}) {
    try {
      const queryString = Object.entries(query).map(e => e.join('=')).join('&');
      return await this.$axios.$get(`/api/post/admin/${params.id}?${queryString}`)
    } catch (e) {
      console.log(e)
    }
  },

  async create({ }, {title, text, image}) {
    try {
      const fd = new FormData()
      fd.append('title', title)
      fd.append('text', text)
      fd.append('image', image, image.name)       
      return await this.$axios.$post('/api/post/admin', fd)
    } catch (e) {
      console.log(e);
    }
  },

  async remove({ }, id) {
    try {
      const ad = await this.$axios.$delete(`/api/post/admin/${id}`)
      // console.log(ad)
      return ad
    } catch (e) {
      console.log(e)
    }
  },

  async update({ }, { id, text }) {
    try {
      const ad = await this.$axios.$put(`/api/post/admin/${id}`, {text})
      // console.log(ad)
      return ad
    } catch (e) {
      console.log(e)
    }
  },
  async addView({ }, {views, _id}) {
    try {
      return await this.$axios.$put(`/api/post/add/view/${_id}`, {views})
    } catch (e) {
      console.log(e)
    }
  },
  
}
