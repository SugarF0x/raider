import { Buff, BuffOptions, BuffType } from "~/assets/entities/buffs/Buff"

export class ArmorStrength extends Buff {
  type = BuffType.ARMOR_STRENGTH
  maxLevel = 5

  constructor(options?: ArmorStrengthOptions) {
    super(options)
  }
}

export interface ArmorStrengthOptions extends BuffOptions {

}