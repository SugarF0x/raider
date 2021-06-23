import { Buff, BuffOptions, BuffType } from "~/assets/entities/buffs/Buff"
import { XY } from "~/assets/types"

export class Healing extends Buff {
  type = BuffType.HEALING

  text = {
    title: 'Healing',
    description: 'Health restored per potion',
    short: 'HLG'
  }

  constructor(options?: HealingOptions) {
    super(options)
  }

  getCropPosition(): XY {
    return {
      x: 863,
      y: 300
    }
  }
}

export interface HealingOptions extends BuffOptions {

}