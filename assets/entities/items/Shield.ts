import { Item, ItemOptions, ItemType } from "~/assets/entities/items/Item"
import { XY } from "~/assets/types"
import { BuffType, Defense } from "~/assets/entities/buffs"

export class Shield extends Item {
  type = ItemType.SHIELD
  assignableBuffs: BuffType[] = [BuffType.DEFENSE, BuffType.UPGRADE_PER_SHIELD, BuffType.BLUNTING]

  constructor(options?: ShieldOptions) {
    super(options)
    if (!options?.sourceItem) this.buffs = [
      new Defense({ level: 1 })
    ]
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