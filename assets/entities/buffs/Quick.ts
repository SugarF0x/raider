import { Buff, BuffOptions, BuffType } from "~/assets/entities/buffs/Buff"

export class Quick extends Buff {
  type = BuffType.QUICK
  maxLevel = 1

  constructor(options?: QuickOptions) {
    super(options)
  }
}

export interface QuickOptions extends BuffOptions {

}