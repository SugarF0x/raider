<template>
  <v-row justify="center" align="center" ref="row">
    <v-stage :config="konva" id="konva" :key="konva.resizeKey">
      <v-layer id="background">
        <v-rect :config="{height: 800, width: 450, fill: '#1D214E'}"/>
      </v-layer>
      <v-layer id="hud"><!--suppress JSUnresolvedVariable, JSUnusedLocalSymbols -->
        <v-rect v-for="(entry,key) in background" :key="key" :config="entry"/>
        <v-image :config="hud"></v-image>
        <v-group id="health">
          <v-image :key="'health-'+fill.health"
                   :config="getHudConfig('health')"
          />
          <v-text :config="getTextConfig({text: `${state.health.current}/${state.health.max}`, x: 330, y: 700, width: 100, fill: 'yellow', fontSize: 20})"/>
        </v-group>
        <v-group id="upgrade">
          <v-image :key="'upgrade-'+fill.upgrade"
                   :config="getHudConfig('upgrade')"
          />
          <v-text :config="getTextConfig({text: `${state.upgrade.current}/${state.upgrade.max}`, x: 125, y: 677, width: 200, fill: 'cyan'})"/>
        </v-group>
        <v-group id="experience">
          <v-image :key="'experience-'+fill.experience"
                   :config="getHudConfig('experience')"
          />
          <v-text :config="getTextConfig({text: `${state.experience.current}/${state.experience.max}`, x: 125, y: 711, width: 200, fill: 'lightgreen'})"/>
        </v-group>
        <v-group id="stats">
          <v-text :config="getTextConfig({text: state.enemy, x: 130, y: 597, width: 50})"/>
          <v-text :config="getTextConfig({text: `${state.defense.current}/${state.defense.max}`, x: 197, y: 597, width: 50, fill: 'lightblue'})"/>
          <v-text :config="getTextConfig({text: state.attack, x: 270, y: 597, width: 50, fill: 'lightgray'})"/>
        </v-group>
        <v-group id="coins"><!--suppress JSUnresolvedVariable, JSUnusedLocalSymbols -->
          <v-image v-for="(col,i) in getHudConfig('coins')"
                   :key="'coins-'+fill.coins+'-'+i"
                   :config="col"
          />
          <v-text :config="getTextConfig({text: `${state.coins.current}/${state.coins.max}`, x: 20, y: 597, width: 100, fill: 'yellow'})"/>
        </v-group>
      </v-layer>
      <v-layer id="dungeon"
               :config="{ opacity: $store.state.TEMP_GAMEOVER ? .5 : 1 }"
      ><!--suppress JSUnusedLocalSymbols, JSUnresolvedVariable -->
        <v-group v-for="(entry,key) in dungeon"
                 :key="entry.id"
        ><!--suppress JSUnusedLocalSymbols, JSUnresolvedVariable -->
          <v-image :config="getTileConfig(entry, key)"
                   @mousedown="printArrow(key)"
                   @mouseenter="dragArrow(key)"
                   @touchstart="printArrow(key)"
                   @touchmove="dragArrow(key)"
                   :key="(selectedFamily === 'sword' || selectedFamily === 'none') + entry.id"
          /><!--suppress JSUnusedLocalSymbols, JSUnresolvedVariable -->
          <v-group v-if="entry.family === 'skull'" :config="{ opacity: selectedFamily === 'sword' || selectedFamily === 'none' ? 1 : .5 }"><!--suppress JSUnusedLocalSymbols, JSUnresolvedVariable -->
            <v-text :config="getTextConfig({text: entry.state.attack, x: getTileCoords(key, 'x')+7, y: getTileCoords(key, 'y')-25, width: 25, fill: 'lightgray', fontSize: 14, align: 'right'})"/><!--suppress JSUnusedLocalSymbols, JSUnresolvedVariable -->
            <v-text :config="getTextConfig({text: entry.state.armor, x: getTileCoords(key, 'x')+7, y: getTileCoords(key, 'y')-5, width: 25, fill: 'lightblue', fontSize: 14, align: 'right'})"/><!--suppress JSUnusedLocalSymbols, JSUnresolvedVariable -->
            <v-text :config="getTextConfig({text: entry.state.health, x: getTileCoords(key, 'x')+7, y: getTileCoords(key, 'y')+15, width: 25, fill: 'red', fontSize: 14, align: 'right'})"/>
          </v-group>
          <v-group id="effects"><!--suppress JSUnusedLocalSymbols, JSUnresolvedVariable -->
            <v-image v-for="effect in getEffectsConfig(entry, key)"
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
          <v-text v-if="selectedFamily === 'sword'" :config="getTextConfig({text: currentDamage + ' damage', x: getTileCoords(lastKey, 'x')-50, y: getTileCoords(lastKey, 'y')-50, width: 100, fontSize: 20, fill: 'red'})"/>
        </v-group>
      </v-layer>
      <v-layer id="TEMP_OVERLAY">
        <v-text :key="state.score" :config="getTextConfig({text: state.score, x: 175, y: 20, width: 100, fontSize: 24})"></v-text>
        <v-group v-if="$store.state.TEMP_GAMEOVER"
                 :config="{listening: true}"
                 @mousedown="$emit('rerender')"
                 @touchstart="$emit('rerender')"
        >
          <v-rect :config="{height: 800, width: 450, fill: 'black', opacity: .5}"/>
          <v-text :config="getTextConfig({text: 'GAME OVER', x: 0, y: 60, width: 450, fill: 'red', fontSize: 48, listen: true})"></v-text>
          <v-text :config="getTextConfig({text: 'Click here to restart', x: 0, y: 105, width: 450, fontSize: 36, listen: true})"></v-text>
        </v-group>
      </v-layer>
    </v-stage>
  </v-row>
