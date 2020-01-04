import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import Cookies from 'js-cookie'
import { parseUserForClient } from '~/domains/user'

const config = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: ''
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

export const auth = firebase.auth()
export const db = firebase.firestore()
export const storage = firebase.storage()
export const firebaseProxy = firebase

export default ({ store }) => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      const loginUser = JSON.parse(JSON.stringify(user))
      const parseUser = parseUserForClient(loginUser)
      store.dispatch('loginUser', parseUser)
      user.getIdToken(true).then(token => {
        store.commit('setToken', token)
        Cookies.set('__session', token)
      })
    } else {
      store.dispatch('logoutUser')
      Cookies.remove('__session')

      firebase
        .auth()
        .signInAnonymously()
        .catch(e => console.log(e))
    }
  })
}
