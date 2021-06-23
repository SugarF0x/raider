import { Buff, BuffOptions, BuffType } from "~/assets/entities/buffs/Buff"
import { XY } from "~/assets/types"

export class Vitality extends Buff {
  type = BuffType.VITALITY

  constructor(options?: VitalityOptions) {
    super(options)
  }

  getCropPosition(): XY {
    return {
      x: 963,
      y: 300
    }
  }
}

export interface VitalityOptions extends BuffOptions {

}