</template>

<script lang="ts">
// TODO: contain currentDamage tooltip on screen

import Vue from 'vue';

import {
  IKonvaTile, IKonvaHUD,
  ITextConfigOptions, ITextNonOptionals, IDungeon
} from "~/components/gamespace/types"

import { TFamily, THud, Tile, Skull, dungeonMD } from "~/assets/Tiles";

/**
 * Coords of every tile
 */
const c = {
  x: [46, 118, 190, 262, 334, 406],
  y: [186, 258, 330, 402, 474, 546],
};

/**
 * Define generic types and subtypes that can be inter-connected
 *
 * numbers are generics
 *   that means that the number itself is a Y coordinate
 *   X coordinate is calculated based on the following formula
 *     x = (52) * [0-7 random order] + 1 + [0-7 random order]
 *
 * objects contain both X and Y coordinate
 *
 * skulls' Boss is an exception
 *   base defines base Y coordinate that can change on itself
 *   these two formulas define both X and Y
 *     x = (52) * (order.indexOf(BOSS_NAME) % 8) + 1 + (order.indexOf(BOSS_NAME) % 8)
 *     y = base + (52) * Math.floor(order.indexOf(BOSS_NAME)/8)
 */
const tilesetPositions = {
  coin: {
    common: 107
  },
  potion: {
    common: 1,
    mana: 512,
    poison: 565,
    explosive: 618
  },
  shield: {
    common: 160,
    broken: { x: 425, y: 724 }
  },
  sword: {
    common: 213,
    broken: { x: 425, y: 777 },
    skull: null
  },
  skull: {
    common: 54,
    boss: {
      base: 671,
      order: [
        'tough', 'spiked', 'golden', 'healing', 'invisible', 'undefined-1', 'flaming', 'undefined-2',
        'venomous', 'boomer', 'leader', 'corrupt', 'alchemist', 'jumper', 'mage', 'assassin',
        'mimic', 'thief', 'unstable', 'vampire', 'ravaging', 'trampling', 'undefined-3', 'explosive',
        'undefined-4', 'brute', 'armored', 'devourer', 'poisonous', 'beefy', 'fleeing', 'lich'
      ]
    },
    sword: null
  },
  effect: {
    vulnerable: { x: 160, y: 330 },
    frozen: { x: 328, y: 394 },
    burning: { x: 414, y: 572 }
  }
} as { [key in TFamily]: any }

