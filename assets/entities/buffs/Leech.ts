import { Buff, BuffOptions, BuffType } from "~/assets/entities/buffs/Buff"
import { XY } from "~/assets/types"

export class Leech extends Buff {
  type = BuffType.LEECH

  constructor(options?: LeechOptions) {
    super(options)
  }

  getCropPosition(): XY {
    return {
      x: 613,
      y: 250
    }
  }
}

export interface LeechOptions extends BuffOptions {

}