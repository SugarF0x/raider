import { Item, ItemOptions, ItemType } from "~/assets/entities/items/Item"
import { Defense } from "~/assets/entities/attributes"
import { XY } from "~/assets/types"
import { BuffType } from "~/assets/entities/buffs"

export class Torso extends Item {
  type = ItemType.TORSO
  assignableBuffs: BuffType[] = [BuffType.DEFENSE, BuffType.GOLD_PER_COIN, BuffType.THORNS]

  constructor(options?: TorsoOptions) {
    super(options)
    if (!options?.sourceItem) this.stat = new Defense({ level: 1 })
  }

  getCropPosition(): XY {
    return {
      x: 1 + (this.id%20)*50,
      y: 601 + (this.id%4)*50
    }
  }
}

export interface TorsoOptions extends ItemOptions {

}