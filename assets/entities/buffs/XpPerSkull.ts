import { Buff, BuffOptions, BuffType } from "~/assets/entities/buffs/Buff"

export class XpPerSkull extends Buff {
  type = BuffType.XP_PER_SKULL
  maxLevel = 4

  constructor(options?: XpPerSkullOptions) {
    super(options)
  }
}

export interface XpPerSkullOptions extends BuffOptions {

}