const { isEmpty, pick } = require('../utils')

export const userModel = {
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

export const providerDataModel = {
  uid: null,
  displayName: null,
  email: null,
  photoURL: null,
  providerId: null // "twitter.com"
}

export const parseUserForClient = data => {
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

export const parseUserForServer = data => {
  if (isEmpty(data)) {
    return null
  }
  const me = { ...userModel }
  me.uid = data.uid
  me.email = data.email
  me.emailVerified = data.emailVerified
  me.displayName = data.displayName
  me.photoURL = data.photoURL
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

export const toMinimal = user => {
  if (isEmpty(user)) {
    return user
  }

  return pick(user, ['uid', 'displayName', 'photoURL'])
}
