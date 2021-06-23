import { Item, ItemOptions, ItemType } from "~/assets/entities/items/Item"
import { Damage } from "~/assets/entities/attributes"
import { XY } from "~/assets/types"
import { BuffType } from "~/assets/entities/buffs"

export class Weapon extends Item {
  type = ItemType.WEAPON
  assignableBuffs: BuffType[] = [BuffType.DAMAGE, BuffType.LEECH, BuffType.POISON, BuffType.ARMOR_PIERCING, BuffType.STRENGTH]

  constructor(options?: WeaponOptions) {
    super(options)
    if (!options?.sourceItem) this.stat = new Damage({ level: 1 })
  }

  getCropPosition(): XY {
    return {
      x: 1 + (this.id%20)*50,
      y: 1 + (this.id%4)*50
    }
  }
}

export interface WeaponOptions extends ItemOptions {

}