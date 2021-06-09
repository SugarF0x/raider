import { XY } from "~/assets/types"

export class Effect {
  // Effect unique identifier
  id: number
  // Effect Type to be overridden by an actual Effect Type
  type: EffectType = 'default'
  // Duration in moves
  duration: number

  constructor(duration = 1) {
    this.id = Math.floor(Math.random() * 1000000)
    this.duration = duration
  }

  // action to be executed on move end
  action() {
    this.duration--
  }
  
  getCropPosition(): XY {
    console.error(`Effect ${this.id} has not been assigned a crop`)
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
  | "fresh"