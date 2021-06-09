import { Effect, EffectType } from "~/assets/entities/effects"
import { XY } from "~/assets/types"

export class Fresh extends Effect {
  type = EffectType.FRESH

  getCropPosition(): XY {
    return {
      x: 826,
      y: 353,
    }
  }
}

export function isFresh(effect: Effect): effect is Fresh {
  return effect.type === EffectType.FRESH
}