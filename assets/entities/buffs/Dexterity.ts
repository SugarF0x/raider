import { Buff, BuffOptions, BuffType } from "~/assets/entities/buffs/Buff"
import { XY } from "~/assets/types"

export class Dexterity extends Buff {
  type = BuffType.DEXTERITY

  text = {
    title: 'Dexterity',
    description: '+1 repair & +5% bonus shield chance',
    short: 'DEX'
  }

  constructor(options?: DexterityOptions) {
    super(options)
  }

  getCropPosition(): XY {
    return {
      x: 913,
      y: 300
    }
  }
}

export interface DexterityOptions extends BuffOptions {

}