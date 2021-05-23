<template lang="pug">
  v-layer
    v-rect(:config="border")

    v-group#chamber(:config="{ clip: { ...border } }")
      dungeon-tile(
        v-for="tile in tiles"
        :key="tile.id"
        :tile="tile"
      )

    // dungeon-arrow
    // dungeon-tooltip
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from '@nuxtjs/composition-api'
import { useAccessor } from "~/assets/hooks"
import { useMarkdownEnhancer } from "~/assets/hooks/useMarkdownEnhancer"

export default defineComponent({
  setup() {
    const border = useMarkdownEnhancer('10-150/430;S')
    border.fill = 'black'

    const { dungeon } = useAccessor()
    const tiles = computed(() => dungeon.tiles)

    onMounted(() => {
      if (tiles.value.length === 0) {
        dungeon.populate()
      }
    })

    return {
      border,
      tiles
    }
  },
})
</script>

<style lang="sass" scoped>

</style>