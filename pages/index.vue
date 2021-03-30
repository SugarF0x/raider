<template lang="pug">
  gamespace(v-if="isTilesetLoaded")
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'home',
  computed: {
    isTilesetLoaded() {
      return this.$store.getters.isTilesetLoaded
    }
  },
  mounted() {
    this.$store.dispatch('initAssetsLoading')
  }
})
</script>

<style lang="sass" scoped>

</style>
