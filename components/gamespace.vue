<template>
  <v-row justify="center" align="center">
    <v-stage :config="konva" id="konva">
      <v-layer>
        <v-rect :config="{height: 800, width: 450, fill: 'white'}"/>
      </v-layer>
      <v-layer>
        <v-rect v-for="(e,n) in background" :key="n" :config="e"/>
      </v-layer>
      <v-layer >
        <v-circle v-for="(e,n) in dungeon"
                  :key="n"
                  :config="e"
                  @mousedown="dragArrow(e.x,e.y)"
                  @mouseover="dungeon[n].fill='blue'"
                  @mouseout="dungeon[n].fill='cyan'"
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
      konva: {
        width: 450,
        height: 800
      },
      background: {
        header:  {
          x: 10,
          y: 10,
          width: 430,
          height: 40,
          stroke: 'black'
        },
        spell1:  {
          x: 10,
          y: 60,
          width: 80,
          height: 80,
          stroke: "black"
        },
        spell2:  {
          x: 100,
          y: 60,
          width: 80,
          height: 80,
          stroke: "black"
        },
        spell3:  {
          x: 190,
          y: 60,
          width: 80,
          height: 80,
          stroke: "black"
        },
        spell4:  {
          x: 280,
          y: 60,
          width: 80,
          height: 80,
          stroke: "black"
        },
        menu:    {
          x: 370,
          y: 60,
          width: 70,
          height: 35,
          stroke: "black"
        },
        stats:   {
          x: 370,
          y: 105,
          width: 70,
          height: 35,
          stroke: "black"
        },
        dungeon: {
          x: 10,
          y: 150,
          width: 430,
          height: 430,
          stroke: "black"
        },
        gold:    {
          x: 10,
          y: 590,
          width: 130,
          height: 150,
          stroke: "black"
        },
        enemy:   {
          x: 150,
          y: 590,
          width: 43,
          height: 50,
          stroke: "black"
        },
        defence: {
          x: 203,
          y: 590,
          width: 43,
          height: 50,
          stroke: "black"
        },
        attack:  {
          x: 256,
          y: 590,
          width: 43,
          height: 50,
          stroke: "black"
        },
        upgrade: {
          x: 150,
          y: 650,
          width: 150,
          height: 40,
          stroke: "black"
        },
        level:   {
          x: 150,
          y: 700,
          width: 150,
          height: 40,
          stroke: "black"
        },
        health:  {
          x: 310,
          y: 590,
          width: 130,
          height: 150,
          stroke: "black"
        },
        footer:  {
          x: 10,
          y: 750,
          width: 430,
          height: 40,
          stroke: "black"
        }
      },
      dungeon: {
        X0Y0: {x: 46, y: 186, radius: 25, fill: "red"},
        X0Y1: {x: 46, y: 258, radius: 25, fill: "red"},
        X0Y2: {x: 46, y: 330, radius: 25, fill: "red"},
        X0Y3: {x: 46, y: 402, radius: 25, fill: "red"},
        X0Y4: {x: 46, y: 474, radius: 25, fill: "red"},
        X0Y5: {x: 46, y: 546, radius: 25, fill: "red"},
        X1Y0: {x: 118, y: 186, radius: 25, fill: "red"},
        X1Y1: {x: 118, y: 258, radius: 25, fill: "red"},
        X1Y2: {x: 118, y: 330, radius: 25, fill: "red"},
        X1Y3: {x: 118, y: 402, radius: 25, fill: "red"},
        X1Y4: {x: 118, y: 474, radius: 25, fill: "red"},
        X1Y5: {x: 118, y: 546, radius: 25, fill: "red"},
        X2Y0: {x: 190, y: 186, radius: 25, fill: "red"},
        X2Y1: {x: 190, y: 258, radius: 25, fill: "red"},
        X2Y2: {x: 190, y: 330, radius: 25, fill: "red"},
        X2Y3: {x: 190, y: 402, radius: 25, fill: "red"},
        X2Y4: {x: 190, y: 474, radius: 25, fill: "red"},
        X2Y5: {x: 190, y: 546, radius: 25, fill: "red"},
        X3Y0: {x: 262, y: 186, radius: 25, fill: "red"},
        X3Y1: {x: 262, y: 258, radius: 25, fill: "red"},
        X3Y2: {x: 262, y: 330, radius: 25, fill: "red"},
        X3Y3: {x: 262, y: 402, radius: 25, fill: "red"},
        X3Y4: {x: 262, y: 474, radius: 25, fill: "red"},
        X3Y5: {x: 262, y: 546, radius: 25, fill: "red"},
        X4Y0: {x: 334, y: 186, radius: 25, fill: "red"},
        X4Y1: {x: 334, y: 258, radius: 25, fill: "red"},
        X4Y2: {x: 334, y: 330, radius: 25, fill: "red"},
        X4Y3: {x: 334, y: 402, radius: 25, fill: "red"},
        X4Y4: {x: 334, y: 474, radius: 25, fill: "red"},
        X4Y5: {x: 334, y: 546, radius: 25, fill: "red"},
        X5Y0: {x: 406, y: 186, radius: 25, fill: "red"},
        X5Y1: {x: 406, y: 258, radius: 25, fill: "red"},
        X5Y2: {x: 406, y: 330, radius: 25, fill: "red"},
        X5Y3: {x: 406, y: 402, radius: 25, fill: "red"},
        X5Y4: {x: 406, y: 474, radius: 25, fill: "red"},
        X5Y5: {x: 406, y: 546, radius: 25, fill: "red"},
      } as IDungeon,
      arrow: {
        points: [-10,-10],
        fill: "blue",
        stroke: "black",
        strokeWidth: 10,
        lineCap: 'round'
      }
    };
  },

  computed: {
    arrowKey(): string {
      let length = this.arrow.points.length-1;
      return `X${this.arrow.points[length-1]}Y${this.arrow.points[length]}`
    }
  },

  methods: {
    /**
     * Remove inline styles messing up alignment
     */
    removeInlineStyles(): void {
      let canvas = document.querySelectorAll('canvas');
      if (canvas.length) {
        canvas.forEach(e => {
          e.removeAttribute('style');
          e.setAttribute('width',  this.konva.width.toString());
          e.setAttribute('height', this.konva.height.toString());
        })
      }
      let konvas = document.querySelector('.konvajs-content');
      if (konvas) konvas.removeAttribute('style');
    },
    /**
     * add sample tiles to the dungeon
     */
    // populateDungeon(): void {
    //   for (let y=0; y<6; y++) {
    //     for (let x=0; x<6; x++) {
    //       this.dungeon[`X${x}Y${y}`] = {
    //         x: 15+31+72*x,
    //         y: 155+31+72*y,
    //         radius: 25,
    //         fill: 'red',
    //       }
    //     }
    //   }
    // },
    /**
     * Check if a new point can be added and do add if so
     *
     * @param {number} x
     * @param {number} y
     * @returns {boolean}
     */
    dragArrow(x: number, y: number): boolean {
      if (this.arrow.points[0] === -10) {
        this.arrow.points=[x,y];
        return true
      } else {
        let sample = ''+x+y;
        let base = [] as string[];
        let returns = true;
        for (let i=0; i<this.arrow.points.length/2; i++) {
          base.push(''+this.arrow.points[i*2]+this.arrow.points[i+1])
        }
        base.forEach(e => {
          if (e === sample) returns = false;
        })
        if (returns) {
          this.arrow.points.push(x,y)
        }
        return returns;
      }
    }
  },

  mounted() {
    this.removeInlineStyles();
    // this.populateDungeon();
  }
})
</script>

<style lang="less" scoped>
  .row {
    height: 100%;
    width: 100%;
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
  }
  canvas {
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
<style>
#konva .konvajs-content {
  height: 100%;
  width: calc(100%*0.5625);
}
#konva canvas {
  /*min-height: min(100%, 800px);*/
  /*min-width: min(100%, 450px);*/
  /*height: min(100%, 800px);*/
  /*width: min(100%, 450px);*/
}
</style>