// noinspection JSUnusedGlobalSymbols
export default Vue.extend({
  name: "gamespace",

  data() {
    return {
      /**
       * Konva configuration
       */
      konva: {
        width: 450,
        height: 800,
        scaleX: 1,
        scaleY: 1,
        resizeKey: 0
      },

      /**
       * Dungeon markdown of where elements are to be
       */
      background: dungeonMD,
    };
  },

  computed: {
      // vuex
    
    isMouseDown(): boolean { return this.$store.state.isMouseDown },

    tileset() { return this.$store.state.tiles },
    state() { return this.$store.state.run },

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
    dungeon(): IDungeon { return this.$store.state.dungeon.tiles },

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
    lastKey(): string { return this.$store.getters['arrow/lastKey'] },
    selectedFamily(): TFamily | 'none' { return this.$store.getters['selectedFamily'] },
    currentDamage(): number { return this.$store.getters['currentDamage'] },
    fill() { return this.$store.getters['run/fill'] },

      // local

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
      const TBase   = this.dungeon[base].family;
      const TTarget = this.dungeon[target].family;
      return TBase === TTarget
          || tilesetPositions[TBase].hasOwnProperty(TTarget)
    },

    /**
     * Get just tile coords
     * Can specify which axis to get
     */
    getTileCoords(tile: string, toGet: string = 'xy'): { x: number, y: number } | number {
      switch (toGet) {
        case 'x':
          return c.x[parseInt(tile[1])]
        case 'y':
          return c.y[parseInt(tile[3])]
        default:
          return {
            x: c.x[parseInt(tile[1])],
            y: c.y[parseInt(tile[3])],
          }
      }
    },

    /**
     * Format tile to Konva Image config object based on tile type and name
     */
    getTileConfig(tile: Tile, pos: string): IKonvaTile {
      let x: number = 1;
      let y: number = 928;

      let tilesetPos = tilesetPositions[tile.family][tile.type];

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
        x: this.getTileCoords(pos, 'x') as number,
        y: this.getTileCoords(pos, 'y') as number,
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
    getEffectsConfig(tile: Tile, pos: string): IKonvaTile[] {
      let effects = [] as IKonvaTile[];

      tile.effects.forEach(entry => {
        effects.push({
          x: this.getTileCoords(pos, 'x') as number,
          y: this.getTileCoords(pos, 'y') as number,
          image: this.tileset,
          width: 62,
          height: 62,
          crop: {
            x: tilesetPositions.effect[entry].x,
            y: tilesetPositions.effect[entry].y,
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
     * Format tile to Konva Image config object based on tile type and fill percentage
     * Coin type will return an array of coin column configs since their render is exceptional
     */
    getHudConfig(type: THud): IKonvaHUD | IKonvaHUD[] {
      if (type === 'coins') {
        let fill = this.fill.coins;
        if (fill < 0) fill = 0;
        let cropped = [] as IKonvaHUD[];
        let columns = Math.floor(this.state.coins.current / (this.state.coins.max / 5));
        if (this.state.coins.current % (this.state.coins.max / 5) > 0) columns++;
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
          if (i === columns - 1 && this.state.coins.current % (this.state.coins.max / 5) > 0) {
            let currentColFill = (this.state.coins.current - Math.floor(this.state.coins.current / (this.state.coins.max / 5)) * (this.state.coins.max / 5)) / (this.state.coins.max / 5);
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
        let returns = {
          x: coords[type].canvas.x,
          y: coords[type].canvas.y,
          image: this.tileset,
          width: coords[type].canvas.width,
          height: coords[type].canvas.height,
          crop: coords[type].crop,
          type: type
          }
        return returns
      }
    },

    /**
     * Format text to Konva Text config object based on a lot of things...
     */
    getTextConfig(opt: ITextConfigOptions): Object {
      const defaults: ITextNonOptionals = {
        width: 100,
        fill: 'white',
        fontSize: 16,
        align: 'center',
        listen: false
      };

      /*
          First assign defaults
          Then override defaults with passed values if any
          Then assign immutable values as transform text to string
       */
      return Object.assign(defaults, opt,
        {
          text: opt.text.toString(),
          wrap: 'none',
          fontFamily: 'Comic Sans MS'
        },
      );
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
        this.$store.dispatch('dungeon/calculateVulnerability', 0)
        return false
      }
    },

    /**
     * Actions that happen during enemy attack phase
     * That includes taking damage to armor and health
     * Special boss actions will most likely end up here as well
     */
    enemyTurn(): boolean {
      let skulls = [] as [string, Skull][];
      Object.entries(this.dungeon).forEach(entry => {
        if (entry[1].family === 'skull') skulls.push(entry as [string, Skull])
      })
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
          if (!entry[1].isFresh) totalDamage += entry[1].state.attack
        })

        // 2
        let overkill = totalDamage - this.state.defense.current;
        if (overkill < 0) overkill = 0;

        // 3
        let defenseResult = parseInt(this.$store.state.run.defense.current) // to unbind
        for (let i = 0; i < totalDamage - overkill; i++) {
          // 30% chance for armor not to break
          if (Math.random() > .3) defenseResult--;
        }
        this.$store.commit('run/MODIFY_STATE', { target: 'defense', value: defenseResult })

        // 4
        if (overkill > 0) this.$store.commit('run/MODIFY_STATE', { target: 'health', value: this.state.health.current-overkill })
        if (this.state.health.current <= 0) {
          this.$store.commit('run/MODIFY_STATE', { target: 'health', value: 0 })
          this.$store.commit('TEMP_GAMEOVER_TRIGGER')
        } // placeholder game over screen

        // 5
        let toReady = [] as string[]
        skulls.forEach(entry => {
          toReady.push(entry[0])
        })
        this.$store.commit('dungeon/SET_READY', toReady)

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
          if (this.dungeon[this.lastKey].family === 'skull') {
            this.$store.commit('dungeon/SET_VULNERABILITY', { key: this.lastKey, damage: 0 })
          }
          this.$store.commit('arrow/REMOVE_KEY')
          this.$store.dispatch('dungeon/calculateVulnerability')
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
            this.$store.dispatch('dungeon/calculateVulnerability')
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
     * Set new sizes based on current screen
     */
    resize(): boolean {
      let konva   = document.getElementById("konva");
      let konvajs = document.querySelector('.konvajs-content');
      let canvas  = document.querySelectorAll('canvas');

      let style, height, width;

      if (konva) style = window.getComputedStyle(konva, null);
      if (style) {
        let sHeight = style.getPropertyValue("height");
        let sWidth  = style.getPropertyValue("width");
        height      = parseInt(sHeight.slice(0, sHeight.length - 2));
        width       = parseInt(sWidth.slice(0, sWidth.length - 2));
      }

      if (konvajs && canvas.length && height && width) {
        let x = 450;
        let y = 800;

        if (width / x > height / y) {
          this.konva.scaleY = height / y;
          this.konva.scaleX = height / y;

          y = height;
          x = height * 0.5625;
        } else {
          this.konva.scaleY = width / x;
          this.konva.scaleX = width / x;

          x = width;
          y = width / 9 * 16;
        }

        this.konva.width  = x;
        this.konva.height = y;

        let style = `width: ${ x }px; height: ${ y }px`;
        konvajs.setAttribute('style', style);
        canvas.forEach(e => {
          e.setAttribute('style', style);
          e.setAttribute('width', `${ x }px`);
          e.setAttribute('height', `${ y }px`);
        });

        this.konva.resizeKey++;
        return true
      }

      return false
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
      document.removeEventListener('resize', this.resize);
    }
  },

  mounted() {
    this.$store.dispatch('dungeon/populate')

    /**
     * The initial resize as well as an event to handle any future resizes
     */
    this.resize();
    window.addEventListener('resize', this.resize);

    /**
     * User input events
     */
    this.bindEvents();
  },

  beforeDestroy() {
    this.unbindEvents();
  }
});
</script>

<style lang="less" scoped>
.row {
  height: 100%;
}
</style>
<style lang="less">
#konva {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .konvajs-content {
    position: relative;
    user-select: none;
  }

  canvas {
    padding: 0;
    margin: 0;
    border: 0;
    background-color: transparent;
    position: absolute;
    top: 0;
    left: 0;
    display: block;
  }
}
</style>
