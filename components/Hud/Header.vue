<template lang="pug">
  v-group
    v-rect(:config="border")

    util-text(:config="{text: `Score: ${score}`, x: 20, y: 22, align: 'left', width: 200, fontSize: 24}")
    util-text(:config="{text: `Turn: ${turn}`, x: 230, y: 22, align: 'right', width: 200, fontSize: 24}")
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'
import { useAccessor } from "~/assets/hooks"
import { useMarkdownEnhancer } from "~/assets/hooks/useMarkdownEnhancer"

export default defineComponent({
  setup() {
    const border = useMarkdownEnhancer('10/430-40;S')

    const { instance } = useAccessor()
    const score = computed(() => instance.score)
    const turn = computed(() => instance.turn)

    return {
      border,
      score,
      turn,
    }
  },
})
</script>

<style lang="sass" scoped>

</style>