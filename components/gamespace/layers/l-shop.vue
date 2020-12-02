<template>
  <v-layer v-if="active !== 'none'"><!--suppress JSUnresolvedVariable, JSUnusedLocalSymbols -->
    <v-rect v-for="(entry,key) in MD" :key="key+$options.name" :config="entry"/><!--suppress JSUnresolvedFunction -->
    <u-text :config="{ ...title[active].head }" /><!--suppress JSUnresolvedFunction -->
    <u-text :config="{ ...title[active].desc }" />
  </v-layer>
</template>

<script lang="ts">
import Vue from 'vue';

import uText from '../utils/u-text.vue'

import { shopMD } from '~/assets/Tiles'

const titleBase = {
  item: {
    head: {
      fontSize: 32,
      width: 200,
      align: 'left',
      x: 50,
      y: 200
    },
    desc: {
      fontSize: 18,
      width: 250,
      align: 'right',
      x: 190,
      y: 212
    }
  }
}

const shopTiles = {
  itemFrame: {
    width: 62,
    height: 62,
    crop: {
      x: 1,
      y: 382,
      width: 53,
      height: 53
    }
  },
  itemFrameSelectedBG: {
    width: 62,
    height: 62,
    crop: {
      x: 55,
      y: 382,
      width: 53,
      height: 53
    }
  },
  selectedItemBG: {
    width: 62,
    height: 62,
    crop: {
      x: 309,
      y: 380,
      width: 9,
      height: 55
    }
  },
  currentItemBG: {
    width: 62,
    height: 62,
    crop: {
      x: 319,
      y: 380,
      width: 9,
      height: 55
    }
  }
}

export default Vue.extend({
  name: "Shop",
  components: {
    'u-text': uText
  },
  data() {
    return {
      MD: shopMD,
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
    active() { return this.$store.state.shop.active }
  },
  methods: {
    getIconConfig() {
      return {
        x: undefined,
        y: undefined,
        image: this.$store.state.icons,
        width: 62,
        height: 62,
        crop: {
          x: undefined,
          y: undefined,
          width: 52,
          height: 52
        }
      }
    }
  }
})
</script>
