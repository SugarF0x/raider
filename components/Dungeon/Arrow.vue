<template lang="pug">
  v-group(v-if="displayArrow" ref="arrowElement" :config="{ opacity: .8 }")
    v-arrow(:config="arrowOutlineConfig")
    v-arrow(:config="arrowConfig")
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, ref } from '@nuxtjs/composition-api'
import { useAccessor } from "~/assets/hooks"
import { getCanvasCoords } from "~/assets/utils"
import Konva from "konva"

export default defineComponent({
  setup() {
    const { dungeon, instance } = useAccessor()
    const tiles = computed(() => dungeon.tiles)
    const selected = computed(() => dungeon.selected)
    const stage = computed(() => instance.stage)
    const displayArrow = computed(() => selected.value.length > 0)

    const arrowElement = ref(null)
    const arrowNode = computed(() => (arrowElement as any).value?.getNode() as Konva.Node | undefined)

    const arrowPoints = computed(() => {
      if (stage.value !== "Player Turn") return []

      const mappedCoords = selected.value.map(id => {
        const tile = tiles.value.find(tile => tile.id === id)
        if (!tile) throw new Error('Tile ID mismatch')
        const canvasCoords = getCanvasCoords(tile.position)
        return [canvasCoords.x, canvasCoords.y]
      })

      nextTick(() => {
        if (arrowNode.value) arrowNode.value.cache({ offset: 5 })
      })

      // @ts-ignore // i dont know why but [].concat.apply as arg types of never
      return [].concat.apply([], mappedCoords) as number[]
    })

    const arrowConfig = computed(() => ({
      points: arrowPoints.value,
      tension: .1,
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