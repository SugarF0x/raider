import { Buff, BuffOptions, BuffType } from "~/assets/entities/buffs/Buff"

export class Luck extends Buff {
  type = BuffType.LUCK

  constructor(options?: LuckOptions) {
    super(options)
  }
}

export interface LuckOptions extends BuffOptions {

}