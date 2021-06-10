<template lang="pug">
  v-layer(ref="enemyTurnLayer" :config="layerConfig")
    v-rect(:config="backgroundConfig")
    v-image(
      v-for="(config, index) in eyeGlowConfigs"
      :key="`eyeGlow-${index}`"
      :config="config"
    )
    util-text(:config="textConfig")
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from '@nuxtjs/composition-api'
import { useAccessor } from "~/assets/hooks"
import Konva from "konva"
import { ANIMATION } from '~/assets/consts'
import { getCanvasCoords, sleep } from "~/assets/utils"
import { ImageConfig } from "~/assets/types"
import { TileType } from "~/assets/entities/tiles"
import { EffectType } from "~/assets/entities/effects"
import { StageType } from "~/store/instance"

export default defineComponent({
  setup() {
    const accessor = useAccessor()
    const { instance, dungeon, character } = accessor
    const stage = computed(() => instance.stage)
    const enemyDamage = computed(() => dungeon.pendingEnemyDamage)
    const tileset = computed(() => accessor.assets.tiles)

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

    const eyeGlowConfigs = computed(() => {
      const configs: ImageConfig[] = []

      dungeon.tiles
      .filter(tile => tile.type === TileType.SKULL)
      .filter(tile => !tile.effects.find(effect => effect.type === EffectType.FRESH))
      .forEach(tile => {
        configs.push({
          ...getCanvasCoords(tile.position),
          width: 62,
          height: 62,
          image: tileset.value,
          crop: {
            x: 961,
            y: 352,
            width: 52,
            height: 52,
          },
          offset: {
            x: 31,
            y: 31
          },
        })
      })

      return configs
    })

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

    const executeEnemyActions = () => {
      // custom handlers for bosses go here? question mark?

      if (enemyDamage.value <= 0) return
      character.applyDamage(enemyDamage.value)
    }

    /**
     * Handler directing screen display.
     * Gets triggered every time instance stage changes.
     */
    watch(
      stage,
      async () => {
      if (stage.value === StageType.ENEMY_TURN) {
        displayEnemyTurn()
        await sleep(ANIMATION.ENEMY_TURN_SCREEN_TIME/4 * 1000)
        executeEnemyActions()
      }
    })

    return {
      layerConfig,
      backgroundConfig,
      eyeGlowConfigs,
      textConfig,
      enemyTurnLayer
    }
  },
})
</script>

<style lang="sass" scoped>

</style>