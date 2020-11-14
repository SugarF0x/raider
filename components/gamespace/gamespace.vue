<template>
  <v-row justify="center" align="center">
    <v-stage :config="konva" id="konva">
      <v-layer id="background">
        <v-rect :config="{height: 800, width: 450, fill: '#1D214E'}"/>
      </v-layer>
      <v-layer id="hud"><!--suppress JSUnresolvedVariable, JSUnusedLocalSymbols -->
        <v-rect v-for="(entry,key) in background" :key="key" :config="entry"/>
        <v-image :key="isTilesetLoaded+'hud'" :config="hud"></v-image>
        <v-group id="health">
          <v-image :key="isTilesetLoaded+`-health(${fill.health})`"
                   :config="getHudConfig('health')"
          />
          <v-text :config="getTextConfig(`${state.health.current}/${state.health.max}`, 330, 700, 100, 'yellow', 20)"/>
        </v-group>
        <v-group id="upgrade">
          <v-image :key="isTilesetLoaded+`-upgrade(${fill.upgrade})`"
                   :config="getHudConfig('upgrade')"
          />
          <v-text :config="getTextConfig(`${state.upgrade.current}/${state.upgrade.max}`, 125, 677, 200, 'cyan', 16)"/>
        </v-group>
        <v-group id="experience">
          <v-image :key="isTilesetLoaded+`-experience(${fill.experience})`"
                   :config="getHudConfig('experience')"
          />
          <v-text
              :config="getTextConfig(`${state.experience.current}/${state.experience.max}`, 125, 711, 200, 'lightgreen', 16)"/>
        </v-group>
        <v-group id="stats">
          <v-text :config="getTextConfig(state.enemy.power, 130, 597, 50, 'white', 16)"/>
          <v-text
              :config="getTextConfig(`${state.defense.current}/${state.defense.max}`, 197, 597, 50, 'lightblue', 16)"/>
          <v-text :config="getTextConfig(state.attack, 270, 597, 50, 'lightgray', 16)"/>
        </v-group>
        <v-group id="coins"><!--suppress JSUnresolvedVariable, JSUnusedLocalSymbols -->
          <v-image v-for="(col,i) in getHudConfig('coins')"
                   :key="isTilesetLoaded+`-coins(${fill.coins}-${i})`"
                   :config="col"
          />
          <v-text :config="getTextConfig(`${state.coins.current}/${state.coins.max}`, 20, 597, 100, 'yellow', 16)"/>
        </v-group>
      </v-layer>
      <v-layer id="dungeon" :config="{ opacity: state.TEMP_GAMEOVER ? .5 : 1 }"><!--suppress JSUnusedLocalSymbols, JSUnresolvedVariable -->
        <v-group v-for="(entry,key) in dungeon"
                 :key="entry.id"
        ><!--suppress JSUnusedLocalSymbols, JSUnresolvedVariable -->
          <v-image :config="getTileConfig(entry, key)"
                   @mousedown="printArrow(key)"
                   @mouseenter="dragArrow(key)"
                   @touchstart="printArrow(key)"
                   @touchmove="dragArrow(key)"
          /><!--suppress JSUnusedLocalSymbols, JSUnresolvedVariable -->
          <v-group v-if="entry.type === 'skull'"><!--suppress JSUnusedLocalSymbols, JSUnresolvedVariable -->
            <v-text :config="getTextConfig(entry.state.attack, getTileCoords(key, 'x')+7, getTileCoords(key, 'y')-25, 25, 'lightgray', 14, 'right')"/><!--suppress JSUnusedLocalSymbols, JSUnresolvedVariable -->
            <v-text :config="getTextConfig(entry.state.armor, getTileCoords(key, 'x')+7, getTileCoords(key, 'y')-5, 25, 'lightblue', 14, 'right')"/><!--suppress JSUnusedLocalSymbols, JSUnresolvedVariable -->
            <v-text :config="getTextConfig(entry.state.health, getTileCoords(key, 'x')+7, getTileCoords(key, 'y')+15, 25, 'red', 14, 'right')"/>
          </v-group>
        </v-group>
      </v-layer>
      <v-layer id="arrow">
        <v-group ref="arrow" :config="arrow.keys.length ? {opacity: .8} : {opacity: 0}">
          <v-arrow :key="arrowKey+'outline'" :config="arrowOutline"></v-arrow>
          <v-arrow :key="arrowKey" :config="arrow"></v-arrow>
        </v-group>
      </v-layer>
      <v-layer id="TEMP_OVERLAY">
        <v-text :key="state.score" :config="getTextConfig(state.score, 175, 20, 100, 'white', 24)"></v-text>
        <v-group v-if="state.TEMP_GAMEOVER"
                 @mousedown="$emit('rerender')"
                 @touchstart="$emit('rerender')"
        >
          <v-text :config="getTextConfig('GAME OVER', 0, 60, 450, 'red', '48')"></v-text>
          <v-text :config="getTextConfig('Click here to restart', 0, 105, 450, 'white', 36)"></v-text>
        </v-group>
      </v-layer>
    </v-stage>
  </v-row>
