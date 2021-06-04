<template lang="pug">
  v-group(ref="tileElement", :config="groupConfig")
    v-image(
      :config="imageConfig"
      @mousedown="selectTile"
      @mouseenter="selectTile"
      @touchstart="selectTile"
      @touchmove="selectTile"
    )

    v-group(v-if="isSkullType")
      util-text(:config="skullStateConfig.attack")
      util-text(:config="skullStateConfig.armor")
      util-text(:config="skullStateConfig.health")

    // effects
</template>

<script lang="ts">
import { defineComponent, PropType, ref, toRefs } from '@nuxtjs/composition-api'
import { isSkull, Tile } from "~/assets/entities/tiles"
import { useActions } from "./useActions"
import { useConfig } from "./useConfig"
import { useSelectionLogic } from "./useSelectionLogic"

export default defineComponent({
  props: {
    tile: {
      type: Object as PropType<Tile>,
      required: true
    }
  },
  setup(props) {
    const { tile } = toRefs(props)

    const tileElement = ref(null)
    useActions(tile, tileElement)

    const {
      skullStateConfig,
      groupConfig,
      imageConfig,
    } = useConfig(tile)

    const isSkullType = isSkull(tile.value)

    const {
      selectTile
    } = useSelectionLogic(tile)

    return {
      groupConfig,
      imageConfig,
      isSkullType,
      selectTile,
      skullStateConfig,
      tileElement,
    }
  },
})
</script>

<style lang="sass" scoped>

</style>