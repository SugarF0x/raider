<template>
  <gamespace :key="gamespaceKey" v-on:rerender="rerender"></gamespace>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'home',
  data() {
    return {
      gamespaceKey: 0 // used to rerender gamespace on game lost
    }
  },
  methods: {
    rerender() {
      this.gamespaceKey++;
    }
  }
})
</script>

<style lang="less" scoped>

</style>
