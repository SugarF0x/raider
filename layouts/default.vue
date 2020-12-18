<template>
  <v-app dark>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'default'
})

</script>

<style lang="less" scoped>
  .container {
    height: 100vh;
  }
</style>
