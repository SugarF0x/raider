<template lang="pug">
  v-layer
    v-image(:config="hud")

    hud-gold
    hud-state
    hud-upgrade
    hud-experience
    hud-health
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api"
import { BACKGROUND } from "~/assets/consts/markdowns/hud"
import { parseMarkdown } from "~/assets/utils"

export default defineComponent({
  setup() {
    const hud = parseMarkdown(BACKGROUND)

    return {
      hud
    }
  }
})
</script>