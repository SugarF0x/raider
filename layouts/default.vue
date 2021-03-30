<template lang="pug">
  v-app(dark)
    v-main
      v-container
        nuxt
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'default'
})

</script>

<style lang="sass" scoped>
.container
  height: 100vh
</style>
