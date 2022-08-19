<template>
  <div class="page-wrap">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/admin/list">Посты</el-breadcrumb-item>
      <el-breadcrumb-item>{{ post.title }}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form
      :model="controls"
      :rules="rules"
      ref="form"
      @submit.native.prevent="onSubmit"
    >
    <!-- <h2>Войти в панел администратора</h2> -->
      <el-form-item label="Текст в формате .md или .html" prop="text">
        <el-input 
        v-model="controls.text"
        type="textarea"
        resize="none"
        :rows="10"
        />
      </el-form-item>

       <div>
          <small>
            <i class="el-icon-time"></i>
            <span>
              {{new Date(post.date).toLocaleString()}}
            </span>
          </small>
          <small>
            <i class="el-icon-view"></i>
            <span>{{post.views}}</span>
          </small>
       </div>

      <el-form-item>
        <el-button type="primary" native-type="submit" round :loading="loading">
          Обнавить
        </el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
export default {
  layout: "admin",
  middleware: ["admin-auth"],
  head() {
    return {
      title: `Пост | ${this.post.title}`
    }
  },
  validate(context) {   
   return Boolean(context.params.id)
  },
  async asyncData({store, params, query}) {
    const post = await store.dispatch('post/fetchAdminById', {params, query})
    return {post}
  },
   data() {
    return {
      loading: false,
      controls: {
        text: ""
      },
      rules: {
        text: [
          {
            required: true,
            message: "Текст не должен быть пустым",
            trigger: "blur",
          }
        ]
      },
    }
  },
   methods: {
   async onSubmit () {
      const formData = {
        text: this.controls.text,
        id: this.post._id
      }
      try {
        await this.$refs.form.validate()
        this.loading = false
        await this.$store.dispatch('post/update', formData)
        this.$message.success('Пост обнавлен')
        console.log(this.$route.query)
      } catch (e) {
        this.loading = false
        console.log(e);
      }
    }
  }
};
</script>

<style scoped>
.page-wrap {
  width: 600px;
}
</style>