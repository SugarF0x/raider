<template>
  <v-layer :config="{ opacity: $store.state.TEMP_GAMEOVER ? .5 : 1 }" ><!--suppress JSUnusedLocalSymbols, JSUnresolvedVariable -->

    <v-group v-for="entry in dungeon"
             :key="entry.id"
    ><!--suppress JSUnusedLocalSymbols, JSUnresolvedVariable -->
      <v-image :config="getTileConfig(entry)"
               @mousedown="printArrow(entry.key)"
               @mouseenter="dragArrow(entry.key)"
               @touchstart="printArrow(entry.key)"
               @touchmove="dragArrow(entry.key)"
               :key="(selectedFamily === 'sword' || selectedFamily === 'none' || !selectedFamily) + entry.id"
      /><!--suppress JSUnusedLocalSymbols, JSUnresolvedVariable -->
      <v-group v-if="entry.family === 'skull'" :config="{ opacity: selectedFamily === 'sword' || selectedFamily === 'none' ? 1 : .5 }"><!--suppress JSUnusedLocalSymbols, JSUnresolvedVariable -->
        <u-text :config="{text: entry.state.attack, x: getTileCoords(entry.key, 'x')+7, y: getTileCoords(entry.key, 'y')-25, width: 25, fill: 'lightgray', fontSize: 14, align: 'right'}"/><!--suppress JSUnusedLocalSymbols, JSUnresolvedVariable -->
        <u-text :config="{text: entry.state.armor, x: getTileCoords(entry.key, 'x')+7, y: getTileCoords(entry.key, 'y')-5, width: 25, fill: 'lightblue', fontSize: 14, align: 'right'}"/><!--suppress JSUnusedLocalSymbols, JSUnresolvedVariable -->
        <u-text :config="{text: entry.state.health, x: getTileCoords(entry.key, 'x')+7, y: getTileCoords(entry.key, 'y')+15, width: 25, fill: 'red', fontSize: 14, align: 'right'}"/>
      </v-group>
      <v-group id="effects"><!--suppress JSUnusedLocalSymbols, JSUnresolvedVariable -->
        <v-image v-for="effect in getEffectsConfig(entry)"
                 :config="effect"
                 :key="entry.effects.length + entry.id + effect.type"
        />
      </v-group>
    </v-group>

    <v-group ref="arrow" :config="$store.state.arrow.keys.length ? {opacity: .8} : {opacity: 0}">
      <v-arrow :key="arrowKey+'outline'" :config="arrowOutline"></v-arrow>
      <v-arrow :key="arrowKey" :config="arrow"></v-arrow>
    </v-group>

    <v-group id="tooltips">
      <u-text v-if="selectedFamily === 'sword'" :config="{text: currentDamage + ' damage', x: getTileCoords(lastKey, 'x')-50, y: getTileCoords(lastKey, 'y')-50, width: 100, fontSize: 20, fill: 'red'}"/>
    </v-group>

  </v-layer>
</template>

<script lang="ts">
// TODO: contain currentDamage tooltip on screen

import Vue from 'vue'
import uText from '../utils/u-text.vue'
import * as C from "~/assets/consts"
import { Skull, TFamily, Tile } from "~/assets/Tiles"
import { IKonvaTile } from "~/components/gamespace/types"

