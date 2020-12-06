<template>
  <v-layer>
    <v-rect :config="config"/>
    <!--suppress JSUnusedLocalSymbols, JSUnresolvedVariable -->
    <v-rect v-for="(entry,key) in background" :key="key" :config="entry"/>
  </v-layer>
</template>

<script lang="ts">
import Vue from 'vue'
import * as C from '~/assets/consts'
import { dungeonMD } from "~/assets/consts"

export default Vue.extend({
  name: "l-background",
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
