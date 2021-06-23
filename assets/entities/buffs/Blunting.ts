import { Buff, BuffOptions, BuffType } from "~/assets/entities/buffs/Buff"

export class Blunting extends Buff {
  type = BuffType.BLUNTING

  constructor(options?: BluntingOptions) {
    super(options)
  }
}

export interface BluntingOptions extends BuffOptions {

}