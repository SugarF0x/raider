<template>
  <canvas id="canvas-testspace"
          width="450"
          height="800"
  />
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: "gamespace",

  data() {
    return {
      canvas: null as null | HTMLCanvasElement,
      ctx:    null as null | CanvasRenderingContext2D
    }
  },

  methods: {

  },
  mounted() {
    this.canvas = document.querySelector('canvas');
    if (this.canvas) {
      this.ctx = this.canvas.getContext('2d');
      if (this.ctx) {
                                this.ctx.strokeRect(10,      10,      430,40);  // header
        for (let i=0; i<4; i++) this.ctx.strokeRect(10+90*i, 60,      80, 80);  // spells
        for (let i=0; i<2; i++) this.ctx.strokeRect(370,     60+45*i, 70, 35);  // menu / stats
                                this.ctx.strokeRect(10,      150,     430,430); // gamespace
                                this.ctx.strokeRect(10,      590,     130,150); // cash
        for (let i=0; i<3; i++) this.ctx.strokeRect(150+53*i,590,     43, 50);  // enemy power / defence / attack
        for (let i=0; i<2; i++) this.ctx.strokeRect(150,     650+50*i,150,40);  // upgrade / level
                                this.ctx.strokeRect(310,     590,     130,150); // health
                                this.ctx.strokeRect(10,      750,     430,40);  // footer
      }
    }
  }
})
</script>

<style lang="less" scoped>
canvas {
  background-color: white;
  height: 90%;
}
</style>
