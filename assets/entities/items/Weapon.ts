import { Item, ItemOptions, ItemType } from "~/assets/entities/items/Item"
import { Damage } from "~/assets/entities/attributes"
import { XY } from "~/assets/types"

export class Weapon extends Item {
  type = ItemType.WEAPON

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