<template lang="pug">
  v-group
    v-image(
      v-for="(column, index) in getGoldColumns"
      :key="'gold-'+i"
    )
</template>

<script lang="ts">
import { defineComponent, computed } from "@nuxtjs/composition-api"
import { useAccessor } from "~/assets/hooks"

export default defineComponent({
  setup() {
    const { character, assets } = useAccessor()
    const gold = computed(() => character.gold)

    const getGoldColumns = () => {
      let cropped = []
      let columns = Math.floor(gold.value / 20)
      if (gold.value % 20 > 0) columns++
      for (let i = 0; i < columns; i++) {
        // TODO: use crop const here? question mark?
        let toPush = {
          x: 16 + (21.5 * i),
          y: 617,
          image: assets.tiles,
          width: 21,
          height: 117,
          crop: {
            x: 397 + 16 * i,
            y: 428,
            width: 15.5,
            height: 61,
          },
          type: 'coins',
        }
        if (i === columns - 1 && gold.value % 20 > 0) {
          let currentColFill = (gold.value - Math.floor(gold.value / 20) * 20) / 20
          toPush.y = toPush.y + (toPush.height * (1 - currentColFill))
          toPush.height = toPush.height * currentColFill
          toPush.crop.y = toPush.crop.y + (20 - 20 * currentColFill) * 3
          toPush.crop.height = toPush.crop.height - (20 - 20 * currentColFill) * 3
        }
        cropped.push(toPush)
      }
      return cropped
    }

    return {
      getGoldColumns,
    }
  },
})
</script>