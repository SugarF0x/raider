<template lang="pug">
  v-layer
    v-rect(:config="border")

    v-group#chamber(:config="{ clip: { ...border } }")
      dungeon-tile(
        v-for="tile in tiles"
        :key="tile.id"
        :tile="tile"
      )

    dungeon-arrow
    dungeon-tooltip
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted } from '@nuxtjs/composition-api'
import { useAccessor } from "~/assets/hooks"
import { useMarkdownEnhancer } from "~/assets/hooks/useMarkdownEnhancer"
import { StageType } from "~/store/instance"

export default defineComponent({
  setup() {
    const border = useMarkdownEnhancer('10-150/430;S')
    border.fill = 'black'

    const accessor = useAccessor()
    const { dungeon, instance } = accessor
    const tiles = computed(() => dungeon.tiles)
    const stage = computed(() => instance.stage)
    const selectedAmount = computed(() => dungeon.selected.length)

    const startDrag = () => { if (stage.value === StageType.PLAYER_TURN) accessor.SET_MOUSE_DOWN() }
    const dropDrag = () => {
      accessor.SET_MOUSE_UP()
      if (selectedAmount.value >= 3) instance.COMPLETE_STAGE()
      else dungeon.CLEAR_SELECTION()
    }

    const bindEvents = () => {
      document.addEventListener('mousedown', startDrag);
      document.addEventListener('mouseup', dropDrag);
      document.addEventListener("touchstart", startDrag);
      document.addEventListener("touchend", dropDrag);
    }

    const unbindEvents = () => {
      document.removeEventListener('mousedown', startDrag);
      document.removeEventListener('mouseup', dropDrag);
      document.removeEventListener('touchstart', startDrag);
      document.removeEventListener('touchend', dropDrag);
    }

    onMounted(() => {
      if (tiles.value.length === 0) {
        dungeon.populate()
      }
      bindEvents()
    })

    onUnmounted(() => unbindEvents)

    return {
      border,
      tiles
    }
  },
})
</script>

<style lang="sass" scoped>

</style>