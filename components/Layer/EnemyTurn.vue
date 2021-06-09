<template lang="pug">
  v-layer(ref="enemyTurnLayer" :config="layerConfig")
    v-rect(:config="backgroundConfig")
    util-text(:config="textConfig")
</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from '@nuxtjs/composition-api'
import { useAccessor } from "~/assets/hooks"
import Konva from "konva"

export default defineComponent({
  setup() {
    const { instance } = useAccessor()
    const stage = computed(() => instance.stage)

    const enemyTurnLayer = ref(null)
    const enemyTurnNode = computed(() => (enemyTurnLayer as any).value?.getNode() as Konva.Node | undefined)

    const layerConfig = {
      opacity: 0,
      listening: false
    }

    const backgroundConfig = {
      x: 10,
      y: 150,
      width: 430,
      height: 430,
      fill: "black",
      opacity: .75
    }

    const textConfig = { // TODO: bind actual damage value
      text: `Enemy attacking for ${10}`,
      x: 0,
      y: 250,
      fontSize: 36,
      width: 450
    }

    const displayEnemyTurn = () => {
      if (!enemyTurnNode.value) throw new Error('Enemy Turn Layer not defined')

      const tween = new Konva.Tween({
        node: enemyTurnNode.value,
        duration: .5,
        easing: Konva.Easings.EaseInOut,
        onFinish: () => { setTimeout(() => tween.reverse(), 1000) },

        opacity: 1
      });

      console.log('playing tween')

      tween.play()
    }

    watchEffect(() => {
      if (stage.value === 'Enemy Turn') displayEnemyTurn()
    })

    return {
      layerConfig,
      backgroundConfig,
      textConfig,
      enemyTurnLayer
    }
  },
})
</script>

<style lang="sass" scoped>

</style>