export default Vue.extend({
  name: "l-dungeon",
  components: {
    'u-text': uText
  },
  computed: {
    tileset() { return this.$store.state.tiles },
    selectedFamily(): TFamily | 'none' { return this.$store.getters['selectedFamily'] },
    dungeon(): Array<Tile | Skull> { return this.$store.state.dungeon.tiles },
    isMouseDown(): boolean { return this.$store.state.isMouseDown },
    state() { return this.$store.state.run },
    lastKey(): string { return this.$store.getters['arrow/lastKey'] },
    currentDamage(): number { return this.$store.getters['currentDamage'] },
    arrow() {
      return {
        ...this.$store.state.arrow,
        tension: .1,
        stroke: "green",
        strokeWidth: 10,
        lineCap: 'round',
        listening: false,
      }
    },
    /**
     * Arrow line rerender key
     * Also updates arrow cache on change
     * to ensure proper opacity render
     */
    arrowKey(): string {
      let arrow = this.$refs.arrow as any;
      if (arrow) {
        if (this.$store.state.arrow.keys.length)
          arrow.getNode().cache({ offset: 5 });
        else
          arrow.getNode().clearCache();
      }

      return this.$store.getters['arrow/lastKey'];
    },
    /**
     * Arrow outline modification
     */
    arrowOutline(): Object {
      return Object.assign({}, this.arrow, {
        strokeWidth: this.arrow.strokeWidth * 2,
        stroke: "black"
      });
    }
  },
  methods: {
    /**
     * Get just tile coords
     * Can specify which axis to get
     */
    getTileCoords(tile: string, toGet: string = 'xy'): { x: number, y: number } | number {
      switch (toGet) {
        case 'x':
          return C.DUNGEON_TILE_COORDS.x[parseInt(tile[1])]
        case 'y':
          return C.DUNGEON_TILE_COORDS.y[parseInt(tile[3])]
        default:
          return {
            x: C.DUNGEON_TILE_COORDS.x[parseInt(tile[1])],
            y: C.DUNGEON_TILE_COORDS.y[parseInt(tile[3])],
          }
      }
    },

    /**
     * Format tile to Konva Image config object based on tile type and name
     */
    getTileConfig(tile: Tile): IKonvaTile {
      let x: number = 1;
      let y: number = 928;

      let tilesetPos = C.TILESET_COORDS[tile.family][tile.type];

      if (!isNaN(tilesetPos)) {
        // generic type
        x = (52) * (tile.id % 8) + 1 + (tile.id % 8)
        y = tilesetPos;
      } else if(tilesetPos.hasOwnProperty('x')) {
        x = tilesetPos.x;
        y = tilesetPos.y;
      } else if(tilesetPos.hasOwnProperty('base')) {
        // boss
        x = (52) * (tilesetPos.order.indexOf(tile.type) % 8) + 1 + (tilesetPos.indexOf(tile.type) % 8)
        y = tilesetPos.base + (52) * Math.floor(tilesetPos.indexOf(tile.type)/8)
      }

      let result = {
        x: this.getTileCoords(tile.key, 'x') as number,
        y: this.getTileCoords(tile.key, 'y') as number,
        image: this.tileset,
        width: 62,
        height: 62,
        crop: {
          x: x,
          y: y,
          width: 52,
          height: 52
        },
        offset: {
          x: 31,
          y: 31
        },
        family: tile.family,
        type: tile.type,
        opacity: 1
      }

      if (this.selectedFamily !== 'none') {
        if (result.family === 'skull' || result.family === 'sword') {
          if (!(this.selectedFamily === 'skull' || this.selectedFamily === 'sword')) {
            result.opacity = .5;
          }
        } else {
          if (this.selectedFamily !== result.family) {
            result.opacity = .5;
          }
        }
      }

      return result;
    },

    /**
     * Get array of tile effects if any as IKonvaTile objects for rendering
     */
    getEffectsConfig(tile: Tile): IKonvaTile[] {
      let effects = [] as IKonvaTile[];

      tile.effects.forEach(entry => {
        effects.push({
          x: this.getTileCoords(tile.key, 'x') as number,
          y: this.getTileCoords(tile.key, 'y') as number,
          image: this.tileset,
          width: 62,
          height: 62,
          crop: {
            x: C.TILESET_COORDS.effect[entry].x,
            y: C.TILESET_COORDS.effect[entry].y,
            width: 52,
            height: 52
          },
          offset: {
            x: 31,
            y: 31
          },
          family: tile.family,
          type: tile.type,
          opacity: 1,
          listening: false
        })
      })

      return effects
    },

    /**
     * Check if target tile is a neighbor of base
     */
    isNear(base: string, target: string): boolean {
      let x1 = parseInt(base[1]),
          y1 = parseInt(base[3]),
          x2 = parseInt(target[1]),
          y2 = parseInt(target[3]);
      return x2 >= x1 - 1
          && x2 <= x1 + 1
          && y2 >= y1 - 1
          && y2 <= y1 + 1;
    },

    /**
     * Check if target tile is of same tile type
     * Or if it is matching skills with swords
     */
    isSameFamily(base: string, target: string): boolean {
      const baseFamily = this.dungeon.find(entry => entry.key === base)?.family
      const targetFamily = this.dungeon.find(entry => entry.key === target)?.family

      if (!baseFamily || !targetFamily) {
        console.error(new Error('Family match check failed: base or target family is not found'))
        return false
      } else {
        return baseFamily === targetFamily
            || C.TILESET_COORDS[baseFamily].hasOwnProperty(targetFamily)
      }
    },

    /**
     * Collect selected tiles and repopulate dungeon
     * Collected tiles are replaced by the ones over them
     * New tiles are generated over the column
     *
     * Honestly, I have little to no idea of how this works
     * I spend a couple of days beating my head against the wall
     * and here's the result - take it or leave it
     *
     * This is in a bad need of refactoring
     * but at the time of writing i am clueless
     * as of how to do that properly
     */
    collect(): boolean {
      if (this.arrow.keys.length >= 3) {

        // handling collection event
        this.$store.dispatch('run/handleCollection')

        this.$store.dispatch('dungeon/repopulate')

        // enemy turn before next turn
        this.enemyTurn();

        // progress turn
        this.$store.commit('run/NEXT_TURN')

        // TEMPORARY POWER CREEP
        this.$store.commit('run/ENEMY_POWER_CHECK')

        return true
      } else {
        if (this.arrow.keys.length > 0 && this.selectedFamily === 'sword') {
          this.$store.dispatch('dungeon/calculateVulnerability', 0)
        }
        return false
      }
    },

    /**
     * Actions that happen during enemy attack phase
     * That includes taking damage to armor and health
     * Special boss actions will most likely end up here as well
     */
    enemyTurn(): boolean {
      let skulls = this.dungeon.filter(entry => entry.family === 'skull') as Skull[]
      if (skulls.length > 0) {

        /*
         1. collect total damage
         2. calculate damage to be absorbed by shields
         3. calculate shields damage
         4. apply overkill damage to health
         5. set skulls' freshness to false
         */

        // 1
        let totalDamage = 0;
        skulls.forEach(entry => {
          if (!entry.isFresh) totalDamage += entry.state.attack
        })

        // 2
        let overkill = totalDamage - this.state.character.state.shields;
        if (overkill < 0) overkill = 0;

        // 3
        let defenseResult = parseInt(this.state.character.state.shields) // to unbind
        for (let i = 0; i < totalDamage - overkill; i++) {
          // 30% chance for armor not to break
          if (Math.random() > .3) defenseResult--;
        }
        this.$store.commit('run/MODIFY_CHARACTER', { target: 'shields', value: defenseResult })

        // 4
        if (overkill > 0) this.$store.commit('run/MODIFY_CHARACTER', { target: 'health', value: this.state.character.state.health-overkill })
        if (this.state.character.state.health <= 0) {
          this.$store.commit('run/MODIFY_CHARACTER', { target: 'health', value: 0 })
          this.$store.commit('TEMP_GAMEOVER_TRIGGER')
        } // placeholder game over screen

        // 5
        this.$store.commit('dungeon/SET_READY', skulls)

        return true
      } else return false
    },

    /**
     * Check if a new point can be added and do add if so
     */
    printArrow(n: string): boolean {
      let { x, y } = this.getTileCoords(n) as { x: number, y: number };
      if (!this.$store.state.TEMP_GAMEOVER) {
        let sample  = '' + x + y;
        let base    = [] as string[];
        let returns = true;
        for (let i = 0; i < this.arrow.points.length / 2; i++) {
          base.push('' + this.arrow.points[i * 2] + this.arrow.points[i * 2 + 1]);
        }
        if (base[base.length - 2] === sample) {
          if (this.dungeon.find(entry => entry.key === this.lastKey)?.family === 'skull') {
            this.$store.commit('dungeon/SET_VULNERABILITY', { key: this.lastKey, damage: 0 })
          }
          this.$store.commit('arrow/REMOVE_KEY')
          if (this.selectedFamily === 'sword') {
            this.$store.dispatch('dungeon/calculateVulnerability')
          }
          return true
        } else {
          base.forEach(e => {
            if (e === sample
                || !this.isNear(this.arrow.keys[this.arrow.keys.length-1], n)
                || !this.isSameFamily(this.arrow.keys[this.arrow.keys.length-1], n)
            ) returns = false;
          });
          if (returns) {
            this.$store.commit('arrow/ADD_KEY', { x, y, key: n})
            if (this.selectedFamily === 'sword') {
              this.$store.dispatch('dungeon/calculateVulnerability')
            }
          }
          return returns;
        }
      }
      return false;
    },

    /**
     * Execute printArrow if mouse is held or screen is touched
     */
    dragArrow(n: string): boolean {
      if (this.isMouseDown) {
        this.printArrow(n);
        return true
      } else return false
    },

    /**
     * Reset arrow state on mouse release
     * Collect tiles if possible
     */
    dropDrag(): void {
      this.$store.commit('MOUSE_UP')
      this.collect();
      if (this.$store.state.arrow.keys.length) {
        this.$store.commit('arrow/CLEAR_KEYS')
      }
    },

    /**
     * Begin drag event
     */
    startDrag(): void {
      this.$store.commit('MOUSE_DOWN')
    },

    /**
     * Enable user input
     */
    bindEvents(): void {
      document.addEventListener('mousedown', this.startDrag);
      document.addEventListener('mouseup', this.dropDrag);
      document.addEventListener("touchstart", this.startDrag);
      document.addEventListener("touchend", this.dropDrag);
    },

    /**
     * Disable user input
     */
    unbindEvents(): void {
      document.removeEventListener('mousedown', this.startDrag);
      document.removeEventListener('mouseup', this.dropDrag);
      document.removeEventListener('touchstart', this.startDrag);
      document.removeEventListener('touchend', this.dropDrag);
    }
  },
  mounted() {
    if (this.dungeon.length === 0) this.$store.dispatch('dungeon/populate')

    /**
     * User input events
     */
    this.bindEvents();
  },
  beforeDestroy() {
    this.unbindEvents();
  }
})
</script>

<style scoped>

</style>