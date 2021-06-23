import { Buff, BuffOptions, BuffType } from "~/assets/entities/buffs/Buff"
import { XY } from "~/assets/types"

export class Luck extends Buff {
  type = BuffType.LUCK

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