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

    // hitbox
    v-rect(:config="hitboxConfig" @click="click")
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
      type: Number,
      required: true
    },
    click: {
      type: Function,
      default: () => {}
    }
  },
  setup(props) {
    const { position } = toRefs(props)

    const baseItemFrameConfig = useMarkdownEnhancer(`0/66:1-382/53;T`)
    const baseSelectedItemFrameConfig = useMarkdownEnhancer(`0/66:55-382/53;T`)
    const baseSelectedItemBackgroundConfig = {
      begin: useMarkdownEnhancer(`0/6-73:309-380/3-55;T`),
      mid: useMarkdownEnhancer(`0/380-73:312-380/3-55;T`),
      end: useMarkdownEnhancer(`0/6-73:315-380/3-55;T`)
    }
    const baseCurrentItemBackgroundConfig = {
      begin: useMarkdownEnhancer(`0/6-73:319-380/3-55;T`),
      mid: useMarkdownEnhancer(`0/380-73:322-380/3-55;T`),
      end: useMarkdownEnhancer(`0/6-73:325-380/3-55;T`)
    }

    const hitboxConfig = useMarkdownEnhancer(`51-${163 + 73 * position.value}/392-73`)

    const itemFrameConfig = computed(() => ({ ...baseItemFrameConfig, x: 55, y: 167 + 73 * position.value }))
    const selectedItemFrameConfig = computed(() => ({ ...baseSelectedItemFrameConfig, x: 55, y: 167 + 73 * position.value }))
    const selectedItemBackgroundConfig = computed(() => ({
      begin: { ...baseSelectedItemBackgroundConfig.begin, x: 51, y: 163 + 73 * position.value },
      mid: { ...baseSelectedItemBackgroundConfig.mid, x: 57, y: 163 + 73 * position.value },
      end: { ...baseSelectedItemBackgroundConfig.end, x: 437, y: 163 + 73 * position.value }
    }))
    const currentItemBackgroundConfig = computed(() => ({
      begin: { ...baseCurrentItemBackgroundConfig.begin, x: 51, y: 163 + 73 * position.value },
      mid: { ...baseCurrentItemBackgroundConfig.mid, x: 57, y: 163 + 73 * position.value },
      end: { ...baseCurrentItemBackgroundConfig.end, x: 437, y: 163 + 73 * position.value }
    }))

    return {
      itemFrameConfig,
      selectedItemFrameConfig,
      selectedItemBackgroundConfig,
      currentItemBackgroundConfig,
      hitboxConfig,
      FieldType
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