<template>
  <!-- eslint-disable -->
  <div v-html="$md.render(html)"></div>
  <!-- eslint-enable -->
</template>

<script>
// https://github.com/nuxt/nuxtjs.org/blob/master/components/HtmlParser.vue

export default {
  props: {
    html: {
      type: String,
      default: ''
    }
  },
  watch: {
    html: 'htmlUpdated'
  },

  mounted() {
    this.$nextTick(this.addListeners)
  },
  beforeDestroy() {
    this.removeListeners()
  },
  methods: {
    navigate(event) {
      let target = event.target
      let i = 0

      // Go throught 5 parents max to find a tag
      while (
        i < 5 &&
        !(target instanceof HTMLAnchorElement) &&
        target.parentNode
      ) {
        target = target.parentNode
        i++
      }

      if (!(target instanceof HTMLAnchorElement)) return

      const href = target.getAttribute('href')

      if (href && href[0] === '/') {
        event.preventDefault()
        this.$router.push(href)
      }
    },
    htmlUpdated() {
      this.removeListeners()
      this.$nextTick(() => {
        this.addListeners()
      })
    },
    addListeners() {
      this._links = this.$el.getElementsByTagName('a')
      for (let i = 0; i < this._links.length; i++) {
        this._links[i].addEventListener('click', this.navigate, false)
      }
    },
    removeListeners() {
      for (let i = 0; i < this._links.length; i++) {
        this._links[i].removeEventListener('click', this.navigate, false)
      }
      this._links = []
    }
  }
}
</script>
