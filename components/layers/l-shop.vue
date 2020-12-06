<template>
  <v-layer v-if="active !== 'none'"><!--suppress JSUnresolvedVariable, JSUnusedLocalSymbols -->
    <v-rect v-for="(entry,key) in MD" :key="key+$options.name" :config="entry"/><!--suppress JSUnresolvedFunction -->
    <u-text :config="{ ...title[active].head }" /><!--suppress JSUnresolvedFunction -->
    <u-text :config="{ ...title[active].desc }" />

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
      <v-group v-if="active === 'item'">
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

    <v-group v-if="active === 'item'">
      <!-- item shop with 1 item to pick out of 3 and 4rth slot is reserved for current item display --><!--suppress JSUnresolvedVariable, JSUnusedLocalSymbols -->
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

    <v-group v-else-if="active === 'upgrade'">
      <!-- upgrade shop with 1 upgrade to pick out of 4 -->
    </v-group>

    <v-group v-else-if="active === 'levelup'">
      <!-- levelup shop with 2 skills to pick out of 2 skills and 2 stats -->
    </v-group>

    <v-group>
      <!-- hitboxes --><!--suppress JSUnresolvedVariable, JSUnusedLocalSymbols -->
      <v-rect v-for="n in (active === 'item' ? 3 : 4)"
              :key="'shopItemHitbox-'+n"
              :config="{
                 x: 53,
                 y: 238 + 73*(n-1),
                 height: 70,
                 width: 380
               }"
              @mousedown="select(n-1)"
              @touchstart="select(n-1)"
      />
    </v-group>

    <v-image :config="{ image: $store.state.tiles, ...shopTiles.acceptButton, opacity: isValid ? 1 : .5 }"
             @mousedown="accept"
             @touchstart="accept"
    />
  </v-layer>
</template>

<script lang="ts">
// TODO: split template into components UUUUUGHHHH

import Vue from 'vue';

import uText from '../utils/u-text.vue'

import { shopMD, titleBase, shopTiles } from '~/assets/consts'

export default Vue.extend({
  name: "Shop",
  components: {
    'u-text': uText
  },
  data() {
    return {
      MD: shopMD,
      shopTiles: shopTiles,
      title: { // TODO: make it a computed property
        item: {
          head: {
            text: 'Item Shop!',
            fill: '#f3ff00',
            ...titleBase.item.head
          },
          desc: {
            text: 'Choose 1 item to buy',
            fill: '#f3ff00',
            ...titleBase.item.desc
          }
        },
        upgrade: {
          head: {
            text: 'Upgrade!',
            fill: '#0054ff',
            ...titleBase.item.head
          },
          desc: {
            text: 'Choose 1 upgrade to apply',
            fill: '#0054ff',
            ...titleBase.item.desc
          }
        },
        levelup: {
          head: {
            text: 'Level Up!',
            fill: '#26ff00',
            ...titleBase.item.head
          },
          desc: {
            text: 'Choose 2 skills to improve',
            fill: '#26ff00',
            ...titleBase.item.desc
          }
        },
      }
    }
  },
  computed: {
    tileset() { return this.$store.state.tiles },
    icons() { return this.$store.state.icons },
    active() {
      if (this.$store.state.shop.active !== 'none' && this.$store.state.shop.items.length === 0) {
        this.$store.dispatch('shop/generateItems')
      }

      return this.$store.state.shop.active
    },
    items() { return this.$store.state.shop.items },
    selected() { return this.$store.state.shop.selected },
    equipment() { return this.$store.state.run.character.equipment },
    isValid() { return this.$store.state.shop.selected.length === (this.$store.state.shop.active === 'levelup' ? 2 : 1) }
  },
  methods: {
    accept() {
      if (this.isValid) {
        this.$store.dispatch('shop/applySelected')
      }
    },
    select(item: number) {
      this.$store.commit('shop/SELECT_ITEM', this.items[item])
    },
  }
})
</script>
