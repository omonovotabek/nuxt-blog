<template>
  <div>
    <h1>Добавить комментарый</h1>
    <el-form 
    :model="controls" 
    :rules="rules" 
    ref="form"
    @submit.native.prevent="onSubmit"
    >
      <el-form-item label="Ваше имя" prop="name">
        <el-input v-model="controls.name"></el-input>
      </el-form-item>

      <el-form-item label="Текст комментария" prop="text">
        <el-input
          type="textarea"
          v-model="controls.text"
          resize="none"
          :rows="2"
        ></el-input>
      </el-form-item> 

       <el-form-item>
        <el-button
        type="primary"
        native-type="submit"
        round
        :loading='loading'
        >
          Добавить комментарый
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {

  data() {
    return {
      loading: false,
      controls: {
        name: "",
        text: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "Имя не должно быть пустам",
            trigger: "blur",
          },
        ],
        text: [
          {
            required: true,
            message: "Введите ваш комментарый",
            trigger: "blur",
          },
        ],
      },
    }
  },

  methods: {
    async onSubmit () {
      const formData = {
        name: this.controls.name,
        text: this.controls.text,
        postId: ''
      }
      try {
        await this.$refs.form.validate()
        this.loading = true
        this.$message.success('Коментарий добавлен')
        this.$emit('created')
      } catch (error) {
        this.loading = false
      }    
    }
  }

};

</script>

<style scoped>
</style>