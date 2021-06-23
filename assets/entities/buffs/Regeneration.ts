import { Buff, BuffOptions, BuffType } from "~/assets/entities/buffs/Buff"
import { XY } from "~/assets/types"

export class Regeneration extends Buff {
  type = BuffType.REGENERATION

  text = {
    title: 'Regeneration',
    description: 'Health restored each turn',
    short: 'RGN'
  }

  constructor(options?: RegenerationOptions) {
    super(options)
  }

  getCropPosition(): XY {
    return {
      x: 513,
      y: 300
    }
  }
}

export interface RegenerationOptions extends BuffOptions {

}