<template>
  <v-layer>
    <v-group v-if="$store.state.TEMP_GAMEOVER"
             :config="{listening: true}"
             @mousedown="restart"
             @touchstart="restart"
    >
      <v-rect :config="cover"/>
      <u-text :config="{text: 'GAME OVER', x: 0, y: 60, width: 450, fill: 'red', fontSize: 48}"></u-text>
      <u-text :config="{text: 'Click anywhere to restart', x: 0, y: 105, width: 450, fontSize: 36}"></u-text>
    </v-group>
  </v-layer>
</template>

<script lang="ts">
import Vue from 'vue'
import uText from '../utils/u-text.vue'

import * as C from '~/assets/consts'

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

<style scoped>

</style>