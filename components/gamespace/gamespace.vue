<template>
  <v-row justify="center" align="center">
    <v-stage :config="konva" id="konva">
      <v-layer>
        <v-rect :config="{height: 800, width: 450, fill: 'white'}"/>
      </v-layer>
      <v-layer>
        <v-rect v-for="(e,n) in background" :key="n" :config="e"/>
      </v-layer>
      <v-layer>
        <v-circle v-for="(e,n) in dungeon"
                  :key="n"
                  :config="e"
                  @mousedown="printArrow(e, n)"
                  @mouseenter="dragArrow(e, n)"
                  @touchstart="printArrow(e, n)"
                  @touchmove="dragArrow(e, n)"
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
import Vue                  from 'vue';
import { ITile, IDungeon }  from "~/components/gamespace/types";
import { TTile, dungeonMD } from "~/assets/Tiles";

// c for coords
const c = {
  x: [46, 118, 190, 262, 334, 406],
  y: [186, 258, 330, 402, 474, 546],
};

export default Vue.extend({
  name: "gamespace",

  data() {
    return {
      konva: {
        width: 450,
        height: 800,
        scaleX: 1,
        scaleY: 1,
      },
      background: dungeonMD,
      dungeon: {
        X0Y0: { x: c.x[0], y: c.y[0], radius: 25, fill: "red" } as ITile,
      } as IDungeon,
      arrow: {
        points: [-10, -10],
        tension: .3,
        stroke: "black",
        strokeWidth: 10,
        lineCap: 'round',
        listening: false,
        keys: [] as string[],
      },
      mouseDown: false,
    };
  },

  computed: {
    arrowKey(): string {
      return this.arrow.keys[this.arrow.keys.length - 1];
    },
    arrowOutline(): Object {
      return Object.assign({}, this.arrow, {
        strokeWidth: 15,
        stroke: "white",
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
     * Generate random tile on passed dungeon grid coordinates
     */
    generateRandomTile(x: number, y: number): ITile {
      let type     = Math.floor(Math.random() * 6);
      const types  = ['coin', 'skull', 'potion', 'sword', 'shield', 'boss'] as TTile[];
      const colors = ['yellow', 'grey', 'red', 'black', 'blue', 'purple'];
      return {
        x: c.x[x],
        y: c.y[y],
        radius: 25,
        fill: colors[type],
        type: types[type],
      };
    },
    /**
     * add sample tiles to the dungeon
     */
    populateDungeon(): void {
      for (let y = 0; y < 6; y++) {
        for (let x = 0; x < 6; x++) {
          this.$set(this.dungeon, `X${ x }Y${ y }`, this.generateRandomTile(x, y));
        }
      }
    },
    /**
     * Check if a new point can be added and do add if so
     */
    printArrow(e: ITile, n: string): boolean {
      if (this.arrow.points[0] === -10) {
        this.arrow.points = [e.x, e.y];
        this.arrow.keys.push(n);
        return true;
      } else {
        let sample  = '' + e.x + e.y;
        let base    = [] as string[];
        let returns = true;
        for (let i = 0; i < this.arrow.points.length / 2; i++) {
          base.push('' + this.arrow.points[i * 2] + this.arrow.points[i * 2 + 1]);
        }
        base.forEach(e => {
          if (e === sample || !this.isNear(this.arrowKey, n)) returns = false;
        });
        if (returns) {
          this.arrow.points.push(e.x, e.y);
          this.arrow.keys.push(n);
        }
        return returns;
      }
    },

    dragArrow(e: ITile, n: string): void {
      if (this.mouseDown) this.printArrow(e, n);
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
    this.populateDungeon();
    this.resize();
    window.addEventListener('resize', this.resize);
    document.addEventListener('mousedown', () => { this.mouseDown = true; });
    document.addEventListener('mouseup', () => { this.mouseDown = false; });
    document.addEventListener("touchstart", () => { this.mouseDown = true; });
    document.addEventListener("touchend", () => { this.mouseDown = false; });
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
