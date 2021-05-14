<template lang="pug">
  v-layer
    v-rect(:config="config")
</template>

<script lang="ts">
import Vue from 'vue'
import { KONVA } from '~/assets/consts'

export default Vue.extend({
  name: "layer-background",
  data() {
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
