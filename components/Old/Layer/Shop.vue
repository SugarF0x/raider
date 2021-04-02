<template lang="pug">
  v-layer(v-if="active !== 'none'")
    v-rect(
      v-for="(entry,key) in MD"
      :key="key+$options.name"
      :config="entry"
    )
    util-text(:config="{ ...displayText.head }")
    util-text(:config="{ ...displayText.desc }")

    layer-shop-item(v-if="active==='item'")
    layer-shop-upgrade(v-else-if="active==='upgrade'")
    layer-shop-levelup(v-else-if="active==='levelup'")

    // hitboxes
    v-group
      v-rect(
        v-for="n in (active === 'item' ? 3 : 4)"
        :key="'shopItemHitbox-'+n"
        :config=`{
           x: 53,
           y: 238 + 73*(n-1),
           height: 70,
           width: 380
         }`
        @mousedown="select(n-1)"
        @touchstart="select(n-1)"
      )

    v-image(
      :config="{ image: $store.state.tiles, ...shopTiles.acceptButton, opacity: isValid ? 1 : .5 }"
      @mousedown="accept"
      @touchstart="accept"
    )
</template>

<script lang="ts">
import Vue from 'vue';

import { shopMD, titleBase, shopTiles } from '~/assets/Old/consts'

export default Vue.extend({
  name: "layer-shop",
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
