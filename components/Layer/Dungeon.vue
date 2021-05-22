<template lang="pug">
  v-layer
    v-group#chamber
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

export default defineComponent({
  setup() {
    const { dungeon } = useAccessor()
    const tiles = computed(() => dungeon.tiles)

    onMounted(() => {
      if (tiles.value.length === 0) {
        dungeon.populate()
      }
    })

    return {
      tiles
    }
  },
})
</script>

<style lang="sass" scoped>

</style>