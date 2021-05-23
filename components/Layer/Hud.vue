<template lang="pug">
  v-layer
    v-rect(:config="border")
    v-image(:config="hud")

    hud-header

    hud-spells
    hud-buttons

    hud-gold
    hud-state
    hud-upgrade
    hud-experience
    hud-health

    hud-footer
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api"
import { useMarkdownEnhancer } from "~/assets/hooks/useMarkdownEnhancer"

export default defineComponent({
  setup() {
    const hud = useMarkdownEnhancer('11-596/428-143:1-436/318-75;T')
    const border = useMarkdownEnhancer('10-590/430-150;S')

    return {
      hud,
      border
    }
  }
})
</script>