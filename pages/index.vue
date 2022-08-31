<template>
  <div>
    <el-header>
      <app-navigation :getSort="getSort" />
    </el-header>
    <el-row type="flex-wrap" :gutter="20" justify="space-around">
      <app-post v-for="post in posts" :key="post._id" :post="post" />
    </el-row>
  </div>
</template>

<script>
import AppPost from "@/components/main/Post";
import AppNavigation from "@/components/main/Navigation";
export default {
  head: {
    title: "Главная",
  },
  components: {
    AppPost,
    AppNavigation,
  },
  data() {
    return {
      posts: "",
    };
  },
  async asyncData({ store }) {
    const posts = await store.dispatch("post/fetch");
    return { posts };
  },
  methods: {
    async getSort(name) {
      const res = await this.$store.dispatch("post/fetch", name);
      console.log(res)
      this.posts = res;
    },
  },
  //  created() {
  //     console.log(this.$router.push('/?test=tut&tez=123'));
  //     console.log(this.$route.query)
  //   },
};
</script>
