<template lang="pug">
  v-group(ref="tileElement", :config="groupConfig")
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
import { defineComponent, PropType, ref, toRefs } from '@nuxtjs/composition-api'
import { isSkull, Tile } from "~/assets/entities/tiles"
import { isNear } from './utils'
import { useActions } from "./useActions"
import { useStore } from "./useStore"
import { useConfig } from "./useConfig"

export default defineComponent({
  props: {
    tile: {
      type: Object as PropType<Tile>,
      required: true
    }
  },
  setup(props) {
    const { tile } = toRefs(props)

    const tileElement = ref(null)
    useActions(tile, tileElement)

    const {
      dungeon,
      isMouseDown,
      isSelectable,
      selected,
      selectedLast,
      selectedType,
      tileset,
    } = useStore(tile)

    const {
      skullStateConfig,
      groupConfig,
      imageConfig,
    } = useConfig(tile, isSelectable, tileset)

    const isSkullType = isSkull(tile.value)

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

      // If selectable tile is the second last added - pop the last one
      if (selected.value[selected.value.length-2] === tile.value.id) {
        if (isSkull(tile.value)) { /* TODO: reset vulnerability */ }
        dungeon.POP_SELECTION()
        return
      }

      // If selectable tile is near and passes selection check - select it
      if (isNear(tile.value.position, selectedLast.value.position) && isSelectable.value) {
        dungeon.SELECT_TILE(tile.value.id)
        return
      }
    })

    return {
      groupConfig,
      imageConfig,
      isSkullType,
      selectTile,
      skullStateConfig,
      tileElement,
    }
  },
})
</script>

<style lang="sass" scoped>

</style>