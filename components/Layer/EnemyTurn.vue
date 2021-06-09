<template lang="pug">
  v-layer(ref="enemyTurnLayer" :config="layerConfig")
    v-rect(:config="backgroundConfig")
    util-text(:config="textConfig")
</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from '@nuxtjs/composition-api'
import { useAccessor } from "~/assets/hooks"
import Konva from "konva"
import { ANIMATION } from '~/assets/consts'

export default defineComponent({
  setup() {
    const { instance, dungeon } = useAccessor()
    const stage = computed(() => instance.stage)
    const enemyDamage = computed(() => dungeon.pendingEnemyDamage)

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

    const textConfig = computed( () => ({
      text: `Enemy attacking for ${enemyDamage.value}`,
      x: 0,
      y: 250,
      fontSize: 36,
      width: 450
    }))

    const displayEnemyTurn = () => {
      if (!enemyTurnNode.value) throw new Error('Enemy Turn Layer not defined')
      if (enemyDamage.value <= 0) return

      const tween = new Konva.Tween({
        node: enemyTurnNode.value,
        duration: ANIMATION.ENEMY_TURN_SCREEN_TIME/4,
        easing: Konva.Easings.EaseInOut,
        onFinish: () => { setTimeout(() => tween.reverse(), ANIMATION.ENEMY_TURN_SCREEN_TIME/2 * 1000) },

        opacity: 1
      });

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