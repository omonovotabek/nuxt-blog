<template>
  <el-row type="flex" justify="center">
    <el-col :xs="24" :sm="18" :md="12" :lg="10">
       <!-- <div class="post-body">
  <img 
  src="../static/4562.jpg" 
  alt="post image" 
  class="post-img"/>
  </div> -->
      <app-post 
      v-for="post in posts" 
      :key="post._id"
      :post="post" />
    </el-col>
  </el-row>
</template>

<script>
import AppPost from "@/components/main/Post";
export default {
  head:{
    title: "Главная"
  },
  async asyncData({store}) {
    const posts = await store.dispatch('post/fetch')
    return {posts}
  },
//  created() {
//     console.log(this.$router.push('/?test=tut&tez=123'));
//     console.log(this.$route.query)
//   },
  components: {
    AppPost,
  },
};
</script>
