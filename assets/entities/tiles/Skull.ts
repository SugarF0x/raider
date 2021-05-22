import { Tile, TileOptions } from "~/assets/entities/tiles"
import { TileType, XY } from "~/assets/types"

export class Skull extends Tile {
  type: TileType = 'skull'
  isVulnerable = false
  isReady = false
  currentState: SkullState
  baseState: SkullState

  constructor(options: SkullOptions) {
    super(options)
    const { power } = options

    // generate base stats
    const base = {
      health: Math.floor(Math.pow(1.2, power)) + power - 1,
      armor: Math.floor(Math.pow(1.05, power)) + Math.floor(power * .5),
      attack: Math.floor(Math.pow(1.15, power)) + Math.floor(power * .25)
    } as SkullState

    // add randomness based on id seed
    base.health += Math.floor((Math.random() < 0.5 ? -1 : 1) * (Math.floor(Math.random() * 10) / 100) * base.health)
    base.armor += Math.floor((Math.random() < 0.5 ? -1 : 1) * (Math.floor(Math.random() * 10) / 100) * base.armor)
    base.attack += Math.floor((Math.random() < 0.5 ? -1 : 1) * (Math.floor(Math.random() * 10) / 100) * base.attack)

    // make sure it has at least 1 health and 1 damage
    if (base.health <= 0) base.health = 1
    if (base.attack <= 0) base.attack = 1

    // assign values
    this.baseState = Object.assign({}, base)
    this.currentState = Object.assign({}, base)
  }

  getCropPosition(): XY {
    return {
      x: (52) * (this.id % 8) + 1 + (this.id % 8),
      y: 54
    }
  }

  getReady(): void {
    this.isReady = true
  }

  // isFatal(value: number): boolean {}

  // applyDamage(value: number): void {}
}

export interface SkullOptions extends TileOptions {
  power: number
}

export interface SkullState {
  health: number
  armor: number
  attack: number
}

export function isSkull(tile: Tile): tile is Skull {
  // @ts-ignore
  return tile.type === 'skull'
}