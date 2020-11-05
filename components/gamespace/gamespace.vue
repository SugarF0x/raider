<template>
  <v-row justify="center" align="center">
    <v-stage :config="konva" id="konva">
      <v-layer>
        <v-rect :config="{height: 800, width: 450, fill: 'white'}"/>
      </v-layer>
      <v-layer>
        <!--suppress JSUnresolvedVariable, JSUnusedLocalSymbols -->
        <v-rect v-for="(entry,key) in background" :key="key" :config="entry"/>
      </v-layer>
      <v-layer>
        <!--suppress JSUnresolvedVariable, JSUnusedLocalSymbols -->
        <v-image v-for="(entry,key) in dungeon"
                 :key="key"
                 :config="getTileConfig(entry, key)"
                 @mousedown="printArrow(key)"
                 @mouseenter="dragArrow(key)"
                 @touchstart="printArrow(key)"
                 @touchmove="dragArrow(key)"
        />
      </v-layer>
      <v-layer>
        <v-arrow :key="arrowKey+'outline'" :config="arrowOutline"></v-arrow>
        <v-arrow :key="arrowKey" :config="arrow"></v-arrow>
      </v-layer>
    </v-stage>
  </v-row>
</template>

<script lang="ts">
import Vue                      from 'vue';
import { IKonvaTile, IDungeon } from "~/components/gamespace/types";
import { TTile, dungeonMD }     from "~/assets/Tiles";

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
const tileset      = new Image();
tileset.src        = '/tileset/tiles.png';
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
       * Tile selection arrow
       */
      arrow: {
        points: [-10, -10],
        tension: .3,
        stroke: "black",
        strokeWidth: 10,
        lineCap: 'round',
        listening: false,
        keys: [] as string[],
      },

      /**
       * Flag indicating mouse button 1 being held or screen being touched
       */
      mouseDown: false,
    };
  },

  computed: {
    /**
     * Arrow line rerender key
     */
    arrowKey(): string {
      return this.arrow.keys[this.arrow.keys.length - 1];
    },

    /**
     * Arrow outline modification
     */
    arrowOutline(): Object {
      return Object.assign({}, this.arrow, {
        strokeWidth: 15,
        stroke: this.arrow.keys.length > 2 ? "orange" : "white",
      });
    },
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
     */
    isSameType(base: string, target: string): boolean {
      return this.dungeon[base] === this.dungeon[target];
    },

    /**
     * Return an array of specified column rows
     */
    getCols(row: number): TTile[] {
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
    getRows(col: number): TTile[] {
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
     * Format tile to Konva Image config object based on tile type and name
     */
    getTileConfig(type: TTile, tile: String): IKonvaTile {
      return {
        x: c.x[parseInt(tile[1])],
        y: c.y[parseInt(tile[3])],
        image: tileset,
        width: 50,
        height: 50,
        crop: {
          // x: (53) * tilesetOrder.indexOf(type), // some form of this can be used to display different variations
          x: 0,
          y: (53) * tilesetOrder.indexOf(type),
          width: 53,
          height: 53
        },
        offset: {
          x: 25,
          y: 25
        },
        type: type
      }
    },

    /**
     * Get random tile type based on TTile
     */
    getRandomTile(): TTile {
      return tilesetOrder[Math.floor(Math.random() * tilesetOrder.length)]
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
    collect(): void {
      if (this.arrow.keys.length >= 3) {
        let toPopulate = [0, 0, 0, 0, 0, 0];
        this.arrow.keys.forEach(key => {
          toPopulate[parseInt(key[1])]++
        })
        let newTiles = [null, null, null, null, null, null] as any;
        toPopulate.forEach((col, x) => {
          if (col) {
            newTiles[x] = this.getCols(x).filter((entry, y) => {
              return this.arrow.keys.indexOf(`X${ x }Y${ y }`) === -1
            })
          }
        })
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
      }
    },

    /**
     * Check if a new point can be added and do add if so
     */
    printArrow(n: string): boolean {
      let x = c.x[parseInt(n[1])];
      let y = c.y[parseInt(n[3])];
      if (this.arrow.points[0] === -10) {
        this.arrow.points = [x, y];
        this.arrow.keys.push(n);
        return true;
      } else {
        let sample  = '' + x + y;
        let base    = [] as string[];
        let returns = true;
        for (let i = 0; i < this.arrow.points.length / 2; i++) {
          base.push('' + this.arrow.points[i * 2] + this.arrow.points[i * 2 + 1]);
        }
        if (base[base.length - 2] === sample) {
          console.log(base[base.length - 2], ' = ', sample)
          this.arrow.points.pop();
          this.arrow.points.pop();
          this.arrow.keys.pop();
          return true
        } else {
          base.forEach(e => {
            if (e === sample
                || !this.isNear(this.arrowKey, n)
                || !this.isSameType(this.arrowKey, n)
            ) returns = false;
          });
          if (returns) {
            this.arrow.points.push(x, y);
            this.arrow.keys.push(n);
          }
          return returns;
        }
      }
    },

    /**
     * Execute printArrow if mouse is held or screen is touched
     */
    dragArrow(n: string): void {
      if (this.mouseDown) this.printArrow(n);
    },

    /**
     * Set new sizes based on current screen
     */
    resize(): void {
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
      }
    },
  },

  mounted() {
    /**
     * Reset arrow state on mouse release
     * Collect tiles if possible
     */
    const dropDrag = () => {
      this.mouseDown = false;
      this.collect();
      this.arrow.points = [-10, -10];
      this.arrow.keys   = [];
    }

    this.populateDungeon();
    this.resize();
    window.addEventListener('resize', this.resize);
    document.addEventListener('mousedown', () => { this.mouseDown = true; });
    document.addEventListener('mouseup', () => { dropDrag() });
    document.addEventListener("touchstart", () => { this.mouseDown = true; });
    document.addEventListener("touchend", () => { dropDrag() });
  },
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
