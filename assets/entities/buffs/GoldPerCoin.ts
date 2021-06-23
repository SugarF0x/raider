import { Buff, BuffOptions, BuffType } from "~/assets/entities/buffs/Buff"

export class GoldPerCoin extends Buff {
  type = BuffType.GOLD_PER_COIN
  maxLevel = 4

  constructor(options?: GoldPerCoinOptions) {
    super(options)
  }
}

export interface GoldPerCoinOptions extends BuffOptions {

}