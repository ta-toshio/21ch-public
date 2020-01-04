const { Nuxt } = require('nuxt')
const app = require('./http-server')

const config = {
  dev: false,
  buildDir: 'nuxt',
  build: {
    publicPath: '/assets/'
  }
}

const nuxt = new Nuxt(config)
app.use(nuxt.render)

module.exports = app
