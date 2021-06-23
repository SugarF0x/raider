import { Buff, BuffOptions, BuffType } from "~/assets/entities/buffs/Buff"
import { XY } from "~/assets/types"

export class Strength extends Buff {
  type = BuffType.STRENGTH

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