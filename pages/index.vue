<template lang="pug">
  gamespace(v-if="isTilesetLoaded")
  v-row(v-else).fill-height
    v-col.fill-height.d-flex.justify-center.align-center
      v-progress-circular(
        indeterminate
        size="100"
      )
</template>

<script lang="ts">
import Vue from 'vue';
import markdown from "~/assets/Old/ui-markdowns/shop/markdown"

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
