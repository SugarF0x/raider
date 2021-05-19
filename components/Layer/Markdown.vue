<template lang="pug">
  v-layer
    v-rect(
      v-for="(shape, index) in shapes"
      :config="shape"
      :key="'shape-'+index"
    )
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api"
import { BACKGROUND } from '~/assets/consts/markdowns/borders'
import { parseMarkdown } from "~/assets/utils"

export default defineComponent({
  setup() {
    return {
      shapes: BACKGROUND.map(entry => parseMarkdown(entry))
    }
  }
})
</script>