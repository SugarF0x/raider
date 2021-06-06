<template lang="pug">
  v-text(:config="result")
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRefs } from '@nuxtjs/composition-api'
import { TextConfig } from "~/assets/types"

export default defineComponent({
  props: {
    config: {
      type: Object as PropType<TextConfig>,
      required: true,
    },
  },
  setup(props) {
    const { config } = toRefs(props)

    const result = computed(() => ({
      ...defaultProps, ...config.value, ...{
        text: config.value.text.toString(),
        wrap: 'none',
        fontFamily: 'Comic Sans MS',
      },
    }))

    return {
      result,
    }
  },
})

const defaultProps: Partial<TextConfig> = {
  width: 100,
  fill: 'white',
  fontSize: 16,
  align: 'center',
  listening: false,
  fillAfterStrokeEnabled: true,
}
</script>

<style lang="sass" scoped>

</style>