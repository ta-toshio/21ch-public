const isEmpty = require('lodash.isempty')
const pick = require('lodash.pick')

const userModel = {
  uid: null,
  email: null,
  emailVerified: null,
  displayName: null,
  isAnonymous: null,
  lastLoginAt: null,
  photoURL: null,
  providerData: null,
  apiKey: null,
  accessToken: null,
  refreshToken: null,
  expirationTime: null
}

const providerDataModel = {
  uid: null,
  displayName: null,
  email: null,
  photoURL: null,
  providerId: null // "twitter.com"
}

const parseUserForClient = data => {
  if (isEmpty(data)) {
    return null
  }

  const me = { ...userModel }
  me.uid = data.uid
  me.email = data.email
  me.emailVerified = data.emailVerified
  me.displayName = data.displayName
  me.isAnonymous = data.isAnonymous
  me.lastLoginAt = data.lastLoginAt
  me.photoURL = data.photoURL
  me.providerData = []

  if (!isEmpty(data.providerData)) {
    data.providerData.forEach(providedData => {
      const meProvierData = { ...providerDataModel }
      meProvierData.uid = providedData.uid
      meProvierData.displayName = providedData.displayName
      meProvierData.email = providedData.email
      meProvierData.photoURL = providedData.photoURL
      meProvierData.providerId = providedData.providerId

      me.providerData.push(meProvierData)
    })
  }

  if (!isEmpty(data.stsTokenManager)) {
    me.apiKey = data.stsTokenManager.apiKey
    me.accessToken = data.stsTokenManager.accessToken
    me.refreshToken = data.stsTokenManager.refreshToken
    me.expirationTime = data.stsTokenManager.expirationTime
  }

  return me
}

const parseUserForServer = data => {
  if (isEmpty(data)) {
    return null
  }

  const me = { ...userModel }
  me.uid = data.uid
  me.email = data.email
  me.emailVerified = data.emailVerified
  me.displayName = data.displayName
  me.photoURL = data.photoURL
  me.isAnonymous = data.isAnonymous
  if (!isEmpty(data.metadata)) {
    me.lastLoginAt = data.metadata.lastSignInTime
  }
  me.providerData = []
  if (!isEmpty(data.providerData)) {
    data.providerData.forEach(providedData => {
      const meProvierData = { ...providerDataModel }
      meProvierData.uid = providedData.uid
      meProvierData.displayName = providedData.displayName
      meProvierData.email = providedData.email
      meProvierData.photoURL = providedData.photoURL
      meProvierData.providerId = providedData.providerId

      me.providerData.push(meProvierData)
    })
  }
  return me
}

const toMinimal = user => {
  if (isEmpty(user)) {
    return user
  }

  return pick(user, ['uid', 'displayName', 'photoURL'])
}

module.exports = {
  userModel,
  providerDataModel,
  parseUserForServer,
  parseUserForClient,
  toMinimal
}
