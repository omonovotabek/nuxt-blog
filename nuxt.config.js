export default {
  head: {
    title: 'nuxt-blog',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  css: [
    'element-ui/lib/theme-chalk/index.css',
    '@/assets/css/index.css'
  ],

  plugins: [
    '@/plugins/element-ui',
    '@plugins/vee-validate',
    '@/plugins/vue-markdown',
    '@/plugins/axios',
  ],

  components: true,

  buildModules: [
  ],

  env: {
    baseUrl: process.env.BASE_URL,
  },

  modules: [
    '@nuxtjs/axios',
    'bootstrap-vue/nuxt'
  ],
  bootstrapVue: {
    icons: true
  },

  axios: {
    baseURL: process.env.BASE_URL,
  },


  build: {
    transpile: [/^element-ui/, "vee-validate/dist/rules"],
  },

  serverMiddleware: {
    '/api': '~/api'
  },  
  
  server: {
    port: process.env.PORT || 8000, // default: 3000
    // HOST: '0.0.0.0', // default: localhost,
    // timing: false
  },
}
