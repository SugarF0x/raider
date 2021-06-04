import { XY } from "~/assets/types"

export class Effect {
  // Effect unique identifier
  id: number
  // Effect Type to be overridden by an actual Effect Type
  type: EffectType = 'default'

  constructor() {
    this.id = Math.floor(Math.random() * 1000000)
  }
  
  getCropPosition(): XY {
    console.error(`Effect ${this.id} has not been assigned a type`)
    return {
      x: 1,
      y: 928,
    }
  }
}

export type EffectType =
  | "default"
  | "vulnerable"
  | "burning"
  | "frozen"