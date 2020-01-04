const functions = require('firebase-functions')
const nuxtServer = require('./nuxt-server')

exports.ssr = functions.https.onRequest(nuxtServer)
