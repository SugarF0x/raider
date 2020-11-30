<template>
  <v-layer>
    <u-text :config="{text: score, x: 175, y: 20, width: 100, fontSize: 24}"></u-text>
    <v-group v-if="$store.state.TEMP_GAMEOVER"
             :config="{listening: true}"
             @mousedown="$emit('rerender')"
             @touchstart="$emit('rerender')"
    >
      <v-rect :config="cover"/>
      <u-text :config="{text: 'GAME OVER', x: 0, y: 60, width: 450, fill: 'red', fontSize: 48, listen: true}"></u-text>
      <u-text :config="{text: 'Click here to restart', x: 0, y: 105, width: 450, fontSize: 36, listen: true}"></u-text>
    </v-group>
  </v-layer>
</template>

<script lang="ts">
import Vue from 'vue'
import uText from '../utils/u-text.vue'

import * as C from '../consts'

export default Vue.extend({
  name: "l-gameover",
  components: {
    'u-text': uText
  },
  data() {
    return {
      cover: {
        height: C.KONVA_HEIGHT,
        width: C.KONVA_WIDTH,
        fill: 'black',
        opacity: .5
      }
    }
  },
  computed: {
    score() { return this.$store.state.run.score }
  }
})
</script>

<style scoped>

</style>