import { Buff, BuffOptions, BuffType } from "~/assets/entities/buffs/Buff"

export class Strength extends Buff {
  type = BuffType.STRENGTH

  constructor(options?: StrengthOptions) {
    super(options)
  }
}

export interface StrengthOptions extends BuffOptions {

}