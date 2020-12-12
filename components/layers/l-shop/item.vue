<template>
  <v-group><!--suppress JSUnresolvedVariable, JSUnusedLocalSymbols -->
    <v-group id="selectedItemBG"><!--suppress JSUnresolvedVariable, JSUnusedLocalSymbols -->
      <v-group v-for="n in selected"
               :key="'shopItemBackground-'+n.id"
      ><!--suppress JSUnresolvedVariable -->
        <v-image :config="{
                   x: 51,
                   y: 236 + 73*(items.indexOf(n)),
                   width: 6,
                   height: 73,
                   image: tileset,
                   ...shopTiles.selectedItemBG.begin
                 }"
        /><!--suppress JSUnresolvedVariable -->
        <v-image :config="{
                   x: 57,
                   y: 236 + 73*(items.indexOf(n)),
                   width: 380,
                   height: 73,
                   image: tileset,
                   ...shopTiles.selectedItemBG.mid
                 }"
        /><!--suppress JSUnresolvedVariable -->
        <v-image :config="{
                   x: 437,
                   y: 236 + 73*(items.indexOf(n)),
                   width: 6,
                   height: 73,
                   image: tileset,
                   ...shopTiles.selectedItemBG.end
                 }"
        />
      </v-group>
      <v-image :config="{
                   x: 51,
                   y: 456,
                   width: 6,
                   height: 73,
                   image: tileset,
                   ...shopTiles.currentItemBG.begin
                 }"
      /><!--suppress JSUnresolvedVariable -->
      <v-image :config="{
                   x: 57,
                   y: 456,
                   width: 380,
                   height: 73,
                   image: tileset,
                   ...shopTiles.currentItemBG.mid
                 }"
      /><!--suppress JSUnresolvedVariable -->
      <v-image :config="{
                   x: 437,
                   y: 456,
                   width: 6,
                   height: 73,
                   image: tileset,
                   ...shopTiles.currentItemBG.end
                 }"
      />
    </v-group>

    <v-group id="selectedItemFrames"><!--suppress JSUnresolvedVariable, JSUnusedLocalSymbols -->
      <v-image v-for="n in 4"
               :key="'shopItemFrame-'+n+'-'+(items.indexOf(selected[n-1]) !== -1)"
               :config="{
                 x: 55,
                 y: 167 + 73*n,
                 image: tileset,
                 ...(selected.indexOf(items[n-1]) !== -1 ? shopTiles.itemFrameSelected : shopTiles.itemFrame)
               }"
      />
    </v-group>

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
import { shopTiles } from "~/assets/consts"

export default Vue.extend({
  name: "l-shop-item",
  components: {
    'u-text': uText
  },
  data() {
    return {
      shopTiles: shopTiles,
    }
  },
  computed: {
    tileset() { return this.$store.state.tiles },
    icons() { return this.$store.state.icons },
    items() { return this.$store.state.shop.items },
    selected() { return this.$store.state.shop.selected },
    equipment() { return this.$store.state.run.character.equipment },
  },
  methods: {
    comparisonText(item1: Item, item2: Item): Array<{ text: string, color: string }> {
      let result = [] as Array<{ text: string, color: string }>

      item1.buffs.forEach(buff1 => {
        let color = 'green'
        let buff2 = item2.buffs.find(entry => entry.type === buff1.type)
        if (buff2) {
          if (buff1.power === buff2.power) { color = 'grey' }
          else if (buff1.power < buff2.power) { color = 'red' }
        }
        result.push({ text: `${buff1.power} ${buff1.getText().short}`, color })
      })

      return result
    }
  },
  created() {
    if (this.$store.state.shop.items.length === 0) {
      this.$store.dispatch('shop/generateItems')
    }
  }
})
</script>
