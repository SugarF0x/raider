import { Buff, BuffOptions, BuffType } from "~/assets/entities/buffs/Buff"
import { XY } from "~/assets/types"

export class XpPerSkull extends Buff {
  type = BuffType.XP_PER_SKULL
  maxLevel = 4

  text = {
    title: 'XP per skull',
    description: '+25% xp per skull',
    short: 'XPS'
  }

  constructor(options?: XpPerSkullOptions) {
    super(options)
  }

  getCropPosition(): XY {
    return {
      x: 813,
      y: 250
    }
  }
}

export interface XpPerSkullOptions extends BuffOptions {

}