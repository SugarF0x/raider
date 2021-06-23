import { Buff, BuffOptions, BuffType } from "~/assets/entities/buffs/Buff"

export class Leech extends Buff {
  type = BuffType.LEECH

  constructor(options?: LeechOptions) {
    super(options)
  }
}

export interface LeechOptions extends BuffOptions {

}