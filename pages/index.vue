<template lang="pug">
  gamespace(v-if="isTilesetLoaded")
  v-row.fill-height.mx-0(v-else)
    v-col.fill-height.d-flex.flex-column.justify-center.align-center
      v-progress-circular(
        indeterminate
        size="100"
      )
      div.mt-5 Loading game assets ({{ loadedAssets }}/{{ totalAssets }})...
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'home',
  computed: {
    isTilesetLoaded() { return this.$store.getters.isTilesetLoaded },
    loadedAssets() { return this.$store.state.loadedAssets },
    totalAssets() { return this.$store.getters.totalAssets }
  },
  mounted() {
    this.$store.dispatch('initAssetsLoading')
  }
})
</script>

<style lang="sass" scoped>

</style>
