import { Item, ItemOptions, ItemType } from "~/assets/entities/items/Item"
import { XY } from "~/assets/types"
import { BuffType, Vitality } from "~/assets/entities/buffs"

export class Accessory extends Item {
  type = ItemType.ACCESSORY
  assignableBuffs: BuffType[] = [BuffType.VITALITY, BuffType.QUICK, BuffType.LUCK, BuffType.REGENERATION]

  constructor(options?: AccessoryOptions) {
    super(options)
    if (!options?.sourceItem) this.buffs = [
      new Vitality({ level: 0 })
    ]
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