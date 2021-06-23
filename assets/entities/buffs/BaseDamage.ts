import { Buff, BuffOptions, BuffType } from "~/assets/entities/buffs/Buff"
import { XY } from "~/assets/types"

export class BaseDamage extends Buff {
  type = BuffType.BASE_DAMAGE

  constructor(options?: BaseDamageOptions) {
    super(options)
  }

  getCropPosition(): XY {
    return {
      x: 563,
      y: 250
    }
  }
}

export interface BaseDamageOptions extends BuffOptions {

}