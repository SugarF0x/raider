<template lang="pug">
  v-group(ref="tileNode")
    v-image(:config="imageConfig")

    v-group(v-if="isSkullType")
      util-text(:config="skullStateConfig.attack")
      util-text(:config="skullStateConfig.armor")
      util-text(:config="skullStateConfig.health")

    // effects
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, toRefs } from '@nuxtjs/composition-api'
import { isSkull, Tile } from "~/assets/entities/tiles"
import Konva from "konva"
import { getCanvasCoords } from "~/assets/utils/getCanvasCoords"
import { useAccessor } from "~/assets/hooks"

export default defineComponent({
  props: {
    tile: {
      type: Object as PropType<Tile>,
      required: true
    }
  },
  setup(props) {
    const { tile } = toRefs(props)
    const accessor = useAccessor()
    const tileset = computed(() => accessor.assets.tiles)
    const tileNode = ref(null) as unknown as Konva.Node | undefined
    const isSkullType = isSkull(tile.value)

    const skullStateConfig = getSkullStateConfig(tile.value)

    const imageConfig = computed(() => {
      return {
        ...getCanvasCoords(tile.value.position),
        image: tileset.value,
        width: 62,
        height: 62,
        crop: {
          ...tile.value.getCropPosition(),
          width: 52,
          height: 52
        },
        offset: {
          x: 31,
          y: 31
        },
        opacity: 1
      }
    })

    const shiftTile = () => {
      if (!tileNode) throw new Error(`Tile ${tile.value.id} node is not defined`)
      if (tile.value.destination.x !== tile.value.position.x || tile.value.destination.y !== tile.value.position.y) return false

      let tween = new Konva.Tween({
        node: tileNode,
        duration: .5,
        easing: Konva.Easings.EaseInOut,
        onFinish: () => tile.value.setPosition(tile.value.destination),

        y: getCanvasCoords(tile.value.destination).y
      });
      tween.play()

      return true
    }

    return {
      skullStateConfig,
      isSkullType,
      imageConfig
    }
  },
})

function getSkullStateConfig(tile: Tile) {
  if (!isSkull(tile)) return undefined

  const canvasCoords = getCanvasCoords(tile.position)

  const skullStateConfigBase = {
    x: canvasCoords.x+7,
    width: 25,
    fontSize: 14,
    align: 'right'
  }
  return {
    attack: Object.assign({ text: tile.currentState.attack, y: canvasCoords.y-25, fill: 'lightgray' }, skullStateConfigBase),
    armor: Object.assign({ text: tile.currentState.armor, y: canvasCoords.y-5, fill: 'lightblue' }, skullStateConfigBase),
    health: Object.assign({ text: tile.currentState.health, y: canvasCoords.y+15, fill: 'red' }, skullStateConfigBase),
  }
}
</script>

<style lang="sass" scoped>

</style>