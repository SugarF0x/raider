<template lang="pug">
  gamespace(v-if="isTilesetLoaded")
  v-row.fill-height.mx-0(v-else)
    v-col.fill-height.d-flex.flex-column.justify-center.align-center
      v-progress-circular(
        indeterminate
        size="100"
      )
      div.mt-5 Loading game assets ({{ loadedAssets }}/{{ totalAssets }})...
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, onUnmounted } from "@nuxtjs/composition-api"
import { useAccessor } from "~/assets/hooks"

export default defineComponent({
  setup() {
    const accessor = useAccessor()
    const isTilesetLoaded = computed(() => accessor.isTilesetLoaded)
    const loadedAssets = computed(() => accessor.loadedAssets)
    const totalAssets = computed(() => accessor.totalAssets)

    onMounted(() => { accessor.resetStore() })
    onUnmounted(accessor.resetStore)

    return {
      isTilesetLoaded,
      loadedAssets,
      totalAssets,
    }
  }
})
</script>

<style lang="sass" scoped>

</style>
