import { XY } from "~/assets/types"
import { Effect, EffectType } from "~/assets/entities/effects/Effect"

export class Vulnerable extends Effect {
  type: EffectType = 'vulnerable'

  getCropPosition(): XY {
    return {
      x: 160,
      y: 330
    }
  }
}