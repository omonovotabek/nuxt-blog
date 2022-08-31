<template>
  <el-col :xs="24" :sm="18" :md="12" :lg="6">
    <el-card shadow="hover" :body-style="{ padding: 0 }" class="post">
      <header slot="header" class="post-header">
        <h3>{{ post.title }}</h3>
        <small>
          <i class="el-icon-time"></i>
          {{ new Date(post.date).toLocaleString() }}</small
        >
      </header>

      <div class="post-body">
        <video v-if="post.type === 'video'" class="post-img">
          <source :src="post.imageUrl" type="video/mp4" />
        </video>
        <img
          class="post-img"
          v-if="post.type === 'audio'"
          src="~/assets/images/muzic-icon.png"
          alt=""
        />
        <img
          v-if="post.type === 'image'"
          :src="post.imageUrl"
          alt="post image"
          class="post-img"
        />
        <img
          v-if="post.type === 'document'"
          src="~/assets/images/document-icon.jpg"
          alt="post image"
          class="post-img"
        />
      </div>

      <footer class="post-footer">
        <el-button round @click="openPost">Открыть</el-button>
        <span>
          <i class="el-icon-message"></i>
          {{ post.comments.length }}
        </span>
      </footer>
    </el-card>
  </el-col>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  // created() {
  //  console.log(this.props)
  // },
  methods: {
    openPost() {
      const id = this.post._id;
      this.$router.push(`/post/${id}`);
      console.log(id);
    },
  },
};
</script>

<style scoped>
.post {
  margin-bottom: 1.5rem;
}
.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.post-img {
  width: 100%;
  height: 100%;
}
.post-body {
  width: 100%;
  height: 300px;
}
.post-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}
</style>
