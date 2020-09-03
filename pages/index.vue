<template>
  <v-layout column>
    <v-row align="center"
           justify="center"
    >
      <v-col cols="12"
             sm="8"
             md="6"
             lg="5"
             xl="4"
      >
        <v-card :height="height + 'px'">
          <canvas/>
        </v-card>
      </v-col>
    </v-row>
    <v-row align="center"
           justify="center"
    >
      <v-col cols="12"
             sm="8"
             md="6"
             lg="5"
             xl="4"
      >
        <v-card>
          <v-card-actions>
            <v-btn @click="square">
              Draw random square
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script lang="ts">
import Vue from 'vue';

/* TODO: make 3 separate canvases:
    * header canvas for spells
    * game field
    * stats
    Have these be displayed in three columns if wide enough
      else display them one below the other
 */

export default Vue.extend({
  name: 'home',

  data() {
    return {
      canvas: null as null | undefined | HTMLCanvasElement,
      ctx:    null as null | undefined | CanvasRenderingContext2D,
      height: null as null | number,
      width:  null as null | number,
    }
  },

  methods: {
    square(): void {
      if (this.ctx && this.width && this.height) {
        let randomPos = {
          x: Math.floor(Math.random()*this.width-10),
          y: Math.floor(Math.random()*this.height-10)
        };
        this.ctx.beginPath()
        this.ctx.rect(randomPos.x,randomPos.y,10,10)
        this.ctx.fillStyle = 'red'
        this.ctx.fill()
      }
    },
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
    this.ctx    = this.canvas?.getContext('2d');
    this.resize();

    window.addEventListener('resize', () => this.resize())
  }
})
</script>

<style lang="less">
  canvas {
    width: 100%;
    height: 100%;
  }
</style>
