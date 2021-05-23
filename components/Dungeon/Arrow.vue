<template lang="pug">
  v-group(v-if="displayArrow" ref="arrowElement")
    v-arrow(:config="arrowOutlineConfig")
    v-arrow(:config="arrowConfig")
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, ref, watch } from '@nuxtjs/composition-api'
import { useAccessor } from "~/assets/hooks"
import { getCanvasCoords } from "~/assets/utils/getCanvasCoords"
import Konva from "konva"

export default defineComponent({
  setup() {
    const { dungeon } = useAccessor()
    const tiles = computed(() => dungeon.tiles)
    const selected = computed(() => dungeon.selected)
    const displayArrow = computed(() => selected.value.length > 0)

    const arrowElement = ref(null)
    const arrowNode = computed(() => (arrowElement as any).value?.getNode() as Konva.Node | undefined)

    const arrowPoints = computed(() => {
      const mappedCoords = selected.value.map(id => {
        const tile = tiles.value.find(tile => tile.id === id)
        if (!tile) throw new Error('Tile ID mismatch')
        const canvasCoords = getCanvasCoords(tile.position)
        return [canvasCoords.x, canvasCoords.y]
      })
      // @ts-ignore // i dont know why but [].concat.apply as arg types of never
      return [].concat.apply([], mappedCoords)
    })

    // next tick is to ensure it renders before cache is fired
    watch([arrowPoints], () => nextTick(() => {
      // TODO: fix caching not working properly
      if (arrowNode.value) {
        arrowNode.value.cache({ offset: 5 })
      }
    }))

    const arrowConfig = computed(() => ({
      points: arrowPoints.value,
      tension: .1,
      opacity: .8,
      stroke: "green",
      strokeWidth: 10,
      lineCap: 'round',
      listening: false,
    }))
    const arrowOutlineConfig = computed(() => ({
      ...arrowConfig.value,
      strokeWidth: arrowConfig.value.strokeWidth * 2,
      stroke: "black",
    }))

    return {
      arrowElement,
      displayArrow,
      arrowConfig,
      arrowOutlineConfig,
    }
  },
})
</script>

<style lang="sass" scoped>

</style>