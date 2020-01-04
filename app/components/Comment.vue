<template>
  <div>
    <div v-for="(comment, j) in comments" :key="j" class="comment">
      <div class="content">
        <span class="seq">{{ comment.seq }}</span>
        <span class="author" color="secondary"
          >名前: {{ comment.name || '名無しさん' }}</span
        >
        <div class="metadata">
          <div class="date">{{ dateFormat(comment.publishedAt) }}</div>
          <div class="ID">ID: {{ comment.user.uid.substr(0, 12) }}</div>
        </div>
        <div class="text">
          <nl2br tag="div" :text="comment.body" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dateFormat from '@/utils/dateformat'

export default {
  props: {
    comments: {
      type: Array,
      default: () => []
    }
  },

  methods: {
    dateFormat(date) {
      if (!date) return ''
      if (!isNaN(date)) return dateFormat(new Date(date))
      if (date.seconds) return dateFormat(new Date(date.seconds * 1000))
    }
  }
}
</script>

<style scoped>
.comment:first-child {
  margin-top: 0;
  padding-top: 0;
}

.comment {
  position: relative;
  background: 0 0;
  margin: 0.5em 0 0;
  padding: 16px;
  border: none;
  border-top: none;
  line-height: 1.2;
  font-size: 1.2em;
}

.comment .author {
  margin-left: 0.5em;
}

.comment .metadata {
  display: inline-block;
  margin-left: 0.5em;
}

.comment .metadata > :last-child {
  margin-right: 0;
}

.comment .metadata > * {
  display: inline-block;
  margin: 0 0.5em 0 0;
}

.comment .text {
  margin: 0.5em 0 0.5em;
  word-wrap: break-word;
  line-height: 1.3;
}
</style>
