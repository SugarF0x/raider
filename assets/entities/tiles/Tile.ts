import { TileState, TileType, XY } from "~/assets/types"
import { Effect, EffectType } from "~/assets/entities/effects/Effect"
import { Vulnerable } from "~/assets/entities/effects"

export class Tile {
  // Tile unique identifier
  id: number
  // Tile Type to be overridden by an actual Tile Type
  type: TileType = 'default'
  // Current Tile dungeon position
  position: XY
  // Dungeon position to move Tile to
  destination: XY
  // Current tile state
  state: TileState
  // Current Tile effects
  effects: Effect[] = []

  constructor(options: TileOptions) {
    this.id = Math.floor(Math.random() * 1000000)
    this.position = options.position
    this.destination = options.destination || this.position
    this.state = options.state || 'idle'
  }

  getCropPosition(): XY {
    console.error(`Tile ${this.id} has not been assigned a type`)
    return {
      x: 1,
      y: 928,
    }
  }

  setPosition(position: XY) { this.position = position }

  setDestination(position: XY) { this.destination = position }

  setState(state: TileState) { this.state = state }

  addEffect(effect: EffectType) {
    const currentEffect = this.effects.find(entry => entry.type === effect)

    const newEffect = (() => {
      switch(effect) {
        case "vulnerable": return new Vulnerable()
        default: throw new Error(`Effect type ${effect} is not recognized`)
      }
    })()

    this.removeEffect(effect)
    this.effects.push(newEffect)
  }

  removeEffect(effect: EffectType) {
    const currentEffect = this.effects.find(entry => entry.type === effect)
    if (currentEffect) {
      const index = this.effects.indexOf(currentEffect)
      this.effects.splice(index)
    }
  }

  isDestinationMatch(position: XY) { return this.destination.x === position.x && this.destination.y === position.y }
}

export interface TileOptions {
  image: HTMLImageElement
  position: XY
  destination?: XY
  state?: TileState
}