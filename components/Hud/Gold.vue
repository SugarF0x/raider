<template lang="pug">
  v-group
    util-text(:config="{ x: 20, y: 597, fill: 'yellow', text: `${gold}/${GOLD_THRESHOLD}` }")

    v-image(
      v-for="(column, index) in getGoldColumns()"
      :key="`gold-${gold}-${index}`"
      :config="column"
    )
</template>

<script lang="ts">
import { defineComponent, computed } from "@nuxtjs/composition-api"
import { useAccessor } from "~/assets/hooks"
import { useMarkdownEnhancer } from "~/assets/hooks/useMarkdownEnhancer"
import { GOLD_THRESHOLD } from "~/assets/consts/balance"

export default defineComponent({
  setup() {
    const { character } = useAccessor()
    const gold = computed(() => character.gold)

    const getGoldColumns = () => {
      let cropped = []

      const singleColumnVolume = GOLD_THRESHOLD / 5
      let columns = Math.floor(gold.value / singleColumnVolume)
      if (gold.value % singleColumnVolume > 0) columns++

      for (let i = 0; i < columns; i++) {
        let fill = (gold.value - Math.floor(gold.value / singleColumnVolume) * singleColumnVolume) / singleColumnVolume || 1
        cropped.push(getColumn(i, i+1 === columns ? fill : 1))
      }

      return cropped
    }

    return {
      getGoldColumns,
      gold,
      GOLD_THRESHOLD
    }
  },
})

function getColumn(column: number, fill: number) {
  const gold = useMarkdownEnhancer('16-617/21-117:397-428/15.5-61;T')
  if (!gold.crop) throw new Error('Gold column markdown is to contain tileset option')

  gold.x += 21.5 * column
  gold.y += gold.height * (1 - fill)
  gold.height *= fill
  gold.crop.x += 16 * column
  gold.crop.y += (20 - 20 * fill) * 3
  gold.crop.height -= (20 - 20 * fill) * 3

  return gold
}
</script>