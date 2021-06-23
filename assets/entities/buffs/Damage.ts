import { Buff, BuffOptions, BuffType } from "~/assets/entities/buffs/Buff"

export class Damage extends Buff {
  type = BuffType.DAMAGE

  constructor(options?: DamageOptions) {
    super(options)
  }
}

export interface DamageOptions extends BuffOptions {

}