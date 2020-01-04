const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
const environment = process.env.NODE_ENV || 'development'
const envSet = require(`./env.${environment}.js`)
const commonHead = require('./commonHead')

const env = {
  ...envSet,
  siteName: '21ちゃんねる',
  siteShortName: '21ch',
  description: '',
  defaultThreadImage: 'https://www.google.com/images/spin-32.gif?a'
}

module.exports = {
  mode: 'universal',

  srcDir: 'app',

  env,

  /*
   ** Headers of the page
   */
  head: commonHead(env),

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: ['~/assets/style/app.styl', 'firebaseui/dist/firebaseui.css'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/vuetify',
    { src: '@/plugins/firebase-init', ssr: false },
    { src: '@/plugins/infinite-loading', ssr: false },
    { src: '@/plugins/social-share', ssr: false },
    '@/plugins/nl2br'
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/markdownit'
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: envSet.baseUrl,
    proxy: true
    // debug: true
  },

  markdownit: {
    preset: 'default',
    injected: true,
    breaks: true,
    html: true,
    linkify: true,
    typography: true,
    xhtmlOut: true,
    langPrefix: 'language-',
    quotes: '“”‘’'
  },

  proxy: {
    '/api/': {
      target: envSet.apiUrl,
      pathRewrite: { '^/api/': '' }
    }
  },

  /*
   ** Build configuration
   */
  build: {
    publicPath: '/assets/',
    extractCSS: true,

    transpile: ['vuetify/lib'],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ['~assets/style/variables.styl']
      }
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
