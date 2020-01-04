<template>
  <v-app>
    <v-toolbar fixed app class="elevation-1" color="#fff">
      <v-toolbar-title>
        <nuxt-link to="/" class="brand">{{ title }}</nuxt-link>
      </v-toolbar-title>
      <v-spacer />
      <v-btn v-if="!isAuthenticated" color="primary" flat nuxt to="/login"
        >ログイン</v-btn
      >
      <v-btn v-if="isAuthenticated" flat to="/bookmarks">ブックマーク</v-btn>
      <v-btn v-if="isAuthenticated" flat @click="logout">ログアウト</v-btn>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer color="white" class="pa-3">
      <v-spacer></v-spacer>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import { auth } from '~/plugins/firebase-init'

export default {
  data() {
    return {
      title: process.env.siteName
    }
  },

  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated
    }
  },

  methods: {
    logout() {
      auth.signOut()
      this.$store.dispatch('logoutUser')
    }
  }
}
</script>

<style>
.brand {
  text-decoration: none;
  color: inherit;
}
</style>
