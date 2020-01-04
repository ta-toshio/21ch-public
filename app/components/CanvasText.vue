<template>
  <canvas ref="canvas" class="canvas" :width="width" :height="height"></canvas>
</template>

<script>
import CanvasTextWrapper from '~/utils/canvas-text'

export default {
  props: {
    width: {
      type: Number,
      default: 600
    },
    height: {
      type: Number,
      default: 300
    },
    text: {
      type: String,
      default: ''
    },
    font: {
      type: String,
      default: 'bold 18px "M PLUS 1c", Arial, sans-serif'
    },
    logoFont: {
      type: String,
      default: 'bold 16px "M PLUS 1c", Arial, sans-serif'
    }
  },
  watch: {
    width() {
      this.draw(this.text)
    },
    height() {
      this.draw(this.text)
    },
    text() {
      this.draw(this.text)
    }
  },
  mounted() {
    this.ctx = this.$el.getContext('2d')
    this.draw(this.text)
  },
  methods: {
    draw(text) {
      this.ctx.fillStyle = '#FCDC00'
      this.ctx.fillRect(0, 0, this.width, this.height)
      this.ctx.fillStyle = 'black'

      const opts = {
        font: this.font,
        sizeToFill: true,
        textAlign: 'center',
        verticalAlign: 'middle',
        paddingX: 40,
        paddingY: 40
        // type: 'textarea',
        // lineBreak: 'word'
        // fontSize: 20,
        // allowNewLine: true,
        // strokeText: true
      }
      CanvasTextWrapper(this.$el, text, opts)

      this.ctx.font = this.logoFont
      this.ctx.fillText(process.env.siteShortName, 550, 190)
    },
    getCanvas() {
      return this.$el
    }
  }
}
</script>

<style>
.canvas {
  position: relative;
}
</style>
