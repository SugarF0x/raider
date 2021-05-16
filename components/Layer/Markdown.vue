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
import { BACKGROUND } from '~/assets/consts/makrdown'
import { parseMarkdown } from "~/assets/utils"

export default Vue.extend({
  name: "Markdown",
  data() {
    return {
      shapes: BACKGROUND.map(entry => parseMarkdown({ data: entry, stroke: true }))
    }
  }
})
</script>