<template>
  <v-layout column>
    <v-flex xs12>
      <v-card v-for="(category, i) in categories" :key="i" class="mb-4">
        <v-card-title class="headline">
          {{ category.title }}
        </v-card-title>
        <v-card-text class="categories">
          <span
            v-for="(subCategory, j) in category.subCategories"
            :key="j"
            class="pr-3 pb-2 subheading category"
          >
            <nuxt-link
              :to="{
                name: 'category-id',
                params: { id: subCategory.slug }
              }"
            >
              {{ subCategory.title }}
            </nuxt-link>
          </span>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { auth } from '~/plugins/firebase-init'
import HeadMixin from '~/mixins/HeadMixin'

export default {
  mixins: [HeadMixin],
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated
    },
    categories() {
      return this.$store.getters['category/categories']
    }
  },
  async fetch({ store }) {
    await store.dispatch('category/loadCategories')
  },
  methods: {
    logout() {
      auth.signOut()
      this.$store.dispatch('logoutUser')
    }
  }
}
</script>

<style scoped>
.categories {
  text-align: justify;
  text-justify: inter-ideograph;
}
.category {
  display: inline-block;
}
</style>
