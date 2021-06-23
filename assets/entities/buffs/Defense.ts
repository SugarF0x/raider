import { Buff, BuffOptions, BuffType } from "~/assets/entities/buffs/Buff"
import { XY } from "~/assets/types"

export class Defense extends Buff {
  type = BuffType.DEFENSE

  constructor(options?: DefenseOptions) {
    super(options)
  }

  getCropPosition(): XY {
    return {
      x: 563,
      y: 300
    }
  }
}

export interface DefenseOptions extends BuffOptions {

}