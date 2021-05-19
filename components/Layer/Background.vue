<template lang="pug">
  v-layer
    v-rect(:config="config")
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api"
import { KONVA } from '~/assets/consts'

export default defineComponent({
  setup() {
    return {
      config: {
        height: KONVA.HEIGHT,
        width: KONVA.WIDTH,
        fill: KONVA.BACKGROUND_COLOR
      }
    }
  }
})
</script>
