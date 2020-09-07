<template>
  <v-card class="card">
    <canvas id="canvas-testspace"
            width="450"
            height="800"
    />
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: "canvas-testspace",

  data() {
    return {
      canvas: document.getElementById('canvas-testspace') as null | HTMLCanvasElement
    }
  },

  methods: {
    // resize(): void {
    //   if (this.canvas) {
    //     this.canvas.width  = this.canvas.clientWidth;
    //     this.canvas.height = this.canvas.clientHeight;
    //
    //     this.width  = this.canvas.clientWidth;
    //     this.height = this.canvas.clientHeight;
    //   }
    // }
  },

  mounted() {
    this.canvas = document.querySelector('canvas');
    // this.ctx    = this.canvas?.getContext('2d');
    // this.resize();
    //
    // window.addEventListener('resize', () => this.resize())
  }
})
</script>

<style lang="less" scoped>
canvas {
  width: 100%;
  height: 100%;
}
</style>
