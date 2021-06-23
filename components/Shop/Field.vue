<template lang="pug">
  v-group
    v-group(v-if="type === FieldType.SELECTED")
      v-image(:config="selectedItemBackgroundConfig.begin")
      v-image(:config="selectedItemBackgroundConfig.mid")
      v-image(:config="selectedItemBackgroundConfig.end")
    v-group(v-else-if="type === FieldType.EQUIPPED")
      v-image(:config="currentItemBackgroundConfig.begin")
      v-image(:config="currentItemBackgroundConfig.mid")
      v-image(:config="currentItemBackgroundConfig.end")

    v-image(
      v-if="type === FieldType.SELECTED"
      :config="selectedItemFrameConfig"
    )
    v-image(
      v-else
      :config="itemFrameConfig"
    )

    v-group(v-if="upgrade")
      v-image(:config="plusConfig")

      v-image(
        v-if="type === FieldType.SELECTED"
        :config="{ ...selectedItemFrameConfig, x: 162 }"
      )
      v-image(
        :config="{ ...itemFrameConfig, x: 162 }"
        v-else
      )

    // hitbox
    v-rect(:config="hitboxConfig" @mousedown="handleClick" @touchstart="handleClick")
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRefs } from '@nuxtjs/composition-api'
import { useMarkdownEnhancer } from "~/assets/hooks/useMarkdownEnhancer"

export default defineComponent({
  props: {
    type: {
      type: String as PropType<FieldType>,
      required: true
    },
    position: {
      type: Number as PropType<number>,
      required: true
    },
    upgrade: Boolean
  },
  emits: ['click'],
  setup(props, { emit }) {
    const { position } = toRefs(props)

    const handleClick = () => { emit('click') }

    const baseItemFrameConfig = useMarkdownEnhancer(`0/64:1-382/53;T`)
    const baseSelectedItemFrameConfig = useMarkdownEnhancer(`0/64:55-382/53;T`)
    const baseSelectedItemBackgroundConfig = {
      begin: useMarkdownEnhancer(`0/6-71:309-380/3-55;T`),
      mid: useMarkdownEnhancer(`0/380-71:312-380/3-55;T`),
      end: useMarkdownEnhancer(`0/6-71:315-380/3-55;T`)
    }
    const baseCurrentItemBackgroundConfig = {
      begin: useMarkdownEnhancer(`0/6-71:319-380/3-55;T`),
      mid: useMarkdownEnhancer(`0/380-71:322-380/3-55;T`),
      end: useMarkdownEnhancer(`0/6-71:325-380/3-55;T`)
    }

    const plusConfig = useMarkdownEnhancer(`123-${184 + 73 * position.value}/35:490-92.5/22;T`)

    const hitboxConfig = useMarkdownEnhancer(`51-${164 + 73 * position.value}/392-71`)

    const itemFrameConfig = computed(() => ({ ...baseItemFrameConfig, x: 55, y: 168 + 73 * position.value }))
    const selectedItemFrameConfig = computed(() => ({ ...baseSelectedItemFrameConfig, x: 55, y: 168 + 73 * position.value }))
    const selectedItemBackgroundConfig = computed(() => ({
      begin: { ...baseSelectedItemBackgroundConfig.begin, x: 51, y: 165 + 73 * position.value },
      mid: { ...baseSelectedItemBackgroundConfig.mid, x: 57, y: 165 + 73 * position.value },
      end: { ...baseSelectedItemBackgroundConfig.end, x: 437, y: 165 + 73 * position.value }
    }))
    const currentItemBackgroundConfig = computed(() => ({
      begin: { ...baseCurrentItemBackgroundConfig.begin, x: 51, y: 165 + 73 * position.value },
      mid: { ...baseCurrentItemBackgroundConfig.mid, x: 57, y: 165 + 73 * position.value },
      end: { ...baseCurrentItemBackgroundConfig.end, x: 437, y: 165 + 73 * position.value }
    }))

    return {
      plusConfig,
      itemFrameConfig,
      selectedItemFrameConfig,
      selectedItemBackgroundConfig,
      currentItemBackgroundConfig,
      hitboxConfig,
      FieldType,
      handleClick,
    }
  },
})

export enum FieldType {
  DEFAULT = 'default',
  SELECTED = 'selected',
  EQUIPPED = 'equipped'
}
</script>

<style lang="sass" scoped>

</style>