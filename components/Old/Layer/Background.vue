<template lang="pug">
  v-layer
    v-rect(:config="config")
    v-rect(
      v-for="(entry,key) in background"
      :key="key"
      :config="entry"
    )
</template>

<script lang="ts">
import Vue from 'vue'
import * as C from '~/assets/Old/consts'
import { dungeonMD } from "~/assets/Old/consts"

export default Vue.extend({
  name: "layer-background",
  data() {
    return {
      config: {
        height: C.KONVA_HEIGHT,
        width: C.KONVA_WIDTH,
        fill: C.KONVA_BACKGROUND_COLOR
      },
      background: dungeonMD
    }
  }
})
</script>
