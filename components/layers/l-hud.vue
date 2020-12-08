<template>
  <v-layer><!--suppress JSUnresolvedVariable, JSUnusedLocalSymbols -->

    <v-image :config="hud"></v-image>

    <v-group id="score">
      <u-text :config="{text: score, x: 175, y: 20, width: 100, fontSize: 24}" />
    </v-group>

    <v-group id="health">
      <v-image :key="'health-'+fill.health"
               :config="getHudConfig('health')"
      />
      <u-text :config="{text: `${state.character.state.health}/${totalHealth}`, x: 330, y: 700, width: 100, fill: 'yellow', fontSize: 20}"/>
    </v-group>

    <v-group id="upgrade">
      <v-image :key="'upgrade-'+fill.upgrade"
               :config="getHudConfig('upgrade')"
      />
      <u-text :config="{text: `${state.collectibles.current.upgrade}/${state.collectibles.max}`, x: 125, y: 677, width: 200, fill: 'cyan'}"/>
    </v-group>

    <v-group id="experience">
      <v-image :key="'experience-'+fill.experience"
               :config="getHudConfig('experience')"
      />
      <u-text :config="{text: `${state.collectibles.current.experience}/${state.collectibles.max}`, x: 125, y: 711, width: 200, fill: 'lightgreen'}"/>
    </v-group>

    <v-group id="stats">
      <u-text :config="{text: '+'+$store.getters['run/enemyPower'], x: 130, y: 597, width: 50}"/>
      <u-text :config="{text: `${state.character.state.shields}/${totalArmor}`, x: 197, y: 597, width: 50, fill: 'lightblue'}"/>
      <u-text :config="{text: '+'+totalAttack, x: 270, y: 597, width: 50, fill: 'lightgray'}"/>
    </v-group>

    <v-group id="coins"><!--suppress JSUnresolvedVariable, JSUnusedLocalSymbols -->
      <v-image v-for="(col,i) in getHudConfig('coins')"
               :key="'coins-'+fill.coins+'-'+i"
               :config="col"
      />
      <u-text :config="{text: `${state.collectibles.current.coins}/${state.collectibles.max}`, x: 20, y: 597, width: 100, fill: 'yellow'}"/>
    </v-group>

  </v-layer>
</template>

<script lang="ts">
import Vue from 'vue'
import { THud } from "~/assets/Tiles"

import uText from '../utils/u-text.vue'
import { IKonvaHUD } from "~/components/types"

export default Vue.extend({
  name: "l-hud",
  components: {
    'u-text': uText
  },
  computed: {
    hud() {
      return {
        x: 11,
        y: 596,
        image: this.$store.state.tiles,
        width: 428,
        height: 143,
        crop: {
          x: 1,
          y: 436,
          width: 318,
          height: 75
        }
      }
    },
    fill() { return this.$store.getters['run/fill'] },
    state() { return this.$store.state.run },
    totalHealth() { return this.$store.getters['run/totalHealth'] },
    totalArmor() { return this.$store.getters['run/totalArmor'] },
    totalAttack() { return this.$store.getters['run/totalAttack'] },
    tileset() { return this.$store.state.tiles },
    score() { return this.$store.state.run.game.score }
  },
  methods: {
    /**
     * Format tile to Konva Image config object based on tile type and fill percentage
     * Coin type will return an array of coin column configs since their render is exceptional
     */
    getHudConfig(type: THud): IKonvaHUD | IKonvaHUD[] {
      if (type === 'coins') {
        let fill = this.fill.coins;
        if (fill < 0) fill = 0;
        let cropped = [] as IKonvaHUD[];
        let columns = Math.floor(this.state.collectibles.current.coins / (this.state.collectibles.max / 5));
        if (this.state.collectibles.current.coins % (this.state.collectibles.max / 5) > 0) columns++;
        for (let i = 0; i < columns; i++) {
          let toPush = {
            x: 16 + (21.5 * i),
            y: 617,
            image: this.tileset,
            width: 21,
            height: 117,
            crop: {
              x: 397 + 16 * i,
              y: 428,
              width: 15.5,
              height: 61
            },
            type: 'coins'
          } as IKonvaHUD
          if (i === columns - 1 && this.state.collectibles.current.coins % (this.state.collectibles.max / 5) > 0) {
            let currentColFill = (this.state.collectibles.current.coins - Math.floor(this.state.collectibles.current.coins / (this.state.collectibles.max / 5)) * (this.state.collectibles.max / 5)) / (this.state.collectibles.max / 5);
            toPush.y           = toPush.y + (toPush.height * (1 - currentColFill));
            toPush.height      = toPush.height * currentColFill;
            toPush.crop.y      = toPush.crop.y + (20 - 20 * currentColFill) * 3;
            toPush.crop.height = toPush.crop.height - (20 - 20 * currentColFill) * 3;
          }
          cropped.push(toPush)
        }
        return cropped;
      } else {
        const coords = {
          'upgrade': {
            canvas: { x: 158, y: 674.5, width: 134 - (134 * (1 - this.fill.upgrade)), height: 18.5 },
            crop: { x: 397, y: 490, width: 100 - (100 * (1 - this.fill.upgrade)), height: 10 }
          },
          'experience': {
            canvas: { x: 158, y: 708.5, width: 134 - (134 * (1 - this.fill.experience)), height: 18.5 },
            crop: { x: 397, y: 501, width: 100 - (100 * (1 - this.fill.experience)), height: 10 }
          },
          'health': {
            canvas: { x: 331.5, y: 599 + (123 * (1 - this.fill.health)), width: 95, height: 123 * this.fill.health },
            crop: { x: 325, y: 447 + (64 * (1 - this.fill.health)), width: 71, height: 64 * this.fill.health }
          },
        } as any;
        return {
          x: coords[type].canvas.x,
          y: coords[type].canvas.y,
          image: this.tileset,
          width: coords[type].canvas.width,
          height: coords[type].canvas.height,
          crop: coords[type].crop,
          type: type
        }
      }
    },
  }
})
</script>

<style scoped>

</style>
