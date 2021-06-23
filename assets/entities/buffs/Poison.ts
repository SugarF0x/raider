import { Buff, BuffOptions, BuffType } from "~/assets/entities/buffs/Buff"
import { XY } from "~/assets/types"

export class Poison extends Buff {
  type = BuffType.POISON

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