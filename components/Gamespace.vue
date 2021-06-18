<template lang="pug">
  v-stage#konva(:config="konva")
    layer-background
    layer-hud
    layer-dungeon
    layer-enemy-turn
    layer-shop
</template>

<script lang="ts">
import { onMounted, onUnmounted, nextTick, defineComponent, reactive } from "@nuxtjs/composition-api"
import { KONVA } from "~/assets/consts"
import { useStageMachine } from "~/components/useStageMachine"

export default defineComponent({
  setup() {
    // konva canvas config
    const konva = reactive({
      width: KONVA.WIDTH,
      height: KONVA.HEIGHT,
      scaleX: 1,
      scaleY: 1,
    })

    // adjust canvas to the screen size at 9 / 16 aspect ratio
    const resize = async () => {
      await nextTick()
      const konvaElement = document.querySelector('#konva')
      let konvajs = document.querySelector('.konvajs-content')
      let style, height, width
      if (konvaElement) style = window.getComputedStyle(konvaElement, null)
      if (style) {
        let sHeight = style.getPropertyValue("height")
        let sWidth = style.getPropertyValue("width")
        height = parseInt(sHeight.slice(0, sHeight.length - 2))
        width = parseInt(sWidth.slice(0, sWidth.length - 2))
      }
      if (konvaElement && konvajs && height && width) {
        let x = KONVA.WIDTH
        let y = KONVA.HEIGHT
        if (width / x > height / y) {
          konva.scaleY = height / y
          konva.scaleX = height / y
          y = height
          x = height * 0.5625
        } else {
          konva.scaleY = width / x
          konva.scaleX = width / x
          x = width
          y = width / 9 * 16
        }
        konva.width = x
        konva.height = y
        let style = `width: ${x}px; height: ${y}px`
        konvajs.setAttribute('style', style)
        return true
      }
      return false
    }

    useStageMachine()

    onMounted(() => {
      // The initial resize as well as an event to handle any future resizes
      resize()
      window.addEventListener('resize', resize)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', resize)
    })

    return {
      konva,
    }
  },
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