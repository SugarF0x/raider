<template>
  <v-group><!--suppress JSUnresolvedVariable, JSUnusedLocalSymbols -->
    <v-group v-for="n in 4" :key="'upgrade-frames-'+n+selected.length"><!--suppress JSUnresolvedVariable, JSUnusedLocalSymbols -->
      <v-group>
        <!--suppress JSUnresolvedVariable, JSUnusedLocalSymbols -->
        <v-image :config="{
               x: 55,
               y: 167 + 73*n,
               image: tileset,
               ...shopTiles.itemFrame
             }"
        /><!--suppress JSUnresolvedVariable, JSUnusedLocalSymbols -->
        <v-image :config="{
               x: 124,
               y: 182 + 73*n,
               image: tileset,
               ...shopTiles.plus
             }"
        /><!--suppress JSUnresolvedVariable, JSUnusedLocalSymbols -->
        <v-image :config="{
               x: 162,
               y: 167 + 73*n,
               image: tileset,
               ...shopTiles.itemFrame
             }"
        />
      </v-group>

      <!--suppress JSUnresolvedVariable, JSUnusedLocalSymbols -->
      <v-group v-if="selected.length && n-1 === entries.indexOf(selected[0])"><!--suppress JSUnresolvedVariable -->
        <v-image :config="{
                 x: 51,
                 y: 236 + 73*(entries.indexOf(selected[0])),
                 width: 6,
                 height: 73,
                 image: tileset,
                 ...shopTiles.selectedItemBG.begin
               }"
        /><!--suppress JSUnresolvedVariable -->
        <v-image :config="{
                 x: 57,
                 y: 236 + 73*(entries.indexOf(selected[0])),
                 width: 380,
                 height: 73,
                 image: tileset,
                 ...shopTiles.selectedItemBG.mid
               }"
        /><!--suppress JSUnresolvedVariable -->
        <v-image :config="{
                 x: 437,
                 y: 236 + 73*(entries.indexOf(selected[0])),
                 width: 6,
                 height: 73,
                 image: tileset,
                 ...shopTiles.selectedItemBG.end
               }"
        />

        <!--suppress JSUnresolvedVariable, JSUnusedLocalSymbols -->
        <v-image :config="{
               x: 55,
               y: 167 + 73*(entries.indexOf(selected[0])+1),
               image: tileset,
               ...shopTiles.itemFrameSelected
             }"
        /><!--suppress JSUnresolvedVariable, JSUnusedLocalSymbols -->
        <v-image :config="{
               x: 124,
               y: 182 + 73*(entries.indexOf(selected[0])+1),
               image: tileset,
               ...shopTiles.plus
             }"
        /><!--suppress JSUnresolvedVariable, JSUnusedLocalSymbols -->
        <v-image :config="{
               x: 162,
               y: 167 + 73*(entries.indexOf(selected[0])+1),
               image: tileset,
               ...shopTiles.itemFrameSelected
             }"
        />
      </v-group>

      <v-group> <!-- items -->
        <v-group><!--suppress JSUnresolvedVariable, JSUnusedLocalSymbols -->
          <v-image :config="equipment[entries[n-1].item.target].getIconConfig(57, 170 + 73*n, icons)" /><!--suppress JSUnresolvedVariable, JSUnusedLocalSymbols -->
          <v-image :config="entries[n-1].item.getIconConfig(164.5, 169 + 73*n, tileset)" /><!--suppress JSUnresolvedVariable, JSUnusedLocalSymbols -->
          <u-text :config="{ text: entries[n-1].item.getText().title, x: 238, y: 172 + 73*n, align: 'left', width: 200 }" /><!--suppress JSUnresolvedVariable, JSUnusedLocalSymbols -->
          <u-text :config="{ text: entries[n-1].item.getText().description, x: 238, y: 193 + 73*n, align: 'left', width: 200, fontSize: 14, fill: 'lightgray' }" /><!--suppress JSUnresolvedVariable, JSUnusedLocalSymbols -->
          <u-text :config="{ text: comparisonText(equipment[entries[n-1].item.target],entries[n-1].item), x: 238, y: 215 + 73*n, fill: 'lightgrey', fontSize: 14, width: 200, align: 'left' }"
          />
        </v-group>
      </v-group>
    </v-group>
  </v-group>
</template>

<script lang="ts">
import Vue from 'vue'
import { shopTiles } from '@/assets/consts'

import uText          from '@/components/utils/u-text.vue'
import { Buff, Item } from "~/assets/Tiles";

export default Vue.extend({
  name: "l-shop-upgrade",
  components: {
    'u-text': uText
  },
  data() {
    return {
      shopTiles
    }
  },
  computed: {
    tileset() { return this.$store.state.tiles },
    icons() { return this.$store.state.icons },
    entries() { return this.$store.state.shop.entries },
    selected() { return this.$store.state.shop.selected },
    equipment() { return this.$store.state.run.character.equipment }
  },
  created() {
    if (this.$store.state.shop.entries.length === 0) {
      this.$store.dispatch('shop/generateBuffs')
    }
  },
  methods: {
    comparisonText(item: Item, buff: Buff) {
      let currentBuffPower = item.buffs.find(entry => entry.type === buff.type)?.power

      if (currentBuffPower) {
        return `${buff.getText().short}: ${currentBuffPower} >> ${currentBuffPower+buff.power}`
      } else {
        return `${buff.getText().short}: ${buff.power}`
      }
    }
  }
})
</script>
