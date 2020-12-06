<template>
  <gamespace v-if="isTilesetLoaded" />
</template>

<script lang="ts">
import Vue from 'vue';
import gamespace from '~/components/gamespace.vue';

export default Vue.extend({
  name: 'home',
  components: {
    gamespace
  },
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

<style lang="less" scoped>

</style>
