<template>
  <div>
    <el-form
      :model="controls"
      :rules="rules"
      ref="form"
      @submit.native.prevent="onSubmit"
    >
      <h1>Создать новый пост</h1>

      <el-form-item label="Введите название поста" prop="title">
        <el-input v-model.trim="controls.title" />
      </el-form-item>
      
      <el-form-item label="Текст в формате .md или .html" prop="text">
        <el-input
          type="textarea"
          v-model="controls.text"
          resize="none"
          :rows="10"
        />
      </el-form-item>

      <el-button type="success" plain @click="previewDialog = true">
        Предпросмотр
      </el-button>

      <el-dialog title="Предпросмотр" :visible.sync="previewDialog">
        <div :key="controls.text">
          <vue-markdown>{{ controls.text }}</vue-markdown>
        </div>
      </el-dialog>

      <el-upload
      drag
      action="https://jsonplaceholder.typicode.com/posts/"
      ref="upload"
      :on-change="handleimageChange"
      :auto-upload="false"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          Перетащите картинку
          <em>или нажмите</em>
        </div>
        <div class="el-upload__tip" slot="tip">
           файлы с расширением jpg/png
        </div>
      </el-upload>

      <el-form-item>
        <el-button type="primary" native-type="submit" round :loading="loading">
          Создать пост
        </el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
export default {
  layout: "admin",
  middleware: ["admin-auth"],
  data() {
    return {
      image: null,
      previewDialog: false,
      loading: false,
      controls: {
        text: "",
        title: "",
      },
      rules: {
        text: [
          {
            required: true,
            message: "Текст не должен быть пустым",
            trigger: "blur",
          },
        ],
        title: [
          {
            required: true,
            message: "Название поста не может быть пустым",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    handleimageChange(file, fileList){
      this.image = file.raw
    },
    async onSubmit() {
      const formData = {
        text: this.controls.text,
        title: this.controls.title,
        image: this.image
      };
     this.loading = true;
      try {
        await this.$refs.form.validate();
        if(!this.image){
          this.$message.warning('Форма не валидна');
          this.loading = false
          return
        }
        const ad = await this.$store.dispatch("post/create", formData);
        // console.log(ad)
        this.controls.text = "";
        this.controls.title = "";
        this.image = null
        this.$refs.upload.clearFiles()
        this.$message.success("Пост создан");
        this.loading = false
      } catch (e) {
        this.loading = false;
        this.$message.warning('Форма не валидна');
      }
    },
  },
};
</script>

<style scoped>
form {
  width: 600px;
}
</style>