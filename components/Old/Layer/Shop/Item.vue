<template lang="pug">
  v-group
    v-group#selectedItemBG
      v-group(
        v-for="n in selected"
        :key="'shopItemBackground-'+n.id"
      )
        v-image(
          :config=`{
            x: 51,
            y: 236 + 73*(entries.indexOf(n)),
            width: 6,
            height: 73,
            image: tileset,
            ...shopTiles.selectedItemBG.begin
          }`
        )
        v-image(
          :config=`{
            x: 57,
            y: 236 + 73*(entries.indexOf(n)),
            width: 380,
            height: 73,
            image: tileset,
            ...shopTiles.selectedItemBG.mid
          }`
        )
        v-image(
          :config=`{
            x: 437,
            y: 236 + 73*(entries.indexOf(n)),
            width: 6,
            height: 73,
            image: tileset,
            ...shopTiles.selectedItemBG.end
          }`
        )

      v-image(
        :config=`{
          x: 51,
          y: 456,
          width: 6,
          height: 73,
          image: tileset,
          ...shopTiles.currentItemBG.begin
        }`
      )
      v-image(
        :config=`{
          x: 57,
          y: 456,
          width: 380,
          height: 73,
          image: tileset,
          ...shopTiles.currentItemBG.mid
        }`
      )
      v-image(
        :config=`{
          x: 437,
          y: 456,
          width: 6,
          height: 73,
          image: tileset,
          ...shopTiles.currentItemBG.end
        }`
      )

    v-group#selectedItemFrames
      v-image(
        v-for="n in 4"
        :key="'shopItemFrame-'+n+'-'+(entries.indexOf(selected[n-1]) !== -1)"
        :config=`{
          x: 55,
          y: 167 + 73*n,
          image: tileset,
          ...(selected.indexOf(entries[n-1]) !== -1 ? shopTiles.itemFrameSelected : shopTiles.itemFrame)
        }`
      )

    v-group(
      v-for="n in 3"
      :key="'shopItemIcon-'+n"
    )
      v-image(:config="entries[n-1].item.getIconConfig(57, 170 + 73*n, icons)")
      util-text(:config="{ text: entries[n-1].item.name, x: 130, y: 172 + 73*n, align: 'left', width: 200 }")
      util-text(
        v-for="(t,i) in comparisonText(entries[n-1].item,equipment[entries[n-1].item.type])"
        :key="t.text+n"
        :config="{ text: t.text, x: 130 + 50*i-1, y: 210 + 73*n, fill: t.color, width: 50, align: 'left' }"
      )

    // currently worn item
    v-group(v-if="selected.length")
      v-image(:config="equipment[selected[0].item.type].getIconConfig(57, 170 + 73*4, icons)")
      util-text(:config="{ text: equipment[selected[0].item.type].name, x: 130, y: 172 + 73*4, align: 'left', width: 200 }")
      util-text(
        v-for="(t,i) in comparisonText(equipment[selected[0].item.type],selected[0].item)"
        :key="t.text+'worn'"
        :config="{ text: t.text, x: 130 + 50*i-1, y: 210 + 73*4, fill: t.color, width: 50, align: 'left' }"
      )
</template>

<script lang="ts">
import Vue from 'vue'
import { Item } from "~/assets/Old/Tiles"
import { shopTiles } from "~/assets/Old/consts"

export default Vue.extend({
  name: "layer-shop-item",
  data() {
    return {
      shopTiles: shopTiles,
    }
  },
  computed: {
    tileset() { return this.$store.state.tiles },
    icons() { return this.$store.state.icons },
    entries() { return this.$store.state.shop.entries },
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
    if (this.$store.state.shop.entries.length === 0) {
      this.$store.dispatch('shop/generateItems')
    }
  }
})
</script>
