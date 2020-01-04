<template>
  <v-layout column>
    <v-flex xs12>
      <div
        v-if="
          thread && thread.imageUrl && thread.imageUrl != defaultThreadImage
        "
        class="hero mb-4"
      >
        <img :src="thread.imageUrl" class="hero-img" />
      </div>
      <div v-else>
        <h2 class="headline mb-4">{{ thread && thread.title }}</h2>
      </div>

      <div class="thread-actions mb-4">
        <no-ssr>
          <social-sharing
            :url="
              `https://21ch.site/${$route.params.thread}${thread && thread.id}`
            "
            :title="thread && thread.title"
            hashtags="21ch"
            inline-template
          >
            <div class="twitter">
              <network network="twitter">
                <i class="fa fa-fw fa-twitter"></i> Twitterでシェア
              </network>
            </div>
          </social-sharing>
        </no-ssr>
        <div class="thread-my-actions">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                flat
                icon
                :color="isBookmark()"
                @click="bookmark()"
                v-on="on"
              >
                <v-icon>bookmark</v-icon>
              </v-btn>
            </template>
            <span>お気に入りに追加</span>
          </v-tooltip>
        </div>
      </div>

      <v-divider class="mb-4"></v-divider>

      <div v-if="comments" class="comments mb-4">
        <Comment :comments="comments" />
      </div>

      <v-sheet class="pa-4">
        <form>
          <v-text-field
            v-model="name"
            :error-messages="nameErrors"
            label="名前(省略可)"
            single-line
            @input="$v.name.$touch()"
            @blur="$v.name.$touch()"
          ></v-text-field>
          <v-textarea
            v-model="body"
            :error-messages="bodyErrors"
            placeholder="コメント内容"
            required
            auto-grow
            rows="5"
            @input="$v.body.$touch()"
            @blur="$v.body.$touch()"
          ></v-textarea>

          <v-btn
            :loading="isSubmitting"
            :disabled="isSubmitting"
            color="primary"
            @click="submit"
          >
            作成
          </v-btn>
        </form>
      </v-sheet>
    </v-flex>
  </v-layout>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength } from 'vuelidate/lib/validators'
import uuidv4 from 'uuid/v4'
import { firebaseProxy } from '~/plugins/firebase-init'
import HeadMixin from '~/mixins/HeadMixin'
import Comment from '~/components/Comment'
import { toMinimal } from '~/domains/user'

export default {
  components: {
    Comment
  },

  mixins: [validationMixin, HeadMixin],

  validations: {
    name: { maxLength: maxLength(64) },
    body: { required, maxLength: maxLength(3000) }
  },

  data: () => ({
    name: '',
    body: '',
    defaultThreadImage: process.env.defaultThreadImage,
    isSubmitting: false,
    bookmarked: false
  }),

  computed: {
    thread() {
      return this.$store.getters['thread/thread']
    },
    comments() {
      return this.$store.getters['thread/comments']
    },
    user() {
      return this.$store.getters.user
    },
    nameErrors() {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.maxLength &&
        errors.push('名前は64文字以内で入力してください。')
      return errors
    },
    bodyErrors() {
      const errors = []
      if (!this.$v.body.$dirty) return errors
      !this.$v.body.maxLength &&
        errors.push('コメントは3000文字以内で入力してください。')
      !this.$v.body.required && errors.push('コメントを入力してください。')
      return errors
    }
  },

  async fetch({ store, params: { thread, id } }) {
    await store.dispatch('thread/loadThread', {
      subCategoryId: thread,
      threadId: id
    })
  },

  mounted() {
    const { thread, id } = this.$route.params
    const subCategoryId = thread
    const threadId = id
    this.$store.dispatch('thread/watchThread', { subCategoryId, threadId })

    if (this.$store.state.user && this.$store.state.user.uid) {
      this.$store
        .dispatch('bookmark/didBookmark', {
          threadId: id,
          uid: this.$store.state.user.uid
        })
        .then(bookmarked => {
          this.bookmarked = bookmarked
        })
    }
  },

  beforeDestroy() {
    this.$store.dispatch('thread/unsubscribe')
  },

  destroyed() {
    this.$store.dispatch('thread/clear')
  },

  methods: {
    async submit() {
      const user = toMinimal(this.user)
      const { thread, id } = this.$route.params
      const subCategoryId = thread
      const threadId = id

      this.$v.$touch()
      if (this.$v.$invalid) return
      this.isSubmitting = true

      const comment = {
        id: uuidv4(),
        name: this.name,
        body: this.body,
        user: user,
        publishedAt: firebaseProxy.firestore.FieldValue.serverTimestamp(),
        likes: 0
      }
      try {
        await this.$store.dispatch('thread/saveComment', {
          subCategoryId,
          threadId,
          comment
        })
        this.clearForm()
      } catch (e) {}
      this.isSubmitting = false
    },
    clearForm() {
      this.$v.$reset()
      this.name = ''
      this.body = ''
    },
    headInfo() {
      return {
        title: (this.thread && this.thread.title) || '',
        ogImagePath: (this.thread && this.thread.imageUrl) || ''
      }
    },
    bookmark() {
      const { thread, id } = this.$route.params
      const subCategoryId = thread
      const threadId = id
      const uid = this.user.uid

      this.bookmarked = !this.bookmarked
      if (this.bookmarked) {
        this.$store.dispatch('bookmark/storeThread', {
          subCategoryId,
          threadId,
          uid
        })
      } else {
        this.$store.dispatch('bookmark/removeThread', {
          threadId,
          uid
        })
      }
    },
    isBookmark() {
      return this.bookmarked ? 'primary' : ''
    }
  }
}
</script>

<style scoped>
.hero {
  text-align: center;
}

.hero-img {
  width: 100%;
  max-width: 600px;
}

.thread-actions {
  display: flex;
  align-items: center;
}

.thread-my-actions {
  margin-left: auto;
}

.twitter {
  background-color: #55acee;
  border: 2px solid #55acee;
  border-radius: 0;
  color: #fff;
  padding: 4px 32px;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  width: auto;
  display: inline-block;
  cursor: pointer;
}

.twitter:hover {
  background-color: #89bfe6;
  color: #fff;
}
</style>
