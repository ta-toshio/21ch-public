<template>
  <v-layout column>
    <v-flex xs12>
      <h2 class="headline mb-4">新しくスレッドを作成する</h2>
      <div>
        <form>
          <v-text-field
            v-model="title"
            :error-messages="titleErrors"
            :disabled="isSubmitting"
            :counter="100"
            label="スレッドタイトル"
            required
            @input="$v.title.$touch()"
            @blur="$v.title.$touch()"
          ></v-text-field>
          <v-text-field
            v-model="name"
            :error-messages="nameErrors"
            :disabled="isSubmitting"
            :counter="64"
            label="名前(省略可)"
            single-line
            @input="$v.name.$touch()"
            @blur="$v.name.$touch()"
          ></v-text-field>
          <v-textarea
            v-model="body"
            :error-messages="bodyErrors"
            :disabled="isSubmitting"
            required
            auto-grow
            rows="5"
            @input="$v.body.$touch()"
            @blur="$v.body.$touch()"
          ></v-textarea>

          <!-- <v-checkbox
            v-model="tweet"
            label="21chツイッターアカウントのタイムラインに投稿する"
          ></v-checkbox> -->

          <v-btn
            :loading="isSubmitting"
            :disabled="isSubmitting"
            color="primary"
            @click="submit"
            >作成</v-btn
          >
          <!-- <v-btn @click="clearForm">クリア</v-btn> -->
        </form>
      </div>
      <div class="canvas-wrap">
        <CanvasText ref="canvas" :text="title" :width="600" :height="200" />
      </div>
      <div class="canvas-desc">
        \nを入力すると改行されます。保存時には\nは削除されます。
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
/* eslint-disable */
import { validationMixin } from 'vuelidate'
import { required, maxLength } from 'vuelidate/lib/validators'
import uuidv4 from 'uuid/v4'
import { firebaseProxy } from '~/plugins/firebase-init'
import CanvasText from '~/components/CanvasText'
import { toMinimal } from '~/domains/user'

export default {
  components: {
    CanvasText
  },
  mixins: [validationMixin],

  validations: {
    title: { required, maxLength: maxLength(100) },
    name: { maxLength: maxLength(64) },
    body: { required, maxLength: maxLength(3000) }
  },

  data: () => ({
    title: '',
    name: '',
    body: '',
    tweet: true,
    isSubmitting: false,
    baseUrl: process.env.baseUrl
  }),

  computed: {
    user() {
      return this.$store.getters.user
    },
    titleErrors() {
      const errors = []
      if (!this.$v.title.$dirty) return errors
      !this.$v.title.maxLength &&
        errors.push('スレッドタイトルは100文字以内で入力してください。')
      !this.$v.title.required && errors.push('スレッドタイトルを入力してください。')
      return errors
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

  methods: {
    async submit() {
      const user = toMinimal(this.user)
      const subCategoryId = this.$route.params.thread

      this.$v.$touch()
      if (this.$v.$invalid) return

      this.isSubmitting = true

      const thread = {
        id: uuidv4(),
        title: this.title.replace(/\\n/g, ""),
        name: this.name,
        body: this.body,
        imageUrl: process.env.defaultThreadImage,
        user: user,
        publishedAt: firebaseProxy.firestore.FieldValue.serverTimestamp(),
        likes: 0,
        count: 0
      }

      const comment = {
        id: thread.id,
        title: this.title,
        name: this.name,
        body: this.body,
        user: user,
        publishedAt: firebaseProxy.firestore.FieldValue.serverTimestamp(),
        likes: 0,
        seq: 1
      }

      thread.comments = []

      try {
        await this.$store.dispatch('category/saveThread', {
          subCategoryId,
          thread
        })

        await this.$store.dispatch('thread/saveComment', {
          subCategoryId,
          threadId: thread.id,
          comment
        })

        await this.saveImage({ threadId: thread.id })

        // if (this.tweet) {
        //   const status = `${this.title} \n\n ${this.baseUrl}/category/${subCategoryId}/${thread.id}`
        //   this.$store.dispatch('thread/postTwitter', status)
        // }

        this.isSubmitting = false

        this.$router.push({
          name: 'category-thread-id',
          params: { thread: subCategoryId, id: thread.id }
        })
      } catch (e) {
        this.isSubmitting = false
      }
    },
    async saveImage({ threadId }) {
      const subCategoryId = this.$route.params.thread

      const canvas = this.$refs.canvas.getCanvas()
      const base64 = canvas.toDataURL('image/jpeg')

      await this.$store.dispatch('category/saveImage', {
        subCategoryId,
        threadId,
        base64
      })
    },
    clearForm() {
      this.$v.$reset()
      this.title = ''
      this.name = ''
      this.body = ''
    }
  }
}
/* eslint-enable */
</script>

<style>
.canvas-wrap {
  padding: 20px 0;
  width: 100%;
  text-align: center;
}
.canvas-desc {
  text-align: right;
}
</style>
