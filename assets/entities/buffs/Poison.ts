import { Buff, BuffOptions, BuffType } from "~/assets/entities/buffs/Buff"
import { XY } from "~/assets/types"

export class Poison extends Buff {
  type = BuffType.POISON

  text = {
    title: 'Poison',
    description: 'Damage applied each turn',
    short: 'PSN'
  }

  constructor(options?: PoisonOptions) {
    super(options)
  }

  getCropPosition(): XY {
    return {
      x: 663,
      y: 250
    }
  }
}
export interface PoisonOptions extends BuffOptions {

}