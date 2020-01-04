const cookieparser = require('cookieparser')
const admin = require('firebase-admin')
const Twitter = require('twitter')
const serviceAccount = require('./firebase-admin-sdk.json')
const { parseUserForServer } = require('./domains/user')
const config = require('./config')

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: ''
  })
}

const twitterClient = new Twitter({
  consumer_key: config.twitter.consumerKey,
  consumer_secret: config.twitter.consumerSecret,
  access_token_key: config.twitter.accessTokenKey,
  access_token_secret: config.twitter.accessTokenSecret
})

const getUserByAdminFirebase = async cookie => {
  if (typeof cookie !== 'string') {
    return
  }

  const token = cookieparser.parse(cookie).__session
  if (!token) {
    return
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token)
    const userRecord = await admin.auth().getUser(decodedToken.user_id)
    // console.log('Successfully fetched user data:', userRecord.toJSON())
    const user = userRecord.toJSON()
    user.isAnonymous = user.providerData.length === 0
    return { user, token }
  } catch (e) {
    console.log('Error fetching user:', e)
  }
  return null
}

const addLoginUserToRequestObject = async (req, cookie) => {
  if (!cookie) {
    return
  }

  try {
    const data = await getUserByAdminFirebase(cookie)
    if (data) {
      req.fireAuth = {}
      req.fireAuth.user = parseUserForServer(data.user)
      req.fireAuth.token = data.token
    }
  } catch (e) {
    console.info(e)
  }
}

const postTwitter = text => {
  return new Promise((resolve, reject) => {
    twitterClient.post(
      'statuses/update',
      { status: text },
      (error, tweet, response) => {
        if (error) {
          reject(error)
        } else {
          resolve(tweet)
        }
      }
    )
  })
}

module.exports = {
  getUserByAdminFirebase,
  addLoginUserToRequestObject,
  postTwitter
}
