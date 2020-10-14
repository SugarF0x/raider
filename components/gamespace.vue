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
                  @mousedown="printArrow(e.x,e.y)"
                  @mouseenter="dragArrow(e.x,e.y)"
                  @touchstart="printArrow(e.x,e.y)"
                  @touchmove="dragArrow(e.x,e.y)"
        />
      </v-layer>
      <v-layer>
        <v-arrow :key="arrowKey" :config="arrow"></v-arrow>
      </v-layer>
    </v-stage>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue';

// import { Tile, Skull } from '@/assets/Tiles.ts'

interface IDungeon {
  [property: string]: {
    x: number;
    y: number;
    radius: number;
    fill: string;
  }
}

export default Vue.extend({
  name: "gamespace",

  data() {
    return {
      konva:      {
        width:  450,
        height: 800,
        scaleX: 1,
        scaleY: 1,
      },
      background: {
        header:  {
          x:      10,
          y:      10,
          width:  430,
          height: 40,
          stroke: 'black',
        },
        spell1:  {
          x:      10,
          y:      60,
          width:  80,
          height: 80,
          stroke: "black",
        },
        spell2:  {
          x:      100,
          y:      60,
          width:  80,
          height: 80,
          stroke: "black",
        },
        spell3:  {
          x:      190,
          y:      60,
          width:  80,
          height: 80,
          stroke: "black",
        },
        spell4:  {
          x:      280,
          y:      60,
          width:  80,
          height: 80,
          stroke: "black",
        },
        menu:    {
          x:      370,
          y:      60,
          width:  70,
          height: 35,
          stroke: "black",
        },
        stats:   {
          x:      370,
          y:      105,
          width:  70,
          height: 35,
          stroke: "black",
        },
        dungeon: {
          x:      10,
          y:      150,
          width:  430,
          height: 430,
          stroke: "black",
        },
        gold:    {
          x:      10,
          y:      590,
          width:  130,
          height: 150,
          stroke: "black",
        },
        enemy:   {
          x:      150,
          y:      590,
          width:  43,
          height: 50,
          stroke: "black",
        },
        defence: {
          x:      203,
          y:      590,
          width:  43,
          height: 50,
          stroke: "black",
        },
        attack:  {
          x:      256,
          y:      590,
          width:  43,
          height: 50,
          stroke: "black",
        },
        upgrade: {
          x:      150,
          y:      650,
          width:  150,
          height: 40,
          stroke: "black",
        },
        level:   {
          x:      150,
          y:      700,
          width:  150,
          height: 40,
          stroke: "black",
        },
        health:  {
          x:      310,
          y:      590,
          width:  130,
          height: 150,
          stroke: "black",
        },
        footer:  {
          x:      10,
          y:      750,
          width:  430,
          height: 40,
          stroke: "black",
        },
      },
      dungeon:    {
                    X0Y0: { x: 46, y: 186, radius: 25, fill: "red" },
                  } as IDungeon,
      arrow:      {
        points:      [
          -10,
          -10,
        ],
        fill:        "blue",
        stroke:      "black",
        strokeWidth: 10,
        lineCap:     'round',
      },
      mouseDown:  false,
    };
  },

  computed: {
    arrowKey(): string {
      let length = this.arrow.points.length - 1;
      return `X${ this.arrow.points[length - 1] }Y${ this.arrow.points[length] }`;
    },
  },

  methods: {
    /**
     * add sample tiles to the dungeon
     */
    populateDungeon(): void {
      for (let y = 0; y < 6; y++) {
        for (let x = 0; x < 6; x++) {
          this.$set(this.dungeon, `X${ x }Y${ y }`, {
            x:      15 + 31 + 72 * x,
            y:      155 + 31 + 72 * y,
            radius: 25,
            fill:   'red',
          });
        }
      }
    },
    /**
     * Check if a new point can be added and do add if so
     */
    printArrow(x: number, y: number): boolean {
      if (this.arrow.points[0] === -10) {
        this.arrow.points = [
          x,
          y,
        ];
        return true;
      } else {
        let sample  = '' + x + y;
        let base    = [] as string[];
        let returns = true;
        for (let i = 0; i < this.arrow.points.length / 2; i++) {
          base.push('' + this.arrow.points[i * 2] + this.arrow.points[i * 2 + 1]);
        }
        base.forEach(e => {
          if (e === sample) returns = false;
        });
        if (returns) {
          this.arrow.points.push(x, y);
        }
        return returns;
      }
    },

    dragArrow(x: number, y: number): void {
      if (this.mouseDown) {
        this.printArrow(x, y);
      }
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
    document.addEventListener('mousedown', () => {
      this.mouseDown = true;
    });
    document.addEventListener('mouseup', () => {
      this.mouseDown = false;
    });
    document.addEventListener("touchstart", () => {
      this.mouseDown = true;
    });
    document.addEventListener("touchend", () => {
      this.mouseDown = false;
    });
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
