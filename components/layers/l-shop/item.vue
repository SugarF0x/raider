<template>
  <v-group>
    <!--suppress JSUnresolvedVariable, JSUnusedLocalSymbols -->
    <v-group v-for="n in 3"
             :key="'shopItemIcon-'+n"
    ><!--suppress JSUnresolvedVariable, JSUnusedLocalSymbols -->
      <v-image :config="items[n-1].getIconConfig(57, 170 + 73*n, icons)" /><!--suppress JSUnresolvedVariable, JSUnusedLocalSymbols -->
      <u-text :config="{ text: items[n-1].name, x: 130, y: 172 + 73*n, align: 'left', width: 200 }" /><!--suppress JSUnresolvedVariable, JSUnusedLocalSymbols -->
      <u-text v-for="(t,i) in comparisonText(items[n-1],equipment[items[n-1].type])"
              :key="t.text+n"
              :config="{ text: t.text, x: 130 + 50*i-1, y: 210 + 73*n, fill: t.color, width: 50, align: 'left' }"
      />
    </v-group>
    <!-- currently worn item -->
    <v-group v-if="selected.length">
      <v-image :config="equipment[selected[0].type].getIconConfig(57, 170 + 73*4, icons)" /><!--suppress JSUnresolvedVariable, JSUnusedLocalSymbols -->
      <u-text :config="{ text: equipment[selected[0].type].name, x: 130, y: 172 + 73*4, align: 'left', width: 200 }" /><!--suppress JSUnresolvedVariable, JSUnusedLocalSymbols -->
      <u-text v-for="(t,i) in comparisonText(equipment[selected[0].type],selected[0])"
              :key="t.text+'worn'"
              :config="{ text: t.text, x: 130 + 50*i-1, y: 210 + 73*4, fill: t.color, width: 50, align: 'left' }"
      />
    </v-group>
  </v-group>
</template>

<script lang="ts">
import Vue from 'vue'
import uText from '@/components/utils/u-text.vue'
import { Item } from "~/assets/Tiles"

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
  },
  methods: {
    comparisonText(item1: Item, item2: Item): Array<{ text: string, color: string }> {
      let result = [] as Array<{ text: string, color: string }>

      let color = 'grey'
      if (item1.power > item2.power) { color = 'green' }
      else if (item1.power < item2.power) { color = 'red' }
      result.push({ text: item1.getPowerText(), color})

      item1.buffs.forEach(buff1 => {
        color = 'green'
        let buff2 = item2.buffs.find(entry => entry.type === buff1.type)
        if (buff2) {
          if (buff1.power === buff2.power) { color = 'grey' }
          else if (buff1.power < buff2.power) { color = 'red' }
        }
        result.push({ text: buff1.power + buff1.getText().short, color }) // TODO: make it more like it's done with item
      })

      return result
    }
  }
})
</script>
