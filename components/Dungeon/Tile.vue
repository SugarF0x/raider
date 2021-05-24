<template lang="pug">
  v-group(ref="tileElement")
    v-image(
      :config="imageConfig"
      @mousedown="selectTile"
      @mouseenter="selectTile"
      @touchstart="selectTile"
      @touchmove="selectTile"
    )

    v-group(v-if="isSkullType")
      util-text(:config="skullStateConfig.attack")
      util-text(:config="skullStateConfig.armor")
      util-text(:config="skullStateConfig.health")

    // effects
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, toRefs, watchEffect } from '@nuxtjs/composition-api'
import { isSkull, Tile } from "~/assets/entities/tiles"
import Konva from "konva"
import { getCanvasCoords } from "~/assets/utils/getCanvasCoords"
import { useAccessor } from "~/assets/hooks"
import { XY } from "~/assets/types"

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
    const { dungeon } = accessor

    const tileElement = ref(null)
    const tileNode = computed(() => (tileElement as any).value.getNode() as Konva.Node | undefined)

    const tileset = computed(() => accessor.assets.tiles)
    const isMouseDown = computed(() => accessor.isMouseDown)
    const selected = computed(() => dungeon.selected)
    const selectedType = computed(() => dungeon.selectedType)
    const selectedLast = computed(() => dungeon.tiles.find(tile => tile.id === selected.value[selected.value.length-1]))
    const isSelectable = computed(() => selectedType.value === tile.value.type || selectedType.value === null)

    const isSkullType = isSkull(tile.value)
    const skullStateConfig = getSkullStateConfig(tile.value)

    const state = computed(() => tile.value.state)
    watchEffect(() => {
      switch(state.value) {
        case "collecting": {
          console.log('INIT COLLECTION')
          break
        }
        case "moving": {
          shiftTile()
          break
        }
      }
    })

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
        opacity: isSelectable.value ? 1 : .5
      }
    })

    const shiftTile = () => {
      if (!tileNode.value) throw new Error(`Tile ${tile.value.id} node is not defined`)
      if (tile.value.destination.y === tile.value.position.y) throw new Error(`Tile ${tile.value.id} destination matches position`)

      let tween = new Konva.Tween({
        node: tileNode.value,
        duration: .5,
        easing: Konva.Easings.EaseInOut,
        onFinish: async () => {
          await dungeon.SET_TILE_STATE({ id: tile.value.id, state: 'idle' })
          await dungeon.SET_TILE_POSITION({ id: tile.value.id, position: tile.value.destination })
          tween.reset()
        },

        y: getCanvasCoords(tile.value.destination).y - getCanvasCoords(tile.value.position).y
      });
      tween.play()

      return true
    }

    // timeout is to ensure MOUSE_DOWN event fires first
    const selectTile = () => setTimeout(() => {
      // If mouse is not down then return
      if (!isMouseDown.value) return

      // If selectable tile is the first tile - just add it
      if (!selectedLast.value) {
        dungeon.SELECT_TILE(tile.value.id)
        return
      }

      // If selectable tile is also the last selected tile - return
      if (selectedLast.value.id === tile.value.id) return

      // If selectable tile is the last of already selected - pop it
      if (selected.value[selected.value.length-2] === tile.value.id) {
        if (isSkull(tile.value)) { /* TODO: reset vulnerability */ }
        dungeon.POP_SELECTION()
        return
      }

      // If selectable tile is of same type and is near - add it
      if (isNear(tile.value.position, selectedLast.value.position) && tile.value.type === selectedType.value) {
        dungeon.SELECT_TILE(tile.value.id)
        return
      }
    })

    return {
      tileElement,
      skullStateConfig,
      isSkullType,
      imageConfig,
      selectTile,
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

function isNear(base: XY, target: XY) {
  const { x: x1, y: y1 } = base
  const { x: x2, y: y2 } = target
  return x2 >= x1 - 1
      && x2 <= x1 + 1
      && y2 >= y1 - 1
      && y2 <= y1 + 1
}
</script>

<style lang="sass" scoped>

</style>