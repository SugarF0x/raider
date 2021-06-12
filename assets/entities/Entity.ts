import { accessorType } from "~/store"
import { ImageConfig, XY } from "~/assets/types"
import { getCanvasCoords } from "~/assets/utils"

export class Entity {
  id: number
  accessor: typeof accessorType = window.$nuxt.$accessor

  constructor(options: EntityOptions) {
    this.id = Math.floor(Math.random() * 1000000)
  }

  getCropPosition(): XY {
    console.error(`Entity ${this.id} crop has not been reassigned.`)
    return {
      x: 1,
      y: 928,
    }
  }

  getImageConfig(position: XY): ImageConfig {
    return {
      image: this.accessor.assets.tiles,
      ...position,
      width: 62,
      height: 62,
      crop: {
        ...this.getCropPosition(),
        width: 52,
        height: 52
      },
      offset: {
        x: 31,
        y: 31
      },
    }
  }
}

export interface EntityOptions {

}