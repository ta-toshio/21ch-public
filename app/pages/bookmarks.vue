<template>
  <v-layout column>
    <v-flex xs12>
      <v-card
        v-for="(bookmark, i) in bookmarks"
        :key="i"
        class=" elevation-1 mb-4"
      >
        <v-card-title class="title">
          <nuxt-link
            :to="{
              name: 'category-thread-id',
              params: { thread: bookmark.subCategoryId, id: bookmark.thread.id }
            }"
          >
            {{ bookmark.thread.title }}
          </nuxt-link>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  computed: {
    bookmarks() {
      return this.$store.getters['bookmark/bookmarks']
    }
  },

  async fetch({ store }) {
    if (store.state.user && store.state.user.uid) {
      const uid = store.state.user.uid
      await store.dispatch('bookmark/loadBookmarks', { uid })
    }
  }
}
</script>

<style scoped>
.title > a {
  text-decoration: none;
}
</style>
