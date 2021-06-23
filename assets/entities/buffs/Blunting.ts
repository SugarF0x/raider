import { Buff, BuffOptions, BuffType } from "~/assets/entities/buffs/Buff"
import { XY } from "~/assets/types"

export class Blunting extends Buff {
  type = BuffType.BLUNTING

  constructor(options?: BluntingOptions) {
    super(options)
  }

  getCropPosition(): XY {
    return {
      x: 763,
      y: 300
    }
  }
}

export interface BluntingOptions extends BuffOptions {

}