import { Buff, BuffOptions, BuffType } from "~/assets/entities/buffs/Buff"

export class Defense extends Buff {
  type = BuffType.DEFENSE

  constructor(options?: DefenseOptions) {
    super(options)
  }
}

export interface DefenseOptions extends BuffOptions {

}