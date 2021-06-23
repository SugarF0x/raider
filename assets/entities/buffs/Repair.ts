import { Buff, BuffOptions, BuffType } from "~/assets/entities/buffs/Buff"

export class Repair extends Buff {
  type = BuffType.REPAIR

  constructor(options?: RepairOptions) {
    super(options)
  }
}

export interface RepairOptions extends BuffOptions {

}