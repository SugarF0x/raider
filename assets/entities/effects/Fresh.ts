import { Effect, EffectType } from "~/assets/entities/effects/Effect"
import { XY } from "~/assets/types"

export class Fresh extends Effect {
  type: EffectType = "fresh"

  getCropPosition(): XY {
    return {
      x: 826,
      y: 353,
    }
  }
}