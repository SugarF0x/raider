<template lang="pug">
  v-group
    v-image(:config="imageConfig")

    util-text(:config="titleConfig")
    util-text(:config="descriptionConfig")
    util-text(:config="comparisonConfig")
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRefs } from '@nuxtjs/composition-api'
import { useAccessor } from "~/assets/hooks"
import { Attributes } from "~/assets/entities"

type CombinedTypes = 
  | Attributes.Attribute

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<CombinedTypes>,
      required: true
    },
    position: {
      type: Number as PropType<number>,
      required: true
    },
  },
  setup(props) {
    const { position, item } = toRefs(props)
    const accessor = useAccessor()

  },
})
</script>

<style lang="sass" scoped>

</style>