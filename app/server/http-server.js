const express = require('express')
const bodyParser = require('body-parser')
const {
  getUserByAdminFirebase,
  addLoginUserToRequestObject,
  postTwitter
} = require('./api-helper')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/api/ping', (req, res) => {
  res.json({ ping: 'pong' })
})

app.get('/api/user', async (req, res) => {
  const result = await getUserByAdminFirebase(req.query.cookie)
  res.json(result)
})

app.post('/api/post-twitter', async (req, res) => {
  try {
    await postTwitter(req.body.title)
    res.json({ result: true })
  } catch (e) {
    console.log(e)
    res.json({ result: false })
  }
})

app.get('/', async (req, res, next) => {
  await addLoginUserToRequestObject(req, req.headers.cookie)
  next()
})

app.get('/category/*', async (req, res, next) => {
  await addLoginUserToRequestObject(req, req.headers.cookie)
  next()
})

app.get('/bookmarks', async (req, res, next) => {
  await addLoginUserToRequestObject(req, req.headers.cookie)
  next()
})

module.exports = app
