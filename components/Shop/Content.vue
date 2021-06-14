<template lang="pug">
  v-group(:config="groupConfig")
    v-image(:config="imageConfig")

    util-text(:config="titleConfig")
    util-text(:config="descriptionConfig")
    util-text(
      v-for="(config, index) in comparisonConfigs"
      :key="`comparison-text-${index}`"
      :config="config"
    )
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { Attributes } from "~/assets/entities"

type combinedTypes =
  | Attributes.Attribute

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<combinedTypes>,
      required: true
    },
    position: {
      type: Number as PropType<number>,
      required: true
    },
  },
  setup({ item, position }) {
    const positionCoords = { x: 57, y: 171 + 73 * position }

    const groupConfig = { listening: false }

    const imageConfig = item.getImageConfig(positionCoords)

    const { titleConfig, descriptionConfig } = item.getTextConfigs({ x: 130, y: 172 + 73 * position })
    const comparisonConfigs = item.getUpgradeTextConfig({ x: 130, y: 212 + 73 * position })

    return {
      groupConfig,
      imageConfig,
      titleConfig,
      descriptionConfig,
      comparisonConfigs,
    }
  },
})
</script>

<style lang="sass" scoped>

</style>