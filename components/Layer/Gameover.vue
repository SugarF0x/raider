<template lang="pug">
  v-layer
    v-group(
      v-if="$store.state.TEMP_GAMEOVER"
      :config="{listening: true}"
      @mousedown="restart"
      @touchstart="restart"
    )
      v-rect(:config="cover")
      util-text(:config="{text: 'GAME OVER', x: 0, y: 60, width: 450, fill: 'red', fontSize: 48}")
      util-text(:config="{text: 'Click anywhere to restart', x: 0, y: 105, width: 450, fontSize: 36}")
</template>

<script lang="ts">
import Vue from 'vue'

import * as C from '~/assets/consts'

export default Vue.extend({
  name: "layer-gameover",
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
  methods: {
    restart() {
      this.$ga.event('raid','restart', 'dead', this.$store.state.run.game.score)
      this.$store.dispatch('resetStore')
      this.$store.dispatch('dungeon/populate')
      this.$store.commit('TEMP_GAMEOVER_TRIGGER')
    }
  }
})
</script>

<style lang="sass" scoped>

</style>