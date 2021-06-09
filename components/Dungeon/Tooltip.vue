<template lang="pug">
  v-group(v-if="textConfig")
    util-text(:config="textConfig")
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'
import { useAccessor } from "~/assets/hooks"
import { getCanvasCoords } from "~/assets/utils"
import { TileType } from "~/assets/entities/tiles"

export default defineComponent({
  setup() {
    const { character, dungeon } = useAccessor()

    const totalAttack = computed(() => character.totalAttack)
    const lastSelectedTilePosition = computed(() => {
      const lastTileId = dungeon.selected[dungeon.selected.length-1]
      const lastTile = dungeon.tiles.find(tile => tile.id === lastTileId)
      if (lastTile) return getCanvasCoords(lastTile.position)
      return undefined
    })
    const selectedType = computed(() => dungeon.selectedType)

    /** Contain text within dungeon border box */
    const containText = (x: number) => {
      let result = {
        width: 120,
        x: x,
        align: 'center'
      }
      if (x <= 50) {
        result.x = 15
        result.align = 'left'
      } else if (x >= 340) {
        result.x = 435-result.width
        result.align = 'right'
      }
      return result
    }

    const textConfig = computed(() => {
      if (
        !lastSelectedTilePosition.value
        || (selectedType.value !== TileType.SWORD && selectedType.value !== TileType.SKULL)
      ) return undefined

      return {
        text: totalAttack.value + ' damage',
        ...containText(lastSelectedTilePosition.value.x - 50),
        y: lastSelectedTilePosition.value.y-50,
        fontSize: 24,
        fill: 'red',
        stroke: 'black',
        strokeWidth: 5,
      }
    })

    return {
      textConfig
    }
  },
})
</script>

<style lang="sass" scoped>

</style>