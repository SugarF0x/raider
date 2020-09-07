<template>
  <canvas id="canvas-testspace"
          width="450"
          height="800"
  />
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: "canvas-testspace",

  data() {
    return {
      canvas: null as null | HTMLCanvasElement
    }
  },

  methods: {

  },

  mounted() {
    this.canvas = document.querySelector('canvas');
  }
})
</script>

<style lang="less" scoped>
canvas {
  background-color: white;
  height: 90%;
}
</style>
