import { Item, ItemOptions, ItemType } from "~/assets/entities/items/Item"
import { Defense } from "~/assets/entities/attributes"
import { XY } from "~/assets/types"

export class Helmet extends Item {
  type = ItemType.HELMET

  constructor(options?: HelmetOptions) {
    super(options)
    if (!options?.sourceItem) this.stat = new Defense({ level: 1 })
  }

  getCropPosition(): XY {
    return {
      x: 1 + (this.id%20)*50,
      y: 201 + (this.id%4)*50
    }
  }
}

export interface HelmetOptions extends ItemOptions {

}