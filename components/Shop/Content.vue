<template lang="pug">
  v-group(:config="groupConfig")
    v-image(:config="imageConfig")
    v-image(
      v-if="upgradeTarget"
      :config="targetImageConfig"
    )

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
import { Attributes, Items, Buffs } from "~/assets/entities"
import { useAccessor } from "~/assets/hooks"

type combinedTypes =
  | Attributes.Attribute
  | Items.Item
  | Buffs.Buff

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
    upgradeTarget: {
      type: String as PropType<Items.ItemType>,
      default: undefined
    }
  },
  setup(props) {
    const { item, position, upgradeTarget } = toRefs(props)
    const { character } = useAccessor()

    const firstPositionCoords = { x: 57, y: 170 + 73 * position.value }
    const secondPositionCoords = { x: 165, y: firstPositionCoords.y }

    const groupConfig = { listening: false }

    const imageConfig = computed(() => item.value.getImageConfig(upgradeTarget.value ? secondPositionCoords : firstPositionCoords))
    const targetImageConfig = computed(() => {
      if (!upgradeTarget.value) return undefined

      const item = character.items.find(item => item.type === upgradeTarget.value)
      if (!item) throw new Error(`No item of type ${upgradeTarget.value} found on character`)
      return item.getImageConfig(firstPositionCoords)
    })

    const textConfigs = computed(() => item.value.getTextConfigs({ x: upgradeTarget.value ? 235 : 130, y: 172 + 73 * position.value }))
    const comparisonConfigs = computed(() => item.value.getUpgradeTextConfigs({ x: upgradeTarget.value ? 235 : 130, y: 212 + 73 * position.value }))

    return {
      groupConfig,
      imageConfig,
      textConfigs,
      comparisonConfigs,
      targetImageConfig
    }
  },
})
</script>

<style lang="sass" scoped>

</style>