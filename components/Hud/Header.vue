<template lang="pug">
  v-group
    util-text(:config="{text: `Score: ${score}`, x: 20, y: 22, align: 'left', width: 200, fontSize: 24}")
    util-text(:config="{text: `Turn: ${turn}`, x: 230, y: 22, align: 'right', width: 200, fontSize: 24}")
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'
import { useAccessor } from "~/assets/hooks"

export default defineComponent({
  setup() {
    const { instance } = useAccessor()
    const score = computed(() => instance.score)
    const turn = computed(() => instance.turn)

    return {
      score,
      turn,
    }
  },
})
</script>

<style lang="sass" scoped>

</style>