<template>
  <gamespace v-if="isTilesetLoaded" v-on:rerender="rerender" />
</template>

<script lang="ts">
import Vue from 'vue';
import gamespace from '@/components/gamespace/gamespace.vue';

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
  methods: {
    rerender() {
      this.$store.commit('TEMP_GAMEOVER_TRIGGER')
      this.$store.dispatch('resetStore')
      this.$store.dispatch('dungeon/populate')
    }
  },
  mounted() {
    this.$store.dispatch('initAssetsLoading')
  }
})
</script>

<style lang="less" scoped>

</style>
