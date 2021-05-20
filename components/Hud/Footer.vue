<template lang="pug">
  v-group(v-if="$route.query.debug")
    util-text(:config="{text: 'Reset Store', x: 18, y: 761, width: 140, align: 'left', fontSize: 24}")
    v-rect(
      :config="{x: 15, y: 755, width: 145, height: 32}"
      @mousedown="resetStore"
      @touchstart="resetStore"
    )
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useAccessor } from "~/assets/hooks"

export default defineComponent({
  setup() {
    const accessor = useAccessor()
    const resetStore = () => { accessor.resetStore() }

    return {
      resetStore
    }
  },
})
</script>

<style lang="sass" scoped>

</style>