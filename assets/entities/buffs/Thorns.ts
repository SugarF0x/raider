import { Buff, BuffOptions, BuffType } from "~/assets/entities/buffs/Buff"

export class Thorns extends Buff {
  type = BuffType.THORNS

  constructor(options?: ThornsOptions) {
    super(options)
  }
}

export interface ThornsOptions extends BuffOptions {

}