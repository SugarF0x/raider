<template>
  <v-card class="card">
    <canvas id="canvas-gamespace"
            :width="width"
            :height="height"
    />
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: "canvas-gamespace",

  data() {
    return {
      canvas: document.getElementById('canvas-header') as null | HTMLCanvasElement,
      height: null as null | number,
      width:  null as null | number,
    }
  },

  methods: {
    resize(): void {
      if (this.canvas) {
        this.canvas.width  =  this.canvas.clientWidth;
        this.canvas.height = (this.canvas.clientWidth/9)*16;
        this.width  =  this.canvas.clientWidth;
        this.height = (this.canvas.clientWidth/9)*16;
      }
    }
  },

  mounted() {
    this.canvas = document.querySelector('canvas');
    // this.ctx    = this.canvas?.getContext('2d');
    this.resize();

    window.addEventListener('resize', () => this.resize())
  }
})
</script>

<style lang="less" scoped>
  canvas {
    width: 100%;
    height: 100%;
  }
</style>
