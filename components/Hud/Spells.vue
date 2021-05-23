<template lang="pug">
  v-group
    v-rect(
      v-for="(spell, index) in spells"
      :key="`spell-${index}`"
      :config="spell"
    )
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useMarkdownEnhancer } from "~/assets/hooks/useMarkdownEnhancer"

export default defineComponent({
  setup() {
    const spells = [
        useMarkdownEnhancer('10-60/80;S'),
        useMarkdownEnhancer('100-60/80;S'),
        useMarkdownEnhancer('190-60/80;S'),
        useMarkdownEnhancer('280-60/80;S')
    ]

    return {
      spells
    }
  },
})
</script>

<style lang="sass" scoped>

</style>