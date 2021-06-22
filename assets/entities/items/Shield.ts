import { Item, ItemOptions, ItemType } from "~/assets/entities/items/Item"
import { Defense } from "~/assets/entities/attributes"
import { XY } from "~/assets/types"

export class Shield extends Item {
  type = ItemType.SHIELD

  constructor(options?: ShieldOptions) {
    super(options)
    if (!options?.sourceItem) this.stat = new Defense({ level: 1 })
  }

  getCropPosition(): XY {
    return {
      x: 1 + (this.id%20)*50,
      y: 401 + (this.id%4)*50
    }
  }
}

export interface ShieldOptions extends ItemOptions {

}