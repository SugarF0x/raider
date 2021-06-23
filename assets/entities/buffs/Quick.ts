import { Buff, BuffOptions, BuffType } from "~/assets/entities/buffs/Buff"
import { XY } from "~/assets/types"

export class Quick extends Buff {
  type = BuffType.QUICK
  maxLevel = 1

  text = {
    title: 'Quick',
    description: '-1 cooldown reduction',
    short: 'QCK'
  }

  constructor(options?: QuickOptions) {
    super(options)
  }

  getCropPosition(): XY {
    return {
      x: 763,
      y: 250
    }
  }

}

export interface QuickOptions extends BuffOptions {

}