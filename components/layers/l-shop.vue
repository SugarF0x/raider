<template>
  <v-layer v-if="active !== 'none'"><!--suppress JSUnresolvedVariable, JSUnusedLocalSymbols -->
    <v-rect v-for="(entry,key) in MD" :key="key+$options.name" :config="entry"/><!--suppress JSUnresolvedFunction -->
    <u-text :config="{ ...displayText.head }" /><!--suppress JSUnresolvedFunction -->
    <u-text :config="{ ...displayText.desc }" />

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
    }
  },
  computed: {
    tileset() { return this.$store.state.tiles },
    active(): 'item' | 'upgrade' | 'levelup' { return this.$store.state.shop.active },
    entries() { return this.$store.state.shop.entries },
    isValid() { return this.$store.state.shop.selected.length === (this.$store.state.shop.active === 'levelup' ? 2 : 1) },
    displayText(): any {
      return Object.assign(
        {},
        { head: { ...titleBase.head, text: titleBase[this.active].title, fill: titleBase[this.active].fill } },
        { desc: { ...titleBase.desc, text: titleBase[this.active].description, fill: titleBase[this.active].fill } }
      )
    }
  },
  methods: {
    accept() {
      if (this.isValid) {
        this.$store.dispatch('shop/applySelected')
      }
    },
    select(item: number) {
      this.$store.commit('shop/SELECT_ITEM', this.entries[item])
    },
  }
})
</script>
