import { Buff, BuffOptions, BuffType } from "~/assets/entities/buffs/Buff"
import { XY } from "~/assets/types"

export class GoldPerCoin extends Buff {
  type = BuffType.GOLD_PER_COIN
  maxLevel = 4

  constructor(options?: GoldPerCoinOptions) {
    super(options)
  }

  getCropPosition(): XY {
    return {
      x: 863,
      y: 250
    }
  }
}

export interface GoldPerCoinOptions extends BuffOptions {

}