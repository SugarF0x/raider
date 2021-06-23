<template lang="pug">
  v-layer(ref="gameOverLayer" :config="layerConfig")
    v-rect(:config="backgroundConfig" @mousedown="handleClick" @touchstart="handleClick")

    util-text(:config="titleConfig")
    util-text(:config="promptConfig")
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, watch } from '@nuxtjs/composition-api'
import { ANIMATION, KONVA } from '~/assets/consts'
import { useAccessor } from "~/assets/hooks"
import { StageType } from "~/store/instance"
import Konva from "konva"
import { sleep } from "~/assets/utils"

export default defineComponent({
  setup() {
    const accessor = useAccessor()
    const isGameOver = computed(() => accessor.instance.stage === StageType.GAME_OVER)

    const gameOverLayer = ref(null)
    const gameOverNode = computed(() => (gameOverLayer as any).value?.getNode() as Konva.Node | undefined)

    const layerConfig = reactive({
      listening: false,
      opacity: 0
    })

    const backgroundConfig = {
      x: 0,
      y: 0,
      width: KONVA.WIDTH,
      height: KONVA.HEIGHT,
      fill: 'black',
    }

    const titleConfig = {
      text: 'GAME OVER',
      x: 0,
      y: 60,
      width: KONVA.WIDTH,
      fill: 'red',
      fontSize: 48
    }

    const promptConfig = {
      text: 'Click anywhere to restart',
      x: 0,
      y: 105,
      width: KONVA.WIDTH,
      fontSize: 36
    }

    const tween = computed(() => {
      if (!gameOverNode.value) return undefined

      return new Konva.Tween({
        node: gameOverNode.value,
        duration: ANIMATION.GAME_OVER_SCREEN_TIME,
        easing: Konva.Easings.EaseInOut,

        opacity: 1
      })
    })

    watch(isGameOver, async () => {
      if (!tween.value) return

      if (isGameOver.value) {
        tween.value.play()
        layerConfig.listening = true
      }
      else {
        tween.value.reverse()
        layerConfig.listening = false
        await sleep(ANIMATION.GAME_OVER_SCREEN_TIME)
        await accessor.resetStore()
      }
    })

    const handleClick = () => {
      accessor.instance.SET_STAGE(StageType.PLAYER_TURN)
    }

    return {
      titleConfig,
      promptConfig,
      layerConfig,
      gameOverLayer,
      backgroundConfig,
      handleClick,
    }
  },
})
</script>

<style lang="sass" scoped>

</style>