<template>
  <v-text :key="key" :config="getTextConfig(config)"/>
</template>

<script lang="ts">
import Vue from 'vue'
import { ITextConfigOptions, ITextNonOptionals } from "~/components/types"

export default Vue.extend({
  name: "u-text",
  props: {
    config: Object as () => ITextConfigOptions
  },
  computed: {
    key() {
      return 'text-'+this.config.text+'-'+this.config.x+'-'+this.config.y
    }
  },
  methods: {
    /**
     * Format text to Konva Text config object based on a lot of things...
     */
    getTextConfig(opt: ITextConfigOptions): Object {
      const defaults: ITextNonOptionals = {
        width: 100,
        fill: 'white',
        fontSize: 16,
        align: 'center',
        listening: false
      };

      /*
          First assign defaults
          Then override defaults with passed values if any
          Then assign immutable values as transform text to string
       */
      return Object.assign({}, defaults, opt,
          {
            text: opt.text.toString(),
            wrap: 'none',
            fontFamily: 'Comic Sans MS'
          },
      );
    },
  }
})
</script>

<style scoped>

</style>