import { Buff, BuffOptions, BuffType } from "~/assets/entities/buffs/Buff"

export class BaseDamage extends Buff {
  type = BuffType.BASE_DAMAGE

  constructor(options?: BaseDamageOptions) {
    super(options)
  }
}

export interface BaseDamageOptions extends BuffOptions {

}