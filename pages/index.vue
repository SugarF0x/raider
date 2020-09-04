<template>
  <v-layout column>
<!--    <v-row align="center"-->
<!--           justify="center"-->
<!--    >-->
<!--      <v-col cols="12"-->
<!--             lg="4"-->
<!--      >-->
<!--        <canvas-header></canvas-header>-->
<!--      </v-col>-->
<!--      <v-col cols="12"-->
<!--             lg="4"-->
<!--      >-->
<!--        <canvas-gamespace></canvas-gamespace>-->
<!--      </v-col>-->
<!--      <v-col cols="12"-->
<!--             lg="4"-->
<!--      >-->
<!--        <canvas-footer></canvas-footer>-->
<!--      </v-col>-->
<!--    </v-row>-->
    <v-row justify="center"
           center="center"
    >
      <v-col cols="12">
        <canvas-testspace></canvas-testspace>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'home'
})
</script>

<style lang="less">

</style>
