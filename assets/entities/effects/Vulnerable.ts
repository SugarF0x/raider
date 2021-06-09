import { XY } from "~/assets/types"
import { Effect, EffectType } from "~/assets/entities/effects/Effect"

export class Vulnerable extends Effect {
  type = EffectType.VULNERABLE

  getCropPosition(): XY {
    return {
      x: 160,
      y: 330
    }
  }
}

export function isVulnerable(effect: Effect): effect is Vulnerable {
  return effect.type == EffectType.VULNERABLE
}