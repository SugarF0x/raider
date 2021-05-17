<template lang="pug">
  v-group
    v-text(:config="{ ...textConfig, text: `${gold}/100` }")

    v-image(
      v-for="(column, index) in getGoldColumns()"
      :key="`gold-${gold}-${index}`"
      :config="column"
    )
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, onUnmounted } from "@nuxtjs/composition-api"
import { useAccessor } from "~/assets/hooks"
import { getColumn } from "~/components/Hud/Gold/utils"

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

    // TODO: prettify this or even export into util text
    const textConfig = {
      fontSize: 16,
      align: 'center',
      listening: false,
      fillAfterStrokeEnabled: true,
      wrap: 'none',
      fontFamily: 'Comic Sans MS',
      x: 20,
      y: 597,
      width: 100,
      fill: 'yellow'
    }

    let interval: NodeJS.Timeout

    onMounted(() => {
      interval = setInterval(() => {
        // TODO: fix mutations typing
        let newValue = gold.value + 1
        character.SET_GOLD(gold.value + 1 <= 100 ? gold.value + 1 : 0)
      }, 100)
    })

    onUnmounted(() => {
      clearInterval(interval)
    })

    return {
      getGoldColumns,
      gold,
      textConfig
    }
  },
})
</script>