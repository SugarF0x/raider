import { Buff, BuffOptions, BuffType } from "~/assets/entities/buffs/Buff"
import { XY } from "~/assets/types"

export class ArmorStrength extends Buff {
  type = BuffType.ARMOR_STRENGTH
  maxLevel = 5

  constructor(options?: ArmorStrengthOptions) {
    super(options)
  }

  getCropPosition(): XY {
    return {
      x: 713,
      y: 300
    }
  }
}

export interface ArmorStrengthOptions extends BuffOptions {

}