import { Buff, BuffOptions, BuffType } from "~/assets/entities/buffs/Buff"

export class Poison extends Buff {
  type = BuffType.POISON

  constructor(options?: PoisonOptions) {
    super(options)
  }
}
export interface PoisonOptions extends BuffOptions {

}