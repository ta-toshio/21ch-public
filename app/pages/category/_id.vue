<template>
  <v-layout column>
    <v-flex xs12>
      <v-card class="mb-4">
        <v-card-title class="headline">
          {{ category && category.title }}
        </v-card-title>
        <v-card-text>
          <Markdown :html="category.description" />
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="primary"
            flat
            nuxt
            :to="{
              name: 'category-thread-new',
              params: { thread: category && category.slug }
            }"
          >
            新しくスレッドを立てる
          </v-btn>
        </v-card-actions>
      </v-card>

      <div>
        <v-sheet
          v-for="(thread, i) in threads"
          :key="i"
          class="mb-2 elevation-1"
        >
          <v-card-title class="title font-weight-bold">
            <nuxt-link
              :to="{
                name: 'category-thread-id',
                params: { thread: category && category.slug, id: thread.id }
              }"
            >
              <span class="author">{{ thread.title }}</span>
            </nuxt-link>
          </v-card-title>
          <div v-if="thread.comments" class="comments">
            <Comment :comments="thread.comments" />
          </div>
          <v-card-actions v-if="thread.count > 10">
            <v-btn
              flat
              :to="{
                name: 'category-thread-id',
                params: { thread: category && category.slug, id: thread.id }
              }"
              >もっと見る</v-btn
            >
          </v-card-actions>
        </v-sheet>
        <infinite-loading
          v-if="permitMoreLoad"
          spinner="spiral"
          @infinite="infiniteHandler"
        ></infinite-loading>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import Markdown from '~/components/Markdown'
import Comment from '~/components/Comment'

export default {
  components: {
    Markdown,
    Comment
  },

  computed: {
    loading() {
      return this.$store.getters['category/loading']
    },
    category() {
      return this.$store.getters['category/subCategory']
    },
    threads() {
      return this.$store.getters['category/threads']
    },
    hasMoreThread() {
      return this.$store.getters['category/hasMoreThread']
    },
    permitMoreLoad() {
      const loading = this.$store.getters['category/loading']
      const hasMore = this.$store.getters['category/hasMoreThread']
      return loading === false && hasMore === true
    }
  },

  async fetch({ store, params: { id } }) {
    await store.dispatch('category/loadSubCategory', id)

    await store.dispatch('category/loadThreads', id)
  },

  mounted() {
    const { id } = this.$route.params
    this.$store.dispatch('category/checkHasMoreThread', id)
  },

  methods: {
    infiniteHandler($state) {
      const { id } = this.$route.params
      this.$store.dispatch('category/loadMoreThread', id).then(res => {
        if (res) {
          $state.loaded()
        } else {
          $state.complete()
        }
      })
    }
  }
}
</script>

<style scoped>
.title > a {
  text-decoration: none;
}
</style>
