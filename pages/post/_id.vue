<template>
  <article class="post">
    <header class="post-header">
      <div class="post-title">
        <h1>{{ post.title }}</h1>
        <nuxt-link to="/">
          <i class="el-icon-back"></i>
        </nuxt-link>
        <button @click="download(post)">download</button>
      </div>
      <div class="post-info">
        <small>
          <i class="el-icon-time"></i>
          {{ new Date(post.date).toLocaleString() }}
        </small>
        <small>
          <i class="el-icon-view"></i>
          {{ post.views }}
        </small>
      </div>
      <div class="post-image">
        <video v-if="post.type === 'video'" controls>
          <source :src="post.imageUrl" type="video/mp4" />
        </video>
        <audio v-if="post.type === 'audio'" controls>
          <source :src="post.imageUrl" type="audio/ogg" />
        </audio>
        <img
          v-if="post.type === 'image'"
          :src="post.imageUrl"
          alt="post image"
        />
        <img
        class="icon-doc"
          v-if="post.type === 'document'"
          src="~/assets/images/document-icon.jpg"
          alt="post image"
        />
      </div>
    </header>
    <main class="post-content">
      <vue-markdown> {{ post.text }}</vue-markdown>
    </main>
    <footer>
      <app-comment-form
        :postId="post._id"
        v-if="canAddComment"
        @created="createCommentHendler"
      />
      <div class="comments" v-if="post.comments.length">
        <app-comment
          v-for="comment in post.comments"
          :key="comment._id"
          :comment="comment"
        />
      </div>
      <div class="text-center" v-else>Коментариев нет</div>
    </footer>
  </article>
</template>

<script>
import AppComment from "@/components/main/Comment";
import AppCommentForm from "@/components/main/CommentForm";
export default {
  data() {
    return {
      canAddComment: true,
    };
  },
  validate({ params }) {
    return Boolean(params.id);
  },
  async asyncData({ store, params }) {
    const post = await store.dispatch("post/fetchById", params.id);
    await store.dispatch("post/addView", post);
    return {
      post: { ...post, views: ++post.views },
    };
  },
  components: {
    AppComment,
    AppCommentForm,
  },
  methods: {
    download(post) {
      const url = post.imageUrl;
      fetch(url)
        .then((res) => res.blob())
        .then((file) => {
          let tempUrl = URL.createObjectURL(file);
          let aTag = document.createElement("a");
          aTag.href = tempUrl;
          aTag.download = url.replace(/^.*[\\\/]/, "");
          document.body.appendChild(aTag);
          aTag.click();
          aTag.remove();
          URL.revokeObjectURL(tempUrl);
          console.log(tempUrl);
        })
        .catch(() => {
          alert("Failed to download file!");
        });
      console.log(post.imageUrl);
    },
    createCommentHendler(comment) {
      this.post.comments.unshift(comment);
      this.canAddComment = false;
    },
  },
};
</script>

<style scoped>
.post {
  max-width: 600px;
  margin: 0 auto;
}
.post-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
.post-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}
.post-image img {
  width: 100%;
  height: auto;
}
.post-image .icon-doc {
  width: 50px;
  height: 50px;
}
.post-header {
  margin-bottom: 1.5rem;
}
.post-content {
  margin-bottom: 2rem;
}
</style>
