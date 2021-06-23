import { Buff, BuffOptions, BuffType } from "~/assets/entities/buffs/Buff"
import { XY } from "~/assets/types"

export class Luck extends Buff {
  type = BuffType.LUCK

  text = {
    title: 'Luck',
    description: '+5% bonus coin chance',
    short: 'LCK'
  }

  constructor(options?: LuckOptions) {
    super(options)
  }

  getCropPosition(): XY {
    return {
      x: 963,
      y: 250
    }
  }
}

export interface LuckOptions extends BuffOptions {

}