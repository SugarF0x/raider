<template lang="pug">
  v-group
    v-rect(:config="menuBorder")
    v-rect(:config="statsBorder")
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useMarkdownEnhancer } from "~/assets/hooks/useMarkdownEnhancer"

export default defineComponent({
  setup() {
    const menuBorder = useMarkdownEnhancer('370-60/70-35;S')
    const statsBorder = useMarkdownEnhancer('370-105/70-35;S')

    return {
      menuBorder,
      statsBorder
    }
  },
})
</script>

<style lang="sass" scoped>

</style>