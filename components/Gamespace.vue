<template lang="pug">
  v-stage#konva(
    ref="konva"
    :config="konva"
  )
    layer-background
    layer-markdown
</template>

<script lang="ts">
import Vue from 'vue'
import { KONVA } from "~/assets/consts"

interface VueKonvaStage extends Vue { getNode: Function }
function isVueKonvaStage(vue: Vue): vue is VueKonvaStage {
  return (vue as any).getNode !== undefined
}

export default Vue.extend({
  name: "Gamespace",
  data() {
    return {
      konva: {
        width: KONVA.WIDTH,
        height: KONVA.HEIGHT,
        scaleX: 1,
        scaleY: 1,
      },
    }
  },
  methods: {
    /**
     * Resize method called on every resize event
     */
    resize() {
      let konva   = this.$refs.konva as Vue | undefined
      let konvajs = document.querySelector('.konvajs-content')

      let style, height, width

      if (konva) style = window.getComputedStyle(konva.$el, null)
      if (style) {
        let sHeight = style.getPropertyValue("height")
        let sWidth  = style.getPropertyValue("width")
        height      = parseInt(sHeight.slice(0, sHeight.length - 2))
        width       = parseInt(sWidth.slice(0, sWidth.length - 2))
      }

      if (konva && konvajs && height && width) {
        let x = KONVA.WIDTH
        let y = KONVA.HEIGHT

        if (width / x > height / y) {
          this.konva.scaleY = height / y
          this.konva.scaleX = height / y

          y = height
          x = height * 0.5625
        } else {
          this.konva.scaleY = width / x
          this.konva.scaleX = width / x

          x = width
          y = width / 9 * 16
        }

        this.konva.width  = x
        this.konva.height = y

        let style = `width: ${ x }px; height: ${ y }px`
        konvajs.setAttribute('style', style)

        // if (isVueKonvaStage(konva)) konva.getNode().draw() // TODO: figure out if i need this or not
        return true
      }

      return false
    }
  },
  mounted() {
    /**
     * The initial resize as well as an event to handle any future resizes
     */
    this.$nextTick(() => this.resize())
    window.addEventListener('resize', this.resize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize)
  }
})
</script>

<style lang="sass">
#konva
  width: 100%
  height: 100%
  display: flex
  align-items: center
  justify-content: center

  .konvajs-content
    position: relative
    user-select: none
</style>