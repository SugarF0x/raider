import { accessorType } from "~/store"
import { ImageConfig, XY } from "~/assets/types"

export class Entity {
  id: number
  accessor: typeof accessorType = window.$nuxt.$accessor

  constructor(options?: EntityOptions) {
    this.id = Math.floor(Math.random() * 1000000)
  }

  getCropPosition(): XY {
    console.error(`Entity ${this.id} crop has not been reassigned.`)
    return {
      x: 1,
      y: 929,
    }
  }

  getImageConfig(position: XY): ImageConfig {
    return {
      image: this.accessor.assets.tiles,
      ...position,
      width: 60,
      height: 60,
      crop: {
        ...this.getCropPosition(),
        width: 50,
        height: 50
      }
    }
  }
}

export interface EntityOptions {

}