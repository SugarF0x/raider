<template lang="pug">
  v-group
    util-text(:config="{ x: 20, y: 597, fill: 'yellow', text: `${gold}/100` }")

    v-image(
      v-for="(column, index) in getGoldColumns()"
      :key="`gold-${gold}-${index}`"
      :config="column"
    )
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, onUnmounted } from "@nuxtjs/composition-api"
import { useAccessor } from "~/assets/hooks"
import { parseMarkdown } from "~/assets/utils"
import { GOLD } from "~/assets/consts/markdowns/hud"

export default defineComponent({
  setup() {
    const { character } = useAccessor()
    const gold = computed(() => character.gold)

    const getGoldColumns = () => {
      let cropped = []

      let columns = Math.floor(gold.value / 20)
      if (gold.value % 20 > 0) columns++

      for (let i = 0; i < columns; i++) {
        let fill = (gold.value - Math.floor(gold.value / 20) * 20) / 20 || 1
        cropped.push(getColumn(i, i+1 === columns ? fill : 1))
      }

      return cropped
    }

    let interval: NodeJS.Timeout
    onMounted(() => {
      interval = setInterval(() => {
        let newValue = gold.value + 1
        if (newValue >= 100) newValue = 0
        character.SET_GOLD(newValue)
      }, 100)
    })

    onUnmounted(() => {
      clearInterval(interval)
    })

    return {
      getGoldColumns,
      gold,
    }
  },
})

function getColumn(column: number, fill: number) {
  const gold = parseMarkdown(GOLD[column])
  if (!gold.crop) throw new Error('Gold column markdown is to contain tileset option')

  gold.y = gold.y + (gold.height * (1 - fill))
  gold.height = gold.height * fill
  gold.crop.y = gold.crop.y + (20 - 20 * fill) * 3
  gold.crop.height = gold.crop.height - (20 - 20 * fill) * 3

  return gold
}
</script>