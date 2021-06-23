import { Buff, BuffOptions, BuffType } from "~/assets/entities/buffs/Buff"
import { XY } from "~/assets/types"

export class Thorns extends Buff {
  type = BuffType.THORNS

  constructor(options?: ThornsOptions) {
    super(options)
  }

  getCropPosition(): XY {
    return {
      x: 613,
      y: 300
    }
  }
}

export interface ThornsOptions extends BuffOptions {

}