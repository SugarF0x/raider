import { Buff, BuffOptions, BuffType } from "~/assets/entities/buffs/Buff"
import { XY } from "~/assets/types"

export class ArmorPiercing extends Buff {
  type = BuffType.ARMOR_PIERCING
  maxLevel = 5

  constructor(options?: ArmorPiercingOptions) {
    super(options)
  }

  getCropPosition(): XY {
    return {
      x: 713,
      y: 250
    }
  }
}

export interface ArmorPiercingOptions extends BuffOptions {

}