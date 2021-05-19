<template lang="pug">
  v-text(:config="result")
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRefs } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    config: {
      type: Object as PropType<Config>,
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

interface Config {
  x: number
  y: number
  text: string
  width?: number
  fill?: string
  fontSize?: number
  align?: string
  listening?: boolean
  fillAfterStrokeEnabled?: boolean
}

const defaultProps: Partial<Config> = {
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