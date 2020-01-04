<template>
  <v-layout>
    <v-flex text-xs-center>
      <div id="firebaseui-auth-container"></div>
    </v-flex>
  </v-layout>
</template>

<script>
import { firebaseProxy as firebase, auth } from '~/plugins/firebase-init'

export default {
  mounted() {
    auth.onAuthStateChanged(user => {
      if (!user) {
        this.showLoginForm()
      } else if (user.isAnonymous) {
        this.showLoginForm()
      } else if (!user.isAnonymous) {
        this.$router.push({ name: 'index' })
      }
    })
  },

  methods: {
    showLoginForm() {
      const firebaseui = require('firebaseui-ja')
      const ui =
        firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth)

      const authProviders = {
        // Google: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        Twitter: firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        Email: {
          provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
          signInMethod:
            firebase.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD
        }
      }

      const config = {
        signInOptions: [
          authProviders.Email,
          // authProviders.Google,
          authProviders.Twitter
        ],
        signInSuccessUrl: '/',
        // tosUrl: '/tos',
        // privacyPolicyUrl: '/privacy-policy',
        callbacks: {
          signInSuccessWithAuthResult: authResult => {
            // const isNewUser = authResult.additionalUserInfo.isNewUser
            const uid = authResult.user.uid
            this.storeUser(uid)
            return true
          }
        }
      }
      ui.start('#firebaseui-auth-container', config)
    },
    storeUser(uid) {
      this.$store.dispatch('user/storeUser', uid)
    }
  }
}
</script>
