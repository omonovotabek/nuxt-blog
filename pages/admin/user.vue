<template>
  <div>
  
    <ValidationObserver  ref="form" v-slot="{ handleSubmit }">
      <el-form
        :model="controls"
        @submit.native.prevent="handleSubmit(onSubmit)"
      >
        <h2>Создать пользователя</h2>

        <ValidationProvider rules="required|min:3|max:10" v-slot="{ errors }">
          <div class="el-form-item" data-v-60b42378="">
            <label for="text" class="el-form-item__label">Имя</label>
            <div class="el-form-item__content">
              <div class="el-input" data-v-60b42378="">
                <input
                  type="text"
                  @keydown.space.prevent
                  autocomplete="off"
                  class="el-input__inner"
                  v-model="controls.firstName"
                  :class="{ isValid: errors[0] }"
                />
              </div>
              <div class="el-form-item__error" :class="{ isValid: errors[0] }">
                {{ errors[0] ? errors[0].replace("{field}", '') : '' }}
              </div>
            </div>
          </div>
        </ValidationProvider>

        <ValidationProvider rules="required|min:3|max:10" v-slot="{ errors }">
          <div class="el-form-item" data-v-60b42378="">
            <label for="text" class="el-form-item__label">Фамиля</label>
            <div class="el-form-item__content">
              <div class="el-input" data-v-60b42378="">
                <input
                  type="text"
                  @keydown.space.prevent
                  autocomplete="off"
                  class="el-input__inner"
                  v-model="controls.lastName"
                  :class="{ isValid: errors[0]}"
                />
              </div>
              <div class="el-form-item__error" :class="{ isValid: errors[0] }">
                {{ errors[0] ? errors[0].replace("{field}", '') : '' }}
              </div>
            </div>
          </div>
        </ValidationProvider>

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
                  :class="{ isValid: errors[0] || setError}"
                />
              </div>
              <div class="el-form-item__error" :class="{ isValid: errors[0] || setError }">
                {{ errors[0] ? errors[0].replace("{field}", '') : setError }}
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
                  class="el-input__inner"
                  v-model="controls.password"
                  :class="{ isValid: errors[0]}"
                />
               <span class="el-input__suffix">
                <span @click="show_password" class="el-input__suffix-inner">
                   <i v-if ="controls.password" class="el-input__icon el-icon-view el-input__clear"></i>
                </span>
               </span>
              </div>
              <div class="el-form-item__error" :class="{ isValid: errors[0]}">
                {{ errors[0] ? errors[0].replace("{field}", '') : '' }}
              </div>
            </div>
          </div>
        </ValidationProvider>

        <el-form-item>
          <el-button
            type="primary"
            native-type="submit"
            round
            :loading="loading"
          >
            Создать
          </el-button>
          
        </el-form-item>
      </el-form>
    </ValidationObserver>
  </div>
</template>

<script>
export default {
  layout: "admin",
  // middleware: ["admin-auth"],
  data() {
    return {
      loading: false,
      setError: '',
      controls: {
        lastName: "",
        firstName: "",
        email: "",
        password: "",
      },
    };
  },

  methods: {
    show_password(){
      const pass = this.$refs.password.getAttribute("type")
        if(pass === 'password' )
          this.$refs.password.setAttribute("type", "text")
        if(pass === 'text')
          this.$refs.password.setAttribute("type", "password")
    },

       
    async onSubmit() {
      const formData = {
        firstName: this.controls.firstName,
        lastName: this.controls.lastName,
        email: this.controls.email,
        password: this.controls.password,
      };
      try {
        this.loading = true;
        const {messageUsedEmail, messageCreateEmail} = await this.$store.dispatch("auth/createUser", formData);
        if(messageUsedEmail){
          this.setError = messageUsedEmail
        }
        if(messageCreateEmail){
        this.$message.success(messageCreateEmail);        
        this.controls.firstName = "";
        this.controls.lastName = "";
        this.controls.email = "";
        this.controls.password = "";      
        this.setError = ''
        }
        this.$refs.form.reset(); 
        this.loading = false;
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped>
form {
  width: 600px;
}
.el-form-item__label::before {
  content: "*";
  color: #f56c6c;
  margin-right: 4px;
}
.isValid, .isAsyncValid {
  border-color: #f56c6c;
}
</style>