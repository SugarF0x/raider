<template lang="pug">
  v-group
    v-group(
      v-for="n in 4"
      :key="'shopItemBackground-'+n"
    )
      v-group(v-if="selected.length && selected.indexOf(entries[n-1]) !== -1")
        v-image(
          :config=`{
            x: 51,
            y: 163 + 73*n,
            width: 6,
            height: 73,
            image: tileset,
            ...shopTiles.selectedItemBG.begin
          }`
        )
        v-image(
          :config=`{
            x: 57,
            y: 163 + 73*n,
            width: 380,
            height: 73,
            image: tileset,
            ...shopTiles.selectedItemBG.mid
          }`
        )
        v-image(
          :config=`{
            x: 437,
            y: 163 + 73*n,
            width: 6,
            height: 73,
            image: tileset,
            ...shopTiles.selectedItemBG.end
          }`
        )

      v-image(
        :config=`{
          x: 55,
          y: 167 + 73*n,
          image: tileset,
          ...(selected.indexOf(entries[n-1]) !== -1 ? shopTiles.itemFrameSelected : shopTiles.itemFrame)
        }`
      )

      // items
      v-group
        v-group
          v-image(:config="getConfig(n-1)")
          util-text(:config="{ text: BUFF_TEXT[entries[n-1].item].title, x: 130, y: 172 + 73*n, align: 'left', width: 200 }")
          util-text(:config="{ text: BUFF_TEXT[entries[n-1].item].description, x: 130, y: 193 + 73*n, align: 'left', width: 200, fontSize: 14, fill: 'lightgray' }")
          util-text(:config="{ text: comparisonText(n-1), x: 130, y: 215 + 73*n, fill: 'lightgrey', fontSize: 14, width: 200, align: 'left' }")
</template>

<script lang="ts">
import Vue from 'vue'
import { shopTiles, TILESET_COORDS, BUFF_TEXT } from "~/assets/Old/consts"

export default Vue.extend({
  name: "layer-shop-levelup",
  data() {
    return {
      shopTiles: shopTiles,
      BUFF_TEXT
    }
  },
  computed: {
    tileset() { return this.$store.state.tiles },
    selected() { return this.$store.state.shop.selected },
    entries() { return this.$store.state.shop.entries },
    attributes() { return this.$store.state.run.character.attributes },
    spells() { return this.$store.state.run.character.spells },
  },
  methods: {
    getConfig(index: number) {
      return {
        x: 57,
        y: 243 + 73*index,
        image: this.tileset,
        width: 62,
        height: 62,
        crop: {
          x: TILESET_COORDS.attribute.base.x + 50*(TILESET_COORDS.attribute.order.indexOf(this.entries[index].item)),
          y: TILESET_COORDS.attribute.base.y,
          width: 50,
          height: 50
        }
      }
    },
    comparisonText(index: number) {
      let attr = this.entries[index].item
      let power = this.$store.getters['run/totalAttributes'][attr]
      return `${this.BUFF_TEXT[attr].short}: ${power} >> ${power+1}`
    },
  },
  created() {
    if (this.$store.state.shop.entries.length === 0) {
      this.$store.dispatch('shop/generateAttributes')
    }
  }
})
</script>
