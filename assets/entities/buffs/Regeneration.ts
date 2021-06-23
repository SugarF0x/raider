import { Buff, BuffOptions, BuffType } from "~/assets/entities/buffs/Buff"

export class Regeneration extends Buff {
  type = BuffType.REGENERATION

  constructor(options?: RegenerationOptions) {
    super(options)
  }
}

export interface RegenerationOptions extends BuffOptions {

}