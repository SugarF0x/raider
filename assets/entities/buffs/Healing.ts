import { Buff, BuffOptions, BuffType } from "~/assets/entities/buffs/Buff"

export class Healing extends Buff {
  type = BuffType.HEALING

  constructor(options?: HealingOptions) {
    super(options)
  }
}

export interface HealingOptions extends BuffOptions {

}