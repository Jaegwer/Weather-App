export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  target: 'static',
  router: {
    base: 'Weather-App'
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Flash Forecast',
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
      { rel: 'icon', type: 'image/x-icon', href: '/lighting.png' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
	'~/assets/style/style.css',
	'@fortawesome/fontawesome-svg-core/styles.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
	'~/plugins/fontawesome.js',
	{ src: '~/plugins/vue-autocomplete', mode: 'client' },


  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [

  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',

  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
	transpile: [
		({ isServer }) => 'vue-typeahead-bootstrap'
	  ]
  },
  store: {
    // path to the store file
    path: 'store/index.js',
    // add strict mode for development
    strict: process.env.NODE_ENV !== 'production'
  }
}
