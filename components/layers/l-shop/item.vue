<template>
  <v-group>
    <!--suppress JSUnresolvedVariable, JSUnusedLocalSymbols -->
    <v-group v-for="n in 3"
             :key="'shopItemIcon-'+n"
    ><!--suppress JSUnresolvedVariable, JSUnusedLocalSymbols -->
      <v-image :config="items[n-1].getIconConfig(57, 170 + 73*n, icons)" /><!--suppress JSUnresolvedVariable, JSUnusedLocalSymbols -->
      <u-text :config="{ text: items[n-1].name, x: 130, y: 172 + 73*n, align: 'left', width: 200 }" /><!--suppress JSUnresolvedVariable, JSUnusedLocalSymbols -->
      <u-text :config="{ text: `${items[n-1].stat} ${items[n-1].statName}`, x: 130, y: 210 + 73*n, align: 'left', width: 100, fill: 'gray' }" />
    </v-group>
    <!-- currently worn item -->
    <v-group v-if="selected.length">
      <v-image :config="equipment[selected[0].type].getIconConfig(57, 170 + 73*4, icons)" /><!--suppress JSUnresolvedVariable, JSUnusedLocalSymbols -->
      <u-text :config="{ text: equipment[selected[0].type].name, x: 130, y: 172 + 73*4, align: 'left', width: 200 }" /><!--suppress JSUnresolvedVariable, JSUnusedLocalSymbols -->
      <u-text :config="{ text: `${equipment[selected[0].type].stat} ${equipment[selected[0].type].statName}`, x: 130, y: 210 + 73*4, align: 'left', width: 100, fill: 'gray' }" />
    </v-group>
  </v-group>
</template>

<script lang="ts">
import Vue from 'vue'

import uText from '@/components/utils/u-text.vue'

export default Vue.extend({
  name: "l-shop-item",
  components: {
    'u-text': uText
  },
  computed: {
    icons() { return this.$store.state.icons },
    items() { return this.$store.state.shop.items },
    selected() { return this.$store.state.shop.selected },
    equipment() { return this.$store.state.run.character.equipment },
  }
})
</script>