</template>

<script lang="ts">
import Vue                                        from 'vue';
import { IKonvaTile, IKonvaHUD, IDungeon, IFill } from "~/components/gamespace/types";
import { TTile, THud, Tile, Skull, dungeonMD }    from "~/assets/Tiles";

/**
 * Coords of every tile
 */
const c = {
  x: [46, 118, 190, 262, 334, 406],
  y: [186, 258, 330, 402, 474, 546],
};

/**
 * Tileset used to crop necessary images out of
 */
let tileset        = new Image();
tileset.src        = '/tileset/tiles-custom.png';
const tilesetOrder = ['potion', 'skull', 'coin', 'shield', 'sword'] as TTile[];
// const bossOrder = []

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
      },

      /**
       * Dungeon markdown of where elements are to be
       */
      background: dungeonMD,

      /**
       * Dungeon tiles container
       */
      dungeon: {} as IDungeon,

      /**
       * HUD overlay display
       */
      hud: {
        x: 11,
        y: 596,
        image: tileset,
        width: 428,
        height: 143,
        crop: {
          x: 1,
          y: 436,
          width: 318,
          height: 75
        }
      },

      /**
       * Current run state
       */
      state: {
        score: 0,
        TEMP_GAMEOVER: false,
        coins: {
          max: 100,
          current: 0
        },
        enemy: {
          power: 1, // current power level
          damageAccumulated: 0, // enemy damage dealt to you accumulated,
          damageRequired: 10 // amount of damage required to increase power (this is also increased on every power up)
         },
        defense: {
          max: 4,
          current: 4
        },
        attack: 1,
        upgrade: {
          max: 100,
          current: 0
        },
        experience: {
          max: 100,
          current: 0
        },
        health: {
          max: 50,
          current: 50
        }
      },

      /**
       * Tile selection arrow
       */
      arrow: {
        points: [] as number[],
        tension: .1,
        stroke: "green",
        strokeWidth: 10,
        lineCap: 'round',
        listening: false,
        keys: [] as string[],
      },

      /**
       * Flag indicating mouse button 1 being held or screen being touched
       */
      mouseDown: false,
      isTilesetLoaded: false
    };
  },

  computed: {
    /**
     * Arrow line rerender key
     * Also updates arrow cache on change
     * to ensure proper opacity render
     */
    arrowKey(): string {
      let arrow = this.$refs.arrow as any;
      if (arrow) {
        if (this.arrow.keys.length)
          arrow.getNode().cache({ offset: 5 });
        else
          arrow.getNode().clearCache();
      }

      return this.arrow.keys[this.arrow.keys.length-1];
    },

    /**
     * Arrow outline modification
     */
    arrowOutline(): Object {
      return Object.assign({}, this.arrow, {
        strokeWidth: this.arrow.strokeWidth * 2,
        stroke: "black"
      });
    },

    /**
     * Fill percentage of said fields
     */
    fill(): IFill {
      return {
        coins: this.state.coins.current / this.state.coins.max,
        upgrade: this.state.upgrade.current / this.state.upgrade.max,
        experience: this.state.experience.current / this.state.experience.max,
        health: this.state.health.current / this.state.health.max
      }
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
    isSameType(base: string, target: string): boolean {
      const TBase   = this.dungeon[base].type;
      const TTarget = this.dungeon[target].type;
      return TBase === TTarget
          || (TBase === 'skull' && TTarget === 'sword')
          || (TBase === 'sword' && TTarget === 'skull');
    },

    /**
     * Return an array of specified column rows
     */
    getCols(row: number): Tile[] {
      return [
        this.dungeon[`X${ row }Y0`],
        this.dungeon[`X${ row }Y1`],
        this.dungeon[`X${ row }Y2`],
        this.dungeon[`X${ row }Y3`],
        this.dungeon[`X${ row }Y4`],
        this.dungeon[`X${ row }Y5`],
      ];
    },

    /**
     * Return an array of specified row columns
     */
    getRows(col: number): Tile[] {
      return [
        this.dungeon[`X0Y${ col }`],
        this.dungeon[`X1Y${ col }`],
        this.dungeon[`X2Y${ col }`],
        this.dungeon[`X3Y${ col }`],
        this.dungeon[`X4Y${ col }`],
        this.dungeon[`X5Y${ col }`],
      ];
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
      return {
        x: this.getTileCoords(pos, 'x') as number,
        y: this.getTileCoords(pos, 'y') as number,
        image: tileset,
        width: 62,
        height: 62,
        crop: {
          x: (52) * (tile.id % tilesetOrder.length) + 1 + (tile.id % tilesetOrder.length),
          y: (52) * tilesetOrder.indexOf(tile.type) + 1 + tilesetOrder.indexOf(tile.type),
          width: 52,
          height: 52
        },
        offset: {
          x: 31,
          y: 31
        },
        type: tile.type
      }
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
            image: tileset,
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
        return {
          x: coords[type].canvas.x,
          y: coords[type].canvas.y,
          image: tileset,
          width: coords[type].canvas.width,
          height: coords[type].canvas.height,
          crop: coords[type].crop,
          type: type
        }
      }
    },

    /**
     * Format text to Konva Text config object based on a lot of things...
     */
    getTextConfig(text: string | number, x: number, y: number, width: number = 100, color: string = 'white', size: number = 30, align: string = 'center'): Object {
      return {
        x: x,
        y: y,
        text: text.toString(),
        fontSize: size,
        fontFamily: 'Calibri',
        fill: color,
        align: align,
        width: width,
        wrap: 'none',
      }
    },

    /**
     * Get random tile type based on TTile
     */
    getRandomTile(): Tile {
      let type = tilesetOrder[Math.floor(Math.random() * tilesetOrder.length)];
      if (type === 'skull') return new Skull(this.state.enemy.power);
      else return new Tile(type);
    },

    /**
     * Add sample tiles to the dungeon
     */
    populateDungeon(): void {
      for (let y = 0; y < 6; y++) {
        for (let x = 0; x < 6; x++) {
          let tile = `X${ x }Y${ y }`;
          this.$set(this.dungeon, tile, this.getRandomTile());
        }
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
        let type = this.dungeon[this.arrow.keys[0]].type;
        if (type === 'skull' || type === 'sword') {
          // skull fighting
          let count = 0;
          this.arrow.keys.forEach(entry => {
            if (this.dungeon[entry].type === 'skull') count++;
          })
          this.handleCollection('skull', count)
        } else {
          // every other tile type
          this.handleCollection(type, this.arrow.keys.length)
        }

        // getting columns in need of population as well of number of tiles to populate
        let toPopulate = [0, 0, 0, 0, 0, 0];
        this.arrow.keys.forEach(key => {
          toPopulate[parseInt(key[1])]++
        })

        // populating newTiles with old uncollected tiles leaving unchanged columns as null
        let newTiles = [null, null, null, null, null, null] as any;
        toPopulate.forEach((col, x) => {
          if (col) {
            newTiles[x] = this.getCols(x).filter((entry, y) => {
              return this.arrow.keys.indexOf(`X${ x }Y${ y }`) === -1
            })
          }
        })

        // populating changed columns with corresponding amount of new tiles and shifting column downwards
        newTiles.forEach((entry: any, x: number) => {
          if (entry !== null) {
            let result = Object.assign([], entry);
            for (let i = 0; i < 6 - entry.length; i++) {
              result.unshift(this.getRandomTile());
            }
            result.forEach((entry: string, y: number) => {
              this.$set(this.dungeon, `X${ x }Y${ y }`, entry)
            })
          }
        })

        // enemy turn before next turn
        this.enemyTurn();

        return true
      } else return false
    },

    /**
     * Handle collection of <count> tiles of <type> type
     * e.g. add collected coins to state.coins
     */
    handleCollection(type: TTile, count: number): void {
      switch (type) {
        case 'coin':
          this.state.score += count;
          this.state.coins.current += count;
          if (this.state.coins.current >= this.state.coins.max) {
            this.state.coins.current -= this.state.coins.max;
            this.state.attack++;
          }
          break;
        case 'skull':
          this.state.score += count*10;
          this.state.experience.current += count;
          if (this.state.experience.current >= this.state.experience.max) {
            this.state.experience.current -= this.state.experience.max;
            this.state.health.max += 5;
            this.state.health.current = this.state.health.max;
          }
          break;
        case 'shield':
          this.state.score += count;
          this.state.defense.current += count;
          if (this.state.defense.current >= this.state.defense.max) {
            this.state.defense.current = this.state.defense.max;
            this.state.upgrade.current += count - (this.state.defense.max - this.state.defense.current);
            if (this.state.upgrade.current >= this.state.upgrade.max) {
              this.state.upgrade.current -= this.state.upgrade.max;
              this.state.defense.max++;
              this.state.defense.current++;
            }
          }
          break;
        case 'potion':
          this.state.score += count;
          this.state.health.current += count;
          if (this.state.health.current > this.state.health.max) {
            this.state.health.current = this.state.health.max;
          }
          break;
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
        if (entry[1].type === 'skull') skulls.push(entry as [string, Skull])
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
        for (let i = 0; i < totalDamage - overkill; i++) {
          // 30% chance for armor not to break
          if (Math.random() > .3) this.state.defense.current--;
        }

        // 4
        if (overkill > 0) this.state.health.current -= overkill;
        if (this.state.health.current <= 0) {
          this.state.health.current = 0;
          this.state.TEMP_GAMEOVER = true;
          this.unbindEvents();
        } // placeholder game over screen

        // 5
        skulls.forEach(entry => {
          entry[1].getReady();
        })

        return true
      } else return false
    },

    /**
     * Check if a new point can be added and do add if so
     */
    printArrow(n: string): boolean {
      let { x, y } = this.getTileCoords(n) as { x: number, y: number };
      if (!this.state.TEMP_GAMEOVER) {
        let sample  = '' + x + y;
        let base    = [] as string[];
        let returns = true;
        for (let i = 0; i < this.arrow.points.length / 2; i++) {
          base.push('' + this.arrow.points[i * 2] + this.arrow.points[i * 2 + 1]);
        }
        if (base[base.length - 2] === sample) {
          this.arrow.points.pop();
          this.arrow.points.pop();
          this.arrow.keys.pop();
          return true
        } else {
          base.forEach(e => {
            if (e === sample
                || !this.isNear(this.arrow.keys[this.arrow.keys.length-1], n)
                || !this.isSameType(this.arrow.keys[this.arrow.keys.length-1], n)
            ) returns = false;
          });
          if (returns) {
            this.arrow.points.push(x, y);
            this.arrow.keys.push(n);
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
      if (this.mouseDown) {
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

        return true
      }

      return false
    },

    /**
     * Reset arrow state on mouse release
     * Collect tiles if possible
     */
    dropDrag(): void {
      this.mouseDown = false;
      this.collect();
      this.arrow.points = [];
      this.arrow.keys   = [];
    },

    /**
     * Begin drag event
     */
    startDrag(): void {
      this.mouseDown = true
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
    /**
     * Ensures tiles render on first load
     */
    if (tileset.complete) this.populateDungeon()
    tileset.onload = () => {
      this.isTilesetLoaded = true;
      this.populateDungeon();
    }

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
