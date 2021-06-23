import { Buff, BuffOptions, BuffType } from "~/assets/entities/buffs/Buff"

export class ArmorPiercing extends Buff {
  type = BuffType.ARMOR_PIERCING
  maxLevel = 5

  constructor(options?: ArmorPiercingOptions) {
    super(options)
  }
}

export interface ArmorPiercingOptions extends BuffOptions {

}