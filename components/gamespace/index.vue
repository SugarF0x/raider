<template>
  <v-row justify="center" align="center" ref="row">
    <v-stage :config="konva" id="konva" :key="konva.resizeKey">
      <l-background />
      <l-hud />
      <l-dungeon />
      <l-gameover v-on:rerender="$emit('rerender')" />
    </v-stage>
  </v-row>
</template>

<script lang="ts">
// TODO: contain currentDamage tooltip on screen

import Vue from 'vue'

import * as C from './consts'

import lBackground from './layers/l-background.vue'
import lHud from './layers/l-hud.vue'
import lDungeon from './layers/l-dungeon.vue'
import lGameover from './layers/l-gameover.vue'

// noinspection JSUnusedGlobalSymbols
export default Vue.extend({
  name: "gamespace",

  components: {
    'l-background': lBackground,
    'l-hud': lHud,
    'l-dungeon': lDungeon,
    'l-gameover': lGameover
  },

  data() {
    return {
      /**
       * Konva configuration
       */
      konva: {
        width: C.KONVA_WIDTH,
        height: C.KONVA_HEIGHT,
        scaleX: 1,
        scaleY: 1,
        resizeKey: 0
      },
    };
  },

  methods: {
    /**
     * Set new sizes based on current screen
     */
    resize(): boolean {
      let konva   = document.getElementById("konva");
      let konvajs = document.querySelector('.konvajs-content');
      let canvas  = document.querySelectorAll('canvas');

      let style, height, width;

      if (konva) style = window.getComputedStyle(konva, null);
      if (style) {
        let sHeight = style.getPropertyValue("height");
        let sWidth  = style.getPropertyValue("width");
        height      = parseInt(sHeight.slice(0, sHeight.length - 2));
        width       = parseInt(sWidth.slice(0, sWidth.length - 2));
      }

      if (konvajs && canvas.length && height && width) {
        let x = C.KONVA_WIDTH;
        let y = C.KONVA_HEIGHT;

        if (width / x > height / y) {
          this.konva.scaleY = height / y;
          this.konva.scaleX = height / y;

          y = height;
          x = height * 0.5625;
        } else {
          this.konva.scaleY = width / x;
          this.konva.scaleX = width / x;

          x = width;
          y = width / 9 * 16;
        }

        this.konva.width  = x;
        this.konva.height = y;

        let style = `width: ${ x }px; height: ${ y }px`;
        konvajs.setAttribute('style', style);
        canvas.forEach(e => {
          e.setAttribute('style', style);
          e.setAttribute('width', `${ x }px`);
          e.setAttribute('height', `${ y }px`);
        });

        this.konva.resizeKey++;
        return true
      }

      return false
    },
  },

  mounted() {
    /**
     * The initial resize as well as an event to handle any future resizes
     */
    this.resize();
    window.addEventListener('resize', this.resize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize);
  }
});
</script>

<style lang="less" scoped>
.row {
  height: 100%;
}
</style>
<style lang="less">
#konva {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .konvajs-content {
    position: relative;
    user-select: none;
  }

  canvas {
    padding: 0;
    margin: 0;
    border: 0;
    background-color: transparent;
    position: absolute;
    top: 0;
    left: 0;
    display: block;
  }
}
</style>
