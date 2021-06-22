<template lang="pug">
  v-group(:config="groupConfig")
    v-image(:config="imageConfig")

    util-text(
      v-for="(config, index) in textConfigs"
      :key="`item-text-config-${index}`"
      :config="config"
    )
    util-text(
      v-for="(config, index) in comparisonConfigs"
      :key="`comparison-text-${index}`"
      :config="config"
    )
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRefs } from '@nuxtjs/composition-api'
import { Attributes, Items } from "~/assets/entities"

type combinedTypes =
  | Attributes.Attribute
  | Items.Item

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
  setup(props) {
    const { item, position } = toRefs(props)
    const positionCoords = { x: 57, y: 171 + 73 * position.value }

    const groupConfig = { listening: false }

    const imageConfig = computed(() => item.value.getImageConfig(positionCoords))

    const textConfigs = computed(() => item.value.getTextConfigs({ x: 130, y: 172 + 73 * position.value }))
    const comparisonConfigs = computed(() => item.value.getUpgradeTextConfigs({ x: 130, y: 212 + 73 * position.value }))

    return {
      groupConfig,
      imageConfig,
      textConfigs,
      comparisonConfigs,
    }
  },
})
</script>

<style lang="sass" scoped>

</style>