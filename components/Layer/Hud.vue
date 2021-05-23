<template lang="pug">
  v-layer
    v-image(:config="hud")

    hud-header
    hud-gold
    hud-state
    hud-upgrade
    hud-experience
    hud-health
    hud-footer
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api"
import { BACKGROUND } from "~/assets/consts/markdowns/hud"
import { useMarkdownEnhancer } from "~/assets/hooks/useMarkdownEnhancer"

export default defineComponent({
  setup() {
    const hud = useMarkdownEnhancer(BACKGROUND)

    return {
      hud
    }
  }
})
</script>