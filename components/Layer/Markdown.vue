<template lang="pug">
  v-layer
    v-rect(
      v-for="(shape, index) in shapes"
      :config="shape"
      :key="'shape-'+index"
    )
</template>

<script lang="ts">
import Vue from 'vue'
import { background } from '~/assets/consts/makrdown'
import { parseMarkdown } from "~/assets/utils"

export default Vue.extend({
  name: "Markdown",
  data() {
    return {
      shapes: background.map(entry => parseMarkdown(entry))
    }
  }
})
</script>

<style lang="sass" scoped>

</style>