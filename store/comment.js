export const actions = {
    async createComment({commit}, data){
        try {
            return await this.$axios.$post('/api/comment', data)
        } catch (error) {
            console.log(error);
        } 
    },

    async deleteComment({commit}, id){
        try {
            return await this.$axios.$delete(`/api/comment/${id}`)
        } catch (error) {
            console.log(error);
        } 
    }
}