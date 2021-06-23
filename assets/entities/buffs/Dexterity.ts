import { Buff, BuffOptions, BuffType } from "~/assets/entities/buffs/Buff"

export class Dexterity extends Buff {
  type = BuffType.DEXTERITY

  constructor(options?: DexterityOptions) {
    super(options)
  }
}

export interface DexterityOptions extends BuffOptions {

}