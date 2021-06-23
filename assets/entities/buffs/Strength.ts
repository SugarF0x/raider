import { Buff, BuffOptions, BuffType } from "~/assets/entities/buffs/Buff"
import { XY } from "~/assets/types"

export class Strength extends Buff {
  type = BuffType.STRENGTH

  text = {
    title: 'Strength',
    description: '+1 base damage & +5% bonus xp chance',
    short: 'STR'
  }

  constructor(options?: StrengthOptions) {
    super(options)
  }

  getCropPosition(): XY {
    return {
      x: 913,
      y: 250
    }
  }
}

export interface StrengthOptions extends BuffOptions {

}