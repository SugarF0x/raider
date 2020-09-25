<template>
  <v-row justify="center" align="center">
    <v-stage :config="konva" id="konva">
      <v-layer>
        <v-rect v-for="(e,i,n) in elements" :key="n" :config="e"></v-rect>
      </v-layer>
    </v-stage>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue';
// import { Tile, Skull } from '@/assets/Tiles.ts'

export default Vue.extend({
  name: "gamespace",

  data() {
    return {
      konva: {
        width: 450,  // 450
        height: 800, // 800
      },
      elements: {
        header: {
          x: 10,
          y: 10,
          width: 430,
          height: 40,
          stroke: 'black'
        },
        spell1: {
          x: 10,
          y: 60,
          width: 80,
          height: 80,
          stroke: "black"
        },
        spell2: {
          x: 100,
          y: 60,
          width: 80,
          height: 80,
          stroke: "black"
        },
        spell3: {
          x: 190,
          y: 60,
          width: 80,
          height: 80,
          stroke: "black"
        },
        spell4: {
          x: 280,
          y: 60,
          width: 80,
          height: 80,
          stroke: "black"
        },
        menu: {
          x: 370,
          y: 60,
          width: 70,
          height: 35,
          stroke: "black"
        },
        stats: {
          x: 370,
          y: 105,
          width: 70,
          height: 35,
          stroke: "black"
        },
        dungeon: {
          x: 10,
          y: 150,
          width: 430,
          height: 430,
          stroke: "black"
        },
        gold: {
          x: 10,
          y: 590,
          width: 130,
          height: 150,
          stroke: "black"
        },
        enemy: {
          x: 150,
          y: 590,
          width: 43,
          height: 50,
          stroke: "black"
        },
        defence: {
          x: 203,
          y: 590,
          width: 43,
          height: 50,
          stroke: "black"
        },
        attack: {
          x: 256,
          y: 590,
          width: 43,
          height: 50,
          stroke: "black"
        },
        upgrade: {
          x: 150,
          y: 650,
          width: 150,
          height: 40,
          stroke: "black"
        },
        level: {
          x: 150,
          y: 700,
          width: 150,
          height: 40,
          stroke: "black"
        },
        health: {
          x: 310,
          y: 590,
          width: 130,
          height: 150,
          stroke: "black"
        },
        footer: {
          x: 10,
          y: 750,
          width: 430,
          height: 40,
          stroke: "black"
        }
      },
    };
  },

  mounted() {
    let canvas = document.querySelector('canvas');
    if (canvas) {
      canvas.removeAttribute('style');
      canvas.setAttribute('width',  this.konva.width.toString());
      canvas.setAttribute('height', this.konva.height.toString());
    }
    let konvas = document.querySelector('.konvajs-content');
    if (konvas) konvas.removeAttribute('style');
  }
})
</script>

<style lang="less" scoped>
  .row {
    height: 100%;
  }
</style>

<style lang="less">
#konva {
  .konvajs-content {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  width: 100%;
  height: 100%;
  > * {
    width: 100%;
    height: 100%;
  }
}
</style>

<style>
#konva canvas {
  background-color: white;
  max-height: min(100%, 800px);
  max-width: min(100%, 450px);
}
</style>
