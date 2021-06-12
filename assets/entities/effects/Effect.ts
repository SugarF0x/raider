import { XY } from "~/assets/types"
import { Entity, EntityOptions } from "~/assets/entities"

export class Effect extends Entity {
  // Effect Type to be overridden by an actual Effect Type
  type = EffectType.DEFAULT
  // Duration in moves
  duration: number

  constructor(options: EffectOptions = { duration: 1 }) {
    super(options)
    this.duration = options.duration
  }

  // action to be executed on move end
  action() {
    this.duration--
  }

  getImageConfig(position: XY) {
    return {
      ...super.getImageConfig(position),
      listening: false
    }
  }
}

export interface EffectOptions extends EntityOptions {
  duration: number
  power?: number
}

export enum EffectType {
  DEFAULT = 'default',
  VULNERABLE = 'vulnerable',
  FRESH = 'fresh',
  FROZEN = 'frozen',
  BURNING = 'burning'
}
