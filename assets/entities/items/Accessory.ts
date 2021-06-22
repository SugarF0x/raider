import { Item, ItemOptions, ItemType } from "~/assets/entities/items/Item"
import { Vitality } from "~/assets/entities/attributes"
import { XY } from "~/assets/types"

export class Accessory extends Item {
  type = ItemType.ACCESSORY

  constructor(options?: AccessoryOptions) {
    super(options)
    if (!options?.sourceItem) this.stat = new Vitality({ level: 0 })
  }

  getCropPosition(): XY {
    return {
      x: 1 + (this.id%20)*50,
      y: 801 + (this.id%4)*50
    }
  }
}

export interface AccessoryOptions extends ItemOptions {

}