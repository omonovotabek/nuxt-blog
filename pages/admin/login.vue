<template>
  <el-card shadow="always" :style="{ width: '500px' }">
    <ValidationObserver  ref="form" v-slot="{ handleSubmit }">
    <el-form
      :model="controls"     
      @submit.native.prevent="handleSubmit(onSubmit)"
    >
    <h2>Войти в панел администратора</h2>
      
        <ValidationProvider rules="required|email" v-slot="{ errors }">
          <div class="el-form-item" data-v-60b42378="">
            <label for="email" class="el-form-item__label">Логин</label>
            <div class="el-form-item__content">
              <div class="el-input" data-v-60b42378="">
                <input
                  type="text"
                  autocomplete="off"
                  class="el-input__inner"
                  v-model="controls.email"
                  @keydown.space.prevent
                  @keyup="emailCheck"
                  :class="{ isValid: errors[0] || setErrorEmail && check}"
                />
              </div>
              <div class="el-form-item__error isValid" v-if="errors[0] || setErrorEmail && check">
                {{ errors[0] ? errors[0].replace("{field}", '') : setErrorEmail }}
              </div>
            </div>
          </div>
        </ValidationProvider> 

        <ValidationProvider rules="required|min:6" v-slot="{ errors }">
          <div class="el-form-item" data-v-60b42378="">
            <label for="password" class="el-form-item__label">Пароль</label>
            <div class="el-form-item__content">
              <div class="el-input" data-v-60b42378="">
                <input
                  ref="password"
                  type="password"
                  autocomplete="off"
                  @keydown.space.prevent
                  @keyup="passwordCheck"
                  class="el-input__inner"
                  v-model="controls.password"
                  :class="{ isValid: errors[0] || setErrorPassword && check}"
                />
               <span class="el-input__suffix">
                <span @click="show_password" class="el-input__suffix-inner">
                   <i v-if ="controls.password" class="el-input__icon el-icon-view el-input__clear"></i>
                </span>
               </span>
              </div>
              <div class="el-form-item__error isValid" v-if="errors[0] || setErrorPassword && check">
                {{ errors[0] ? errors[0].replace("{field}", '') : setErrorPassword }}
              </div>
            </div>
          </div>
        </ValidationProvider>

      <el-form-item>
        <el-button type="primary" native-type="submit" round :loading="loading">
          Войти
        </el-button>
      </el-form-item>
    </el-form>
    </ValidationObserver>
  </el-card>
</template>

<script>
export default {
  layout: "empty",
   data() { 
    return {
      check:true,
      loading: false,
      onSubmitEmail:'',
      onSubmitPassword:'',
      setErrorEmail:'',
      setErrorPassword:'',
      controls: {
        email: "",
        password: "",
      }
    }
  },

  mounted() {
    const {message} = this.$route.query
    if(message === 'login')
        this.$message.info('Для начала войдите в систему')

    if(message === 'logout')
        this.$message.success('Вы успешно вышли из систему')

    if(message === 'session')
        this.$message.warning('Время сессии истекло, пожалуйста зайдите заного')
  },
  methods: {
    passwordCheck(){
      if(this.setErrorPassword)
       this.check = false; 
      if(this.onSubmitPassword === this.controls.password)
       this.check = true; 
    },
    emailCheck(){
      if(this.setErrorEmail)
       this.check = false; 
      if(this.onSubmitEmail === this.controls.email)
       this.check = true; 
    },
    show_password(){
      const pass = this.$refs.password.getAttribute("type")
        if(pass === 'password' )
          this.$refs.password.setAttribute("type", "text")
        if(pass === 'text')
          this.$refs.password.setAttribute("type", "password")
    },
  
   async onSubmit () {
      const formData = {
        email: this.controls.email,
        password: this.controls.password
      }
      try {  
        this.check = true
        this.loading = true;
        const data = await this.$store.dispatch("auth/login", formData);
        if(data.messageCheckEmail){
          this.setErrorPassword = ''
          this.setErrorEmail = data.messageCheckEmail
          this.onSubmitEmail = this.controls.email 
        }
        if(data.messageCheckPassword){
          this.setErrorEmail =''
          this.setErrorPassword = data.messageCheckPassword
          this.onSubmitPassword = this.controls.password 
        }
        if(data.messageSuccess){
          this.$message.success(data.messageSuccess);
          this.$router.push('/admin')
          this.setErrorPassword = ''
          this.setErrorEmail =''
        }
        this.loading = false;
      } catch (e) {
        // console.log(e);
      }
    }
  }
};
</script>

<style scoped>

.el-form-item__label::before {
  content: "*";
  color: #f56c6c;
  margin-right: 4px;
}
.isValid, .setError {
  border-color: #f56c6c;
}
</style>