import { Buff, BuffOptions, BuffType } from "~/assets/entities/buffs/Buff"
import { XY } from "~/assets/types"

export class Damage extends Buff {
  type = BuffType.DAMAGE

  text = {
    title: 'Damage',
    description: 'Damage per sword',
    short: 'DMG'
  }

  constructor(options?: DamageOptions) {
    super(options)
  }

  getCropPosition(): XY {
    return {
      x: 513,
      y: 250
    }
  }
}

export interface DamageOptions extends BuffOptions {

}