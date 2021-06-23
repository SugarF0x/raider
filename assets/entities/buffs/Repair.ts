import { Buff, BuffOptions, BuffType } from "~/assets/entities/buffs/Buff"
import { XY } from "~/assets/types"

export class Repair extends Buff {
  type = BuffType.REPAIR

  constructor(options?: RepairOptions) {
    super(options)
  }

  getCropPosition(): XY {
    return {
      x: 813,
      y: 300
    }
  }
}

export interface RepairOptions extends BuffOptions {

}