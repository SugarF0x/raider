<template>
  <v-layer v-if="active !== 'none'"><!--suppress JSUnresolvedVariable, JSUnusedLocalSymbols -->
    <v-rect v-for="(entry,key) in MD" :key="key+$options.name" :config="entry"/><!--suppress JSUnresolvedFunction -->
    <u-text :config="{ ...title[active].head }" /><!--suppress JSUnresolvedFunction -->
    <u-text :config="{ ...title[active].desc }" />

    <ls-item v-if="active==='item'" />
    <ls-upgrade v-else-if="active==='upgrade'" />
    <ls-levelup v-else-if="active==='levelup'" />

    <!-- hitboxes -->
    <v-group><!--suppress JSUnresolvedVariable, JSUnusedLocalSymbols -->
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
import Vue from 'vue';

import uText from '../utils/u-text.vue'
import lsItem from './l-shop/item.vue'
import lsUpgrade from './l-shop/upgrade.vue'
import lsLevelup from './l-shop/levelup.vue'

import { shopMD, titleBase, shopTiles } from '~/assets/consts'

export default Vue.extend({
  name: "Shop",
  components: {
    'u-text': uText,
    'ls-item': lsItem,
    'ls-upgrade': lsUpgrade,
    'ls-levelup': lsLevelup
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
    active() { return this.$store.state.shop.active },
    items() { return this.$store.state.shop.items },
    buffs() { return this.$store.state.shop.buffs },
    selected() { return this.$store.state.shop.selected },
    isValid() { return this.$store.state.shop.selected.length === (this.$store.state.shop.active === 'levelup' ? 2 : 1) }
  },
  methods: {
    accept() {
      if (this.isValid) {
        this.$store.dispatch('shop/applySelected')
      }
    },
    select(item: number) {
      switch (this.active) {
        case 'item':
          this.$store.commit('shop/SELECT_ITEM', this.items[item])
          break;
        case 'upgrade':
          this.$store.commit('shop/SELECT_ITEM', this.buffs[item])
          break
      }
    },
  }
})
</script>
